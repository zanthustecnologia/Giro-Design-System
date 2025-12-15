import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool disabled;

  const ZanthusSwitch({
    super.key,
    required this.value,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final switchWidget = Switch(
      value: value,
      onChanged: disabled ? null : onChanged,
      activeColor: ZanthusColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label!,
            style: TextStyle(
              color: disabled ? ZanthusColors.gray400 : ZanthusColors.onBackground,
              fontSize: ZanthusTypography.fontSizeMd,
            ),
          ),
          const SizedBox(width: ZanthusSpacing.sm),
          switchWidget,
        ],
      );
    }

    return switchWidget;
  }
}
