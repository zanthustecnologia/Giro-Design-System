import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/generated_tokens.dart';
import '../components/buttons/button_tokens.dart';
import '../components/chips/chip_tokens.dart';
import '../components/text_field/text_field_tokens.dart';

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

    // Configuração Global de Inputs
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: GiroTextFieldTokens.backgroundColor,
      contentPadding: const EdgeInsets.symmetric(
        horizontal: GiroTextFieldTokens.paddingHorizontal,
      ),
      // Borda Padrão
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
        borderSide: const BorderSide(
          color: GiroTextFieldTokens.borderColorDefault,
          width: GiroTextFieldTokens.borderWidth,
        ),
      ),
      // Borda Focada
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
        borderSide: const BorderSide(
          color: GiroTextFieldTokens.borderColorFocus,
          width: GiroTextFieldTokens.borderWidth,
        ),
      ),
      // Borda de Erro
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
        borderSide: const BorderSide(
          color: GiroTextFieldTokens.borderColorError,
          width: GiroTextFieldTokens.borderWidth,
        ),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
        borderSide: const BorderSide(
          color: GiroTextFieldTokens.borderColorError,
          width: GiroTextFieldTokens.borderWidth,
        ),
      ),
      hintStyle: GoogleFonts.getFont(
        GiroTokens.fontFamilyPrimary,
        color: GiroTextFieldTokens.placeholderColor,
        fontSize: GiroTextFieldTokens.inputFontSize,
      ),
    ),

    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor: GiroTokens.colorNeutralHighDefault,
    ),

    chipTheme: ChipThemeData(
      backgroundColor: GiroChipTokens.backgroundColor,
      selectedColor: GiroChipTokens.selectedColor,
      disabledColor: GiroChipTokens.disabledColor,
      checkmarkColor: GiroChipTokens.checkmarkColor,
      deleteIconColor: GiroChipTokens.deleteIconColor,
      labelStyle: GoogleFonts.getFont(
        GiroChipTokens.fontFamily,
        fontSize: GiroChipTokens.fontSize,
        fontWeight: GiroChipTokens.fontWeight,
        color: GiroChipTokens.labelColor,
      ),
      secondaryLabelStyle: GoogleFonts.getFont(
        GiroChipTokens.fontFamily,
        fontSize: GiroChipTokens.fontSize,
        fontWeight: GiroChipTokens.fontWeight,
        color: GiroChipTokens.selectedLabelColor,
      ),
      // padding: horizontal=8 + labelPadding: horizontal=8 = 16px total each side (no icon)
      // With avatar/deleteIcon: chip(8) + icon + labelPad(8) = 8px gap icon→text ✓
      padding: const EdgeInsets.symmetric(
        horizontal: GiroChipTokens.iconGap,
        vertical: GiroChipTokens.paddingY,
      ),
      labelPadding: const EdgeInsets.symmetric(
        horizontal: GiroChipTokens.iconGap,
      ),
      shape: const StadiumBorder(),
      side: BorderSide.none,
      iconTheme: const IconThemeData(
        size: GiroChipTokens.iconSize,
        color: GiroChipTokens.iconColor,
      ),
      elevation: GiroChipTokens.elevation,
      pressElevation: GiroChipTokens.pressElevation,
      showCheckmark: true,
    ),
  );
}
