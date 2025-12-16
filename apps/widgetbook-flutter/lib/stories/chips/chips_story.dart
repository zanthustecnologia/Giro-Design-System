import 'package:flutter_giro/flutter_giro.dart';
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
      WidgetbookUseCase(
        name: 'Chip',
        builder: (context) {
          final label = context.knobs.string(label: 'Label', initialValue: 'Chip');
          
          return Center(
            child: Chip(
              label: Text(label),
              onDeleted: () {},
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'InputChip',
        builder: (context) {
          return const Center(
            child: InputChip(
              label: Text('Input'),
              avatar: Icon(Icons.person, size: 18),
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
              avatar: const Icon(Icons.add, size: 18),
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
    ],
  );
}
