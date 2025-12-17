import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroTextFieldTokens {
  GiroTextFieldTokens._();

  // Dimensions
  static const double height = 44.0;
  static const double borderRadius = GiroTokens.borderRadius8;
  static const double borderWidth = 1.0; // GiroTokens.borderWidth1 is int
  
  // Spacing
  static const double paddingHorizontal = GiroTokens.spacing16;
  static const double labelGap = GiroTokens.spacing4;

  // Typography
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double labelFontSize = GiroTokens.fontSize12;
  static const double inputFontSize = GiroTokens.fontSize16;
  static const FontWeight labelFontWeight = FontWeight.w400; // Regular

  // Colors
  static const Color labelColor = GiroTokens.colorNeutralLowDefault;
  static const Color inputColor = GiroTokens.colorNeutralLowDefault;
  static const Color placeholderColor = GiroTokens.colorNeutralLowMedium; // Gray 500/600 approx
  static const Color helperTextColor = GiroTokens.colorNeutralLowMedium;
  static const Color requiredAsteriskColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color backgroundColor = GiroTokens.colorNeutralHighDefault; // White

  // Borders
  static const Color borderColorDefault = GiroTokens.colorNeutralHighDark;
  static const Color borderColorFocus = GiroTokens.colorBrandPrimaryDefault;
  static const Color borderColorError = GiroTokens.colorFeedbackAlertDefault;
}
