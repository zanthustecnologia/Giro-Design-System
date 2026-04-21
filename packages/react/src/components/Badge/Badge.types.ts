import { ReactNode } from 'react';

import {BaseProps} from '../../types';

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
  /** Tipos de badge suportados */
  type: 'notification' | 'status';
  
  /** Conteúdo a ser envolvido pelo badge */
  children?: ReactNode;
  
  /** Valor a ser exibido no badge (número, texto ou null) */
  badgeValue?: number | string | null;
  
  /** Label acessível para leitores de tela */
  'aria-label'?: string;
}
