import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

class _BottomAppBarState extends StatelessWidget {
  const _BottomAppBarState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BottomAppBar'),
      ),
      body: const Center(
        child: Text('Content'),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          children: [
            IconButton(icon: const Icon(Icons.menu), onPressed: () {}),
            IconButton(icon: const Icon(Icons.search), onPressed: () {}),
            const Spacer(),
            IconButton(icon: const Icon(Icons.favorite), onPressed: () {}),
            IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
    );
  }
}

class _BottomAppBarCenterState extends StatelessWidget {
  const _BottomAppBarCenterState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BottomAppBar Centered'),
      ),
      body: const Center(
        child: Text('Content'),
      ),
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(icon: const Icon(Icons.home), onPressed: () {}),
            IconButton(icon: const Icon(Icons.search), onPressed: () {}),
            const SizedBox(width: 48), // Space for FAB
            IconButton(icon: const Icon(Icons.favorite), onPressed: () {}),
            IconButton(icon: const Icon(Icons.person), onPressed: () {}),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}

WidgetbookComponent bottomAppBarStory() {
  return WidgetbookComponent(
    name: 'BottomAppBar',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) => const _BottomAppBarState(),
      ),
      WidgetbookUseCase(
        name: 'Centered with Notch',
        builder: (context) => const _BottomAppBarCenterState(),
      ),
    ],
  );
}
