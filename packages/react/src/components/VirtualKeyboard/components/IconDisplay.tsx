import {
  Backspace20Regular,
  ChevronDown20Regular,
  KeyboardShift20Filled,
  KeyboardShift20Regular,
  KeyboardShiftUppercase20Regular
} from '@fluentui/react-icons';

import type { VirtualKeyboardType } from '../VirtualKeyboard.type';
import type { ElementType } from 'react';

const iconSlot = (key: string): string => `<span data-icon-key="${key}"></span>`;

export const ICON_KEY_MAP: Record<string, ElementType> = {
  bksp:           Backspace20Regular,
  shift:          KeyboardShift20Regular,
  shiftactivated: KeyboardShift20Filled,
  capslock:       KeyboardShiftUppercase20Regular,
  downkeyboard:   ChevronDown20Regular,
};

export const LAYOUT_DISPLAY: Partial<Record<VirtualKeyboardType, Record<string, string>>> = {
  default: {
    '{capslock}':       iconSlot('capslock'),
    '{numbers}':        '123',
    '{abc}':            'ABC',
    '{alt}':            '.?!',
    '{alt2}':           '#+=',
    '{emoticon}':       '😃',
    '{shift}':          iconSlot('shift'),
    '{shiftactivated}': iconSlot('shiftactivated'),
    '{enter}':          'Enter',
    '{bksp}':           `${iconSlot('bksp')} Apagar`,
    '{altright}':       '.?123',
    '{downkeyboard}':   iconSlot('downkeyboard'),
    '{space}':          ' ',
    '{default}':        'ABC',
  },
  numeric: {
    '{bksp}':           `${iconSlot('bksp')} Apagar`,
    '{enter}':          'Enter',
    '{abc}':            'ABC',
    '{capslock}':       iconSlot('capslock'),
    '{numbers}':        '123',
    '{alt}':            '.?!',
    '{alt2}':           '#+=',
    '{emoticon}':       '😃',
    '{shift}':          iconSlot('shift'),
    '{shiftactivated}': iconSlot('shiftactivated'),
    '{altright}':       '.?123',
    '{downkeyboard}':   iconSlot('downkeyboard'),
    '{space}':          ' ',
    '{default}':        'ABC',
  },
};
