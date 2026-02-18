import { ReactNode } from 'react';

import {BaseProps} from '../../types';

/** Tipos de badge suportados */
export type BadgeType = 'notification' | 'status';

/** Valores possíveis para exibição no badge */
export type BadgeValue = number | string | null;

/**
 * Props do componente Badge
 * @example
 * ```tsx
 * <Badge type="notification" badgeValue={5}>
 *   <IconButton icon={<BellIcon />} />
 * </Badge>
 * ```
 * @example
 * ```tsx
 * <Badge 
 *   type="status" 
 *   badgeValue="novo"
 *   aria-label="Novo item disponível"
 * >
 *   <Avatar icon={<UserIcon />} />
 * </Badge>
 * ```
 */
export interface BadgeProps extends BaseProps {
  /** Tipo de badge (notificação ou status) */
  type: BadgeType;
  
  /** Conteúdo a ser envolvido pelo badge */
  children?: ReactNode;
  
  /** Valor a ser exibido no badge (número, texto ou null) */
  badgeValue?: BadgeValue;
  
  /** Valor máximo a ser exibido (ex: 99+ quando badgeValue > maxValue) */
  maxValue?: number;
  
  /** Label acessível para leitores de tela */
  'aria-label'?: string;
}
