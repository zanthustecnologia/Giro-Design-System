import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroChip extends StatelessWidget {
  final String label;
  final VoidCallback? onDeleted;
  final VoidCallback? onTap;
  final Widget? avatar;
  final bool selected;

  const GiroChip({
    super.key,
    required this.label,
    this.onDeleted,
    this.onTap,
    this.avatar,
    this.selected = false,
  });

  @override
  Widget build(BuildContext context) {
    if (onDeleted != null) {
      return Chip(
        label: Text(label),
        avatar: avatar,
        onDeleted: onDeleted,
        backgroundColor: selected ? GiroColors.primary : GiroColors.gray100,
        labelStyle: TextStyle(
          color: selected ? GiroColors.onPrimary : GiroColors.onSurface,
          fontSize: GiroTypography.fontSizeSm,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: GiroBorderRadius.borderRadiusFull,
        ),
      );
    }

    return FilterChip(
      label: Text(label),
      avatar: avatar,
      selected: selected,
      onSelected: onTap != null ? (_) => onTap!() : null,
      backgroundColor: GiroColors.gray100,
      selectedColor: GiroColors.primary,
      labelStyle: TextStyle(
        color: selected ? GiroColors.onPrimary : GiroColors.onSurface,
        fontSize: GiroTypography.fontSizeSm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: GiroBorderRadius.borderRadiusFull,
      ),
    );
  }
}
