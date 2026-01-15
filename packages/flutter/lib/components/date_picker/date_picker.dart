export 'package:flutter/material.dart' show showDatePicker, showDateRangePicker, DatePickerDialog;

/// Material 3 DatePicker
/// Re-export do componente nativo do Flutter
/// 
/// Uso DatePicker:
/// ```dart
/// showDatePicker(
///   context: context,
///   initialDate: DateTime.now(),
///   firstDate: DateTime(2000),
///   lastDate: DateTime(2100),
/// )
/// ```
/// 
/// Uso DateRangePicker:
/// ```dart
/// showDateRangePicker(
///   context: context,
///   firstDate: DateTime(2000),
///   lastDate: DateTime(2100),
/// )
/// ```
