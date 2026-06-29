import React, { useState, KeyboardEvent } from 'react';

import styles from './Table.module.scss';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';

import type { Side, Align } from '../../types/common.types';
import type { FilterItem as FilterListItem } from '../Filter';

interface BaseFilterItem {
  id?: string;
  buttonText: string | React.ReactNode;
  icon?: React.ReactElement;
  side?: Side;
  align?: Exclude<Align, 'center'>;
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
  tooltip?: string;
}

interface CheckboxFilterItem extends BaseFilterItem {
  filterType: 'multiple' | 'single';
  items: FilterListItem[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  placeholder?: string;
  enableSearch?: boolean;
}

interface CalendarFilterItem extends BaseFilterItem {
  filterType: 'calendar';
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
  return filter.filterType === 'calendar';
};

const isCheckboxFilter = (filter: FilterItem): filter is CheckboxFilterItem => {
  return filter.filterType === 'multiple' || filter.filterType === 'single';
};

export interface TableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...rest
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
    <div className={`${styles.tableHeader} ${className}`.trim()} {...rest}>
      {showSearch && (onSearchChange || onSearch) && (
        <div className={styles.tableHeaderSearchContainer}>
          <Search
            value={internalSearchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className={styles.tableHeaderSearch}
          />
        </div>
      )}
      
      {showFilters && (
        <div className={styles.tableHeaderFilters}>
          {hasFilters ? (
            <div className={styles.tableHeaderFiltersContent}>
              {filters && (
                <div className={styles.tableHeaderCustomFilters}>
                  {filters}
                </div>
              )}

              <div className={styles.tableHeaderFiltersWrapper}>
                <span className={styles.tableHeaderFilterLabel}>Filtros</span>
                
                <div className={styles.tableHeaderFilterItems}>
                  {filterItems && filterItems.map((filterItem, index) => {
                    const commonProps = {
                      buttonText: filterItem.buttonText,
                      icon: filterItem.icon,
                      side: filterItem.side,
                      align: filterItem.align,
                      disabled: filterItem.disabled,
                      variant: 'outlined' as const,
                      onOpen: () => filterItem.onToggle?.(true),
                      onClose: () => filterItem.onToggle?.(false),
                    };
                    if (isCalendarFilter(filterItem)) {
                      return (
                        <Filter
                          key={filterItem.id || index}
                          {...commonProps}
                          filterType="calendar"
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
                          key={filterItem.id || index}
                          {...commonProps}
                          filterType={filterItem.filterType}
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
            <div className={styles.tableHeaderFiltersPlaceholder}>
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
