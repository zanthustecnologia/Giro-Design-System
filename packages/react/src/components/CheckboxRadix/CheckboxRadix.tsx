import * as React from 'react';
import { Checkbox } from 'radix-ui';
import styles from './CheckboxRadix.module.scss';
import { CheckSmall, CheckHalf } from '@/shared/icons';
import { CheckboxRadixProps } from './CheckboxRadix.types';
import clsx from 'clsx';
import { useId } from 'react';

const CheckboxRadix: React.FC<CheckboxRadixProps> = ({
  id,
  label,
  onCheckedChange,
  checked,
  disabled,
  className,
  indeterminate = false,
  ...rest
}) => {
  const componentId = id || useId();
  const checkboxRef = React.useRef<HTMLButtonElement>(null);

  const handleWrapperClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLLabelElement>
  ) => {
    
    if (e.target !== checkboxRef.current && !disabled) {
      e.stopPropagation();
      e.preventDefault();
      checkboxRef.current?.click();
    }
  };
  const handleWrapperKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      checkboxRef.current?.click();
    }
  };
  return (
    <div className={clsx(styles.container, className)}>
      <div
        className={clsx(styles.wrapperCheckbox, {
          [styles.disabled]: disabled,
        })}
        onClick={handleWrapperClick}
        role="presentation"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleWrapperKeyDown}
      >
        <Checkbox.Root
          ref={checkboxRef}
          className={styles.root}
          checked={checked}
          id={componentId}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          data-disabled={disabled}
          data-indeterminate={indeterminate}
          aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
          {...rest}
        >
          <Checkbox.Indicator className={styles.indicator}>
            {indeterminate ? <CheckHalf /> : <CheckSmall />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label
        className={clsx(styles.label, { [styles.disabled]: disabled })}
        htmlFor={componentId}
        onClick={handleWrapperClick}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxRadix;
