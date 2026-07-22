import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroSwitchTokens {
  GiroSwitchTokens._();

  // Track dimensions
  static const double trackWidth = 54.0;
  static const double trackHeight = 34.0;
  static const double trackBorderRadius = GiroTokens.borderRadiusPill;
  static const double trackPadding = GiroTokens.spacing4;

  // Thumb dimensions (unselected)
  static const double thumbSize = 22.0;
  static const double thumbBorderRadius = GiroTokens.borderRadiusPill;

  // Thumb dimensions (selected)
  static const double thumbSizeChecked = 26.0;

  // Track colors — off states
  static const Color trackColor = GiroTokens.colorNeutralHighLight;
  static const Color trackHoverColor = GiroTokens.colorNeutralHighMedium;
  static const Color trackDisabledColor = GiroTokens.colorNeutralHighDark;

  // Track colors — on states
  static const Color trackCheckedColor = GiroTokens.colorBrandPrimaryDefault;
  static const Color trackCheckedHoverColor = GiroTokens.colorBrandPrimaryMedium;
  static const Color trackCheckedDisabledColor = GiroTokens.colorBrandPrimaryLight;

  // Track border (outline when off)
  static const Color trackBorderColor = GiroTokens.colorNeutralHighDark;
  static const double trackBorderWidth = 1.0;

  // Focus ring color
  static const Color focusColor = GiroTokens.colorBrandPrimaryLight;
  static const double focusBorderWidth = 2.0;

  // Thumb colors
  static const Color thumbColor = GiroTokens.colorNeutralLowMedium;
  static const Color thumbCheckedColor = GiroTokens.colorNeutralHighDefault;
}
