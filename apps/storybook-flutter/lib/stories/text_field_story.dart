import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent textFieldStory() {
  return WidgetbookComponent(
    name: 'TextField',
    useCases: [
      WidgetbookUseCase(
        name: 'Basic',
        builder: (context) {
          final label = context.knobs.string(label: 'Label', initialValue: 'Email');
          final hint = context.knobs.string(label: 'Hint', initialValue: 'Enter your email');
          
          return Center(
            child: SizedBox(
              width: 300,
              child: TextField(
                decoration: InputDecoration(
                  labelText: label,
                  hintText: hint,
                  border: const OutlineInputBorder(),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Icon',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: TextField(
                decoration: const InputDecoration(
                  labelText: 'Search',
                  prefixIcon: Icon(Icons.search),
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Password',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: TextField(
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Password',
                  prefixIcon: Icon(Icons.lock),
                  suffixIcon: Icon(Icons.visibility),
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Multiline',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: TextField(
                maxLines: 4,
                decoration: const InputDecoration(
                  labelText: 'Description',
                  hintText: 'Enter description',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Filled',
        builder: (context) {
          return Center(
            child: SizedBox(
              width: 300,
              child: TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  filled: true,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    ],
  );
}
