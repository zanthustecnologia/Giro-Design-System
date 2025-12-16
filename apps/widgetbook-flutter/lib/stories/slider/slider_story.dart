import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

class _SliderState extends StatefulWidget {
  const _SliderState();

  @override
  State<_SliderState> createState() => _SliderStateState();
}

class _SliderStateState extends State<_SliderState> {
  double _value = 50;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Value: ${_value.round()}'),
        const SizedBox(height: 16),
        Slider(
          value: _value,
          min: 0,
          max: 100,
          divisions: 10,
          label: _value.round().toString(),
          onChanged: (value) => setState(() => _value = value),
        ),
      ],
    );
  }
}

class _RangeSliderState extends StatefulWidget {
  const _RangeSliderState();

  @override
  State<_RangeSliderState> createState() => _RangeSliderStateState();
}

class _RangeSliderStateState extends State<_RangeSliderState> {
  RangeValues _values = const RangeValues(20, 80);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Range: ${_values.start.round()} - ${_values.end.round()}'),
        const SizedBox(height: 16),
        RangeSlider(
          values: _values,
          min: 0,
          max: 100,
          divisions: 10,
          labels: RangeLabels(
            _values.start.round().toString(),
            _values.end.round().toString(),
          ),
          onChanged: (values) => setState(() => _values = values),
        ),
      ],
    );
  }
}

WidgetbookComponent sliderStory() {
  return WidgetbookComponent(
    name: 'Sliders',
    useCases: [
      WidgetbookUseCase(
        name: 'Slider',
        builder: (context) {
          return const Center(
            child: SizedBox(
              width: 300,
              child: _SliderState(),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'RangeSlider',
        builder: (context) {
          return const Center(
            child: SizedBox(
              width: 300,
              child: _RangeSliderState(),
            ),
          );
        },
      ),
    ],
  );
}
