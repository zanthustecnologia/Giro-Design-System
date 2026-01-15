import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroSelect<T> extends StatelessWidget {
  final T? value;
  final List<T> items;
  final ValueChanged<T?>? onChanged;
  final String Function(T) itemBuilder;
  final String? hint;
  final bool disabled;

  const GiroSelect({
    super.key,
    this.value,
    required this.items,
    this.onChanged,
    required this.itemBuilder,
    this.hint,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<T>(
      value: value,
      items: items.map((item) {
        return DropdownMenuItem<T>(
          value: item,
          child: Text(itemBuilder(item)),
        );
      }).toList(),
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
