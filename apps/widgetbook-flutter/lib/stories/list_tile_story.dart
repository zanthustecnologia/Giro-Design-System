import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent listTileStory() {
  return WidgetbookComponent(
    name: 'ListTile',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          final title = context.knobs.string(label: 'Title', initialValue: 'Title');
          final subtitle = context.knobs.string(label: 'Subtitle', initialValue: 'Subtitle');
          
          return Center(
            child: SizedBox(
              width: 400,
              child: Card(
                child: ListTile(
                  leading: const Icon(Icons.person),
                  title: Text(title),
                  subtitle: Text(subtitle),
                  trailing: const Icon(Icons.arrow_forward),
                  onTap: () {},
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Three Line',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 400,
              child: Card(
                child: ListTile(
                  leading: const CircleAvatar(child: Icon(Icons.person)),
                  title: const Text('Title'),
                  subtitle: const Text('Subtitle line 1\nSubtitle line 2'),
                  isThreeLine: true,
                  trailing: const Icon(Icons.more_vert),
                  onTap: () {},
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'CheckboxListTile',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 400,
              child: Card(
                child: CheckboxListTile(
                  title: const Text('Enable notifications'),
                  subtitle: const Text('Receive alerts'),
                  value: true,
                  onChanged: (value) {},
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'SwitchListTile',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 400,
              child: Card(
                child: SwitchListTile(
                  title: const Text('Dark Mode'),
                  subtitle: const Text('Use dark theme'),
                  value: false,
                  onChanged: (value) {},
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'List Example',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 400,
              child: Card(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: List.generate(5, (index) {
                    return ListTile(
                      leading: CircleAvatar(child: Text('${index + 1}')),
                      title: Text('Item ${index + 1}'),
                      subtitle: Text('Description ${index + 1}'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {},
                    );
                  }),
                ),
              ),
            ),
          );
        },
      ),
    ],
  );
}
