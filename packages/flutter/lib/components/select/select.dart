import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusSelect<T> extends StatelessWidget {
  final T? value;
  final List<T> items;
  final ValueChanged<T?>? onChanged;
  final String Function(T) itemBuilder;
  final String? hint;
  final bool disabled;

  const ZanthusSelect({
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
