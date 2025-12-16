import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent iconButtonsStory() {
  return WidgetbookComponent(
    name: 'Icon Buttons',
    useCases: [
      WidgetbookUseCase(
        name: 'IconButton',
        builder: (context) {
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: IconButton(
              onPressed: disabled ? null : () {},
              icon: const Icon(Icons.favorite),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'IconButton.filled',
        builder: (context) {
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: IconButton.filled(
              onPressed: disabled ? null : () {},
              icon: const Icon(Icons.favorite),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'IconButton.filledTonal',
        builder: (context) {
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: IconButton.filledTonal(
              onPressed: disabled ? null : () {},
              icon: const Icon(Icons.favorite),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'IconButton.outlined',
        builder: (context) {
          final disabled = context.knobs.boolean(label: 'Disabled');
          
          return Center(
            child: IconButton.outlined(
              onPressed: disabled ? null : () {},
              icon: const Icon(Icons.favorite),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'All Variants',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 16,
              runSpacing: 16,
              alignment: WrapAlignment.center,
              children: [
                IconButton(onPressed: () {}, icon: const Icon(Icons.favorite)),
                IconButton.filled(onPressed: () {}, icon: const Icon(Icons.favorite)),
                IconButton.filledTonal(onPressed: () {}, icon: const Icon(Icons.favorite)),
                IconButton.outlined(onPressed: () {}, icon: const Icon(Icons.favorite)),
              ],
            ),
          );
        },
      ),
    ],
  );
}
