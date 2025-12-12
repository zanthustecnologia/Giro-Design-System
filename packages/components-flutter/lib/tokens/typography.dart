import 'package:flutter/material.dart';

/// Design tokens for typography
/// These will be populated from the tokens package later
class ZanthusTypography {
  ZanthusTypography._();

  // Font families
  static const String fontFamily = 'Inter';

  // Font sizes
  static const double fontSizeXs = 12.0;
  static const double fontSizeSm = 14.0;
  static const double fontSizeMd = 16.0;
  static const double fontSizeLg = 18.0;
  static const double fontSizeXl = 20.0;
  static const double fontSize2xl = 24.0;
  static const double fontSize3xl = 30.0;
  static const double fontSize4xl = 36.0;

  // Font weights
  static const FontWeight fontWeightRegular = FontWeight.w400;
  static const FontWeight fontWeightMedium = FontWeight.w500;
  static const FontWeight fontWeightSemibold = FontWeight.w600;
  static const FontWeight fontWeightBold = FontWeight.w700;

  // Line heights
  static const double lineHeightTight = 1.2;
  static const double lineHeightNormal = 1.5;
  static const double lineHeightRelaxed = 1.75;

  // Text styles
  static const TextStyle heading1 = TextStyle(
    fontSize: fontSize4xl,
    fontWeight: fontWeightBold,
    height: lineHeightTight,
    fontFamily: fontFamily,
  );

  static const TextStyle heading2 = TextStyle(
    fontSize: fontSize3xl,
    fontWeight: fontWeightBold,
    height: lineHeightTight,
    fontFamily: fontFamily,
  );

  static const TextStyle heading3 = TextStyle(
    fontSize: fontSize2xl,
    fontWeight: fontWeightSemibold,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );

  static const TextStyle heading4 = TextStyle(
    fontSize: fontSizeXl,
    fontWeight: fontWeightSemibold,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );

  static const TextStyle bodyLarge = TextStyle(
    fontSize: fontSizeLg,
    fontWeight: fontWeightRegular,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );

  static const TextStyle bodyMedium = TextStyle(
    fontSize: fontSizeMd,
    fontWeight: fontWeightRegular,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );

  static const TextStyle bodySmall = TextStyle(
    fontSize: fontSizeSm,
    fontWeight: fontWeightRegular,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );

  static const TextStyle caption = TextStyle(
    fontSize: fontSizeXs,
    fontWeight: fontWeightRegular,
    height: lineHeightNormal,
    fontFamily: fontFamily,
  );
}
