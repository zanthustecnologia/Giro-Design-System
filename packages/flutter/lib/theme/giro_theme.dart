import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/generated_tokens.dart';
import '../components/buttons/button_tokens.dart';
import '../components/checkbox/checkbox_tokens.dart';
import '../components/chips/chip_tokens.dart';
import '../components/dialogs/dialog_tokens.dart';
import '../components/radio/radio_tokens.dart';
import '../components/switch/switch_tokens.dart';
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
      GoogleFonts.getFont(
        GiroTokens.fontFamilyPrimary,
        fontSize: GiroButtonTokens.fontSize,
        fontWeight: GiroButtonTokens.fontWeightMedium,
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
      if (states.contains(WidgetState.hovered))
        return hoverBg.withOpacity(0.12);
      if (states.contains(WidgetState.pressed))
        return pressedBg.withOpacity(0.16);
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

    dialogTheme: DialogThemeData(
      backgroundColor: GiroDialogTokens.backgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(GiroDialogTokens.borderRadius),
        side: const BorderSide(
          color: GiroDialogTokens.borderColor,
          width: GiroDialogTokens.borderWidth,
        ),
      ),
    ),

    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return states.contains(WidgetState.selected)
              ? GiroCheckboxTokens.disabledCheckedFillColor
              : Colors.transparent;
        }
        if (states.contains(WidgetState.selected)) {
          return GiroCheckboxTokens.checkedFillColor;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(GiroCheckboxTokens.checkColor),
      side: WidgetStateBorderSide.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return const BorderSide(
            color: GiroCheckboxTokens.disabledBorderColor,
            width: GiroCheckboxTokens.borderWidth,
          );
        }
        if (states.contains(WidgetState.selected)) {
          return const BorderSide(
            color: GiroCheckboxTokens.checkedBorderColor,
            width: GiroCheckboxTokens.borderWidth,
          );
        }
        return const BorderSide(
          color: GiroCheckboxTokens.boxBorderColor,
          width: GiroCheckboxTokens.borderWidth,
        );
      }),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(GiroCheckboxTokens.borderRadius),
      ),
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return Colors.transparent;
        if (states.contains(WidgetState.pressed)) {
          return GiroCheckboxTokens.overlayPressColor;
        }
        if (states.contains(WidgetState.focused)) {
          return GiroCheckboxTokens.overlayFocusColor;
        }
        if (states.contains(WidgetState.hovered)) {
          return GiroCheckboxTokens.overlayHoverColor;
        }
        return Colors.transparent;
      }),
      splashRadius: GiroCheckboxTokens.splashRadius,
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      visualDensity: VisualDensity.compact,
    ),

    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          return GiroRadioTokens.disabledFillColor;
        }
        if (states.contains(WidgetState.selected)) {
          return GiroRadioTokens.fillColor;
        }
        return GiroRadioTokens.borderColor;
      }),
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return Colors.transparent;
        if (states.contains(WidgetState.pressed)) {
          return GiroRadioTokens.overlayPressColor;
        }
        if (states.contains(WidgetState.focused)) {
          return GiroRadioTokens.overlayFocusColor;
        }
        if (states.contains(WidgetState.hovered)) {
          return GiroRadioTokens.overlayHoverColor;
        }
        return Colors.transparent;
      }),
      splashRadius: GiroRadioTokens.splashRadius,
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      visualDensity: VisualDensity.compact,
    ),

    switchTheme: SwitchThemeData(
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) {
          if (states.contains(WidgetState.selected)) {
            return GiroSwitchTokens.trackCheckedDisabledColor;
          }
          return GiroSwitchTokens.trackDisabledColor;
        }
        if (states.contains(WidgetState.selected)) {
          if (states.contains(WidgetState.hovered)) {
            return GiroSwitchTokens.trackCheckedHoverColor;
          }
          return GiroSwitchTokens.trackCheckedColor;
        }
        if (states.contains(WidgetState.hovered)) {
          return GiroSwitchTokens.trackHoverColor;
        }
        return GiroSwitchTokens.trackColor;
      }),
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return GiroSwitchTokens.thumbCheckedColor;
        }
        return GiroSwitchTokens.thumbColor;
      }),
      trackOutlineColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) return Colors.transparent;
        if (states.contains(WidgetState.disabled)) return Colors.transparent;
        return GiroSwitchTokens.trackBorderColor;
      }),
      trackOutlineWidth:
          WidgetStateProperty.all(GiroSwitchTokens.trackBorderWidth),
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return Colors.transparent;
        if (states.contains(WidgetState.pressed)) {
          return GiroSwitchTokens.focusColor.withValues(alpha: 0.2);
        }
        if (states.contains(WidgetState.focused)) {
          return GiroSwitchTokens.focusColor.withValues(alpha: 0.2);
        }
        return Colors.transparent;
      }),
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
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
