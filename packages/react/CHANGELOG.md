# @giro-ds/react

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
