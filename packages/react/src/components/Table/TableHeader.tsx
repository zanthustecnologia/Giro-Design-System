import React, { useState, KeyboardEvent } from 'react';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import type { DropdownItem } from '../Dropdown/Dropdown.types';
import styles from './Table.module.scss';

interface BaseFilterItem {
  id?: string;
  buttonText: string | React.ReactNode;
  icon?: React.ReactElement;
  position?: 'left' | 'right';
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
  tooltip?: string;
}

interface CheckboxFilterItem extends BaseFilterItem {
  type: 'checkbox' | 'text' | 'icon';
  items: DropdownItem[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  placeholder?: string;
  enableSearch?: boolean;
}

interface CalendarFilterItem extends BaseFilterItem {
  type: 'calendar';
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  placeholder?: string;
}

export type FilterItem = CheckboxFilterItem | CalendarFilterItem;

const isCalendarFilter = (filter: FilterItem): filter is CalendarFilterItem => {
  return filter.type === 'calendar';
};

const isCheckboxFilter = (filter: FilterItem): filter is CheckboxFilterItem => {
  return filter.type === 'checkbox' || filter.type === 'text' || filter.type === 'icon';
};

export interface TableHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  filters?: React.ReactNode;
  filterItems?: FilterItem[];
  className?: string;
  onSearch?: (value: string) => void;
  showClearSearch?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  searchValue = '',
  onSearchChange,
  onSearch,
  searchPlaceholder = 'Pesquisar...',
  showSearch = true,
  showFilters = false,
  filters,
  filterItems = [],
  className = '',
}) => {
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);

  React.useEffect(() => {
    setInternalSearchValue(searchValue);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInternalSearchValue(value);
    
    if (value === '' && onSearchChange) {
      onSearchChange('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) {
        onSearch(internalSearchValue);
      } else if (onSearchChange) {
        onSearchChange(internalSearchValue);
      }
    }
  };

  const hasFilters = filters || (filterItems && filterItems.length > 0);

  return (
    <div className={`${styles['zds-table-header']} ${className}`.trim()}>
      {showSearch && (onSearchChange || onSearch) && (
        <div className={styles['zds-table-header__search-container']}>
          <Search
            value={internalSearchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className={styles['zds-table-header__search']}
          />
        </div>
      )}
      
      {showFilters && (
        <div className={styles['zds-table-header__filters']}>
          {hasFilters ? (
            <div className={styles['zds-table-header__filters-content']}>
              {filters && (
                <div className={styles['zds-table-header__custom-filters']}>
                  {filters}
                </div>
              )}

              <div className={styles['zds-table-header__filters-wrapper']}>
                <span className={styles['zds-table-header__filter-label']}>Filtros</span>
                
                <div className={styles['zds-table-header__filter-items']}>
                  {filterItems && filterItems.map((filterItem, index) => {
                    const commonProps = {
                      key: filterItem.id || index,
                      buttonText: filterItem.buttonText,
                      icon: filterItem.icon,
                      position: filterItem.position || 'right',
                      disabled: filterItem.disabled,
                      variant: 'outlined' as const,
                      onOpen: () => filterItem.onToggle?.(true),
                      onClose: () => filterItem.onToggle?.(false),
                    };
                    if (isCalendarFilter(filterItem)) {
                      return (
                        <Filter
                          {...commonProps}
                          type="calendar"
                          selectedDate={filterItem.selectedDate}
                          onDateSelect={filterItem.onDateSelect}
                          onClearDate={filterItem.onClear}
                          minDate={filterItem.minDate}
                          maxDate={filterItem.maxDate}
                          placeholder={filterItem.placeholder}
                        />
                      );
                    }

                    if (isCheckboxFilter(filterItem)) {
                      return (
                        <Filter
                          {...commonProps}
                          type={filterItem.type}
                          items={filterItem.items}
                          selectedIds={filterItem.selectedIds}
                          onApplyFilter={filterItem.onSelectionChange}
                          placeholder={filterItem.placeholder}
                          enableSearch={filterItem.enableSearch}
                        />
                      );
                    }

                    console.warn('TableHeader: Tipo de filtro não reconhecido:', filterItem);
                    return null;
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['zds-table-header__filters-placeholder']}>
              <span>Nenhum filtro disponível</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export type { CalendarFilterItem, CheckboxFilterItem };
export { isCalendarFilter, isCheckboxFilter };

export default TableHeader;
