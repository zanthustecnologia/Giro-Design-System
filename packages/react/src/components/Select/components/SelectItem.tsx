import clsx from 'clsx';
import { Select } from 'radix-ui';
import React from 'react';

import styles from '../Select.module.scss';
import { SelectItemProps, SelectVariant } from '../Select.types';

interface SelectItemComponentProps extends SelectItemProps {
  variant?: SelectVariant;
  disableFocusOnHover?: boolean;
}

const SelectItem = ({ ref, text, subTitle, icon, disabled, value, variant, disableFocusOnHover, ...restProps }: SelectItemComponentProps & { ref?: React.Ref<HTMLDivElement> }) => {
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
          onPointerMove={disableFocusOnHover ? (e) => e.preventDefault() : undefined}
          {...restProps}
        >
          <Select.ItemText className={styles.title}>{text}</Select.ItemText>
          {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
          <Select.ItemIndicator className={styles.itemIndicator} />
        </Select.Item>
      </div>
    );
};

SelectItem.displayName = 'SelectItem';

export default SelectItem;