import clsx from 'clsx';
import React, { forwardRef } from 'react';
import './SelectField.scss';
import { Info12Regular } from '@fluentui/react-icons';
import Tooltip from '../Tooltip';

interface SelectFieldProps {
  /** ID do campo */
  id?: string;
  /** Nome do campo */
  name?: string;
  /** Valor exibido */
  value?: string;
  /** Placeholder */
  placeholder?: string;
  /** Label do campo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Campo obrigatório */
  required?: boolean;
  /** Campo desabilitado */
  disabled?: boolean;
  /** Ícone (chevron) */
  icon?: React.ReactNode;
  /** Estado aberto */
  isOpen?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Tooltip info */
  tooltip?: React.ReactNode;
  tooltipText?: string;
  positionTooltip?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  // ✅ NOVO: Props para validação
  /** Indica se o campo foi "tocado" (aberto e fechado) */
  isTouched?: boolean;
  /** Força estado de erro independente da validação interna */
  hasError?: boolean;
}

/**
 * Campo de entrada específico para Select
 * Baseado na estrutura visual do TextField
 */
const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(({
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
}, ref) => {

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
    'zds-select-field',
    {
      'zds-select-field--open': isOpen,
      'zds-select-field--disabled': disabled,
      'zds-select-field--error': showError,
      'zds-select-field--required': isRequired,
      'zds-select-field--touched': isTouched,
    },
    className
  );

  const displayClasses = clsx(
    'zds-select-field__display',
    {
      'zds-select-field__display--placeholder': !hasValue,
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
              <div className="zds-select-field__container-tooltip">
                {label}
                {required && <span className="zds-select-field__required">*</span>}
                <Info12Regular className="zds-select-field__tooltip" />
              </div>
            </Tooltip>
          ) : (
            <div className="zds-select-field__container-tooltip">
              {label}
              {required && <span className="zds-select-field__required">*</span>}
            </div>
          )}
        </label>
      )}

      {/* Container Box */ }
  < div className = "zds-select-field__container-box" >
  <div className="zds-select-field__box__input">
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
      className='zds-select-field__input'
    />

    {/* Icon */}
    {icon && (
      <div className="zds-select-field__icon">
        {icon}
      </div>
    )}
  </div>

        {(helperText || showError) && (
    <div className="zds-select-field__helper-text">
      {showError ? dynamicErrorMessage : helperText}
    </div>
  )}
      </div >
    </div >
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;