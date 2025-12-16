import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent bottomSheetStory() {
  return WidgetbookComponent(
    name: 'Bottom Sheet',
    useCases: [
      WidgetbookUseCase(
        name: 'Modal',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                showModalBottomSheet<void>(
                  context: context,
                  builder: (context) {
                    return Container(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          ListTile(
                            leading: const Icon(Icons.share),
                            title: const Text('Share'),
                            onTap: () => Navigator.pop(context),
                          ),
                          ListTile(
                            leading: const Icon(Icons.link),
                            title: const Text('Copy link'),
                            onTap: () => Navigator.pop(context),
                          ),
                          ListTile(
                            leading: const Icon(Icons.edit),
                            title: const Text('Edit'),
                            onTap: () => Navigator.pop(context),
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
              child: const Text('Show Bottom Sheet'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Handle',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () {
                showModalBottomSheet<void>(
                  context: context,
                  showDragHandle: true,
                  builder: (context) {
                    return Container(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text('Drag handle bottom sheet'),
                          const SizedBox(height: 16),
                          FilledButton(
                            onPressed: () => Navigator.pop(context),
                            child: const Text('Close'),
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
              child: const Text('Show Bottom Sheet with Handle'),
            ),
          );
        },
      ),
    ],
  );
}
