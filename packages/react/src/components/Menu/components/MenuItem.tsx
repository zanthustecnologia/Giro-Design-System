import { memo } from 'react';
import { DropdownMenu } from 'radix-ui';
import { DefaultMenuItemProps } from '../Menu.types';
import styles from '../Menu.module.scss';
import clsx from 'clsx';

export const MenuItem = memo(({ item, isSelected, onSelect }: DefaultMenuItemProps) => {
  
  const handleSelect = () => {
    onSelect(item);
  };

  return (
    <DropdownMenu.Item
      className={clsx(styles.item)}
      data-selected={isSelected || undefined}
      onSelect={handleSelect}
      disabled={item.disabled}
    >
      {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
      <div className={styles.wrapperText}>
        <span className={styles.itemText}>{item.text}</span>
        {item.subText && (
          <span className={styles.itemSubText}>{item.subText}</span>
        )}
      </div>
    </DropdownMenu.Item>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
