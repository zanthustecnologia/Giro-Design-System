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
 *   badgeValue={3}
 *   aria-label="3 novos itens"
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
  
  /** Valor a ser exibido no badge */
  badgeValue?: number | null;
  
  /** Label acessível para leitores de tela */
  'aria-label'?: string;
}
