import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget tooltipStory(BuildContext context) {
  final message = context.knobs.string(
    label: 'Message',
    initialValue: 'This is a tooltip',
  );

  return Center(
    child: ZanthusTooltip(
      message: message,
      child: const ZanthusButton(
        text: 'Hover me',
      ),
    ),
  );
}
