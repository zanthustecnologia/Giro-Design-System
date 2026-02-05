import { Size, BaseProps } from '../../types/common.types';

export interface QuantityProps {
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: BaseProps['disabled'];
  decimal?: boolean;
  size?: Size;
  decimalPlaces?: number;
  step?: number;
  id?: BaseProps['id'];
  className?: BaseProps['className'];
}
