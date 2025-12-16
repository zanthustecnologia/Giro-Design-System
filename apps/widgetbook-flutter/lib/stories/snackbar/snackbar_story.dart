import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent snackbarStory() {
  return WidgetbookComponent(
    name: 'SnackBar',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('This is a snackbar'),
                  ),
                );
              },
              child: const Text('Show SnackBar'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Action',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: const Text('Message sent'),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {},
                    ),
                  ),
                );
              },
              child: const Text('Show SnackBar with Action'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Floating',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: const Text('Floating snackbar'),
                    behavior: SnackBarBehavior.floating,
                    action: SnackBarAction(
                      label: 'OK',
                      onPressed: () {},
                    ),
                  ),
                );
              },
              child: const Text('Show Floating SnackBar'),
            ),
          );
        },
      ),
    ],
  );
}
