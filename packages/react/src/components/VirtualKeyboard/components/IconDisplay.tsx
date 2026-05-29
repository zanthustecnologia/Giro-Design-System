import type { VirtualKeyboardVariant } from '../VirtualKeyboard.type';

// Paths oficiais dos mesmos ícones do pacote @fluentui/react-icons.
const icon = (path: string, viewBox = 20): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBox} ${viewBox}" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;

const bksp = icon('M6 3a2 2 0 0 0-1.41.59l-3 3a2 2 0 0 0 0 2.82l3 3A2 2 0 0 0 6 13h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6Zm-.7 1.3A1 1 0 0 1 6 4h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-.7-.3l-3-3a1 1 0 0 1 0-1.4l3-3Zm2.05 1.35a.5.5 0 1 0-.7.7L8.29 8 6.65 9.65a.5.5 0 0 0 .7.7L9 8.71l1.65 1.64a.5.5 0 0 0 .7-.7L9.71 8l1.64-1.65a.5.5 0 0 0-.7-.7L9 7.29 7.35 5.65Z', 16);
const shift = icon('M8.86 2.53c.6-.7 1.68-.7 2.28 0l6.62 7.8a1 1 0 0 1-.76 1.65h-3V17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5.02H3a1 1 0 0 1-.76-1.65l6.62-7.8Zm1.52.65a.5.5 0 0 0-.76 0L3 10.98h3.5c.28 0 .5.23.5.5V17h6v-5.52c0-.27.22-.5.5-.5H17l-6.62-7.8Z');
const shiftActive = icon('M11.14 2.53a1.5 1.5 0 0 0-2.28 0l-6.62 7.8A1 1 0 0 0 3 11.98h3V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5.02h3a1 1 0 0 0 .76-1.65l-6.62-7.8Z');
const capslock = icon('M11.14 2.53a1.5 1.5 0 0 0-2.28 0l-6.62 7.8A1 1 0 0 0 3 11.98h3V15a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.02h3a1 1 0 0 0 .76-1.65l-6.62-7.8Zm-1.52.65a.5.5 0 0 1 .76 0l6.62 7.8h-3.5a.5.5 0 0 0-.5.5V15H7v-3.52a.5.5 0 0 0-.5-.5H3l6.62-7.8ZM6.5 17a.5.5 0 1 0 0 1h7a.5.5 0 0 0 0-1h-7Z');
const chevronDn = icon('M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z');
const kbTab = icon('M9.35 4.15a.5.5 0 1 0-.7.7l4.64 4.65H3.5a.5.5 0 0 0 0 1h9.8l-4.65 4.65a.5.5 0 0 0 .7.7l5.5-5.5a.5.5 0 0 0 0-.7l-5.5-5.5ZM17 4.5a.5.5 0 0 0-1 0v11a.5.5 0 0 0 1 0v-11Z');
const enterHook = icon('M6 4.5c0-.28.22-.5.5-.5H11c1.64 0 2.9.62 3.75 1.57C15.59 6.52 16 7.77 16 9s-.41 2.48-1.25 3.43A4.85 4.85 0 0 1 11 14H5.7l2.65 2.65a.5.5 0 0 1-.7.7l-3.5-3.5a.5.5 0 0 1 0-.7l3.5-3.5a.5.5 0 1 1 .7.7L5.71 13H11c1.36 0 2.35-.5 3-1.24.66-.74 1-1.74 1-2.76 0-1.02-.34-2.02-1-2.76A3.86 3.86 0 0 0 11 5H6.5a.5.5 0 0 1-.5-.5Z');

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
