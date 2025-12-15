import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusChip extends StatelessWidget {
  final String label;
  final VoidCallback? onDeleted;
  final VoidCallback? onTap;
  final Widget? avatar;
  final bool selected;

  const ZanthusChip({
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
        backgroundColor: selected ? ZanthusColors.primary : ZanthusColors.gray100,
        labelStyle: TextStyle(
          color: selected ? ZanthusColors.onPrimary : ZanthusColors.onSurface,
          fontSize: ZanthusTypography.fontSizeSm,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusFull,
        ),
      );
    }

    return FilterChip(
      label: Text(label),
      avatar: avatar,
      selected: selected,
      onSelected: onTap != null ? (_) => onTap!() : null,
      backgroundColor: ZanthusColors.gray100,
      selectedColor: ZanthusColors.primary,
      labelStyle: TextStyle(
        color: selected ? ZanthusColors.onPrimary : ZanthusColors.onSurface,
        fontSize: ZanthusTypography.fontSizeSm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: ZanthusBorderRadius.borderRadiusFull,
      ),
    );
  }
}
