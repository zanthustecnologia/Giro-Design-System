import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import '../../tokens/generated_tokens.dart';
import 'select_tokens.dart';

enum GiroSelectVariant { text, icon, checkbox }

class GiroSelectItem<T> {
  final T value;
  final String label;
  final String? subTitle;
  final Widget? icon;

  const GiroSelectItem({
    required this.value,
    required this.label,
    this.subTitle,
    this.icon,
  });
}

class GiroSelect<T> extends StatefulWidget {
  final GiroSelectVariant variant;
  final String? label;
  final String? hintText;
  final String? errorText;
  final String? helperText;
  final bool required;
  final bool enabled;
  final List<T> initialSelections;
  final List<GiroSelectItem<T>> items;
  final ValueChanged<List<T>>? onSelected;
  final double? width;

  const GiroSelect({
    super.key,
    this.variant = GiroSelectVariant.text,
    this.label,
    this.hintText,
    this.errorText,
    this.helperText,
    this.required = false,
    this.enabled = true,
    this.initialSelections = const [],
    required this.items,
    this.onSelected,
    this.width,
  });

  @override
  State<GiroSelect<T>> createState() => _GiroSelectState<T>();
}

class _GiroSelectState<T> extends State<GiroSelect<T>> {
  late List<T> _selectedValues;
  bool _isOpen = false;

  @override
  void initState() {
    super.initState();
    _selectedValues = List<T>.from(widget.initialSelections);
  }

  String? get _triggerLabel {
    if (_selectedValues.isEmpty) return null;
    if (widget.variant == GiroSelectVariant.checkbox) {
      return _selectedValues
          .map((v) => _labelFor(v) ?? '')
          .where((l) => l.isNotEmpty)
          .join(', ');
    }
    return _labelFor(_selectedValues.first);
  }

  String? _labelFor(T value) {
    try {
      return widget.items.firstWhere((i) => i.value == value).label;
    } catch (_) {
      return null;
    }
  }

  void _openSheet() {
    if (!widget.enabled) return;
    setState(() => _isOpen = true);
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (ctx) => widget.variant == GiroSelectVariant.checkbox
          ? _buildCheckboxSheet(ctx)
          : _buildSingleSheet(ctx),
    ).whenComplete(() {
      if (mounted) setState(() => _isOpen = false);
    });
  }

  Widget _buildSingleSheet(BuildContext ctx) {
    return Padding(
      padding: EdgeInsets.only(
        left: GiroSelectTokens.sheetPaddingHorizontal,
        right: GiroSelectTokens.sheetPaddingHorizontal,
        top: GiroSelectTokens.sheetPaddingTop,
        bottom: GiroSelectTokens.sheetPaddingBottom +
            MediaQuery.of(ctx).viewInsets.bottom,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: widget.items.length,
            separatorBuilder: (_, __) =>
                const SizedBox(height: GiroSelectTokens.itemSpacing),
            itemBuilder: (_, index) {
              final item = widget.items[index];
              final isSelected = _selectedValues.contains(item.value);
              return InkWell(
                onTap: () {
                  Navigator.pop(ctx);
                  setState(() => _selectedValues = [item.value]);
                  widget.onSelected?.call([item.value]);
                },
                borderRadius:
                    BorderRadius.circular(GiroSelectTokens.borderRadius),
                child: Container(
                  height: GiroSelectTokens.itemHeight,
                  decoration: BoxDecoration(
                    color: isSelected
                        ? GiroSelectTokens.itemSelectedColor
                        : Colors.transparent,
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: GiroSelectTokens.sheetPaddingHorizontal,
                  ),
                  alignment: Alignment.centerLeft,
                  child: _buildItemContent(item, isSelected),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCheckboxSheet(BuildContext ctx) {
    final localSelected = List<T>.from(_selectedValues);
    return StatefulBuilder(
      builder: (ctx, setSheetState) {
        return Padding(
          padding: EdgeInsets.only(
            left: GiroSelectTokens.sheetPaddingHorizontal,
            right: GiroSelectTokens.sheetPaddingHorizontal,
            top: GiroSelectTokens.sheetPaddingTop,
            bottom: GiroSelectTokens.sheetPaddingBottom +
                MediaQuery.of(ctx).viewInsets.bottom,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: widget.items.length,
                separatorBuilder: (_, __) =>
                    const SizedBox(height: GiroSelectTokens.itemSpacing),
                itemBuilder: (_, index) {
                  final item = widget.items[index];
                  final isChecked = localSelected.contains(item.value);
                  return InkWell(
                    onTap: () {
                      setSheetState(() {
                        if (isChecked) {
                          localSelected.remove(item.value);
                        } else {
                          localSelected.add(item.value);
                        }
                      });
                      setState(() =>
                          _selectedValues = List<T>.from(localSelected));
                      widget.onSelected?.call(List<T>.from(localSelected));
                    },
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                    child: Container(
                      height: GiroSelectTokens.itemHeight,
                      padding: const EdgeInsets.symmetric(
                        horizontal: GiroSelectTokens.sheetPaddingHorizontal,
                      ),
                      child: Row(
                        children: [
                          IgnorePointer(
                            child: Checkbox(
                              value: isChecked,
                              onChanged: (_) {},
                              activeColor:
                                  GiroSelectTokens.itemSelectedTextColor,
                              materialTapTargetSize:
                                  MaterialTapTargetSize.shrinkWrap,
                              visualDensity: VisualDensity.compact,
                            ),
                          ),
                          const SizedBox(width: GiroSelectTokens.itemIconGap),
                          Expanded(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  item.label,
                                  style: GoogleFonts.getFont(
                                    GiroSelectTokens.fontFamily,
                                    fontSize: GiroSelectTokens.inputFontSize,
                                    color: GiroSelectTokens.itemTextColor,
                                  ),
                                ),
                                if (item.subTitle != null)
                                  Text(
                                    item.subTitle!,
                                    style: GoogleFonts.getFont(
                                      GiroSelectTokens.fontFamily,
                                      fontSize: GiroSelectTokens.subTextFontSize,
                                      color: GiroSelectTokens.helperTextColor,
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildItemContent(GiroSelectItem<T> item, bool isSelected) {
    final textColor = isSelected
        ? GiroSelectTokens.itemSelectedTextColor
        : GiroSelectTokens.itemTextColor;

    final labelStyle = GoogleFonts.getFont(
      GiroSelectTokens.fontFamily,
      fontSize: GiroSelectTokens.inputFontSize,
      color: textColor,
    );

    final subTitleStyle = GoogleFonts.getFont(
      GiroSelectTokens.fontFamily,
      fontSize: GiroSelectTokens.subTextFontSize,
      color: isSelected
          ? GiroSelectTokens.itemSelectedTextColor
          : GiroSelectTokens.helperTextColor,
    );

    if (widget.variant == GiroSelectVariant.icon && item.icon != null) {
      return Row(
        children: [
          IconTheme(
            data: IconThemeData(
              size: GiroSelectTokens.itemIconSize,
              color: textColor,
            ),
            child: item.icon!,
          ),
          const SizedBox(width: GiroSelectTokens.itemIconGap),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.label, style: labelStyle),
                if (item.subTitle != null)
                  Text(item.subTitle!, style: subTitleStyle),
              ],
            ),
          ),
        ],
      );
    }

    if (item.subTitle != null) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(item.label, style: labelStyle),
          Text(item.subTitle!, style: subTitleStyle),
        ],
      );
    }

    return Text(item.label, style: labelStyle);
  }

  @override
  Widget build(BuildContext context) {
    final isError = widget.errorText != null;

    final defaultBorderSide = BorderSide(
      color: isError
          ? GiroSelectTokens.borderColorError
          : GiroSelectTokens.borderColorDefault,
      width: GiroSelectTokens.borderWidth,
    );

    final focusedBorderSide = BorderSide(
      color: isError
          ? GiroSelectTokens.borderColorError
          : GiroSelectTokens.borderColorFocus,
      width: GiroSelectTokens.borderWidth,
    );

    final triggerLabel = _triggerLabel;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) ...[
          RichText(
            text: TextSpan(
              text: widget.label!,
              style: GoogleFonts.getFont(
                GiroSelectTokens.fontFamily,
                fontSize: GiroSelectTokens.labelFontSize,
                fontWeight: GiroSelectTokens.labelFontWeight,
                color: !widget.enabled
                    ? GiroTokens.colorNeutralLowLight
                    : isError
                        ? GiroSelectTokens.borderColorError
                        : GiroSelectTokens.labelColor,
              ),
              children: [
                if (widget.required)
                  TextSpan(
                    text: ' *',
                    style: GoogleFonts.getFont(
                      GiroSelectTokens.fontFamily,
                      color: isError
                          ? GiroSelectTokens.borderColorError
                          : GiroSelectTokens.requiredAsteriskColor,
                      fontSize: GiroSelectTokens.labelFontSize,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: GiroSelectTokens.labelGap),
        ],
        SizedBox(
          height: GiroSelectTokens.height,
          width: widget.width,
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: widget.enabled ? _openSheet : null,
              borderRadius:
                  BorderRadius.circular(GiroSelectTokens.borderRadius),
              child: InputDecorator(
                decoration: InputDecoration(
                  hintText: triggerLabel == null ? widget.hintText : null,
                  filled: true,
                  fillColor: widget.enabled
                      ? GiroSelectTokens.backgroundColor
                      : GiroTokens.colorNeutralHighLight,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: GiroSelectTokens.paddingHorizontal,
                    vertical: 0,
                  ),
                  suffixIcon: Padding(
                    padding: const EdgeInsets.only(
                        right: GiroSelectTokens.suffixIconPaddingRight),
                    child: IconTheme(
                      data: const IconThemeData(
                          size: GiroSelectTokens.suffixIconSize),
                      child: Icon(
                        _isOpen
                            ? FluentIcons.chevron_up_16_regular
                            : FluentIcons.chevron_down_16_regular,
                        color: widget.enabled
                            ? GiroSelectTokens.inputColor
                            : GiroTokens.colorNeutralLowLight,
                      ),
                    ),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                    borderSide: defaultBorderSide,
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                    borderSide: focusedBorderSide,
                  ),
                  disabledBorder: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                    borderSide: const BorderSide(
                      color: GiroTokens.colorNeutralHighDark,
                      width: GiroSelectTokens.borderWidth,
                    ),
                  ),
                  border: OutlineInputBorder(
                    borderRadius:
                        BorderRadius.circular(GiroSelectTokens.borderRadius),
                    borderSide: defaultBorderSide,
                  ),
                ),
                isFocused: _isOpen,
                isEmpty: triggerLabel == null,
                child: triggerLabel != null
                    ? Text(
                        triggerLabel,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.getFont(
                          GiroSelectTokens.fontFamily,
                          fontSize: GiroSelectTokens.inputFontSize,
                          color: widget.enabled
                              ? GiroSelectTokens.inputColor
                              : GiroTokens.colorNeutralLowLight,
                        ),
                      )
                    : null,
              ),
            ),
          ),
        ),
        if (widget.errorText != null || widget.helperText != null) ...[
          SizedBox(
            height: widget.errorText != null
                ? GiroSelectTokens.errorTextGap
                : GiroSelectTokens.helperTextGap,
          ),
          Text(
            widget.errorText ?? widget.helperText!,
            style: GoogleFonts.getFont(
              GiroSelectTokens.fontFamily,
              color: widget.errorText != null
                  ? GiroSelectTokens.borderColorError
                  : !widget.enabled
                      ? GiroTokens.colorNeutralLowLight
                      : GiroSelectTokens.helperTextColor,
              fontSize: GiroSelectTokens.subTextFontSize,
            ),
          ),
        ],
      ],
    );
  }
}
