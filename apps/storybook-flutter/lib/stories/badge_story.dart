import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget badgeStory(BuildContext context) {
  final variant = context.knobs.list(
    label: 'Variant',
    options: ZanthusBadgeVariant.values,
    labelBuilder: (value) => value.name,
  );

  final text = context.knobs.string(
    label: 'Text',
    initialValue: 'Badge',
  );

  return Center(
    child: ZanthusBadge(
      text: text,
      variant: variant,
    ),
  );
}
