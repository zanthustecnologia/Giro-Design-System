import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent buttonsStory() {
  return WidgetbookComponent(
    name: 'Buttons',
    useCases: [
      WidgetbookUseCase(
        name: 'ElevatedButton',
        builder: (context) {
          final text = context.knobs.string(label: 'Text', initialValue: 'Elevated');
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: ElevatedButton(
              onPressed: disabled ? null : () {},
              child: Text(text),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'FilledButton (M3)',
        builder: (context) {
          final text = context.knobs.string(label: 'Text', initialValue: 'Filled');
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: FilledButton(
              onPressed: disabled ? null : () {},
              child: Text(text),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'OutlinedButton',
        builder: (context) {
          final text = context.knobs.string(label: 'Text', initialValue: 'Outlined');
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: OutlinedButton(
              onPressed: disabled ? null : () {},
              child: Text(text),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'TextButton',
        builder: (context) {
          final text = context.knobs.string(label: 'Text', initialValue: 'Text Button');
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: TextButton(
              onPressed: disabled ? null : () {},
              child: Text(text),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'All Variants',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 16,
              runSpacing: 16,
              children: [
                ElevatedButton(onPressed: () {}, child: const Text('Elevated')),
                FilledButton(onPressed: () {}, child: const Text('Filled')),
                FilledButton.tonal(onPressed: () {}, child: const Text('Tonal')),
                OutlinedButton(onPressed: () {}, child: const Text('Outlined')),
                TextButton(onPressed: () {}, child: const Text('Text')),
              ],
            ),
          );
        },
      ),
    ],
  );
}
