import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroSwitch extends StatelessWidget {
  final bool value;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool disabled;

  const GiroSwitch({
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
      activeColor: GiroColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label!,
            style: TextStyle(
              color: disabled ? GiroColors.gray400 : GiroColors.onBackground,
              fontSize: GiroTypography.fontSizeMd,
            ),
          ),
          const SizedBox(width: GiroSpacing.sm),
          switchWidget,
        ],
      );
    }

    return switchWidget;
  }
}
