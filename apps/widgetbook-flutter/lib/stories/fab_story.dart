import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent fabStory() {
  return WidgetbookComponent(
    name: 'FAB',
    useCases: [
      WidgetbookUseCase(
        name: 'Regular',
        builder: (context) {
          return Center(
            child: FloatingActionButton(
              onPressed: () {},
              child: const Icon(Icons.add),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Small',
        builder: (context) {
          return Center(
            child: FloatingActionButton.small(
              onPressed: () {},
              child: const Icon(Icons.add),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Large',
        builder: (context) {
          return Center(
            child: FloatingActionButton.large(
              onPressed: () {},
              child: const Icon(Icons.add),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Extended',
        builder: (context) {
          final text = context.knobs.string(label: 'Label', initialValue: 'Create');
          
          return Center(
            child: FloatingActionButton.extended(
              onPressed: () {},
              icon: const Icon(Icons.add),
              label: Text(text),
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
              alignment: WrapAlignment.center,
              children: [
                FloatingActionButton.small(onPressed: () {}, child: const Icon(Icons.add)),
                FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
                FloatingActionButton.large(onPressed: () {}, child: const Icon(Icons.add)),
                FloatingActionButton.extended(
                  onPressed: () {},
                  icon: const Icon(Icons.add),
                  label: const Text('Extended'),
                ),
              ],
            ),
          );
        },
      ),
    ],
  );
}
