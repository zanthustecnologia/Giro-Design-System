import 'package:flutter_giro/flutter_giro.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookComponent avatarsStory() {
  return WidgetbookComponent(
    name: 'Avatars',
    useCases: [
      WidgetbookUseCase(
        name: 'With Initials',
        builder: (context) {
          final initials = context.knobs.string(label: 'Initials', initialValue: 'AB');
          
          return Center(
            child: CircleAvatar(
              radius: 32,
              child: Text(initials),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'With Icon',
        builder: (context) {
          return const Center(
            child: CircleAvatar(
              radius: 32,
              child: Icon(Icons.person, size: 32),
            ),
          );
        },
      ),
      WidgetbookUseCase(
        name: 'Different Sizes',
        builder: (context) {
          return Center(
            child: Wrap(
              spacing: 16,
              alignment: WrapAlignment.center,
              children: const [
                CircleAvatar(radius: 16, child: Text('S')),
                CircleAvatar(radius: 24, child: Text('M')),
                CircleAvatar(radius: 32, child: Text('L')),
                CircleAvatar(radius: 40, child: Text('XL')),
              ],
            ),
          );
        },
      ),
    ],
  );
}
