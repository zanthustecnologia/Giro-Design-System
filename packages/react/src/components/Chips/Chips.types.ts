import * as React from 'react';

import { ScalableProps, TextVariant } from '../../types/common.types';

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
 *   textColor="color-brand-secondary-dark"
 * >
 *   Alerta
 * </Chips>
 * ```
 */
export interface ChipsProps extends ScalableProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Variante semântica do chip. Define o preset de cor de fundo. */
  variant?: Exclude<TextVariant, 'color'>;

  /** Token CSS para a cor de fundo. Ex: 'color-brand-secondary-medium'. Sobrescreve o variant. */
  backgroundColor?: string;

  /** Token CSS para a cor do texto e ícones. Ex: 'color-brand-secondary-dark'. Sobrescreve o variant. */
  textColor?: string;

  /** Conteúdo exibido dentro do chip */
  children: React.ReactNode;

  /** Ícone posicionado à esquerda do texto */
  leftIcon?: React.ReactNode;

  /** Ícone posicionado à direita do texto */
  rightIcon?: React.ReactNode;
}
