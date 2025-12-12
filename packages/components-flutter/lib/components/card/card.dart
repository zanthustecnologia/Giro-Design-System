import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  final List<BoxShadow>? boxShadow;

  const ZanthusCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
    this.backgroundColor,
    this.boxShadow,
  });

  @override
  Widget build(BuildContext context) {
    Widget card = Container(
      padding: padding ?? const EdgeInsets.all(ZanthusSpacing.md),
      decoration: BoxDecoration(
        color: backgroundColor ?? ZanthusColors.surface,
        borderRadius: ZanthusBorderRadius.borderRadiusLg,
        boxShadow: boxShadow ?? ZanthusShadows.shadowMd,
      ),
      child: child,
    );

    if (onTap != null) {
      card = InkWell(
        onTap: onTap,
        borderRadius: ZanthusBorderRadius.borderRadiusLg,
        child: card,
      );
    }

    return card;
  }
}
