import clsx from 'clsx';
import React, { useRef } from 'react';

import Checkbox from '../../Checkbox';
import styles from '../index.module.scss';
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
  const itemRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (checkedValue: boolean | 'indeterminate') => {
    onCheckedChange(Boolean(checkedValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onCheckedChange(!checked);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextElement = itemRef.current?.nextElementSibling as HTMLDivElement;
      if (nextElement && nextElement.getAttribute('tabIndex') === '0') {
        nextElement.focus();
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevElement = itemRef.current?.previousElementSibling as HTMLDivElement;
      if (prevElement && prevElement.getAttribute('tabIndex') === '0') {
        prevElement.focus();
      }
      return;
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
      ref={itemRef}
      className={clsx(styles.item, styles.checkboxItem, {
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