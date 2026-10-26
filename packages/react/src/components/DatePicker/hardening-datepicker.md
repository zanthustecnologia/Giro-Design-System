# Hardening do DatePicker — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `aria-label` (hardcoded) | o input interno recebe `aria-label="Open calendar"` fixo no `DatePicker.tsx`, em inglês, sem relação com `locale`/`label`. Confirmado ao vivo no Storybook: o nome acessível do campo é literalmente "Open calendar", **nunca** o `label` visível (ex.: "Data de nascimento"). Existe inclusive um teste (`DatePicker.test.tsx`, "campo tem aria-label 'Open calendar'") que trava esse comportamento como esperado |
| `aria-describedby` (calculado no DatePicker) | o `DatePicker` monta seu próprio `aria-describedby` e passa pro `TextField`, mas é código morto: o `TextField` define `aria-describedby={helperId}` no `<input>` **depois** do `{...rest}` no JSX, então o valor calculado pelo `TextField` sempre vence |
| `minDate`/`maxDate` | só são aplicados visualmente dentro do `Calendar` (dias desabilitados); a digitação manual (`validatePartialDate`/`parseDate`) não recebe `minDate`/`maxDate` nenhum. Confirmado ao vivo: com `minDate = hoje`, digitar `01/01/1990` é aceito, vira valor "selecionado" no calendário (mês/ano navegam pra 1990) e dispara `onChange` — sem nenhum erro exibido |
| `error` | aqui é `string` (mensagem direta), diferente de `TextField`/`Select`, onde é `boolean` + `errorMessage` separado. Quando `error` e `helperText` coexistem, são concatenados num único texto com separador `•` (`combinedHelperText`), perdendo a distinção visual/semântica entre ajuda e erro |
| `disabled` | não aparece na interface `DatePickerProps` (vem só via `ScalableProps` → `BaseProps`), e não há exemplo no JSDoc do componente |

## 2. Inconsistências entre componentes

- Nenhum outro campo do DS (`TextField`, `Select`, `TextArea`) bloqueia teclas no `onKeyDown` por uma whitelist — o `DatePicker` faz isso (só libera dígitos + `Backspace`/`Delete`/`ArrowLeft`/`ArrowRight`/`Enter`/`Escape`), e essa whitelist não inclui `Tab` (achado crítico, seção 5/6).
- `error` como `string` aqui vs. `boolean`+`errorMessage` em `TextField`/`Select` — mesmo conceito, convenção diferente dentro do mesmo pacote.
- `Popover` tem um modo `asAnchor` descrito na própria doc como "modo DatePicker" (trigger só abre/fecha via `open`/`onOpenChange` controlado) — API do `Popover` foi moldada em função do `DatePicker`, acoplamento que vale documentar explicitamente.
- Usa `TextField` internamente, então herda qualquer achado futuro do hardening do `TextField` (ex.: tooltip/clear button inacessíveis por teclado) — aqui agravado porque o `aria-label` fixo já quebra o nome acessível antes mesmo desses outros problemas.

## 3. Levantamento dos casos de uso atuais

- **`Filter.stories.tsx`** (uso mais representativo de produção): dois `DatePicker` lado a lado como filtro de intervalo de datas, o segundo com `minDate={dataInicio ?? undefined}` — exatamente o padrão onde o bypass de `minDate` via digitação (seção 1) tem mais impacto prático.
- **`DatePicker.stories.tsx`/`.mdx`**: cobre `locale` pt-br/en-us, `calendarSide`/`calendarAlign`, `error`, modo controlado/não controlado, `scale`, e restrição de datas (`minDate`).
- Nenhum uso encontrado em `apps/hub` (Astro).

## 4. Testes de regressão — lacunas

- Não há teste digitando uma data fora de `minDate`/`maxDate` para confirmar que é (ou deveria ser) rejeitada — hoje passaria mesmo sendo um bug, porque não existe validação nenhuma de range na digitação.
- Não há teste de `Tab` enquanto o foco já está dentro do campo (só existe teste de `Tab` entrando no campo vindo de fora) — por isso o keyboard trap da seção 5/6 não é pego pela suíte atual.
- O teste de `aria-label` existente (seção 1) documenta o bug como comportamento esperado — precisa ser atualizado junto com a correção.
- Sem teste cobrindo a precedência entre `error` (string) e `helperText` quando os dois têm textos longos (concatenados com `•`).

## 5. Testes de interação e teclado — lacunas

Testado manualmente no Storybook (story "Default"):
- 🔴 **Tab não sai do campo.** Com o campo focado (calendário aberto ou fechado), pressionar `Tab` não move o foco para o próximo elemento — confirmado: o `textbox` continua `[active]` após o `Tab`. Causa no código: `handleKeyDown` faz `if (!/^\d$/.test(key)) event.preventDefault()` como fallback geral, e `Tab` cai nesse `else` por não estar na whitelist de `controlKeys`.
- Nenhum teste cobre esse cenário (só existe teste de entrar no campo via Tab vindo de fora).
- `ArrowUp`/`ArrowDown` também caem no mesmo bloqueio quando o foco está no input (só `ArrowLeft`/`ArrowRight` estão liberados).

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — keyboard trap confirmado ao vivo**: usuário de teclado não consegue sair do campo de data com `Tab` (viola WCAG 2.1.2 "No Keyboard Trap"). É o achado mais grave do componente.
- 🔴 **Crítico — nome acessível fixo em inglês, ignora o `label` configurado**: confirmado ao vivo (`textbox "Open calendar"` em vez de `"Data de nascimento"`), e esse comportamento está hoje travado por teste automatizado.
- 🟠 **Alto — bypass silencioso de `minDate`/`maxDate` via digitação**: usuário pode digitar e commitar (via `onChange`) uma data fora do intervalo permitido, sem nenhum erro/feedback, mesmo com os dias correspondentes desabilitados no calendário visual — confirmado ao vivo.
- 🟡 Separador `•` concatenando `helperText` + `error` externo num texto só, sem distinção semântica entre ajuda e erro para quem usa leitor de tela.

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir `handleKeyDown` para nunca bloquear `Tab`/`Shift+Tab` (nem outras teclas de navegação/sistema que hoje caem no fallback de `preventDefault`).
2. Trocar o `aria-label="Open calendar"` fixo por um nome acessível derivado do `label`/`locale` reais (e atualizar o teste que trava o valor atual).
3. Validar `minDate`/`maxDate` também no caminho de digitação (`validatePartialDate`/`parseDate`), não só no `Calendar` visual.
4. Remover o cálculo de `aria-describedby` morto no `DatePicker` (já que o `TextField` sempre sobrescreve) ou corrigir a ordem para que a intenção do `DatePicker` realmente seja respeitada.
5. Adicionar testes para os itens 1 e 3 (Tab dentro do campo; digitação fora do range).

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Padronizar `error` como `boolean` + `errorMessage` (igual `TextField`/`Select`) em vez de `string` único — muda a assinatura pública da prop.

## 8. Janela única de mudanças incompatíveis

O item 1 da seção 7 (potencialmente incompatível) deve entrar numa única MR/major junto com decisões equivalentes já registradas nos hardenings do `Button`/`Select`, com tabela de props antigas → novas, atualização dos usages existentes (`Filter.stories.tsx`) e entrada no `CHANGELOG.md` no formato de `docs/react/changeset-template.md`. Os itens sem quebra (seção 7) — especialmente o keyboard trap e o bypass de `minDate`/`maxDate`, ambos confirmados em uso real — podem e devem seguir como patch, sem esperar a janela major.
