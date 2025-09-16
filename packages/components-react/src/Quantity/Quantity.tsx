import React, { useState, useRef, useCallback, useEffect, useId, useMemo } from 'react';
import Button from '../Button/Button';
import './Quantity.scss';
import { Add16Regular, Subtract16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
/**
 * Interface para as propriedades do componente Quantity
 */
export interface QuantityProps {
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
  /** Valor do incremento/decremento */
  step?: number;
  /** ID personalizado para o input */
  id?: string;
  /** ClassName adicional para customização */
  className?: string;
}

/**
 * Componente Quantity - permite incrementar/decrementar valores numéricos
 * Suporta modo controlado e não controlado, valores decimais e inteiros
 */
const Quantity: React.FC<QuantityProps> = ({
  defaultValue = 0,
  value: controlledValue,
  onChange,
  disabled = false,
  decimal = false,
  decimalPlaces = 2,
  size = 'lg',
  id,
  step,
  className
}) => {
  // Determina se o componente é controlado externamente
  const isControlled = controlledValue !== undefined;

  // Estados internos para valor e input
  const [value, setValue] = useState<number>(isControlled ? controlledValue : defaultValue);
  const [inputValue, setInputValue] = useState<string>(
    decimal 
      ? (isControlled ? controlledValue : defaultValue).toFixed(decimalPlaces) 
      : String(isControlled ? controlledValue : defaultValue)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Calcula o valor do step baseado nas props
  const stepValue = step !== undefined ? step : decimal ? Math.pow(10, -decimalPlaces) : 1;

  // Valores computados com useMemo para otimização
  const computedValue = useMemo(() => (isControlled ? controlledValue! : value), [isControlled, controlledValue, value]);
  const isMinValue = useMemo(() => computedValue === 0, [computedValue]);

  /**
   * Sincroniza estado interno com valor controlado externamente
   */
  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setValue(controlledValue);
      setInputValue(decimal ? controlledValue.toFixed(decimalPlaces) : String(controlledValue));
    }
  }, [controlledValue, decimal, decimalPlaces, isControlled]);

  /**
   * Incrementa o valor atual
   * Atualiza estado interno se não controlado e chama callback onChange
   */
  const increment = useCallback(() => {
    if (disabled) return;

    const newValue = computedValue + stepValue;

    if (!isControlled) {
      setValue(newValue);
      setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    }

    onChange?.(newValue);
  }, [disabled, computedValue, stepValue, decimal, decimalPlaces, isControlled, onChange]);

  /**
   * Decrementa o valor atual
   * Garante que o valor não seja menor que 0
   */
  const decrement = useCallback(() => {
    if (disabled) return;

    const newValue = Math.max(0, computedValue - stepValue);

    if (!isControlled) {
      setValue(newValue);
      setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    }

    onChange?.(newValue);
  }, [disabled, computedValue, stepValue, decimal, decimalPlaces, isControlled, onChange]);

  /**
   * Manipula mudanças no input
   * Valida entrada baseada no tipo (decimal/inteiro) e aplica máscaras
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Permite limpar o campo completamente
      if (newValue === '') {
        setInputValue('');
        if (!isControlled) setValue(0);
        onChange?.(0);
        return;
      }

      // Regex para validação de entrada
      const integerRegex = /^\d*$/;
      const decimalRegex = /^\d*\.?\d*$/;

      // Valida formato baseado no tipo
      if (!decimal && !integerRegex.test(newValue)) return;
      if (decimal && !decimalRegex.test(newValue)) return;

      // Limita tamanho para valores inteiros
      if (!decimal && newValue.length > 4) return;

      // Remove zero inicial quando usuario digita novo numero
      let finalValue = newValue;
      if (inputValue === '0' && newValue.length === 2 && /^\d+$/.test(newValue)) {
        finalValue = newValue.slice(1);
        setInputValue(finalValue);
      } else {
        setInputValue(newValue);
      }

      const parsedValue = decimal ? parseFloat(finalValue) : parseInt(finalValue, 10);

      if (!isNaN(parsedValue)) {
        // Valida casas decimais
        if (decimal) {
          const [, decimalPart] = finalValue.split('.');
          if (decimalPart && decimalPart.length > decimalPlaces) return;
        }

        if (!isControlled) setValue(parsedValue);
        onChange?.(parsedValue);
      }
    },
    [decimal, decimalPlaces, isControlled, onChange, inputValue]
  );

  /**
   * Permite alterações de valor via teclado (setas direita/esquerda)
   */
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        increment();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        decrement();
      }
    },
    [disabled, increment, decrement]
  );

  // Gera ID único se não fornecido
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div className={clsx('zds-quantity', { disabled }, className)}>
      <Button 
        variant='outlined' 
        size={size} 
        type='button' 
        icon={<Subtract16Regular />}
        onClick={decrement} 
        disabled={disabled || isMinValue} 
        aria-label='Diminuir quantidade' 
      />
    
      <input
        ref={inputRef}
        className={clsx('zds-quantity__input', { disabled })}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        id={inputId}
        min='0'
        step={stepValue}
        aria-label='Quantidade'
        role='spinbutton'
        aria-valuenow={computedValue}
        aria-valuemin={0}
        aria-valuemax={decimal ? undefined : 9999}
        aria-describedby={`${inputId}-help`}
        disabled={disabled}
      />
      <Button 
        variant='outlined' 
        size={size} 
        type='button' 
        onClick={increment}  
        disabled={disabled} 
        aria-label='Aumentar quantidade' 
        icon={ <Add16Regular />}
        
        />
      
    </div>
  );
};


const memorizedQuantity = React.memo(Quantity);
memorizedQuantity.displayName = 'Quantity';

export default memorizedQuantity;