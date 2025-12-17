import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../tokens/generated_tokens.dart';
import 'text_field_tokens.dart';

class GiroTextField extends StatelessWidget {
  final String? label;
  final String? hintText;
  final String? errorText;
  final String? helperText;
  final bool required;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;
  final bool obscureText;
  final bool enabled;
  final Widget? prefixIcon;
  final Widget? suffixIcon;

  const GiroTextField({
    super.key,
    this.label,
    this.hintText,
    this.errorText,
    this.helperText,
    this.required = false,
    this.controller,
    this.onChanged,
    this.keyboardType,
    this.obscureText = false,
    this.enabled = true,
    this.prefixIcon,
    this.suffixIcon,
  });

  @override
  Widget build(BuildContext context) {
    final isError = errorText != null;
    final errorBorder = OutlineInputBorder(
      borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
      borderSide: const BorderSide(
        color: GiroTextFieldTokens.borderColorError,
        width: GiroTextFieldTokens.borderWidth,
      ),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          RichText(
            text: TextSpan(
              text: label!,
              style: GoogleFonts.getFont(
                GiroTextFieldTokens.fontFamily,
                fontSize: GiroTextFieldTokens.labelFontSize,
                fontWeight: GiroTextFieldTokens.labelFontWeight,
                color: enabled 
                    ? GiroTextFieldTokens.labelColor 
                    : GiroTokens.colorNeutralLowLight,
              ),
              children: [
                if (required)
                  TextSpan(
                    text: ' *',
                    style: GoogleFonts.getFont(
                      GiroTextFieldTokens.fontFamily,
                      color: isError 
                          ? GiroTextFieldTokens.borderColorError 
                          : GiroTextFieldTokens.requiredAsteriskColor,
                      fontSize: GiroTextFieldTokens.labelFontSize,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: GiroTextFieldTokens.labelGap),
        ],
        SizedBox(
          height: GiroTextFieldTokens.height, // Força 44px de altura
          child: TextField(
            controller: controller,
            onChanged: onChanged,
            keyboardType: keyboardType,
            obscureText: obscureText,
            enabled: enabled,
            style: GoogleFonts.getFont(
              GiroTextFieldTokens.fontFamily,
              fontSize: GiroTextFieldTokens.inputFontSize,
              color: enabled 
                  ? GiroTextFieldTokens.inputColor 
                  : GiroTokens.colorNeutralLowLight,
            ),
            decoration: InputDecoration(
              hintText: hintText,
              filled: true,
              fillColor: enabled 
                  ? GiroTextFieldTokens.backgroundColor 
                  : GiroTokens.colorNeutralHighLight,
              // Não passamos errorText aqui para evitar que o layout nativo mude a altura
              prefixIcon: prefixIcon,
              suffixIcon: suffixIcon,
              // Sobrescrevemos as bordas manualmente se houver erro
              enabledBorder: isError ? errorBorder : null,
              focusedBorder: isError ? errorBorder : null,
              disabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
                borderSide: const BorderSide(
                  color: GiroTokens.colorNeutralHighDark,
                  width: GiroTextFieldTokens.borderWidth,
                ),
              ),
            ),
          ),
        ),
        // Mensagem de erro ou helper text renderizados externamente
        if (errorText != null || helperText != null) ...[
           const SizedBox(height: 4),
           Text(
             errorText ?? helperText!,
             style: GoogleFonts.getFont(
               GiroTextFieldTokens.fontFamily,
               color: errorText != null 
                   ? GiroTextFieldTokens.borderColorError 
                   : GiroTextFieldTokens.helperTextColor,
               fontSize: 12,
             ),
           ),
        ]
      ],
    );
  }
}
