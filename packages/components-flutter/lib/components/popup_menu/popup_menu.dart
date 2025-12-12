export 'package:flutter/material.dart' show 
  PopupMenuButton,
  PopupMenuItem,
  PopupMenuDivider;

/// Material 3 PopupMenuButton
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// PopupMenuButton<String>(
///   itemBuilder: (context) => [
///     PopupMenuItem(value: 'edit', child: Text('Edit')),
///     PopupMenuItem(value: 'delete', child: Text('Delete')),
///   ],
///   onSelected: (value) {},
/// )
/// ```
