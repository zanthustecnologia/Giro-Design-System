import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

class CheckboxStoryState extends StatefulWidget {
  const CheckboxStoryState({super.key});

  @override
  State<CheckboxStoryState> createState() => _CheckboxStoryStateState();
}

class _CheckboxStoryStateState extends State<CheckboxStoryState> {
  bool value = false;

  @override
  Widget build(BuildContext context) {
    final label = context.knobs.string(
      label: 'Label',
      initialValue: 'Accept terms',
    );

    final disabled = context.knobs.boolean(
      label: 'Disabled',
      initialValue: false,
    );

    return Center(
      child: ZanthusCheckbox(
        value: value,
        label: label,
        disabled: disabled,
        onChanged: (newValue) {
          setState(() {
            value = newValue ?? false;
          });
        },
      ),
    );
  }
}

Widget checkboxStory(BuildContext context) {
  return const CheckboxStoryState();
}
