import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Search from '../Search';
import { validateItems } from './DropdownUtils';
import './Dropdown.scss';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useInfiniteScroll } from '../Hooks/InfiniteScroll';

export interface DropdownItem {
  /** ID único do item (opcional, será gerado automaticamente se não fornecido) */
  id?: string;
  /** Texto principal do item */
  text: string;
  /** Texto secundário/descrição do item */
  subText?: string;
  /** Ícone do item (React node) */
  icon?: React.ReactNode;
  /** Define se o item está desabilitado */
  disabled?: boolean;
}

export type DropdownType = 'text' | 'checkbox' | 'icon';

export interface DropdownProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Array de itens para o dropdown - obrigatório */
  items: DropdownItem[];
  /** ID único do componente */
  id?: string;
  /** Tipo do dropdown */
  type?: DropdownType;
  /** Habilita campo de busca */
  applySearch?: boolean;
  /** Placeholder do campo de busca */
  placeholder?: string;
  /** Callback para mudanças na seleção */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Controla exibição do subtexto */
  showSubText?: boolean;
  /** IDs dos itens selecionados por padrão */
  defaultSelectedIds?: string[];
  /** Estado inicial dos itens selecionados (objeto com chave-valor) */
  initialItemsSelected?: Record<string, boolean>;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  /** Define se o componente esta sendo usado para filtro */
  filter?: boolean;
  /**
   * Configurações para paginação infinita
   */
  infiniteScroll?: {
    /** Status atual do carregamento */
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    /** Página atual */
    page: number;
    /** Última página disponível */
    lastPage: number;
    /** Callback para carregar próxima página */
    onLoadMore: () => void;
    /** Threshold para trigger (0-1) */
    threshold?: number;
    /** Margem para trigger */
    rootMargin?: string;
    /** Debug mode */
    debug?: boolean;
  };
}

interface SelectedItemsState {
  [key: string]: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  items = [],
  id,
  type = 'text',
  applySearch = false,
  placeholder = '',
  onSelectionChange,
  showSubText = false,
  defaultSelectedIds = [],
  initialItemsSelected = {},
  maxWidth,
  minWidth,
  width,
  filter = false,
  infiniteScroll
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemsState>(() => {
    if (initialItemsSelected && Object.keys(initialItemsSelected).length > 0) {
      return initialItemsSelected;
    }
    if (defaultSelectedIds && defaultSelectedIds.length > 0) {
      const initialState: SelectedItemsState = {};
      defaultSelectedIds.forEach(itemId => {
        initialState[itemId] = true;
      });
      return initialState;
    }
    return {};
  });

  const [internalItems, setInternalItems] = useState<DropdownItem[]>(items);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [tempSelectedItems, setTempSelectedItems] = useState<SelectedItemsState>({});

  const infiniteScrollHook = infiniteScroll ? useInfiniteScroll({
    status: infiniteScroll.status,
    page: infiniteScroll.page,
    lastPage: infiniteScroll.lastPage,
    onLoadMore: infiniteScroll.onLoadMore,
    threshold: infiniteScroll.threshold,
    rootMargin: infiniteScroll.rootMargin,
    enabled: true,
    debug: infiniteScroll.debug
  }) : null;

  const searchVisible = applySearch || internalItems.length > 4;

  useEffect(() => {
    if (filter) {
      setTempSelectedItems(selectedItems);
    }
  }, [selectedItems, filter]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setFocusedIndex(-1);
    if (newValue === '' && searchQuery !== '') {
      setSearchQuery('');
    }
  }, [searchQuery]);

  const safeItems = useMemo(() => {
    if (!Array.isArray(items)) {
      console.warn('Dropdown: items deve ser um array. Recebido:', typeof items);
      return [];
    }
    if (items.length === 0) {
      return [];
    }
    return items;
  }, [items]);

  const validItems = useMemo(() => {
    return validateItems(safeItems, type);
  }, [safeItems, type]);

  const generateItemId = useCallback((item: DropdownItem, index: number): string => {
    return item.id || `dropdown-item-${index}`;
  }, []);

  const executeSearch = useCallback(() => {
    setSearchQuery(inputValue.trim());
    setFocusedIndex(-1);
  }, [inputValue]);

  const handleSearchClear = useCallback(() => {
    setInputValue('');
    setSearchQuery('');
    setFocusedIndex(-1);
    setIsSearchFocused(false);
  }, []);

  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      executeSearch();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      handleSearchClear();
      return;
    }
    if (event.key === 'Backspace') {
      if (inputValue.length < 2) {
        event.preventDefault();
        event.stopPropagation();
        handleSearchClear();
      }
    }
  }, [executeSearch, handleSearchClear, inputValue]);


  const toggleSelection = useCallback((itemId: string, item: DropdownItem) => {
    if (item?.disabled) return;
    if (filter) {
      setTempSelectedItems((prevSelected) => {
        let newSelected: SelectedItemsState;
        if (type === 'checkbox') {
          newSelected = {
            ...prevSelected,
            [itemId]: !prevSelected[itemId],
          };
        } else {
          newSelected = prevSelected[itemId] ? {} : { [itemId]: true };
        }
        return newSelected;
      });
    } else {

      setSelectedItems((prevSelected) => {
        let newSelected: SelectedItemsState;
 
        if (type === 'checkbox') {
          newSelected = {
            ...prevSelected,
            [itemId]: !prevSelected[itemId],
          };
        } else {
          newSelected = prevSelected[itemId] ? {} : { [itemId]: true };
        }
        return newSelected;
      });
    }
  }, [filter, type]);

  const handleApplyFilter = useCallback(() => {
    if (!filter) return;
    
    // Aplicar as seleções temporárias
    setSelectedItems(tempSelectedItems);
    
    // Chamar callback se existir
    const selectedIds = Object.keys(tempSelectedItems).filter(key => tempSelectedItems[key]);
    onSelectionChange?.(selectedIds);
  }, [filter, tempSelectedItems, onSelectionChange]);

  const handleClearFilter = useCallback(() => {
    if (!filter) return;
    
    // Limpar tanto o estado temporário quanto o real
    setTempSelectedItems({});
    setSelectedItems({});
    
    // Chamar callback
    onSelectionChange?.([]);
  }, [filter, onSelectionChange]);


  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!onSelectionChange) return;
    const selectedIds = Object.keys(selectedItems).filter(key => selectedItems[key]);
      onSelectionChange(selectedIds);
  }, [selectedItems, onSelectionChange])


  useEffect(() => {
    setInternalItems(validItems);
  }, [validItems]);


  const handleItemClick = useCallback((
    event: React.MouseEvent<HTMLLIElement>,
    itemId: string,
    item: DropdownItem
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!item?.disabled) {
      toggleSelection(itemId, item);
    }
  }, [toggleSelection]);

  const renderItemContent = useCallback((item: DropdownItem, index: number) => {
    const itemId = item.id || `dropdown-item-${index}`;
    const currentSelection = filter ? tempSelectedItems : selectedItems;

    return (
      <div className={clsx('zds-dropdown__item-content', {
        'zds-dropdown__item-content--disabled': item.disabled
      })}>
        {type === 'checkbox' && (
          <Checkbox
            checked={currentSelection[itemId]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.stopPropagation();
              toggleSelection(itemId, item);
            }}
            disabled={item.disabled}
            label=""
          />
        )}

        {type === 'icon' && item.icon && (
          <div className="zds-dropdown__item-icon-container">
            <span
              className="zds-dropdown__item-icon"
              onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                event.preventDefault();
                event.stopPropagation();
                handleItemClick(event as any, itemId, item);
              }}
            >
              {item.icon}
            </span>
          </div>
        )}

        <div className="zds-dropdown__item-text">
          <span
            id={`dropdown-item-${itemId}-label`}
            className="zds-dropdown__title"
          >
            {item.text}
          </span>
          {showSubText && item.subText && (
            <span
              id={`dropdown-item-${itemId}-desc`}
              className="zds-dropdown__subtext"
            >
              {item.subText}
            </span>
          )}
        </div>
      </div>
    );
  }, [type, selectedItems, tempSelectedItems, filter, toggleSelection, handleItemClick, showSubText]);

  const isMultiSelectable = useMemo(() => {
    return type === 'checkbox';
  }, [type]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return internalItems;
    }
    return internalItems.filter((item) => {
      const searchText = searchQuery.toLowerCase();
      const itemText = item.text?.toLowerCase() || '';
      const itemSubText = item.subText?.toLowerCase() || '';
      return itemText.includes(searchText) || itemSubText.includes(searchText);
    });
  }, [internalItems, searchQuery]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isSearchFocused) return;

    if (filteredItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex((prevIndex) =>
          prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0
        );
        return;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
        );
        return;
      case 'Enter':
        e.preventDefault();
        e.stopPropagation();
        if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
          const focusedItem = filteredItems[focusedIndex];
          const focusedItemId = focusedItem.id || `dropdown-item-${focusedIndex}`;
          toggleSelection(focusedItemId, focusedItem);
        }
        return;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex(-1);
        handleSearchClear();
        return;
      default:
        return;
    }
  }, [filteredItems, focusedIndex, toggleSelection, isSearchFocused, handleSearchClear]);

  /**
   * Classes CSS do container principal
   */
  const DropdownClass = clsx(
    'zds-dropdown__container',
    {
      [className || '']: className,
      'zds-dropdown__container--search-active': searchQuery.length > 0,
      'zds-dropdown__container--fixed-width': !!maxWidth
    }
  );
  const dropdownStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (maxWidth) {
      styles.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      styles.width = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }
    if (minWidth) {
      styles.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }
    if (width) {
      styles.width = typeof width === 'number' ? `${width}px` : width;
    }

    return styles;
  }, [maxWidth, minWidth, width]);

  return (
    <div
      className={DropdownClass}
      tabIndex={0}
      role="combobox"
      aria-expanded={filteredItems.length > 0 ? "true" : "false"}
      aria-haspopup="listbox"
      aria-owns={id ? `${id}-listbox` : undefined}
      aria-controls={id ? `${id}-listbox` : undefined}
      aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
      aria-label="Dropdown de seleção"
      aria-describedby={searchVisible ? `${id}-search-help` : undefined}
      onKeyDown={handleKeyDown}
      style={dropdownStyles}
    >
      <ul
        className="zds-dropdown__list"
        id={id || undefined}
        role="listbox"
        aria-label="Lista de opções"
        aria-multiselectable={isMultiSelectable}
      >
        {searchVisible && (
          <li role="none" className="zds-dropdown__search-container">
            <Search
              value={inputValue}
              placeholder={placeholder || 'Digite e pressione Enter para buscar...'}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onClear={handleSearchClear}
              aria-label="Campo de busca - pressione Enter para pesquisar"
            />
          </li>
        )}
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const itemId = generateItemId(item, index);
            const currentSelection = filter ? tempSelectedItems : selectedItems;
            return (
              <>
                <li
                  key={itemId}
                  role="option"
                  aria-selected={!!currentSelection[itemId]}
                  aria-labelledby={`dropdown-item-${itemId}-label`}
                  aria-describedby={item.subText ? `dropdown-item-${itemId}-desc` : undefined}
                  className={clsx('zds-dropdown__item', {
                    [`zds-dropdown__item--${type}`]: type,
                    'zds-dropdown__item--selected': currentSelection[itemId],
                    'zds-dropdown__item--focused': focusedIndex === index,
                    'zds-dropdown__item--disabled': item.disabled
                  })}
                  tabIndex={focusedIndex === index ? 0 : -1}
                  onFocus={() => setFocusedIndex(index)}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleItemClick(event, itemId, item);

                  }}
                  onMouseDown={(e: React.MouseEvent<HTMLLIElement>) => {
                    if (!item.disabled) {
                      e.preventDefault();
                      setFocusedIndex(index);
                    }
                  }}
                >
                  {renderItemContent(item, index)}
                </li>
              </>
            );
          })
        ) : (
          <li
            className="zds-dropdown__no-results"
            role="status"
            aria-live="polite"
          >
            Nenhum item corresponde à sua busca
          </li>
        )}
        {filter && (
          <div className='zds-dropdown__container-filter'>
            <Button 
              size='sm' 
              variant='outlined'
              onClick={handleClearFilter}
            >
              Limpar
            </Button>
            <Button 
              size='sm'
              onClick={handleApplyFilter}
            >
              Aplicar
            </Button>
          </div>
        )}
        {infiniteScrollHook && infiniteScrollHook.hasNextPage && (
          <li role="none" className="zds-dropdown__infinite-scroll-trigger">
            <div 
              ref={infiniteScrollHook.observerRef}
              className="zds-dropdown__loading-indicator"
            >
              {infiniteScroll?.status === 'loading' ? (
                <span>Carregando...</span>
              ) : (
                <span>Trigger</span>
              )}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

// Memorized component para performance
const MemoizedDropdown = React.memo(Dropdown);
MemoizedDropdown.displayName = 'Dropdown';
export default MemoizedDropdown;