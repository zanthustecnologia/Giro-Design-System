import React, { useState, useCallback, useEffect, useId } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dismiss16Regular, Info12Regular } from '@fluentui/react-icons';
import Tooltip from '../Tooltip/Tooltip';
import './textfield.scss';
import { validateInput } from './ValidationUtils';

interface TextFieldProps {
    name?: string;
    className?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    maxLength?: number;
    required?: boolean;
    helper?: boolean;
    helperText?: string;
    tooltip?: boolean;
    tooltipText?: string;
    positionTooltip?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    errorMessage?: string;
    trailingIcon?: boolean;
    id?: string;
    icon?: React.ReactNode;
};

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
    trailingIcon = false,
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
        const error = validateInput({
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

    const shouldRenderCustomIcon = !trailingIcon || inputValue.trim().length === 0 || !focus;
    const shouldRenderClearIcon = focus && inputValue.trim().length > 0;

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
                        aria-describedby={
                            inputError
                                ? `${componentId}-error`
                                : helper && helperText
                                ? `${componentId}-helper`
                                : undefined
                        }
                    />
                    {shouldRenderCustomIcon && <span className="zds-textfield__icon">{icon}</span>}
                    {shouldRenderClearIcon && (
                        <Dismiss16Regular
                            className="zds-textfield__icon"
                            onClick={clearInput}
                            aria-label="Limpar campo"
                            onMouseDown={(e) => e.preventDefault()}
                        />
                    )}
                </div>
                {inputError ? (
                    <span
                        id={`${componentId}-error`}
                        className="zds-textfield__helper-text"
                        aria-live="polite"
                    >
                        {inputError}
                    </span>
                ) : (
                    helper &&
                    helperText && (
                        <span
                            id={`${componentId}-helper`}
                            className="zds-textfield__helper-text"
                        >
                            {helperText}
                        </span>
                    )
                )}
            </div>
        </div>
    );
};

const MemoizedTextField = React.memo(TextField);
MemoizedTextField.displayName = 'TextField';
export default MemoizedTextField;