import React from 'react';

import { Side, Align } from '../../types/common.types';

import type { VirtualKeyboardType } from '../VirtualKeyboard/VirtualKeyboard.type';

/**
 * Props do componente TextArea
 * @example
 * ```tsx
 * <TextArea
 *   label="Descrição"
 *   value={description}
 *   onChange={setDescription}
 *   placeholder="Digite uma descrição"
 * />
 * ```
 * @example
 * ```tsx
 * <TextArea
 *   label="Comentário"
 *   required
 *   maxLength={500}
 *   showCharCount
 *   helperText="Máximo de 500 caracteres"
 *   errorMessage={error}
 * />
 * ```
 */
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value'
> {
  /** Valor controlado do campo */
  value?: string;

  /** Callback executado quando o valor muda: (value) => void */
  onChange?: (value: string) => void;

  /** Label do campo */
  label?: string;

  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;

  /** Habilita tooltip */
  tooltip?: boolean;

  /** Texto do tooltip */
  tooltipText?: string;

  /** Lado onde o tooltip aparece */
  side?: Side;

  /** Alinhamento do tooltip */
  align?: Align;

  /**
   * Mensagem de erro exibida no campo.
   * Usada tanto pela validação interna (required, etc.)
   * quanto pelo controle externo via formulários (react-hook-form, formik, etc.)
   */
  errorMessage?: string;

  /** Sinaliza erro externo para controle via formulários (react-hook-form, formik, etc.) */
  error?: boolean;

  /** Controla o redimensionamento do textarea */
  resize?: 'none' | 'vertical' | 'both';

  /** Exibe contador de caracteres (requer maxLength) */
  showCharCount?: boolean;

  /** Altura do textarea em pixels */
  height?: number;

  /** Classe CSS opcional */
  className?: string;

  /** Habilita o teclado virtual */
  virtualKeyboard?: boolean;

  /** Tipo do teclado virtual (padrão: 'default') */
  virtualKeyboardType?: VirtualKeyboardType;

  /** Comprimento máximo permitido pelo teclado virtual */
  virtualKeyboardMaxLength?: number;
}
