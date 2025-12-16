import 'package:flutter/material.dart';
import 'package:flutter_giro/tokens/tokens.dart';

class GiroTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      
      // Color Scheme
      colorScheme: ColorScheme.light(
        primary: GiroColors.primary,
        onPrimary: GiroColors.onPrimary,
        primaryContainer: GiroColors.primaryLight,
        onPrimaryContainer: GiroColors.primaryDark,
        
        secondary: GiroColors.secondary,
        onSecondary: GiroColors.onSecondary,
        secondaryContainer: GiroColors.secondaryLight,
        onSecondaryContainer: GiroColors.secondaryDark,
        
        error: GiroColors.error,
        onError: GiroColors.onError,
        errorContainer: GiroColors.errorLight,
        onErrorContainer: GiroColors.errorDark,
        
        surface: GiroColors.surface,
        onSurface: GiroColors.onSurface,
        surfaceContainerHighest: GiroColors.gray200,
        
        outline: GiroColors.gray400,
        outlineVariant: GiroColors.gray300,
      ),
      
      // Typography
      textTheme: TextTheme(
        displayLarge: GiroTypography.heading1,
        displayMedium: GiroTypography.heading2,
        displaySmall: GiroTypography.heading3,
        headlineMedium: GiroTypography.heading4,
        bodyLarge: GiroTypography.bodyLarge,
        bodyMedium: GiroTypography.bodyMedium,
        bodySmall: GiroTypography.bodySmall,
        labelLarge: GiroTypography.buttonText,
      ),
      
      // Components
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: GiroColors.primary,
          foregroundColor: GiroColors.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: GiroBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: GiroColors.primary,
          side: BorderSide(color: GiroColors.primary),
          shape: RoundedRectangleBorder(
            borderRadius: GiroBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: GiroColors.primary,
        ),
      ),
      
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: GiroColors.primary,
        foregroundColor: GiroColors.onPrimary,
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
          borderSide: BorderSide(color: GiroColors.primary, width: 2),
        ),
      ),
      
      cardTheme: CardThemeData(
        color: GiroColors.surface,
        shadowColor: GiroColors.gray400.withOpacity(0.2),
        shape: RoundedRectangleBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: GiroColors.gray100,
        selectedColor: GiroColors.primaryLight,
        labelStyle: GiroTypography.bodySmall,
        shape: RoundedRectangleBorder(
          borderRadius: GiroBorderRadius.borderRadiusFull,
        ),
      ),
      
      dividerTheme: DividerThemeData(
        color: GiroColors.gray300,
        thickness: 1,
        space: GiroSpacing.md,
      ),
    );
  }
  
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      
      // Color Scheme
      colorScheme: ColorScheme.dark(
        primary: GiroColors.primary,
        onPrimary: GiroColors.onPrimary,
        primaryContainer: GiroColors.primaryDark,
        onPrimaryContainer: GiroColors.primaryLight,
        
        secondary: GiroColors.secondary,
        onSecondary: GiroColors.onSecondary,
        secondaryContainer: GiroColors.secondaryDark,
        onSecondaryContainer: GiroColors.secondaryLight,
        
        error: GiroColors.error,
        onError: GiroColors.onError,
        errorContainer: GiroColors.errorDark,
        onErrorContainer: GiroColors.errorLight,
        
        surface: GiroColors.gray900,
        onSurface: GiroColors.gray100,
        surfaceContainerHighest: GiroColors.gray800,
        
        outline: GiroColors.gray600,
        outlineVariant: GiroColors.gray700,
      ),
      
      // Typography
      textTheme: TextTheme(
        displayLarge: GiroTypography.heading1.copyWith(color: GiroColors.gray100),
        displayMedium: GiroTypography.heading2.copyWith(color: GiroColors.gray100),
        displaySmall: GiroTypography.heading3.copyWith(color: GiroColors.gray100),
        headlineMedium: GiroTypography.heading4.copyWith(color: GiroColors.gray100),
        bodyLarge: GiroTypography.bodyLarge.copyWith(color: GiroColors.gray100),
        bodyMedium: GiroTypography.bodyMedium.copyWith(color: GiroColors.gray100),
        bodySmall: GiroTypography.bodySmall.copyWith(color: GiroColors.gray100),
        labelLarge: GiroTypography.buttonText.copyWith(color: GiroColors.gray100),
      ),
      
      // Components (same as light theme)
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: GiroColors.primary,
          foregroundColor: GiroColors.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: GiroBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: GiroColors.primary,
          side: BorderSide(color: GiroColors.primary),
          shape: RoundedRectangleBorder(
            borderRadius: GiroBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: GiroColors.primary,
        ),
      ),
      
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: GiroColors.primary,
        foregroundColor: GiroColors.onPrimary,
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
          borderSide: BorderSide(color: GiroColors.primary, width: 2),
        ),
      ),
      
      cardTheme: CardThemeData(
        color: GiroColors.gray800,
        shadowColor: Colors.black.withOpacity(0.3),
        shape: RoundedRectangleBorder(
          borderRadius: GiroBorderRadius.borderRadiusMd,
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: GiroColors.gray800,
        selectedColor: GiroColors.primaryDark,
        labelStyle: GiroTypography.bodySmall.copyWith(color: GiroColors.gray100),
        shape: RoundedRectangleBorder(
          borderRadius: GiroBorderRadius.borderRadiusFull,
        ),
      ),
      
      dividerTheme: DividerThemeData(
        color: GiroColors.gray700,
        thickness: 1,
        space: GiroSpacing.md,
      ),
    );
  }
}

