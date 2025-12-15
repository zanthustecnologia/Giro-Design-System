import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

class _NavigationBarState extends StatefulWidget {
  const _NavigationBarState();

  @override
  State<_NavigationBarState> createState() => _NavigationBarStateState();
}

class _NavigationBarStateState extends State<_NavigationBarState> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Selected: $_selectedIndex'),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) => setState(() => _selectedIndex = index),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.search_outlined),
            selectedIcon: Icon(Icons.search),
            label: 'Search',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outlined),
            selectedIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class _BottomNavigationBarState extends StatefulWidget {
  const _BottomNavigationBarState();

  @override
  State<_BottomNavigationBarState> createState() => _BottomNavigationBarStateState();
}

class _BottomNavigationBarStateState extends State<_BottomNavigationBarState> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Selected: $_selectedIndex'),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

WidgetbookComponent navigationStory() {
  return WidgetbookComponent(
    name: 'Navigation',
    useCases: [
      WidgetbookUseCase(
        name: 'NavigationBar (M3)',
        builder: (context) => const _NavigationBarState(),
      ),
      WidgetbookUseCase(
        name: 'BottomNavigationBar',
        builder: (context) => const _BottomNavigationBarState(),
      ),
    ],
  );
}
