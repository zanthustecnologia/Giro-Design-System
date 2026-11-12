import 'package:flutter_test/flutter_test.dart';
import 'package:widgetbook_flutter/main.dart';

void main() {
  testWidgets('renders the Giro Widgetbook', (WidgetTester tester) async {
    await tester.pumpWidget(const WidgetbookApp());

    expect(find.byType(WidgetbookApp), findsOneWidget);
  });
}
