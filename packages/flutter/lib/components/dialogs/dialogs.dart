export 'package:flutter/material.dart' show 
  SimpleDialog,
  SimpleDialogOption,
  AlertDialog,
  AboutDialog,
  showDialog,
  showAboutDialog;

/// Material 3 Dialogs
/// Re-export dos componentes nativos do Flutter
/// 
/// AlertDialog:
/// ```dart
/// showDialog(
///   context: context,
///   builder: (context) => AlertDialog(
///     title: Text('Title'),
///     content: Text('Content'),
///     actions: [
///       TextButton(child: Text('Cancel'), onPressed: () {}),
///       TextButton(child: Text('OK'), onPressed: () {}),
///     ],
///   ),
/// )
/// ```
/// 
/// SimpleDialog:
/// ```dart
/// showDialog(
///   context: context,
///   builder: (context) => SimpleDialog(
///     title: Text('Select'),
///     children: [
///       SimpleDialogOption(child: Text('Option 1'), onPressed: () {}),
///     ],
///   ),
/// )
/// ```
