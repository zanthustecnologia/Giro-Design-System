export 'package:flutter/material.dart' show SnackBar, ScaffoldMessenger;

/// Material 3 SnackBar
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// ScaffoldMessenger.of(context).showSnackBar(
///   SnackBar(
///     content: Text('Message'),
///     action: SnackBarAction(label: 'Undo', onPressed: () {}),
///   ),
/// )
/// ```
