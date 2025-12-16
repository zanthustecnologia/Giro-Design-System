import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroDropdown<T> extends StatelessWidget {
  final T? value;
  final List<DropdownMenuItem<T>> items;
  final ValueChanged<T?>? onChanged;
  final String? hint;
  final bool disabled;

  const GiroDropdown({
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
          horizontal: GiroSpacing.md,
          vertical: GiroSpacing.sm,
        ),
        border: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: GiroColors.gray300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: GiroColors.gray300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: GiroColors.primary, width: 2),
        ),
      ),
    );
  }
}
