import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent dialogsStory() {
  return WidgetbookComponent(
    name: 'Dialogs',
    useCases: [
      WidgetbookUseCase(
        name: 'AlertDialog',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                showDialog<void>(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Alert Dialog'),
                    content: const Text('This is an alert dialog with some content.'),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Cancel'),
                      ),
                      FilledButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('OK'),
                      ),
                    ],
                  ),
                );
              },
              child: const Text('Show Alert Dialog'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'SimpleDialog',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                showDialog<void>(
                  context: context,
                  builder: (context) => SimpleDialog(
                    title: const Text('Select Option'),
                    children: [
                      SimpleDialogOption(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Option 1'),
                      ),
                      SimpleDialogOption(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Option 2'),
                      ),
                      SimpleDialogOption(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Option 3'),
                      ),
                    ],
                  ),
                );
              },
              child: const Text('Show Simple Dialog'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'AlertDialog with Icon',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                showDialog<void>(
                  context: context,
                  builder: (context) => AlertDialog(
                    icon: const Icon(Icons.warning_amber_rounded, size: 48),
                    title: const Text('Delete Item?'),
                    content: const Text('This action cannot be undone.'),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Cancel'),
                      ),
                      FilledButton(
                        onPressed: () => Navigator.pop(context),
                        style: FilledButton.styleFrom(
                          backgroundColor: Colors.red,
                        ),
                        child: const Text('Delete'),
                      ),
                    ],
                  ),
                );
              },
              child: const Text('Show Delete Dialog'),
            ),
          );
        },
      ),
    ],
  );
}
