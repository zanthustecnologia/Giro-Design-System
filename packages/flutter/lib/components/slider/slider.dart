export 'package:flutter/material.dart' show Slider, RangeSlider, SliderTheme;

/// Material 3 Slider & RangeSlider
/// Re-export dos componentes nativos do Flutter
/// 
/// Uso Slider:
/// ```dart
/// Slider(
///   value: 0.5,
///   min: 0,
///   max: 1,
///   onChanged: (value) {},
/// )
/// ```
/// 
/// Uso RangeSlider:
/// ```dart
/// RangeSlider(
///   values: RangeValues(0.2, 0.8),
///   min: 0,
///   max: 1,
///   onChanged: (RangeValues values) {},
/// )
/// ```
