import { ReactNode } from 'react';

import { BaseProps } from '../../types';

/**
 * Props do componente Badge
 * @example
 * ```tsx
 * // Modo overlay: badge flutua sobre o children
 * <Badge badgeValue={5}>
 *   <IconButton icon={<BellIcon />} />
 * </Badge>
 * ```
 * @example
 * ```tsx
 * // Modo inline: badge standalone ao lado de outros elementos
 * <Badge badgeValue="+3" aria-label="3 novos itens" />
 * ```
 */
export interface BadgeProps extends BaseProps {
  /** Conteúdo a ser envolvido pelo badge. Quando presente, o badge é posicionado sobre o children (modo overlay). */
  children?: ReactNode;
  /** Valor exibido no badge — aceita número ou string formatada (ex: "+3") */
  badgeValue?: number | string | null;
  /** Label acessível para leitores de tela */
  'aria-label'?: string;
  /** Prop que sinaliza se o Badge será usado no Filter ou não, pois no Filter ele tem uma cor diferente */
  filterVariant?: boolean;
  /** Classe CSS opcional */
  className?: string;
}
