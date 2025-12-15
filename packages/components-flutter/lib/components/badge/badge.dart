import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum ZanthusBadgeVariant {
  primary,
  secondary,
  success,
  warning,
  error,
  info,
}

class ZanthusBadge extends StatelessWidget {
  final String text;
  final ZanthusBadgeVariant variant;
  final Widget? icon;

  const ZanthusBadge({
    super.key,
    required this.text,
    this.variant = ZanthusBadgeVariant.primary,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: ZanthusSpacing.sm,
        vertical: ZanthusSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: _getBackgroundColor(),
        borderRadius: ZanthusBorderRadius.borderRadiusFull,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            icon!,
            const SizedBox(width: ZanthusSpacing.xs),
          ],
          Text(
            text,
            style: TextStyle(
              color: _getTextColor(),
              fontSize: ZanthusTypography.fontSizeXs,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Color _getBackgroundColor() {
    switch (variant) {
      case ZanthusBadgeVariant.primary:
        return ZanthusColors.primary;
      case ZanthusBadgeVariant.secondary:
        return ZanthusColors.secondary;
      case ZanthusBadgeVariant.success:
        return Colors.green;
      case ZanthusBadgeVariant.warning:
        return Colors.orange;
      case ZanthusBadgeVariant.error:
        return ZanthusColors.error;
      case ZanthusBadgeVariant.info:
        return Colors.blue;
    }
  }

  Color _getTextColor() {
    return ZanthusColors.onPrimary;
  }
}
