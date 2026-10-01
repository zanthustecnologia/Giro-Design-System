# Hardening do `TextField` — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `type` | Tipado como `TextFieldType` (`'text'\|'email'\|'password'\|'number'\|'tel'\|'url'`) e o JSDoc de `ValidationParams.type` diz "influencia a validação", mas `validateInput` (`utils/validation.ts`) **nunca desestrutura `type`** — não existe checagem de formato de e-mail/telefone/URL. Documentação promete comportamento que o código não entrega. |
| `required` | Usado só para `aria-required` + mensagem de erro customizada; **não é propagado como atributo HTML nativo** `required` no `<input>` (é destruturado e descartado antes do spread). Diverge de formulários nativos/libs que inspecionam `element.required`/`:invalid`/`reportValidity()`. |
| `error` / `errorMessage` | `hasError = Boolean(inputError) || Boolean(error)`, mas `displayHelperText` só usa `errorMessage` quando `error` é `true` **e** `errorMessage` existe. Se `error={true}` sem `errorMessage`, o campo fica com estado visual/`aria-live` de erro exibindo o `helperText` neutro (ou nada) — nenhuma mensagem de erro real aparece, confundindo usuários e AT. |
| `displayHelperText` fallback `'\u00A0'` | Código morto: o `<span>` que usa esse valor só é renderizado quando `(error && errorMessage) \|\| inputError \|\| helperText` é verdadeiro — condição que já garante um valor real antes de cair no fallback nbsp. O fallback nunca é exibido na prática. |
| `attachedToVirtualKeyboard` / `disableAutoComplete` | Exclusivas do `TextField` — `TextArea` integra o mesmo `VirtualKeyboard` (mesmo padrão `virtualKeyboard === 'default' \| 'numeric'`) mas não tem essas duas props nem o override de `autoComplete`. Risco de autofill/autocomplete do browser atrapalhar o teclado virtual especificamente no `TextArea`. |
| `icon` | Exclusivo do `TextField` (ausente no `TextArea`) — aceitável dado o uso multi-linha, mas vale documentar como decisão deliberada. |
| Tooltip (`tooltipText`/`tooltipSide`/`tooltipAlign`) | Só tem efeito quando `label` também é passado — ver seção 2/6 (achado crítico). Tipo `WithTooltip`/`WithoutTooltip` duplicado (mesmo padrão já citado no hardening do `Button`: também existe em `Select`, `TextArea`, `ToggleButton`). |
| Botão "Limpar campo" | `tabIndex={-1}` — some do fluxo de tab, só é clicável via mouse (`onMouseDown` com `preventDefault`). Não documentado como intencional. |
| `value` | Tipado `string \| number`, mas internamente tudo é normalizado para `string` (`normalizeValue`) e `onChange` sempre devolve `string` — comportamento correto, mas o tipo da prop pode induzir o consumidor a achar que recebe `number` de volta em campos `type="number"`. |

## 2. Inconsistências entre componentes

- **Tooltip da label não é focável via teclado**: `LabelComponent` (`shared/Label/index.tsx`) envolve a label inteira (texto + ícone `Info12Regular`) num `<Tooltip>` que, por baixo, usa `TooltipRadix.Trigger asChild` com um `<span>` (mesmo padrão já identificado no hardening do `Button`). Diferente do `Button` — onde ao menos o elemento interno (`<button>`/`<a>`) é focável e o tooltip aparece ao tabular até ele — aqui o trigger é um `<div>`/`<span>` sem `tabIndex` nem semântica de botão. **Resultado: usuário de teclado nunca consegue abrir o tooltip da label em `TextField`/`TextArea`/`Select` (todos usam o mesmo `LabelComponent`)** — só funciona no hover do mouse. É o mesmo bug de `aria-describedby` do `Button` (seção 2 do hardening dele), só que mais grave aqui por não haver *nenhum* caminho de teclado.
- **Botão "limpar campo" inacessível por teclado também existe no `Search`** (`Search.tsx` linha ~111, mesmo `tabIndex={-1}`) — padrão repetido em pelo menos dois componentes, não é exclusivo do `TextField`. Vale uma decisão central (documentar como intencional ou corrigir nos dois lugares).
- **Convenção de nome acessível divergente**: `Search` usa `aria-label={placeholder}` como fallback automático de nome acessível; `TextField`/`TextArea` **não têm nenhum fallback** — se `label` não for passado, o `<input>`/`<textarea>` fica sem nome acessível algum (a menos que o consumidor passe `aria-label` manualmente via `...rest`, o que não é documentado como prop suportada). `Button` ao menos reage com `console.error` quando `iconOnly` fica sem nome; `TextField` não emite nenhum aviso em dev.
- **`React.memo`**: `TextField` e `TextArea` são exportados com `React.memo`; `Button` não é memoizado. Divergência de padrão de performance entre componentes de formulário sem critério documentado.
- **`required` nativo**: `TextField`/`TextArea` não propagam `required` HTML nativo (só `aria-required`), enquanto não há comparação direta com `Select`/`Radio` nesse ponto — vale um guideline único sobre quando usar `required` nativo vs. `aria-required` custom no DS.

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
1. Corrigir o trigger de tooltip do `LabelComponent` para ser focável via teclado (`tabIndex={0}` + `role="button"`, ou envolver num `<button type="button">` nativo) — correção compartilhada com `Button`/`Select`/`TextArea` (mesmo componente `shared/Label`).
2. Emitir `console.warn` em dev quando `tooltipText` é passado sem `label` (já que hoje é descartado silenciosamente), ou renderizar o tooltip num wrapper próprio quando não há `label`.
3. Resolver o caso `error=true` sem `errorMessage` (ex.: usar uma mensagem genérica de fallback, ou exigir `errorMessage` via tipo quando `error` é `true`).
4. Tornar o botão "Limpar campo" alcançável via teclado (remover `tabIndex={-1}` e tratar blur/foco corretamente) — aplicar também no `Search`.
5. Adicionar `console.warn` em dev quando `TextField` é renderizado sem `label` e sem `aria-label` (nome acessível ausente).
6. Remover o fallback morto `'\u00A0'` de `displayHelperText` ou ajustar a condição de renderização do `<span>` para o cenário em que ele faria sentido (reservar altura mesmo sem texto).
7. Igualar `attachedToVirtualKeyboard`/`disableAutoComplete` (+ override de `autoComplete`) entre `TextField` e `TextArea`.
8. Adicionar suíte de testes de teclado e regressão (itens 4 e 5).
9. Decidir e implementar validação real por `type` (e-mail/telefone/URL) em `validateInput`, ou remover a promessa do JSDoc (`ValidationParams.type` "influencia a validação").

**Potencialmente incompatível (precisa decisão e comunicação):**
10. Propagar `required` como atributo HTML nativo no `<input>`/`<textarea>` — pode ativar validação nativa do browser (`:invalid`, popups de "preencha este campo") em telas que hoje dependem só da validação custom do DS, mudando comportamento visível para o usuário final.
11. Se a correção do item 3 (texto de erro neutro) alterar o texto exibido em telas que hoje dependem do bug (`error=true` sem `errorMessage` mostrando `helperText`/nada), isso muda a saída visível em produção.

## 8. Janela única de mudanças incompatíveis

Os itens **10 e 11** devem ser agrupados em uma única MR/major, junto com qualquer correção do item 1 (tooltip do `LabelComponent`) que também afete `Button`/`Select`/`TextArea` simultaneamente — já que o `LabelComponent` é compartilhado, faz sentido resolver o achado equivalente do hardening do `Button` (seção 2 de lá) na mesma janela, evitando duas rodadas de breaking changes no mesmo componente interno. Seguir o formato de `docs/react/changeset-template.md` para o `CHANGELOG.md`, com tabela de comportamento antigo → novo e levantamento prévio de usos que dependem do(s) bug(s) corrigido(s) (`grep` em `apps/` por `error=` sem `errorMessage` e por `required` em `TextField`/`TextArea`).

Os itens 1–9 (sem quebra) podem seguir separados, como patch/minor, sem esperar a janela major.
