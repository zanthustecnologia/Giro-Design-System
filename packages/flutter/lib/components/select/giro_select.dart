import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import '../../tokens/generated_tokens.dart';
import 'select_tokens.dart';

class GiroSelectItem {
  final String value;
  final String label;

  const GiroSelectItem({required this.value, required this.label});
}

class GiroSelect extends StatelessWidget {
  final String? label;
  final String? hintText;
  final String? errorText;
  final String? helperText;
  final bool required;
  final bool enabled;
  final String? initialSelection;
  final List<GiroSelectItem> items;
  final ValueChanged<String?>? onSelected;
  final bool enableSearch;
  final double? width;

  const GiroSelect({
    super.key,
    this.label,
    this.hintText,
    this.errorText,
    this.helperText,
    this.required = false,
    this.enabled = true,
    this.initialSelection,
    required this.items,
    this.onSelected,
    this.enableSearch = false,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    final isError = errorText != null;

    final entries = items
        .map((item) => DropdownMenuEntry<String>(
              value: item.value,
              label: item.label,
            ))
        .toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          RichText(
            text: TextSpan(
              text: label!,
              style: GoogleFonts.getFont(
                GiroSelectTokens.fontFamily,
                fontSize: GiroSelectTokens.labelFontSize,
                fontWeight: FontWeight.w400,
                color: !enabled
                    ? GiroTokens.colorNeutralLowLight
                    : isError
                        ? GiroSelectTokens.borderColorError
                        : GiroSelectTokens.textColor,
              ),
              children: [
                if (required)
                  TextSpan(
                    text: ' *',
                    style: GoogleFonts.getFont(
                      GiroSelectTokens.fontFamily,
                      color: isError
                          ? GiroSelectTokens.borderColorError
                          : GiroSelectTokens.borderColorFocus,
                      fontSize: GiroSelectTokens.labelFontSize,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: GiroTokens.spacing4),
        ],
        Opacity(
          opacity: enabled ? 1.0 : 0.6,
          child: DropdownMenu<String>(
            width: width,
            hintText: hintText,
            enabled: enabled,
            errorText: errorText,
            initialSelection: initialSelection,
            enableSearch: enableSearch,
            enableFilter: enableSearch,
            trailingIcon: const Icon(FluentIcons.chevron_down_16_regular, size: 16),
            selectedTrailingIcon: const Icon(FluentIcons.chevron_up_16_regular, size: 16),
            dropdownMenuEntries: entries,
            onSelected: onSelected,
            inputDecorationTheme: isError
                ? const InputDecorationTheme(
                    errorStyle: TextStyle(fontSize: 0, height: 0),
                  )
                : enabled
                    ? null
                    : const InputDecorationTheme(
                        filled: true,
                        fillColor: GiroSelectTokens.backgroundColor,
                        disabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.all(
                            Radius.circular(GiroSelectTokens.borderRadius),
                          ),
                          borderSide: BorderSide(
                            color: GiroSelectTokens.borderColorDefault,
                            width: GiroSelectTokens.borderWidth,
                          ),
                        ),
                      ),
          ),
        ),
        if (isError || (helperText != null && !isError)) ...[
          SizedBox(height: isError ? 4 : 8),
          Text(
            isError ? errorText! : helperText!,
            style: GoogleFonts.getFont(
              GiroSelectTokens.fontFamily,
              fontSize: 14,
              color: isError
                  ? GiroSelectTokens.borderColorError
                  : !enabled
                      ? GiroTokens.colorNeutralLowLight
                      : GiroSelectTokens.placeholderColor,
            ),
          ),
        ],
      ],
    );
  }
}
