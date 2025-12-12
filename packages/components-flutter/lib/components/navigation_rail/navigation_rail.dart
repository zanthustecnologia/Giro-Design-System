export 'package:flutter/material.dart' show NavigationRail, NavigationRailDestination;

/// Material 3 NavigationRail
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// NavigationRail(
///   selectedIndex: 0,
///   onDestinationSelected: (index) {},
///   destinations: [
///     NavigationRailDestination(
///       icon: Icon(Icons.home),
///       label: Text('Home'),
///     ),
///     NavigationRailDestination(
///       icon: Icon(Icons.search),
///       label: Text('Search'),
///     ),
///   ],
/// )
/// ```
