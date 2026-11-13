import clsx from 'clsx';
import React from 'react';

import Checkbox from '../../Checkbox';
import styles from '../Select.module.scss';
import { CheckboxItemProps } from '../Select.types';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Teclas vindas do Checkbox interno já são tratadas por ele.
    if (e.target !== e.currentTarget) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onCheckedChange(!checked);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const target = e.target as HTMLElement;
    const isCheckboxClick = target.closest('input[type="checkbox"]') || 
                           target.closest('label');
    
    if (!isCheckboxClick) {
      e.preventDefault();
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      className={clsx(styles.checkboxItem, {
        [styles.disabled]: disabled,
      })}
      role="option"
      aria-selected={checked}
      aria-disabled={disabled}
      data-selected={checked}
      data-testid={`checkbox-item-${value}`}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
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
        />
      </div>
    </div>
  );
};

CheckboxSelectItem.displayName = 'CheckboxSelectItem';

export default CheckboxSelectItem;