import React from 'react';

import { Side, Align } from '../../types/common.types';

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
  side?: Side;
  
  /** Alinhamento do tooltip */
  align?: Align;
  
  /** Mensagem de erro a ser exibida */
  errorMessage?: string;
<<<<<<< HEAD
=======
  
  /** Ícone a ser exibido no campo */
>>>>>>> origin/refactor/reestruturacaoTypes
  icon?: React.ReactNode;
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
