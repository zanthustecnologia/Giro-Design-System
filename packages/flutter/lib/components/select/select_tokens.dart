import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroSelectTokens {
  GiroSelectTokens._();

  // Dimensions
  static const double height = 44.0;
  static const double borderRadius = GiroTokens.borderRadius8;
  static const double borderWidth = 1.0;

  // Spacing
  static const double paddingHorizontal = GiroTokens.spacing16;
  static const double labelGap = GiroTokens.spacing4;

  // BottomSheet
  static const double itemHeight = 44.0;
  static const double itemSpacing = GiroTokens.spacing16;
  static const double itemIconSize = 20.0;
  static const double itemIconGap = GiroTokens.spacing8;
  static const double sheetPaddingHorizontal = GiroTokens.spacing16;
  static const double sheetPaddingTop = 0.0;
  static const double sheetPaddingBottom = GiroTokens.spacing16;
  static const double titleFontSize = GiroTokens.fontSize16;
  static const FontWeight titleFontWeight = FontWeight.w600;
  static const double titleGap = GiroTokens.spacing8;

  // Sub-text
  static const double subTextFontSize = GiroTokens.fontSize14;
  static const double errorTextGap = GiroTokens.spacing4;
  static const double helperTextGap = GiroTokens.spacing8;

  // Suffix icon
  static const double suffixIconSize = 16.0;
  static const double suffixIconPaddingRight = GiroTokens.spacing16;

  // Typography
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double labelFontSize = GiroTokens.fontSize12;
  static const double inputFontSize = GiroTokens.fontSize16;
  static const FontWeight labelFontWeight = FontWeight.w400;

  // Colors
  static const Color labelColor = GiroTokens.colorNeutralLowDefault;
  static const Color inputColor = GiroTokens.colorNeutralLowDefault;
  static const Color placeholderColor = GiroTokens.colorNeutralLowMedium;
  static const Color helperTextColor = GiroTokens.colorNeutralLowMedium;
  static const Color requiredAsteriskColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color backgroundColor = GiroTokens.colorNeutralHighDefault;

  // Borders
  static const Color borderColorDefault = GiroTokens.colorNeutralHighDark;
  static const Color borderColorFocus = GiroTokens.colorBrandPrimaryDefault;
  static const Color borderColorError = GiroTokens.colorFeedbackAlertDefault;

  // BottomSheet item
  static const Color itemSelectedColor = GiroTokens.colorBrandPrimaryLight;
  static const Color itemSelectedTextColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color itemTextColor = GiroTokens.colorNeutralLowDefault;
}
