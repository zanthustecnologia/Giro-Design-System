import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;
  final Color? color;

  const GiroText(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  });

  // Convenience constructors
  const GiroText.h1(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const GiroText.h2(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const GiroText.h3(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const GiroText.h4(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const GiroText.body(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const GiroText.caption(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  @override
  Widget build(BuildContext context) {
    TextStyle effectiveStyle = style ?? GiroTypography.bodyMedium;

    // Override with specific styles for convenience constructors
    if (runtimeType.toString().contains('h1')) {
      effectiveStyle = GiroTypography.heading1;
    } else if (runtimeType.toString().contains('h2')) {
      effectiveStyle = GiroTypography.heading2;
    } else if (runtimeType.toString().contains('h3')) {
      effectiveStyle = GiroTypography.heading3;
    } else if (runtimeType.toString().contains('h4')) {
      effectiveStyle = GiroTypography.heading4;
    } else if (runtimeType.toString().contains('caption')) {
      effectiveStyle = GiroTypography.caption;
    }

    if (color != null) {
      effectiveStyle = effectiveStyle.copyWith(color: color);
    }

    return Text(
      text,
      style: effectiveStyle,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}
