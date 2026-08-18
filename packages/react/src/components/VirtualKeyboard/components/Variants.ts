import type { VirtualKeyboardType } from '../VirtualKeyboard.types';

const EMOTICON_KEY = '{emoticon}';
const DOWN_KEYBOARD_KEY = '{downkeyboard}';
const ENTER_KEY = '{enter}';

const removeKeyFromLayout = (layout: Record<string, string[]>, key: string) =>
  Object.fromEntries(
    Object.entries(layout).map(([layoutName, rows]) => [
      layoutName,
      rows.map((row) => row.split(key).join(' ').replace(/\s+/g, ' ').trim()),
    ])
  ) as Record<string, string[]>;

const replaceKeyWithBlank = (layout: Record<string, string[]>, key: string) =>
  Object.fromEntries(
    Object.entries(layout).map(([layoutName, rows]) => [
      layoutName,
      rows.map((row) => row.split(key).join('{//}')),
    ])
  ) as Record<string, string[]>;

const QWERTY_LOWERCASE = [
  '1 2 3 4 5 6 7 8 9 0',
  'q w e r t y u i o p',
  'a s d f g h j k l ç',
  '{shift} z x c v b n m {bksp}',
  '{numbers} {alt} {space} . {enter}',
];

const NUMPAD = ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'];

const SHARED_LAYOUTS = {
  shift: [
    '1 2 3 4 5 6 7 8 9 0',
    'Q W E R T Y U I O P',
    'A S D F G H J K L Ç',
    '{capslock} Z X C V B N M {bksp}',
    '{numbers} {alt} {emoticon} {space} . {enter}',
  ],
  caps: [
    '1 2 3 4 5 6 7 8 9 0',
    'Q W E R T Y U I O P',
    'A S D F G H J K L Ç',
    '{shiftactivated} Z X C V B N M {bksp}',
    '{numbers} {alt} {emoticon} {space} . {enter}',
  ],
  numbers: NUMPAD,
  alt: [
    '1 2 3 4 5 6 7 8 9 0',
    `- / : ; ( ) $ & @ "`,
    '{alt2} . , ? ! ´ {bksp}',
    '{default} {emoticon} {space} {enter}',
  ],
  alt2: [
    '[ ] { } # % ^ * + =',
    '_ \\ | ~ < > ¢ £ ¥ •',
    `{alt} . , ? ! ' {bksp}`,
    '{default} {emoticon} {space} {enter}',
  ],
  emoticon: [
    '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
    `😏 😬 😭 😓 😱 😪 🙄 😴 😯 {enter}`,
    '😐 😇 🤣 😘 😚 😆 😡 😥 😓 {shift}',
    '{default} {alt} {space} {altright} {downkeyboard}',
  ],
};

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardType, Record<string, string[]>>> = {
  default: {
    default: QWERTY_LOWERCASE,
    ...SHARED_LAYOUTS,
  },
  numeric: {
    default: NUMPAD,
    abc: QWERTY_LOWERCASE,
    ...SHARED_LAYOUTS,
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardType>([
  'default', 'numeric',
]);

export const getNativeLayout = (
  type: VirtualKeyboardType,
  Emoji = true,
  showDownKeyboardButton = true,
  isFixed = false,
  showEnterKey = true,
  showTypeSwitchKey = true
): Record<string, string[]> | null => {
  const layout = NATIVE_LAYOUTS[type] ?? NATIVE_LAYOUTS.default ?? null;

  if (!layout) return null;

  let computedLayout = layout;

  if (!Emoji) {
    computedLayout = removeKeyFromLayout(computedLayout, EMOTICON_KEY);
  }

  if (!showDownKeyboardButton) {
    computedLayout = removeKeyFromLayout(computedLayout, DOWN_KEYBOARD_KEY);
  }

  if (!showEnterKey) {
    computedLayout = removeKeyFromLayout(computedLayout, ENTER_KEY);
  }

  if (!showTypeSwitchKey) {
    computedLayout = removeKeyFromLayout(computedLayout, '{numbers}');
    computedLayout = replaceKeyWithBlank(computedLayout, '{abc}');
  }

  if (isFixed) {
    computedLayout = Object.fromEntries(
      Object.entries(computedLayout).map(([layoutName, rows]) => {
        const hasBksp = rows.some((r) => r.includes('{bksp}'));
        return [
          layoutName,
          rows.map((row) => {
            const trimmed = row.trim();
            if (/^[a-zA-ZçÇ]/.test(trimmed) && trimmed.endsWith('{bksp}')) {
              return '{//} ' + trimmed.replace(/\s*\{bksp\}$/, '') + ' {//}';
            }
            if (!hasBksp && /\{(shift|capslock|shiftactivated)\}$/.test(trimmed)) {
              return trimmed.replace(/\{(shift|capslock|shiftactivated)\}$/, '{bksp}');
            }
            return row;
          }),
        ];
      })
    ) as Record<string, string[]>;
  }

  return computedLayout;
};

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  abc: 'shift',
  shift: 'default',
  alt: 'default',
  alt2: 'alt',
};
