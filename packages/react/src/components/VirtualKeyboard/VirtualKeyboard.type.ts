import { BaseProps } from '../../types/common.types';

import type { RefObject } from 'react';

/**
 * Modo de exibição do VirtualKeyboard.
 * - `native`: age como teclado nativo — aparecerá ao focar em um campo (implementação futura).
 * - `fixed`: teclado sempre visível na tela com um TextField próprio acima dele.
 */
export type VirtualKeyboardMode = 'native' | 'fixed';

/** Layouts disponíveis para o VirtualKeyboard */
export type VirtualKeyboardVariant =
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
 * // Modo fixed: teclado sempre visível com TextField próprio
 * <VirtualKeyboard
 *   mode="fixed"
 *   variant="default"
 *   textFieldLabel="Digite aqui"
 *   onChange={(value) => setValue(value)}
 * />
 * ```
 * @example
 * ```tsx
 * // Modo native: teclado gerenciado externamente (futuramente acionado por foco)
 * <VirtualKeyboard
 *   mode="native"
 *   variant="numeric"
 *   value={pin}
 *   onChange={setPin}
 *   maxLength={4}
 * />
 * ```
 */
export interface VirtualKeyboardProps extends BaseProps {
  /**
   * Modo de exibição do teclado.
   * - `native`: comporta-se como teclado nativo (acionamento por foco — futuramente implementado).
   * - `fixed`: teclado fixo na tela com um TextField próprio acima.
   * @default 'native'
   */
  mode?: VirtualKeyboardMode;

  /** Valor controlado do input vinculado ao teclado */
  value?: string;

  /** Variante do teclado (padrão: "default") */
  variant?: VirtualKeyboardVariant;

  /** Callback executado quando o valor do input muda: (value) => void */
  onChange?: (value: string) => void;

  /** Callback executado quando uma tecla é pressionada: (key) => void */
  onKeyPress?: (key: string) => void;

  /** Limite máximo de caracteres */
  maxLength?: number;

  /** Label do TextField exibido no modo `fixed` */
  textFieldLabel?: string;

  /** Placeholder do TextField exibido no modo `fixed` */
  textFieldPlaceholder?: string;

  /** Texto de ajuda do TextField exibido no modo `fixed` */
  helperText?: string;

  /** Sinaliza erro no TextField exibido no modo `fixed` */
  error?: boolean;

  /** Mensagem de erro do TextField exibido no modo `fixed` */
  errorMessage?: string;

  /**
   * Ref para o campo de input que aciona o teclado no modo `native`.
   * O teclado aparece ao focar no elemento referenciado e some ao perder o foco.
   * Se omitido no modo `native`, o teclado permanece sempre visível.
   */
  targetRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

/** @deprecated Use `VirtualKeyboardVariant` */
export type VirtualKeyboardLayout = VirtualKeyboardVariant;
