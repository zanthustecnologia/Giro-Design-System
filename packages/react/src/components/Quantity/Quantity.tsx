import { Add16Regular, Subtract16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useRef, useCallback, useEffect, useId, useMemo } from 'react';

import styles from './Quantity.module.scss';
import Button from '../Button/Button';

import type { QuantityProps } from './Quantity.types';

const Quantity: React.FC<QuantityProps> = ({
  value = 0,
  onChange,
  disabled = false,
  decimal = false,
  decimalPlaces = 2,
  size = 'lg',
  id,
  valueIncrement = 1,
  className,
  inputSize = 6,
  inputSizeControl = true,
  minValue = 0,
  maxValue = 9999,
  decrementAriaLabel = 'Decrease quantity',
  incrementAriaLabel = 'Increase quantity',
  inputAriaLabel = 'Quantity',
  ...rest
}) => {
  const initialValue = Math.min(Math.max(value, minValue), maxValue);
  const [internalValue, setInternalValue] = useState<number>(initialValue);
  const [inputValue, setInputValue] = useState<string>(
    decimal ? initialValue.toFixed(decimalPlaces) : String(initialValue)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const stepValue = valueIncrement !== undefined ? valueIncrement : decimal ? Math.pow(10, -decimalPlaces) : 1;

  const isMinValue = useMemo(() => internalValue <= minValue, [internalValue, minValue]);
  const isMaxValue = useMemo(() => internalValue >= maxValue, [internalValue, maxValue]);

  const validateProps = (decimalPlaces?: number, valueIncrement?: number) => {
    if (decimalPlaces !== undefined && (decimalPlaces < 1 || decimalPlaces > 10)) {
      console.warn('decimalPlaces deve estar entre 1 e 10');
    }
    if (valueIncrement !== undefined && valueIncrement <= 0) {
      console.warn('valueIncrement deve ser maior que 0');
    }
  };

  useEffect(() => {
    validateProps(decimalPlaces, valueIncrement);
  }, []);

  useEffect(() => {
    const clamped = Math.min(Math.max(value, minValue), maxValue);
    setInternalValue(clamped);
    setInputValue(decimal ? clamped.toFixed(decimalPlaces) : String(clamped));
  }, [value, minValue, maxValue, decimal, decimalPlaces]);

  const increment = useCallback(() => {
    if (disabled) return;

    const newValue = Math.min(maxValue, internalValue + stepValue);

    setInternalValue(newValue);
    setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    onChange?.(newValue);
  }, [disabled, internalValue, stepValue, decimal, decimalPlaces, onChange, maxValue]);

  const decrement = useCallback(() => {
    if (disabled) return;

    const newValue = Math.max(minValue, internalValue - stepValue);

    setInternalValue(newValue);
    setInputValue(decimal ? newValue.toFixed(decimalPlaces) : String(newValue));
    onChange?.(newValue);
  }, [disabled, internalValue, stepValue, decimal, decimalPlaces, onChange, minValue]);

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

    const filteredValue = filterInput(rawValue);

    setInputValue(filteredValue);

    if (filteredValue === '' || filteredValue === '.') {
      onChange?.(0);
      return;
    }

    if (decimal) {
      if (filteredValue.endsWith('.')) {
        return;
      }

      const parsedValue = parseFloat(filteredValue);
      if (!isNaN(parsedValue)) {
        onChange?.(parsedValue);
      }
    } else {
      const parsedValue = parseInt(filteredValue, 10);
      if (!isNaN(parsedValue)) {
        const validValue = Math.min(Math.max(parsedValue, minValue), maxValue);
        onChange?.(validValue);
      }
    }
  }, [disabled, decimal, filterInput, onChange, minValue, maxValue]);


  const handleBlur = useCallback(() => {
    if (disabled) return;

    const currentValue = inputValue.trim();

    if (decimal) {
      if (currentValue === '' || currentValue === '.') {
        setInputValue(internalValue.toFixed(decimalPlaces));
        return;
      }

      if (currentValue.endsWith('.')) {
        const baseValue = parseFloat(currentValue.slice(0, -1));
        if (!isNaN(baseValue)) {
          const formattedValue = baseValue.toFixed(decimalPlaces);
          setInputValue(formattedValue);
          setInternalValue(baseValue);
          onChange?.(baseValue);
        }
        return;
      }

      const parsedValue = parseFloat(currentValue);
      if (!isNaN(parsedValue)) {
        const normalizedValue = Math.min(Math.max(parsedValue, minValue), maxValue);
        const formattedValue = normalizedValue.toFixed(decimalPlaces);
        setInputValue(formattedValue);
        setInternalValue(normalizedValue);
        onChange?.(normalizedValue);
      } else {
        setInputValue(internalValue.toFixed(decimalPlaces));
      }
    } else {

      if (currentValue === '') {
        setInputValue(String(internalValue));
        return;
      }

      const parsedValue = parseInt(currentValue, 10);
      if (isNaN(parsedValue)) {
        setInputValue(String(internalValue));
      } else {
        const normalizedValue = Math.min(Math.max(parsedValue, minValue), maxValue);
        setInputValue(String(normalizedValue));
        setInternalValue(normalizedValue);
        onChange?.(normalizedValue);
      }
    }
  }, [disabled, decimal, inputValue, decimalPlaces, internalValue, onChange, minValue, maxValue]);


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
            setInputValue(decimal ? internalValue.toFixed(decimalPlaces) : String(internalValue));
            inputRef.current.blur();
          }
          break;

        case 'Home':
          e.preventDefault();
          setInternalValue(minValue);
          setInputValue(decimal ? minValue.toFixed(decimalPlaces) : String(minValue));
          onChange?.(minValue);
          break;

        case 'End':
          if (!decimal) {
            e.preventDefault();
            setInternalValue(maxValue);
            setInputValue(String(maxValue));
            onChange?.(maxValue);
          }
          break;
      }
    },
    [disabled, increment, decrement, decimal, decimalPlaces, onChange, internalValue, minValue, maxValue]
  );

  const inputSizeValue = inputSizeControl ? inputSize  : Math.max(1, inputValue.length);

  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div className={clsx(styles.quantity, { [styles.disabled]: disabled }, className)} {...rest}>
      <Button
        variant='outlined'
        size={size}
        type='button'
        iconOnly
        icon={<Subtract16Regular />}
        onClick={decrement}
        disabled={disabled || isMinValue}
        aria-label={decrementAriaLabel}

      />

      <input
        ref={inputRef}
        className={clsx(styles.quantityInput, { [styles.disabled]: disabled })}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        id={inputId}
        step={stepValue}
        aria-label={inputAriaLabel}
        role='spinbutton'
        aria-valuenow={internalValue}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        disabled={disabled}
        inputMode={decimal ? 'decimal' : 'numeric'}
        size={inputSizeValue}
      />
      <Button
        variant='outlined'
        size={size}
        type='button'
        iconOnly
        onClick={increment}
        disabled={disabled || isMaxValue}
        aria-label={incrementAriaLabel}
        icon={<Add16Regular />}

      />

    </div>
  );
};


const memorizedQuantity = React.memo(Quantity);
memorizedQuantity.displayName = 'Quantity';

export default memorizedQuantity;