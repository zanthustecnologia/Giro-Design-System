import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroDialog extends StatelessWidget {
  final String title;
  final String? content;
  final Widget? contentWidget;
  final List<Widget>? actions;

  const GiroDialog({
    super.key,
    required this.title,
    this.content,
    this.contentWidget,
    this.actions,
  });

  static Future<T?> show<T>({
    required BuildContext context,
    required String title,
    String? content,
    Widget? contentWidget,
    List<Widget>? actions,
  }) {
    return showDialog<T>(
      context: context,
      builder: (context) => GiroDialog(
        title: title,
        content: content,
        contentWidget: contentWidget,
        actions: actions,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        title,
        style: GiroTypography.heading3,
      ),
      content: contentWidget ??
          (content != null
              ? Text(
                  content!,
                  style: GiroTypography.bodyMedium,
                )
              : null),
      actions: actions,
      shape: RoundedRectangleBorder(
        borderRadius: GiroBorderRadius.borderRadiusLg,
      ),
    );
  }
}
