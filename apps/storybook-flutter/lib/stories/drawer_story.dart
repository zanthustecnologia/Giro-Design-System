import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

class _DrawerState extends StatelessWidget {
  const _DrawerState();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Drawer'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  CircleAvatar(
                    radius: 30,
                    child: Icon(Icons.person, size: 30),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'User Name',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                  Text(
                    'user@example.com',
                    style: TextStyle(color: Colors.white70, fontSize: 14),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              onTap: () => Navigator.pop(context),
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Logout'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
      body: const Center(
        child: Text('Open drawer with menu icon'),
      ),
    );
  }
}

class _NavigationDrawerState extends StatefulWidget {
  const _NavigationDrawerState();

  @override
  State<_NavigationDrawerState> createState() => _NavigationDrawerStateState();
}

class _NavigationDrawerStateState extends State<_NavigationDrawerState> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NavigationDrawer (M3)'),
      ),
      drawer: NavigationDrawer(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() => _selectedIndex = index);
          Navigator.pop(context);
        },
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(28, 16, 16, 10),
            child: Text(
              'Header',
              style: Theme.of(context).textTheme.titleSmall,
            ),
          ),
          const NavigationDrawerDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: Text('Home'),
          ),
          const NavigationDrawerDestination(
            icon: Icon(Icons.search_outlined),
            selectedIcon: Icon(Icons.search),
            label: Text('Search'),
          ),
          const Divider(indent: 28, endIndent: 28),
          Padding(
            padding: const EdgeInsets.fromLTRB(28, 16, 16, 10),
            child: Text(
              'Settings',
              style: Theme.of(context).textTheme.titleSmall,
            ),
          ),
          const NavigationDrawerDestination(
            icon: Icon(Icons.settings_outlined),
            selectedIcon: Icon(Icons.settings),
            label: Text('Settings'),
          ),
          const NavigationDrawerDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: Text('Profile'),
          ),
        ],
      ),
      body: Center(
        child: Text('Selected: $_selectedIndex'),
      ),
    );
  }
}

WidgetbookComponent drawerStory() {
  return WidgetbookComponent(
    name: 'Drawer',
    useCases: [
      WidgetbookUseCase(
        name: 'Drawer',
        builder: (context) => const _DrawerState(),
      ),
      WidgetbookUseCase(
        name: 'NavigationDrawer (M3)',
        builder: (context) => const _NavigationDrawerState(),
      ),
    ],
  );
}
