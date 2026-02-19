import * as React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

/**
 * Props do componente Callout
 * @example
 * ```tsx
 * <Callout 
 *   type="success" 
 *   title="Sucesso!"
 *   text="Operação realizada com sucesso"
 *   icon={<CheckIcon />}
 * />
 * ```
 * @example
 * ```tsx
 * <Callout 
 *   type="alert"
 *   title="Atenção"
 *   text="Verifique os campos obrigatórios"
 * />
 * ```
 */
export interface CalloutProps extends BaseProps {
  /** Tipo visual do callout */
  type?: TextVariant;
  
  /** Título principal do callout (texto em destaque) */
  title?: string | null;
  
  /** Texto descritivo do callout */
  text?: string;
  
  /** Ícone a ser exibido no callout */
  icon?: React.ReactNode;
  
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
