import { Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useCallback, useId, useEffect } from 'react';

import { forwardRef } from '../../utils/forwardRef';

import useInputKeyboardValue from '../../hooks/useInputKeyboardValue';
import VirtualKeyboard from '../VirtualKeyboard';
import styles from './TextField.module.scss';
import { validateInput } from './utils';
import LabelComponent from '../../shared/Label';

import type { TextFieldProps } from './TextField.types';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((
  {
    className,
    style,
    value,
    label,
    placeholder,
    type = 'text',
    onChange,
    disabled = false,
    maxLength,
    required = false,
    helperText,
    tooltipText,
    tooltipSide = 'bottom',
    tooltipAlign = 'start',
    errorMessage,
    error,
    id,
    icon,
    scale = 1,
    onBlur,
    onFocus,
    name,
    persistIcon = false,
    virtualKeyboard,
    attachedToVirtualKeyboard,
    disableAutoComplete = false,
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
    const { internalRef: inputRef, setRefs: setInputRefs } = useInputKeyboardValue(ref);
    const generatedId = useId();
    const componentId = id || generatedId;

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

    const showCustomIcon = (inputValue.trim().length === 0 || persistIcon) && icon;
    const showClearIcon = isFocused && inputValue.trim().length > 0;
    const hasError = Boolean(inputError) || Boolean(error);
    const displayHelperText = (error ? errorMessage : undefined) || inputError || helperText || '\u00A0';
    const helperId = (inputError || error)
      ? `${componentId}-error`
      : helperText
        ? `${componentId}-helper`
        : undefined;

    const containerStyle = { '--giro-scale': scale } as React.CSSProperties;

    const containerClass = clsx(styles.container, className, {
      [styles.attachedToVirtualKeyboard]: attachedToVirtualKeyboard,
      [styles.disabled]: disabled,
      [styles.error]: hasError,
      [styles.errorWithMessage]: !!errorMessage,
    });

    return (
      <div className={containerClass} style={{ ...containerStyle, ...style }}>
        {label && (
          <LabelComponent scale={scale}
            htmlFor={componentId}
            required={required}
            tooltip={!!tooltipText}
            tooltipText={tooltipText}
            side={tooltipSide}
            align={tooltipAlign}
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
              inputMode={(virtualKeyboard === 'default' || virtualKeyboard === 'numeric') ? 'none' : rest.inputMode}
              autoComplete={(disableAutoComplete || virtualKeyboard === 'default' || virtualKeyboard === 'numeric') ? 'off' : rest.autoComplete}
              className={clsx({
                [styles.inputWithIcon]: showCustomIcon || showClearIcon,
              })}
            />
            
            {showCustomIcon && <span className={styles.icon}>{icon}</span>}
            
            {showClearIcon && (
              <button
                type="button"
                className={styles.clearButton}
                onMouseDown={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleClear();
                }}
                aria-label="Limpar campo"
                tabIndex={-1}
              >
                <span className={styles.clearButtonIcon}><Dismiss16Regular /></span>
              </button>
            )}
          </div>

          {((error && errorMessage) || inputError || helperText) && (  
            <span
              id={helperId}
              className={styles.helperText}
              aria-live={hasError ? 'polite' : undefined}
            >
              {displayHelperText}
            </span>
          )}
        </div>

        {(virtualKeyboard === 'default' || virtualKeyboard === 'numeric') && (
          <div className="virtualKeyboardWrapper">
            <VirtualKeyboard
              variant="native"
              type={virtualKeyboard}
              value={inputValue}
              maxLength={maxLength}
              targetRef={inputRef}
              onChange={(val: string) => {
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
});

TextField.displayName = 'TextField';

export default React.memo(TextField);
