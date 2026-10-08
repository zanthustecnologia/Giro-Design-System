# Hardening do TextField — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|type|o type não esta fazendo as validações (ex.: number aceita a letra "e" por padrão nativo do HTML); além disso, mesmo com type="number" o valor/onChange sempre trafega como string (value normalizado via normalizeValue), nunca como number|
| testes | da para ter mais testes, inclusive testes do teclado |
| required | Quando o campo esta com a mensagem de erro do required e você preenche ele, quando você clica fora ele apaga o conteudo |
| acessibilidade | Tooltip e "Limpar campo" são inacessíveis pelo teclado |
| acessibilidade | Tooltip só aparece se tiver Label |
| visual | Quando o TextField é focado o Placeholder vai para o lado, não era para isso acontecer e não acontece no input basico do html. Causa: `.inputContainer:focus-within` muda a espessura da borda de `border-width-1` para `border-width-2`; como é `box-sizing: border-box`, a área útil interna encolhe e desloca o texto/placeholder só de focar (piora ainda mais quando o botão "Limpar" aparece via `.inputWithIcon`) |
| error | aria-describedby quebrado: quando error=true sem errorMessage/inputError/helperText, helperId vira ${componentId}-error, mas o <span> com esse id não é renderizado (guard (error && errorMessage) || inputError || helperText é falso). O input aponta aria-describedby para um elemento que não existe no DOM — referência ARIA inválida. |
| error | Erro interno mascarado pelo externo: Se error=true com errorMessage e ao mesmo tempo há um inputError ativo (ex.: maxLength excedido), só o errorMessage externo aparece — o erro de validação interna some silenciosamente. |
| error | .errorWithMessage dissociado do estado de erro real: a classe é aplicada só por !!errorMessage, independente de error/hasError. No modo attachedToVirtualKeyboard, o SCSS tem &.errorWithMessage .helperText { color: alert } — se o consumidor sempre passar errorMessage (comum com libs de formulário) mas error estiver false, o helperText normal aparece pintado de vermelho/alerta mesmo sem erro nenhum ativo. |
| ClearIcon | O botão de limpar/apagar não aparece quando se digita apenas espaços, com isso pode acontecer de você digitar varios espaços e ele não aparecer para apagar |
| storybook | falta props no Docs do storybook (ex.: `error`/`errorMessage` não têm entrada em `argTypes` no `TextField.stories.tsx`, não aparecem na tabela de Docs) |


## 2. Inconsistências entre componentes

- Mesmo padrão do `Button`: o `Tooltip` usado via `shared/Label` envolve o filho num `<span>` com Radix `Trigger asChild` — `aria-describedby` cai nesse `<span>` intermediário, não no elemento focável real. Problema compartilhado entre `TextField`/`TextArea`/`Select`, não exclusivo daqui.
- Diferente do `Search` (que usa `placeholder` como `aria-label` fallback quando falta nome acessível), `TextField` não tem nenhum fallback quando `label` não é passado.

## 3. Levantamento dos casos de uso atuais

Usos confirmados via grep em `apps/`:
- **Formulários simples**: `TextField.stories.tsx`/`TextField.mdx` — label + placeholder, variações de `icon`, `scale` (1/1.5/2).
- **Dentro de `Modal`**: `Modal.stories.tsx` usa `TextField` como campo de formulário em diálogo.
- **Teclado virtual**: `VirtualKeyboard.stories.tsx` e `GettingStarted.mdx` usam `TextField` com `value`/`onChange` controlado + `helperText` explicando o fluxo — caso de uso sensível por depender do hook `useInputKeyboardValue` e do `targetRef` (ver `/memories/repo/react-virtual-keyboard.md`).
- Nenhum uso encontrado nas stories com `tooltipText` isolado (sem `label`), `required` nativo, `disableAutoComplete`, ou `type` diferente de `text`/`email` — ou seja, boa parte das lacunas das seções 4–6 também são lacunas de **cobertura de exemplo/documentação**, não só de teste.

## 4. Testes de regressão — lacunas

O `Textfield.test.tsx` atual cobre bem renderização/scale/interações básicas/validação de `required`+`maxLength`/disabled/ícone, mas falta cobertura para:
- `type="email"/"number"/"tel"/"url"` — nenhum teste comprova (nem documenta) que não há validação de formato real.
- `tooltipText` — nenhum teste renderiza o `TextField` com `tooltipText`, nem o caso `tooltipText` **sem** `label` (hoje descartado silenciosamente).
- `error={true}` sem `errorMessage` (loophole da seção 1: estado de erro sem mensagem visível).
- `required` nativo no DOM (`input.required`) — só é testado `aria-required`? (confirmar ausência).
- `virtualKeyboard`, `attachedToVirtualKeyboard`, `disableAutoComplete` — zero menções no arquivo de teste.
- Revalidação via `useEffect` quando `value` muda externamente enquanto já existe um `inputError` ativo (efeito tem `inputError` como dependência).

## 5. Testes de interação e teclado — lacunas

Não existe nenhum teste de teclado no arquivo atual (só `fireEvent`, sem `userEvent`). Faltam:
- `userEvent.tab()` confirmando que o botão "Limpar campo" é pulado (`tabIndex=-1`) — hoje é comportamento acidental e não documentado, não garantido por teste.
- Confirmar que o ícone de tooltip da label **não é alcançável via teclado** (achado crítico — seção 6) e, após correção, testar que passa a ser focável e aciona o tooltip com `Enter`/foco.
- `userEvent.keyboard` disparando `onChange` e validação via digitação real (hoje só via `fireEvent.change` sintético).
- Comportamento de foco quando `virtualKeyboard` está ativo (abrir/fechar teclado ao focar/desfocar o input), consistente com o fluxo descrito na memória do repo sobre `VirtualKeyboard`.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — tooltip da label inacessível via teclado**: o trigger do `Tooltip` em `LabelComponent` é um `<div>`/`<span>` sem `tabIndex` nem papel de botão — usuários de teclado nunca veem o conteúdo do tooltip (diferente do `Button`, que ao menos mostra o tooltip ao focar o botão real, mesmo com o `aria-describedby` no elemento errado). Afeta todo `TextField`/`TextArea`/`Select` com `tooltipText`.
- 🔴 **Crítico — `tooltipText` descartado silenciosamente sem `label`**: como o único lugar que renderiza `<LabelComponent>` (e, portanto, o `Tooltip`) é `{label && (...)}`, passar `tooltipText` sem `label` não tem efeito algum e não gera warning em dev.
- 🟠 **Sem nome acessível garantido**: se `label` não é passado, o input não tem fallback de nome acessível (diferente de `Search`, que usa `placeholder` como `aria-label`), e não há `console.warn`/`console.error` em dev avisando o consumidor, ao contrário do padrão já adotado no `Button` para `iconOnly` sem nome.
- 🟠 **Estado de erro sem mensagem**: `aria-invalid`/`aria-live="polite"` podem ficar ativos (`hasError=true`) sem nenhum texto de erro visível quando `error=true` e `errorMessage` não é passado — AT sinaliza erro sem explicação.
- 🟡 **Botão "Limpar campo" inacessível por teclado** (`tabIndex={-1}`) — ação de limpar só existe para quem usa mouse/touch; mesmo padrão repetido no `Search`.
- 🟡 `required` nativo ausente no DOM — comportamento de validação nativa do browser (`:invalid`, `reportValidity()`) não se aplica, só a validação custom do DS.


## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir o `useEffect` de sync com `value` para não sobrescrever `inputValue` quando só `inputError` mudou (causa raiz do bug de apagar conteúdo ao clicar fora após erro de `required`).
2. Corrigir `helperId`/`aria-describedby` para só apontar para o `<span>` quando ele realmente for renderizado.
3. Adicionar `error`/`errorMessage` ao `argTypes` do `TextField.stories.tsx`.
4. Unificar a verificação de "vazio" (`trim()` vs. `value.length` cru) usada por `showClearIcon`/`maxLength`/`required`.

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Decidir prioridade entre `errorMessage` externo e `inputError` interno quando os dois coexistem, e desacoplar a classe `.errorWithMessage` de `!!errorMessage` isolado (hoje ignora `hasError`).
