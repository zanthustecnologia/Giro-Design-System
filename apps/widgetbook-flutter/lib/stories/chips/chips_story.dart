import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:widgetbook/widgetbook.dart';

class _FilterChipState extends StatefulWidget {
  const _FilterChipState();

  @override
  State<_FilterChipState> createState() => _FilterChipStateState();
}

class _FilterChipStateState extends State<_FilterChipState> {
  bool _selected = false;

  @override
  Widget build(BuildContext context) {
    return FilterChip(
      label: const Text('Filter'),
      selected: _selected,
      onSelected: (value) => setState(() => _selected = value),
    );
  }
}

class _ChoiceChipState extends StatefulWidget {
  const _ChoiceChipState();

  @override
  State<_ChoiceChipState> createState() => _ChoiceChipStateState();
}

class _ChoiceChipStateState extends State<_ChoiceChipState> {
  int _selected = 0;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      children: List.generate(3, (index) {
        return ChoiceChip(
          label: Text('Choice ${index + 1}'),
          selected: _selected == index,
          onSelected: (value) => setState(() => _selected = index),
        );
      }),
    );
  }
}

WidgetbookComponent chipsStory() {
  return WidgetbookComponent(
    name: 'Chips',
    useCases: [
      // Giro Design System stories
      WidgetbookUseCase(
        name: 'Default',
        builder: (context) {
          final label = context.knobs.string(label: 'Label', initialValue: 'Etiqueta');
          final variant = context.knobs.list<String>(
            label: 'Variant',
            options: ['neutral', 'brand', 'success', 'alert'],
            initialOption: 'neutral',
          );
          final disabled = context.knobs.boolean(label: 'Disabled', initialValue: false);
          final showLeftIcon = context.knobs.boolean(label: 'Left Icon', initialValue: false);
          final showRightIcon = context.knobs.boolean(label: 'Right Icon', initialValue: false);

          final bg = switch (variant) {
            'brand'   => GiroTokens.colorBrandPrimaryLight,
            'success' => GiroTokens.colorFeedbackSuccessLight,
            'alert'   => GiroTokens.colorFeedbackAlertLight,
            _         => GiroChipTokens.backgroundColor,
          };

          final fg = disabled
              ? GiroChipTokens.disabledLabelColor
              : GiroChipTokens.labelColor;

          final effectiveBg = disabled ? GiroChipTokens.disabledColor : bg;

          return Center(
            child: Chip(
              label: Text(label, style: TextStyle(color: fg)),
              backgroundColor: effectiveBg,
              avatar: showLeftIcon
                  ? Icon(FluentIcons.tag_16_regular, size: GiroChipTokens.iconSize, color: fg)
                  : null,
              deleteIcon: showRightIcon
                  ? Icon(FluentIcons.dismiss_16_regular, size: GiroChipTokens.iconSize, color: fg)
                  : null,
              onDeleted: showRightIcon ? () {} : null,
            ),
          );
        },
      ),

      WidgetbookUseCase(
        name: 'Chip',
        builder: (context) {
          final label = context.knobs.string(label: 'Label', initialValue: 'Chip');
          
          return Center(
            child: Chip(
              label: Text(label),
              deleteIcon: const Icon(FluentIcons.dismiss_16_regular),
              onDeleted: () {},
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'InputChip',
        builder: (context) {
          return Center(
            child: InputChip(
              label: const Text('Input'),
              avatar: const Icon(FluentIcons.person_16_regular),
              deleteIcon: const Icon(FluentIcons.dismiss_16_regular),
              onDeleted: () {},
              onPressed: () {},
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'ChoiceChip',
        builder: (context) {
          return const Center(
            child: _ChoiceChipState(),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'FilterChip',
        builder: (context) {
          return const Center(
            child: _FilterChipState(),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'ActionChip',
        builder: (context) {
          return Center(
            child: ActionChip(
              label: const Text('Action'),
              onPressed: () {},
              avatar: const Icon(FluentIcons.add_16_regular),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'All Variants',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                const Chip(label: Text('Chip')),
                InputChip(label: const Text('Input'), onPressed: () {}),
                FilterChip(label: const Text('Filter'), onSelected: (v) {}),
                ChoiceChip(label: const Text('Choice'), selected: true, onSelected: (v) {}),
                ActionChip(label: const Text('Action'), onPressed: () {}),
              ],
            ),
          );
        },
      ),

      // Native Material chips
      WidgetbookUseCase(
        name: 'Todas as variantes',
        builder: (context) {
          Widget chip(String label, Color bg) => Chip(
                label: Text(label),
                backgroundColor: bg,
              );

          return Center(
            child: Wrap(
              spacing: 8,
              runSpacing: 12,
              alignment: WrapAlignment.center,
              children: [
                chip('Neutral', GiroChipTokens.backgroundColor),
                chip('Brand', GiroTokens.colorBrandPrimaryLight),
                chip('Success', GiroTokens.colorFeedbackSuccessLight),
                chip('Alert', GiroTokens.colorFeedbackAlertLight),
                chip('Disabled', GiroChipTokens.disabledColor),
              ],
            ),
          );
        },
      ),

      WidgetbookUseCase(
        name: 'Com ícones',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 8,
              runSpacing: 12,
              alignment: WrapAlignment.center,
              children: [
                const Chip(
                  avatar: Icon(FluentIcons.person_16_regular),
                  label: Text('Com avatar'),
                ),
                Chip(
                  label: const Text('Com delete'),
                  deleteIcon: const Icon(FluentIcons.dismiss_16_regular),
                  onDeleted: () {},
                ),
                Chip(
                  avatar: const Icon(FluentIcons.tag_16_regular),
                  label: const Text('Avatar + delete'),
                  deleteIcon: const Icon(FluentIcons.dismiss_16_regular),
                  onDeleted: () {},
                ),
              ],
            ),
          );
        },
      ),
    ],
  );
}
