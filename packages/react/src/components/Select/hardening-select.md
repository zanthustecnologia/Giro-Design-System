# Hardening do Select — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `multiple` | documentada no JSDoc com exemplo `multiple={true}`, mas não é lida em nenhum lugar do componente/hook — quem decide multi-seleção é só `variant="checkbox"`. Prop morta hoje, cai em `...rest` e é espalhada sobre `SelectRadix.Root` sem efeito |
| `aria-label` | usa a chave nativa (`'aria-label'`), diferente do `ariaLabel` custom do `Button`/`Radio` — mais uma convenção de nome de aria-label coexistindo no DS |
| `error`/`errorMessage` | sem `aria-invalid` no trigger e sem `aria-describedby` ligando o trigger à mensagem de erro/helper text — confirmado ao vivo na story "Obrigatório": o combobox fecha com erro visível na tela, mas a árvore de acessibilidade não marca o campo como inválido nem associa a mensagem |
| asterisco de `required` | o `*` do label entra como texto comum (não `aria-hidden`) — nome acessível do campo vira literalmente "Campo obrigatório *", leitor de tela pode falar o caractere |
| `value`/`onValueChange` | tipado como `string \| string[]` pros três variants juntos, sem união discriminada por `variant`; nos usos reais (`Filter.stories.tsx`) os consumidores já precisam fazer `as string` manual |

## 2. Inconsistências entre componentes

- Mesmo padrão do `Button`/`TextField`: tipo `WithTooltip`/`WithoutTooltip` duplicado no `Select.types.ts` em vez de centralizado em `common.types.ts`.
- Itens planos (`variant="text"/"icon"`) usam `SelectRadix.Item` (Radix cuida de roving tabindex/typeahead), mas `CheckboxSelectItem` e `ExpandableSelectItem` são `div`s soltos fora da árvore de `Select.Item` — dois modelos de acessibilidade/teclado dentro do mesmo componente (ver achados críticos na seção 6).
- `ExpandableSelectItem` ignora a prop `variant`: num `Select variant="checkbox"` com itens aninhados, os itens pai/filho não mostram nenhum `Checkbox` visual (diferente dos itens planos, que usam o componente `Checkbox` real).

## 3. Levantamento dos casos de uso atuais

- **`Select.stories.tsx`**: cobre as três variantes, `scale`, `search`, infinite scroll, busca via API e tooltip.
- **`Filter.stories.tsx`** (uso mais representativo de produção): vários `Select variant="text"` lado a lado, sempre controlados com `(val) => setX(val as string)`.
- Não há uso de `variant="checkbox"` nem de `multiple` em nenhuma story de produção fora do próprio arquivo de stories do `Select` — a seleção múltipla real está pouco exercitada.
- Nenhum uso em `apps/hub` (Astro).

## 4. Testes de regressão — lacunas

- Nenhum teste simula seleção real disparando `onValueChange` com o valor esperado (os testes atuais só checam presença/render).
- Sem teste para item com `children` em `variant="checkbox"` (achado da seção 2).
- Sem teste cobrindo a prop `multiple` (nem para provar que não faz nada).
- Sem teste de precedência entre `error` externo e a validação interna de `required`.

## 5. Testes de interação e teclado — lacunas

Testado manualmente no Storybook (stories "Default", "Variante checkbox", "Com filhos"):
- 🔴 **`variant="checkbox"`: teclado não entra na lista.** Abrindo o select, `ArrowDown`/`ArrowUp`/`Tab` não movem o foco para nenhum item — o foco visível continua preso no trigger. Hoje é **impossível selecionar qualquer opção via teclado** nessa variante.
- 🔴 **Itens com `children` ("Com filhos"): parents inalcançáveis por teclado.** Ao abrir, o Radix foca automaticamente o primeiro `Select.Item` real, pulando os itens expansíveis anteriores (`List item`, `List-item 2`, `List-item 3`); `ArrowUp` a partir do primeiro item plano não volta para os itens-pai. Só dá pra abrir/selecionar esses itens com mouse.
- Nenhum teste automatizado cobre nenhum dos dois cenários acima — a suíte atual não captura a regressão porque mocka o Radix de forma simplificada.
- Falta teste de `Escape` fechando e devolvendo foco ao trigger (funciona na variante `text`, conferido manualmente, mas sem teste).

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — seleção múltipla (`variant="checkbox"`) inacessível por teclado**, confirmado ao vivo (seção 5). Bloqueia completamente usuários de teclado/leitor de tela nessa variante.
- 🔴 **Crítico — itens agrupados (`children`) inalcançáveis por teclado**, confirmado ao vivo (seção 5).
- 🟠 **Alto — erro de validação não é exposto via ARIA**: sem `aria-invalid` nem `aria-describedby` ligando o trigger à mensagem de erro (confirmado na story "Obrigatório": mensagem aparece na tela, mas não na árvore de acessibilidade).
- 🟡 Asterisco de campo obrigatório não é `aria-hidden`, pode ser lido literalmente pelo leitor de tela.
- 🟡 Borda do trigger muda de `border-width-1` para `border-width-2` em `:focus-visible`/`.open`, com `box-sizing: border-box` — mesmo padrão de leve deslocamento de conteúdo já identificado no hardening do `TextField`.

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir navegação por teclado em `CheckboxSelectItem`/`ExpandableSelectItem` (foco não entra na lista / não alcança itens-pai) — prioridade alta, é o achado mais grave.
2. Adicionar `aria-invalid` no trigger quando houver erro, e `aria-describedby` ligando trigger → `errorMessage`/`helperText`.
3. Marcar o asterisco de `required` como `aria-hidden="true"`.
4. Renderizar o `Checkbox` real também em `ExpandableSelectItem` quando `variant="checkbox"`.
5. Extrair `WithTooltip`/`WithoutTooltip` para `common.types.ts` (mesmo ponto do `Button`/`TextField`).
6. Adicionar testes cobrindo seleção real (click/teclado disparando `onValueChange`) e os dois bugs de teclado da seção 5.

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Decidir o destino da prop `multiple`: remover (não tem efeito hoje) ou implementar de fato.
2. Padronizar a convenção de aria-label entre `ariaLabel` custom (`Button`/`Radio`) e `'aria-label'` nativo (`Select` atual) — mesma decisão pendente do hardening do `Button`.

## 8. Janela única de mudanças incompatíveis

Agrupar os itens da seção 7 (parte "potencialmente incompatível") numa única MR/major junto com a decisão equivalente já registrada no hardening do `Button`, com tabela de props antigas → novas, atualização dos usages existentes e entrada no `CHANGELOG.md` no formato de `docs/react/changeset-template.md`. Os itens sem quebra podem seguir separados, como patch/minor.
