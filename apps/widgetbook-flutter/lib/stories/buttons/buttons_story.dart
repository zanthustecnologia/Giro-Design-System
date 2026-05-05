import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent buttonsStory() {
  return WidgetbookComponent(
    name: 'Buttons',
    useCases: [
      WidgetbookUseCase(
        name: 'Button',
        builder: (context) {
          final text = context.knobs.string(label: 'Text', initialValue: 'Button');
          final variant = context.knobs.list(
            label: 'Variant',
            options: ['filled', 'outlined', 'text'],
            initialOption: 'filled',
          );
          final size = context.knobs.list(
            label: 'Size',
            options: ['lg', 'sm'],
            initialOption: 'lg',
          );
          final fullWidth = context.knobs.boolean(label: 'Full Width', initialValue: false);
          final disabled = context.knobs.boolean(label: 'Disabled', initialValue: false);
          final iconPosition = context.knobs.list(
            label: 'Icon Position',
            options: ['none', 'left', 'right'],
            initialOption: 'none',
          );
          final iconOnly = context.knobs.boolean(label: 'Icon Only', initialValue: false);

          Icon? icon;
          if (iconPosition != 'none' || iconOnly) {
            icon = const Icon(FluentIcons.add_16_regular);
          }

          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: GiroButton(
                variant: switch (variant) {
                  'outlined' => GiroButtonVariant.outlined,
                  'text'     => GiroButtonVariant.text,
                  _          => GiroButtonVariant.filled,
                },
                size: size == 'sm' ? GiroButtonSize.sm : GiroButtonSize.lg,
                iconPosition: switch (iconPosition) {
                  'right' => GiroButtonIconPosition.right,
                  'left'  => GiroButtonIconPosition.left,
                  _       => GiroButtonIconPosition.none,
                },
                fullWidth: fullWidth,
                iconOnly: iconOnly,
                icon: icon,
                onPressed: disabled ? null : () {},
                child: Text(text),
              ),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Native Buttons (Theme Check)',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 16,
              runSpacing: 16,
              children: [
                FilledButton(onPressed: () {}, child: const Text('Filled')),
                OutlinedButton(onPressed: () {}, child: const Text('Outlined')),
                TextButton(onPressed: () {}, child: const Text('Text')),
                FilledButton(onPressed: null, child: const Text('Disabled')),
              ],
            ),
          );
        },
      ),
    ],
  );
}
