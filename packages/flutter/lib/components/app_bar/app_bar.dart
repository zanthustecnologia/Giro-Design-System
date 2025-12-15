export 'package:flutter/material.dart' show AppBar, SliverAppBar;

/// Material 3 AppBar
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// AppBar(
///   title: Text('Title'),
///   actions: [
///     IconButton(icon: Icon(Icons.search), onPressed: () {}),
///   ],
/// )
/// ```
/// 
/// Uso SliverAppBar:
/// ```dart
/// SliverAppBar(
///   expandedHeight: 200,
///   flexibleSpace: FlexibleSpaceBar(title: Text('Title')),
/// )
/// ```
