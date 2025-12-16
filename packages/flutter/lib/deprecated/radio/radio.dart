import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroRadio<T> extends StatelessWidget {
  final T value;
  final T? groupValue;
  final ValueChanged<T?>? onChanged;
  final String? label;
  final bool disabled;

  const GiroRadio({
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
      activeColor: GiroColors.primary,
    );

    if (label != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          radio,
          const SizedBox(width: GiroSpacing.sm),
          GestureDetector(
            onTap: disabled
                ? null
                : () => onChanged?.call(value),
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

    return radio;
  }
}
