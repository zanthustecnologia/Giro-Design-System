import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

class _TabsState extends StatefulWidget {
  const _TabsState();

  @override
  State<_TabsState> createState() => _TabsStateState();
}

class _TabsStateState extends State<_TabsState> with SingleTickerProviderStateMixin {
  late TabController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tabs'),
        bottom: TabBar(
          controller: _controller,
          tabs: const [
            Tab(icon: Icon(Icons.home), text: 'Home'),
            Tab(icon: Icon(Icons.search), text: 'Search'),
            Tab(icon: Icon(Icons.person), text: 'Profile'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _controller,
        children: const [
          Center(child: Text('Home Tab')),
          Center(child: Text('Search Tab')),
          Center(child: Text('Profile Tab')),
        ],
      ),
    );
  }
}

WidgetbookComponent tabsStory() {
  return WidgetbookComponent(
    name: 'Tabs',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic Tabs',
        builder: (context) => const _TabsState(),
      ),
    ],
  );
}
