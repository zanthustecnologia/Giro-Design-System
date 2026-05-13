# Zanthus Flutter Components

Flutter component library for Zanthus Design System - Material 3 Pure Components.

## Features

- ✅ Complete Material 3 component library
- 🎨 Pure Flutter widgets (re-exports nativos)
- 📱 Material Design 3 compliant
- 🔧 Fully customizable with theming
- ♿ Built-in accessibility
- 🚀 Ready for token integration

## Components

Todos os componentes Material 3 puros do Flutter, organizados por categoria:

### Actions (4 componentes)

- **Buttons** - ElevatedButton, FilledButton, OutlinedButton, TextButton
- **FloatingActionButton** - FAB em variantes small, regular, large, extended
- **IconButton** - Standard, filled, filledTonal, outlined variants
- **SegmentedButton** - Single or multiple selection

### Communication (4 componentes)

- **Dialogs** - AlertDialog, SimpleDialog, AboutDialog
- **SnackBar** - Brief messages with optional actions
- **Banner** - MaterialBanner for persistent messages
- **Progress** - CircularProgressIndicator, LinearProgressIndicator

### Containment (4 componentes)

- **Cards** - Card, Card.filled, Card.outlined
- **BottomSheet** - Modal and persistent bottom sheets
- **Drawer** - Drawer and NavigationDrawer
- **Dividers** - Horizontal and vertical dividers

### Navigation (6 componentes)

- **AppBar** - Top app bar with actions
- **BottomNavigationBar** - Legacy bottom navigation
- **NavigationBar** - Material 3 bottom navigation
- **NavigationRail** - Side navigation for tablets/desktop
- **Tabs** - TabBar and TabBarView
- **SearchBar** - SearchBar and SearchAnchor

### Selection (8 componentes)

- **SelectionControls** - Checkbox, Switch, Radio
- **Chips** - Chip, InputChip, ChoiceChip, FilterChip, ActionChip
- **Slider** - Slider and RangeSlider
- **DatePicker** - showDatePicker, showDateRangePicker
- **TimePicker** - showTimePicker
- **Menu** - MenuAnchor, MenuBar
- **PopupMenu** - PopupMenuButton with items
- **DropdownButton** - DropdownButton and DropdownButtonFormField
- **Autocomplete** - RawAutocomplete widget

### Input (2 componentes)

- **TextField** - TextField and TextFormField with InputDecoration
- **Form** - Form and FormField for validation

### Data Display (7 componentes)

- **ListTile** - ListTile, CheckboxListTile, RadioListTile, SwitchListTile
- **DataTable** - DataTable and DataColumn
- **Stepper** - Stepper for step-by-step UI
- **Expansion** - ExpansionPanel and ExpansionTile
- **Badge** - Badge with labels
- **Avatar** - CircleAvatar
- **Tooltip** - Tooltip widget

### Layout & Feedback (2 componentes)

- **Scaffold** - Basic page structure
- **ButtonBar** - ButtonBar and OverflowBar
- **RefreshIndicator** - Pull-to-refresh

**Total: 37+ componentes Material 3 puros**

## Installation

Add to your `pubspec.yaml`:

```yaml
dependencies:
  zanthus_flutter:
    path: ../packages/components-flutter
```

## Usage

### Custom Components (with tokens)

```dart
import 'package:flutter_giro/components/buttons/giro_button.dart';

// Use components
GiroButton(
  text: 'Click me',
  variant: GiroButtonVariant.filled,
  size: GiroSize.sm,
  fullWidth: false,
  iconPosition: GiroPosition.none,
  iconOnly: false,
  icon: Icon(FluentIcons.add_16_regular),
  onPressed: () {},
  disable: false,
),
```

### Material 3 Pure Components

```dart
import 'package:flutter_giro/flutter_giro.dart';

// FloatingActionButton
FloatingActionButton(
  onPressed: () {},
  child: Icon(Icons.add),
)

// NavigationBar (M3)
NavigationBar(
  selectedIndex: 0,
  onDestinationSelected: (index) {},
  destinations: [
    NavigationDestination(icon: Icon(Icons.home), label: 'Home'),
    NavigationDestination(icon: Icon(Icons.search), label: 'Search'),
  ],
)

// SegmentedButton
SegmentedButton<String>(
  segments: [
    ButtonSegment(value: 'day', label: Text('Day')),
    ButtonSegment(value: 'week', label: Text('Week')),
  ],
  selected: {'day'},
  onSelectionChanged: (Set<String> selected) {},
)
```

## Design Tokens

Access design tokens directly:

```dart
// Colors
ZanthusColors.primary
ZanthusColors.secondary

// Spacing
ZanthusSpacing.md
ZanthusSpacing.lg

// Typography
ZanthusTypography.heading1
ZanthusTypography.bodyMedium

// Border Radius
ZanthusBorderRadius.borderRadiusMd

// Shadows
ZanthusShadows.shadowMd
```

## Development

Run tests:

```bash
flutter test
```

## License

See LICENSE file in the repository root.
