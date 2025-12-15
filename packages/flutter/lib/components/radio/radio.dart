import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusRadio<T> extends StatelessWidget {
  final T value;
  final T? groupValue;
  final ValueChanged<T?>? onChanged;
  final String? label;
  final bool disabled;

  const ZanthusRadio({
    super.key,
    required this.value,
    this.groupValue,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final radio = Radio<T>(
      value: value,
      groupValue: groupValue,
      onChanged: disabled ? null : onChanged,
      activeColor: ZanthusColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          radio,
          const SizedBox(width: ZanthusSpacing.sm),
          GestureDetector(
            onTap: disabled
                ? null
                : () => onChanged?.call(value),
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

    return radio;
  }
}
