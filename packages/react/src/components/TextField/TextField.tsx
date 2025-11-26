import React, { useState, useCallback, useEffect, useId } from 'react';
import clsx from 'clsx';
import { Dismiss16Regular, Info12Regular } from '@fluentui/react-icons';
import Tooltip from '../Tooltip/Tooltip';
import './TextField.module.scss';
import { validateInput } from './ValidationUtils';
import type { TextFieldProps } from './TextField.types';

const TextField: React.FC<TextFieldProps> = ({
  name = 'textfield',
  className = '',
  value = '',
  label = '',
  placeholder = '',
  type = 'text',
  onChange = (value: string) => {},
  disabled = false,
  maxLength = 30,
  required = false,
  helper = false,
  helperText = '',
  tooltip = false,
  tooltipText = '',
  positionTooltip = 'top-right',
  errorMessage = '',
  id = '',
  icon = null,
}) => {
  const [inputValue, setValue] = useState(value);
  const [inputError, setInputError] = useState('');
  const [focus, setFocus] = useState(false);
  const componentId = id || useId();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!disabled && (!maxLength || newValue.length <= maxLength)) {
        setValue(newValue);
        onChange?.(newValue);
      }
    },
    [disabled, maxLength, onChange]
  );
  const clearInput = useCallback(() => {
    if (!disabled) {
      setValue('');
      onChange?.('');
    }
  }, [disabled, onChange]);

  const onBlur = useCallback(() => {
    const error =
      validateInput({
        value: inputValue,
        type,
        maxLength,
        errorMessage,
        required,
      }) || '';
    setInputError(error);
    setFocus(false);
  }, [inputValue, type, maxLength, errorMessage, required]);

  useEffect(() => {
    if (value !== inputValue) {
      setValue(value);
    }
  }, [value]);

  const TextFieldClass = clsx('zds-textfield__container', {
    'zds-textfield__error': inputError,
    'zds-textfield__disabled': disabled,
    [className]: className,
  });

  const shouldRenderCustomIcon =
    typeof inputValue === 'string' && inputValue.trim().length === 0;
  const shouldRenderClearIcon =
    focus && typeof inputValue === 'string' && inputValue.trim().length > 0;

  const helperContent = inputError || (helper && helperText) || '\u00A0';
  const helperId = inputError
    ? `${componentId}-error`
    : helper && helperText
      ? `${componentId}-helper`
      : undefined;

  return (
    <div className={TextFieldClass}>
      {label && (
        <label htmlFor={componentId} className="zds-textfield__wrapper-label">
          {tooltip ? (
            <Tooltip text={tooltipText} position={positionTooltip}>
              <div className="zds-textfield__container-tooltip">
                {label}
                {required && <span className="zds-textfield__required">*</span>}
                <Info12Regular className="zds-textfield__tooltip" />
              </div>
            </Tooltip>
          ) : (
            <div className="zds-textfield__container-tooltip">
              {label}
              {required && <span className="zds-textfield__required">*</span>}
            </div>
          )}
        </label>
      )}
      <div className="zds-textfield__container__box">
        <div className="zds-textfield__box__input">
          <input
            id={componentId}
            name={name}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setFocus(true)}
            onBlur={onBlur}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={!!inputError}
            aria-required={required}
            aria-describedby={helperId}
          />
          {shouldRenderCustomIcon && (
            <span className="zds-textfield__icon">{icon}</span>
          )}
          {shouldRenderClearIcon && (
            <Dismiss16Regular
              className="zds-textfield__icon"
              onClick={clearInput}
              aria-label="Limpar campo"
              onMouseDown={(e) => e.preventDefault()}
            />
          )}
        </div>

        <span
          id={helperId}
          className="zds-textfield__helper-text"
          aria-live={inputError ? 'polite' : undefined}
        >
          {helperContent}
        </span>
      </div>
    </div>
  );
};

const MemoizedTextField = React.memo(TextField);
MemoizedTextField.displayName = 'TextField';
export default MemoizedTextField;
