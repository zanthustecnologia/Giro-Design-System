import { Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useCallback, useId, forwardRef, useEffect, useRef } from 'react';

import VirtualKeyboard from '../VirtualKeyboard';
import styles from './TextField.module.scss';
import { validateInput } from './utils';
import LabelComponent from '../../shared/Label';

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
      error,
      id,
      icon,
      onBlur,
      onFocus,
      name,
      persistIcon = false,
      virtualKeyboard = false,
      virtualKeyboardType,
      virtualKeyboardMaxLength,
      attachedToVirtualKeyboard = false,
      ...rest
    },
    ref
  ) => {
    const normalizeValue = (val: string | number | undefined): string => {
      return val === undefined || val === null ? '' : String(val);
    };
    
    const [inputValue, setInputValue] = useState(normalizeValue(value));
    const [inputError, setInputError] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const componentId = id || generatedId;

    const setInputRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
          return;
        }

        if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      const newValue = normalizeValue(value);
      setInputValue(newValue);
      
      if (inputError) {
        const validationError = validateInput({
          value: newValue,
          type,
          maxLength,
          errorMessage,
          required,
        });
        setInputError(validationError);
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
    const hasError = Boolean(inputError) || Boolean(error);
    const displayHelperText = (error ? errorMessage : undefined) || inputError || helperText || '\u00A0';
    const helperId = (inputError || error)
      ? `${componentId}-error`
      : helperText
        ? `${componentId}-helper`
        : undefined;

    const containerClass = clsx(styles.container, {
      [styles.disabled]: disabled,
      [styles.error]: hasError && !disabled,
      [styles.errorWithMessage]: Boolean(error) && Boolean(errorMessage) && !disabled,
      [styles.attachedToVirtualKeyboard]: attachedToVirtualKeyboard,
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
              {...rest}
                ref={setInputRefs}
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
              inputMode={virtualKeyboard ? 'none' : rest.inputMode}
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

          {(errorMessage || inputError || helperText) && (  
            <span
              id={helperId}
              className={styles.helperText}
              aria-live={hasError ? 'polite' : undefined}
            >
              {displayHelperText}
            </span>
          )}
        </div>

        {virtualKeyboard && (
          <div className={styles.virtualKeyboardWrapper}>
            <VirtualKeyboard
              mode="native"
              type={virtualKeyboardType}
              value={inputValue}
              maxLength={maxLength ?? virtualKeyboardMaxLength}
              targetRef={inputRef}
              onChange={(val) => {
                if (!disabled && (!maxLength || val.length <= maxLength)) {
                  setInputValue(val);
                  onChange?.(val);
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default React.memo(TextField);
