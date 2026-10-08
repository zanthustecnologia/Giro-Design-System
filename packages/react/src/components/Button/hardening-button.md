# Hardening do Button — Notas de análise

> Template de documentação de hardening. Copie este arquivo para `packages/react/src/components/__Componente__/HARDENING.md` e preencha cada seção. Remova os comentários `>` ao finalizar.

## 1. Revisão das propriedades públicas

> Liste as props públicas relevantes e aponte comportamentos ambíguos, não documentados ou que divergem do tipo declarado (ex.: prop que não exclui atributo nativo equivalente, validação só em runtime/dev, união discriminada mal coberta etc.).

| Prop | Observação |
|aria label| duplicado, tem o ariaLabel do componente e o aria-label nativo|
| loading | Durante o loading o componente não fica "escondido" (continua na árvore de acessibilidade e recebe `aria-busy="true""`), mas fica **sem nome acessível**: `children` vai para dentro de `<span aria-hidden="true">` e o spinner também é `aria-hidden`, então o leitor de tela anuncia só "botão", sem texto, a menos que `ariaLabel` tenha sido passado manualmente |
| loading | Durante o loading o componente não pode ser clicado por causa do handleClick, porem ele não fica como desabilitado — e como o `<button>` nativo não recebe `disabled` (só `aria-disabled`), um `type="submit"` dentro de um `<form>` ainda pode disparar submit nativo (ex.: Enter em outro campo), já que submit de formulário não passa pelo `onClick`/`handleClick` |

## 2. Inconsistências entre componentes

> Compare convenções (nomes de props, padrões de acessibilidade, composição com Radix/outros wrappers) do componente analisado contra outros componentes do DS. Cite arquivos/stories/mdx onde a divergência aparece em uso real.

- O `Tooltip` usado pelo `Button` envolve o filho num `<span>` via Radix `Trigger asChild` — o `aria-describedby` cai nesse `<span>` intermediário, não no `<button>`/`<a>` real focável. O mesmo `shared/Label`/`Tooltip` é reusado por `TextField`/`Select`/`TextArea`, então o problema não é exclusivo do `Button`, é um padrão repetido no DS.

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
1. Dar nome acessível ao botão durante `loading` (manter o texto no DOM sem `aria-hidden`, ou aplicar técnica visually-hidden em vez de esconder de AT).
2. Refletir `loading` no atributo `disabled` nativo do `<button>` (ou ao menos impedir submit nativo quando `type="submit"`), já que hoje só o `aria-disabled` reflete `loading`.

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Definir precedência única entre `ariaLabel` custom e `aria-label` nativo (hoje o `aria-label` nativo vence silenciosamente por ser espalhado depois no `baseProps`) — corrigir muda a saída renderizada em usos existentes que já passam `aria-label` direto.

## 8. Janela única de mudanças incompatíveis

> Agrupe todas as alterações incompatíveis levantadas na seção 7 em uma única janela (MR/major), conforme `docs/react/giovani-guidelines.md` e o fluxo de release do repo. Inclua:

- Tabela de props/comportamentos antigos → novos.
- Lista dos usages existentes que precisam ser atualizados no mesmo MR.
- Entrada no `CHANGELOG.md` do pacote `react`, no formato de `docs/react/changeset-template.md`.

Itens sem quebra de compatibilidade (seção 7) podem seguir separados, como patch/minor, sem esperar a janela major.
