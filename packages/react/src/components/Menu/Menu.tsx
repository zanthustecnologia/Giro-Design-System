import { useState, useEffect, useCallback, useRef } from 'react';
import { DropdownMenu } from 'radix-ui';
import styles from './Menu.module.scss';
import { MenuItemProps, MenuProps } from './Menu.types';
import { ChevronRight16Filled } from '@fluentui/react-icons';
import Search from '../Search';
import { useSearchLogic } from './hooks/useSearchLogic';
import { useMenuLogic } from './hooks/useMenuLogic';
import MenuItem from './components/MenuItem';
import React from 'react';
import clsx from 'clsx';

const Menu: React.FC<MenuProps> = ({
  items,
  children,
  onItemSelect,
  search,
  enableInfiniteScroll,
  onScrollEnd,
  isLoadingMore,
  onApiSearch,
  enableApiSearch,
  selectedItems = [],
  onOpenChange,
  align = 'start',
  className,
  maxHeight = 400,
  ...rest
}) => {
  const itemsWrapperRef = useRef<HTMLDivElement>(null);
  const hasReachedEndRef = useRef<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onScrollEndRef = useRef(onScrollEnd);
  const isLoadingMoreRef = useRef(isLoadingMore);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const maxHeightStyle = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

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
    onApiSearch,
    enableApiSearch,
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

  useEffect(() => {
    onScrollEndRef.current = onScrollEnd;
    isLoadingMoreRef.current = isLoadingMore;
  }, [onScrollEnd, isLoadingMore]);

  useEffect(() => {
    if (!open || !enableInfiniteScroll) {
      return;
    }

    const setupTimer = setTimeout(() => {
      const container = itemsWrapperRef.current;
      const sentinel = sentinelRef.current;
      
      if (!container || !sentinel) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !hasReachedEndRef.current &&
            !isLoadingMoreRef.current &&
            onScrollEndRef.current
          ) {
            hasReachedEndRef.current = true;
            onScrollEndRef.current();
          }
        },
        {
          root: container,
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      observerRef.current.observe(sentinel);
    }, 50);
    return () => {
      clearTimeout(setupTimer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [open, enableInfiniteScroll]);

  useEffect(() => {
    if (!isLoadingMore && open && enableInfiniteScroll) {
      hasReachedEndRef.current = false;
    }
  }, [isLoadingMore, open, enableInfiniteScroll]);

  useEffect(() => {
    if (!open || !enableInfiniteScroll || !onScrollEnd || isLoadingMore) {
      return;
    }

    const timer = setTimeout(() => {
      const container = itemsWrapperRef.current;
      if (!container) {
        return;
      }

      const { scrollHeight, clientHeight } = container;
      
      if (scrollHeight <= clientHeight && !hasReachedEndRef.current) {
        hasReachedEndRef.current = true;
        onScrollEnd();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [open, enableInfiniteScroll, onScrollEnd, isLoadingMore, filteredItems.length]);

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
              {item.enableIcon && item.icon && (
                <span className={styles.itemIcon}>{item.icon}</span>
              )}
              <div className={styles.wrapperText}>
                <span className={styles.itemText}>{item.text}</span>
                {item.enableSubText && item.subText && (
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

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      hasReachedEndRef.current = false;
    }
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(styles.content, className)}
          side="bottom"
          sideOffset={8}
          align={align}
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
            {enableInfiniteScroll && isLoadingMore && (
              <div className={styles.loadingMore}>Carregando mais itens...</div>
            )}
            {enableInfiniteScroll && (
              <div
                ref={sentinelRef}
                data-scroll-sentinel
                style={{ height: '1px', visibility: 'hidden' }}
              />
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
