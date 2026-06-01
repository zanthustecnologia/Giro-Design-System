import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroChipTokens {
  GiroChipTokens._();

  // Shape
  static const double radius = GiroTokens.borderRadiusPill;

  // Spacing — paddingY = 6.0 targets 30px chip height (6*2 + ~18 label)
  static const double paddingX = GiroTokens.spacing16;
  static const double paddingY = 6.0;

  // Typography
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double fontSize = GiroTokens.fontSize14;
  static const FontWeight fontWeight = FontWeight.w500;

  // Icon
  static const double iconSize = 16.0;
  static const double iconGap = GiroTokens.spacing8;
  static const Color iconColor = GiroTokens.colorNeutralLowDefault;

  // Border — none (matches React, no border)
  // Colors — default/neutral
  static const Color backgroundColor = GiroTokens.colorNeutralHighMedium;
  static const Color labelColor = GiroTokens.colorNeutralLowDefault;

  // Colors — selected (brand)
  static const Color selectedColor = GiroTokens.colorBrandPrimaryLight;
  static const Color selectedLabelColor = GiroTokens.colorBrandPrimaryDark;
  static const Color checkmarkColor = GiroTokens.colorBrandPrimaryDefault;

  // Colors — disabled
  static const Color disabledColor = GiroTokens.colorNeutralHighLight;
  static const Color disabledLabelColor = GiroTokens.colorNeutralLowLight;

  // Colors — delete icon (InputChip)
  static const Color deleteIconColor = GiroTokens.colorNeutralLowMedium;

  // Elevation
  static const double elevation = 0.0;
  static const double pressElevation = 0.0;
}
