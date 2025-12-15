import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

class _NavigationRailState extends StatefulWidget {
  const _NavigationRailState();

  @override
  State<_NavigationRailState> createState() => _NavigationRailStateState();
}

class _NavigationRailStateState extends State<_NavigationRailState> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedIndex,
            onDestinationSelected: (index) => setState(() => _selectedIndex = index),
            labelType: NavigationRailLabelType.all,
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.home_outlined),
                selectedIcon: Icon(Icons.home),
                label: Text('Home'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.search_outlined),
                selectedIcon: Icon(Icons.search),
                label: Text('Search'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.favorite_outline),
                selectedIcon: Icon(Icons.favorite),
                label: Text('Favorites'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.person_outline),
                selectedIcon: Icon(Icons.person),
                label: Text('Profile'),
              ),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: Center(
              child: Text('Selected: $_selectedIndex'),
            ),
          ),
        ],
      ),
    );
  }
}

class _NavigationRailExtendedState extends StatefulWidget {
  const _NavigationRailExtendedState();

  @override
  State<_NavigationRailExtendedState> createState() => _NavigationRailExtendedStateState();
}

class _NavigationRailExtendedStateState extends State<_NavigationRailExtendedState> {
  int _selectedIndex = 0;
  bool _extended = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedIndex,
            onDestinationSelected: (index) => setState(() => _selectedIndex = index),
            extended: _extended,
            leading: FloatingActionButton(
              onPressed: () => setState(() => _extended = !_extended),
              child: Icon(_extended ? Icons.chevron_left : Icons.menu),
            ),
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.home_outlined),
                selectedIcon: Icon(Icons.home),
                label: Text('Home'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.search_outlined),
                selectedIcon: Icon(Icons.search),
                label: Text('Search'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.favorite_outline),
                selectedIcon: Icon(Icons.favorite),
                label: Text('Favorites'),
              ),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: Center(
              child: Text('Selected: $_selectedIndex'),
            ),
          ),
        ],
      ),
    );
  }
}

WidgetbookComponent navigationRailStory() {
  return WidgetbookComponent(
    name: 'NavigationRail',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) => const _NavigationRailState(),
      ),
      WidgetbookUseCase(
        name: 'Extended',
        builder: (context) => const _NavigationRailExtendedState(),
      ),
    ],
  );
}
