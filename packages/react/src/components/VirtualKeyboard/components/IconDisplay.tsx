import {
  Backspace20Regular,
  ChevronDown20Regular,
  KeyboardShift20Filled,
  KeyboardShift20Regular,
  KeyboardShiftUppercase20Regular,
  Emoji20Regular
} from '@fluentui/react-icons';

import type { VirtualKeyboardType } from '../VirtualKeyboard.types';
import type { ElementType } from 'react';

const iconSlot = (key: string): string => `<span data-icon-key="${key}"></span>`;

export const ICON_KEY_MAP: Record<string, ElementType> = {
  bksp:           Backspace20Regular,
  shift:          KeyboardShift20Regular,
  shiftactivated: KeyboardShift20Filled,
  capslock:       KeyboardShiftUppercase20Regular,
  downkeyboard:   ChevronDown20Regular,
  emoji:         Emoji20Regular,
};

const SHARED_DISPLAY: Record<string, string> = {
  '{capslock}':       iconSlot('capslock'),
  '{numbers}':        '123',
  '{abc}':            'Abc',
  '{alt}':            '.?!',
  '{alt2}':           '#+=',
  '{emoticon}':       iconSlot('emoji'),
  '{shift}':          iconSlot('shift'),
  '{shiftactivated}': iconSlot('shiftactivated'),
  '{enter}':          'Enter',
  '{bksp}':           iconSlot('bksp'),
  '{altright}':       '.?123',
  '{downkeyboard}':   iconSlot('downkeyboard'),
  '{space}':          ' ',
  '{default}':        'Abc',
};

export const LAYOUT_DISPLAY: Partial<Record<VirtualKeyboardType, Record<string, string>>> = {
  default: SHARED_DISPLAY,
  numeric: SHARED_DISPLAY,
};
