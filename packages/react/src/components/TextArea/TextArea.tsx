import clsx from 'clsx';
import React, { useState, useCallback, useId, forwardRef, useEffect } from 'react';

import styles from './TextArea.module.scss';
import LabelComponent from '../../shared/Label';

import type { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      value,
      label,
      placeholder,
      onChange,
      disabled = false,
      maxLength,
      required = false,
      helperText,
      tooltip = false,
      tooltipText,
      side = 'bottom',
      align = 'start',
      errorMessage,
      id,
      onBlur,
      onFocus,
      name,
      rows = 4,
      resize = 'both',
      showCharCount = false,
      ...textareaProps
    },
    ref
  ) => {
    const normalizeValue = (val: string | undefined): string => {
      return val === undefined || val === null ? '' : String(val);
    };

    const [textareaValue, setTextareaValue] = useState(normalizeValue(value));
    const [textareaError, setTextareaError] = useState('');
    const generatedId = useId();
    const componentId = id || generatedId;

    useEffect(() => {
      setTextareaValue(normalizeValue(value));
    }, [value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        if (!disabled && (!maxLength || newValue.length <= maxLength)) {
          setTextareaValue(newValue);
          onChange?.(newValue);
        }
      },
      [disabled, maxLength, onChange]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (required && textareaValue.trim() === '') {
          setTextareaError(errorMessage || 'Campo obrigatório.');
        } else {
          setTextareaError('');
        }
        onBlur?.(e);
      },
      [textareaValue, required, errorMessage, onBlur]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(e);
      },
      [onFocus]
    );

    const hasError = Boolean(textareaError);
    const displayHelperText = textareaError || helperText || '\u00A0';
    const helperId = textareaError
      ? `${componentId}-error`
      : helperText
        ? `${componentId}-helper`
        : undefined;

    const containerClass = clsx(
      styles.container,
      disabled && styles.disabled,
      hasError && !disabled && styles.error,
      className
    );

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
            <textarea
              {...textareaProps}
              ref={ref}
              id={componentId}
              name={name}
              value={textareaValue}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={maxLength}
              disabled={disabled}
              rows={rows}
              aria-invalid={hasError}
              aria-required={required}
              aria-describedby={helperId}
              style={{ resize }}
            />
          </div>

          <div className={styles.footer}>
            <span
              id={helperId}
              className={styles.helperText}
              aria-live={hasError ? 'polite' : undefined}
            >
              {displayHelperText}
            </span>

            {showCharCount && maxLength && (
              <span className={styles.charCount}>
                {textareaValue.length}/{maxLength}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default React.memo(TextArea);
