import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent cardsStory() {
  return WidgetbookComponent(
    name: 'Cards',
    useCases: [
      WidgetbookUseCase(
        name: 'Card',
        builder: (context) {
          final title = context.knobs.string(label: 'Title', initialValue: 'Card Title');
          final subtitle = context.knobs.string(label: 'Subtitle', initialValue: 'Card subtitle');
          
          return Center(
            child: SizedBox(
              width: 300,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: 8),
                      Text(subtitle),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Card.filled',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: Card.filled(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Filled Card', style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: 8),
                      const Text('This is a filled card variant'),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Card.outlined',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: Card.outlined(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Outlined Card', style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: 8),
                      const Text('This is an outlined card variant'),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    ],
  );
}
