import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusTooltip extends StatelessWidget {
  final String message;
  final Widget child;
  final TooltipTriggerMode? triggerMode;

  const ZanthusTooltip({
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
        color: ZanthusColors.gray900,
        borderRadius: ZanthusBorderRadius.borderRadiusSm,
      ),
      textStyle: ZanthusTypography.bodySmall.copyWith(
        color: ZanthusColors.onPrimary,
      ),
      child: child,
    );
  }
}
