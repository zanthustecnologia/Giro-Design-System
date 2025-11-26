import React, { useRef, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import './VerificationCode.module.scss';
import type { InputType, VerificationCodeProps } from './VerificationCode.types';

/**
 * Mapa de regex para validação dos tipos de entrada
 */
const REGEX_MAP: Record<InputType, RegExp> = {
  numeric: /^[0-9]$/,
  alpha: /^[a-zA-Z]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

/**
 * Componente VerificationCode para entrada de códigos de verificação
 * 
 * @description Permite entrada de códigos com múltiplos dígitos,
 * suportando diferentes tipos de caracteres e navegação por teclado.
 * 
 * @example
 * ```tsx
 * <VerificationCode
 *   length={6}
 *   inputType="numeric"
 *   onComplete={(code) => console.log('Código:', code)}
 *   hasError={false}
 * />
 * ```
 */
const VerificationCode: React.FC<VerificationCodeProps> = ({
  length = 6,
  inputType = 'numeric',
  onComplete,
  hasError = false,
  errorMessage = '',
  disabled = false,
  className = ''
}) => {

  const validLength = Math.min(Math.max(length, 1), 100);
  const [values, setValues] = useState<string[]>(Array(validLength).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const currentRegex = REGEX_MAP[inputType] || REGEX_MAP.numeric;


  useEffect(() => {
    setValues(Array(validLength).fill(''));
  }, [inputType, validLength]);

 
  const handleChange = useCallback((index: number, value: string): void => {

    if (!currentRegex.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (value && index < validLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every(v => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  }, [values, currentRegex, onComplete, validLength]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData('Text');
    const valuesToPaste = pasteData.split('').slice(0, validLength);

    const newValues = [...values];

    valuesToPaste.forEach((value, index) => {
      if (currentRegex.test(value)) {
        newValues[index] = value;
      }
    });

    setValues(newValues);

    const firstEmptyIndex = newValues.findIndex(v => v === '');
    const focusIndex = firstEmptyIndex === -1 ? validLength - 1 : firstEmptyIndex;
    inputsRef.current[focusIndex]?.focus();


    if (newValues.every(v => v !== '')) {
      onComplete?.(newValues.join(''));
    }
  }, [values, currentRegex, onComplete, validLength]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      const newValues = [...values];

      if (values[index]) {

        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {

        inputsRef.current[index - 1]?.focus();
        newValues[index - 1] = '';
        setValues(newValues);
      }
    }

    if (e.key === 'Delete') {
      e.preventDefault();

      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);

      if (index < validLength - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < validLength - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }, [values, validLength]);

  const handleKeyUp = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (values[index] && index < validLength - 1) {
        inputsRef.current[index + 1]?.focus();
      } else if (values[index] && index === validLength - 1) {
        inputsRef.current[index]?.blur();
      }
    }
  }, [values, validLength]);
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.select();
  }, []);

  return (
    <>
      <div className={clsx('zds-verification-code__container', className)}>
        {values.map((val, i) => (
          <input
            id={`zds-verification-code__element-${i}`}
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode={inputType === 'numeric' ? 'numeric' : 'text'}
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onKeyUp={(e) => handleKeyUp(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            onFocus={handleFocus}
            disabled={disabled}
            className={clsx('zds-verification-code__input', {
              'zds-verification-code__has-error': hasError,
              'zds-verification-code__filled': val,
            })}
            aria-invalid={hasError}
            aria-label={`Dígito ${i + 1} de ${validLength}`}
            aria-describedby={hasError && errorMessage ? 'verification-code-error' : undefined}
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {hasError && errorMessage && (
        <div
          id="verification-code-error"
          className="zds-verification-code__error"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default VerificationCode;