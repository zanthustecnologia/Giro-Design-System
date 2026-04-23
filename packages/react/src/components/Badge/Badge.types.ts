import { ReactNode } from 'react';

import {BaseProps} from '../../types';

interface BadgeBaseProps extends BaseProps {
  /** Conteúdo a ser envolvido pelo badge */
  children?: ReactNode;

  /** Label acessível para leitores de tela */
  'aria-label'?: string;
  /** Prop que sinalisa se o Badge sera usado no FIlter ou não, pois no FIlter ele tem uma cor diferente */
  tooFilter?: boolean;
}

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
 *   badgeValue="+3"
 *   aria-label="3 novos itens"
 * />
 * ```
 */
export type BadgeProps =
  | (BadgeBaseProps & {
      /** Tipo notification: exibe contador numérico */
      type: 'notification';
      /** Valor numérico exibido no badge */
      badgeValue?: number | null;
    })
  | (BadgeBaseProps & {
      /** Tipo status: aceita número ou string (ex: "+3") */
      type: 'status';
      /** Valor exibido no badge — aceita número ou string formatada */
      badgeValue?: number | string | null;

      
    });
