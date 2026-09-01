import * as React from 'react';

import { Size, ScalableProps } from '../../types/common.types';

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
 *   valueIncrement={0.5}
 *   disabled={false}
 * />
 * ```
 */
export interface QuantityProps extends ScalableProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'size' | 'onChange'>  {
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

  /**
   * Tamanho fixo do input, medido em caracteres (unidade CSS `ch`).
   * O valor define quantos caracteres cabem visivelmente no campo sem necessidade de rolar.
   * Exemplo: `inputSize={4}` reserva espaço para 4 caracteres ("9999").
   * Se omitido, o tamanho é ajustado automaticamente conforme o conteúdo digitado.
   */
  inputSize?: number;

  /** Valor mínimo permitido */
  minValue?: number;

  /** Valor máximo permitido */
  maxValue?: number;

  /** Aria label para o botão de decremento. Padrão: 'Diminuir quantidade' */
  decrementAriaLabel?: string;

  /** Aria label para o botão de incremento. Padrão: 'Aumentar quantidade' */
  incrementAriaLabel?: string;

  /** Aria label para a entrada de quantidade. Padrão: 'Quantidade' */
  inputAriaLabel?: string;
}
