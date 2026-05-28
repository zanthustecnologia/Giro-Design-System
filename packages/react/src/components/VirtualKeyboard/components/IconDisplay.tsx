import {
  Backspace16Regular,
  KeyboardShiftRegular,
  KeyboardShiftFilled,
  KeyboardShiftUppercaseRegular,
  ChevronDownRegular,
  KeyboardTabRegular,
  ArrowHookDownLeftRegular,
} from '@fluentui/react-icons';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import type { VirtualKeyboardVariant } from '../VirtualKeyboard.type';

function toHtml(element: React.ReactElement): string {
  return renderToStaticMarkup(element);
}

const bksp        = toHtml(<Backspace16Regular            />);
const shift       = toHtml(<KeyboardShiftRegular          />);
const shiftActive = toHtml(<KeyboardShiftFilled           />);
const capslock    = toHtml(<KeyboardShiftUppercaseRegular />);
const chevronDn   = toHtml(<ChevronDownRegular            />);
const kbTab       = toHtml(<KeyboardTabRegular            />);
const enterHook   = toHtml(<ArrowHookDownLeftRegular      />);

export const LAYOUT_DISPLAY: Partial<Record<VirtualKeyboardVariant, Record<string, string>>> = {
  default: {
    '{capslock}':      capslock,
    '{numbers}':       '123',
    '{abc}':           'ABC',
    '{alt}':           '.?!',
    '{alt2}':          '#+=',
    '{smileys}':       '😃',
    '{shift}':         shift,
    '{shiftactivated}': shiftActive,
    '{enter}':         'Enter',
    '{bksp}':          `${bksp} Apagar`,
    '{altright}':      '.?123',
    '{downkeyboard}':  chevronDn,
    '{space}':         ' ',
    '{default}':       'ABC',
  },
  numeric: {
    '{bksp}':          `${bksp} Apagar`,
    '{enter}':         'Enter',
    '{abc}':           'ABC',
    '{capslock}':      capslock,
    '{numbers}':       '123',
    '{alt}':           '.?!',
    '{alt2}':          '#+=',
    '{smileys}':       '😃',
    '{shift}':         shift,
    '{shiftactivated}': shiftActive,
    '{altright}':      '.?123',
    '{downkeyboard}':  chevronDn,
    '{space}':         ' ',
    '{default}':       'ABC',
  },
  fullKeyboard: {
    '{escape}':       'esc',
    '{tab}':          `tab ${kbTab}`,
    '{backspace}':    `backspace ${bksp}`,
    '{enter}':        `enter ${enterHook}`,
    '{space}':        '                  ',
    '{capslock}':     `caps lock ${capslock}`,
    '{shiftleft}':    `shift ${shift}`,
    '{shiftright}':   `shift ${shift}`,
    '{controlleft}':  'ctrl',
    '{controlright}': 'ctrl',
    '{altleft}':      'alt',
    '{altright}':     'alt',
    '{metaleft}':     'cmd',
    '{metaright}':    'cmd',
    '{f1}':  'F1',
    '{f2}':  'F2',
    '{f3}':  'F3',
    '{f4}':  'F4',
    '{f5}':  'F5',
    '{f6}':  'F6',
    '{f7}':  'F7',
    '{f8}':  'F8',
    '{f9}':  'F9',
    '{f10}': 'F10',
    '{f11}': 'F11',
    '{f12}': 'F12',
  },
  mobile: {
    '{numbers}':      '123',
    '{downkeyboard}': chevronDn,
    '{backspace}':    bksp,
    '{shift}':        shift,
    '{abc}':          'ABC',
    '{space}':        '                 ',
  },
};
