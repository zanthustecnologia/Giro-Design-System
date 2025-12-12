export 'package:flutter/material.dart' show Drawer, DrawerHeader, NavigationDrawer, NavigationDrawerDestination;

/// Material 3 Drawer & NavigationDrawer
/// Re-export dos componentes nativos do Flutter
/// 
/// Uso Drawer:
/// ```dart
/// Drawer(
///   child: ListView(
///     children: [
///       DrawerHeader(child: Text('Header')),
///       ListTile(title: Text('Item')),
///     ],
///   ),
/// )
/// ```
/// 
/// Uso NavigationDrawer (M3):
/// ```dart
/// NavigationDrawer(
///   selectedIndex: 0,
///   onDestinationSelected: (index) {},
///   children: [
///     NavigationDrawerDestination(
///       icon: Icon(Icons.home),
///       label: Text('Home'),
///     ),
///   ],
/// )
/// ```
