import { BaseProps } from '../../types/common.types';

/** Layouts disponíveis para o VirtualKeyboard */
export type VirtualKeyboardLayout =
  // Layouts nativos
  | 'default'
  | 'numeric'
  | 'fullKeyboard'
  | 'mobile'
  | 'appleIOS'
  // Layouts de idiomas (via simple-keyboard-layouts)
  | 'arabic'
  | 'armenianEastern'
  | 'armenianWestern'
  | 'assamese'
  | 'balochi'
  | 'belarusian'
  | 'bengali'
  | 'brazilian'
  | 'burmese'
  | 'chinese'
  | 'czech'
  | 'english'
  | 'farsi'
  | 'french'
  | 'georgian'
  | 'german'
  | 'gilaki'
  | 'greek'
  | 'hebrew'
  | 'hindi'
  | 'hungarian'
  | 'italian'
  | 'japanese'
  | 'kannada'
  | 'korean'
  | 'kurdish'
  | 'macedonian'
  | 'malayalam'
  | 'nigerian'
  | 'nko'
  | 'norwegian'
  | 'odia'
  | 'polish'
  | 'punjabi'
  | 'russian'
  | 'russianOld'
  | 'sindhi'
  | 'spanish'
  | 'swedish'
  | 'telugu'
  | 'thai'
  | 'turkish'
  | 'ukrainian'
  | 'urdu'
  | 'urduStandard'
  | 'uyghur';

/**
 * Props do componente VirtualKeyboard
 * @example
 * ```tsx
 * <VirtualKeyboard
 *   layout="default"
 *   onChange={(value) => setValue(value)}
 * />
 * ```
 * @example
 * ```tsx
 * <VirtualKeyboard
 *   layout="numeric"
 *   value={pin}
 *   onChange={setPin}
 *   onKeyPress={(key) => console.log('Tecla:', key)}
 *   maxLength={4}
 * />
 * ```
 */
export interface VirtualKeyboardProps extends BaseProps {
  /** Valor controlado do input vinculado ao teclado */
  value?: string;

  /** Layout do teclado (padrão: "default") */
  layout?: VirtualKeyboardLayout;

  /** Callback executado quando o valor do input muda: (value) => void */
  onChange?: (value: string) => void;

  /** Callback executado quando uma tecla é pressionada: (key) => void */
  onKeyPress?: (key: string) => void;

  /** Limite máximo de caracteres */
  maxLength?: number;
}


/**
 * Props do componente VirtualKeyboard
 * @example
 * ```tsx
 * <VirtualKeyboard
 *   layout="default"
 *   onChange={(value) => setValue(value)}
 * />
 * ```
 * @example
 * ```tsx
 * <VirtualKeyboard
 *   layout="numeric"
 *   value={pin}
 *   onChange={setPin}
 *   onKeyPress={(key) => console.log('Tecla:', key)}
 *   maxLength={4}
 * />
 * ```
 */
export interface VirtualKeyboardProps extends BaseProps {
  /** Valor controlado do input vinculado ao teclado */
  value?: string;

  /** Layout do teclado (padrão: "default") */
  layout?: VirtualKeyboardLayout;

  /** Callback executado quando o valor do input muda: (value) => void */
  onChange?: (value: string) => void;

  /** Callback executado quando uma tecla é pressionada: (key) => void */
  onKeyPress?: (key: string) => void;

  /** Limite máximo de caracteres */
  maxLength?: number;
}
