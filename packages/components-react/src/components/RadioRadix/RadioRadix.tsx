import * as RadioGroup from '@radix-ui/react-radio-group';
import styles from './RadioRadix.module.scss';
import { RadioGroupProps } from './RadioRadix.types';
import { useId } from 'react';
import clsx from 'clsx';
const RadioRadix: React.FC<RadioGroupProps> = ({
  items,
  onValueChange,
  defaultValue,
  name,
  id,
  ariaLabel,
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
      {...rest}
    >
      {items.map(({ id, value, disabled, label }) => {
        return (
          <div key={id} className={clsx(styles.wrapper, { [styles.disabled]: disabled })}>
            <label className={styles.labelWrapper} htmlFor={String(id)}>
              <div className={styles.itemWrapper}>
                <RadioGroup.Item
                  disabled={disabled}
                  className={styles.item}
                  value={value}
                  id={String(id)}
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

export default RadioRadix;
