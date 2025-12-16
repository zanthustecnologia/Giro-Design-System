import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final String? label;
  final bool disabled;

  const GiroCheckbox({
    super.key,
    required this.value,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final checkbox = Checkbox(
      value: value,
      onChanged: disabled ? null : onChanged,
      activeColor: GiroColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          checkbox,
          const SizedBox(width: GiroSpacing.sm),
          GestureDetector(
            onTap: disabled
                ? null
                : () => onChanged?.call(!value),
            child: Text(
              label!,
              style: TextStyle(
                color: disabled ? GiroColors.gray400 : GiroColors.onBackground,
                fontSize: GiroTypography.fontSizeMd,
              ),
            ),
          ),
        ],
      );
    }

    return checkbox;
  }
}
