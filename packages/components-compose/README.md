# Zanthus Compose Components

Material 3 pure components library for Jetpack Compose.

## Features

- ✅ Complete Material 3 component library (40+ components)
- 🎨 Pure Compose widgets (re-exports nativos)
- 📱 Material Design 3 compliant
- 🔧 Fully customizable with theming
- ♿ Built-in accessibility
- 🚀 Ready for token integration

## Components

All Material 3 pure components from Jetpack Compose, organized by category:

### Actions (13 components)
- **Buttons** - Button, OutlinedButton, TextButton, ElevatedButton, FilledTonalButton
- **FAB** - FloatingActionButton (Small, Regular, Large, Extended)
- **IconButton** - IconButton, FilledIconButton, FilledTonalIconButton, OutlinedIconButton

### Communication (4 components)
- **AlertDialog** - Modal dialogs with actions
- **Snackbar** - Brief messages with optional actions
- **ProgressIndicator** - CircularProgressIndicator, LinearProgressIndicator

### Containment (4 components)
- **Card** - Card, ElevatedCard, OutlinedCard
- **Divider** - Horizontal and vertical dividers

### Navigation (14 components)
- **TopAppBar** - TopAppBar, CenterAlignedTopAppBar, MediumTopAppBar, LargeTopAppBar
- **BottomAppBar** - Bottom app bar with FAB integration
- **NavigationBar** - Bottom navigation with NavigationBarItem
- **NavigationRail** - Side navigation with NavigationRailItem
- **NavigationDrawer** - NavigationDrawer, ModalNavigationDrawer, NavigationDrawerItem
- **Tabs** - TabRow, ScrollableTabRow, Tab

### Selection (15 components)
- **Checkbox** - Selection controls
- **Switch** - Toggle controls
- **RadioButton** - Single selection
- **Slider** - Continuous value selection (Slider, RangeSlider)
- **Chips** - AssistChip, FilterChip, InputChip, SuggestionChip (+ Elevated variants)

### Input (2 components)
- **TextField** - TextField and OutlinedTextField

### Data Display (3 components)
- **ListItem** - Material 3 list items
- **Badge** - Badge and BadgedBox
- **Tooltip** - TooltipBox

### Layout (1 component)
- **Scaffold** - Basic page structure

**Total: 56+ Material 3 Compose components**

## Installation

Add to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation(project(":packages:components-compose:lib"))
}
```

Or if published:

```kotlin
dependencies {
    implementation("com.zanthus:components-compose:0.1.0")
}
```

## Usage

```kotlin
import androidx.compose.runtime.Composable
import com.zanthus.components.*

@Composable
fun MyScreen() {
    ZanthusButton(onClick = { }) {
        Text("Click me")
    }
    
    ZanthusCard {
        Text("Card content")
    }
    
    ZanthusTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Email") }
    )
}
```

## Components Overview

### Buttons
```kotlin
ZanthusButton(onClick = { }) { Text("Button") }
ZanthusOutlinedButton(onClick = { }) { Text("Outlined") }
ZanthusTextButton(onClick = { }) { Text("Text") }
ZanthusElevatedButton(onClick = { }) { Text("Elevated") }
ZanthusFilledTonalButton(onClick = { }) { Text("Tonal") }
```

### FAB
```kotlin
ZanthusFAB(onClick = { }) { Icon(Icons.Default.Add, null) }
ZanthusExtendedFAB(
    text = { Text("Create") },
    icon = { Icon(Icons.Default.Add, null) },
    onClick = { }
)
```

### Cards
```kotlin
ZanthusCard { /* content */ }
ZanthusElevatedCard { /* content */ }
ZanthusOutlinedCard { /* content */ }
```

### Navigation
```kotlin
ZanthusNavigationBar {
    items.forEach { item ->
        ZanthusNavigationBarItem(
            selected = selected == item,
            onClick = { selected = item },
            icon = { Icon(item.icon, null) },
            label = { Text(item.label) }
        )
    }
}
```

### Input
```kotlin
ZanthusTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Label") }
)

ZanthusOutlinedTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Label") }
)
```

## Advanced Components

For complex components, use Material 3 Compose APIs directly:

```kotlin
// DatePicker
val datePickerState = rememberDatePickerState()
DatePicker(state = datePickerState)

// TimePicker
val timePickerState = rememberTimePickerState()
TimePicker(state = timePickerState)

// ModalBottomSheet
val sheetState = rememberModalBottomSheetState()
ModalBottomSheet(
    onDismissRequest = { },
    sheetState = sheetState
) { /* content */ }

// DropdownMenu
DropdownMenu(
    expanded = expanded,
    onDismissRequest = { expanded = false }
) {
    DropdownMenuItem(
        text = { Text("Item") },
        onClick = { }
    )
}
```

## Theme Integration

All components work with Material 3 theming:

```kotlin
MaterialTheme(
    colorScheme = dynamicColorScheme,
    typography = typography,
    shapes = shapes
) {
    // Your composables
}
```

## Requirements

- Android SDK 24+
- Kotlin 1.9+
- Jetpack Compose BOM 2024.01.00+
- Material 3 Compose

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## Resources

- [Material Design 3](https://m3.material.io/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Material 3 Compose](https://developer.android.com/jetpack/compose/designsystems/material3)
