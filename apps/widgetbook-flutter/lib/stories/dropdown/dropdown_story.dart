import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent dropdownStory() {
  return WidgetbookComponent(
    name: 'Dropdown',
    useCases: [
      WidgetbookUseCase(
        name: 'DropdownMenu',
        builder: (context) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: DropdownMenu<String>(
                width: 320,
                hintText: 'Selecione uma opção',
                trailingIcon: const Icon(FluentIcons.chevron_down_16_regular, size: 16),
                selectedTrailingIcon: const Icon(FluentIcons.chevron_up_16_regular, size: 16),
                dropdownMenuEntries: const [
                  DropdownMenuEntry(value: 'one', label: 'Option One'),
                  DropdownMenuEntry(value: 'two', label: 'Option Two'),
                  DropdownMenuEntry(value: 'three', label: 'Option Three'),
                ],
                onSelected: (value) {},
              ),
            ),
          );
        },
      ),
    ],
  );
}
