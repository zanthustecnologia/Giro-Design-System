# Hardening do Menu — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `type` | Documentada com exemplo (`type="icon"`, inclusive replicado em `packages/mcp/src/data/components.generated.ts`), mas nunca é lida em `Menu.tsx`/`MenuItem.tsx` — cai em `...rest` e é espalhada no `DropdownMenu.Content` sem efeito. Prop morta, mesmo padrão do `multiple` do `Select` |
| `selectedItems` | Tipada como `MenuItemProps[]` (sugere multi-seleção), mas `handleItemSelect` (`useMenuLogic.ts`) sempre faz `setInternalSelectedItems([item])` — só single-select é suportado de fato. A API promete mais do que a implementação entrega |
| `selectedItems` (controlado) | `isControlledRef = useRef(selectedItems !== undefined)` é calculado uma única vez, no mount. Se o componente iniciar sem `selectedItems` (uncontrolled) e o consumidor passar a controlá-lo depois, `isControlledRef.current` permanece `false` para sempre e o `useEffect` de sincronização nunca mais atualiza `internalSelectedItems` a partir da prop |
| `onItemSelect` | Parâmetro tipado como `items` (plural) mas o tipo é singular `MenuItemProps` — nome inconsistente com o comportamento real (sempre um único item) |
| `id` (em `MenuItemProps`) | Usado só internamente como chave de comparação (`getItemKey`); nunca vira `id` real no DOM do item renderizado |
| `enableInfiniteScroll`/`onScrollEnd`/`isLoadingMore`/`enableApiSearch`/`onApiSearch` | Já marcadas `@deprecated` no próprio tipo — sem achado novo, só reforça que devem sair numa janela futura |

## 2. Inconsistências entre componentes

- `MenuItem` (item "folha") usa `DropdownMenu.Item` (Radix cuida de roving tabindex/typeahead), mas o campo de busca (`Search`) é um `<input>` solto dentro do `DropdownMenu.Content`, fora da árvore de roving focus dos itens — mesmo problema estrutural já visto no `Select` (`CheckboxSelectItem`/`ExpandableSelectItem` fora do modelo de acessibilidade do Radix). Aqui o efeito colateral é mais grave (ver seção 5/6).
- Itens com `children` usam `DropdownMenu.Sub`/`SubTrigger` (acessibilidade nativa do Radix), enquanto itens-folha usam o wrapper próprio `MenuItem` — duas camadas diferentes de implementação dentro do mesmo componente, mas sem o problema de teclado que o `Select` tem entre variantes (testado ao vivo, ver seção 5).

## 3. Levantamento dos casos de uso atuais

- Busca por `<Menu` em todo o monorepo: o `Menu` atual **não tem nenhum uso em produção** (`apps/hub`, `apps/theme-playground`, etc.) — só aparece em `apps/storybook-react/src/stories/Components/Menu/Menu.stories.tsx` e nos testes do próprio pacote.
- Existe um `Menu` **antigo e não relacionado** em `packages/react/src/components/.deprecated/Menu`, ainda consumido por `.deprecated/Table/utils/tableActions.tsx` — componente totalmente separado, não compartilha código com o `Menu` atual.
- Stories atuais cobrem: texto simples, subtexto, ícones, submenus aninhados, busca local, busca via API (depreciada) e escalas — mas nenhuma story usa `selectedItems` pré-preenchido, o que ajuda a explicar por que a ausência de estilo para seleção (seção 6) nunca foi percebida visualmente.

## 4. Testes de regressão — lacunas

- Nenhum teste cobre seleção múltipla real nem a transição de `selectedItems` não controlado → controlado (achado da seção 1).
- Nenhum teste verifica o destino do foco (`document.activeElement`) após fechar o menu, seja por seleção de item, `Escape` ou clique fora — a suíte atual (`Menu.test.tsx`) só checa presença/ausência de texto e atributos estáticos, nunca fluxo de foco.
- Nenhum teste cobre a prop `type` (nem para provar que não faz nada).
- Nenhum teste digita no campo de busca a partir do menu recém-aberto sem clicar explicitamente no input — por isso a suíte não captura o bug crítico da seção 5/6.

## 5. Testes de interação e teclado — lacunas

Testado manualmente no Storybook (stories "Default", "Com Subtexto", "Com Submenu"), com o menu aberto por clique e navegação só por teclado a partir daí:

- 🔴 **Campo de busca inacessível por teclado, confirmado ao vivo.** Com `search=true`, o foco inicial ao abrir o menu fica no container (`role="menu"`), nunca no `<input>` de busca. Digitar uma letra (ex.: `"d"`) não escreve no campo — dispara o **typeahead nativo do Radix** e pula o foco para o primeiro item que começa com essa letra ("Duplicar"). `Tab` fica preso dentro do menu (não sai, não entra no input) e `ArrowUp`/`ArrowDown` navegam só entre os `menuitem`s, nunca alcançando o input. **O campo de busca só é utilizável com mouse.**
- 🔴 **Foco perdido após seleção por mouse, confirmado ao vivo.** Em `Menu.tsx`, `onPointerDown` no `DropdownMenu.Content` seta `closedByPointerRef.current = true` para **qualquer** pointerdown dentro do conteúdo — inclusive o clique normal num item para selecioná-lo, não só um clique "fora" do menu. Isso faz `onCloseAutoFocus` chamar `preventDefault()` mesmo numa seleção válida por clique. Testado: clicar em "Editar" com mouse deixa `document.activeElement === document.body` depois que o menu fecha (foco perdido, próximo `Tab` recomeça do topo do documento). Selecionar o mesmo item via teclado (`ArrowDown` + `Enter`) devolve corretamente o foco ao trigger — confirma a assimetria mouse × teclado.
- Navegação por `ArrowRight`/`ArrowLeft` em itens com `children` (submenus aninhados) funciona corretamente (comportamento nativo do Radix `DropdownMenu.Sub`), sem achados aqui.
- Nenhum teste automatizado cobre os dois bugs críticos acima.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — campo de busca inacessível por teclado**, confirmado ao vivo (seção 5). Bloqueia completamente o recurso de busca para usuários de teclado/leitor de tela.
- 🔴 **Crítico — foco perdido após seleção via mouse**, confirmado ao vivo (seção 5). Quebra a ordem de foco esperada após fechar um menu (WCAG 2.4.3 Focus Order).
- 🟠 **Alto — estado "selecionado" sem feedback algum.** `MenuItem` seta `data-selected={isSelected || undefined}`, mas não existe nenhuma regra CSS em `Menu.module.scss` usando `[data-selected]` (confirmado por busca no arquivo), nem `aria-checked`/`role="menuitemcheckbox"` equivalente. Um item presente em `selectedItems` fica visual e semanticamente idêntico a um item não selecionado.
- 🟡 **Médio — `<input>` de busca como filho direto de um `role="menu"`** diverge do padrão ARIA Menu (filhos esperados são `menuitem`/`menuitemcheckbox`/`menuitemradio`/separator). Essa divergência estrutural é a causa raiz do bug crítico de teclado acima, não só uma questão teórica de conformidade.

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Corrigir `onPointerDown`/`onCloseAutoFocus` para distinguir "fechou clicando fora do menu" de "fechou selecionando um item" (ex.: checar o alvo do evento, ou mover a flag para `onInteractOutside` exclusivamente) — prioridade máxima, é o achado mais grave de foco.
2. Focar o `<Search>` automaticamente ao abrir o menu quando `search=true`, e/ou isolar o input da área de typeahead do Radix para que digitar no menu aberto não dispare navegação por letra inicial.
3. Adicionar estilo real para `[data-selected]` em `Menu.module.scss`.
4. Adicionar `aria-checked` (ou equivalente) ao item selecionado, além do `data-selected` visual.
5. Corrigir `isControlledRef` para reavaliar quando `selectedItems` passa de `undefined` para definido após o mount.
6. Adicionar testes cobrindo os dois bugs de foco (seleção por mouse x teclado, busca inacessível) e a transição de controlado/não controlado.

**Potencialmente incompatível (precisa decisão e comunicação):**
1. Decidir o destino da prop `type` (remover, já que não tem efeito hoje, ou implementar o modo `icon`).
2. Decidir o destino de `selectedItems` como array: implementar multi-seleção de fato ou documentar oficialmente o `Menu` como single-select e simplificar o tipo.

## 8. Janela única de mudanças incompatíveis

Agrupar os itens da seção 7 (parte "potencialmente incompatível") numa única MR/major, conforme `docs/react/giovani-guidelines.md` e o fluxo de release do repo. Incluir:

- Tabela de props/comportamentos antigos → novos (`type`, `selectedItems`).
- Lista dos usages existentes que precisam ser atualizados no mesmo MR (hoje, apenas as stories do Storybook — não há uso em produção no monorepo).
- Entrada no `CHANGELOG.md` do pacote `react`, no formato de `docs/react/changeset-template.md`.

Itens sem quebra de compatibilidade (seção 7) podem seguir separados, como patch/minor, sem esperar a janela major.
