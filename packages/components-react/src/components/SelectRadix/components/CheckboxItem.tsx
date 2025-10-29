import React from 'react';
import clsx from 'clsx';
import Checkbox from '../../Checkbox';
import { CheckboxItemProps } from '../SelectRadix.types';
import styles from '../index.module.scss';

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  text,
  subTitle,
  disabled,
  checked,
  onChange,
  value,
  ...restProps
}) => {
  return (
    <div
      className={clsx(styles.item, {
        [styles.disabled]: disabled,
      })}
      role="option"
      aria-selected={checked}
      data-selected={checked}
      data-testid={`checkbox-item-${value}`}
      {...restProps}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        label={
          <div className={styles.checkboxContent}>
            <div className={styles.textContent}>
              <span className={styles.title}>{text}</span>
              {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            </div>
          </div>
        }
      />
    </div>
  );
};

CheckboxItem.displayName = 'CheckboxItem';

export default CheckboxItem;