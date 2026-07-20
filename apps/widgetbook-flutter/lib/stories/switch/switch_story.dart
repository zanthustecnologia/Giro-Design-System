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

class _SwitchStateful extends StatefulWidget {
  const _SwitchStateful({
    this.initialValue = false,
    this.disabled = false,
  });

  final bool initialValue;
  final bool disabled;

  @override
  State<_SwitchStateful> createState() => _SwitchStatefulState();
}

class _SwitchStatefulState extends State<_SwitchStateful> {
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
      onChanged: widget.disabled ? null : (v) => setState(() => _value = v),
    );
  }
}

WidgetbookComponent switchStory() {
  return WidgetbookComponent(
    name: 'Switch',
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
            _SwitchStateful(
              initialValue: checked,
              disabled: disabled,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Ligado',
        builder: (context) => _wrap(
          const _SwitchStateful(initialValue: true),
        ),
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          Column(
            mainAxisSize: MainAxisSize.min,
            children: const [
              _SwitchStateful(disabled: true),
              SizedBox(height: 16),
              _SwitchStateful(initialValue: true, disabled: true),
            ],
          ),
        ),
      ),
    ],
  );
}
