import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

enum ZanthusButtonVariant {
  primary,
  secondary,
  outline,
  ghost,
  text,
}

enum ZanthusButtonSize {
  small,
  medium,
  large,
}

class ZanthusButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ZanthusButtonVariant variant;
  final ZanthusButtonSize size;
  final bool fullWidth;
  final bool loading;
  final Widget? icon;
  final bool disabled;

  const ZanthusButton({
    super.key,
    required this.text,
    this.onPressed,
    this.variant = ZanthusButtonVariant.primary,
    this.size = ZanthusButtonSize.medium,
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
      case ZanthusButtonVariant.primary:
        return ElevatedButton(
          onPressed: isDisabled ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: ZanthusColors.primary,
            foregroundColor: ZanthusColors.onPrimary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: ZanthusBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case ZanthusButtonVariant.secondary:
        return ElevatedButton(
          onPressed: isDisabled ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: ZanthusColors.secondary,
            foregroundColor: ZanthusColors.onSecondary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: ZanthusBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case ZanthusButtonVariant.outline:
        return OutlinedButton(
          onPressed: isDisabled ? null : onPressed,
          style: OutlinedButton.styleFrom(
            foregroundColor: ZanthusColors.primary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            side: const BorderSide(color: ZanthusColors.primary),
            shape: RoundedRectangleBorder(
              borderRadius: ZanthusBorderRadius.borderRadiusMd,
            ),
          ),
          child: _buildContent(),
        );
      case ZanthusButtonVariant.ghost:
      case ZanthusButtonVariant.text:
        return TextButton(
          onPressed: isDisabled ? null : onPressed,
          style: TextButton.styleFrom(
            foregroundColor: ZanthusColors.primary,
            padding: _getPadding(),
            minimumSize: Size(_getMinWidth(), _getHeight()),
            shape: RoundedRectangleBorder(
              borderRadius: ZanthusBorderRadius.borderRadiusMd,
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
          SizedBox(width: ZanthusSpacing.sm),
          Text(text, style: TextStyle(fontSize: _getFontSize())),
        ],
      );
    }

    return Text(text, style: TextStyle(fontSize: _getFontSize()));
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case ZanthusButtonSize.small:
        return const EdgeInsets.symmetric(
          horizontal: ZanthusSpacing.sm,
          vertical: ZanthusSpacing.xs,
        );
      case ZanthusButtonSize.medium:
        return const EdgeInsets.symmetric(
          horizontal: ZanthusSpacing.md,
          vertical: ZanthusSpacing.sm,
        );
      case ZanthusButtonSize.large:
        return const EdgeInsets.symmetric(
          horizontal: ZanthusSpacing.lg,
          vertical: ZanthusSpacing.md,
        );
    }
  }

  double _getHeight() {
    switch (size) {
      case ZanthusButtonSize.small:
        return 32.0;
      case ZanthusButtonSize.medium:
        return 40.0;
      case ZanthusButtonSize.large:
        return 48.0;
    }
  }

  double _getMinWidth() {
    return 0;
  }

  double _getFontSize() {
    switch (size) {
      case ZanthusButtonSize.small:
        return ZanthusTypography.fontSizeSm;
      case ZanthusButtonSize.medium:
        return ZanthusTypography.fontSizeMd;
      case ZanthusButtonSize.large:
        return ZanthusTypography.fontSizeLg;
    }
  }
}
