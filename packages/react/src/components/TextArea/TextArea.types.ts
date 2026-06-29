import React from 'react';

import type { VirtualKeyboardType } from '../VirtualKeyboard/VirtualKeyboard.type';

/**
 * Props base compartilhadas por todas as configurações de tooltip do TextArea.
 */
interface BaseTooltipConfig {
  /** Lado em que o tooltip será exibido */
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  /** Alinhamento do tooltip */
  tooltipAlign?: 'start' | 'center' | 'end';
}

/**
 * Configuração de tooltip com texto.
 * Exibe um tooltip ao redor da label do TextArea.
 */
interface WithTooltip extends BaseTooltipConfig {
  /** Texto do tooltip exibido no hover */
  tooltipText: string;
}

/**
 * Configuração sem tooltip.
 */
interface WithoutTooltip {
  tooltipText?: never;
  tooltipSide?: never;
  tooltipAlign?: never;
}

/**
 * Union type representando a configuração de tooltip do TextArea.
 * Pode ter tooltip com texto (e opcionalmente side/align) ou sem tooltip.
 */
export type TextAreaTooltipConfig = WithTooltip | WithoutTooltip;

/**
 * Props base do componente TextArea.
 */
interface TextAreaPropsBase extends Omit<
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
  charCount?: boolean;

  /** Altura do textarea em pixels */
  height?: number;

  /** Classe CSS opcional */
  className?: string;

  /** Tipo do teclado virtual (padrão: undefined = desabilitado) */
  virtualKeyboard?: VirtualKeyboardType;
}

/**
 * Props completas do TextArea, incluindo a configuração de tooltip.
 *
 * O tooltip é ativado automaticamente quando `tooltipText` é informado,
 * e as props `tooltipSide` e `tooltipAlign` ficam disponíveis para posicionamento.
 */
export type TextAreaProps = TextAreaPropsBase & TextAreaTooltipConfig;
