export 'package:flutter/material.dart' show TabBar, TabBarView, Tab, TabController, DefaultTabController;

/// Material 3 TabBar
/// Re-export do componente nativo do Flutter
/// 
/// Uso com DefaultTabController:
/// ```dart
/// DefaultTabController(
///   length: 3,
///   child: Column(
///     children: [
///       TabBar(
///         tabs: [
///           Tab(text: 'Tab 1'),
///           Tab(text: 'Tab 2'),
///           Tab(text: 'Tab 3'),
///         ],
///       ),
///       Expanded(
///         child: TabBarView(
///           children: [
///             Text('Content 1'),
///             Text('Content 2'),
///             Text('Content 3'),
///           ],
///         ),
///       ),
///     ],
///   ),
/// )
/// ```
