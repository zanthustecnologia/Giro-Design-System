import React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

export interface CalloutProps {
  /** Define o tipo de callout */
  type?: TextVariant;
  /** Define o título com mais destaque */
  title?: string | null;
  /** Define o texto com menos destaque */
  text?: string;
  /** Define o ícone a ser importado */
  icon?: React.ReactNode;
  /** Define a classe CSS adicional */
  className?: BaseProps['className'];
  /** Define o id do callout */
  id?: BaseProps['id'];
  /** Props adicionais para o elemento div */
  [key: string]: any;
}
