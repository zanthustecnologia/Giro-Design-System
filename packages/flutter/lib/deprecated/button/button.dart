import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum GiroButtonVariant {
  primary,
  secondary,
  outline,
  ghost,
  text,
}

enum GiroButtonSize {
  small,
  medium,
  large,
}

class GiroButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final GiroButtonVariant variant;
  final GiroButtonSize size;
  final bool fullWidth;
  final bool loading;
  final Widget? icon;
  final bool disabled;

  const GiroButton({
    super.key,
    required this.text,
    this.onPressed,
    this.variant = GiroButtonVariant.primary,
    this.size = GiroButtonSize.medium,
    this.fullWidth = false,
    this.loading = false,
    this.icon,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final bool isDisabled = disabled || loading || onPressed == null;

    return SizedBox(
      width: fullWidth ? double.infinity : null,
      child: _buildButton(isDisabled),
    );
  }

  Widget _buildButton(bool isDisabled) {
    switch (variant) {
      case GiroButtonVariant.primary:
        return ElevatedButton(
          onPressed: isDisabled ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: GiroColors.primary,
            foregroundColor: GiroColors.onPrimary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: GiroBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case GiroButtonVariant.secondary:
        return ElevatedButton(
          onPressed: isDisabled ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: GiroColors.secondary,
            foregroundColor: GiroColors.onSecondary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: GiroBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case GiroButtonVariant.outline:
        return OutlinedButton(
          onPressed: isDisabled ? null : onPressed,
          style: OutlinedButton.styleFrom(
            foregroundColor: GiroColors.primary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            side: const BorderSide(color: GiroColors.primary),
            shape: RoundedRectangleBorder(
              borderRadius: GiroBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case GiroButtonVariant.ghost:
      case GiroButtonVariant.text:
        return TextButton(
          onPressed: isDisabled ? null : onPressed,
          style: TextButton.styleFrom(
            foregroundColor: GiroColors.primary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: GiroBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
    }
  }

  Widget _buildContent() {
    if (loading) {
      return SizedBox(
        width: _getFontSize(),
        height: _getFontSize(),
        child: const CircularProgressIndicator(strokeWidth: 2),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          icon!,
          SizedBox(width: GiroSpacing.sm),
          Text(text, style: TextStyle(fontSize: _getFontSize(), fontWeight: FontWeight.w500)),
        ],
      );
    }

    return Text(text, style: TextStyle(fontSize: _getFontSize(), fontWeight: FontWeight.w500));
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case GiroButtonSize.small:
        return const EdgeInsets.symmetric(
          horizontal: GiroSpacing.md,
          vertical: GiroSpacing.xs,
        );
      case GiroButtonSize.medium:
        return const EdgeInsets.symmetric(
          horizontal: GiroSpacing.md,
          vertical: GiroSpacing.sm,
        );
      case GiroButtonSize.large:
        return const EdgeInsets.symmetric(
          horizontal: GiroSpacing.lg,
          vertical: GiroSpacing.md,
        );
    }
  }

  double _getHeight() {
    switch (size) {
      case GiroButtonSize.small:
        return 36.0;
      case GiroButtonSize.medium:
        return 40.0;
      case GiroButtonSize.large:
        return 44.0;
    }
  }

  double _getMinWidth() {
    switch (size) {
      case GiroButtonSize.small:
        return 76.0;
      case GiroButtonSize.medium:
        return 92.0;
      case GiroButtonSize.large:
        return 92.0;
    }
  }

  double _getFontSize() {
    return GiroTypography.fontSizeSm; // 14px para todos os tamanhos
  }
}
