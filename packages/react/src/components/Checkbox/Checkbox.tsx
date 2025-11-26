import React, { useEffect, useRef, useId, useState } from 'react';
import clsx from 'clsx';
import './Checkbox.module.scss';
import CheckSmall from './CheckSmall';
import CheckHalf from './CheckHalf';
import type { CheckboxProps } from './Checkbox.types';

/**
 * A customizable Checkbox component that supports controlled and uncontrolled states.
 */
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  onChange,
  label = 'Checkbox',
  className = '',
  value = '',
  disabled = false,
  indeterminate = false,
  checked = false,
  ariaDescribedby = '',
}) => {

  const elementRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return;
    onChange?.(e);
  };


  const checkboxClass = clsx(
    'zds-checkbox',
    {
      'zds-checkbox__disabled': disabled,
      'zds-checkbox__checked': checked && !indeterminate,
      'zds-checkbox__indeterminate': indeterminate,
    },
    className
  );


  
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={checkboxClass}>
      <label 
        htmlFor={inputId} 
        className="zds-checkbox__box-check" 
      >
        <div
          className={clsx('zds-checkbox__checkmark', {
            'zds-checkbox__checkmark__checked': checked && !indeterminate,
            'zds-checkbox__checkmark__indeterminate': indeterminate ,
          })}
        >
          <input
            id={inputId}
            ref={elementRef}
            name={name}
            type="checkbox"
            value={value}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-describedby={ariaDescribedby || undefined}
            aria-label={typeof label === 'string' ? label : 'Checkbox'}
            tabIndex={disabled ? -1 : 0}
          />

          {checked && !indeterminate && (
            <span className="zds-checkbox__icon" aria-hidden="true">
              <CheckSmall  />
            </span>
          )}

          {indeterminate && (
            <span className="zds-checkbox__icon" aria-hidden="true">
              <CheckHalf />
            </span>
          )}
        </div>
        
        {label && (
          <div className="zds-checkbox__text">
            <span className="zds-checkbox__label">{label}</span>
          </div>
        )}
      </label>
    </div>
  );
};

const MemoizedCheckbox = React.memo(Checkbox);
MemoizedCheckbox.displayName = 'Checkbox';

export default MemoizedCheckbox;