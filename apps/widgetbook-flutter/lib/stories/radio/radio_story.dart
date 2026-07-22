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

class _RadioGroupStateful extends StatefulWidget {
  const _RadioGroupStateful({
    required this.count,
    this.disabled = false,
    this.initialSelected,
  });

  final int count;
  final bool disabled;
  final int? initialSelected;

  @override
  State<_RadioGroupStateful> createState() => _RadioGroupStatefulState();
}

class _RadioGroupStatefulState extends State<_RadioGroupStateful> {
  late int? _selected;

  @override
  void initState() {
    super.initState();
    _selected = widget.initialSelected;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(widget.count, (i) {
        return Radio<int>(
          value: i,
          groupValue: _selected,
          onChanged: widget.disabled
              ? null
              : (v) => setState(() => _selected = v),
        );
      }),
    );
  }
}

WidgetbookComponent radioStory() {
  return WidgetbookComponent(
    name: 'Radio',
    useCases: [
      WidgetbookUseCase(
        name: 'Default',
        builder: (context) {
          final count = context.knobs.int.slider(
            label: 'Quantidade de opcoes',
            initialValue: 3,
            min: 2,
            max: 5,
          );
          final disabled = context.knobs.boolean(
            label: 'Disabled',
            initialValue: false,
          );
          return _wrap(
            _RadioGroupStateful(
              count: count,
              disabled: disabled,
              initialSelected: 0,
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Desabilitado',
        builder: (context) => _wrap(
          const _RadioGroupStateful(
            count: 3,
            disabled: true,
            initialSelected: 0,
          ),
        ),
      ),
    ],
  );
}
