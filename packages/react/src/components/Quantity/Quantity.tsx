import React, { useState, useRef, useCallback, useEffect, useId, useMemo } from 'react';
import Button from '../Button/Button';
import './Quantity.module.scss';
import { Add16Regular, Subtract16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import type { QuantityProps } from './Quantity.types';

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

  const stepValue = step !== undefined ? step : decimal ? Math.pow(10, -decimalPlaces) : 1;

  const computedValue = useMemo(() => (isControlled ? controlledValue! : value), [isControlled, controlledValue, value]);
  const isMinValue = useMemo(() => computedValue === 0, [computedValue]);

  const validateProps = (decimalPlaces?: number, step?: number) => {
    if (decimalPlaces !== undefined && (decimalPlaces < 1 || decimalPlaces > 10)) {
      console.warn('decimalPlaces deve estar entre 1 e 10');
    }
    if (step !== undefined && step <= 0) {
      console.warn('step deve ser maior que 0');
    }
  };

  useEffect(() => {
    validateProps(decimalPlaces, step);
  }, []);

  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setValue(controlledValue);
      setInputValue(decimal ? controlledValue.toFixed(decimalPlaces) : String(controlledValue));
    }
  }, [controlledValue, decimal, decimalPlaces, isControlled]);

  const increment = useCallback(() => {
    if (disabled) return;

    const newValue = computedValue + stepValue;

    if (!isControlled) {
      setValue(newValue);
      setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    }

    onChange?.(newValue);
  }, [disabled, computedValue, stepValue, decimal, decimalPlaces, isControlled, onChange]);

  const decrement = useCallback(() => {
    if (disabled) return;

    const newValue = Math.max(0, computedValue - stepValue);

    if (!isControlled) {
      setValue(newValue);
      setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    }

    onChange?.(newValue);
  }, [disabled, computedValue, stepValue, decimal, decimalPlaces, isControlled, onChange]);

  const filterInput = useCallback((inputValue: string): string => {
    if (decimal) {
      let filtered = inputValue.replace(/[^\d.]/g, '');

      const parts = filtered.split('.');
      if (parts.length > 2) {
        filtered = parts[0] + '.' + parts.slice(1).join('');
      }

      if (filtered.length > 1 && filtered.startsWith('0') && !filtered.startsWith('0.')) {
        filtered = filtered.replace(/^0+/, '');
      }

      return filtered;
    } else {
      let filtered = inputValue.replace(/[^\d]/g, '');

      if (filtered.length > 1 && filtered.startsWith('0')) {
        filtered = filtered.replace(/^0+/, '');
      }

      return filtered || '0'; // Se ficar vazio, retorna '0'
    }
  }, [decimal]);
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const rawValue = event.target.value;

    // ✅ APLICAR: Filtro em tempo real
    const filteredValue = filterInput(rawValue);

    // ✅ SEMPRE: Atualizar input com valor filtrado
    setInputValue(filteredValue);

    // ✅ PROCESSAR: Apenas valores válidos
    if (filteredValue === '' || filteredValue === '.') {
      if (!isControlled) {
        setValue(0);
      }
      onChange?.(0);
      return;
    }

    if (decimal) {
      // Estados intermediários permitidos
      if (filteredValue.endsWith('.')) {
        return; // "5." é válido, mas não processa ainda
      }

      const parsedValue = parseFloat(filteredValue);
      if (!isNaN(parsedValue)) {
        if (!isControlled) {
          setValue(parsedValue);
        }
        onChange?.(parsedValue);
      }
    } else {
      const parsedValue = parseInt(filteredValue, 10);
      if (!isNaN(parsedValue)) {
        const validValue = Math.min(parsedValue, 9999);
        if (!isControlled) {
          setValue(validValue);
        }
        onChange?.(validValue);
      }
    }
  }, [disabled, decimal, isControlled, onChange]);


  const handleBlur = useCallback(() => {
    if (disabled) return;

    const currentValue = inputValue.trim();

    if (decimal) {
      if (currentValue === '' || currentValue === '.') {
        const resetValue = computedValue;
        setInputValue(resetValue.toFixed(decimalPlaces));
        return;
      }

      if (currentValue.endsWith('.')) {
        const baseValue = parseFloat(currentValue.slice(0, -1));
        if (!isNaN(baseValue)) {
          const formattedValue = baseValue.toFixed(decimalPlaces);
          setInputValue(formattedValue);

          if (!isControlled) {
            setValue(baseValue);
          }
          onChange?.(baseValue);
        }
        return;
      }

      const parsedValue = parseFloat(currentValue);
      if (!isNaN(parsedValue)) {
        const normalizedValue = Math.max(0, parsedValue);
        const formattedValue = normalizedValue.toFixed(decimalPlaces);
        setInputValue(formattedValue);

        if (!isControlled) {
          setValue(normalizedValue);
        }
        onChange?.(normalizedValue);
      } else {

        setInputValue(computedValue.toFixed(decimalPlaces));
      }
    } else {

      if (currentValue === '') {
        setInputValue(String(computedValue));
        return;
      }

      const parsedValue = parseInt(currentValue, 10);
      if (isNaN(parsedValue)) {
        setInputValue(String(computedValue));
      } else {
        const normalizedValue = Math.max(0, Math.min(parsedValue, 9999));
        setInputValue(String(normalizedValue));
        if (!isControlled) {
          setValue(normalizedValue);
        }
        onChange?.(normalizedValue);
      }
    }
  }, [disabled, decimal, inputValue, decimalPlaces, computedValue, isControlled, onChange]);


  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          increment();
          break;

        case 'ArrowDown':
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
        iconOnly
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
        iconOnly
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