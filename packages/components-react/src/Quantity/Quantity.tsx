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
  // ...existing code...
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    let newValue = event.target.value;
    
    if (decimal) {
      // Regex que permite números decimais
      const decimalRegex = /^[0-9]*\.?[0-9]*$/;

      if (!decimalRegex.test(newValue)) {
        return; 
      }

      // Verifica se há mais de um ponto decimal
      const dotCount = (newValue.match(/\./g) || []).length;
      if (dotCount > 1) {
        return; 
      }

      // Atualiza o valor do input sempre
      setInputValue(newValue);

      // Se o valor está vazio ou é apenas um ponto, define como 0
      if (newValue === '' || newValue === '.') {
        if (!isControlled) {
          setValue(0);
        }
        onChange?.(0);
        return;
      }
      
      // Se termina com ponto, não tenta fazer parse ainda (permite digitação)
      if (newValue.endsWith('.')) {
        return;
      }
  
      // Faz o parse do valor decimal
      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        if (!isControlled) {
          setValue(parsedValue);
        }
        onChange?.(parsedValue);
      }

    } else {
      // Modo inteiro
      const integerRegex = /^[0-9]*$/;
      if (!integerRegex.test(newValue)) {
        return;
      }

      setInputValue(newValue);

      if (newValue.trim() === '') {
        if (!isControlled) {
          setValue(0);
        }
        onChange?.(0);
        return;
      }

      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        const validValue = Math.min(parsedValue, 9999);
        if (!isControlled) {
          setValue(validValue);
        }
        onChange?.(validValue);
      }
    }
  }, [disabled, decimal, isControlled, onChange]);

  /**
   * Manipula o evento de blur do input
   * Normaliza valores decimais que terminam com ponto
   */
  const handleBlur = useCallback(() => {
    if (disabled || !decimal) return;

    // Se o valor termina com ponto, remove o ponto
    if (inputValue.endsWith('.')) {
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);
      
      const parsedValue = newValue === '' ? 0 : parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        if (!isControlled) {
          setValue(parsedValue);
        }
        onChange?.(parsedValue);
      }
    }
  }, [disabled, decimal, inputValue, isControlled, onChange]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          e.preventDefault();
          increment();
          break;

        case 'ArrowDown':
        case 'ArrowLeft':
          e.preventDefault();
          decrement();
          break;

        case 'Enter':
          e.preventDefault();
          if (inputRef.current) {
            inputRef.current.blur();
          }
          break;

        case 'Escape':
          e.preventDefault();
          if (inputRef.current) {
            setInputValue(decimal ? computedValue.toFixed(decimalPlaces) : String(computedValue));
            inputRef.current.blur();
          }
          break;

        case 'Home':
          e.preventDefault();
          const minValue = 0;
          if (!isControlled) {
            setValue(minValue);
            setInputValue(decimal ? minValue.toFixed(decimalPlaces) : String(minValue));
          }
          onChange?.(minValue);
          break;

        case 'End':
          if (!decimal) {
            e.preventDefault();
            const maxValue = 9999;
            if (!isControlled) {
              setValue(maxValue);
              setInputValue(String(maxValue));
            }
            onChange?.(maxValue);
          }
          break;
      }
    },
    [disabled, increment, decrement, decimal, decimalPlaces, isControlled, onChange, computedValue]
  );

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
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        id={inputId}
        min='0'
        step={stepValue}
        aria-label='Quantidade'
        role='spinbutton'
        aria-valuenow={computedValue}
        aria-valuemin={0}
        aria-valuemax={decimal ? undefined : 9999}
        disabled={disabled}
        inputMode={decimal ? 'decimal' : 'numeric'}

      />
      <Button
        variant='outlined'
        size={size}
        type='button'
        onClick={increment}
        disabled={disabled}
        aria-label='Aumentar quantidade'
        icon={<Add16Regular />}

      />

    </div>
  );
};


const memorizedQuantity = React.memo(Quantity);
memorizedQuantity.displayName = 'Quantity';

export default memorizedQuantity;