import { ReactNode } from 'react';

export type BadgeType = 'notification' | 'status';
export type BadgeValue = number | string | null;

export interface BadgeProps {
  /** Tipo de badge (notificação ou status) */
  type: BadgeType;
  /** Conteúdo a ser envolvido pelo badge */
  children?: ReactNode;
  /** Valor a ser exibido no badge (número, texto ou null) */
  badgeValue?: BadgeValue;
  /** Classes CSS adicionais */
  className?: string;
  /** ID único do componente */
  id?: string;
  /** Se o badge está desabilitado */
  maxValue?: number;
  /** Props de acessibilidade customizadas */
  'aria-label'?: string;
}
