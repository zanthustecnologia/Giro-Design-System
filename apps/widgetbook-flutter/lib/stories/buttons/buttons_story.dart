import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter_giro/types/giro_types.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent buttonsStory() {
  return WidgetbookComponent(
    name: 'Buttons',
    useCases: [
      WidgetbookUseCase(
        name: 'Button',
        builder: (context) {
          final text =
              context.knobs.string(label: 'Text', initialValue: 'Button');

          final variant = context.knobs.list<GiroButtonVariant>(
            label: 'Variant',
            options: GiroButtonVariant.values,
            initialOption: GiroButtonVariant.filled,
            labelBuilder: (value) =>
                value.name, // Retorna apenas 'filled' | 'outlined' | 'text'
          );

          final size = context.knobs.list<GiroSize>(
            label: 'Size',
            options: [GiroSize.lg, GiroSize.sm],
            initialOption: GiroSize.lg,
            labelBuilder: (value) => value.name, // Retorna apenas 'lg' ou 'sm'
          );

          final fullWidth =
              context.knobs.boolean(label: 'Full Width', initialValue: false);
          final disabled =
              context.knobs.boolean(label: 'Disabled', initialValue: false);

          final iconPosition = context.knobs.list<GiroPosition>(
            label: 'Icon Position',
            options: [GiroPosition.none, GiroPosition.left, GiroPosition.right],
            initialOption: GiroPosition.none,
            labelBuilder: (value) =>
                value.name, // Retorna apenas 'none', 'left' ou 'right'
          );

          final iconOnly =
              context.knobs.boolean(label: 'Icon Only', initialValue: false);

          Icon? icon;
          if (iconPosition != GiroPosition.none || iconOnly) {
            icon = const Icon(FluentIcons.add_16_regular);
          }

          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: GiroButton(
                variant: variant,
                size: size,
                fullWidth: fullWidth,
                iconPosition: iconPosition,
                iconOnly: iconOnly,
                icon: icon,
                onPressed: () {},
                disable: disabled,
                text: text,
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
