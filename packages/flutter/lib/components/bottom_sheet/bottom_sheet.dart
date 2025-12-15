export 'package:flutter/material.dart' show BottomSheet, showModalBottomSheet, showBottomSheet;

/// Material 3 BottomSheet
/// Re-export do componente nativo do Flutter
/// 
/// Uso Modal:
/// ```dart
/// showModalBottomSheet(
///   context: context,
///   builder: (context) => Container(
///     child: Text('Content'),
///   ),
/// )
/// ```
/// 
/// Uso Persistente:
/// ```dart
/// showBottomSheet(
///   context: context,
///   builder: (context) => Container(
///     child: Text('Content'),
///   ),
/// )
/// ```
