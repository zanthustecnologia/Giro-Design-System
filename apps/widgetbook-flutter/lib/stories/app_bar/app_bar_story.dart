import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent appBarStory() {
  return WidgetbookComponent(
    name: 'AppBar',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('App Bar'),
            ),
            body: const Center(
              child: Text('Content'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Actions',
        builder: (context) {
          return Scaffold(
            appBar: AppBar(
              leading: IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () {},
              ),
              title: const Text('App Bar'),
              actions: [
                IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.more_vert),
                  onPressed: () {},
                ),
              ],
            ),
            body: const Center(
              child: Text('Content'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Centered Title',
        builder: (context) {
          return Scaffold(
            appBar: AppBar(
              centerTitle: true,
              title: const Text('Centered Title'),
              leading: IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () {},
              ),
            ),
            body: const Center(
              child: Text('Content'),
            ),
          );
        },
      ),
    ],
  );
}
