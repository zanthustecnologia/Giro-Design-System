import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent progressStory() {
  return WidgetbookComponent(
    name: 'Progress Indicators',
    useCases: [
      WidgetbookUseCase(
        name: 'Circular',
        builder: (context) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Circular Determinate',
        builder: (context) {
          final value = context.knobs.double.slider(
            label: 'Progress',
            initialValue: 0.7,
            min: 0,
            max: 1,
          );
          
          return Center(
            child: CircularProgressIndicator(value: value),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Linear',
        builder: (context) {
          return const Center(
            child: SizedBox(
              width: 300,
              child: LinearProgressIndicator(),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Linear Determinate',
        builder: (context) {
          final value = context.knobs.double.slider(
            label: 'Progress',
            initialValue: 0.7,
            min: 0,
            max: 1,
          );
          
          return Center(
            child: SizedBox(
              width: 300,
              child: LinearProgressIndicator(value: value),
            ),
          );
        },
      ),
    ],
  );
}
