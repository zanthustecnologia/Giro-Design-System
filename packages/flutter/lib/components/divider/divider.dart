import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class ZanthusDivider extends StatelessWidget {
  final double? height;
  final double? thickness;
  final Color? color;

  const ZanthusDivider({
    super.key,
    this.height,
    this.thickness,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Divider(
      height: height ?? ZanthusSpacing.md,
      thickness: thickness ?? 1.0,
      color: color ?? ZanthusColors.gray300,
    );
  }
}

class ZanthusVerticalDivider extends StatelessWidget {
  final double? width;
  final double? thickness;
  final Color? color;

  const ZanthusVerticalDivider({
    super.key,
    this.width,
    this.thickness,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return VerticalDivider(
      width: width ?? ZanthusSpacing.md,
      thickness: thickness ?? 1.0,
      color: color ?? ZanthusColors.gray300,
    );
  }
}
