import * as React from 'react';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Define o tipo de callout */
  type?: 'neutral' | 'color' | 'brand' | 'alert' | 'success';
  /** Define o título com mais destaque */
  title?: string | null;
  /** Define o texto com menos destaque */
  text?: string;
  /** Define o ícone a ser importado */
  icon?: React.ReactNode;
  /** Define a classe CSS adicional */
  className?: string;
  /** Define o id do callout */
  id?: string;
}
