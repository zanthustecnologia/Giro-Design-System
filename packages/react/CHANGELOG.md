# @giro-ds/react

## 4.0.0

### Major Changes

- de4c785: **BREAKING CHANGES:**
  - **Avatar**: Size values changed from 'small'/'large' to 'sm'/'lg' for Radix UI alignment
  - **Dialog**: Complete migration to Radix UI - removed props: show, onClose; renamed: fnConfirm→onConfirm, fnCancel→onCancel
  - **Toast**: Complete API rewrite - now requires ToastProvider/ToastContainer setup and uses object-based API: showToast({ title, iconType, ... })

  **New Features:**
  - **Button**: Added automatic tooltip for iconOnly mode with new props: tooltipText, tooltipSide, tooltipAlign
  - **Popover**: New component based on Radix UI with trigger/content pattern

  **Improvements:**
  - **Container**: Internal refactoring with design tokens and comprehensive tests
  - **Search**: Fixed useId() bug and improved accessibility with keyboard navigation

## 3.0.7

### Patch Changes

- fix(Label): corrige alinhamento do componente Label adicionando margin-bottom e removendo margin-top do Select trigger
- fix(Select, Menu): remove coloração azul aplicada ao texto dos itens selecionados nos componentes Menu e Select
- fix(Table): corrige comportamento do "selecionar todos" para respeitar checkboxes desabilitados via getCheckboxProps

## 3.0.6

### Patch Changes

- refactor(react): internal improvements and build optimizations
  - Add interface inheritance to reduce code duplication (Avatar, Badge, Button, Calendar, Callout, Checkbox, Chips, DatePicker, Drawer, Dropdown, Filter, ListItem, Menu, Radio, Search, Select, Switch, Table, TextField, Toast, Tooltip, VerificationCode)
  - Apply spread props pattern across multiple components for better prop forwarding
  - Exclude deprecated files from build process (vite.config.ts, tsconfig.json)
  - Fix CSS application issues in Dialog component
  - Fix Tooltip component bugs
  - Update Rollup configuration for modern Sass API
  - Enhance component props handling and default values (TextField, Avatar, Filter, ListItem, Search, Table)

## 3.0.5

### Patch Changes

- 670abc4: fix: update TextField and Label components

## 3.0.4

### Patch Changes

- 1d1cae3: fix: correct Select component prop type (onChange to onValueChange)

## 3.0.3

### Patch Changes

- 5adc12c: fix: resolve Select and TextField bugs including API search, keyboard navigation, input value handling, and layout spacing adjustments

## 3.0.2

### Patch Changes

- 628c4e9: fix(TextField): normalize value handling to support string | number type
  - Add normalizeValue() helper to convert string | number → string internally
  - Fix .trim() error on numeric values (lines 90-91)
  - Add background-color to input for better visibility
  - Maintain backward compatibility with existing string values

## 3.0.1

### Patch Changes

- 7d81357: fix(DatePicker): corrige digitação manual e seleção via calendário
  - Corrige TextField para sincronizar estado interno com prop value externa
  - Remove DIV wrapper que interceptava eventos do TextField
  - Adiciona props disabled, id, className, data-testid ao TextField interno
  - Conecta minDate/maxDate ao componente Calendar
  - Remove estilo inline do ícone, substituindo por classes CSS

## 3.0.0

### Major Changes

- 4afde4d: # Breaking Changes & New Features v3.0.0

  ## 💥 Breaking Changes

  ### DropdownMenu
  - **REMOVED** props: `enableIcon` and `enableSubText`
  - **WHY**: Simplified API - icons and subtexts are now automatically rendered when provided in items
  - **HOW TO MIGRATE**: Remove these props from your code. Icons/subtexts will render automatically if present in item data

  ### Button
  - **CHANGED** `iconPosition` enum: removed `'none'`, added `'both'`
  - **WHY**: `'none'` was redundant (just omit the prop). `'both'` enables icons on both sides
  - **HOW TO MIGRATE**: Replace `iconPosition="none"` by omitting the prop entirely

  ### Select
  - **CHANGED** prop: `onChange` → `onValueChange`
  - **CHANGED** signature: `(e: ChangeEvent) => void` → `(value: string) => void`
  - **WHY**: Alignment with Radix UI patterns, simpler API (no need to extract e.target.value)
  - **HOW TO MIGRATE**: Rename prop and adjust handler to receive value directly instead of event

  ## ✨ New Features

  ### Switch
  - Props `defaultChecked` and `disabled` are now **optional** (previously required)
  - Improves DX by allowing sensible defaults

  ### Table
  - Added indeterminate state to "Select All" checkbox
  - New optional prop `disableSelectAll` in `rowSelection`
  - Generic type support: `<Table<T>>` for full type-safety
  - Enhanced TypeScript documentation with JSDoc

  ## 📖 Migration Guide

  See detailed migration guide at: `docs/react/migration-guide-v2-to-v3.md`

## 2.0.0

### Major Changes

- BREAKING CHANGES:
  - **Checkbox**: `onChange` replaced with `onCheckedChange`, removed `name`, `value`, and `ariaDescribedby` props
  - **Radio**: Complete API redesign to `RadioGroup` with `items` array pattern
  - **Tooltip**: `position` prop replaced with `side` + `align` props
  - **feat**: Add new Switch component
  - **refactor**: Migrate Checkbox, Radio, and Tooltip to Radix UI
  - **refactor**: Move old implementations to `.deprecated` folder

  ### Migration Guide:

  **Checkbox:**

  ```tsx
  // Before
  <Checkbox
    onChange={(e) => setValue(e.target.checked)}
    name="myCheckbox"
    value="myValue"
  />

  // After
  <Checkbox
    onCheckedChange={(checked) => setValue(checked)}
  />
  ```

  **Radio:**

  ```tsx
  // Before
  <Radio
    checked={value === 'option1'}
    onChange={(val) => setValue(val)}
    value="option1"
    label="Option 1"
  />

  // After
  <Radio
    items={[
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]}
    onValueChange={(val) => setValue(val)}
    defaultValue="option1"
  />
  ```

  **Tooltip:**

  ```tsx
  // Before
  <Tooltip position="top-right" text="Info">
    <Button />
  </Tooltip>

  // After
  <Tooltip side="top" align="start" text="Info">
    <Button />
  </Tooltip>
  ```

## 1.0.5

### Patch Changes

- 06f4cc5: refactor: convert CSS to SCSS variables in SelectRadix and clean up TextField code

## 1.0.4

### Patch Changes

- bdce1f5: fix: enhance TextField icon interaction with accessibility improvements

## 1.0.3

### Patch Changes

- f2a65cb: fix: TextField now correctly accepts external errorMessage validation

## 1.0.2

### Patch Changes

- 08752e1: fix: TableHeader and Calendar onClear

## 1.0.1

### Patch Changes

- docs: add READMEs to packages

## 1.0.0

### Major Changes

- 🎉 Release inicial do pacote `@giro-ds/react`
- Migração de `@zanthus/components-react` para `@giro-ds/react`
- Biblioteca completa de componentes React do Zanthus Design System
- Componentes disponíveis: Avatar, Badge, Button, Calendar, Callout, Checkbox, CheckboxRadix, Chips, Container, DatePicker, Dialog, Drawer, Dropdown, Filter, ListItem, Menu, MenuRadix, Quantity, Radio, RadioRadix, Search, Select, SelectField, SelectRadix, Table, TextField, Toast, Tooltip, VerificationCode

---

## Histórico anterior (@zanthus/components-react)

O pacote foi migrado de `@zanthus/components-react@2.0.35` para `@giro-ds/react@1.0.0`.
Para consultar o histórico completo de versões anteriores, veja as tags Git com prefixo `@zanthus/`.
