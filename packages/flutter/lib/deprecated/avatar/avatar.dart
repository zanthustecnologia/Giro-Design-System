import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum GiroAvatarSize {
  small,
  medium,
  large,
  xlarge,
}

class GiroAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? initials;
  final GiroAvatarSize size;
  final Color? backgroundColor;
  final Color? textColor;
  final VoidCallback? onTap;

  const GiroAvatar({
    super.key,
    this.imageUrl,
    this.initials,
    this.size = GiroAvatarSize.medium,
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
      backgroundColor: backgroundColor ?? GiroColors.primary,
      backgroundImage: imageUrl != null ? NetworkImage(imageUrl!) : null,
      child: imageUrl == null
          ? Text(
              initials ?? '?',
              style: TextStyle(
                color: textColor ?? GiroColors.onPrimary,
                fontSize: fontSize,
                fontWeight: FontWeight.w500,
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
      case GiroAvatarSize.small:
        return 32.0;
      case GiroAvatarSize.medium:
        return 40.0;
      case GiroAvatarSize.large:
        return 56.0;
      case GiroAvatarSize.xlarge:
        return 80.0;
    }
  }

  double _getFontSize() {
    switch (size) {
      case GiroAvatarSize.small:
        return GiroTypography.fontSizeXs;
      case GiroAvatarSize.medium:
        return GiroTypography.fontSizeSm;
      case GiroAvatarSize.large:
        return GiroTypography.fontSizeMd;
      case GiroAvatarSize.xlarge:
        return GiroTypography.fontSizeLg;
    }
  }
}
