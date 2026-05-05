import 'package:flutter/material.dart';
import 'button_tokens.dart';

enum GiroButtonVariant { filled, outlined, text }

enum GiroButtonSize { lg, sm }

enum GiroButtonIconPosition { left, right, none }

class GiroButton extends StatelessWidget {
  final GiroButtonVariant variant;
  final GiroButtonSize size;
  final GiroButtonIconPosition iconPosition;

  final VoidCallback? onPressed;
  final Widget child;
  final Widget? icon;

  final bool iconOnly;
  final bool fullWidth;

  const GiroButton({
    super.key,
    required this.child,
    required this.onPressed,
    this.variant = GiroButtonVariant.filled,
    this.size = GiroButtonSize.lg,
    this.iconPosition = GiroButtonIconPosition.left,
    this.icon,
    this.iconOnly = false,
    this.fullWidth = false,
  });

  bool get _isLg => size == GiroButtonSize.lg;
  bool get _hasIcon => icon != null && !iconOnly && iconPosition != GiroButtonIconPosition.none;
  bool get _iconRight => iconPosition == GiroButtonIconPosition.right;

  @override
  Widget build(BuildContext context) {
    final height = _isLg ? GiroButtonTokens.heightLg : GiroButtonTokens.heightSm;
    final tokenMinWidth = _isLg ? GiroButtonTokens.minWidthLg : GiroButtonTokens.minWidthSm;
    final effectiveMinWidth = iconOnly ? height : tokenMinWidth;

    final padX = _getHorizontalPadding(variant: variant, isLg: _isLg, hasIcon: _hasIcon);
    final style = ButtonStyle(
      // Override Theme's minimumSize (which defaults to 92px width)
      minimumSize: WidgetStateProperty.all(Size(effectiveMinWidth, height)),
      // Force square shape for iconOnly to be absolutely sure
      fixedSize: iconOnly ? WidgetStateProperty.all(Size(height, height)) : null,
      padding: WidgetStateProperty.all(
        iconOnly ? EdgeInsets.zero : EdgeInsets.symmetric(horizontal: padX),
      ),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    );

    final composedChild = _buildChild(isLg: _isLg);

    final Widget button = switch (variant) {
      GiroButtonVariant.outlined => OutlinedButton(onPressed: onPressed, style: style, child: composedChild),
      GiroButtonVariant.text     => TextButton(onPressed: onPressed, style: style, child: composedChild),
      GiroButtonVariant.filled   => FilledButton(onPressed: onPressed, style: style, child: composedChild),
    };

    if (fullWidth) {
      return SizedBox(width: double.infinity, height: height, child: button);
    }

    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: effectiveMinWidth,
        minHeight: height,
        maxHeight: height,
      ),
      child: button,
    );
  }

  double _getHorizontalPadding({
    required GiroButtonVariant variant,
    required bool isLg,
    required bool hasIcon,
  }) {
    return switch (variant) {
      GiroButtonVariant.text => isLg ? GiroButtonTokens.paddingTextXLg : GiroButtonTokens.paddingTextXSm,
      _                      => isLg ? GiroButtonTokens.paddingXLg : GiroButtonTokens.paddingXSm,
    };
  }

  Widget _buildChild({required bool isLg}) {
    // icon-only (quadrado 44/36)
    if (iconOnly && icon != null) {
      final box = isLg ? GiroButtonTokens.iconOnlyLg : GiroButtonTokens.iconOnlySm;
      return SizedBox(
        width: box,
        height: box,
        child: Center(
          child: IconTheme.merge(
            data: const IconThemeData(size: GiroButtonTokens.iconSize),
            child: icon!,
          ),
        ),
      );
    }

    // Sem ícone
    if (icon == null || iconPosition == GiroButtonIconPosition.none) return child;

    // Com ícone
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (!_iconRight) ...[
          IconTheme.merge(
            data: const IconThemeData(size: GiroButtonTokens.iconSize),
            child: icon!,
          ),
          const SizedBox(width: GiroButtonTokens.iconGap),
        ],
        child,
        if (_iconRight) ...[
          const SizedBox(width: GiroButtonTokens.iconGap),
          IconTheme.merge(
            data: const IconThemeData(size: GiroButtonTokens.iconSize),
            child: icon!,
          ),
        ],
      ],
    );
  }
}
