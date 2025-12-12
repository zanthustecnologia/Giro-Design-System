import 'package:flutter/material.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

class RadioStoryState extends StatefulWidget {
  const RadioStoryState({super.key});

  @override
  State<RadioStoryState> createState() => _RadioStoryStateState();
}

class _RadioStoryStateState extends State<RadioStoryState> {
  String? selectedValue = 'option1';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ZanthusRadio<String>(
            value: 'option1',
            groupValue: selectedValue,
            label: 'Option 1',
            onChanged: (value) {
              setState(() {
                selectedValue = value;
              });
            },
          ),
          ZanthusRadio<String>(
            value: 'option2',
            groupValue: selectedValue,
            label: 'Option 2',
            onChanged: (value) {
              setState(() {
                selectedValue = value;
              });
            },
          ),
          ZanthusRadio<String>(
            value: 'option3',
            groupValue: selectedValue,
            label: 'Option 3',
            onChanged: (value) {
              setState(() {
                selectedValue = value;
              });
            },
          ),
        ],
      ),
    );
  }
}

Widget radioStory(BuildContext context) {
  return const RadioStoryState();
}
