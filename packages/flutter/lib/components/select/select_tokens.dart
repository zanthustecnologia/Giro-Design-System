import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroSelectTokens {
  GiroSelectTokens._();

  // Trigger (mesmo padrão do TextField)
  static const double height = 44.0;
  static const double borderRadius = GiroTokens.borderRadius8;
  static const double borderWidth = 1.0;
  static const double paddingHorizontal = GiroTokens.spacing16;

  // Dropdown panel
  static const double menuBorderRadius = GiroTokens.borderRadius8;
  static const double menuElevation = 4.0;
  static const double menuMaxHeight = 320.0;
  static const double menuItemHeight = 44.0;
  static const double menuItemPaddingH = GiroTokens.spacing16;

  // Typography
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double fontSize = GiroTokens.fontSize16;
  static const double labelFontSize = GiroTokens.fontSize12;

  // Trigger colors
  static const Color backgroundColor = GiroTokens.colorNeutralHighDefault;
  static const Color borderColorDefault = GiroTokens.colorNeutralHighDark;
  static const Color borderColorFocus = GiroTokens.colorBrandPrimaryDefault;
  static const Color borderColorError = GiroTokens.colorFeedbackAlertDefault;
  static const Color textColor = GiroTokens.colorNeutralLowDefault;
  static const Color placeholderColor = GiroTokens.colorNeutralLowMedium;
  static const Color disabledBackgroundColor = GiroTokens.colorNeutralHighLight;
  static const Color disabledTextColor = GiroTokens.colorNeutralLowLight;
  static const Color iconColor = GiroTokens.colorNeutralLowDefault;

  // Menu item colors
  static const Color menuBackgroundColor = GiroTokens.colorNeutralHighDefault;
  static const Color itemTextColor = GiroTokens.colorNeutralLowDefault;
  static const Color itemHoverColor = GiroTokens.colorNeutralHighMedium;
  static const Color itemSelectedColor = GiroTokens.colorBrandPrimaryLight;
  static const Color itemSelectedTextColor = GiroTokens.colorBrandPrimaryDefault;
}
