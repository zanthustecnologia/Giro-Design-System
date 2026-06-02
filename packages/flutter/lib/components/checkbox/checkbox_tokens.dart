import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroCheckboxTokens {
  GiroCheckboxTokens._();

  // Box dimensions
  static const double boxSize = 18.0;

  // Touch area (wrapperCheckbox in React = 40x40)
  static const double touchSize = 40.0;
  static const double splashRadius = 20.0;

  // Border
  static const double borderWidth = 2.0;
  static const double borderRadius = GiroTokens.borderRadius4;

  // Typography (label)
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double fontSize = GiroTokens.fontSize16;
  static const FontWeight fontWeight = FontWeight.w400;

  // Colors — box
  static const Color boxBorderColor = GiroTokens.colorNeutralLowDark;
  static const Color checkedFillColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color checkedBorderColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color checkColor = GiroTokens.colorNeutralHighDefault;

  // Colors — disabled
  static const Color disabledBorderColor = GiroTokens.colorNeutralLowLight;
  static const Color disabledCheckedFillColor = GiroTokens.colorNeutralLowLight;

  // Colors — label
  static const Color labelColor = GiroTokens.colorNeutralLowDefault;
  static const Color labelDisabledColor = GiroTokens.colorNeutralLowLight;

  // Colors — overlay (touch area)
  static const Color overlayHoverColor = GiroTokens.colorNeutralHighMedium;
  static const Color overlayPressColor = GiroTokens.colorNeutralHighDark;
  static const Color overlayFocusColor = GiroTokens.colorNeutralHighDark;

  // Gap between checkbox and label
  static const double labelGap = GiroTokens.spacing8;
}
