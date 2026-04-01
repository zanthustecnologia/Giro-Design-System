import 'package:flutter/material.dart';
import '../../types/giro_types.dart';
import 'button_tokens.dart';

enum GiroButtonVariant {
  filled,
  outlined,
  text,
}

class GiroButton extends StatelessWidget {
  final GiroButtonVariant variant; // 'filled' | 'outlined' | 'text'
  final GiroSize size; // 'lg' | 'sm'
  final GiroPosition iconPosition; // 'left' | 'right' | 'none'

  final VoidCallback? onPressed;
  final String text;
  final Widget? icon;

  final bool iconOnly;
  final bool fullWidth;
  final bool disable;

  // Construtor BASE
  const GiroButton({
    required this.text,
    required this.onPressed,
    this.variant = GiroButtonVariant.filled,
    this.size = GiroSize.lg,
    this.iconPosition = GiroPosition.left,
    this.icon,
    this.iconOnly = false,
    this.fullWidth = false,
    this.disable = false,
    super.key,
  })  : assert(
          iconPosition == GiroPosition.left ||
              iconPosition == GiroPosition.right ||
              iconPosition == GiroPosition.none,
          'GiroButton only supports left, right, or none for iconPosition.',
        ),
        assert(
          size == GiroSize.lg || size == GiroSize.sm,
          'GiroButton only supports lg or sm for size.',
        ),
        assert(
          variant == GiroButtonVariant.filled ||
              variant == GiroButtonVariant.outlined ||
              variant == GiroButtonVariant.text,
          'GiroButton only supports filled, outlined, or text for variant.',
        );

  // Construtor FILLED
  const GiroButton.filled({
    required String text,
    required VoidCallback? onPressed,
    GiroSize size = GiroSize.lg,
    GiroPosition iconPosition = GiroPosition.left,
    Widget? icon,
    bool iconOnly = false,
    bool fullWidth = false,
    bool disable = false,
    Key? key,
  }) : this(
          variant: GiroButtonVariant.filled,
          text: text,
          onPressed: onPressed,
          size: size,
          iconPosition: iconPosition,
          icon: icon,
          iconOnly: iconOnly,
          fullWidth: fullWidth,
          disable: disable,
          key: key,
        );

  // Construtor OUTLINED
  const GiroButton.outlined({
    required String text,
    required VoidCallback? onPressed,
    GiroSize size = GiroSize.lg,
    GiroPosition iconPosition = GiroPosition.left,
    Widget? icon,
    bool iconOnly = false,
    bool fullWidth = false,
    bool disable = false,
    Key? key,
  }) : this(
          variant: GiroButtonVariant.outlined,
          text: text,
          onPressed: onPressed,
          size: size,
          iconPosition: iconPosition,
          icon: icon,
          iconOnly: iconOnly,
          fullWidth: fullWidth,
          disable: disable,
          key: key,
        );

  // Construtor TEXT
  const GiroButton.text({
    required String text,
    required VoidCallback? onPressed,
    GiroSize size = GiroSize.lg,
    GiroPosition iconPosition = GiroPosition.left,
    Widget? icon,
    bool iconOnly = false,
    bool fullWidth = false,
    bool disable = false,
    Key? key,
  }) : this(
          variant: GiroButtonVariant.text,
          text: text,
          onPressed: onPressed,
          size: size,
          iconPosition: iconPosition,
          icon: icon,
          iconOnly: iconOnly,
          fullWidth: fullWidth,
          disable: disable,
          key: key,
        );

  bool get _isLg => size == GiroSize.lg;
  bool get _hasIcon =>
      icon != null && !iconOnly && iconPosition != GiroPosition.none;
  bool get _iconRight => iconPosition == GiroPosition.right;

  @override
  Widget build(BuildContext context) {
    final height =
        _isLg ? GiroButtonTokens.heightLg : GiroButtonTokens.heightSm;
    final tokenMinWidth =
        _isLg ? GiroButtonTokens.minWidthLg : GiroButtonTokens.minWidthSm;
    final effectiveMinWidth = iconOnly ? height : tokenMinWidth;

    final padX =
        _getHorizontalPadding(variant: variant, isLg: _isLg, hasIcon: _hasIcon);

    final style = ButtonStyle(
      minimumSize: WidgetStateProperty.all(Size(effectiveMinWidth, height)),
      fixedSize:
          iconOnly ? WidgetStateProperty.all(Size(height, height)) : null,
      padding: WidgetStateProperty.all(
        iconOnly ? EdgeInsets.zero : EdgeInsets.symmetric(horizontal: padX),
      ),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    );

    final composedChild = _buildChild(isLg: _isLg);

    Widget button;

    switch (variant) {
      case GiroButtonVariant.outlined:
        button = OutlinedButton(
          onPressed: disable ? null : onPressed,
          style: style,
          child: composedChild,
        );
        break;
      case GiroButtonVariant.text:
        button = TextButton(
          onPressed: disable ? null : onPressed,
          style: style,
          child: composedChild,
        );
        break;
      case GiroButtonVariant.filled:
        button = FilledButton(
          onPressed: disable ? null : onPressed,
          style: style,
          child: composedChild,
        );
        break;
    }

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
    final double base = switch (variant) {
      GiroButtonVariant.text => isLg
          ? GiroButtonTokens.paddingTextXLg
          : GiroButtonTokens.paddingTextXSm,
      _ => isLg ? GiroButtonTokens.paddingXLg : GiroButtonTokens.paddingXSm,
    };

    return base;
  }

  Widget _buildChild({required bool isLg}) {
    if (iconOnly && icon != null) {
      final box =
          isLg ? GiroButtonTokens.iconOnlyLg : GiroButtonTokens.iconOnlySm;
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

    if (icon == null || iconPosition == GiroPosition.none) return Text(text);

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
        Text(text),
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
