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
  style,
  scale = 1,
  indeterminate = false,
  ...rest
}) => {
  const generatedId = React.useId();
  const componentId = id || generatedId;

  return (
    <div
      className={clsx(styles.container, className)}
      style={{ '--giro-scale': scale, ...style } as React.CSSProperties}
    >
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
