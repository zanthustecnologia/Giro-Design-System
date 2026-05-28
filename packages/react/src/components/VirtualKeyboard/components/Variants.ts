import type { VirtualKeyboardVariant } from '../VirtualKeyboard.type';

const SMILEYS_KEY = '{smileys}';

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
      'q w e r t y u i o p {bksp}',
      'a s d f g h j k l ç {enter}',
      '{shift} z x c v b n m , . {shift}',
      '{numbers} {alt} {space} {downkeyboard}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P {bksp}',
      'A S D F G H J K L Ç {enter}',
      '{capslock} Z X C V B N M , . {capslock}',
      '{numbers} {alt} {smileys} {space} {downkeyboard}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P {bksp}',
      'A S D F G H J K L Ç {enter}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {smileys} {space} {downkeyboard}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ " {bksp}`,
      '{alt2} . , ? ! ´ {enter}',
      '{default} {smileys} {space} {downkeyboard}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ • {bksp}',
      `{alt} . , ? ! ' {enter}`,
      '{default} {smileys} {space} {downkeyboard}',
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
      '1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'
    ],
    abc: [
      '1 2 3 4 5 6 7 8 9 0',
      'q w e r t y u i o p {bksp}',
      'a s d f g h j k l ç {enter}',
      '{shift} z x c v b n m , . {shift}',
      '{numbers} {alt} {space} {downkeyboard}',
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P {bksp}',
      'A S D F G H J K L Ç {enter}',
      '{capslock} Z X C V B N M , . {capslock}',
      '{numbers} {alt} {smileys} {space} {downkeyboard}',
    ],
    caps: [
      '1 2 3 4 5 6 7 8 9 0',
      'Q W E R T Y U I O P {bksp}',
      'A S D F G H J K L Ç {enter}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{numbers} {alt} {smileys} {space} {downkeyboard}',
    ],
    numbers: [
      '1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0',
      `- / : ; ( ) $ & @ " {bksp}`,
      '{alt2} . , ? ! ´ {enter}',
      '{default} {smileys} {space} {downkeyboard}',
    ],
    alt2: [
      '[ ] { } # % ^ * + =',
      '_ \\ | ~ < > ¢ £ ¥ • {bksp}',
      `{alt} . , ? ! ' {enter}`,
      '{default} {smileys} {space} {downkeyboard}',
    ],
    smileys: [
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 🙄 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 {shift}',
      '{default} {alt} {space} {altright} {downkeyboard}',
    ],
  },
  fullKeyboard: {
    default: [
      '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
      '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{capslock} a s d f g h j k l ; \' {enter}',
      '{shiftleft} z x c v b n m , . / {shiftright}',
      '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
    ],
    shift: [
      '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
      '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
      '{tab} Q W E R T Y U I O P { } |',
      '{capslock} A S D F G H J K L : " {enter}',
      '{shiftleft} Z X C V B N M < > ? {shiftright}',
      '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
    ],
  },
  mobile: {
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{shift} z x c v b n m {backspace}',
      '{numbers} {space} {downkeyboard}',
    ],
    shift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {backspace}',
      '{numbers} {space} {downkeyboard}',
    ],
    numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {backspace}'],
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardVariant>([
  'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
]);

export const LAYOUT_THEMES: Partial<Record<VirtualKeyboardVariant, string>> = {
  appleIOS: 'hg-theme-default hg-theme-ios',
};

export const getNativeLayout = (
  variant: VirtualKeyboardVariant,
  showSmileysButton = true
): Record<string, string[]> | null => {
  const layout = NATIVE_LAYOUTS[variant] ?? NATIVE_LAYOUTS.default ?? null;

  if (!layout) return null;

  return showSmileysButton ? layout : removeKeyFromLayout(layout, SMILEYS_KEY);
};

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  abc: 'shift',
  shift: 'default',
  alt: 'default',
  alt2: 'alt',
  symbols: 'alt',
};
