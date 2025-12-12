import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

// Import Material 3 Pure Component Stories
import 'stories/app_bar_story.dart';
import 'stories/avatars_story.dart';
import 'stories/badges_story.dart';
import 'stories/bottom_app_bar_story.dart';
import 'stories/bottom_sheet_story.dart';
import 'stories/buttons_story.dart';
import 'stories/cards_story.dart';
import 'stories/chips_story.dart';
import 'stories/date_picker_story.dart';
import 'stories/dialogs_story.dart';
import 'stories/dividers_story.dart';
import 'stories/drawer_story.dart';
import 'stories/dropdown_story.dart';
import 'stories/fab_story.dart';
import 'stories/icon_buttons_story.dart';
import 'stories/list_tile_story.dart';
import 'stories/menu_story.dart';
import 'stories/navigation_rail_story.dart';
import 'stories/navigation_story.dart';
import 'stories/popup_menu_story.dart';
import 'stories/progress_story.dart';
import 'stories/selection_controls_story.dart';
import 'stories/slider_story.dart';
import 'stories/snackbar_story.dart';
import 'stories/tabs_story.dart';
import 'stories/text_field_story.dart';
import 'stories/time_picker_story.dart';
import 'stories/tooltips_story.dart';

void main() {
  runApp(const WidgetbookApp());
}

class WidgetbookApp extends StatelessWidget {
  const WidgetbookApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Widgetbook.material(
      directories: [
        WidgetbookCategory(
          name: 'Material 3 Components',
          children: [
            // Actions
            WidgetbookFolder(
              name: 'Actions',
              children: [
                buttonsStory(),
                fabStory(),
                iconButtonsStory(),
              ],
            ),

            // Communication
            WidgetbookFolder(
              name: 'Communication',
              children: [
                dialogsStory(),
                snackbarStory(),
                progressStory(),
              ],
            ),

            // Containment
            WidgetbookFolder(
              name: 'Containment',
              children: [
                cardsStory(),
                bottomSheetStory(),
                drawerStory(),
                dividersStory(),
              ],
            ),

            // Navigation
            WidgetbookFolder(
              name: 'Navigation',
              children: [
                appBarStory(),
                bottomAppBarStory(),
                navigationStory(),
                navigationRailStory(),
                tabsStory(),
              ],
            ),

            // Selection
            WidgetbookFolder(
              name: 'Selection',
              children: [
                selectionControlsStory(),
                chipsStory(),
                sliderStory(),
                datePickerStory(),
                timePickerStory(),
                dropdownStory(),
                menuStory(),
                popupMenuStory(),
              ],
            ),

            // Input
            WidgetbookFolder(
              name: 'Input',
              children: [
                textFieldStory(),
              ],
            ),

            // Data Display
            WidgetbookFolder(
              name: 'Data Display',
              children: [
                listTileStory(),
                badgesStory(),
                avatarsStory(),
                tooltipsStory(),
              ],
            ),
          ],
        ),
      ],
      addons: [
        MaterialThemeAddon(
          themes: [
            WidgetbookTheme(
              name: 'Light',
              data: ThemeData.light(useMaterial3: true),
            ),
            WidgetbookTheme(
              name: 'Dark',
              data: ThemeData.dark(useMaterial3: true),
            ),
          ],
        ),
        DeviceFrameAddon(
          devices: [
            Devices.ios.iPhone13,
            Devices.android.samsungGalaxyS20,
            Devices.windows.wideMonitor,
          ],
        ),
        TextScaleAddon(
          scales: const [1.0, 1.5, 2.0],
        ),
      ],
    );
  }
}
