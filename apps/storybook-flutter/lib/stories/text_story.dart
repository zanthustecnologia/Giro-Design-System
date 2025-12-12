import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget textStory(BuildContext context) {
  final text = context.knobs.string(
    label: 'Text',
    initialValue: 'Sample Text',
  );

  return Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ZanthusText.h1(text),
        const SizedBox(height: ZanthusSpacing.sm),
        ZanthusText.h2(text),
        const SizedBox(height: ZanthusSpacing.sm),
        ZanthusText.h3(text),
        const SizedBox(height: ZanthusSpacing.sm),
        ZanthusText.h4(text),
        const SizedBox(height: ZanthusSpacing.sm),
        ZanthusText.body(text),
        const SizedBox(height: ZanthusSpacing.sm),
        ZanthusText.caption(text),
      ],
    ),
  );
}
