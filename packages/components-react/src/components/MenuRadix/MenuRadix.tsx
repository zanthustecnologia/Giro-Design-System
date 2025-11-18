import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './MenuRadix.module.scss';
import { MenuItemProps, MenuRadixProps } from './MenuRadix.types';
import { ChevronRight16Filled } from '@fluentui/react-icons';
import Search from '../Search';
import { useSearchLogic } from './hooks/useSearchLogic';

const MenuRadix: React.FC<MenuRadixProps> = ({
  items,
  children,
  onItemSelect,
  search,
  enableInfiniteScroll,
  onScrollEnd,
  isLoadingMore,
  onApiSearch,
  enableApiSearch,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hasReachedEndRef = useRef<boolean>(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredItems } = useSearchLogic({
    items,
    searchValue: searchInput,
    searchTerm,
    onApiSearch,
    enableApiSearch
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm('');
      e.preventDefault();
      setSearchTerm(searchInput);
      console.log(searchTerm); 
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enableInfiniteScroll) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (
        isAtBottom &&
        !hasReachedEndRef.current &&
        onScrollEnd &&
        !isLoadingMore
      ) {
        hasReachedEndRef.current = true;
        onScrollEnd();
      } else if (!isAtBottom && hasReachedEndRef.current) {
        hasReachedEndRef.current = false;
      }
    };

    viewport.addEventListener('scroll', handleScroll);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [enableInfiniteScroll, onScrollEnd, isLoadingMore]);

  // Reset a flag when the select opens
  useEffect(() => {
    if (enableInfiniteScroll) {
      hasReachedEndRef.current = false;
    }
  }, [enableInfiniteScroll]);

  const handleItemSelect = useCallback(
    (item: MenuItemProps) => {
      onItemSelect?.(item);
    },
    [onItemSelect]
  );

  const renderMenuItem = useCallback(
    (item: MenuItemProps, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      if (hasChildren) {
        return (
          <DropdownMenu.Sub key={index}>
            <DropdownMenu.SubTrigger
              className={styles.SubTrigger}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className={styles.ItemIcon}>{item.icon}</span>
              )}
              <div className={styles.wrapperText}>
                <span className={styles.ItemText}>{item.text}</span>
                {item.subText && (
                  <span className={styles.ItemSubText}>{item.subText}</span>
                )}
              </div>
              <ChevronRight16Filled className={styles.ChevronIcon} />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.SubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                {item.children!.map((childItem, childIndex) =>
                  renderMenuItem(childItem, childIndex)
                )}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        );
      }
      return (
        <DropdownMenu.Item
          className={styles.Item}
          key={index}
          disabled={item.disabled}
          onSelect={() => handleItemSelect(item)}
        >
          {item.icon && <span className={styles.ItemIcon}>{item.icon}</span>}
          <div className={styles.wrapperText}>
            <span className={styles.ItemText}>{item.text}</span>
            {item.subText && (
              <span className={styles.ItemSubText}>{item.subText}</span>
            )}
          </div>
        </DropdownMenu.Item>
      );
    },
    [handleItemSelect]
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.Content}
          sideOffset={5}
          align="end"
        >
          {search && (
            <Search
              placeholder="Buscar"
              onChange={handleSearchChange}
              value={searchInput}
              onKeyDown={handleSearchKeyDown}
            />
          )}
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => renderMenuItem(item, index))
          ) : (
            <div>No items found</div>
          )}
          {enableInfiniteScroll && isLoadingMore && (
            <div className={styles.loadingMore}>Carregando mais itens...</div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MenuRadix;
