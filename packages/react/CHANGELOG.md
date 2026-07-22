# @giro-ds/react

## [12.0.0]

### Added

#### Calendar

Adiciona suporte a seleção de intervalo via `mode="range"` com as props `selectedRange`, `onRangeSelect` e `numberOfMonths`. O tipo `DateRange` (re-export de `react-day-picker`) passa a ser exportado pelo pacote. Corrige `onClear` no modo `single`, agora disparado ao clicar novamente no dia selecionado.

### Changed

#### Avatar

Renomeia `initialLetters` para `text`. O valor é truncado a 2 caracteres automaticamente.

#### Button

`tooltipSide` e `tooltipAlign` agora só são aceitas pelo TypeScript quando `tooltipText` está presente (union type `ButtonTooltipConfig`).

#### Filter

| Antes | Depois |
| --- | --- |
| `type` | `filterType` |
| `activeCount` | `appliedFilterCount` |

O type alias `FilterType` foi renomeado para `FilterTypes`.

#### Select

Renomeia `onChange` para `onValueChange` (alinhamento com Radix UI). O callback passa a receber o valor como `string` diretamente, sem `ChangeEvent`. As props de tooltip foram renomeadas e `tooltip` removido.

| Antes | Depois |
| --- | --- |
| `onChange: (e: ChangeEvent) => void` | `onValueChange: (value: string) => void` |
| `tooltip` (boolean) | removido |
| `side` | `tooltipSide` |
| `align` | `tooltipAlign` |

#### TextArea

| Antes | Depois |
| --- | --- |
| `showCharCount` | `charCount` |
| `tooltip` (boolean) | removido |
| `side` | `tooltipSide` |
| `align` | `tooltipAlign` |

#### TextField

| Antes | Depois |
| --- | --- |
| `tooltip` (boolean) | removido |

#### VirtualKeyboard

Renomeia `textFieldPlaceholder` para `placeholder`.

#### TableV2

Altura padrão de célula (`maxHeight`) definida como `64px`, sem necessidade de configuração via meta.

#### React 19

`peerDependencies` relaxadas para `>=18.0.0`. Componentes migrados de `React.forwardRef` para ref como prop nativa.

### Fixed

#### Button

Reduz padding horizontal na variante `text` (`lg` e `sm`) para `var(--spacing-4)`. Adiciona `min-width: unset`.

#### VirtualKeyboard

`border-radius` dos botões alterado para `--border-radius-8` no modo numérico. Margem movida para container query (desktop ≥ 769px). Altura e `font-size` mobile aumentados para `38px` e `var(--font-size-16)`.

#### TextField

Remove altura fixa `70px` do `.fieldContainer`.

#### Select

Remove `min-height` fixo do `.fieldContainer`.

#### TextArea

Rodapé renderizado condicionalmente. Remove fallback NBSP do helper text.

#### Label

Remove `gap` fixo do container.

## 11.2.0

### Added

#### VerificationCode

Reescrito com `unstable_OneTimePasswordField` do Radix UI. Novas props: `validationType`, `value`, `defaultValue`, `autoSubmit`, `onValueChange`, `onAutoSubmit`, `name`, `form` e `readOnly`.

#### FileUpload

Novo componente de upload de arquivos com suporte a clique e drag & drop. Props de controle: `maxFileSize`, `maxFilesQuantity`, `accept`, `multiple`, `disabled`, `error`, `errorMessage` e `descriptionErrorMessage`. Suporta modo controlado (`value` + `onChange`) e exibe thumbnails para imagens.

#### Modal

Adiciona a prop `customHeight?: string` para definir a altura do modal via CSS variable `--modal-custom-height`.

#### VirtualKeyboard

Adiciona as props:
`onTypeChange` disparado quando o tipo do teclado muda;
`showTypeSwitchKey` que, quando `false`, remove a tecla de alternância do layout.
O tipo `VirtualKeyboardType` passou a ser exportado pelo pacote.

### Changed

#### VerificationCode

Renomeia props para alinhamento com Radix UI:
`inputType` → `validationType`;
`onComplete` → `onValueChange` / `onAutoSubmit`.
Remove o spread de props arbitrárias (`[key: string]: any`) em favor de tipagem estrita.

#### VirtualKeyboard

Renomeia o callback de digitação:
`onChange: (e: ChangeEvent) => void` → `onValueChange: (value: string) => void`.

#### TextField

`font-family` e `font-weight` passam a ser herdados pelo input, placeholder e helper text.
O clear button foi ampliado de `16px` para `30px` e recebeu efeito de hover.

#### TextArea

`font-family` e `font-weight` passam a ser herdados pelo textarea, placeholder, helper text e contador de caracteres.

#### Search

`font-family` passa a ser herdado pelo input e placeholder.
O clear button foi ampliado de `16px` para `30px` e recebeu efeito de hover.

### Deprecated

#### VerificationCode (implementação anterior)

Movida para `src/components/.deprecated/VerificationCode`. Utilize o novo `VerificationCode` baseado em Radix UI.

### Fixed

#### Label

Ajustes de CSS para correção de layout e alinhamento visual.

#### TableV2

Ajustes de CSS para correção de layout.

## 11.1.0

### Added

#### VirtualKeyboard

Adiciona as props:
`showEnterKey` que permite ocultar a tecla Enter;
`textFieldScale` repassa a escala para o `TextField` interno exibido no modo `fixed`.

### Fixed

#### VirtualKeyboard

Corrige o comportamento das teclas do numpad em modo `fixed`.

## 11.0.0

### Major Changes

- ac7ff8f: ## [11.0.0]

  ### Changed

  #### Scale system (todos os componentes)

  O sistema de escala foi refatorado em todos os componentes. O mecanismo anterior aplicava `transform: scale()` via classes CSS globais (`.scale-1-0`, `.scale-1-5`, `.scale-2-0`) passadas no `className`. O novo mecanismo injeta CSS custom properties (`--component-scale`) via prop `style` com `useMemo`, eliminando os efeitos colaterais de `transform: scale()` sobre dropdowns, tooltips e elementos posicionados via portal (Radix UI).

  Todos os componentes continuam aceitando `scale?: 1 | 1.5 | 2`.

  #### Menu

  A prop `scale` unifica o comportamento antes dividido entre `dropdownScale` e `buttonScale`. O valor é aplicado simultaneamente ao trigger e ao dropdown.

  #### DatePicker

  A prop `scale` unifica o comportamento antes dividido entre `datePickerScale` e `calendarScale`. O valor é aplicado simultaneamente ao campo e ao calendário interno.

  ### Removed

  #### Menu

  Remove as props `dropdownScale` e `buttonScale` em favor da prop unificada `scale`. Remove também a prop `className` duplicada, que já estava disponível via `BaseProps`.

  | Antes                                          | Depois               |
  | ---------------------------------------------- | -------------------- |
  | `<Menu dropdownScale={1.5} buttonScale={1.5}>` | `<Menu scale={1.5}>` |

  #### DatePicker

  Remove as props `datePickerScale` e `calendarScale` em favor da prop unificada `scale`. Remove também a prop `className` duplicada, que já estava disponível via `BaseProps`.

  | Antes                                                  | Depois                     |
  | ------------------------------------------------------ | -------------------------- |
  | `<DatePicker datePickerScale={2} calendarScale={2} />` | `<DatePicker scale={2} />` |

  #### global.scss

  Remove as classes `.scale-1-0`, `.scale-1-5` e `.scale-2-0`. A escala agora é controlada exclusivamente via CSS custom property `--component-scale` injetada por `style`.

## [10.0.0] - 2026-06-22

### Added

#### Card

Novo componente contêiner visual para agrupar conteúdos relacionados. Utiliza tokens do design system para borda, border-radius e espaçamento interno. Aceita `children` (obrigatório), `className` opcional e a prop `interactiveCard` (boolean) que aplica efeito de hover e cursor pointer.

#### VirtualKeyboard

Adiciona responsividade mobile com breakpoints em 360px, 390px, 480px e 768px. No modo `fixed`, utiliza container queries; no modo `native`, utiliza media queries. Em telas ≤ 768px, exibe `keyPreview` (letra pressionada acima da tecla). O menu de acentos foi reorganizado em linhas de 5, com mais opções por tecla. Adiciona scroll automático do campo alvo ao abrir o teclado no modo `native`.

#### TextField

Adiciona a prop `disableAutoComplete` para controle do autocompletar do navegador.

### Changed

#### TextField, TextArea, Search, TableV2

Unifica a API do teclado virtual: as props `virtualKeyboard: boolean`, `virtualKeyboardType` e `virtualKeyboardMaxLength` são substituídas por uma única prop `virtualKeyboard?: VirtualKeyboardType` (`'default' | 'numeric' | 'none' | undefined`). O `maxLength` agora é usado diretamente no lugar de `virtualKeyboardMaxLength`.

Guia de migração:

```tsx
// Antes
<TextField
  virtualKeyboard={true}
  virtualKeyboardType="default"
  virtualKeyboardMaxLength={50}
  side="bottom"
  align="start"
/>

// Depois
<TextField
  virtualKeyboard="default"
  maxLength={50}
  tooltipSide="bottom"
  tooltipAlign="start"
/>

// Para desabilitar, omita a prop ou passe undefined
<TextField />
```

#### TextField

Renomeia as props de tooltip para evitar conflito com atributos HTML nativos.

| Antes   | Depois         |
| ------- | -------------- |
| `side`  | `tooltipSide`  |
| `align` | `tooltipAlign` |

Remove o valor padrão `30` da prop `maxLength`, que agora é `number | undefined`.

#### VirtualKeyboard

Refatora o SCSS com extração de mixins (`space`, `blankSpace`, `buttonFlex`). Remove estilos `.disabled` duplicados. O modo `fixed` agora repassa `disableAutoComplete` ao `TextField` interno. Remove `backdrop-filter: blur`, substituído por cor sólida.

### Removed

#### TextField, TextArea, Search, TableV2

Remove as props `virtualKeyboardType` e `virtualKeyboardMaxLength`, incorporadas à nova API unificada de `virtualKeyboard`.

### Fixed

#### Checkbox

Amplia a área de clique interativa adicionando pseudo-elemento `::after` com `position: absolute` e `inset: -11px`.

#### VirtualKeyboard

Corrige o fechamento indevido do teclado no iOS. Corrige a exibição de `errorMessage`, que agora só aparece quando `error` também é `true`.

#### Stories de Escalas (Button, Calendar, Checkbox, Chips, DatePicker, Menu, Quantity, Radio, Search, Select, Switch, TextField)

Corrige valores de `gap` nas stories de Escalas para evitar sobreposição visual entre itens em escala maior.

## [9.1.0]

### Added

#### VirtualKeyboard

Novo componente para ambientes sem teclado físico, como totens, terminais e painéis de pagamento. Suporta dois modos: `fixed`, sempre visível com `TextField` próprio integrado, e `native`, que aparece ao focar no campo apontado por `targetRef` e se posiciona via `createPortal` como overlay na base da tela.

Inclui 5 layouts nativos (`default`, `numeric`, `fullKeyboard`, `mobile`, `appleIOS`) e suporte a mais de 40 layouts de idioma via `simple-keyboard-layouts`. O comportamento de Shift e CapsLock é independente: CapsLock mantém maiúsculas continuamente enquanto Shift retorna ao layout padrão após a primeira tecla.

#### Button, Chips, Quantity, TextField

Adicionada a prop `scale?: 1 | 1.5 | 2` para controle da escala visual. A prop aplica classes CSS correspondentes ao fator de escala configurado.

#### Menu

Adicionadas as props `scale?: 1 | 1.5 | 2` e `buttonScale?: 1 | 1.5 | 2`. A prop `buttonScale` repassa a escala ao elemento de trigger quando compatível.

#### TextField, TextArea, Search

Adicionadas as props opcionais `virtualKeyboard`, `virtualKeyboardLayout` e `virtualKeyboardMaxLength` para integração com o `VirtualKeyboard`. Quando `virtualKeyboard` está ativo, o `inputMode` do campo é definido como `none`, suprimindo o teclado nativo do sistema operacional.

#### TableV2

Adicionadas as props opcionais `virtualKeyboard`, `virtualKeyboardLayout` e `virtualKeyboardMaxLength` em `TableV2HeaderProps`, repassadas ao `Search` interno da tabela.

### Fixed

#### TableV2

Corrige a renderização do label estático "Filtros" que aparecia duplicado quando `filterItems` continha apenas itens do tipo `combined`. O label agora só é exibido quando existe ao menos um filtro que não seja do tipo `combined`.

#### TextField

Corrige o `<span>` de `helperText` e `errorMessage`, que era renderizado mesmo sem conteúdo, causando espaço invisível no layout. O elemento agora só é montado quando há texto a exibir.

## 9.0.0

### Major Changes

- **Filter**: Refatoração com novo modo `combined` e renomeação de valores de `FilterType`
  - **Alterado**: `type="checkbox"` → `type="multiple"`
  - **Alterado**: `type="text"` → `type="single"`
  - **Adicionado**: nova prop `mode` (`'simple'` | `'combined'`) — no modo `combined`, o filtro abre um `Drawer` com conteúdo via `children` e botões "Aplicar" e "Limpar" fixos no rodapé
  - **Como migrar**:

    ```tsx
    // Antes
    <Filter type="checkbox" />
    <Filter type="text" />

    // Depois
    <Filter type="multiple" />
    <Filter type="single" />
    ```

### Minor Changes

- **Drawer**: Adiciona prop `footer` para conteúdo fixo no rodapé
  - Nova prop opcional `footer` (`ReactNode`) que renderiza conteúdo abaixo da área rolável, sem acompanhar o scroll
- **Search**: Adiciona controle do modo de disparo da busca
  - Nova prop `searchMode` (`'instant'` | `'on-enter'`) para controlar quando a busca é disparada
  - Nova prop `onSearch` com callback `(value: string) => void`
  - Modo `instant` (padrão): dispara a cada tecla; modo `on-enter`: dispara apenas ao pressionar Enter
- **TableV2**: Adiciona suporte a busca server-side, paginação manual, seleção condicional e filtro combinado
  - Nova prop `header.searchValue` para controlar o valor do campo de busca externamente
  - Nova prop `header.onSearchChange` — callback acionado ao realizar busca (Enter ou clear)
  - Nova prop `footer.manualPagination` para paginação server-side (desativa filtro e fatiamento client-side)
  - `enableRowSelection` agora aceita função `(row: T, index: number) => boolean` para desabilitar checkboxes de linhas específicas
  - Suporte a `CombinedFilterItem` nos filtros do header para integração com o modo `combined` do `Filter`
  - Remove prop `enableFilters` (filtros individuais por coluna foram descontinuados em favor do filtro global via `header`)

### Patch Changes

- **Label**: Corrige altura do ícone de tooltip
  - Troca `display: inline-block` por `display: inline-flex` no `.triggerWrapper` do Tooltip, corrigindo altura incorreta causada pelo `line-height` padrão do navegador
  - Adiciona `margin-bottom: 4px` para alinhar com o Figma

## 8.0.0

### Major Changes

- 8adb857: **TableV2**: Renomeia exports do TanStack para evitar conflito de nomes
  - **Alterado**: `createColumnHelper` → `createTableColumnHelper`
  - **Alterado**: `ColumnDef` → `TableColumnDefinition`
  - **Como migrar**:

    ```tsx
    // Antes
    import { createColumnHelper, ColumnDef } from '@giro-ds/react';

    // Depois
    import {
      createTableColumnHelper,
      TableColumnDefinition,
    } from '@giro-ds/react';
    ```

### Patch Changes

- 8adb857: **TableV2**: Exporta `createColumnHelper` e `ColumnDef` diretamente de `@giro-ds/react`
  - Elimina a necessidade de instalar `@tanstack/react-table` separadamente para usar o `TableV2`
  - Atualiza story e documentação MDX no Storybook
- 8adb857: **Callout**: Corrige prop `style` externa sendo ignorada pelo estilo interno
  - Garante mesclagem do `style` passado externamente com as CSS custom properties internas (`backgroundColor` e `textColor`)

## 7.0.0

### Major Changes

- **Badge**: Unificação dos modos notification e status em API única sem prop `type`
  - **Removido**: prop `type` (`'notification' | 'status'`)
  - **Alterado**: modo discriminado pela presença de `children` — com `children` o badge flutua (overlay); sem `children` exibe inline
  - **Alterado**: `badgeValue` unificado para `number | string | null`
  - **Alterado**: `data-testid` unificado para `"badge"` (era `"badge-notification"` / `"badge-status"`)
  - **Como migrar**:

    ```tsx
    // Antes
    <Badge type="notification" badgeValue={5}><Icon /></Badge>
    <Badge type="status" badgeValue={5} />

    // Depois
    <Badge badgeValue={5}><Icon /></Badge>
    <Badge badgeValue={5} />
    ```

- **Callout**: Refatoração da API com breaking changes
  - **Removido**: prop `disabled` (sem utilidade funcional)
  - **Removido**: export do tipo `CalloutVariant` — usar `TextVariant` diretamente
  - **Alterado**: prop `type` → `variant` (`Exclude<TextVariant, 'color'>`)
  - **Alterado**: prop `foregroundColor` → `textColor`
  - **Alterado**: prop `text` agora é obrigatória e aceita `React.ReactNode`
  - **Alterado**: prop `title` agora aceita `React.ReactNode` em vez de `string | null`
  - **Adicionado**: props `dismiss` e `onDismiss` para botão de fechar
  - **Adicionado**: prop `backgroundColor` para customização via tokens CSS
  - **Como migrar**:

    ```tsx
    // Antes
    <Callout type="alert" foregroundColor="#fff" text="mensagem" disabled />

    // Depois
    <Callout variant="alert" textColor="#fff" text="mensagem" />
    ```

### Minor Changes

- **TableV2**: Novo componente construído com TanStack Table
  - Paginação com seleção automática de itens por página
  - Seleção de linhas com checkboxes e estado `indeterminate`
  - Ações em massa via prop `bulkActions`
  - Busca global e filtros no header (checkbox, calendário) via `header.filterItems`
  - Filtros inline por coluna via `enableFilters`, ordenação nativa e scroll horizontal automático
  - Estado de carregamento com skeleton e estado vazio customizável
  - Tipos exportados: `TableV2Props`, `TableV2HeaderProps`, `TableV2FooterProps`

### Patch Changes

- **Avatar**: Remove `<div>` wrapper desnecessário ao redor do `AvatarRadix.Root`
- **Modal**: Corrige autofocus indesejado no botão de fechar ao abrir o dialog
- **Componentes**: Adiciona prop `className` e padroniza spread props para `...rest` em todos os componentes

## 6.0.2

### Patch Changes

- **Tipos**: Adiciona JSDoc em tipos compartilhados e corrige extensões de arquivo
  - JSDoc adicionado em `common.types.ts`, `Avatar.types.ts`, `Tooltip.types.ts`, `Dialog.types.ts`, `Calendar.types.ts`, `DatePicker.types.ts` e `Filter.types.ts`
  - Descrição da prop `locale` corrigida para "Idioma" em Calendar, DatePicker e Filter
  - Extensão corrigida de `.tsx` para `.ts` nos arquivos de tipos de Menu, Modal, Popover e TextArea

## 6.0.1

### Patch Changes

- **Calendar**: Corrige largura fixa do botão de dia para melhor responsividade no layout
- **Menu**: Corrige comportamento indevido de foco ao fechar o menu com clique, adicionando handler `onPointerDown`

## 6.0.0

### Major Changes

- **Chips**: Refatoração completa da API
  - **Removido**: Prop `title`, variante `type="color"`
  - **Alterado**: `type` → `variant` (valores: `neutral` | `brand` | `success` | `alert`)
  - **Alterado**: `title` → `children` (agora aceita ReactNode)
  - **Adicionado**: Props `backgroundColor` e `foregroundColor` para cores customizadas
  - **Como migrar**:

    ```tsx
    // Antes
    <Chips type="success" title="Ativo" />
    <Chips type="color" title="Cor" />

    // Depois
    <Chips variant="success">Ativo</Chips>
    <Chips backgroundColor="color-brand-secondary-medium">Cor customizada</Chips>
    ```

- **Modal**: Novo componente baseado em Radix UI Dialog com suporte a título, header customizado, footer, largura customizada e modo fullscreen
- **Quantity**: Adicionadas props de controle de limites e acessibilidade
  - Props `minValue` e `maxValue` para limites configuráveis
  - Props de acessibilidade: `decrementAriaLabel`, `incrementAriaLabel`, `inputAriaLabel`
  - Props `inputSize` e `inputSizeControl` para controle de tamanho
  - Botão de incremento agora desabilita corretamente ao atingir `maxValue`
- **Button**: Múltiplas correções de acessibilidade e comportamento
  - Substituição de `:focus` por `:focus-visible` para melhor experiência com mouse
  - `aria-busy` adicionado durante estado de loading
  - Tooltip em `iconOnly` agora requer `tooltipText` explícito
  - Clique bloqueado durante `loading`
  - Tipagem refatorada como union discriminada
- **Search**: Corrige sobreposição do texto digitado com o ícone de limpar (X) via padding dinâmico
- **Select**: Corrige perda de foco ao digitar na busca e remove margem lateral desnecessária dos itens
- **Table**: Refatoração de classes CSS de BEM para CSS Modules (camelCase) e adoção de design tokens
- **Switch**: Correções de bugs visuais no CSS (dimensões do thumb, display flex, transforms)
- **Calendar**: Ajustes de padding (spacing-16 → spacing-24) e border-radius (4 → 8) no overlay
- **DatePicker**: Correção no tratamento de erros (separação de props `error` e `errorMessage`)
- **Filter**: Ajustes de padding no search, list e actions
- **Drawer**: Correção nos testes para uso de `document.body.querySelector` (necessário por `createPortal`)
- **Dialog, Popover**: Remoção de testes duplicados/redundantes

## 5.0.1

### Patch Changes

- **DatePicker**: Corrige lógica de validação e exibição de mensagens de erro
  - Ajusta comportamento de `helperText` para exibir mensagens customizadas quando há erro de validação
  - Melhora clareza da prop `error` para refletir sempre o estado de validação
- **Build**: Adiciona limpeza automática do diretório temporário `dts-temp` após compilação

## 5.0.0

### Major Changes

- **Calendar**: Substituída implementação customizada por react-day-picker v9
  - **Removido**: Exports de tipos internos (`DayItem`, `EmptyItem`, `CalendarItem`, `YearItem`)
  - **Alterado**: Prop `selectedDate` → `selected`, prop `currentDate` agora é opcional
- **Dropdown**: Componente depreciado e movido para `.deprecated/`, removido das exportações públicas
- **Filter**: Refatoração da API interna
  - **Alterado**: Prop `position` → `side` + `align`
  - **Alterado**: `DropdownItem[]` → `FilterItem[]`
- **Drawer**: Adicionada nova prop opcional `headerContent`
- **DatePicker**: Atualizado para usar nova API do Calendar com prop `selected`
- **TextArea**: Novo componente com suporte completo a formulários
  - Label, validação, contador de caracteres e controle de redimensionamento
- **TextField**: Adicionada nova prop `error` para controle externo de validação

## 4.0.0

### Major Changes

- **Avatar**: Valores de tamanho alterados de `'small'`/`'large'` para `'sm'`/`'lg'`
- **Dialog**: Migração completa para Radix UI
  - **Removido**: Props `show`, `onClose`
  - **Alterado**: `fnConfirm` → `onConfirm`, `fnCancel` → `onCancel`
- **Toast**: Reescrita completa da API
  - Agora requer configuração `ToastProvider`/`ToastContainer`
  - **Alterado**: API baseada em objetos: `showToast({ title, iconType, ... })`
- **Button**: Adicionado tooltip automático para modo `iconOnly`
  - Novas props: `tooltipText`, `tooltipSide`, `tooltipAlign`
- **Popover**: Novo componente baseado em Radix UI com padrão trigger/content
- **Container**: Refatoração interna com design tokens e testes abrangentes
- **Search**: Corrigido bug do `useId()` e melhorada acessibilidade com navegação por teclado

## 3.0.7

### Patch Changes

- **Label**: Corrige alinhamento do componente adicionando margin-bottom e removendo margin-top do Select trigger
- **Select, Menu**: Remove coloração azul aplicada ao texto dos itens selecionados
- **Table**: Corrige comportamento do "selecionar todos" para respeitar checkboxes desabilitados via getCheckboxProps

## 3.0.6

### Patch Changes

- **Melhorias Internas**: Otimizações de build e refatorações
  - Adiciona herança de interfaces para reduzir duplicação de código (Avatar, Badge, Button, Calendar, Callout, Checkbox, Chips, DatePicker, Drawer, Dropdown, Filter, ListItem, Menu, Radio, Search, Select, Switch, Table, TextField, Toast, Tooltip, VerificationCode)
  - Aplica padrão de spread props em múltiplos componentes para melhor encaminhamento de props
  - Exclui arquivos depreciados do processo de build (vite.config.ts, tsconfig.json)
  - Corrige problemas de aplicação de CSS no componente Dialog
  - Corrige bugs do componente Tooltip
  - Atualiza configuração do Rollup para API moderna do Sass
  - Melhora tratamento de props e valores padrão dos componentes (TextField, Avatar, Filter, ListItem, Search, Table)

## 3.0.5

### Patch Changes

- **TextField, Label**: Atualiza componentes TextField e Label

## 3.0.4

### Patch Changes

- **Select**: Corrige tipo da prop do componente (onChange para onValueChange)

## 3.0.3

### Patch Changes

- **Select, TextField**: Resolve bugs incluindo busca em API, navegação por teclado, tratamento de valores de input e ajustes de espaçamento de layout

## 3.0.2

### Patch Changes

- **TextField**: Normaliza tratamento de valores para suportar tipo string | number
  - Adiciona helper normalizeValue() para converter string | number → string internamente
  - Corrige erro .trim() em valores numéricos
  - Adiciona background-color ao input para melhor visibilidade
  - Mantém compatibilidade retroativa com valores string existentes

## 3.0.1

### Patch Changes

- **DatePicker**: Corrige digitação manual e seleção via calendário
  - Corrige TextField para sincronizar estado interno com prop value externa
  - Remove DIV wrapper que interceptava eventos do TextField
  - Adiciona props disabled, id, className, data-testid ao TextField interno
  - Conecta minDate/maxDate ao componente Calendar
  - Remove estilo inline do ícone, substituindo por classes CSS

## 3.0.0

### Major Changes

- **DropdownMenu**: Removidas props `enableIcon` e `enableSubText`
  - Ícones e subtextos agora são renderizados automaticamente quando fornecidos nos items
  - **Como migrar**: Remova essas props do seu código
- **Button**: Alterado enum `iconPosition`: removido `'none'`, adicionado `'both'`
  - **Como migrar**: Substitua `iconPosition="none"` removendo a prop inteiramente
- **Select**: Alterada prop `onChange` → `onValueChange`
  - **Alterado**: `(e: ChangeEvent) => void` → `(value: string) => void`
  - **Como migrar**: Renomeie a prop e ajuste o handler para receber o valor diretamente
- **Switch**: Props `defaultChecked` e `disabled` agora são opcionais
- **Table**: Adicionado estado indeterminado ao checkbox "Selecionar Todos"
  - Nova prop opcional `disableSelectAll` em `rowSelection`
  - Suporte a tipos genéricos `<Table<T>>` para type-safety completa

## 2.0.0

### Major Changes

- **Checkbox**: Migrado para Radix UI
  - **Removido**: Props `name`, `value`, `ariaDescribedby`
  - **Alterado**: `onChange` → `onCheckedChange`
  - **Como migrar**:

    ```tsx
    // Antes
    <Checkbox onChange={(e) => setValue(e.target.checked)} name="myCheckbox" value="myValue" />

    // Depois
    <Checkbox onCheckedChange={(checked) => setValue(checked)} />
    ```

- **Radio**: Redesign completo da API para `RadioGroup` com padrão de array `items`
  - **Como migrar**:

    ```tsx
    // Antes
    <Radio checked={value === 'option1'} onChange={(val) => setValue(val)} value="option1" label="Option 1" />

    // Depois
    <Radio items={[{ value: 'option1', label: 'Option 1' }]} onValueChange={(val) => setValue(val)} defaultValue="option1" />
    ```

- **Tooltip**: Migrado para Radix UI
  - **Alterado**: Prop `position` → `side` + `align`
  - **Como migrar**:

    ```tsx
    // Antes
    <Tooltip position="top-right" text="Info"><Button /></Tooltip>

    // Depois
    <Tooltip side="top" align="start" text="Info"><Button /></Tooltip>
    ```

- **Switch**: Novo componente adicionado
- **Implementações antigas**: Movidas para pasta `.deprecated`

## 1.0.5

### Patch Changes

- **SelectRadix, TextField**: Converte CSS para variáveis SCSS no SelectRadix e limpa código do TextField

## 1.0.4

### Patch Changes

- **TextField**: Melhora interação do ícone com aprimoramentos de acessibilidade

## 1.0.3

### Patch Changes

- **TextField**: Agora aceita corretamente validação externa via errorMessage

## 1.0.2

### Patch Changes

- **TableHeader, Calendar**: Corrige funcionalidade onClear

## 1.0.1

### Patch Changes

- **Documentação**: Adiciona arquivos README aos pacotes

## 1.0.0

### Major Changes

- **Release Inicial**: Lançamento do pacote `@giro-ds/react`
  - Migração de `@zanthus/components-react` para `@giro-ds/react`
  - Biblioteca completa de componentes React do Zanthus Design System
  - Componentes disponíveis: Avatar, Badge, Button, Calendar, Callout, Checkbox, CheckboxRadix, Chips, Container, DatePicker, Dialog, Drawer, Dropdown, Filter, ListItem, Menu, MenuRadix, Quantity, Radio, RadioRadix, Search, Select, SelectField, SelectRadix, Table, TextField, Toast, Tooltip, VerificationCode

## Histórico anterior (@zanthus/components-react)

O pacote foi migrado de `@zanthus/components-react@2.0.35` para `@giro-ds/react@1.0.0`.
Para consultar o histórico completo de versões anteriores, veja as tags Git com prefixo `@zanthus/`.
