export 'package:flutter/material.dart' show 
  RefreshIndicator;

/// Material 3 RefreshIndicator
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// RefreshIndicator(
///   onRefresh: () async {
///     await Future.delayed(Duration(seconds: 2));
///   },
///   child: ListView(...),
/// )
/// ```
