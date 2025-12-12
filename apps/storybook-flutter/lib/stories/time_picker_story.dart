import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent timePickerStory() {
  return WidgetbookComponent(
    name: 'Time Picker',
    useCases: [
      WidgetbookUseCase(
        name: 'Time Picker',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () async {
                final time = await showTimePicker(
                  context: context,
                  initialTime: TimeOfDay.now(),
                );
                if (time != null && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Selected: ${time.format(context)}')),
                  );
                }
              },
              child: const Text('Select Time'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: '24-Hour Format',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () async {
                final time = await showTimePicker(
                  context: context,
                  initialTime: TimeOfDay.now(),
                  builder: (context, child) {
                    return MediaQuery(
                      data: MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true),
                      child: child!,
                    );
                  },
                );
                if (time != null && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Selected: ${time.hour}:${time.minute}')),
                  );
                }
              },
              child: const Text('Select Time (24h)'),
            ),
          );
        },
      ),
    ],
  );
}
