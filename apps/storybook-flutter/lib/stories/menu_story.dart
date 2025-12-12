import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent menuStory() {
  return WidgetbookComponent(
    name: 'Menu',
    useCases: [
      WidgetbookUseCase(
        name: 'MenuAnchor',
        builder: (context) {
          return Center(
            child: MenuAnchor(
              builder: (context, controller, child) {
                return FilledButton(
                  onPressed: () {
                    if (controller.isOpen) {
                      controller.close();
                    } else {
                      controller.open();
                    }
                  },
                  child: const Text('Open Menu'),
                );
              },
              menuChildren: [
                MenuItemButton(
                  leadingIcon: const Icon(Icons.edit),
                  child: const Text('Edit'),
                  onPressed: () {},
                ),
                MenuItemButton(
                  leadingIcon: const Icon(Icons.copy),
                  child: const Text('Copy'),
                  onPressed: () {},
                ),
                const Divider(),
                MenuItemButton(
                  leadingIcon: const Icon(Icons.delete),
                  child: const Text('Delete'),
                  onPressed: () {},
                ),
              ],
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Submenu',
        builder: (context) {
          return Center(
            child: MenuAnchor(
              builder: (context, controller, child) {
                return FilledButton(
                  onPressed: () {
                    if (controller.isOpen) {
                      controller.close();
                    } else {
                      controller.open();
                    }
                  },
                  child: const Text('Open Menu with Submenu'),
                );
              },
              menuChildren: [
                MenuItemButton(
                  child: const Text('New'),
                  onPressed: () {},
                ),
                SubmenuButton(
                  menuChildren: [
                    MenuItemButton(
                      child: const Text('Document'),
                      onPressed: () {},
                    ),
                    MenuItemButton(
                      child: const Text('Spreadsheet'),
                      onPressed: () {},
                    ),
                    MenuItemButton(
                      child: const Text('Presentation'),
                      onPressed: () {},
                    ),
                  ],
                  child: const Text('Create'),
                ),
                const Divider(),
                MenuItemButton(
                  child: const Text('Settings'),
                  onPressed: () {},
                ),
              ],
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'MenuBar',
        builder: (context) {
          return Scaffold(
            body: Column(
              children: [
                MenuBar(
                  children: [
                    SubmenuButton(
                      menuChildren: [
                        MenuItemButton(
                          child: const Text('New'),
                          onPressed: () {},
                        ),
                        MenuItemButton(
                          child: const Text('Open'),
                          onPressed: () {},
                        ),
                        const Divider(),
                        MenuItemButton(
                          child: const Text('Exit'),
                          onPressed: () {},
                        ),
                      ],
                      child: const Text('File'),
                    ),
                    SubmenuButton(
                      menuChildren: [
                        MenuItemButton(
                          child: const Text('Undo'),
                          onPressed: () {},
                        ),
                        MenuItemButton(
                          child: const Text('Redo'),
                          onPressed: () {},
                        ),
                      ],
                      child: const Text('Edit'),
                    ),
                    SubmenuButton(
                      menuChildren: [
                        MenuItemButton(
                          child: const Text('About'),
                          onPressed: () {},
                        ),
                      ],
                      child: const Text('Help'),
                    ),
                  ],
                ),
                const Expanded(
                  child: Center(
                    child: Text('MenuBar content area'),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    ],
  );
}
