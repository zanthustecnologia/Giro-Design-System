# Changelog

All notable changes to the Zanthus Flutter Components package will be documented in this file.

## [0.4.0] - 2026-06-02

### Added

- Componente customizado **Button** com o design visual oficial do Flutter-Giro
- Componente customizado **Chip**
- Adição de novos **Design Tokens** para expandir o suporte e integração com o Design System

## [0.3.0] - 2025-12-12

### Changed

- **BREAKING**: Removidos todos os componentes customizados com wrappers
- **BREAKING**: Pacote agora contém apenas componentes Material 3 puros (re-exports nativos)
- Reorganizada estrutura de exports por categoria (Actions, Communication, Containment, Navigation, Selection, Input, Data Display, Layout, Feedback)

### Added

- **18 novos componentes Material 3**:
  - Buttons (ElevatedButton, FilledButton, OutlinedButton, TextButton)
  - IconButton (standard, filled, filledTonal, outlined)
  - TextField e TextFormField
  - ListTile (ListTile, CheckboxListTile, RadioListTile, SwitchListTile)
  - Dialogs (AlertDialog, SimpleDialog, AboutDialog)
  - PopupMenuButton
  - DropdownButton e DropdownButtonFormField
  - Checkbox, Switch, Radio (puros)
  - Card (Card, Card.filled, Card.outlined)
  - Chips (Chip, InputChip, ChoiceChip, FilterChip, ActionChip)
  - Badge
  - CircleAvatar
  - Tooltip
  - Divider e VerticalDivider
  - Form e FormField
  - Scaffold
  - ButtonBar e OverflowBar
  - RefreshIndicator

### Removed

- Componentes customizados (avatar, badge, button, card, checkbox, chip, dialog, divider, dropdown, icon_button, input, list_item, radio, select, switch, text, tooltip)
- Design tokens mantidos apenas para futura integração

### Notes

- Total de **37+ componentes Material 3 puros** disponíveis
- Todos os componentes seguem 100% a API oficial do Flutter Material
- Preparados para integração futura de tokens de design
- Pacote agora é uma camada limpa de re-exports dos widgets nativos

## [0.2.0] - 2025-12-12

### Added

- **21 Material 3 Pure Components** (re-exports nativos):
  - Actions: FloatingActionButton, SegmentedButton
  - Communication: SnackBar, Banner, CircularProgressIndicator, LinearProgressIndicator
  - Containment: BottomSheet, Drawer, NavigationDrawer
  - Navigation: AppBar, BottomNavigationBar, NavigationBar, NavigationRail, TabBar, SearchBar
  - Selection: Slider, RangeSlider, DatePicker, TimePicker, Menu, Autocomplete
  - Data Display: Stepper, DataTable, ExpansionPanel, ExpansionTile
- Documentação completa com exemplos de uso para cada componente
- Total de 38 componentes disponíveis no pacote

### Notes

- Componentes Material 3 são re-exports puros dos widgets nativos do Flutter
- Preparados para receber integração de tokens posteriormente
- Seguem 100% a API oficial do Material Design 3

## [0.1.0] - 2025-12-12

### Added

- Initial release of Zanthus Flutter components
- Design tokens:
  - Colors (primary, secondary, grayscale)
  - Spacing (xs, sm, md, lg, xl, xxl, xxxl)
  - Typography (font sizes, weights, text styles)
  - Border radius (none, xs, sm, md, lg, xl, xxl, full)
  - Shadows (sm, md, lg, xl)
- Components:
  - Avatar with size variants and image/initials support
  - Badge with multiple variants (primary, secondary, success, warning, error, info)
  - Button with variants (primary, secondary, outline, ghost, text) and sizes
  - Card with customizable padding and shadow
  - Checkbox with label support
  - Chip with selection state
  - Dialog with title, content, and actions
  - Divider (horizontal and vertical)
  - Dropdown for selection
  - Icon Button with tooltip support
  - Input with validation and prefix/suffix icons
  - List Item with leading, title, subtitle, and trailing
  - Radio with label support
  - Select with custom item builder
  - Switch with label support
  - Text with typography presets (h1, h2, h3, h4, body, caption)
  - Tooltip with customizable message

### Notes

- All components follow Material Design principles
- Design tokens prepared for integration with tokens package
- Ready for customization and theming
