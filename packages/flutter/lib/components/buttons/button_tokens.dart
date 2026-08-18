import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroButtonTokens {
  GiroButtonTokens._();

  // sizes
  static const double heightLg = 44.0;
  static const double heightSm = 36.0;

  static const double minWidthLg = 92.0;
  static const double minWidthSm = 76.0;

  // paddings base (filled/outlined)
  static const double paddingXLg = GiroTokens.spacing24;
  static const double paddingXSm = GiroTokens.spacing16;

  // paddings do text
  static const double paddingTextXLg = GiroTokens.spacing12;
  static const double paddingTextXSm = GiroTokens.spacing8;

  // icon
  static const double iconSize = 16.0;
  static const double iconGap = GiroTokens.spacing8;

  // icon-only
  static const double iconOnlyLg = 44.0;
  static const double iconOnlySm = 36.0;

  // shape
  static const double radius = GiroTokens.borderRadius8;

  // typography
  static const double fontSize = GiroTokens.fontSize14;
  static const FontWeight fontWeightMedium = FontWeight.w500;

  // borda outlined
  static BorderSide get outlinedBorder => const BorderSide(
        width: GiroTokens.borderWidth1,
        color: GiroTokens.colorNeutralHighDark,
      );
}
