import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent dropdownStory() {
  return WidgetbookComponent(
    name: 'Dropdown',
    useCases: [
      WidgetbookUseCase(
        name: 'DropdownButton',
        builder: (context) {
          return Center(
            child: DropdownButton<String>(
              value: 'one',
              items: const [
                DropdownMenuItem(value: 'one', child: Text('Option One')),
                DropdownMenuItem(value: 'two', child: Text('Option Two')),
                DropdownMenuItem(value: 'three', child: Text('Option Three')),
              ],
              onChanged: (value) {},
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'DropdownButtonFormField',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Select Option',
                  border: OutlineInputBorder(),
                ),
                value: 'one',
                items: const [
                  DropdownMenuItem(value: 'one', child: Text('Option One')),
                  DropdownMenuItem(value: 'two', child: Text('Option Two')),
                  DropdownMenuItem(value: 'three', child: Text('Option Three')),
                ],
                onChanged: (value) {},
              ),
            ),
          );
        },
      ),
    ],
  );
}
