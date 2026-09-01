import 'package:flutter_test/flutter_test.dart';
import 'package:widgetbook_flutter/main.dart';

void main() {
  testWidgets('Widgetbook app renders', (tester) async {
    await tester.pumpWidget(const WidgetbookApp());
    await tester.pump();

    expect(find.byType(WidgetbookApp), findsOneWidget);
  });
}
