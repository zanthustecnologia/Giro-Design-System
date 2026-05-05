import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import '../../tokens/generated_tokens.dart';
import 'text_field_tokens.dart';

class GiroTextField extends StatefulWidget {
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
    this.suffixIcon,
  });

  @override
  State<GiroTextField> createState() => _GiroTextFieldState();
}

class _GiroTextFieldState extends State<GiroTextField> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  bool _hasFocus = false;
  bool _hasText = false;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _focusNode = FocusNode();
    
    _hasText = _controller.text.isNotEmpty;

    _focusNode.addListener(_handleFocusChange);
    _controller.addListener(_handleTextChange);
  }

  @override
  void didUpdateWidget(GiroTextField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.controller != oldWidget.controller) {
      _controller.removeListener(_handleTextChange);
      if (oldWidget.controller == null) {
        _controller.dispose(); // Dispose local controller if we are switching to external
      }
      
      _controller = widget.controller ?? TextEditingController();
      _controller.addListener(_handleTextChange);
      _hasText = _controller.text.isNotEmpty;
    }
  }

  @override
  void dispose() {
    _focusNode.removeListener(_handleFocusChange);
    _controller.removeListener(_handleTextChange);
    _focusNode.dispose();
    if (widget.controller == null) {
      _controller.dispose();
    }
    super.dispose();
  }

  void _handleFocusChange() {
    setState(() {
      _hasFocus = _focusNode.hasFocus;
    });
  }

  void _handleTextChange() {
    setState(() {
      _hasText = _controller.text.isNotEmpty;
    });
  }

  void _clearText() {
    _controller.clear();
    widget.onChanged?.call('');
  }

  @override
  Widget build(BuildContext context) {
    final isError = widget.errorText != null;
    final errorBorder = OutlineInputBorder(
      borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
      borderSide: const BorderSide(
        color: GiroTextFieldTokens.borderColorError,
        width: GiroTextFieldTokens.borderWidth,
      ),
    );

    final showClearButton = _hasFocus && _hasText;

    Widget? effectiveSuffixIcon;
    if (showClearButton) {
      effectiveSuffixIcon = Padding(
        padding: const EdgeInsets.only(right: 8),
        child: IconButton(
          icon: const Icon(FluentIcons.dismiss_16_regular, size: 16),
          onPressed: _clearText,
        ),
      );
    } else if (widget.suffixIcon != null) {
      effectiveSuffixIcon = Padding(
        padding: const EdgeInsets.only(right: 16),
        child: IconTheme(
          data: const IconThemeData(size: 16),
          child: widget.suffixIcon!,
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) ...[
          RichText(
            text: TextSpan(
              text: widget.label!,
              style: GoogleFonts.getFont(
                GiroTextFieldTokens.fontFamily,
                fontSize: GiroTextFieldTokens.labelFontSize,
                fontWeight: GiroTextFieldTokens.labelFontWeight,
                color: widget.enabled 
                    ? GiroTextFieldTokens.labelColor 
                    : GiroTokens.colorNeutralLowLight,
              ),
              children: [
                if (widget.required)
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
            controller: _controller,
            focusNode: _focusNode,
            onChanged: widget.onChanged,
            keyboardType: widget.keyboardType,
            obscureText: widget.obscureText,
            enabled: widget.enabled,
            style: GoogleFonts.getFont(
              GiroTextFieldTokens.fontFamily,
              fontSize: GiroTextFieldTokens.inputFontSize,
              color: widget.enabled 
                  ? GiroTextFieldTokens.inputColor 
                  : GiroTokens.colorNeutralLowLight,
            ),
            decoration: InputDecoration(
              hintText: widget.hintText,
              filled: true,
              fillColor: widget.enabled
                  ? GiroTextFieldTokens.backgroundColor
                  : GiroTokens.colorNeutralHighLight,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: GiroTextFieldTokens.paddingHorizontal,
                vertical: 0,
              ),
              // Não passamos errorText aqui para evitar que o layout nativo mude a altura
              suffixIcon: effectiveSuffixIcon,
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
        if (widget.errorText != null || widget.helperText != null) ...[
           const SizedBox(height: 4),
           Text(
             widget.errorText ?? widget.helperText!,
             style: GoogleFonts.getFont(
               GiroTextFieldTokens.fontFamily,
               color: widget.errorText != null 
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
