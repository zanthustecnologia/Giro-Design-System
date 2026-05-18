import type { VirtualKeyboardLayout } from '../VirtualKeyboard.type';

// ─── Layouts nativos ────────────────────────────────────────────────────────

export const NATIVE_LAYOUTS: Partial<Record<VirtualKeyboardLayout, Record<string, string[]>>> = {
  default: {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{lock} a s d f g h j k l ; \' {enter}',
      '{shift} z x c v b n m , . / {shift}',
      '.com @ {space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '.com @ {space}',
    ],
  },
  numeric: {
    default: ['7 8 9', '4 5 6', '1 2 3', '{backspace} 0 {enter}'],
  },
  fullKeyboard: {
    default: [
      '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
      '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
      '{tab} q w e r t y u i o p [ ] \\',
      '{lock} a s d f g h j k l ; \' {enter}',
      '{shift} z x c v b n m , . / {shift}',
      '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
    ],
    shift: [
      '{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}',
      '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '{controlleft} {altleft} {metaleft} {space} {metaright} {altright}',
    ],
  },
  mobile: {
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{shift} z x c v b n m {backspace}',
      '{numbers} {space} {enter}',
    ],
    shift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {backspace}',
      '{numbers} {space} {enter}',
    ],
    numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {backspace}'],
  },
  appleIOS: {
    default: [
      'q w e r t y u i o p {backspace}',
      'a s d f g h j k l {enter}',
      '{shift} z x c v b n m , . {shift}',
      '{alt} {space} . {alt}',
    ],
    shift: [
      'Q W E R T Y U I O P {backspace}',
      'A S D F G H J K L {enter}',
      '{shift} Z X C V B N M , . {shift}',
      '{alt} {space} . {alt}',
    ],
    alt: [
      '1 2 3 4 5 6 7 8 9 0 {backspace}',
      '- / : ; ( ) $ & @ " {enter}',
      '{symbols} . , ? ! \' {symbols}',
      '{default} {space} . {default}',
    ],
    symbols: [
      '[ ] { } # % ^ * + = {backspace}',
      '_ \\ | ~ < > € £ ¥ · {enter}',
      '{symbols} . , ? ! \' {symbols}',
      '{default} {space} . {default}',
    ],
  },
};

export const NATIVE_LAYOUT_KEYS = new Set<VirtualKeyboardLayout>([
  'default', 'numeric', 'fullKeyboard', 'mobile', 'appleIOS',
]);

// ─── Shift toggle por sublayout ──────────────────────────────────────────────

export const SHIFT_TOGGLES: Partial<Record<string, string>> = {
  default: 'shift',
  shift: 'default',
  alt: 'default',
  symbols: 'alt',
};
