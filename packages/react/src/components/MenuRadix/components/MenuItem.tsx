import { memo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MenuItemProps } from '../MenuRadix.types';
import styles from '../MenuRadix.module.scss';
import clsx from 'clsx';
interface DefaultMenuItemProps {
  item: MenuItemProps;
  isSelected: boolean;
  onSelect: (item: MenuItemProps) => void;
}

export const MenuItem = memo(({ item, isSelected, onSelect }: DefaultMenuItemProps) => {
  
  const handleSelect = (e: Event) => {
    e.preventDefault();
    onSelect(item);
  };

  return (
    <DropdownMenu.Item
      className={clsx(styles.item, { [styles.itemSelected]: isSelected })}
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
