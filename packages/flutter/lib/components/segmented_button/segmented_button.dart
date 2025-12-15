export 'package:flutter/material.dart' show SegmentedButton;

/// Material 3 SegmentedButton
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// SegmentedButton<String>(
///   segments: [
///     ButtonSegment(value: 'day', label: Text('Day')),
///     ButtonSegment(value: 'week', label: Text('Week')),
///   ],
///   selected: {'day'},
///   onSelectionChanged: (Set<String> selected) {},
/// )
/// ```
