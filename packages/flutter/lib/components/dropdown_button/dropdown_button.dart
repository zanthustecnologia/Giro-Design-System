export 'package:flutter/material.dart' show 
  DropdownButton,
  DropdownMenuItem,
  DropdownButtonFormField;

/// Material 3 DropdownButton
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// DropdownButton<String>(
///   value: selectedValue,
///   items: [
///     DropdownMenuItem(value: 'one', child: Text('One')),
///     DropdownMenuItem(value: 'two', child: Text('Two')),
///   ],
///   onChanged: (value) {},
/// )
/// ```
