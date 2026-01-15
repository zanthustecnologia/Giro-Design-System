export 'package:flutter/material.dart' show Stepper, Step;

/// Material 3 Stepper
/// Re-export do componente nativo do Flutter
/// 
/// Uso:
/// ```dart
/// Stepper(
///   currentStep: 0,
///   onStepTapped: (index) {},
///   steps: [
///     Step(
///       title: Text('Step 1'),
///       content: Text('Content'),
///       isActive: true,
///     ),
///     Step(
///       title: Text('Step 2'),
///       content: Text('Content'),
///     ),
///   ],
/// )
/// ```
