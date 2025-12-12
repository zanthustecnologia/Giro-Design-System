import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget cardStory(BuildContext context) {
  final title = context.knobs.string(
    label: 'Title',
    initialValue: 'Card Title',
  );

  final description = context.knobs.string(
    label: 'Description',
    initialValue: 'This is a card description with some content.',
  );

  return Center(
    child: SizedBox(
      width: 300,
      child: ZanthusCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            ZanthusText.h3(title),
            const SizedBox(height: ZanthusSpacing.sm),
            ZanthusText.body(description),
          ],
        ),
      ),
    ),
  );
}
