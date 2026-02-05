import React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

export interface ChipsProps {
  /** Variante a ser escolhida para utilizar padrões de estilizações pré-definidos */
  type?: TextVariant;
  /** Texto a ser exibido dentro do componente */
  title: string;
  /** Ícone react que ficará posicionado à esquerda no componente */
  leftIcon?: React.ReactNode;
  /** Ícone react que ficará posicionado à direita no componente */
  rightIcon?: React.ReactNode;
  /** Estado alterável para desabilitar */
  disabled?: BaseProps['disabled'];
  /** Classe CSS adicional */
  className?: BaseProps['className'];
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
