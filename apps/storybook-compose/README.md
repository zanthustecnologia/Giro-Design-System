# Zanthus Compose Storybook

Showkase component browser for all Zanthus Jetpack Compose Material 3 components.

## About

This is the interactive component showcase using [Showkase](https://github.com/airbnb/Showkase) from Airbnb for the Zanthus Compose component library. It displays all 56+ Material 3 pure components organized by category.

## Components Covered

### Actions (13)
- ✅ Buttons (Button, OutlinedButton, TextButton, ElevatedButton, FilledTonalButton)
- ✅ FAB (FloatingActionButton - all 4 variants: Small, Regular, Large, Extended)
- ✅ IconButton (4 variants: Standard, Filled, FilledTonal, Outlined)

### Containment (4)
- ✅ Cards (Card, ElevatedCard, OutlinedCard)
- ✅ Divider

### Navigation (7)
- ✅ TopAppBar (TopAppBar, CenterAlignedTopAppBar)
- ✅ BottomAppBar
- ✅ NavigationBar
- ✅ NavigationRail
- ✅ Tabs (TabRow, ScrollableTabRow)

### Selection (12)
- ✅ Checkbox
- ✅ Switch
- ✅ RadioButton
- ✅ Slider (Slider, RangeSlider)
- ✅ Chips (AssistChip, FilterChip, InputChip, SuggestionChip + Elevated variants)

### Input (4)
- ✅ TextField (Basic, Outlined, with Icon, Password)

### Data Display & Communication (5)
- ✅ ListItem
- ✅ Badge
- ✅ ProgressIndicator (Circular & Linear)
- ✅ Snackbar
- ✅ AlertDialog

**Total: 45+ interactive previews covering 56+ Material 3 Compose components**

## Features

- 📱 Interactive component browser powered by Showkase
- 🎨 Material 3 theming (Light/Dark)
- 🔍 Search and filter components
- 📂 Organized by Material Design categories
- 📱 Live preview on device/emulator
- 🎯 KSP-powered code generation

## Setup

### Prerequisites

- Android Studio Hedgehog or later
- Android SDK 24+
- Kotlin 1.9+

### Build

1. Open the project in Android Studio
2. Sync Gradle files
3. Build the project

```bash
./gradlew build
```

### Run

Connect a device or start an emulator, then:

```bash
./gradlew installDebug
```

Or use Android Studio's Run button.

The app will automatically launch the Showkase browser on startup.

## Project Structure

```
storybook-compose/
├── app/
│   ├── src/main/java/com/zanthus/storybook/
│   │   ├── MainActivity.kt                    # Entry point
│   │   ├── components/
│   │   │   ├── ActionsComponents.kt           # Buttons, FAB, IconButton
│   │   │   ├── ContainmentComponents.kt       # Cards, Divider
│   │   │   ├── NavigationComponents.kt        # AppBars, Navigation, Tabs
│   │   │   ├── SelectionComponents.kt         # Checkbox, Switch, Chips, Slider
│   │   │   ├── InputComponents.kt             # TextField variants
│   │   │   └── DataDisplayComponents.kt       # ListItem, Badge, Progress, etc
│   │   └── ui/theme/
│   │       ├── Theme.kt                       # Material 3 theme
│   │       └── Type.kt                        # Typography
│   └── build.gradle.kts
└── build.gradle.kts
```

## Adding New Components

To add a new component preview:

1. Create or edit a file in `components/` folder
2. Add a composable function with `@ShowkaseComposable` annotation:

```kotlin
@ShowkaseComposable(name = "Component Name", group = "Category")
@Composable
fun MyComponentPreview() {
    MyComponent()
}
```

3. Rebuild the project - Showkase will automatically discover it via KSP

## Architecture

- **Showkase**: Component browser and annotation processor
- **KSP**: Kotlin Symbol Processing for code generation
- **Material 3**: Latest Material Design components
- **Compose BOM**: Manages all Compose dependencies

## Dependencies

- `androidx.compose.material3:material3` - Material 3 components
- `com.airbnb.android:showkase:1.0.3` - Component browser
- `com.airbnb.android:showkase-processor:1.0.3` - KSP processor
- Zanthus Components library

## Building for Production

```bash
./gradlew assembleRelease
```

## License

MIT

## Resources

- [Showkase Documentation](https://github.com/airbnb/Showkase)
- [Material Design 3](https://m3.material.io/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Material 3 Compose](https://developer.android.com/jetpack/compose/designsystems/material3)
