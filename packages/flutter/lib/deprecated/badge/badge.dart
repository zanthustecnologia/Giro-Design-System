import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum GiroBadgeVariant {
  primary,
  secondary,
  success,
  warning,
  error,
  info,
}

class GiroBadge extends StatelessWidget {
  final String text;
  final GiroBadgeVariant variant;
  final Widget? icon;

  const GiroBadge({
    super.key,
    required this.text,
    this.variant = GiroBadgeVariant.primary,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: GiroSpacing.sm,
        vertical: GiroSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: _getBackgroundColor(),
        borderRadius: GiroBorderRadius.borderRadiusFull,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            icon!,
            const SizedBox(width: GiroSpacing.xs),
          ],
          Text(
            text,
            style: TextStyle(
              color: _getTextColor(),
              fontSize: GiroTypography.fontSizeXs,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Color _getBackgroundColor() {
    switch (variant) {
      case GiroBadgeVariant.primary:
        return GiroColors.primary;
      case GiroBadgeVariant.secondary:
        return GiroColors.secondary;
      case GiroBadgeVariant.success:
        return Colors.green;
      case GiroBadgeVariant.warning:
        return Colors.orange;
      case GiroBadgeVariant.error:
        return GiroColors.error;
      case GiroBadgeVariant.info:
        return Colors.blue;
    }
  }

  Color _getTextColor() {
    return GiroColors.onPrimary;
  }
}
