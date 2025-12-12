import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum ZanthusAvatarSize {
  small,
  medium,
  large,
  xlarge,
}

class ZanthusAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? initials;
  final ZanthusAvatarSize size;
  final Color? backgroundColor;
  final Color? textColor;
  final VoidCallback? onTap;

  const ZanthusAvatar({
    super.key,
    this.imageUrl,
    this.initials,
    this.size = ZanthusAvatarSize.medium,
    this.backgroundColor,
    this.textColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final double avatarSize = _getSize();
    final double fontSize = _getFontSize();

    Widget avatar = CircleAvatar(
      radius: avatarSize / 2,
      backgroundColor: backgroundColor ?? ZanthusColors.primary,
      backgroundImage: imageUrl != null ? NetworkImage(imageUrl!) : null,
      child: imageUrl == null
          ? Text(
              initials ?? '?',
              style: TextStyle(
                color: textColor ?? ZanthusColors.onPrimary,
                fontSize: fontSize,
                fontWeight: ZanthusTypography.fontWeightMedium,
              ),
            )
          : null,
    );

    if (onTap != null) {
      avatar = InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(avatarSize / 2),
        child: avatar,
      );
    }

    return avatar;
  }

  double _getSize() {
    switch (size) {
      case ZanthusAvatarSize.small:
        return 32.0;
      case ZanthusAvatarSize.medium:
        return 40.0;
      case ZanthusAvatarSize.large:
        return 56.0;
      case ZanthusAvatarSize.xlarge:
        return 80.0;
    }
  }

  double _getFontSize() {
    switch (size) {
      case ZanthusAvatarSize.small:
        return ZanthusTypography.fontSizeXs;
      case ZanthusAvatarSize.medium:
        return ZanthusTypography.fontSizeSm;
      case ZanthusAvatarSize.large:
        return ZanthusTypography.fontSizeMd;
      case ZanthusAvatarSize.xlarge:
        return ZanthusTypography.fontSizeLg;
    }
  }
}
