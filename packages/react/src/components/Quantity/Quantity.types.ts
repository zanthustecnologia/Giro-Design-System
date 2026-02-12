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
 *   defaultValue={1}
 *   decimal={true}
 *   decimalPlaces={2}
 *   step={0.5}
 *   disabled={false}
 * />
 * ```
 */
export interface QuantityProps extends BaseProps {
  /** Valor inicial (modo não controlado) */
  defaultValue?: number;
  
  /** Valor atual (modo controlado) */
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
  step?: number;
}
