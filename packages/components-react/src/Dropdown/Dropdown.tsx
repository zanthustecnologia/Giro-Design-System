import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState, KeyboardEvent, MouseEvent } from 'react';
import Search from '../Search';
import './styles.scss';
import Checkbox from '../Checkbox';
import { validateItems } from './DropdownUtils';

/**
 * Interface para itens do dropdown
 */
export interface DropdownItem {
  /** ID único do item */
  id?: string;
  /** Texto principal do item (obrigatório) */
  text: string;
  /** Texto secundário/descrição */
  subText?: string;
  /** Ícone do item (ReactNode) */
  icon?: React.ReactNode;
  /** Se o item está desabilitado */
  disabled?: boolean;
}

/**
 * Tipos possíveis para o dropdown
 */
export type DropdownType = 'text' | 'checkbox' | 'icon';

/**
 * Interface para as props do componente Dropdown
 */
export interface DropdownProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Array de itens para o dropdown (obrigatório) */
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
}

/**
 * Tipo para o estado de seleção de itens
 */
interface SelectedItems {
  [key: string]: boolean;
}

/**
 * Componente Dropdown do Zanthus Design System
 * Dropdown com busca acionada pelo Enter e navegação por teclado
 * Corrigido problema de múltiplos checkboxes
 */
const Dropdown: React.FC<DropdownProps> = ({
    className,
    items = [],
    id,
    type = 'text',
    applySearch = false,
    placeholder = '',
    onSelectionChange,
    showSubText = false
}) => {
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [internalItems, setInternalItems] = useState<DropdownItem[]>(items);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

    const searchVisible = applySearch || internalItems.length > 4;
    const validItems = useMemo(() => validateItems(items, type), [items, type]);

    /**
     * Handler para mudanças no campo de busca
     */
    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setFocusedIndex(-1);
        if (newValue === '' && searchQuery !== '') {
            setSearchQuery('');
        }
    }, [searchQuery]);

    /**
     * Executa a busca com o valor atual do input
     */
    const executeSearch = useCallback((): void => {
        setSearchQuery(inputValue.trim());
        setFocusedIndex(-1);
    }, [inputValue]);

    /**
     * Limpa o campo de busca e reseta estados relacionados
     */
    const handleSearchClear = useCallback((): void => {
        setInputValue('');
        setSearchQuery('');
        setFocusedIndex(-1);
        setIsSearchFocused(false);
    }, []);

    /**
     * Handler para eventos de teclado no campo de busca
     */
    const handleSearchKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
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

    /**
     * Alterna seleção de um item
     */
    const toggleSelection = useCallback((itemId: string, item: DropdownItem): void => {
        if (item?.disabled) return;

        setSelectedItems((prevSelected) => {
            let newSelected: SelectedItems;

            if (type === 'checkbox') {
                // Múltipla seleção para checkbox
                newSelected = {
                    ...prevSelected,
                    [itemId]: !prevSelected[itemId],
                };
            } else {
                // Seleção única para outros tipos
                newSelected = prevSelected[itemId] ? {} : { [itemId]: true };
            }

            // Notifica mudança na seleção
            if (onSelectionChange) {
                const selectedIds = Object.keys(newSelected).filter(key => newSelected[key]);
                onSelectionChange(selectedIds);
            }

            return newSelected;
        });
    }, [onSelectionChange, type]);

    /**
     * Atualiza itens internos quando props items mudarem
     */
    useEffect(() => {
        setInternalItems(validItems);
    }, [validItems]);

    /**
     * Handler para clique em item
     */
    const handleItemClick = useCallback((event: MouseEvent<HTMLLIElement>, itemId: string, item: DropdownItem): void => {
        event.preventDefault();
        event.stopPropagation();
        if (!item?.disabled) {
            toggleSelection(itemId, item);
        }
    }, [toggleSelection]);

    /**
     * Renderiza o conteúdo de um item
     */
    const renderItemContent = useCallback((item: DropdownItem, index: number): React.ReactNode => {
        const itemId = item.id || `dropdown-item-${index}`;
        
        return (
            <div className={clsx('zds-dropdown__item-content', {
                'zds-dropdown__item-content--disabled': item.disabled
            })}>
                {type === 'checkbox' && (
                    <Checkbox
                        checked={!!selectedItems[itemId]}
                        onChange={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleSelection(itemId, item);
                        }}
                        disabled={item.disabled}
                        label=''
                    />
                )}

                {type === 'icon' && item.icon && (
                    <div className="zds-dropdown__item-icon-container">
                        <span
                            className="zds-dropdown__item-icon"
                            onClick={(event) => handleItemClick(event as MouseEvent<HTMLLIElement>, itemId, item)}
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
    }, [type, selectedItems, toggleSelection, handleItemClick, showSubText]);

    /**
     * Verifica se o dropdown suporta múltipla seleção
     */
    const isMultiSelectable = useMemo((): boolean => {
        return type === 'checkbox';
    }, [type]);

    /**
     * Gera ID único para um item
     */
    const generateItemId = useCallback((item: DropdownItem, index: number): string => {
        return item.id || `dropdown-item-${index}`;
    }, []);

    /**
     * Filtra itens baseado na query de busca
     */
    const filteredItems = useMemo((): DropdownItem[] => {
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

    /**
     * Handler para navegação por teclado no dropdown
     */
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>): void => {
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

    const DropdownClass = clsx(
        'zds-dropdown__container',
        {
            [className as string]: className,
            'zds-dropdown__container--search-active': searchQuery.length > 0
        }
    );

    return (
        <div
            className={DropdownClass}
            tabIndex={0}
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-owns={id}
            aria-label="Dropdown de seleção"
            onKeyDown={handleKeyDown}
        >
            <ul
                className="zds-dropdown__list"
                id={id}
                role="listbox"
                aria-label="Lista de opções"
                aria-multiselectable={isMultiSelectable}
            >
                {searchVisible && (
                    <li role="none" className="zds-dropdown__search-container">
                        <Search
                            value={inputValue}
                            className='zds-dropdown__search'
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
                        return (
                            <li
                                key={itemId}
                                role="option"
                                aria-selected={!!selectedItems[itemId]}
                                aria-labelledby={`dropdown-item-${itemId}-label`}
                                aria-describedby={item.subText ? `dropdown-item-${itemId}-desc` : undefined}
                                className={
                                    clsx('zds-dropdown__item', {
                                        [`zds-dropdown__item--${type}`]: type,
                                        'zds-dropdown__item--selected': selectedItems[itemId],
                                        'zds-dropdown__item--focused': focusedIndex === index,
                                        'zds-dropdown__item--disabled': item.disabled
                                    })
                                }
                                tabIndex={focusedIndex === index ? 0 : -1}
                                onFocus={() => setFocusedIndex(index)}
                                onClick={(event) => handleItemClick(event, itemId, item)}
                                onMouseDown={(e) => {
                                    if (!item.disabled) {
                                        e.preventDefault();
                                        setFocusedIndex(index);
                                    }
                                }}
                            >
                                {renderItemContent(item, index)}
                            </li>
                        )
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
            </ul>
        </div>
    );
};

export default Dropdown;