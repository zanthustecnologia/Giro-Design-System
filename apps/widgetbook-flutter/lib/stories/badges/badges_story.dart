import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent badgesStory() {
  return WidgetbookComponent(
    name: 'Badges',
    useCases: [
      WidgetbookUseCase(
        name: 'With Label',
        builder: (context) {
          final label = context.knobs.string(label: 'Label', initialValue: '3');
          
          return Center(
            child: Badge(
              label: Text(label),
              child: const Icon(Icons.notifications, size: 32),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Dot Badge',
        builder: (context) {
          return const Center(
            child: Badge(
              child: Icon(Icons.notifications, size: 32),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'On IconButton',
        builder: (context) {
          return Center(
            child: Badge(
              label: const Text('99+'),
              child: IconButton(
                icon: const Icon(Icons.mail),
                onPressed: () {},
              ),
            ),
          );
        },
      ),
    ],
  );
}
