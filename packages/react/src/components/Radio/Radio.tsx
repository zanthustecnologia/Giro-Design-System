import React from 'react';
import { RadioGroup } from 'radix-ui';
import styles from './Radio.module.scss';
import { RadioGroupProps } from './Radio.types';
import { useId } from 'react';
import clsx from 'clsx';
const Radio: React.FC<RadioGroupProps> = ({
  items,
  onValueChange,
  defaultValue,
  name,
  id,
  ariaLabel,
  orientation = 'vertical',
  ...rest
}) => {
  const componentId = id || useId();
  return (
    <RadioGroup.Root
      id={componentId}
      className={styles.root}
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
