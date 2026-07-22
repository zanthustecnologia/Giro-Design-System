import clsx from 'clsx';
import React from 'react';
import styles from './SelectField.module.scss';
import { Info12Regular } from '@fluentui/react-icons';
import Tooltip from '../Tooltip';
import type { SelectFieldProps } from './SelectField.types';

const SelectField = ({
  ref,
  id,
  name,
  value,
  placeholder,
  label,
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  icon,
  isOpen = false,
  className,
  tooltip,
  tooltipText,
  isTouched = false,
  hasError = false,
  positionTooltip
}: SelectFieldProps & { ref?: React.Ref<HTMLDivElement> }) => {

  // ✅ NOVA LÓGICA: Validação de required
  const isRequired = required && !disabled;
  const hasValue = Boolean(value && value.trim().length > 0);
  const shouldShowRequiredError = isRequired && isTouched && !hasValue;

  // ✅ NOVA LÓGICA: Mensagem de erro dinâmica
  const dynamicErrorMessage = shouldShowRequiredError && !errorMessage
    ? 'Este campo é obrigatório'
    : errorMessage;

  // ✅ NOVA LÓGICA: Estado de erro combinado
  const showError = hasError || shouldShowRequiredError || Boolean(errorMessage);

  // Classes CSS
  const containerClasses = clsx(
    styles['zds-select-field'],
    {
      [styles['zds-select-field--open']]: isOpen,
      [styles['zds-select-field--disabled']]: disabled,
      [styles['zds-select-field--error']]: showError,
      [styles['zds-select-field--required']]: isRequired,
      [styles['zds-select-field--touched']]: isTouched,
    },
    className
  );

  const displayClasses = clsx(
    styles['zds-select-field__display'],
    {
      [styles['zds-select-field__display--placeholder']]: !hasValue,
      'has-value': hasValue,
    }
  );

  const displayText = hasValue ? value : placeholder;

  return (
    <div className={containerClasses} ref={ref}>
      {label && (
        <label htmlFor={id}>
          {tooltip ? (
            <Tooltip text={tooltipText} position={positionTooltip}>
              <div className={styles['zds-select-field__container-tooltip']}>
                {label}
                {required && <span className={styles['zds-select-field__required']}>*</span>}
                <Info12Regular className={styles['zds-select-field__tooltip']} />
              </div>
            </Tooltip>
          ) : (
            <div className={styles['zds-select-field__container-tooltip']}>
              {label}
              {required && <span className={styles['zds-select-field__required']}>*</span>}
            </div>
          )}
        </label>
      )}

      {/* Container Box */}
      < div className={styles['zds-select-field__container-box']} >
        <div className={styles['zds-select-field__box__input']}>
          {/* Display */}
          <div
            id={id}
            className={displayClasses}
            data-placeholder={!hasValue ? placeholder : undefined}
          >
            {displayText}
          </div>

          {/* Hidden Input */}
          <input
            type="hidden"
            name={name}
            value={value || ''}
            disabled={disabled}
            required={required}
            className={styles['zds-select-field__input']}
          />

          {/* Icon */}
          {icon && (
            <div className={styles['zds-select-field__icon']}>
              {icon}
            </div>
          )}
        </div>
        {!isOpen && (helperText || showError) && (
          <div className={styles['zds-select-field__helper-text']}>
            {showError ? dynamicErrorMessage : helperText}
          </div>
        )}
      </div >
    </div >
  );
};

SelectField.displayName = 'SelectField';

export default SelectField;