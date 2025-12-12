import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

class SwitchStoryState extends StatefulWidget {
  const SwitchStoryState({super.key});

  @override
  State<SwitchStoryState> createState() => _SwitchStoryStateState();
}

class _SwitchStoryStateState extends State<SwitchStoryState> {
  bool value = false;

  @override
  Widget build(BuildContext context) {
    final label = context.knobs.string(
      label: 'Label',
      initialValue: 'Enable notifications',
    );

    final disabled = context.knobs.boolean(
      label: 'Disabled',
      initialValue: false,
    );

    return Center(
      child: ZanthusSwitch(
        value: value,
        label: label,
        disabled: disabled,
        onChanged: (newValue) {
          setState(() {
            value = newValue;
          });
        },
      ),
    );
  }
}

Widget switchStory(BuildContext context) {
  return const SwitchStoryState();
}
