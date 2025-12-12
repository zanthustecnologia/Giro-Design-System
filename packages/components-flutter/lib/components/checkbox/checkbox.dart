import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final String? label;
  final bool disabled;

  const ZanthusCheckbox({
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
      activeColor: ZanthusColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          checkbox,
          const SizedBox(width: ZanthusSpacing.sm),
          GestureDetector(
            onTap: disabled
                ? null
                : () => onChanged?.call(!value),
            child: Text(
              label!,
              style: TextStyle(
                color: disabled ? ZanthusColors.gray400 : ZanthusColors.onBackground,
                fontSize: ZanthusTypography.fontSizeMd,
              ),
            ),
          ),
        ],
      );
    }

    return checkbox;
  }
}
