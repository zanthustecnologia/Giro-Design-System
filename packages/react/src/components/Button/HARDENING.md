# Hardening do `Button` — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `ariaLabel` | Prop customizada camelCase, mas **não exclui** o `aria-label` nativo do HTML (continua tipado via `Omit<...HTMLAttributes, keyof ButtonOwnProps>`). As duas coexistem e caem em `...rest` → `otherRest`, espalhado **depois** do `'aria-label': getAriaLabel()` calculado — ou seja, `aria-label` nativo sempre vence silenciosamente sobre a lógica de `ariaLabel`/`tooltipText`. |
| `external` | Quando `true`, ignora silenciosamente `target`/`rel` explícitos do consumidor (só usa `target`/`rel` custom quando `external` é `false` e `target !== '_blank'`). Comportamento não documentado. |
| `to` sem `as` | Emite `console.warn` em dev e trata como `href`. É uma regra só do `Button` — nenhum outro componente do DS tem semântica equivalente. |
| `iconOnly` | Bem modelado via union discriminada (`icon` obrigatório em tipo), mas a validação em runtime é só `console.error` — não impede o render em produção. |
| Tooltip config (`WithTooltip`/`WithoutTooltip`) | Tipo **duplicado** identicamente em `Button`, `ToggleButton`, `Select`, `TextField`, `TextArea` — não está centralizado em `common.types.ts`. Risco de divergência futura. |
| `disabled`/`loading` | `aria-disabled` reflete só `disabled`, nunca `loading`; `tabIndex` reflete os dois. Native `disabled` (quando `Component==='button'`) reflete só `disabled` — redundante com `aria-disabled` nesse caso, mas ausente no caminho `<a>` (usa só `aria-disabled`+`role="link"`). Dois modelos de "desabilitado" coexistindo por tipo de elemento renderizado. |

## 2. Inconsistências entre componentes

- **`aria-label` vs `ariaLabel` já divergem em uso real**: `Button.stories.tsx`/`Button.mdx` usam `ariaLabel`; já `Menu.stories.tsx`, `Menu.mdx` e `Popover.mdx` usam `aria-label` nativo. Como o nativo sempre sobrescreve, em alguns desses exemplos o `aria-label` renderizado final **não é** o que `tooltipText`/`ariaLabel` calcularia — comportamento oculto e não coberto por teste algum.
- **Convenção de nomes de aria-label por sub-elemento**: `Quantity` usa `decrementAriaLabel`/`incrementAriaLabel`/`inputAriaLabel` (prefixado por função), enquanto `Button`/`Radio`/`Select` usam um único `ariaLabel` genérico — divergência de convenção que vale documentar/padronizar num guia central.
- **Tooltip quebra a associação de acessibilidade** para todo consumidor com `tooltipText` (não exclusivo do `Button`, mas afeta diretamente seu recurso mais usado): `TooltipRadix.Trigger asChild` envolve `children` num `<span className={styles.triggerWrapper}>` — o Radix aplica `aria-describedby`/`data-state` nesse `<span>`, não no `<button>` real interno. Leitores de tela não anunciam a descrição do tooltip quando o foco está no botão. Usado em dezenas de botões icon-only (Menu, Popover, TableV2, tabelas legadas).
- **`Button` mistura três modelos de renderização** (`button` nativo / `a` nativo / `as` custom) com regras de acessibilidade diferentes em cada — padrão exclusivo do `Button`, mas sub-testado (ver seções 4/5).

## 3. Levantamento dos casos de uso atuais

Usos confirmados via grep em `apps/`:
- **Radix triggers**: `Popover` (`trigger={<Button .../>}`), `Menu` (`<Button iconOnly ... />` como trigger de dropdown de ações), `Dialog`/`Drawer`/`Modal` (abrir/fechar/confirmar/cancelar).
- **Ações inline em tabelas**: `TableV2`/`Table` (`variant="text" iconOnly icon={...} tooltipText="Mais ações"`) — padrão icon-only + tooltip é o mais repetido no repo.
- **Toast**: botão de ação dentro de notificação.
- **Astro (`apps/hub/src/layouts/Layout.astro`)**: consumo fora do React Router, provavelmente com `href` puro — caso de uso importante para não quebrar (`to`/`as` não se aplicam aqui).
- Variantes usadas: `filled` (default), `outlined`, `text`; tamanhos `lg`/`sm`; `scale` 1/1.5/2; `iconPosition` left/right/both; `fullWidth` pouco usado nas stories atuais; `loading` usado isoladamente em poucos lugares (Toast).

## 4. Testes de regressão — lacunas

O `Button.test.tsx` atual é robusto para renderização/variant/size/scale/loading/icons, mas falta cobertura para:
- Precedência real entre `ariaLabel` (custom) e `aria-label` (nativo) quando ambos são passados — hoje é comportamento indefinido/não testado.
- `external` combinado com `rel`/`target` customizados (confirmar que são descartados, e decidir se isso é o esperado).
- `role="link"` quando `href` + `disabled`.
- Nome acessível do botão **durante `loading`** quando não há `ariaLabel` explícito (achado crítico — seção 6).
- Botão renderizado via `to` sem `as` (fallback como `<a>`) combinado com `disabled`.

## 5. Testes de interação e teclado — lacunas

Não existe nenhum teste de teclado no arquivo atual. Faltam:
- `userEvent.tab()` confirmando ordem de foco e que `disabled`/`loading` são pulados (`tabIndex=-1`).
- `userEvent.keyboard('{Enter}')`/`'{ }'` (espaço) disparando `onClick` no botão focado — nativo no `<button>`, mas relevante quando `Component` é `<a>` (que só ativa com Enter, nunca Space — divergência real de comportamento entre os dois modos que hoje ninguém testa).
- Foco não deve se perder/travar quando o `Button` está envolvido pelo `Tooltip`.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — nome acessível some durante `loading`**: quando não há `ariaLabel` explícito, o nome acessível do botão vem do texto visível (`children`). No estado `loading`, esse texto é envolvido em `<span aria-hidden="true">` (`buttonContentHidden`), e o substituto (spinner) também é `aria-hidden`. Resultado: o botão fica **sem nome acessível algum** enquanto carrega, a menos que o dev tenha passado `ariaLabel` manualmente (não documentado como obrigatório para esse caso).
- 🔴 **Crítico — `aria-describedby` do Tooltip não chega ao elemento focado** (detalhado na seção 2), quebrando o padrão WAI-ARIA de tooltip para todos os botões icon-only com `tooltipText`.
- 🟠 A validação de "icon-only sem nome acessível" só existe como `console.error`/`console.warn` em dev — não protege builds de produção nem é enforced por lint (`eslint-plugin-jsx-a11y` está ativo no pacote mas não cobre esse caso custom).
- 🟡 Redundância de `aria-disabled` + `disabled` nativo no caminho `<button>` (não é erro, mas inconsistente com o caminho `<a>`).

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir nome acessível durante `loading` (ex.: manter texto original no DOM sem `aria-hidden`, ou aplicar técnica visually-hidden ao invés de esconder de AT).
2. Corrigir `Tooltip` para aplicar `asChild` diretamente sobre o elemento filho real (removendo o `<span>` intermediário), garantindo `aria-describedby` no elemento focável.
3. Adicionar suíte de testes de teclado e regressão (itens 4 e 5).
4. Extrair o tipo `WithTooltip/WithoutTooltip` duplicado para `common.types.ts` (refactor interno, sem mudança de API pública).
5. Adicionar regra de lint (ou teste) que falhe o build quando `iconOnly` sem `ariaLabel`/`tooltipText`, ao invés de só `console.error`.

**Potencialmente incompatível (precisa decisão e comunicação):**
6. Definir precedência única entre `ariaLabel` e `aria-label` nativo (recomendação: remover `aria-label` do bag de rest — só `ariaLabel` customizado controla, com warning em dev se `aria-label` nativo for detectado) — muda o resultado renderizado em usos existentes (Menu/Popover stories) que hoje dependem da sobreposição silenciosa.
7. Decidir se `external=true` deve **mesclar** `rel`/`target` custom ao invés de sobrescrever — muda saída de HTML para quem já combina as duas props.

## 8. Janela única de mudanças incompatíveis

Conforme `docs/react/giovani-guidelines.md` e a memória de release deste repo (formato custom de CHANGELOG com seção "Breaking Changes", e regra de não misturar breaking changes com patches), os itens **6 e 7** devem ser agrupados em **uma única MR/major** com:
- Tabela de props antigas → novas no MR (formato do guideline).
- Atualização dos usages divergentes já encontrados (`Menu.stories.tsx`, `Menu.mdx`, `Popover.mdx`) para o padrão único (`ariaLabel`) no mesmo MR.
- Entrada no `CHANGELOG.md` do pacote `react` no formato de `docs/react/changeset-template.md`.

Os itens 1–5 (sem quebra) podem seguir separados, como patch/minor, sem esperar a janela major.
