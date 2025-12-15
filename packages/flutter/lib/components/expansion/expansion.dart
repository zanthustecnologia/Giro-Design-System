export 'package:flutter/material.dart' show ExpansionPanel, ExpansionPanelList, ExpansionTile;

/// Material 3 Expansion Panels & Tiles
/// Re-export dos componentes nativos do Flutter
/// 
/// Uso ExpansionTile:
/// ```dart
/// ExpansionTile(
///   title: Text('Title'),
///   children: [
///     ListTile(title: Text('Item 1')),
///     ListTile(title: Text('Item 2')),
///   ],
/// )
/// ```
/// 
/// Uso ExpansionPanelList:
/// ```dart
/// ExpansionPanelList(
///   expansionCallback: (index, isExpanded) {},
///   children: [
///     ExpansionPanel(
///       headerBuilder: (context, isExpanded) => Text('Header'),
///       body: Text('Body'),
///     ),
///   ],
/// )
/// ```
