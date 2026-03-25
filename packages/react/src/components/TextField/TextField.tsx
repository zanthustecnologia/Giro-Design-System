import React, { useState, useCallback, useId, forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import { Dismiss16Regular } from '@fluentui/react-icons';
import LabelComponent from '../../shared/Label';
import styles from './TextField.module.scss';
import { validateInput } from './utils';
import type { TextFieldProps } from './TextField.types';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      value,
      label,
      placeholder,
      type = 'text',
      onChange,
      disabled = false,
      maxLength = 30,
      required = false,
      helperText,
      tooltip = false,
      tooltipText,
      side = 'bottom',
	    align = 'start',
      errorMessage,
      id,
      icon,
      onBlur,
      onFocus,
      name,
      ...inputProps
    },
    ref
  ) => {
    const normalizeValue = (val: string | number | undefined): string => {
      return val === undefined || val === null ? '' : String(val);
    };
    
    const [inputValue, setInputValue] = useState(normalizeValue(value));
    const [inputError, setInputError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const generatedId = useId();
    const componentId = id || generatedId;

    useEffect(() => {
      const newValue = normalizeValue(value);
      setInputValue(newValue);
      
      // Reavaliar erro quando valor muda externamente (ex: DatePicker atualiza o campo)
      if (inputError) {
        const error = validateInput({
          value: newValue,
          type,
          maxLength,
          errorMessage,
          required,
        });
        setInputError(error);
      }
    }, [value, inputError, type, maxLength, errorMessage, required]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (!disabled && (!maxLength || newValue.length <= maxLength)) {
          setInputValue(newValue);
          onChange?.(newValue);
        }
      },
      [disabled, maxLength, onChange]
    );

    const handleClear = useCallback(() => {
      if (!disabled) {
        setInputValue('');
        onChange?.('');
      }
    }, [disabled, onChange]);

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const error = validateInput({
          value: inputValue,
          type,
          maxLength,
          errorMessage,
          required,
        });
        setInputError(error);
        setIsFocused(false);
        onBlur?.(e);
      },
      [inputValue, type, maxLength, errorMessage, required, onBlur]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const showCustomIcon = inputValue.trim().length === 0 && icon;
    const showClearIcon = isFocused && inputValue.trim().length > 0;
    const hasError = Boolean(inputError);
    const displayHelperText = inputError || helperText || '\u00A0';
    const helperId = inputError
      ? `${componentId}-error`
      : helperText
        ? `${componentId}-helper`
        : undefined;

    const containerClass = clsx(styles.container, {
      [styles.disabled]: disabled,
      [styles.error]: hasError && !disabled,
      [className!]: className,
    });

    return (
      <div className={containerClass}>
        {label && (
          <LabelComponent
            htmlFor={componentId}
            required={required}
            tooltip={tooltip}
            tooltipText={tooltipText}
            side={side}
            align={align}
            error={hasError}
            disabled={disabled}
          >
            {label}
          </LabelComponent>
        )}

        <div className={styles.inputWrapper}>
          <div className={styles.inputContainer}>
            <input
              {...inputProps}
              ref={ref}
              id={componentId}
              name={name}
              type={type}
              value={inputValue}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={maxLength}
              disabled={disabled}
              aria-invalid={hasError}
              aria-required={required}
              aria-describedby={helperId}
              className={clsx({
                [styles.inputWithIcon]: showCustomIcon || showClearIcon,
              })}
            />
            
            {showCustomIcon && <span className={styles.icon}>{icon}</span>}
            
            {showClearIcon && (
              <button
                type="button"
                className={styles.clearButton}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleClear();
                }}
                aria-label="Limpar campo"
                tabIndex={-1}
              >
                <Dismiss16Regular />
              </button>
            )}
          </div>

          <span
            id={helperId}
            className={styles.helperText}
            aria-live={hasError ? 'polite' : undefined}
          >
            {displayHelperText}
          </span>
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default React.memo(TextField);
