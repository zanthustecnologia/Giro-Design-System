import type { VirtualKeyboardType } from '../VirtualKeyboard.type';

const EMOTICON_KEY = '{emoticon}';
const DOWN_KEYBOARD_KEY = '{downkeyboard}';

const removeKeyFromLayout = (layout: Record<string, string[]>, key: string) =>
  Object.fromEntries(
    Object.entries(layout).map(([layoutName, rows]) => [
      layoutName,
      rows.map((row) => row.split(key).join(' ').replace(/\s+/g, ' ').trim()),
    ])
  ) as Record<string, string[]>;

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardType, Record<string, string[]>>> = {
  default: {
    default: [
      '1 2 3 4 5 6 7 8 9 0',
      'q w e r t y u i o p',
      'a s d f g h j k l ç {bksp}',
      '{shift} z x c v b n m , . {shift}',
      '{numbers} {alt} {space} {downkeyboard} {enter}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{capslock} Z X C V B N M , . {capslock}',
      '{numbers} {alt} {emoticon} {space} {downkeyboard} {enter}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {emoticon} {space} {downkeyboard} {enter}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ "`,
      '{alt2} . , ? ! ´ {bksp}',
      '{default} {emoticon} {space} {downkeyboard} {enter}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ •',
      `{alt} . , ? ! ' {bksp}`,
      '{default} {emoticon} {space} {downkeyboard} {enter}',
    ],
    emoticon: [
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 🙄 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 {shift}',
      '{default} {alt} {space} {altright} {downkeyboard}',
    ],
  },

  numeric: {
    default: [
      '1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'
    ],
    abc: [
      '1 2 3 4 5 6 7 8 9 0',
      'q w e r t y u i o p',
      'a s d f g h j k l ç {bksp}',
      '{shift} z x c v b n m , . {shift}',
      '{numbers} {alt} {space} {downkeyboard} {enter}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{capslock} Z X C V B N M , . {capslock}',
      '{numbers} {alt} {emoticon} {space} {downkeyboard} {enter}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {emoticon} {space} {downkeyboard} {enter}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ "`,
      '{alt2} . , ? ! ´ {bksp}',
      '{default} {emoticon} {space} {downkeyboard} {enter}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ •',
      `{alt} . , ? ! ' {bksp}`,
      '{default} {emoticon} {space} {downkeyboard} {enter}',
    ],
    emoticon: [
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 🙄 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 {shift}',
      '{default} {alt} {space} {altright} {downkeyboard}',
    ],
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardType>([
  'default', 'numeric',
]);

export const LAYOUT_THEMES: Partial<Record<VirtualKeyboardType, string>> = {};

export const getNativeLayout = (
  type: VirtualKeyboardType,
  Emoji = true,
  showDownKeyboardButton = true
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

  return computedLayout;
};

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  abc: 'shift',
  shift: 'default',
  alt: 'default',
  alt2: 'alt',
  symbols: 'alt',
};
