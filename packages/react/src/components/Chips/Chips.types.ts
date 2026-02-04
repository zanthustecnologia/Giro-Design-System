import * as React from 'react';

export interface ChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante a ser escolhida para utilizar padrões de estilizações pré-definidos */
  type?: 'neutral' | 'brand' | 'color' | 'success' | 'alert';
  /** Texto a ser exibido dentro do componente */
  title: string;
  /** Ícone react que ficará posicionado à esquerda no componente */
  leftIcon?: React.ReactNode;
  /** Ícone react que ficará posicionado à direita no componente */
  rightIcon?: React.ReactNode;
  /** Estado alterável para desabilitar */
  disabled?: boolean;
  /** Classe CSS adicional */
  className?: string;
}
