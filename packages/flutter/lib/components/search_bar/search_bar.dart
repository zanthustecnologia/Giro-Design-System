export 'package:flutter/material.dart' show SearchBar, SearchAnchor;

/// Material 3 SearchBar
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// SearchBar(
///   hintText: 'Search...',
///   onChanged: (value) {},
/// )
/// ```
/// 
/// Uso com SearchAnchor:
/// ```dart
/// SearchAnchor(
///   builder: (context, controller) {
///     return SearchBar(
///       controller: controller,
///       onTap: () => controller.openView(),
///     );
///   },
///   suggestionsBuilder: (context, controller) {
///     return [
///       ListTile(title: Text('Suggestion 1')),
///     ];
///   },
/// )
/// ```
