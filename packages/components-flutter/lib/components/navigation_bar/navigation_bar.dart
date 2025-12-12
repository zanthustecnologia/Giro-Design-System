export 'package:flutter/material.dart' show NavigationBar, NavigationDestination;

/// Material 3 NavigationBar
/// Re-export do componente nativo do Flutter (M3 replacement para BottomNavigationBar)
/// 
/// Uso:
/// ```dart
/// NavigationBar(
///   selectedIndex: 0,
///   onDestinationSelected: (index) {},
///   destinations: [
///     NavigationDestination(
///       icon: Icon(Icons.home),
///       label: 'Home',
///     ),
///     NavigationDestination(
///       icon: Icon(Icons.search),
///       label: 'Search',
///     ),
///   ],
/// )
/// ```
