// Helper para facilitar acesso aos tokens do Style Dictionary
import 'package:flutter/material.dart';
import 'generated_tokens.dart';

/// Cores do design system
class GiroColors {
  GiroColors._();
  
  // Brand Colors
  static const Color primary = GiroTokens.colorBrandPrimaryDefault;
  static const Color primaryDark = GiroTokens.colorBrandPrimaryDark;
  static const Color primaryLight = GiroTokens.colorBrandPrimaryLight;
  
  static const Color secondary = GiroTokens.colorBrandSecondaryDefault;
  static const Color secondaryDark = GiroTokens.colorBrandSecondaryDark;
  static const Color secondaryLight = GiroTokens.colorBrandSecondaryLight;
  
  // Neutral Colors
  static const Color onPrimary = GiroTokens.colorNeutralHighDefault;
  static const Color onSecondary = GiroTokens.colorNeutralHighDefault;
  static const Color onBackground = GiroTokens.colorNeutralLowDefault;
  static const Color onSurface = GiroTokens.colorNeutralLowDefault;
  static const Color surface = GiroTokens.colorNeutralHighDefault;
  
  static const Color gray900 = GiroTokens.colorNeutralLowDefault;
  static const Color gray800 = GiroTokens.colorNeutralLowDark;
  static const Color gray700 = GiroTokens.colorNeutralLowDark;
  static const Color gray600 = GiroTokens.colorNeutralLowMedium;
  static const Color gray500 = GiroTokens.colorNeutralLowMedium;
  static const Color gray400 = GiroTokens.colorNeutralLowLight;
  static const Color gray300 = GiroTokens.colorNeutralHighDark;
  static const Color gray200 = GiroTokens.colorNeutralHighMedium;
  static const Color gray100 = GiroTokens.colorNeutralHighLight;
  
  // Feedback Colors
  static const Color success = GiroTokens.colorFeedbackSuccessDefault;
  static const Color successDark = GiroTokens.colorFeedbackSuccessDark;
  static const Color successLight = GiroTokens.colorFeedbackSuccessLight;
  
  static const Color alert = GiroTokens.colorFeedbackAlertDefault;
  static const Color error = GiroTokens.colorFeedbackAlertDefault;
  static const Color errorDark = GiroTokens.colorFeedbackAlertDark;
  static const Color errorLight = GiroTokens.colorFeedbackAlertLight;
  static const Color onError = GiroTokens.colorNeutralHighDefault;
}

/// Espaçamentos do design system
class GiroSpacing {
  GiroSpacing._();
  
  static const double xs = GiroTokens.spacing4;
  static const double sm = GiroTokens.spacing8;
  static const double md = GiroTokens.spacing16;
  static const double lg = GiroTokens.spacing24;
  static const double xl = GiroTokens.spacing32;
  static const double xxl = GiroTokens.spacing40;
}

/// Shadows do design system
class GiroShadows {
  GiroShadows._();
  
  static final List<BoxShadow> shadowSm = sm;
  static final List<BoxShadow> shadowMd = md;
  static final List<BoxShadow> shadowLg = lg;
  
  static final List<BoxShadow> sm = [
    BoxShadow(
      color: Colors.black.withOpacity(0.1),
      blurRadius: 4,
      offset: const Offset(0, 2),
    ),
  ];
  
  static final List<BoxShadow> md = [
    BoxShadow(
      color: Colors.black.withOpacity(0.1),
      blurRadius: 8,
      offset: const Offset(0, 4),
    ),
  ];
  
  static final List<BoxShadow> lg = [
    BoxShadow(
      color: Colors.black.withOpacity(0.15),
      blurRadius: 16,
      offset: const Offset(0, 8),
    ),
  ];
}

/// Tipografia do design system
class GiroTypography {
  GiroTypography._();
  
  // Font sizes
  static const double fontSizeXs = GiroTokens.fontSize12;
  static const double fontSizeSm = GiroTokens.fontSize14;
  static const double fontSizeMd = GiroTokens.fontSize16;
  static const double fontSizeLg = GiroTokens.fontSize20;
  static const double fontSizeXl = GiroTokens.fontSize24;
  static const double fontSizeXxl = GiroTokens.fontSize32;
  
  // Font weights
  static const int fontWeightRegular = GiroTokens.fontWeightRegular;
  static const int fontWeightMedium = GiroTokens.fontWeightMedium;
  static const int fontWeightBold = GiroTokens.fontWeightBold;
  
  // Text Styles
  static const TextStyle heading1 = TextStyle(
    fontSize: GiroTokens.fontSize32,
    fontWeight: FontWeight.w700,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle heading2 = TextStyle(
    fontSize: GiroTokens.fontSize24,
    fontWeight: FontWeight.w700,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle heading3 = TextStyle(
    fontSize: GiroTokens.fontSize20,
    fontWeight: FontWeight.w700,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle heading4 = TextStyle(
    fontSize: GiroTokens.fontSize18,
    fontWeight: FontWeight.w600,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle bodyLarge = TextStyle(
    fontSize: GiroTokens.fontSize18,
    fontWeight: FontWeight.w400,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle bodyMedium = TextStyle(
    fontSize: GiroTokens.fontSize16,
    fontWeight: FontWeight.w400,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle bodySmall = TextStyle(
    fontSize: GiroTokens.fontSize14,
    fontWeight: FontWeight.w400,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle buttonText = TextStyle(
    fontSize: GiroTokens.fontSize16,
    fontWeight: FontWeight.w500,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
  
  static const TextStyle caption = TextStyle(
    fontSize: GiroTokens.fontSize12,
    fontWeight: FontWeight.w400,
    fontFamily: GiroTokens.fontFamilyPrimary,
  );
}

/// Border Radius do design system
class GiroBorderRadius {
  GiroBorderRadius._();
  
  static final BorderRadius borderRadiusSm = BorderRadius.circular(GiroTokens.borderRadius4);
  static final BorderRadius borderRadiusMd = BorderRadius.circular(GiroTokens.borderRadius8);
  static final BorderRadius borderRadiusLg = BorderRadius.circular(GiroTokens.borderRadius12);
  static final BorderRadius borderRadiusXl = BorderRadius.circular(GiroTokens.borderRadius16);
  static final BorderRadius borderRadiusFull = BorderRadius.circular(GiroTokens.borderRadiusCircular);
}
