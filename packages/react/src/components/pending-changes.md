# Mudanças pendentes pós-hardening

Consolidação das mudanças levantadas nos arquivos `hardening-*.md` de cada componente, organizadas por componente e categorizadas conforme `.gitlab/merge_request_templates/default-template.md`:

- 🐛 **PATCH** — Bug fix, documentação, refatoração interna (sem quebra)
- ✨ **MINOR** — Nova funcionalidade sem quebrar compatibilidade
- 💥 **MAJOR** — Breaking change, API incompatível com a versão anterior

> Itens MAJOR de componentes diferentes devem ser agrupados numa única janela de release (MR/major), conforme `docs/react/giovani-guidelines.md`, com tabela de props antigas → novas e entrada no `CHANGELOG.md` no formato de `docs/react/changeset-template.md`.

> ✅ **Revisão pós-merge (2026-11-09):** após mesclar `developer` nesta branch, os arquivos `DatePicker.tsx` e `TextField.tsx` sofreram alterações. Itens já corrigidos pela `developer` foram removidos desta lista.

---

## Button

### 🐛 PATCH
1. Dar nome acessível ao botão durante `loading` (hoje `children` e spinner ficam `aria-hidden`, botão fica sem nome para leitor de tela).
2. Refletir `loading` no atributo `disabled` nativo do `<button>` (hoje só `aria-disabled` reflete `loading`, permitindo submit nativo em `type="submit"`).
3. Definir precedência única entre `ariaLabel` custom e `aria-label` nativo — hoje `aria-label` nativo vence silenciosamente por ser espalhado depois no `baseProps` (`...otherRest` sobrescreve a chave `'aria-label'` já calculada). Reclassificado de MAJOR para PATCH: nenhuma prop muda de nome/tipo/assinatura, é correção de um comportamento hoje indefinido/acidental (bug fix), não quebra de API pública. Vale só checar se algum uso real passa as duas props ao mesmo tempo antes de corrigir, pra não surpreender silenciosamente esse caso.

---

## Tooltip

### 🐛 PATCH
1. Corrigir JSDoc de `side`/`align` em `Tooltip.types.ts` para refletir os defaults reais (`'bottom'`/`'start'`), ou alinhar o código ao doc.
2. Fazer merge de `style` com um eventual `style` vindo de `rest` em vez de deixar `{...rest}` sobrescrever o `maxWidth` calculado silenciosamente.
3. Remover/filtrar explicitamente `disabled` do `...rest` espalhado no `Content` (prop herdada de `BaseProps` sem efeito, gera atributo DOM inválido).
4. Importar `Side`/`Align` de `@/types` em `shared/Label/index.tsx` em vez do union literal duplicado.
5. Extrair `WithTooltip`/`WithoutTooltip` para `common.types.ts` (duplicado em `Button`/`Select`/`TextField`/`TextArea`).

### ✨ MINOR
1. Expor `open`, `defaultOpen`, `onOpenChange`, `delayDuration`, `disableHoverableContent` em `TooltipProps`, repassando ao `Root`/`Provider` (opcionais, não quebram uso atual).

### 💥 MAJOR
1. Corrigir `aria-describedby` para apontar ao elemento focável real — exige repensar como `Trigger asChild` encaminha refs/props (hoje `shared/Label` passa uma `<div>` com múltiplos filhos, não um único elemento focável).
2. Decidir se o `Provider` deve ser centralizado em nível de aplicação (um único `TooltipProvider` compartilhado) em vez de um por instância de `Tooltip`, para habilitar `skipDelayDuration` em grupos.

---

## TextField

### 🐛 PATCH
1. Corrigir `helperId`/`aria-describedby` para só apontar para o `<span>` quando ele realmente for renderizado — **ainda presente**: quando `error=true` sem `errorMessage`/`inputError`/`helperText`, `helperId` continua sendo `${componentId}-error` mesmo com o guard de render (`(error && errorMessage) || inputError || helperText`) falso.
2. Adicionar `error`/`errorMessage` ao `argTypes` do `TextField.stories.tsx` (faltam no Docs do Storybook) — **ainda não feito**, o story `Default` só teve `placeholder`/`helperText`/`label` ajustados, sem novo `argTypes`.
3. Decidir prioridade entre `errorMessage` externo e `inputError` interno quando os dois coexistem, e desacoplar a classe `.errorWithMessage` de `!!errorMessage` isolado (hoje ignora `hasError`) — **ainda presente**, nenhuma mudança nessa lógica no merge. Reclassificado de MAJOR para PATCH: mesmo padrão do item do `Button` (precisão/precedência interna entre dois estados de erro) — nenhuma prop muda de nome/tipo, é bug fix de qual mensagem/classe prevalece quando os dois coexistem.

---

## Select

### 🐛 PATCH
1. Corrigir navegação por teclado em `CheckboxSelectItem`/`ExpandableSelectItem` (foco não entra na lista / não alcança itens-pai) — prioridade alta.
2. Adicionar `aria-invalid` no trigger quando houver erro, e `aria-describedby` ligando trigger → `errorMessage`/`helperText`.
3. Marcar o asterisco de `required` como `aria-hidden="true"`.
4. Renderizar o `Checkbox` real também em `ExpandableSelectItem` quando `variant="checkbox"`.
5. Extrair `WithTooltip`/`WithoutTooltip` para `common.types.ts` (mesmo ponto do `Button`/`TextField`).
6. Adicionar testes cobrindo seleção real (click/teclado disparando `onValueChange`) e os dois bugs de teclado da seção 5 do hardening.

### ✨ MINOR
1. Padronizar a convenção de aria-label entre `ariaLabel` custom (`Button`/`Radio`) e `'aria-label'` nativo (`Select` atual). Reclassificado de MAJOR para MINOR: hoje o `Select` só tem `'aria-label'` nativo (nenhuma prop `ariaLabel` custom existe ainda), então adicionar `ariaLabel` como nova prop opcional é aditivo e não quebra quem já usa `'aria-label'`. Só vira MAJOR se a decisão for remover/renomear o `'aria-label'` nativo em vez de apenas somar a nova prop.

### 💥 MAJOR
1. Decidir o destino da prop `multiple`: remover (não tem efeito hoje) ou implementar de fato.

---

## DatePicker

### 🐛 PATCH
1. Corrigir `handleKeyDown` para nunca bloquear `Tab`/`Shift+Tab` (keyboard trap confirmado ao vivo) — **ainda presente**: o fallback `if (!/^\d$/.test(key)) event.preventDefault()` continua sem excluir `Tab`. Falta também teste cobrindo esse caso (nenhum foi adicionado no merge da `developer`).
2. Trocar o `aria-label="Open calendar"` fixo por um nome acessível derivado do `label`/`locale` reais (e atualizar o teste que trava o valor atual) — **ainda presente**: o atributo continua hardcoded, e os testes atualizados no merge passaram a usar `getByRole('textbox', { name: /open calendar/i })`, reforçando o valor atual em vez de corrigi-lo.
3. Remover o cálculo de `aria-describedby` morto no `DatePicker` (já que o `TextField` sempre sobrescreve) ou corrigir a ordem para respeitar a intenção do `DatePicker` — **ainda presente**: o `TextField` continua definindo `aria-describedby={helperId}` depois do `{...rest}` no JSX do `<input>`, então o valor calculado pelo `DatePicker` continua sendo descartado.

### 💥 MAJOR
1. Padronizar `error` como `boolean` + `errorMessage` (igual `TextField`/`Select`) em vez de `string` único — muda a assinatura pública da prop.

---

## VirtualKeyboard

### 🐛 PATCH
1. Corrigir o texto do `aria-label` do menu de acentos ("Opcoes" → "Opções").
2. Adicionar `aria-label` nas teclas de ícone (`bksp`, `shift`, `capslock`, `downkeyboard`) — continua válido mesmo sem navegação via `Tab`: ajuda leitores de tela que exploram por toque (ex.: VoiceOver/TalkBack em swipe) a anunciar o nome da tecla.
3. Adicionar testes que usem `getByRole` nas teclas (guarda contra regressão) — ajustar para cobrir só nome acessível/`role` quando adicionados, sem assumir foco via `Tab`.


