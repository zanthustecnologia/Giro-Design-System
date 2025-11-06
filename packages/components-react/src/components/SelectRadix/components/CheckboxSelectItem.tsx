import React from 'react';
import clsx from 'clsx';
import Checkbox from '../../Checkbox';
import { CheckboxItemProps } from '../SelectRadix.types';
import styles from '../index.module.scss';

const CheckboxSelectItem: React.FC<CheckboxItemProps> = ({
  text,
  subTitle,
  disabled,
  checked,
  onChange,
  value,
  ...restProps
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(e.target.checked);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onChange(!checked);
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
          onChange={handleCheckboxChange}
          disabled={disabled}
          label={
            <div className={styles.textContent}>
              <span className={styles.title}>{text}</span>
              {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
            </div>
          }
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

CheckboxSelectItem.displayName = 'CheckboxSelectItem';

export default CheckboxSelectItem;