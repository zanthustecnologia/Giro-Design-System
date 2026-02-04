import * as React from 'react';

export interface QuantityProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  /** Valor padrão inicial */
  defaultValue?: number;
  /** Valor controlado externamente */
  value?: number;
  /** Callback chamado quando o valor muda */
  onChange?: (value: number) => void;
  /** Define se o componente está desabilitado */
  disabled?: boolean;
  /** Define se o valor do input será decimal ou inteiro */
  decimal?: boolean;
  /** Define o tamanho do componente */
  size?: 'lg' | 'sm';
  /** Define o número de casas decimais quando decimal for true */
  decimalPlaces?: number;
  step?: number;
  id?: string;
  /** ClassName adicional para customização */
  className?: string;
}
