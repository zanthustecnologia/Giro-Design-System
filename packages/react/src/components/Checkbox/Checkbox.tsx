import * as React from 'react';
import { Checkbox as CheckboxRadix } from 'radix-ui';
import styles from './Checkbox.module.scss';
import { CheckSmall, CheckHalf } from '@/shared/icons';
import { CheckboxProps } from './Checkbox.types';
import clsx from 'clsx';
import { useId } from 'react';

const Checkbox: React.FC<CheckboxProps> = ({
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

  return (
    <div className={clsx(styles.container, className)}>
      <div
        className={clsx(styles.wrapperCheckbox, {
          [styles.disabled]: disabled,
        })}
        role="presentation"
        tabIndex={disabled ? -1 : 0}
      >
        <CheckboxRadix.Root
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
          <CheckboxRadix.Indicator className={styles.indicator}>
            {indeterminate ? <CheckHalf /> : <CheckSmall />}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      <label
        className={clsx(styles.label, { [styles.disabled]: disabled })}
        htmlFor={componentId}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
