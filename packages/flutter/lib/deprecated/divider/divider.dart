import 'package:flutter/material.dart';
import '../../tokens/tokens.dart';

class GiroDivider extends StatelessWidget {
  final double? height;
  final double? thickness;
  final Color? color;

  const GiroDivider({
    super.key,
    this.height,
    this.thickness,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Divider(
      height: height ?? GiroSpacing.md,
      thickness: thickness ?? 1.0,
      color: color ?? GiroColors.gray300,
    );
  }
}

class GiroVerticalDivider extends StatelessWidget {
  final double? width;
  final double? thickness;
  final Color? color;

  const GiroVerticalDivider({
    super.key,
    this.width,
    this.thickness,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return VerticalDivider(
      width: width ?? GiroSpacing.md,
      thickness: thickness ?? 1.0,
      color: color ?? GiroColors.gray300,
    );
  }
}
