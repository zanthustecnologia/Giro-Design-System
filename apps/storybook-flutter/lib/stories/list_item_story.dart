import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget listItemStory(BuildContext context) {
  final title = context.knobs.string(
    label: 'Title',
    initialValue: 'List Item Title',
  );

  final subtitle = context.knobs.string(
    label: 'Subtitle',
    initialValue: 'List item subtitle',
  );

  return Center(
    child: SizedBox(
      width: 300,
      child: ZanthusListItem(
        leading: const ZanthusAvatar(
          initials: 'AB',
          size: ZanthusAvatarSize.small,
        ),
        title: title,
        subtitle: subtitle,
        trailing: const Icon(Icons.arrow_forward_ios),
        onTap: () {},
      ),
    ),
  );
}
