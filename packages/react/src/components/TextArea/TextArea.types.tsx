import React from 'react';

import { Side, Align } from '../../types/common.types';

/**
 * Props do componente TextArea
 * @example
 * ```tsx
 * <TextArea
 *   label="Descrição"
 *   value={description}
 *   onChange={setDescription}
 *   placeholder="Digite uma descrição"
 *   rows={4}
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

  /** Mensagem de erro a ser exibida */
  errorMessage?: string;

  /** Número de linhas visíveis */
  rows?: number;

  /** Controla o redimensionamento do textarea */
  resize?: 'none' | 'vertical' | 'both';

  /** Exibe contador de caracteres (requer maxLength) */
  showCharCount?: boolean;
}
