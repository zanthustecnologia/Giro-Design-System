export 'package:flutter/material.dart' show MenuBar, MenuAnchor, SubmenuButton, MenuItemButton;

/// Material 3 Menu
/// Re-export do componente nativo do Flutter
/// 
/// Uso MenuAnchor:
/// ```dart
/// MenuAnchor(
///   builder: (context, controller, child) {
///     return TextButton(
///       onPressed: () => controller.open(),
///       child: Text('Open Menu'),
///     );
///   },
///   menuChildren: [
///     MenuItemButton(
///       child: Text('Item 1'),
///       onPressed: () {},
///     ),
///     SubmenuButton(
///       menuChildren: [
///         MenuItemButton(child: Text('Sub 1'), onPressed: () {}),
///       ],
///       child: Text('Submenu'),
///     ),
///   ],
/// )
/// ```
