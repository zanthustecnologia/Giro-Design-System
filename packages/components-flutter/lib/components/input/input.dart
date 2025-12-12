import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusInput extends StatelessWidget {
  final TextEditingController? controller;
  final String? label;
  final String? hint;
  final String? errorText;
  final bool obscureText;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onTap;
  final bool readOnly;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final int? maxLines;
  final int? minLines;

  const ZanthusInput({
    super.key,
    this.controller,
    this.label,
    this.hint,
    this.errorText,
    this.obscureText = false,
    this.keyboardType,
    this.onChanged,
    this.onTap,
    this.readOnly = false,
    this.prefixIcon,
    this.suffixIcon,
    this.maxLines = 1,
    this.minLines,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      onChanged: onChanged,
      onTap: onTap,
      readOnly: readOnly,
      maxLines: maxLines,
      minLines: minLines,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        errorText: errorText,
        prefixIcon: prefixIcon,
        suffixIcon: suffixIcon,
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
        errorBorder: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: const BorderSide(color: ZanthusColors.error),
        ),
      ),
    );
  }
}
