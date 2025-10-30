import React from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { SelectItemProps, SelectVariant } from '../SelectRadix.types';
import styles from '../index.module.scss';

interface SelectItemComponentProps extends SelectItemProps {
  variant?: SelectVariant;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemComponentProps>(
  ({ text, subTitle, icon, disabled, value, variant, ...restProps }, ref) => {
    return (
      <div
        className={clsx(styles.itemWrapper, {
          [styles.disabled]: disabled,
        })}
        data-disabled={disabled || undefined}
        data-testid={`select-item-${value}`}
        ref={ref}
      >
        {variant === 'icon' && icon && (
          <span className={styles.icon}>{icon}</span>
        )}

        <Select.Item
          className={clsx(styles.item, {
            [styles.disabled]: disabled,
          })}
          value={value}
          disabled={disabled}
          {...restProps}
        >
          <Select.ItemText className={styles.title}>{text}</Select.ItemText>
          {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
          <Select.ItemIndicator className={styles.itemIndicator} />
        </Select.Item>
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;