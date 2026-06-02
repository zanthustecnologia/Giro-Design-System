import clsx from 'clsx';
import { RadioGroup } from 'radix-ui';
import React, { useId } from 'react';

import styles from './Radio.module.scss';
import { RadioGroupProps } from './Radio.types';

const Radio: React.FC<RadioGroupProps> = ({
  items,
  onValueChange,
  defaultValue,
  name,
  id,
  ariaLabel,
  orientation = 'vertical',
  scale = 1,
  className,
  ...rest
}) => {
  const generatedId = useId();
  const componentId = id || generatedId;

  const scaleClass = {
    1: 'scale-1-0',
    1.5: 'scale-1-5',
    2: 'scale-2-0',
  }[scale];

  return (
    <RadioGroup.Root
      id={componentId}
      className={clsx(styles.root, scaleClass, className)}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      aria-label={ariaLabel}
      data-orientation={orientation}
      orientation={orientation}
      {...rest}
    >
      {items.map(({ id, value, disabled, label }) => {
        const itemKey = id ?? value;
        const uniqueId = `${componentId}-item-${value}`;
        return (
          <div
            key={itemKey}
            className={clsx(styles.wrapper, { [styles.disabled]: disabled })}
          >
            <label className={styles.labelWrapper} htmlFor={uniqueId}>
              <div className={styles.itemWrapper}>
                <RadioGroup.Item
                  disabled={disabled}
                  className={styles.item}
                  value={value}
                  id={uniqueId}
                  data-disabled={disabled}
                >
                  <RadioGroup.Indicator className={styles.indicator} />
                </RadioGroup.Item>
              </div>
              <span className={styles.labelText}>{label}</span>
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
};

export default Radio;
