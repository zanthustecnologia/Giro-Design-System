import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;
  final Color? color;

  const ZanthusText(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  });

  // Convenience constructors
  const ZanthusText.h1(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const ZanthusText.h2(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const ZanthusText.h3(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const ZanthusText.h4(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const ZanthusText.body(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  const ZanthusText.caption(
    this.text, {
    super.key,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.color,
  }) : style = null;

  @override
  Widget build(BuildContext context) {
    TextStyle effectiveStyle = style ?? ZanthusTypography.bodyMedium;

    // Override with specific styles for convenience constructors
    if (runtimeType.toString().contains('h1')) {
      effectiveStyle = ZanthusTypography.heading1;
    } else if (runtimeType.toString().contains('h2')) {
      effectiveStyle = ZanthusTypography.heading2;
    } else if (runtimeType.toString().contains('h3')) {
      effectiveStyle = ZanthusTypography.heading3;
    } else if (runtimeType.toString().contains('h4')) {
      effectiveStyle = ZanthusTypography.heading4;
    } else if (runtimeType.toString().contains('caption')) {
      effectiveStyle = ZanthusTypography.caption;
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
