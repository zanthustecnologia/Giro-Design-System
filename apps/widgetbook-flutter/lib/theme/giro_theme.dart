import 'package:flutter/material.dart';
import 'package:flutter_giro/tokens/tokens.dart';

class GiroTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      
      // Color Scheme
      colorScheme: ColorScheme.light(
        primary: ZanthusColors.primary,
        onPrimary: ZanthusColors.onPrimary,
        primaryContainer: ZanthusColors.primaryLight,
        onPrimaryContainer: ZanthusColors.primaryDark,
        
        secondary: ZanthusColors.secondary,
        onSecondary: ZanthusColors.onSecondary,
        secondaryContainer: ZanthusColors.secondaryLight,
        onSecondaryContainer: ZanthusColors.secondaryDark,
        
        error: ZanthusColors.error,
        onError: ZanthusColors.onError,
        errorContainer: ZanthusColors.errorLight,
        onErrorContainer: ZanthusColors.errorDark,
        
        surface: ZanthusColors.surface,
        onSurface: ZanthusColors.onSurface,
        surfaceContainerHighest: ZanthusColors.gray200,
        
        outline: ZanthusColors.gray400,
        outlineVariant: ZanthusColors.gray300,
      ),
      
      // Typography
      textTheme: TextTheme(
        displayLarge: ZanthusTypography.heading1,
        displayMedium: ZanthusTypography.heading2,
        displaySmall: ZanthusTypography.heading3,
        headlineMedium: ZanthusTypography.heading4,
        bodyLarge: ZanthusTypography.bodyLarge,
        bodyMedium: ZanthusTypography.bodyMedium,
        bodySmall: ZanthusTypography.bodySmall,
        labelLarge: ZanthusTypography.buttonText,
      ),
      
      // Components
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: ZanthusColors.primary,
          foregroundColor: ZanthusColors.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: ZanthusBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: ZanthusColors.primary,
          side: BorderSide(color: ZanthusColors.primary),
          shape: RoundedRectangleBorder(
            borderRadius: ZanthusBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: ZanthusColors.primary,
        ),
      ),
      
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: ZanthusColors.primary,
        foregroundColor: ZanthusColors.onPrimary,
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: BorderSide(color: ZanthusColors.primary, width: 2),
        ),
      ),
      
      cardTheme: CardThemeData(
        color: ZanthusColors.surface,
        shadowColor: ZanthusColors.gray400.withOpacity(0.2),
        shape: RoundedRectangleBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: ZanthusColors.gray100,
        selectedColor: ZanthusColors.primaryLight,
        labelStyle: ZanthusTypography.bodySmall,
        shape: RoundedRectangleBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusFull,
        ),
      ),
      
      dividerTheme: DividerThemeData(
        color: ZanthusColors.gray300,
        thickness: 1,
        space: ZanthusSpacing.md,
      ),
    );
  }
  
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      
      // Color Scheme
      colorScheme: ColorScheme.dark(
        primary: ZanthusColors.primary,
        onPrimary: ZanthusColors.onPrimary,
        primaryContainer: ZanthusColors.primaryDark,
        onPrimaryContainer: ZanthusColors.primaryLight,
        
        secondary: ZanthusColors.secondary,
        onSecondary: ZanthusColors.onSecondary,
        secondaryContainer: ZanthusColors.secondaryDark,
        onSecondaryContainer: ZanthusColors.secondaryLight,
        
        error: ZanthusColors.error,
        onError: ZanthusColors.onError,
        errorContainer: ZanthusColors.errorDark,
        onErrorContainer: ZanthusColors.errorLight,
        
        surface: ZanthusColors.gray900,
        onSurface: ZanthusColors.gray100,
        surfaceContainerHighest: ZanthusColors.gray800,
        
        outline: ZanthusColors.gray600,
        outlineVariant: ZanthusColors.gray700,
      ),
      
      // Typography
      textTheme: TextTheme(
        displayLarge: ZanthusTypography.heading1.copyWith(color: ZanthusColors.gray100),
        displayMedium: ZanthusTypography.heading2.copyWith(color: ZanthusColors.gray100),
        displaySmall: ZanthusTypography.heading3.copyWith(color: ZanthusColors.gray100),
        headlineMedium: ZanthusTypography.heading4.copyWith(color: ZanthusColors.gray100),
        bodyLarge: ZanthusTypography.bodyLarge.copyWith(color: ZanthusColors.gray100),
        bodyMedium: ZanthusTypography.bodyMedium.copyWith(color: ZanthusColors.gray100),
        bodySmall: ZanthusTypography.bodySmall.copyWith(color: ZanthusColors.gray100),
        labelLarge: ZanthusTypography.buttonText.copyWith(color: ZanthusColors.gray100),
      ),
      
      // Components (same as light theme)
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: ZanthusColors.primary,
          foregroundColor: ZanthusColors.onPrimary,
          shape: RoundedRectangleBorder(
            borderRadius: ZanthusBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: ZanthusColors.primary,
          side: BorderSide(color: ZanthusColors.primary),
          shape: RoundedRectangleBorder(
            borderRadius: ZanthusBorderRadius.borderRadiusMd,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: ZanthusColors.primary,
        ),
      ),
      
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: ZanthusColors.primary,
        foregroundColor: ZanthusColors.onPrimary,
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
          borderSide: BorderSide(color: ZanthusColors.primary, width: 2),
        ),
      ),
      
      cardTheme: CardThemeData(
        color: ZanthusColors.gray800,
        shadowColor: Colors.black.withOpacity(0.3),
        shape: RoundedRectangleBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusMd,
        ),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: ZanthusColors.gray800,
        selectedColor: ZanthusColors.primaryDark,
        labelStyle: ZanthusTypography.bodySmall.copyWith(color: ZanthusColors.gray100),
        shape: RoundedRectangleBorder(
          borderRadius: ZanthusBorderRadius.borderRadiusFull,
        ),
      ),
      
      dividerTheme: DividerThemeData(
        color: ZanthusColors.gray700,
        thickness: 1,
        space: ZanthusSpacing.md,
      ),
    );
  }
}
