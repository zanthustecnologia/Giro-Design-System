import { BaseProps } from '../../types/common.types';

import type { RefObject } from 'react';

/**
 * Modo de exibição do VirtualKeyboard.
 * - `native`: age como teclado nativo — aparecerá ao focar em um campo (implementação futura).
 * - `fixed`: teclado sempre visível na tela com um TextField próprio acima dele.
 */
export type VirtualKeyboardVariant = 'native' | 'fixed';

/** Layouts disponíveis para o VirtualKeyboard */
export type VirtualKeyboardType = 'default' | 'numeric';

/**
 * Props do componente VirtualKeyboard
 * @example
 * ```tsx
 * // Modo fixed: teclado sempre visível com TextField próprio
 * <VirtualKeyboard
 *   variant="fixed"
 *   type="default"
 *   onChange={(value) => setValue(value)}
 * />
 * ```
 * @example
 * ```tsx
 * // Modo native: teclado gerenciado externamente (futuramente acionado por foco)
 * <VirtualKeyboard
 *   variant="native"
 *   type="numeric"
 *   value={pin}
 *   onChange={setPin}
 *   maxLength={4}
 * />
 * ```
 */
export interface VirtualKeyboardProps extends Omit<BaseProps, 'disabled'> {
  /**
   * Modo de exibição do teclado.
   * - `native`: comporta-se como teclado nativo (acionamento por foco — futuramente implementado).
   * - `fixed`: teclado fixo na tela com um TextField próprio acima.
   * @default 'native'
   */
  variant?: VirtualKeyboardVariant;

  /** Valor controlado do input vinculado ao teclado */
  value?: string;

  /** Tipo do teclado (padrão: "default") */
  type?: VirtualKeyboardType;

  /** Callback executado quando o valor do input muda: (value) => void */
  onChange?: (value: string) => void;

  /** Callback executado quando uma tecla é pressionada: (key) => void */
  onKeyPress?: (key: string) => void;

  /** Callback executado quando a tecla Enter é pressionada */
  onEnterPress?: () => void;

  /**
   * Callback executado sempre que o `type` do teclado muda.
   * Útil para que o consumidor saiba o tipo atual e possa reagir à mudança
   * (ex.: buscar dados diferentes, ajustar layout, etc.).
   *
   * Sempre dispara na montagem inicial, servindo como fallback para consulta do tipo atual.
   */
  onTypeChange?: (type: VirtualKeyboardType) => void;

  /** Limite máximo de caracteres */
  maxLength?: number;

  /** Controla a exibição do botão {emoticon} nos layouts suportados */
  Emoji?: boolean;

  /** Placeholder do TextField exibido no modo `fixed` */
  placeholder?: string;

  /** Escala do TextField exibido no modo `fixed` */
  textFieldScale?: 1 | 1.5 | 2;

  /**
   * Controla a exibição da tecla Enter no teclado.
   * @default true
   */
  showEnterKey?: boolean;

  /**
   * Controla a exibição da tecla de alternância entre os layouts default ("123") e numeric ("ABC").
   * Quando `false`, a tecla "123" (no layout default) é removida — a tecla espaço cresce para ocupar o espaço —
   * e a tecla "ABC" (no layout numeric) é substituída por um espaço vazio.
   * @default true
   */
  showTypeSwitchKey?: boolean;

  /**
   * Quando `true`, exibe o numpad numérico no formato de 4 colunas (estilo iOS nativo),
   * com as teclas `-`, `↵` `_`, `⌫` e `→|` (enter/submit).
   * Só tem efeito quando `type="numeric"` e `variant="native"`.
   * @default false
   */
  numpadWithEnter?: boolean;

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
