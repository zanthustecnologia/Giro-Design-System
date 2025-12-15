import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusListItem extends StatelessWidget {
  final Widget? leading;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;

  const ZanthusListItem({
    super.key,
    this.leading,
    required this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: leading,
      title: Text(
        title,
        style: ZanthusTypography.bodyMedium.copyWith(
          fontWeight: FontWeight.w700,
        ),
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle!,
              style: ZanthusTypography.bodySmall.copyWith(
                color: ZanthusColors.gray600,
              ),
            )
          : null,
      trailing: trailing,
      onTap: onTap,
    );
  }
}
