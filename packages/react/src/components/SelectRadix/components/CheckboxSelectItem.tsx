import clsx from 'clsx';
import React from 'react';

import Checkbox from '../../Checkbox';
import styles from '../index.module.scss';
import { CheckboxItemProps } from '../SelectRadix.types';

const CheckboxSelectItem: React.FC<CheckboxItemProps> = ({
  text,
  subTitle,
  disabled,
  checked,
  onCheckedChange,
  value,
  ...restProps
}) => {
  const handleCheckboxChange = (checkedValue: boolean | 'indeterminate') => {
    onCheckedChange(Boolean(checkedValue));
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      className={clsx(styles.item, styles.checkboxItem, {
        [styles.disabled]: disabled,
      })}
      role="option"
      aria-selected={checked}
      data-selected={checked}
      data-testid={`checkbox-item-${value}`}
      {...restProps}
    >
      <div className={styles.checkboxContent}>
        <Checkbox
          checked={checked}
          onCheckedChange={handleCheckboxChange}
          disabled={disabled}
          label={
            <div className={styles.textContent}>
              <span className={styles.title}>{text}</span>
              {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            </div>
          }
          // onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

CheckboxSelectItem.displayName = 'CheckboxSelectItem';

export default CheckboxSelectItem;