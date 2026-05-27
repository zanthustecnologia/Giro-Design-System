import type { VirtualKeyboardLayout } from '../VirtualKeyboard.type';

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardLayout, Record<string, string[]>>> = {
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

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardLayout>([
  'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
]);

export const LAYOUT_THEMES: Partial<Record<VirtualKeyboardLayout, string>> = {
  appleIOS: 'hg-theme-default hg-theme-ios',
};

export const LAYOUT_DISPLAY: Partial<Record<VirtualKeyboardLayout, Record<string, string>>> = {
  default: {
    '{capslock}': '⇪',
    '{numbers}': '123',
    '{abc}': 'ABC',
    '{alt}': '.?!',
    '{alt2}': '#+=',
    '{smileys}': '😃',
    '{shift}': '⇧',
    '{shiftactivated}': '⇧',
    '{enter}': 'Enter',
    '{bksp}': '⌫ Apagar',
    '{altright}': '.?123',
    '{downkeyboard}': '🞃',
    '{space}': ' ',
    '{default}': 'ABC',
  },
  numeric: {
    '{bksp}': '⌫ Apagar',
    '{enter}': 'Enter',
    '{abc}': 'ABC',
    '{capslock}': '⇪',
    '{numbers}': '123',
    '{alt}': '.?!',
    '{alt2}': '#+=',
    '{smileys}': '😃',
    '{shift}': '⇧',
    '{shiftactivated}': '⇧',
    '{altright}': '.?123',
    '{downkeyboard}': '🞃',
    '{space}': ' ',
    '{default}': 'ABC',
  },
  fullKeyboard: {
    '{escape}': 'esc',
    '{tab}': 'tab ⇥',
    '{backspace}': 'backspace ⌫',
    '{enter}': 'enter ↵',
    '{space}' : '                  ',
    '{capslock}': 'caps lock ⇪',
    '{shiftleft}': 'shift ⇧',
    '{shiftright}': 'shift ⇧',
    '{controlleft}': 'ctrl',
    '{controlright}': 'ctrl',
    '{altleft}': 'alt',
    '{altright}': 'alt',
    '{metaleft}': 'cmd',
    '{metaright}': 'cmd',
    '{f1}' : 'F1',
    '{f2}' : 'F2',
    '{f3}' : 'F3',
    '{f4}' : 'F4',
    '{f5}' : 'F5',
    '{f6}' : 'F6',
    '{f7}' : 'F7',
    '{f8}' : 'F8',
    '{f9}' : 'F9',
    '{f10}' : 'F10',
    '{f11}' : 'F11',
    '{f12}' : 'F12',
  },
  mobile: {
    '{numbers}': '123',
    '{downkeyboard}': '🞃',
    '{backspace}': '⌫',
    '{shift}': '⇧',
    '{abc}': 'ABC',
    '{space}': '                 ',
  },
};

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  abc: 'shift',
  shift: 'default',
  alt: 'default',
  alt2: 'alt',
  symbols: 'alt',
};
