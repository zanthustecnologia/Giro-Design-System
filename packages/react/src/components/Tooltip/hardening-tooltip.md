# Hardening do Tooltip — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| Tooltip (nos componentes) | o código de `WithTooltip`/`WithoutTooltip` é duplicado em todos os componentes (`Button`, `Select`, `TextField`, `TextArea`, `ToggleButton`), dá para colocar isso em `common.types.ts` — mesmo achado já catalogado nos hardenings do `Button`/`Select`. |
| Tooltip | leitor de tela não consegue ler a descrição do tooltip — causa raiz: `TooltipRadix.Trigger asChild` envolve o `children` num `<span className={styles.triggerWrapper}>` fixo, então o `aria-describedby` que o Radix injeta cai nesse `<span>` intermediário, nunca no elemento focável real (`<button>`, `<a>`, etc.) passado como filho. Esse é o bug raiz já referenciado nos hardenings do `Button`, `Select`, `TextField` e `TextArea` — todos apontam para o `Tooltip` como origem. |
| `side`/`align` | JSDoc diverge do valor real: `Tooltip.types.ts` documenta `@default 'top'` para `side` e `@default 'center'` para `align`, mas `Tooltip.tsx` usa `side = 'bottom'` e `align = 'start'` como default — quem só lê o tipo (ex. Storybook autodocs) vê um posicionamento padrão diferente do que o componente realmente renderiza. |
| `disabled` (herdado de `BaseProps`) | `TooltipProps extends BaseProps`, que declara `disabled?: boolean`. Essa prop nunca é destruturada em `Tooltip.tsx`, então cai em `...rest` e é espalhada em `TooltipRadix.Content` (um `<div>`) — não desabilita o tooltip, só gera um atributo `disabled` inválido no DOM. Passa a falsa impressão de que dá para desabilitar o tooltip via essa prop. |
| `id` (herdado de `BaseProps`) | também cai em `...rest` e só chega ao `TooltipRadix.Content`; nunca é aplicado ao `Trigger`/`span` wrapper, então não ajuda a amarrar `aria-describedby`/`id` de forma previsível caso o bug acima seja corrigido futuramente. |
| `style` / `{...rest}` | o `style` calculado a partir de `maxWidth` é definido **antes** de `{...rest}` no JSX do `Content` — se o consumidor passar `style` customizado (via rest, já que não existe prop `style` dedicada), ele sobrescreve silenciosamente o `maxWidth` calculado, sem merge. |
| Controle do Radix `Root`/`Provider` | `TooltipRadix.Root` e `TooltipRadix.Provider` são renderizados sem nenhuma prop — `open`, `defaultOpen`, `onOpenChange`, `delayDuration`, `disableHoverableContent` e `skipDelayDuration` do Radix não são expostos nem repassados. Não dá para controlar abertura programática (ex.: abrir tooltip ao toque em mobile) nem customizar o delay por instância. |
| `Provider` por instância | cada `<Tooltip>` cria seu próprio `TooltipRadix.Provider`, em vez de haver um único Provider compartilhado na árvore. Isso neutraliza o recurso do Radix de "skip delay duration" entre tooltips vizinhos (ex. vários botões icon-only numa toolbar) — cada tooltip sempre espera o delay cheio, independentemente de o usuário já estar navegando entre triggers. |

## 2. Inconsistências entre componentes

- `shared/Label/index.tsx` (usado por `TextField`/`TextArea`/`Select`) envolve com `Tooltip` uma `<div>` inteira (`labelContainer`, contendo label + asterisco + ícone de info), que **não tem nenhum elemento focável dentro do trigger** — diferente do `Button`/`ToggleButton`, que ao menos embrulham o próprio `<button>` real (focável, mesmo com o `aria-describedby` caindo no elemento errado). Resultado: no padrão `Label`, o tooltip é inalcançável via teclado; no padrão `Button`, o tooltip aparece ao focar mas a descrição não é lida pelo leitor de tela. São dois sintomas da mesma causa raiz do `Tooltip` (item acima), mas com severidades diferentes.
- `Select.tsx`/`TextArea.tsx` derivam um booleano redundante `tooltip={!!tooltipText}` repassado ao `LabelComponent`, enquanto `Button.tsx` decide inline (`if (tooltipText && !loading) return <Tooltip>...`) — mesmo conceito, duas convenções diferentes de API interna para "ativar tooltip quando há texto".
- `Tooltip.types.ts` declara `side`/`align` usando os tipos compartilhados `Side`/`Align` de `@/types`, mas `shared/Label/index.tsx` redeclara localmente um union literal `"top" | "right" | "bottom" | "left"` em vez de importar `Side`/`Align` — duplicação de tipo que pode divergir silenciosamente se `Side`/`Align` ganharem novos valores.

## 3. Levantamento dos casos de uso atuais

Usos confirmados via grep em `packages/`:
- **Via `Button`** (`Button.tsx`, `tooltipText`): consumido indiretamente por `Drawer` (botão fechar), `Modal` (botão fechar) e `Quantity` (botões aumentar/diminuir) — todos passam `tooltipText` para o `Button`, que é quem importa e renderiza o `Tooltip` de fato.
- **Via `ToggleButton`** (`components/Toggle.tsx` e `components/ToggleGroup.tsx`): mesmo padrão do `Button`, embrulha o próprio elemento interativo quando `tooltipText` é passado.
- **Via `shared/Label`**: usado por `TextField`, `TextArea` e `Select` para o ícone de informação ao lado do label — é o único consumidor que embrulha um elemento não focável (ver seção 2).
- **Legado**: `components/.deprecated/Select` e `.deprecated/SelectField` importam a versão `.deprecated/Tooltip` (API antiga com `position`), não a versão atual — não afetado por este hardening.
- Nenhum uso direto de `<Tooltip>` com `maxWidth`, `sideOffset`/`alignOffset` customizados ou `className` foi encontrado fora do próprio componente — ou seja, essas props praticamente não têm cobertura de exemplo/uso real, só a API declarada.

## 4. Testes de regressão — lacunas

O `Tooltip.test.tsx` atual tem **um único teste** (mostra ao hover). Faltam:
- `side`/`align` — nenhum teste confirma `data-side`/`data-align` aplicados no `Content`, nem a divergência entre o default do JSDoc e o default real do código (seção 1).
- `maxWidth` — nenhum teste verifica o `style.maxWidth` aplicado, nem o caso sem `maxWidth` (`'auto'`).
- `className` — nenhum teste confirma o merge via `clsx(styles.tooltipContent, className)`.
- `sideOffset`/`alignOffset` — não testados.
- Passagem de props arbitrárias via `{...rest}` (ex.: `data-testid`, `aria-label`, `id`) para o `Content` — não testado.
- Esconder o tooltip após `unhover` (`userEvent.unhover`) — só o "mostrar" é testado, não o "esconder".
- Comportamento com múltiplos `Tooltip`s renderizados lado a lado (cada um com seu próprio `Provider`) — não há teste que exponha a falta de `skipDelayDuration` compartilhado.

## 5. Testes de interação e teclado — lacunas

Não existe nenhum teste de teclado no arquivo atual (só `userEvent.hover`). Faltam:
- `userEvent.tab()` até o elemento focável dentro do `children` confirmando que o tooltip abre ao foco (quando o filho é focável, ex.: um `<button>`).
- Confirmar, como regressão do achado crítico, que quando o `children` **não** é focável (padrão `shared/Label`), o tooltip **não** é alcançável nem fechável via teclado.
- Tecla `Escape` fechando o tooltip aberto (comportamento nativo do Radix, nunca testado aqui).
- Verificar para quem o `aria-describedby` é de fato aplicado (hoje recairia no `<span>` wrapper, não no filho real) — útil como teste de regressão para quando o bug for corrigido.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — `aria-describedby` não chega ao elemento focável real**: `TooltipRadix.Trigger asChild` envolve o `children` num `<span>` fixo (`styles.triggerWrapper`), então o atributo que o Radix injeta para associar o conteúdo do tooltip ao elemento fica no `<span>` intermediário. Leitores de tela não leem a descrição do tooltip ao focar/hover no elemento real, violando o padrão WAI-ARIA de tooltip (que exige `aria-describedby` no próprio elemento que recebe foco). Causa raiz dos achados equivalentes já documentados em `Button`, `Select`, `TextField` e `TextArea`.
- 🔴 **Crítico — tooltip inalcançável via teclado quando usado via `shared/Label`**: o `children` passado ao `Tooltip` nesse caso é uma `<div>` sem `tabIndex` nem elemento focável interno dedicado ao tooltip — usuários de teclado nunca recebem foco no trigger e, portanto, nunca veem o tooltip (afeta todo `TextField`/`TextArea`/`Select` com `tooltipText`).
- 🟠 **`disabled` herdado sem efeito**: por vir de `BaseProps` e cair em `...rest`, pode ser passado pelo consumidor esperando desabilitar o tooltip, mas apenas vira um atributo DOM inválido em `<div>` (sem efeito funcional, comportamento silencioso e não documentado).
- 🟡 **Sem forma de fechar/controlar o tooltip programaticamente**: sem `open`/`onOpenChange` expostos, não há como um consumidor fechar o tooltip em resposta a eventos externos (ex.: scroll, fechamento de modal pai) — precisa depender só do comportamento automático do Radix.
- 🟡 **Delay não configurável / Provider por instância**: sem `delayDuration`/`skipDelayDuration` expostos e com um `Provider` por `Tooltip`, grupos de tooltips vizinhos (toolbar de ícones) não se beneficiam do "open rápido" ao navegar entre triggers já abertos, o que é a prática recomendada do próprio Radix para UX de tooltips em conjunto.

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir o JSDoc de `side`/`align` em `Tooltip.types.ts` para refletir os defaults reais (`'bottom'`/`'start'`), ou alinhar o código ao doc — o que for a intenção original.
2. Expor `open`, `defaultOpen`, `onOpenChange`, `delayDuration`, `disableHoverableContent` em `TooltipProps` e repassá-los ao `Root`/`Provider` (todos opcionais, não quebram uso atual).
3. Fazer o merge de `style` com um eventual `style` vindo de `rest` em vez de deixar `{...rest}` sobrescrever o `maxWidth` calculado silenciosamente.
4. Remover/filtrar explicitamente `disabled` do `...rest` espalhado no `Content` (já que `BaseProps` o declara mas o componente não o implementa), evitando o atributo DOM inválido.
5. Extrair `WithTooltip`/`WithoutTooltip` para `common.types.ts` (mesmo ponto do `Button`/`Select`/`TextField`/`TextArea`).
6. Importar `Side`/`Align` de `@/types` em `shared/Label/index.tsx` em vez do union literal duplicado.

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Corrigir o `aria-describedby` para apontar ao elemento focável real — exige repensar como `Trigger asChild` encaminha refs/props (hoje `shared/Label` passa uma `<div>` com múltiplos filhos, não um único elemento focável; pode exigir mudar a API de consumo do `Tooltip` nesse caso).
2. Decidir se o `Provider` deve ser centralizado em nível de aplicação (ex.: um `TooltipProvider` único exportado pelo DS) em vez de um por instância de `Tooltip`, para habilitar `skipDelayDuration` em grupos — muda a forma como consumidores hoje usam o componente isoladamente.

## 8. Janela única de mudanças incompatíveis

> Agrupe todas as alterações incompatíveis levantadas na seção 7 em uma única janela (MR/major), conforme `docs/react/giovani-guidelines.md` e o fluxo de release do repo. Inclua:

- Tabela de props/comportamentos antigos → novos.
- Lista dos usages existentes que precisam ser atualizados no mesmo MR.
- Entrada no `CHANGELOG.md` do pacote `react`, no formato de `docs/react/changeset-template.md`.

Itens sem quebra de compatibilidade (seção 7) podem seguir separados, como patch/minor, sem esperar a janela major.
