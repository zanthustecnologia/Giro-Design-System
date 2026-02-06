import React from 'react';

/**
 * Props do componente Chips
 * @example
 * ```tsx
 * <Chips 
 *   type="success"
 *   title="Ativo"
 *   leftIcon={<CheckIcon />}
 * />
 * ```
 * @example
 * ```tsx
 * <Chips 
 *   type="brand"
 *   title="Novo"
 *   rightIcon={<CloseIcon />}
 *   disabled={false}
 * />
 * ```
 */
export interface ChipsProps {
  /** Tipo visual do chip */
  type?: 'neutral' | 'brand' | 'color' | 'success' | 'alert';
  
  /** Texto a ser exibido dentro do chip */
  title: string;
  
  /** Ícone posicionado à esquerda do texto */
  leftIcon?: React.ReactNode;
  
  /** Ícone posicionado à direita do texto */
  rightIcon?: React.ReactNode;
  
  /** Estado desabilitado do chip */
  disabled?: boolean;
  
  /** Classe CSS customizada */
  className?: string;
  
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
