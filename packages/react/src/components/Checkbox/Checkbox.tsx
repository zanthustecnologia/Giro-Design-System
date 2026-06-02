import clsx from 'clsx';
import { Checkbox as CheckboxRadix } from 'radix-ui';
import * as React from 'react';

import { CheckSmall, CheckHalf } from '@/shared/icons';

import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.types';


const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  onCheckedChange,
  checked,
  disabled,
  className,
  scale = 1,
  indeterminate = false,
  ...rest
}) => {
  const componentId = id || React.useId();

  const scaleClass = {
    1: 'scale-1-0',
    1.5: 'scale-1-5',
    2: 'scale-2-0',
  }[scale];

  return (
    <div className={clsx(styles.container, scaleClass, className)}>
      <div
        className={clsx(styles.wrapperCheckbox, {
          [styles.disabled]: disabled,
        })}
        role="presentation"
        tabIndex={disabled ? -1 : 0}
      >
        <CheckboxRadix.Root
          className={styles.root}
          checked={indeterminate ? 'indeterminate' : checked}
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
