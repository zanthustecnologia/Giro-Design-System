import { ChevronRight16Filled } from '@fluentui/react-icons';
import clsx from 'clsx';
import { DropdownMenu } from 'radix-ui';
import React, { useState, useCallback, useRef } from 'react';

import Search from '../Search';
import MenuItem from './components/MenuItem';
import { useMenuLogic } from './hooks/useMenuLogic';
import { useSearchLogic } from './hooks/useSearchLogic';
import styles from './Menu.module.scss';
import { MenuItemProps, MenuProps } from './Menu.types';

const Menu: React.FC<MenuProps> = ({
  items,
  children,
  onItemSelect,
  search,
  selectedItems,
  onOpenChange,
  align = 'start',
  scale = 1,
  className,
  style,
  maxHeight = 400,
  ...rest
}) => {
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const maxHeightStyle = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

  const containerStyle = { '--giro-scale': scale } as React.CSSProperties;

  const triggerWithScale = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
      scale: (children as React.ReactElement<any>).props?.scale ?? scale,
    })
    : children;

  const { open, setOpen, handleItemSelect: handleItemSelectLogic, isItemSelected } = useMenuLogic({
    selectedItems,
    onItemSelect,
    onOpenChange,
  });

  const handleItemSelect = useCallback((item: MenuItemProps) => {
    handleItemSelectLogic(item);
  }, [handleItemSelectLogic]);

  const { filteredItems } = useSearchLogic({
    items,
    searchValue: searchInput,
    searchTerm: searchTerm,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      setSearchTerm('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerm(searchInput);
    }
  };

  const renderMenuItem = useCallback(
    (item: MenuItemProps, key: string | number) => {
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        return (
          <DropdownMenu.Sub key={key}>
            <DropdownMenu.SubTrigger
              className={styles.subTrigger}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className={styles.itemIcon}>{item.icon}</span>
              )}
              <div className={styles.wrapperText}>
                <span className={styles.itemText}>{item.text}</span>
                {item.subText && (
                  <span className={styles.itemSubText}>{item.subText}</span>
                )}
              </div>
              <ChevronRight16Filled className={styles.chevronIcon} />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.subContent}
                sideOffset={16}
                collisionPadding={20}
              >
                {item.children!.map((childItem, childIndex) =>
                  renderMenuItem(childItem, `${key}-${childIndex}`)
                )}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        );
      }
      return (
        <MenuItem
          key={key}
          item={item}
          isSelected={isItemSelected(item)}
          onSelect={handleItemSelect}
        />
      );
    },
    [handleItemSelect, isItemSelected]
  );

  const closedByPointerRef = useRef(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>{triggerWithScale}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(styles.content, className)}
          style={{ ...containerStyle, ...style }}
          sideOffset={8}
          align={align}
          onPointerDown={() => { closedByPointerRef.current = true; }}
          onInteractOutside={() => { closedByPointerRef.current = true; }}
          onCloseAutoFocus={(e) => {
            if (closedByPointerRef.current) {
              e.preventDefault();
              closedByPointerRef.current = false;
            }
          }}
          onKeyDown={(e) => {
            if (search) {
              e.stopPropagation();
            }
          }}
          {...rest}
        >
          {search && (
            <div className={styles.searchWrapper}>
              <Search
                placeholder="Buscar"
                onChange={handleSearchChange}
                value={searchInput}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          )}

          <div 
            className={styles.itemsWrapper} 
            ref={itemsWrapperRef}
            style={{ maxHeight: maxHeightStyle }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) =>
                renderMenuItem(item, item.value || item.text || `item-${index}`)
              )
            ) : (
              <div className={styles.emptyState}>Nenhum item encontrado</div>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
