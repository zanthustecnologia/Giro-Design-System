import React from 'react';

import { Side, Align, Scale } from '../../types/common.types';

import type { VirtualKeyboardType } from '../VirtualKeyboard/VirtualKeyboard.type';

/** Tipos de input suportados pelo TextField */
export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * Props do componente TextField
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
 *   tooltip={true}
 *   tooltipText="Deve conter letras e números"
 *   icon={<LockIcon />}
 * />
 * ```
 */
export interface TextFieldProps extends Omit<
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
  
  /** Habilita tooltip */
  tooltip?: boolean;
  
  /** Texto do tooltip */
  tooltipText?: string;
  
  /** Lado onde o tooltip aparece */
  tooltipSide?: Side;
  
  /** Alinhamento do tooltip */
  tooltipAlign?: Align;
  
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

  /** Mantém o ícone visível mesmo quando o campo tem valor */
  persistIcon?: boolean;

  /** Classe CSS opcional */
  className?: string;

  /** Tipo do teclado virtual (padrão: undefined = desabilitado) */ 
  virtualKeyboard?: VirtualKeyboardType;

  /** Aplica variação visual para uso acoplado ao VirtualKeyboard no modo fixed, essa prop é de uso exclusivo do VirtualKeyboard no modo fixed */
  attachedToVirtualKeyboard?: boolean;

  /** Escala visual aplicada ao componente */
  scale?: Scale;

  /** Desabilita o autocomplete nativo do browser (padrão: false) */
  disableAutoComplete?: boolean;
}

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
