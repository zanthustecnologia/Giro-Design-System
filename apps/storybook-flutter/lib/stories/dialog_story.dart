import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget dialogStory(BuildContext context) {
  final title = context.knobs.string(
    label: 'Title',
    initialValue: 'Dialog Title',
  );

  final content = context.knobs.string(
    label: 'Content',
    initialValue: 'This is the dialog content.',
  );

  return Center(
    child: ZanthusButton(
      text: 'Show Dialog',
      onPressed: () {
        ZanthusDialog.show<void>(
          context: context,
          title: title,
          content: content,
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ZanthusButton(
              text: 'Confirm',
              onPressed: () => Navigator.of(context).pop(),
            ),
          ],
        );
      },
    ),
  );
}
