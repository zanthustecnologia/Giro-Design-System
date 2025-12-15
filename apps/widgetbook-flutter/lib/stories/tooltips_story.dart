import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent tooltipsStory() {
  return WidgetbookComponent(
    name: 'Tooltips',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          final message = context.knobs.string(
            label: 'Message',
            initialValue: 'This is a tooltip',
          );
          
          return Center(
            child: Tooltip(
              message: message,
              child: IconButton(
                icon: const Icon(Icons.info),
                onPressed: () {},
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Rich Message',
        builder: (context) {
          return Center(
            child: Tooltip(
              richMessage: const TextSpan(
                children: [
                  TextSpan(
                    text: 'Bold text\n',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  TextSpan(text: 'Regular text'),
                ],
              ),
              child: IconButton(
                icon: const Icon(Icons.help),
                onPressed: () {},
              ),
            ),
          );
        },
      ),
    ],
  );
}
