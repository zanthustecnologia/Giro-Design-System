import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroTooltip extends StatelessWidget {
  final String message;
  final Widget child;
  final TooltipTriggerMode? triggerMode;

  const GiroTooltip({
    super.key,
    required this.message,
    required this.child,
    this.triggerMode,
  });

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: message,
      triggerMode: triggerMode,
      decoration: BoxDecoration(
        color: GiroColors.gray900,
        borderRadius: GiroBorderRadius.borderRadiusSm,
      ),
      textStyle: GiroTypography.bodySmall.copyWith(
        color: GiroColors.onPrimary,
      ),
      child: child,
    );
  }
}
