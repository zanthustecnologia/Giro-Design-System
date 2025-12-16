import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent dividersStory() {
  return WidgetbookComponent(
    name: 'Dividers',
    useCases: [
      WidgetbookUseCase(
        name: 'Horizontal',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const ListTile(title: Text('Item 1')),
                  const Divider(),
                  const ListTile(title: Text('Item 2')),
                  const Divider(),
                  const ListTile(title: Text('Item 3')),
                ],
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Vertical',
        builder: (context) {
          return Center(
            child: SizedBox(
              height: 100,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(icon: const Icon(Icons.home), onPressed: () {}),
                  const VerticalDivider(),
                  IconButton(icon: const Icon(Icons.search), onPressed: () {}),
                  const VerticalDivider(),
                  IconButton(icon: const Icon(Icons.person), onPressed: () {}),
                ],
              ),
            ),
          );
        },
      ),
    ],
  );
}
