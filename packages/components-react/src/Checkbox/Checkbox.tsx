import React, { useEffect, useRef, useId, useState } from 'react';
import clsx from 'clsx';
import './Checkbox.scss';
import CheckSmall from './CheckSmall';
import CheckHalf from './CheckHalf';

export interface CheckboxProps {
  /** Unique identifier for the checkbox input */
  id?: string;
  /** Name attribute for the checkbox, used for form identification */
  name?: string;
  /** Controlled value indicating whether the checkbox is checked */
  checked?: boolean;
  /** Callback function triggered when the checkbox value changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text displayed next to the checkbox */
  label?: string | React.ReactNode;
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Value attribute for the checkbox input element */
  value?: string;
  /** AriaDescribedBy for the checkbox input element */
  ariaDescribedby?: string;
  /** Disables the checkbox, preventing user interaction */
  disabled?: boolean;
  /** Sets the checkbox to an indeterminate state (useful for parent-child relationships) */
  indeterminate?: boolean;
  /** Additional props passed to the checkbox input element */
  [key: string]: any;
}

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
  const [internalChecked, setInternalChecked] = useState<boolean>(checked);
  const [internalIndeterminate, setInternalIndeterminate] = useState<boolean>(indeterminate);

  const elementRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) return;
    
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);

    if (internalIndeterminate) {
      setInternalIndeterminate(false);
    }
    e.stopPropagation();
    onChange?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLLabelElement>): void => {
    e.preventDefault();
  };

  const checkboxClass = clsx(
    'zds-checkbox',
    {
      'zds-checkbox__disabled': disabled,
      'zds-checkbox__checked': internalChecked && !internalIndeterminate,
      'zds-checkbox__indeterminate': internalIndeterminate,
    },
    className
  );

    useEffect(() => {
    setInternalChecked(checked);
    console.log(checked);
    console.log(internalChecked)
  }, [checked]);

  useEffect(() => {
    setInternalIndeterminate(indeterminate);
  }, [indeterminate]);

  
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.indeterminate = internalIndeterminate;
    }
  }, [internalIndeterminate]);

  return (
    <div className={checkboxClass}>
      <label 
        htmlFor={inputId} 
        className="zds-checkbox__box-check" 
        onMouseDown={handleMouseDown}
      >
        <div
          className={clsx('zds-checkbox__checkmark', {
            'zds-checkbox__checkmark__checked': internalChecked && !internalIndeterminate,
            'zds-checkbox__checkmark__indeterminate': internalIndeterminate,
          })}
        >
          <input
            id={inputId}
            ref={elementRef}
            name={name}
            type="checkbox"
            value={value}
            checked={internalChecked}
            onChange={handleChange}
            disabled={disabled}
            aria-checked={internalIndeterminate ? 'mixed' : internalChecked}
            aria-describedby={ariaDescribedby || undefined}
            aria-label={typeof label === 'string' ? label : 'Checkbox'}
            tabIndex={disabled ? -1 : 0}
          />

          {internalChecked && !internalIndeterminate && (
            <span className="zds-checkbox__icon" aria-hidden="true">
              <CheckSmall  />
            </span>
          )}
          
          {internalIndeterminate && (
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