export 'package:flutter/material.dart' show Autocomplete;

/// Material 3 Autocomplete
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// Autocomplete<String>(
///   optionsBuilder: (TextEditingValue textEditingValue) {
///     return ['Option 1', 'Option 2', 'Option 3']
///         .where((option) => option.contains(textEditingValue.text));
///   },
///   onSelected: (String selection) {},
/// )
/// ```
