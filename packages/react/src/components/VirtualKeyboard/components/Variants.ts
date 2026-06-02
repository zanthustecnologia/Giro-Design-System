import type { VirtualKeyboardVariant } from '../VirtualKeyboard.type';

const SMILEYS_KEY = '{smileys}';
const DOWN_KEYBOARD_KEY = '{downkeyboard}';

const removeKeyFromLayout = (layout: Record<string, string[]>, key: string) =>
  Object.fromEntries(
    Object.entries(layout).map(([layoutName, rows]) => [
      layoutName,
      rows.map((row) => row.split(key).join(' ').replace(/\s+/g, ' ').trim()),
    ])
  ) as Record<string, string[]>;

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardVariant, Record<string, string[]>>> = {
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
      '{numbers} {alt} {smileys} {space} {downkeyboard} {enter}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {smileys} {space} {downkeyboard} {enter}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ "`,
      '{alt2} . , ? ! ´ {bksp}',
      '{default} {smileys} {space} {downkeyboard} {enter}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ •',
      `{alt} . , ? ! ' {bksp}`,
      '{default} {smileys} {space} {downkeyboard} {enter}',
    ],
    smileys: [
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
      '{numbers} {alt} {smileys} {space} {downkeyboard} {enter}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç {bksp}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {smileys} {space} {downkeyboard} {enter}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {abc}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ "`,
      '{alt2} . , ? ! ´ {bksp}',
      '{default} {smileys} {space} {downkeyboard} {enter}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ •',
      `{alt} . , ? ! ' {bksp}`,
      '{default} {smileys} {space} {downkeyboard} {enter}',
    ],
    smileys: [
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 🙄 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 {shift}',
      '{default} {alt} {space} {altright} {downkeyboard}',
    ],
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardVariant>([
  'default', 'numeric',
]);

export const LAYOUT_THEMES: Partial<Record<VirtualKeyboardVariant, string>> = {};

export const getNativeLayout = (
  variant: VirtualKeyboardVariant,
  showSmileysButton = true,
  showDownKeyboardButton = true
): Record<string, string[]> | null => {
  const layout = NATIVE_LAYOUTS[variant] ?? NATIVE_LAYOUTS.default ?? null;

  if (!layout) return null;

  let computedLayout = layout;

  if (!showSmileysButton) {
    computedLayout = removeKeyFromLayout(computedLayout, SMILEYS_KEY);
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
