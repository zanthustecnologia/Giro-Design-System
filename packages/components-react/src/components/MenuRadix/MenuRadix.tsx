import { useState, useEffect, useCallback, useRef } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './MenuRadix.module.scss';
import { MenuItemProps, MenuRadixProps } from './MenuRadix.types';
import { ChevronRight16Filled } from '@fluentui/react-icons';
import Search from '../Search';
import { useSearchLogic } from './hooks/useSearchLogic';
import { useMenuLogic } from './hooks/useMenuLogic';
import MenuItem from './components/MenuItem';

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
  selectedItems = [],
  onOpenChange,
  align = 'start',
  ...rest
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hasReachedEndRef = useRef<boolean>(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const {
    handleItemSelect,
    isItemSelected,
  } = useMenuLogic({
    selectedItems,
    onItemSelect,
    onOpenChange,
  });

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

  useEffect(() => {
    if (enableInfiniteScroll && open) {
      hasReachedEndRef.current = false;
    }
  }, [enableInfiniteScroll, open]);

  const renderMenuItem = useCallback(
    (item: MenuItemProps, key: string | number) => {
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        return (
          <DropdownMenu.Sub key={key} >
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
                sideOffset={10}
                alignOffset={-5}
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
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          sideOffset={8}
          align={align}
          ref={viewportRef}
          onKeyDown={(e) => {
            // Desabilita typeahead do Radix quando search está ativo
            if (search) {
              e.preventDefault();
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
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MenuRadix;
