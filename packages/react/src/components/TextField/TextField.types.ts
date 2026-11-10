import React from 'react';

import { ScalableProps, Side, Align, } from '../../types/common.types';

import type { VirtualKeyboardType } from '../VirtualKeyboard/VirtualKeyboard.types';

/** Tipos de input suportados pelo TextField */
export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * Props base compartilhadas por todas as configurações de tooltip do TextField.
 */
interface BaseTooltipConfig {
  /** Lado em que o tooltip será exibido */
  tooltipSide?: Side;
  /** Alinhamento do tooltip */
  tooltipAlign?: Align;
}

/**
 * Configuração de tooltip com texto.
 * Exibe um tooltip ao redor da label do TextField.
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
 * Union type representando a configuração de tooltip do TextField.
 * Pode ter tooltip com texto (e opcionalmente side/align) ou sem tooltip.
 */
export type TextFieldTooltipConfig = WithTooltip | WithoutTooltip;

/**
 * Props base do componente TextField
 * @example
 * ```tsx
 * <TextField 
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="Digite seu email"
 * />
 * ```
 * @example
 * ```tsx
 * <TextField 
 *   label="Senha"
 *   type="password"
 *   required
 *   helperText="Mínimo 8 caracteres"
 *   errorMessage={error}
 *   tooltipText="Deve conter letras e números"
 *   icon={<LockIcon />}
 * />
 * ```
 */
export interface TextFieldPropsBase extends ScalableProps, Omit<
  React.InputHTMLAttributes<HTMLInputElement>, 
  'onChange' | 'value' | 'type'
> {
  /** Valor controlado do campo */
  value?: string | number;
  
  /** Callback executado quando o valor muda: (value) => void */
  onChange?: (value: string) => void;
  
  /** Label do campo */
  label?: string;
  
  /** Tipo do input */
  type?: TextFieldType;
  
  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;
  
  /**
   * Mensagem de erro exibida no campo.
   * Usada tanto pela validação interna (required, formato, etc.)
   * quanto pelo controle externo via formulários (react-hook-form, formik, etc.)
   */
  errorMessage?: string;

  /** Sinaliza erro externo para controle via formulários (react-hook-form, formik, etc.) */
  error?: boolean;

  /** Ícone a ser exibido no campo */
  icon?: React.ReactNode;

  /** Tipo do teclado virtual (padrão: undefined = desabilitado) */ 
  virtualKeyboard?: VirtualKeyboardType;

  /** Aplica variação visual para uso acoplado ao VirtualKeyboard no modo fixed, essa prop é de uso exclusivo do VirtualKeyboard no modo fixed */
  attachedToVirtualKeyboard?: boolean;

  /** Desabilita o autocomplete nativo do browser (padrão: false) */
  disableAutoComplete?: boolean;
}

/**
 * Props completas do TextField, incluindo a configuração de tooltip.
 *
 * O tooltip é ativado automaticamente quando `tooltipText` é informado,
 * e as props `tooltipSide` e `tooltipAlign` ficam disponíveis para posicionamento.
 */
export type TextFieldProps = TextFieldPropsBase & TextFieldTooltipConfig;

/**
 * Parâmetros para validação do TextField
 */
export interface ValidationParams {
  /** Valor a ser validado */
  value: string;
  
  /** Comprimento máximo permitido */
  maxLength?: number;
  
  /** Tipo do campo (influencia a validação) */
  type?: TextFieldType;
  
  /** Mensagem de erro customizada */
  errorMessage?: string;
  
  /** Define se o campo é obrigatório */
  required?: boolean;
}
