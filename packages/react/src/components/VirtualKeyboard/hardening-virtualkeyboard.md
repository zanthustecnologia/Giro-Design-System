# Hardening do VirtualKeyboard — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `error`/`errorMessage`/`helperText` | só têm efeito no `variant="fixed"` (repassadas pro `TextField` interno); no `variant="native"` são aceitas pelo tipo mas não têm nenhum uso/efeito — `VirtualKeyboardProps` não discrimina por `variant`, mesmo padrão de união não-discriminada já visto no `Select` |
| `VirtualKeyboardProps extends Omit<BaseProps, 'disabled'>` | prop `disabled` removida de propósito (não dá pra desabilitar o teclado inteiro) — correto na intenção, mas sem nenhum aviso/dev-warning se o campo (`targetRef`) estiver `disabled` e o consumidor ainda tentar interagir |
| `nativeHeight` | só documentado/efetivo em `variant="native"`; em `fixed` é silenciosamente ignorado (consistente com a doc, mas reforça a falta de união discriminada) |
| `onTypeChange` | documentado como "sempre dispara na montagem inicial" — confirmado no código (`useEffect` com `[type, onTypeChange]`), comportamento intencional e bem documentado, ok |
| Ícones de tecla (`bksp`, `shift`, `capslock`, `downkeyboard`) | injetados via `createPortal` sem nenhum `aria-label`/texto alternativo — mesmo problema de fundo da seção 6 |

## 2. Inconsistências entre componentes

- Diferente de `Button`/`TextField`/`Select` (sempre renderizam elemento nativo `<button>`/`<input>` focável por padrão), o `VirtualKeyboard` depende do `react-simple-keyboard`, que renderiza as teclas como `<div>` sem `role`/`tabindex` — nenhum outro componente do DS tem esse nível de inacessibilidade por teclado (ver achado crítico na seção 6).
- O menu de acentos usa `role="listbox"` no container, mas as opções são `<button>` sem `role="option"`/`aria-selected` — combinação de roles ARIA inválida (listbox exige filhos `option`), diferente do padrão usado corretamente nos itens custom do `Select` (`role="option"` + `aria-selected`).
- Texto do `aria-label` do menu de acentos tem erro de acentuação: `` `Opcoes de acento para ${sourceKey}` `` (faltam os acentos — deveria ser "Opções").
- `TextField`/`TextArea`/`Search` já embutem o `VirtualKeyboard` via prop própria (`virtualKeyboard="default"/"numeric"/"none"`) usando o modo `native` internamente — é o padrão de uso real predominante (ver seção 3), então os achados de acessibilidade daqui se propagam silenciosamente pra esses três componentes sempre que a prop é usada.

## 3. Levantamento dos casos de uso atuais

- **Uso predominante é indireto**: `TextField.stories.tsx`, `TextArea.stories.tsx` e `Search.stories.tsx` expõem a prop `virtualKeyboard` (`default`/`numeric`/`none`), que internamente monta um `VirtualKeyboard variant="native"` com `targetRef` apontando pro próprio input — a maioria dos consumidores nunca importa `VirtualKeyboard` diretamente.
- **`VirtualKeyboard.stories.tsx`**: cobre os dois `variant`s isoladamente (`fixed`/`native`), `type` numérico, shift/caps lock, `Emoji`, responsividade mobile.
- **`Modal.stories.tsx` ("Com Virtual Keyboard")**: caso de uso sensível já documentado na memória do repo — conflito de `pointer-events` entre o overlay portalizado do teclado e o `Dialog` modal do Radix (já corrigido).
- Nenhum uso encontrado em `apps/hub` (Astro) — restrito ao ecossistema React/Storybook, mesmo padrão dos outros componentes de formulário.

## 4. Testes de regressão — lacunas

A suíte (`VirtualKeyboard.test.tsx`) é extensa (136+ casos) e cobre muito bem lógica de layout/shift/capslock/long-press/acentos, mas:
- Nenhum teste usa `getByRole('button')`/`getByRole('option')` nas teclas — todos acessam via seletor direto (`data-skbtn`, texto), o que mascara a ausência de semântica ARIA (achado da seção 6) em vez de pegá-la.
- Nenhum teste verifica foco/`Tab` dentro do teclado (entrar/sair das teclas via teclado real).
- Nenhum teste cobre `error`/`errorMessage`/`helperText` sendo ignorados no `variant="native"` (comportamento não documentado como limitação).
- Nenhum teste verifica texto/`aria-label` de teclas de ícone (`bksp`, `shift`, etc.) para leitor de tela.

## 5. Testes de interação e teclado — lacunas

Testado manualmente no Storybook (story "Modo fixed"): depois de focar o `TextField` interno e pressionar `Tab`, o foco **não entra em nenhuma tecla** — todas aparecem na árvore de acessibilidade como elementos genéricos (`generic [cursor=pointer]`), sem papel de `button` nem `tabindex`. Ou seja:
- Não existe nenhum teste (nem suporte) de navegação por teclado real entre as teclas — porque elas literalmente não são alcançáveis via `Tab`.
- O menu de acentos (ativado por *long press* via `onPointerDownCapture`) também não tem equivalente de teclado: mesmo que uma tecla fosse focável, não há handler de `keydown`/hold via teclado para abrir o menu de acentos — a função de acentuação inteira depende de ponteiro/touch.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — teclado virtual inteiro inacessível via teclado/leitor de tela**: confirmado ao vivo — nenhuma tecla tem `role`/`tabindex`, `Tab` não entra no componente, e a árvore de acessibilidade não expõe nada além de texto solto. Viola WCAG 2.1.1 (Keyboard) para toda a funcionalidade principal do componente. Como `TextField`/`TextArea`/`Search` embutem esse mesmo teclado via prop `virtualKeyboard`, o problema se propaga a todos os consumidores dessa prop.
- 🔴 **Crítico — função de acentuação (long press) sem alternativa de teclado**: mesmo num cenário hipotético onde as teclas fossem focáveis, não existe hoje nenhum caminho via teclado (`keydown`/hold) para abrir o menu de acentos — só ponteiro/touch.
- 🟠 **Alto — `role="listbox"` com filhos incorretos**: o menu de acentos usa `role="listbox"` mas as opções são `<button>` sem `role="option"`/`aria-selected`, combinação ARIA inválida.
- 🟡 Teclas de ícone (`bksp`, `shift`, `capslock`, `downkeyboard`) sem `aria-label`/texto alternativo — mesmo que a semântica de `role`/`tabindex` fosse corrigida, essas teclas continuariam sem nome acessível.
- 🟡 Erro de acentuação no `aria-label` do menu de acentos ("Opcoes" → "Opções").

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir o texto do `aria-label` do menu de acentos ("Opcoes" → "Opções").
2. Adicionar `aria-label` nas teclas de ícone (`bksp`, `shift`, `capslock`, `downkeyboard`).
3. Trocar `role="listbox"` + `<button>` soltos por `role="listbox"` + `role="option"`/`aria-selected` (ou simplesmente `role="menu"` + `role="menuitem"`, mais compatível com o padrão de `<button>`).
4. Adicionar testes que usem `getByRole` nas teclas (vão falhar até a semântica ser corrigida, servindo de guarda contra regressão).

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Decidir a estratégia de acessibilidade por teclado do teclado virtual em si: dado que `react-simple-keyboard` não expõe roles/tabindex nativamente, a correção real (tornar as teclas focáveis/acionáveis via `Enter`/`Espaço`, e dar alguma alternativa de teclado pro long press de acentos) é uma mudança estrutural grande — precisa de decisão de produto sobre se o componente deve suportar uso 100% sem ponteiro/touch (hoje não suporta) ou se isso é um limite aceito do design (uso típico: kiosk/terminal touch).

## 8. Janela única de mudanças incompatíveis

O item 1 da seção 7 (potencialmente incompatível) é mais uma decisão de escopo/produto do que uma mudança de API — não tem "props antigas → novas" para tabular, mas deve ser resolvido antes de qualquer trabalho de acessibilidade mais profundo no componente, já que define se os itens 1–4 (sem quebra) são suficientes ou se só atacam a camada visual do problema. Registrar a decisão e, se envolver mudança de biblioteca/estrutura de render das teclas, tratar como entrada própria em `CHANGELOG.md` no formato de `docs/react/changeset-template.md`.
