import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  final List<BoxShadow>? boxShadow;

  const GiroCard({
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
      padding: padding ?? const EdgeInsets.all(GiroSpacing.md),
      decoration: BoxDecoration(
        color: backgroundColor ?? GiroColors.surface,
        borderRadius: GiroBorderRadius.borderRadiusLg,
        boxShadow: boxShadow ?? GiroShadows.shadowMd,
      ),
      child: child,
    );

    if (onTap != null) {
      card = InkWell(
        onTap: onTap,
        borderRadius: GiroBorderRadius.borderRadiusLg,
        child: card,
      );
    }

    return card;
  }
}
