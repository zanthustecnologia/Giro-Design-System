import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusDropdown<T> extends StatelessWidget {
  final T? value;
  final List<DropdownMenuItem<T>> items;
  final ValueChanged<T?>? onChanged;
  final String? hint;
  final bool disabled;

  const ZanthusDropdown({
    super.key,
    this.value,
    required this.items,
    this.onChanged,
    this.hint,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<T>(
      value: value,
      items: items,
      onChanged: disabled ? null : onChanged,
      hint: hint != null ? Text(hint!) : null,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(
          horizontal: ZanthusSpacing.md,
          vertical: ZanthusSpacing.sm,
        ),
        border: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: ZanthusColors.gray300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: ZanthusColors.gray300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: ZanthusColors.primary, width: 2),
        ),
      ),
    );
  }
}
