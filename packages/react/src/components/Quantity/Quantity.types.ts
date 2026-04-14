import { Size, BaseProps } from '../../types/common.types';

/**
 * Props do componente Quantity
 * @example
 * ```tsx
 * <Quantity 
 *   value={quantity}
 *   onChange={setQuantity}
 *   size="lg"
 * />
 * ```
 * @example
 * ```tsx
 * <Quantity 
 *   value={1}
 *   decimal={true}
 *   decimalPlaces={2}
 *   step={0.5}
 *   disabled={false}
 * />
 * ```
 */
export interface QuantityProps extends BaseProps {
  /** Valor do componente */
  value?: number;
  
  /** Callback executado quando o valor muda: (value) => void */
  onChange?: (value: number) => void;
  
  /** Habilita entrada de valores decimais */
  decimal?: boolean;
  
  /** Tamanho do componente */
  size?: Size;
  
  /** Número de casas decimais permitidas */
  decimalPlaces?: number;
  
  /** Incremento/decremento ao clicar nos botões */
  valueIncrement?: number;

  /** Controla o tamanho do input baseado no número de caracteres */
  inputSize?: number;


  /** Habilita controle do tamanho do input baseado no número de caracteres */
  inputSizeControl?: boolean;

  /** Valor mínimo permitido */
  minValue?: number;

  /** Valor máximo permitido */
  maxValue?: number;

  /** Aria label for the decrement button. Default: 'Decrease quantity' */
  decrementAriaLabel?: string;

  /** Aria label for the increment button. Default: 'Increase quantity' */
  incrementAriaLabel?: string;

  /** Aria label for the quantity input. Default: 'Quantity' */
  inputAriaLabel?: string;
}
