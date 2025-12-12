export 'package:flutter/material.dart' show 
  FormField,
  Form,
  FormState;

/// Material 3 Form
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// Form(
///   key: _formKey,
///   child: Column(
///     children: [
///       TextFormField(
///         validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
///       ),
///       ElevatedButton(
///         onPressed: () {
///           if (_formKey.currentState!.validate()) {
///             // Process
///           }
///         },
///         child: Text('Submit'),
///       ),
///     ],
///   ),
/// )
/// ```
