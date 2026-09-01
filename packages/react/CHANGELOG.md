# @giro-ds/react

## [12.3.0]

### Features

- **Select:** adiciona scroll infinito com carregamento paginado e props para busca via API.
- **Modal:** adiciona prop `closingButton` (padrão: `true`) para controlar a visibilidade do botão de fechar.
- **Components:** adiciona aliases com prefixo `G_` para todos os componentes exportados (ex.: `G_Button`, `G_Select`).
- **VirtualKeyboard:** substitui botão `_` por botão de espaço com ícone `Spacebar20Regular` no layout `numpadWithEnter`.

### Changed

- **ToggleButton:** substitui prop `children` por `label: string` no modo `simple`; remove prop `orientation` do `ToggleGroup`; remove tipo exportado `ToggleButtonOrientation`.
- **Modal:** header renderizado condicionalmente (apenas quando há `title`, `headerContent` ou `closingButton` presente); animação de entrada adicionada para modo fullscreen.
- **TextField:** remove prop `persistIcon` (workaround não mais necessário após correção do comportamento padrão).

### Bug Fixes

- **Button:** tooltip (`tooltipText`) agora exibido em todos os estados, não apenas quando `iconOnly` está ativo.
- **Checkbox:** geração de ID único por instância.
- **Dialog:** `bodyContent` agora envolvido em `<div>` para layout correto.
- **Toast:** correção de memory leak no timer de dismiss.
- **TextField:** corrige comportamento do ícone customizado após perda de foco; remove hover indevido no ícone customizado; corrige sobreposição do botão X sobre o ícone customizado.
- **Modal:** `Dialog.Title` renderizado incondicionalmente, corrigindo aviso de acessibilidade do Radix UI.
- **VirtualKeyboard:** corrige substituição indevida de `{shift}` por `{bksp}` em layouts com backspace existente; corrige cálculo de comprimento de tecla para suporte a Unicode/emoji.
- **Button, FileUpload, Search, Select, TextArea, TextField:** adiciona compatibilidade com React 19 via shim `forwardRef`; `peerDependency` `react: >=18.0.0` mantida.

## [12.2.0]

### Features

- **VirtualKeyboard:** adiciona prop `onEnterPress`.

### Bug Fixes

- **VirtualKeyboard:** corrige classe de layout dinâmica, comportamento do `numpadWithEnter`, preservação do `{enter}` no numpad com `showEnterKey=false` e reinjeção de ícones ao trocar `variant`.

## [12.1.1]

### Bug Fixes

- **Button, Search, TextField, TextArea, FileUpload, Select, SelectField:** reverte de `ref` como prop (React 19) para `forwardRef` compatível com React 18.
- **Chips:** adiciona `cursor: pointer` quando `onClick` presente e chip não desabilitado.
- **TextField:** troca `outline` por `border: var(--border-width-2) solid` no foco; corrige estado de erro para validações internas.
- **TextArea, Search:** trocam `outline` por `border: var(--border-width-2) solid` no foco.
- **Select:** troca `outline` por `border: var(--border-width-2) solid` no `:focus-visible`, `.open` e `.error.open`.

## [12.1.0] - 2026-08-05

### Features

- **ToggleButton:** novo componente com modos `simple` e `combined`; suporte a `icon`, `iconOnly`, tamanhos `lg` | `sm`, `scale`, tooltip e seleção `single` | `multiple`.
- **TableV2:** adiciona prop `header.viewToggle` para alternância de vistas via ToggleButton.
- **ListItem:** adiciona suporte a estrutura em árvore (`children`, `defaultExpanded`, `expanded`, `onExpandedChange`) e props `id`, `width` e `scale`.

### Bug Fixes

- **Toast:** corrige seletor `.toastRoot`; define animação `slideIn` ausente; adiciona animação `fadeOut` em `[data-state="closed"]`.

## [12.0.0]

### Breaking Changes

- **Avatar:** renomeia `initialLetters` para `text`
- **Filter:** renomeia `type` → `filterType`, `activeCount` → `appliedFilterCount` e `FilterType` → `FilterTypes`
- **Select:** renomeia `onChange` → `onValueChange`; callback agora recebe `string` diretamente; remove prop `tooltip`; renomeia `side` → `tooltipSide` e `align` → `tooltipAlign`
- **TextArea:** renomeia `showCharCount` → `charCount`; remove prop `tooltip`; renomeia `side` → `tooltipSide` e `align` → `tooltipAlign`
- **TextField:** remove prop `tooltip`
- **VirtualKeyboard:** renomeia `textFieldPlaceholder` → `placeholder`
- **Button:** `tooltipSide` e `tooltipAlign` agora exigem `tooltipText` presente (`ButtonTooltipConfig`)
- **React 19:** `peerDependencies` relaxadas para `>=18.0.0`; componentes migrados de `forwardRef` para ref como prop nativa

### Features

- **Calendar:** adiciona suporte a seleção de intervalo (`mode="range"`) com props `selectedRange`, `onRangeSelect` e `numberOfMonths`; exporta tipo `DateRange`

### Bug Fixes

- **Button:** reduz padding horizontal na variante `text`; adiciona `min-width: unset`
- **Calendar:** corrige `onClear` no modo `single`
- **VirtualKeyboard:** corrige `border-radius` no modo numérico; ajusta margens e tamanhos mobile
- **TextField:** remove altura fixa `70px` do `.fieldContainer`
- **Select:** remove `min-height` fixo do `.fieldContainer`
- **TextArea:** rodapé renderizado condicionalmente; remove fallback NBSP do helper text
- **Label:** remove `gap` fixo do container
- **TableV2:** define altura padrão de célula (`maxHeight`) como `64px`

## [11.2.0]

### Features

- **VerificationCode:** reescrito com `unstable_OneTimePasswordField` do Radix UI; novas props: `validationType`, `value`, `defaultValue`, `autoSubmit`, `onValueChange`, `onAutoSubmit`, `name`, `form`, `readOnly`
- **FileUpload:** novo componente com suporte a clique e drag & drop; suporta modo controlado e thumbnails para imagens
- **Modal:** adiciona prop `customHeight`
- **VirtualKeyboard:** adiciona props `onTypeChange` e `showTypeSwitchKey`; exporta tipo `VirtualKeyboardType`

### Breaking Changes

- **VerificationCode:** renomeia `inputType` → `validationType`; `onComplete` → `onValueChange` / `onAutoSubmit`; remove spread de props arbitrárias
- **VirtualKeyboard:** renomeia `onChange` → `onValueChange`

### Bug Fixes

- **Label:** ajustes de CSS para correção de layout
- **TableV2:** ajustes de CSS para correção de layout
- **TextField:** amplia clear button de `16px` para `30px`; `font-family` e `font-weight` herdados
- **TextArea:** `font-family` e `font-weight` herdados
- **Search:** `font-family` herdado; amplia clear button de `16px` para `30px`

### Deprecated

- **VerificationCode:** implementação anterior movida para `.deprecated/`

## [11.1.0]

### Features

- **VirtualKeyboard:** adiciona props `showEnterKey` e `textFieldScale`

### Bug Fixes

- **VirtualKeyboard:** corrige comportamento das teclas do numpad no modo `fixed`

## [11.0.0]

### Breaking Changes

- **Scale system:** remove classes CSS globais `.scale-1-0`, `.scale-1-5`, `.scale-2-0`; escala agora controlada via CSS custom property `--component-scale` injetada por prop `style`
- **Menu:** remove props `dropdownScale` e `buttonScale` em favor da prop unificada `scale`
- **DatePicker:** remove props `datePickerScale` e `calendarScale` em favor da prop unificada `scale`

## [10.0.0]

### Features

- **Card:** novo componente contêiner visual; aceita prop `interactiveCard` para efeito de hover
- **VirtualKeyboard:** adiciona responsividade mobile e scroll automático do campo alvo
- **TextField:** adiciona prop `disableAutoComplete`

### Breaking Changes

- **TextField, TextArea, Search, TableV2:** unifica API do teclado virtual; remove props `virtualKeyboard: boolean`, `virtualKeyboardType` e `virtualKeyboardMaxLength` em favor de `virtualKeyboard?: VirtualKeyboardType`
- **TextField:** renomeia `side` → `tooltipSide` e `align` → `tooltipAlign`; remove valor padrão da prop `maxLength`

### Bug Fixes

- **Checkbox:** amplia área de clique via pseudo-elemento `::after`
- **VirtualKeyboard:** corrige fechamento indevido no iOS; corrige exibição de `errorMessage`

## [9.1.0]

### Features

- **VirtualKeyboard:** novo componente para ambientes sem teclado físico; suporta modos `fixed` e `native`; 5 layouts nativos e mais de 40 via `simple-keyboard-layouts`
- **Button, Chips, Quantity, TextField:** adiciona prop `scale?: 1 | 1.5 | 2`
- **Menu:** adiciona props `scale` e `buttonScale`
- **TextField, TextArea, Search:** adiciona props `virtualKeyboard`, `virtualKeyboardLayout` e `virtualKeyboardMaxLength`
- **TableV2:** adiciona suporte a props de `VirtualKeyboard` no header

### Bug Fixes

- **TableV2:** corrige label "Filtros" duplicado quando `filterItems` contém apenas itens `combined`
- **TextField:** corrige `helperText` e `errorMessage` renderizados sem conteúdo

## [9.0.0]

### Breaking Changes

- **Filter:** renomeia `type="checkbox"` → `type="multiple"` e `type="text"` → `type="single"`; adiciona modo `combined` com prop `mode`

### Features

- **Drawer:** adiciona prop `footer` para conteúdo fixo no rodapé
- **Search:** adiciona prop `searchMode` (`'instant'` | `'on-enter'`) e callback `onSearch`
- **TableV2:** adiciona `header.searchValue`, `header.onSearchChange`, `footer.manualPagination`, `enableRowSelection` como função e suporte a `CombinedFilterItem`; remove prop `enableFilters`

### Bug Fixes

- **Label:** corrige altura do ícone de tooltip

## [8.0.0]

### Breaking Changes

- **TableV2:** renomeia `createColumnHelper` → `createTableColumnHelper` e `ColumnDef` → `TableColumnDefinition`

### Bug Fixes

- **Callout:** corrige prop `style` externa sendo ignorada pelo estilo interno

## [7.0.0]

### Breaking Changes

- **Badge:** remove prop `type`; modo discriminado pela presença de `children`; `badgeValue` unificado para `number | string | null`; `data-testid` unificado para `"badge"`
- **Callout:** remove prop `disabled`; renomeia `type` → `variant`, `foregroundColor` → `textColor`; `text` agora obrigatória; remove export `CalloutVariant`

### Features

- **Callout:** adiciona props `dismiss`, `onDismiss` e `backgroundColor`
- **TableV2:** novo componente com TanStack Table; paginação, seleção de linhas, ações em massa, busca e filtros no header

### Bug Fixes

- **Avatar:** remove `<div>` wrapper desnecessário
- **Modal:** corrige autofocus indesejado no botão de fechar
- **Componentes:** padroniza prop `className` e spread props em todos os componentes

## [6.0.2]

### Bug Fixes

- **Tipos:** adiciona JSDoc em tipos compartilhados; corrige extensões de arquivo de `.tsx` para `.ts`

## [6.0.1]

### Bug Fixes

- **Calendar:** corrige largura fixa do botão de dia
- **Menu:** corrige comportamento de foco ao fechar com clique

## [6.0.0]

### Breaking Changes

- **Chips:** remove prop `title` e variante `type="color"`; renomeia `type` → `variant`; `title` → `children`
- **Modal:** novo componente baseado em Radix UI (substitui implementação anterior)
- **Button:** tooltip em `iconOnly` agora exige `tooltipText` explícito; tipagem refatorada como union discriminada
- **Table:** refatoração de classes CSS de BEM para CSS Modules

### Features

- **Chips:** adiciona props `backgroundColor` e `foregroundColor`
- **Quantity:** adiciona props `minValue`, `maxValue`, props de acessibilidade e `inputSize`/`inputSizeControl`
- **Button:** adiciona `aria-busy` durante loading; bloqueia clique durante `loading`

### Bug Fixes

- **Search:** corrige sobreposição do texto com o ícone de limpar via padding dinâmico
- **Select:** corrige perda de foco ao digitar na busca
- **Switch:** correções visuais no CSS
- **Calendar:** ajustes de padding e border-radius no overlay
- **DatePicker:** corrige tratamento de props `error` e `errorMessage`
- **Filter:** ajustes de padding

## [5.0.1]

### Bug Fixes

- **DatePicker:** corrige lógica de validação e exibição de mensagens de erro
- **Build:** adiciona limpeza automática do diretório `dts-temp`

## [5.0.0]

### Breaking Changes

- **Calendar:** substituída por `react-day-picker` v9; renomeia `selectedDate` → `selected`; remove exports de tipos internos
- **Dropdown:** depreciado e removido das exportações públicas
- **Filter:** renomeia `position` → `side` + `align`; `DropdownItem[]` → `FilterItem[]`
- **DatePicker:** atualizado para nova API do Calendar

### Features

- **Drawer:** adiciona prop `headerContent`
- **TextArea:** novo componente com label, validação e contador de caracteres

### Bug Fixes

- **TextField:** adiciona prop `error` para controle externo de validação

## [4.0.0]

### Breaking Changes

- **Avatar:** tamanhos alterados de `'small'`/`'large'` para `'sm'`/`'lg'`
- **Dialog:** remove props `show` e `onClose`; renomeia `fnConfirm` → `onConfirm`, `fnCancel` → `onCancel`
- **Toast:** reescrita completa; requer `ToastProvider`/`ToastContainer`; API baseada em objetos

### Features

- **Button:** adiciona tooltip automático para modo `iconOnly` com props `tooltipText`, `tooltipSide`, `tooltipAlign`
- **Popover:** novo componente baseado em Radix UI

### Bug Fixes

- **Search:** corrige bug do `useId()` e melhora acessibilidade

## [3.0.7]

### Bug Fixes

- **Label:** corrige alinhamento com `margin-bottom`
- **Select, Menu:** remove coloração azul nos itens selecionados
- **Table:** corrige "selecionar todos" para respeitar checkboxes desabilitados

## [3.0.6]

### Bug Fixes

- **Componentes:** adiciona herança de interfaces e padrão de spread props em múltiplos componentes
- **Dialog:** corrige aplicação de CSS
- **Tooltip:** corrige bugs
- **Build:** exclui arquivos depreciados; atualiza Rollup para API moderna do Sass

## [3.0.5]

### Bug Fixes

- **TextField, Label:** correções e atualizações

## [3.0.4]

### Bug Fixes

- **Select:** corrige tipo da prop `onChange` → `onValueChange`

## [3.0.3]

### Bug Fixes

- **Select, TextField:** corrige busca em API, navegação por teclado, tratamento de valores e espaçamento

## [3.0.2]

### Bug Fixes

- **TextField:** normaliza tratamento de valores `string | number`; corrige erro `.trim()` em valores numéricos

## [3.0.1]

### Bug Fixes

- **DatePicker:** corrige digitação manual e seleção via calendário; sincroniza estado interno com prop `value`

## [3.0.0]

### Breaking Changes

- **DropdownMenu:** remove props `enableIcon` e `enableSubText`; ícones e subtextos renderizados automaticamente
- **Button:** remove `iconPosition="none"`; adiciona valor `'both'`
- **Select:** renomeia `onChange` → `onValueChange`

### Features

- **Table:** adiciona estado indeterminado ao "Selecionar Todos"; prop `disableSelectAll`; suporte a genéricos `<Table<T>>`

### Bug Fixes

- **Switch:** props `defaultChecked` e `disabled` agora são opcionais

## [2.0.0]

### Breaking Changes

- **Checkbox:** migrado para Radix UI; remove props `name`, `value`, `ariaDescribedby`; renomeia `onChange` → `onCheckedChange`
- **Radio:** redesign para `RadioGroup` com padrão de array `items`; renomeia `onChange` → `onValueChange`
- **Tooltip:** migrado para Radix UI; renomeia `position` → `side` + `align`

### Features

- **Switch:** novo componente

## [1.0.5]

### Bug Fixes

- **SelectRadix, TextField:** converte CSS para variáveis SCSS

## [1.0.4]

### Bug Fixes

- **TextField:** melhora acessibilidade do ícone

## [1.0.3]

### Bug Fixes

- **TextField:** aceita validação externa via `errorMessage`

## [1.0.2]

### Bug Fixes

- **TableHeader, Calendar:** corrige funcionalidade `onClear`

## [1.0.1]

### Bug Fixes

- **Documentação:** adiciona arquivos README aos pacotes

## [1.0.0]

### Features

- **Release Inicial:** lançamento do pacote `@giro-ds/react` com biblioteca completa de componentes React
