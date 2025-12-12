import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget avatarStory(BuildContext context) {
  final size = context.knobs.list(
    label: 'Size',
    options: ZanthusAvatarSize.values,
    labelBuilder: (value) => value.name,
  );

  final imageUrl = context.knobs.string(
    label: 'Image URL',
    initialValue: '',
  );

  final initials = context.knobs.string(
    label: 'Initials',
    initialValue: 'AB',
  );

  return Center(
    child: ZanthusAvatar(
      size: size,
      imageUrl: imageUrl.isEmpty ? null : imageUrl,
      initials: initials,
    ),
  );
}
