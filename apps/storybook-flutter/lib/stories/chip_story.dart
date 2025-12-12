import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

class ChipStoryState extends StatefulWidget {
  const ChipStoryState({super.key});

  @override
  State<ChipStoryState> createState() => _ChipStoryStateState();
}

class _ChipStoryStateState extends State<ChipStoryState> {
  bool selected = false;

  @override
  Widget build(BuildContext context) {
    final label = context.knobs.string(
      label: 'Label',
      initialValue: 'Chip',
    );

    return Center(
      child: ZanthusChip(
        label: label,
        selected: selected,
        onTap: () {
          setState(() {
            selected = !selected;
          });
        },
      ),
    );
  }
}

Widget chipStory(BuildContext context) {
  return const ChipStoryState();
}
