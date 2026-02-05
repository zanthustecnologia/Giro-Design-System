import { Size, BaseProps } from '../../types/common.types';

export interface QuantityProps {
  /** Valor padrão inicial */
  defaultValue?: number;
  /** Valor controlado externamente */
  value?: number;
  /** Callback chamado quando o valor muda */
  onChange?: (value: number) => void;
  /** Define se o componente está desabilitado */
  disabled?: BaseProps['disabled'];
  /** Define se o valor do input será decimal ou inteiro */
  decimal?: boolean;
  /** Define o tamanho do componente */
  size?: Size;
  /** Define o número de casas decimais quando decimal for true */
  decimalPlaces?: number;
  step?: number;
  id?: BaseProps['id'];
  /** ClassName adicional para customização */
  className?: BaseProps['className'];
}
