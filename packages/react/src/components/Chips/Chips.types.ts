import * as React from 'react';

import { BaseProps } from '../../types/common.types';

export type ChipsVariant = 'neutral' | 'brand' | 'success' | 'alert';

/**
 * Props do componente Chips
 * @example
 * ```tsx
 * <Chips variant="success" leftIcon={<CheckIcon />}>
 *   Ativo
 * </Chips>
 * ```
 * @example
 * ```tsx
 * <Chips
 *   backgroundColor="color-brand-secondary-medium"
 *   foregroundColor="color-brand-secondary-dark"
 * >
 *   Alerta
 * </Chips>
 * ```
 */
export interface ChipsProps extends BaseProps {
  /** Variante semântica do chip. Define o preset de cor de fundo. */
  variant?: ChipsVariant;

  /** Token CSS para a cor de fundo. Ex: 'color-brand-secondary-medium'. Sobrescreve o variant. */
  backgroundColor?: string;

  /** Token CSS para a cor do texto e ícones. Ex: 'color-brand-secondary-dark'. Sobrescreve o variant. */
  foregroundColor?: string;

  /** Conteúdo exibido dentro do chip */
  children: React.ReactNode;

  /** Ícone posicionado à esquerda do texto */
  leftIcon?: React.ReactNode;

  /** Ícone posicionado à direita do texto */
  rightIcon?: React.ReactNode;

  /** Estilos inline adicionais */
  style?: React.CSSProperties;

  /** Props adicionais para o elemento div */
  [key: string]: any;
}
