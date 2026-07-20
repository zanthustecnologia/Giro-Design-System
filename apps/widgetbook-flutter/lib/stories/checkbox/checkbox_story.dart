import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

Widget _wrap(Widget child) {
  return Center(
    child: Padding(
      padding: const EdgeInsets.all(32.0),
      child: child,
    ),
  );
}

class _CheckboxStateful extends StatefulWidget {
  const _CheckboxStateful({
    required this.initialValue,
    this.tristate = false,
    this.disabled = false,
  });

  final bool initialValue;
  final bool tristate;
  final bool disabled;

  @override
  State<_CheckboxStateful> createState() => _CheckboxStatefulState();
}

class _CheckboxStatefulState extends State<_CheckboxStateful> {
  late bool? _value;

  @override
  void initState() {
    super.initState();
    _value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Checkbox(
      tristate: widget.tristate,
      value: _value,
      onChanged: widget.disabled
          ? null
          : (v) => setState(() => _value = v),
    );
  }
}

WidgetbookComponent checkboxStory() {
  return WidgetbookComponent(
    name: 'Checkbox',
    useCases: [
      WidgetbookUseCase(
        name: 'Default',
        builder: (context) {
          final checked = context.knobs.boolean(
            label: 'Checked',
            initialValue: false,
          );
          final disabled = context.knobs.boolean(
            label: 'Disabled',
            initialValue: false,
          );
          return _wrap(
            _CheckboxStateful(
              initialValue: checked,
              disabled: disabled,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Indeterminado',
        builder: (context) => _wrap(
          const _CheckboxStateful(
            initialValue: false,
            tristate: true,
          ),
        ),
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          const Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _CheckboxStateful(
                initialValue: false,
                disabled: true,
              ),
              SizedBox(height: 16),
              _CheckboxStateful(
                initialValue: true,
                disabled: true,
              ),
            ],
          ),
        ),
      ),
    ],
  );
}
