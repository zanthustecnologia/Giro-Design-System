import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent datePickerStory() {
  return WidgetbookComponent(
    name: 'Date Picker',
    useCases: [
      WidgetbookUseCase(
        name: 'Date Picker',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now(),
                  firstDate: DateTime(2020),
                  lastDate: DateTime(2030),
                );
                if (date != null && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Selected: ${date.toString().split(' ')[0]}')),
                  );
                }
              },
              child: const Text('Select Date'),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Date Range Picker',
        builder: (context) {
          return Center(
            child: ElevatedButton(
              onPressed: () async {
                final range = await showDateRangePicker(
                  context: context,
                  firstDate: DateTime(2020),
                  lastDate: DateTime(2030),
                );
                if (range != null && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'Range: ${range.start.toString().split(' ')[0]} - ${range.end.toString().split(' ')[0]}',
                      ),
                    ),
                  );
                }
              },
              child: const Text('Select Date Range'),
            ),
          );
        },
      ),
    ],
  );
}
