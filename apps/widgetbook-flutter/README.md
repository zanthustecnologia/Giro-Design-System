# Storybook Flutter

Widgetbook showcase for Zanthus Design System - Material 3 Pure Components.

## Overview

This app uses [Widgetbook](https://widgetbook.io/) to provide an interactive catalog of all 37+ Material 3 Flutter components organized by category.

## Components Included

### Actions (4)
- Buttons (ElevatedButton, FilledButton, OutlinedButton, TextButton)
- FAB (FloatingActionButton - all variants)
- IconButton (standard, filled, filledTonal, outlined)
- SegmentedButton

### Communication (4)
- Dialogs (AlertDialog, SimpleDialog)
- SnackBar
- Banner
- Progress (Circular & Linear)

### Containment (4)
- Cards (Card, Card.filled, Card.outlined)
- BottomSheet
- Drawer
- Dividers (Horizontal & Vertical)

### Navigation (6)
- AppBar
- NavigationBar & BottomNavigationBar
- NavigationRail
- Tabs
- SearchBar

### Selection (8)
- Selection Controls (Checkbox, Switch, Radio)
- Chips (all 5 variants)
- Slider (Slider & RangeSlider)
- Dropdown
- PopupMenu
- DatePicker
- TimePicker
- Menu & Autocomplete

### Input (2)
- TextField (all variants)
- Form

### Data Display (7)
- ListTile (all variants)
- Badge
- Avatar
- Tooltip
- DataTable
- Stepper
- Expansion

### Layout & Feedback (2)
- Scaffold
- ButtonBar
- RefreshIndicator

**Total: 23 stories showcasing 37+ Material 3 components**

## Features

- 📱 Interactive component showcase
- 🎨 Material 3 theme switcher (Light/Dark)
- 📐 Device frame preview (iPhone, Android, Desktop)
- 🔍 Text scale testing (1x, 1.5x, 2x)
- ⚙️ Interactive knobs for component customization
- 📂 Organized by Material Design categories

## Running the App

### Prerequisites

- Flutter SDK 3.0.0 or higher
- Dart SDK 3.0.0 or higher

### Install Dependencies

```bash
flutter pub get
```

### Run the App

```bash
flutter run
```

For web:

```bash
flutter run -d chrome
```

## Building for Production

### Web

```bash
flutter build web
```

### iOS

```bash
flutter build ios
```

### Android

```bash
flutter build apk
```

## Available Components

- Avatar
- Badge
- Button
- Card
- Checkbox
- Chip
- Dialog
- Divider
- Dropdown
- Icon Button
- Input
- List Item
- Radio
- Select
- Switch
- Text
- Tooltip

## Development

### Adding New Stories

1. Create a new story file in `lib/stories/`
2. Import it in `lib/main.dart`
3. Add it to the Widgetbook directories

Example:

```dart
// lib/stories/my_component_story.dart
import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget myComponentStory(BuildContext context) {
  return Center(
    child: MyComponent(),
  );
}
```

## Structure

```
lib/
├── main.dart           # Widgetbook app setup
└── stories/            # Component stories
    ├── avatar_story.dart
    ├── badge_story.dart
    ├── button_story.dart
    └── ...
```

## License

See LICENSE file in the repository root.
