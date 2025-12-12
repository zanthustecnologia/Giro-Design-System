import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

Widget inputStory(BuildContext context) {
  final label = context.knobs.string(
    label: 'Label',
    initialValue: 'Email',
  );

  final hint = context.knobs.string(
    label: 'Hint',
    initialValue: 'Enter your email',
  );

  final obscureText = context.knobs.boolean(
    label: 'Obscure Text',
    initialValue: false,
  );

  return Center(
    child: SizedBox(
      width: 300,
      child: ZanthusInput(
        label: label,
        hint: hint,
        obscureText: obscureText,
      ),
    ),
  );
}
