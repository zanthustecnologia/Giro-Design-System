import 'package:flutter/material.dart';
import '../tokens/generated_tokens.dart';
import '../components/buttons/button_tokens.dart';

ButtonStyle _baseStyle({
  required Color fg,
  required Color bg,
  required Color hoverBg,
  required Color pressedBg,
  required Color disabledFg,
  required Color disabledBg,
  BorderSide? side,
}) {
  return ButtonStyle(
    textStyle: WidgetStateProperty.all(
      TextStyle(
        fontSize: GiroButtonTokens.fontSize,
        fontWeight: GiroButtonTokens.fontWeightMedium,
        fontFamily: GiroTokens.fontFamilyPrimary,
        height: 1.0, // Important for vertical alignment
      ),
    ),

    shape: WidgetStateProperty.all(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(GiroButtonTokens.radius),
      ),
    ),

    foregroundColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) return disabledFg;
      return fg;
    }),

    backgroundColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.disabled)) return disabledBg;
      if (states.contains(WidgetState.pressed)) return pressedBg;
      if (states.contains(WidgetState.hovered)) return hoverBg;
      return bg;
    }),

    overlayColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.hovered)) return hoverBg.withOpacity(0.12);
      if (states.contains(WidgetState.pressed)) return pressedBg.withOpacity(0.16);
      return null;
    }),

    side: side == null ? null : WidgetStateProperty.all(side),

    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    elevation: WidgetStateProperty.all(0), // Flat buttons

    // Default to Large size for native buttons
    minimumSize: WidgetStateProperty.all(
      const Size(GiroButtonTokens.minWidthLg, GiroButtonTokens.heightLg),
    ),
    maximumSize: WidgetStateProperty.all(
      const Size(double.infinity, GiroButtonTokens.heightLg),
    ),
    padding: WidgetStateProperty.all(
      const EdgeInsets.symmetric(horizontal: GiroButtonTokens.paddingXLg),
    ),
  );
}

/// Use no produto: ThemeData theme = applyGiroTheme(ThemeData());
ThemeData applyGiroTheme(ThemeData base) {
  return base.copyWith(
    useMaterial3: true,

    filledButtonTheme: FilledButtonThemeData(
      style: _baseStyle(
        fg: GiroTokens.colorNeutralHighLight,
        bg: GiroTokens.colorBrandPrimaryDefault,
        hoverBg: GiroTokens.colorBrandPrimaryMedium,
        pressedBg: GiroTokens.colorBrandPrimaryDark,
        disabledBg: GiroTokens.colorNeutralHighLight,
        disabledFg: GiroTokens.colorNeutralLowLight,
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: _baseStyle(
        fg: GiroTokens.colorBrandPrimaryDefault,
        bg: GiroTokens.colorNeutralHighDefault,
        hoverBg: GiroTokens.colorNeutralHighMedium,
        pressedBg: GiroTokens.colorNeutralHighDark,
        disabledBg: GiroTokens.colorNeutralHighDefault,
        disabledFg: GiroTokens.colorNeutralHighDark,
        side: GiroButtonTokens.outlinedBorder,
      ),
    ),

    textButtonTheme: TextButtonThemeData(
      style: _baseStyle(
        fg: GiroTokens.colorBrandPrimaryDefault,
        bg: Colors.transparent,
        hoverBg: GiroTokens.colorNeutralHighMedium,
        pressedBg: GiroTokens.colorNeutralHighDark,
        disabledBg: Colors.transparent,
        disabledFg: GiroTokens.colorNeutralHighDark,
      ).copyWith(
        backgroundColor: WidgetStateProperty.all(Colors.transparent),
      ),
    ),
  );
}
