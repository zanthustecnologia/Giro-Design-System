import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent textFieldStory() {
  return WidgetbookComponent(
    name: 'TextField',
    useCases: [
      WidgetbookUseCase(
        name: 'GiroTextField Playground',
        builder: (context) {
          final label = context.knobs.string(
            label: 'Label',
            initialValue: 'Label do Campo',
          );
          final hintText = context.knobs.string(
            label: 'Placeholder',
            initialValue: 'Digite algo...',
          );
          final errorText = context.knobs.stringOrNull(
            label: 'Error Text',
            initialValue: null,
          );
          final helperText = context.knobs.stringOrNull(
            label: 'Helper Text',
            initialValue: 'Texto de ajuda opcional',
          );
          final required = context.knobs.boolean(
            label: 'Required',
            initialValue: false,
          );
          final enabled = context.knobs.boolean(
            label: 'Enabled',
            initialValue: true,
          );
          final showPrefixIcon = context.knobs.boolean(
            label: 'Show Prefix Icon',
            initialValue: false,
          );
          final showSuffixIcon = context.knobs.boolean(
            label: 'Show Suffix Icon',
            initialValue: false,
          );

          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: GiroTextField(
                label: label,
                hintText: hintText,
                errorText: errorText,
                helperText: helperText,
                required: required,
                enabled: enabled,
                prefixIcon: showPrefixIcon 
                    ? const Icon(FluentIcons.search_20_regular) 
                    : null,
                suffixIcon: showSuffixIcon 
                    ? const Icon(FluentIcons.dismiss_20_regular) 
                    : null,
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Native TextField (Theme Check)',
        builder: (context) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const TextField(
                    decoration: InputDecoration(
                      hintText: 'Native TextField (Hint Only)',
                    ),
                  ),
                  const SizedBox(height: 16),
                  const TextField(
                    decoration: InputDecoration(
                      labelText: 'Native Label (Inside)',
                      hintText: 'With Label',
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Error State',
                      errorText: 'Erro nativo',
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    ],
  );
}
