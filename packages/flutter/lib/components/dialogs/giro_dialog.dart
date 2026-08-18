import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../buttons/giro_button.dart';
import '../../types/giro_types.dart';
import 'dialog_tokens.dart';

/// Dialog do Design System: título + descrição + até 2 ações (primária/secundária).
///
/// Reflete as regras do Dialog React: ação secundária (outlined) só aparece
/// quando [textSecondaryAction] é informado; a primária (filled) é sempre exibida.
/// Para casos fora desse padrão, use os widgets nativos re-exportados em
/// `dialogs.dart` (AlertDialog, SimpleDialog).
class GiroDialog extends StatelessWidget {
  const GiroDialog({
    required this.textPrimaryAction,
    required this.onPrimaryAction,
    super.key,
    this.title,
    this.bodyContent,
    this.textSecondaryAction,
    this.onSecondaryAction,
  });

  final String? title;
  final String? bodyContent;
  final String textPrimaryAction;
  final String? textSecondaryAction;
  final VoidCallback onPrimaryAction;
  final VoidCallback? onSecondaryAction;

  bool get _hasSecondaryAction =>
      textSecondaryAction != null && textSecondaryAction!.trim().isNotEmpty;

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.sizeOf(context);
    final dialogWidth = screenSize.width <= GiroDialogTokens.compactBreakpoint
        ? GiroDialogTokens.widthCompact
        : GiroDialogTokens.width;

    return Dialog(
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: dialogWidth,
          maxHeight: screenSize.height * GiroDialogTokens.maxHeightFactor,
        ),
        child: Padding(
          padding: const EdgeInsets.all(GiroDialogTokens.padding),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (title != null) ...[
                Text(
                  title!,
                  style: GoogleFonts.getFont(
                    GiroDialogTokens.fontFamily,
                    fontSize: GiroDialogTokens.titleFontSize,
                    fontWeight: GiroDialogTokens.titleFontWeight,
                    color: GiroDialogTokens.titleColor,
                  ),
                ),
                const SizedBox(height: GiroDialogTokens.titleGap),
              ],
              if (bodyContent != null) ...[
                Flexible(
                  child: SingleChildScrollView(
                    child: Text(
                      bodyContent!,
                      style: GoogleFonts.getFont(
                        GiroDialogTokens.fontFamily,
                        fontSize: GiroDialogTokens.descriptionFontSize,
                        fontWeight: GiroDialogTokens.descriptionFontWeight,
                        color: GiroDialogTokens.descriptionColor,
                        height: GiroDialogTokens.descriptionLineHeight,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: GiroDialogTokens.descriptionGap),
              ],
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_hasSecondaryAction) ...[
                    GiroButton.outlined(
                      text: textSecondaryAction!,
                      size: GiroSize.lg,
                      onPressed: onSecondaryAction,
                    ),
                    const SizedBox(width: GiroDialogTokens.actionsGap),
                  ],
                  GiroButton.filled(
                    text: textPrimaryAction,
                    size: GiroSize.lg,
                    onPressed: onPrimaryAction,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Exibe o [GiroDialog] via `showDialog`, aplicando o overlay do Design System.
Future<T?> showGiroDialog<T>({
  required BuildContext context,
  required String textPrimaryAction,
  String? title,
  String? bodyContent,
  String? textSecondaryAction,
  VoidCallback? onPrimaryAction,
  VoidCallback? onSecondaryAction,
  bool barrierDismissible = true,
}) {
  return showDialog<T>(
    context: context,
    barrierDismissible: barrierDismissible,
    barrierColor:
        GiroDialogTokens.overlayColor.withValues(alpha: GiroDialogTokens.overlayOpacity),
    builder: (dialogContext) => GiroDialog(
      title: title,
      bodyContent: bodyContent,
      textPrimaryAction: textPrimaryAction,
      textSecondaryAction: textSecondaryAction,
      onPrimaryAction: onPrimaryAction ?? () => Navigator.of(dialogContext).pop(),
      onSecondaryAction: onSecondaryAction ?? () => Navigator.of(dialogContext).pop(),
    ),
  );
}
