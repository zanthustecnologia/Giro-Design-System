import React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

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
  type?: TextVariant;
  
  /** Texto a ser exibido dentro do chip */
  title: string;
  
  /** Ícone posicionado à esquerda do texto */
  leftIcon?: React.ReactNode;
  
  /** Ícone posicionado à direita do texto */
  rightIcon?: React.ReactNode;
  
  /** Estado desabilitado do chip */
  disabled?: BaseProps['disabled'];
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
