import * as React from 'react';

export interface QuantityProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  decimal?: boolean;
  size?: 'lg' | 'sm';
  decimalPlaces?: number;
  step?: number;
  id?: string;
  className?: string;
}
