# @giro-ds/react

## 5.0.0

### Major Changes

- **Breaking Changes**: Calendar migrado para react-day-picker; Dropdown depreciado e removido das exportações; API do Filter refatorada
  - **Calendar**: Substituída implementação customizada por react-day-picker v9, removidos exports de tipos internos (DayItem, EmptyItem, CalendarItem, YearItem), renomeada prop `selectedDate` para `selected`, prop `currentDate` agora é opcional
  - **Dropdown**: Componente depreciado e movido para .deprecated/, removido das exportações públicas
  - **Filter**: Substituído Dropdown por Popover internamente, alterada prop `position` para `side` + `align`, substituído `DropdownItem[]` por `FilterItem[]`
  - **Drawer**: Adicionada nova prop opcional `headerContent`
  - **DatePicker**: Atualizado para usar nova API do Calendar com prop `selected`
  - **TextArea**: Novo componente com suporte completo a formulários (label, validação, contador de caracteres, controle de redimensionamento)
  - **TextField**: Adicionada nova prop `error` para controle externo de validação
  - **Testes**: Corrigidos testes de Avatar, Dialog e Toast após breaking changes da v4.0.0

## 4.0.0

### Major Changes

- **Breaking Changes**: Migração para Radix UI e refatorações de API
  - **Avatar**: Valores de tamanho alterados de 'small'/'large' para 'sm'/'lg' para alinhamento com Radix UI
  - **Dialog**: Migração completa para Radix UI - removidas props: show, onClose; renomeadas: fnConfirm→onConfirm, fnCancel→onCancel
  - **Toast**: Reescrita completa da API - agora requer configuração ToastProvider/ToastContainer e usa API baseada em objetos: showToast({ title, iconType, ... })

  **Novos Recursos:**
  - **Button**: Adicionado tooltip automático para modo iconOnly com novas props: tooltipText, tooltipSide, tooltipAlign
  - **Popover**: Novo componente baseado em Radix UI com padrão trigger/content

  **Melhorias:**
  - **Container**: Refatoração interna com design tokens e testes abrangentes
  - **Search**: Corrigido bug do useId() e melhorada acessibilidade com navegação por teclado

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

- **Breaking Changes**: Mudanças significativas na API e novos recursos

  **Breaking Changes:**

  - **DropdownMenu**: Removidas props `enableIcon` e `enableSubText`
    - **Por quê**: API simplificada - ícones e subtextos agora são renderizados automaticamente quando fornecidos nos items
    - **Como migrar**: Remova essas props do seu código. Ícones/subtextos serão renderizados automaticamente se presentes nos dados do item

  - **Button**: Alterado enum `iconPosition`: removido `'none'`, adicionado `'both'`
    - **Por quê**: `'none'` era redundante (basta omitir a prop). `'both'` habilita ícones em ambos os lados
    - **Como migrar**: Substitua `iconPosition="none"` removendo a prop inteiramente

  - **Select**: Alterada prop `onChange` → `onValueChange` e assinatura `(e: ChangeEvent) => void` → `(value: string) => void`
    - **Por quê**: Alinhamento com padrões do Radix UI, API mais simples (não precisa extrair e.target.value)
    - **Como migrar**: Renomeie a prop e ajuste o handler para receber o valor diretamente ao invés do evento

  **Novos Recursos:**

  - **Switch**: Props `defaultChecked` e `disabled` agora são opcionais (anteriormente obrigatórias), melhorando DX ao permitir valores padrão sensatos
  - **Table**: Adicionado estado indeterminado ao checkbox "Selecionar Todos", nova prop opcional `disableSelectAll` em `rowSelection`, suporte a tipos genéricos `<Table<T>>` para type-safety completa, documentação TypeScript aprimorada com JSDoc

  **Guia de Migração:**

  Veja o guia detalhado de migração em: `docs/react/migration-guide-v2-to-v3.md`

## 2.0.0

### Major Changes

- **Breaking Changes**: Migração para Radix UI e redesign de APIs
  - **Checkbox**: Prop `onChange` substituída por `onCheckedChange`, removidas props `name`, `value` e `ariaDescribedby`
  - **Radio**: Redesign completo da API para `RadioGroup` com padrão de array `items`
  - **Tooltip**: Prop `position` substituída por props `side` + `align`
  - **Switch**: Adicionado novo componente Switch
  - **Migração**: Checkbox, Radio e Tooltip migrados para Radix UI
  - **Refatoração**: Implementações antigas movidas para pasta `.deprecated`

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

---

## Histórico anterior (@zanthus/components-react)

O pacote foi migrado de `@zanthus/components-react@2.0.35` para `@giro-ds/react@1.0.0`.
Para consultar o histórico completo de versões anteriores, veja as tags Git com prefixo `@zanthus/`.
