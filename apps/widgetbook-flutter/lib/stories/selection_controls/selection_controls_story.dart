import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

class _CheckboxState extends StatefulWidget {
  final bool initialValue;
  
  const _CheckboxState({this.initialValue = false});

  @override
  State<_CheckboxState> createState() => _CheckboxStateState();
}

class _CheckboxStateState extends State<_CheckboxState> {
  late bool _value;

  @override
  void initState() {
    super.initState();
    _value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Checkbox(
      value: _value,
      onChanged: (value) => setState(() => _value = value ?? false),
    );
  }
}

class _SwitchState extends StatefulWidget {
  final bool initialValue;
  
  const _SwitchState({this.initialValue = false});

  @override
  State<_SwitchState> createState() => _SwitchStateState();
}

class _SwitchStateState extends State<_SwitchState> {
  late bool _value;

  @override
  void initState() {
    super.initState();
    _value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Switch(
      value: _value,
      onChanged: (value) => setState(() => _value = value),
    );
  }
}

WidgetbookComponent selectionControlsStory() {
  return WidgetbookComponent(
    name: 'Selection Controls',
    useCases: [
      WidgetbookUseCase(
        name: 'Checkbox',
        builder: (context) {
          final checked = context.knobs.boolean(label: 'Checked', initialValue: true);
          
          return Center(
            child: _CheckboxState(initialValue: checked),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Switch',
        builder: (context) {
          final checked = context.knobs.boolean(label: 'Checked', initialValue: true);
          
          return Center(
            child: _SwitchState(initialValue: checked),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Radio',
        builder: (context) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Radio<int>(value: 1, groupValue: 1, onChanged: (v) {}),
                Radio<int>(value: 2, groupValue: 1, onChanged: (v) {}),
              ],
            ),
          );
        },
      ),
    ],
  );
}
