import 'package:flutter/material.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget dividerStory(BuildContext context) {
  return Center(
    child: SizedBox(
      width: 300,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const ZanthusText.body('Content above'),
          const ZanthusDivider(),
          const ZanthusText.body('Content below'),
          const SizedBox(height: ZanthusSpacing.lg),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              ZanthusText.body('Left'),
              ZanthusVerticalDivider(),
              ZanthusText.body('Right'),
            ],
          ),
        ],
      ),
    ),
  );
}
