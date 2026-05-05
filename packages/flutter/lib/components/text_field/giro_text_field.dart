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
  final bool readOnly;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final int? maxLines;
  final int? minLines;
  final VoidCallback? onTap;

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
    this.readOnly = false,
    this.prefixIcon,
    this.suffixIcon,
    this.maxLines = 1,
    this.minLines,
    this.onTap,
  });

  @override
  State<GiroTextField> createState() => _GiroTextFieldState();
}

class _GiroTextFieldState extends State<GiroTextField> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  bool _hasFocus = false;
  bool _hasText = false;
  bool _clearPending = false;

  bool get _isMultiline => widget.maxLines != 1;

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
        _controller.dispose();
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
    // Ignore focus loss triggered by tapping the clear button to avoid
    // the button disappearing before the tap is processed (race condition).
    if (_clearPending) return;
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
    _clearPending = false;
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

    final showClearButton = _hasFocus && _hasText && !widget.readOnly;

    Widget? effectiveSuffixIcon;
    if (showClearButton) {
      effectiveSuffixIcon = Listener(
        onPointerDown: (_) => _clearPending = true,
        onPointerUp: (_) => _clearPending = false,
        onPointerCancel: (_) => _clearPending = false,
        child: IconButton(
          icon: const Icon(FluentIcons.dismiss_16_regular, size: 16),
          onPressed: _clearText,
          padding: EdgeInsets.zero,
          constraints: const BoxConstraints(),
          style: IconButton.styleFrom(
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
        ),
      );
    } else if (widget.suffixIcon != null) {
      effectiveSuffixIcon = IconTheme(
        data: const IconThemeData(size: 16),
        child: widget.suffixIcon!,
      );
    }

    final textField = TextField(
      controller: _controller,
      focusNode: _focusNode,
      onChanged: widget.onChanged,
      keyboardType: widget.keyboardType,
      obscureText: widget.obscureText,
      enabled: widget.enabled,
      readOnly: widget.readOnly,
      maxLines: widget.obscureText ? 1 : widget.maxLines,
      minLines: widget.minLines,
      onTap: widget.onTap,
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
        prefixIcon: widget.prefixIcon != null
            ? IconTheme(
                data: const IconThemeData(size: 16),
                child: widget.prefixIcon!,
              )
            : null,
        suffixIcon: effectiveSuffixIcon,
        enabledBorder: isError ? errorBorder : null,
        focusedBorder: isError ? errorBorder : null,
        focusedErrorBorder: errorBorder,
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
          borderSide: const BorderSide(
            color: GiroTokens.colorNeutralHighDark,
            width: GiroTextFieldTokens.borderWidth,
          ),
        ),
      ),
    );

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
        // Single-line: fixed 44px height. Multiline: natural height.
        if (!_isMultiline)
          SizedBox(height: GiroTextFieldTokens.height, child: textField)
        else
          textField,
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
