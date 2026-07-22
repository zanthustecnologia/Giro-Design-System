import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroRadioTokens {
  GiroRadioTokens._();

  // Box dimensions (item in React = 20x20)
  static const double boxSize = 20.0;

  // Touch area (itemWrapper in React = 40x40)
  static const double touchSize = 40.0;
  static const double splashRadius = 20.0;

  // Border
  static const double borderWidth = 2.0;

  // Colors — circle border
  static const Color borderColor = GiroTokens.colorNeutralLowDark;
  static const Color checkedBorderColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color disabledBorderColor = GiroTokens.colorNeutralLowLight;

  // Colors — fill dot (indicator)
  static const Color fillColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color disabledFillColor = GiroTokens.colorNeutralLowLight;

  // Colors — label
  static const Color labelColor = GiroTokens.colorNeutralLowDefault;
  static const Color labelDisabledColor = GiroTokens.colorNeutralLowLight;

  // Colors — overlay (touch area)
  static const Color overlayHoverColor = GiroTokens.colorNeutralHighMedium;
  static const Color overlayPressColor = GiroTokens.colorNeutralHighDark;
  static const Color overlayFocusColor = GiroTokens.colorNeutralHighDark;

  // Gap between radio and label
  static const double labelGap = GiroTokens.spacing8;

  // Typography (label)
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double fontSize = GiroTokens.fontSize16;
  static const FontWeight fontWeight = FontWeight.w400;
}
