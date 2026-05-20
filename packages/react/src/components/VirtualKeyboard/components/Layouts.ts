import type { VirtualKeyboardLayout } from '../VirtualKeyboard.type';

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardLayout, Record<string, string[]>>> = {
  default: {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      'q w e r t y u i o p [ ] \\',
      '{capslock} a s d f g h j k l ; \' {enter}',
      '{shiftleft} z x c v b n m , . / {shiftright}',
      '{space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      'Q W E R T Y U I O P { } |',
      '{capslock} A S D F G H J K L : " {enter}',
      '{shiftleft} Z X C V B N M < > ? {shiftright}',
      '{space}',
    ],
  },
  numeric: {
    default: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {enter}']
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
      '{numbers} {space} {ent}',
    ],
    shift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {backspace}',
      '{numbers} {space} {ent}',
    ],
    numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {backspace}'],
  },
  appleIOS: {
    default: [
      'q w e r t y u i o p {bksp}',
      'a s d f g h j k l {enter}',
      '{shift} z x c v b n m , . {shift}',
      '{alt} {smileys} {space} {altright} {downkeyboard}',
    ],
    shift: [
      'Q W E R T Y U I O P {bksp}',
      'A S D F G H J K L {enter}',
      '{shiftactivated} Z X C V B N M , . {shiftactivated}',
      '{alt} {smileys} {space} {altright} {downkeyboard}',
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0 {bksp}',
      `@ # $ & * ( ) ' " {enter}`,
      '{shift} % - + = / ; : ! ? {shift}',
      '{default} {smileys} {space} {back} {downkeyboard}',
    ],
    smileys: [
      '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
      `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
      '😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {shift}',
      '{default} {smileys} {space} {altright} {downkeyboard}',
    ],
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardLayout>([
  'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
]);

export const LAYOUT_THEMES: Partial<Record<VirtualKeyboardLayout, string>> = {
  appleIOS: 'hg-theme-default hg-theme-ios',
};

export const LAYOUT_DISPLAY: Partial<Record<VirtualKeyboardLayout, Record<string, string>>> = {
  numeric: {
    '{bksp}': 'del',
    '{enter}': 'enter'
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
    '{ent}': 'return',
    '{backspace}': '⌫',
    '{shift}': '⇧',
    '{abc}': 'ABC',
  },
  appleIOS: {
    '{alt}': '.?123',
    '{smileys}': '😃',
    '{shift}': '⇧',
    '{shiftactivated}': '⇧',
    '{enter}': 'return',
    '{bksp}': '⌫',
    '{altright}': '.?123',
    '{downkeyboard}': '🞃',
    '{space}': ' ',
    '{default}': 'ABC',
    '{back}': '⇦',
  },
};

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  shift: 'default',
  alt: 'default',
  symbols: 'alt',
};
