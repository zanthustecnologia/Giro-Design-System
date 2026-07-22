import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:flutter_giro/flutter_giro.dart';

// Import Material 3 Pure Component Stories
import 'stories/app_bar/app_bar_story.dart';
import 'stories/avatars/avatars_story.dart';
import 'stories/badges/badges_story.dart';
import 'stories/bottom_app_bar/bottom_app_bar_story.dart';
import 'stories/bottom_sheet/bottom_sheet_story.dart';
import 'stories/buttons/buttons_story.dart';
import 'stories/cards/cards_story.dart';
import 'stories/checkbox/checkbox_story.dart';
import 'stories/chips/chips_story.dart';
import 'stories/date_picker/date_picker_story.dart';
import 'stories/dialogs/dialogs_story.dart';
import 'stories/dividers/dividers_story.dart';
import 'stories/drawer/drawer_story.dart';
import 'stories/dropdown/dropdown_story.dart';
import 'stories/fab/fab_story.dart';
import 'stories/icon_buttons/icon_buttons_story.dart';
import 'stories/list_tile/list_tile_story.dart';
import 'stories/menu/menu_story.dart';
import 'stories/navigation_rail/navigation_rail_story.dart';
import 'stories/navigation/navigation_story.dart';
import 'stories/popup_menu/popup_menu_story.dart';
import 'stories/progress/progress_story.dart';
import 'stories/slider/slider_story.dart';
import 'stories/snackbar/snackbar_story.dart';
import 'stories/tabs/tabs_story.dart';
import 'stories/radio/radio_story.dart';
import 'stories/switch/switch_story.dart';
import 'stories/select/select_story.dart';
import 'stories/text_field/text_field_story.dart';
import 'stories/time_picker/time_picker_story.dart';
import 'stories/tooltips/tooltips_story.dart';

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
                checkboxStory(),
                radioStory(),
                switchStory(),
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
                selectStory(),
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
              name: 'Giro Light',
              data: applyGiroTheme(ThemeData.light()),
            ),
            WidgetbookTheme(
              name: 'Giro Dark',
              data: applyGiroTheme(ThemeData.dark()),
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
      appBuilder: (context, child) {
        return Scaffold(
          body: Center(
            child: child,
          ),
        );
      },
    );
  }
}
