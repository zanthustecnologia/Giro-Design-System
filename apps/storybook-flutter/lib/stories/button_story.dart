import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget buttonStory(BuildContext context) {
  final variant = context.knobs.list(
    label: 'Variant',
    options: ZanthusButtonVariant.values,
    labelBuilder: (value) => value.name,
  );

  final size = context.knobs.list(
    label: 'Size',
    options: ZanthusButtonSize.values,
    labelBuilder: (value) => value.name,
  );

  final text = context.knobs.string(
    label: 'Text',
    initialValue: 'Click me',
  );

  final fullWidth = context.knobs.boolean(
    label: 'Full Width',
    initialValue: false,
  );

  final disabled = context.knobs.boolean(
    label: 'Disabled',
    initialValue: false,
  );

  final loading = context.knobs.boolean(
    label: 'Loading',
    initialValue: false,
  );

  return Center(
    child: ZanthusButton(
      text: text,
      variant: variant,
      size: size,
      fullWidth: fullWidth,
      disabled: disabled,
      loading: loading,
      onPressed: () {},
    ),
  );
}
