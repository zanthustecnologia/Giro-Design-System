import React from 'react';

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
export interface CalloutProps {
  /** Tipo visual do callout */
  type?: 'neutral' | 'color' | 'brand' | 'alert' | 'success';
  
  /** Título principal do callout (texto em destaque) */
  title?: string | null;
  
  /** Texto descritivo do callout */
  text?: string;
  
  /** Ícone a ser exibido no callout */
  icon?: React.ReactNode;
  
  /** Classe CSS customizada */
  className?: string;
  
  /** ID único do elemento */
  id?: string;
  
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
