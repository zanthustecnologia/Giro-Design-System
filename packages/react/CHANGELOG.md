# @giro-ds/react

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
