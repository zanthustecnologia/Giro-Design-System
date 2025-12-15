import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent popupMenuStory() {
  return WidgetbookComponent(
    name: 'PopupMenu',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          return Center(
            child: PopupMenuButton<String>(
              itemBuilder: (context) => [
                const PopupMenuItem(value: 'edit', child: Text('Edit')),
                const PopupMenuItem(value: 'delete', child: Text('Delete')),
                const PopupMenuItem(value: 'share', child: Text('Share')),
              ],
              onSelected: (value) {},
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Icons',
        builder: (context) {
          return Center(
            child: PopupMenuButton<String>(
              itemBuilder: (context) => [
                const PopupMenuItem(
                  value: 'edit',
                  child: Row(
                    children: [
                      Icon(Icons.edit),
                      SizedBox(width: 8),
                      Text('Edit'),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'delete',
                  child: Row(
                    children: [
                      Icon(Icons.delete),
                      SizedBox(width: 8),
                      Text('Delete'),
                    ],
                  ),
                ),
                const PopupMenuDivider(),
                const PopupMenuItem(
                  value: 'share',
                  child: Row(
                    children: [
                      Icon(Icons.share),
                      SizedBox(width: 8),
                      Text('Share'),
                    ],
                  ),
                ),
              ],
              onSelected: (value) {},
            ),
          );
        },
      ),
    ],
  );
}
