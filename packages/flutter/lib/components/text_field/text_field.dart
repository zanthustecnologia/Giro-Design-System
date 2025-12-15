export 'package:flutter/material.dart' show 
  TextField, 
  TextFormField, 
  InputDecoration,
  TextInputType,
  TextInputAction;

/// Material 3 TextField & TextFormField
/// Re-export dos componentes nativos do Flutter
/// 
/// TextField simples:
/// ```dart
/// TextField(
///   decoration: InputDecoration(
///     labelText: 'Email',
///     hintText: 'Enter your email',
///   ),
/// )
/// ```
/// 
/// TextFormField com validação:
/// ```dart
/// TextFormField(
///   decoration: InputDecoration(labelText: 'Email'),
///   validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
/// )
/// ```
