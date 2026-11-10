import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroDialogTokens {
  GiroDialogTokens._();

  // Layout — espelha o breakpoint CSS (max-width: 1024px) do Dialog React
  static const double width = 400.0;
  static const double widthCompact = 312.0;
  static const double compactBreakpoint = 1024.0;
  static const double maxHeightFactor = 0.5; // 50vh

  // Shape
  static const double borderRadius = GiroTokens.borderRadius16;
  static const double borderWidth = GiroTokens.borderWidth1;

  // Spacing
  static const double padding = GiroTokens.spacing24;
  static const double titleGap = GiroTokens.spacing16;
  static const double descriptionGap = GiroTokens.spacing32;
  static const double actionsGap = GiroTokens.spacing16;

  // Typography
  static const String fontFamily = GiroTokens.fontFamilyPrimary;
  static const double titleFontSize = GiroTokens.fontSize20;
  static const FontWeight titleFontWeight = FontWeight.w700;
  static const double descriptionFontSize = GiroTokens.fontSize16;
  static const FontWeight descriptionFontWeight = FontWeight.w400;
  static const double descriptionLineHeight = 1.3;

  // Colors
  static const Color backgroundColor = GiroTokens.colorNeutralHighDefault;
  static const Color borderColor = GiroTokens.colorNeutralHighDark;
  static const Color titleColor = GiroTokens.colorNeutralLowDefault;
  static const Color descriptionColor = GiroTokens.colorNeutralLowDark;
  static const Color overlayColor = GiroTokens.colorNeutralLowDefault;
  static const double overlayOpacity = 0.3;
}
