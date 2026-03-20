// Filter.tsx
import { ChevronDownRegular, Calendar16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import Badge from '../Badge';
import Button from '../Button';
import Calendar from '../Calendar/Calendar';
import Checkbox from '../Checkbox';
import Popover from '../Popover/Popover';
import Search from '../Search';
import styles from './Filter.module.scss';

import type { FilterItem, FilterProps } from './Filter.types';

type SelectionState = Record<string, boolean>;

const Filter: React.FC<FilterProps> = ({
  items,
  type = 'checkbox',
  selectedIds,
  onApplyFilter,
  placeholder = 'Selecionar...',
  enableSearch = false,
  buttonText = 'Filter',
  icon,
  variant = 'outlined',
  onOpen,
  onClose,
  side = 'bottom',
  align = 'center',
  disabled = false,
  className,
  selectedDate,
  onDateSelect,
  onClearDate,
  minDate,
  maxDate,
  locale = 'pt-br',
  id,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedItems, setTempSelectedItems] = useState<SelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date | null>(
    () => selectedDate || new Date()
  );

  useEffect(() => {
    if (selectedDate) {
      setCurrentCalendarDate(selectedDate);
    }
  }, [selectedDate]);

  const handleCalendarNavigation = useCallback((date: Date) => {
    setCurrentCalendarDate(date);
  }, []);

  const handleDateSelection = useCallback(
    (date: Date) => {
      onDateSelect?.(date);
      setIsOpen(false);
      onClose?.();
    },
    [onDateSelect, onClose]
  );

  const handleClear = useCallback((): void => {
    onClearDate?.();
    setCurrentCalendarDate(new Date());
    setIsOpen(false);
    onClose?.();
  }, [onClearDate, onClose]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (disabled && open) return;
      if (open) {
        const initial: SelectionState = {};
        selectedIds?.forEach((itemId) => { initial[itemId] = true; });
        setTempSelectedItems(initial);
        setSearchQuery('');
        onOpen?.();
      } else {
        onClose?.();
      }
      setIsOpen(open);
    },
    [disabled, selectedIds, onOpen, onClose]
  );

  const toggleItem = useCallback(
    (itemId: string, item: FilterItem) => {
      if (item.disabled) return;
      setTempSelectedItems((prev) => {
        if (type === 'checkbox') {
          return { ...prev, [itemId]: !prev[itemId] };
        }
        return prev[itemId] ? {} : { [itemId]: true };
      });
    },
    [type]
  );

  const handleApplyFilter = useCallback(() => {
    const ids = Object.keys(tempSelectedItems).filter((k) => tempSelectedItems[k]);
    onApplyFilter?.(ids);
    setIsOpen(false);
    onClose?.();
  }, [tempSelectedItems, onApplyFilter, onClose]);

  const handleClearFilter = useCallback(() => {
    setTempSelectedItems({});
    onApplyFilter?.([]);
  }, [onApplyFilter]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSearchQuery('');
      }
    },
    []
  );

  const searchVisible = enableSearch || (items?.length ?? 0) > 4;

  const filteredItems = useMemo(() => {
    if (!items?.length) return [];
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => item.text.toLowerCase().includes(q));
  }, [items, searchQuery]);

  const buttonDisplayText = useMemo(() => {
    if (type === 'calendar' && selectedDate) {
      return selectedDate.toLocaleDateString(
        locale === 'pt-br' ? 'pt-BR' : 'en-US'
      );
    }
    if (!selectedIds?.length) return buttonText;
    const firstItem = items?.find((item) => item.id === selectedIds[0]);
    return firstItem?.text || selectedIds[0];
  }, [type, selectedDate, selectedIds, items, buttonText, locale]);

  const getBadgeValue = useCallback(() => {
    if (!selectedIds || selectedIds.length <= 1) return null;
    return selectedIds.length - 1;
  }, [selectedIds]);

  const filterClass = clsx(styles['zds-filter__container'], className);

  const triggerButton = (
    <Button
      variant={variant}
      disabled={disabled}
      icon={
        type === 'calendar' ? <Calendar16Regular /> : <ChevronDownRegular />
      }
      iconPosition="right"
      size="lg"
    >
      <div className={styles['zds-filter-button__content']}>
        {icon && <span className={styles['zds-filter-button__icon']}>{icon}</span>}
        <span className={styles['zds-filter-button__text']}>{buttonDisplayText}</span>
        <span
          className={`${styles['zds-filter-button__arrow']} ${isOpen ? styles['zds-filter-button__arrow--open'] : ''}`}
        >
          {getBadgeValue() && (
            <Badge badgeValue={`+${getBadgeValue()}`} type="status" />
          )}
        </span>
      </div>
    </Button>
  );

  const popoverContent =
    type === 'calendar' ? (
      <Calendar
        currentDate={currentCalendarDate}
        selectedDate={selectedDate}
        onDaySelect={handleDateSelection}
        onDateChange={handleCalendarNavigation}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        onClear={handleClear}
        id={`filter-calendar-${id || ''}`}
        aria-label="Selecionar data para filtro"
      />
    ) : (
      <div className={styles['zds-filter__panel']}>
        {searchVisible && (
          <div className={styles['zds-filter__search']}>
            <Search
              value={searchQuery}
              placeholder={placeholder}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onClear={() => setSearchQuery('')}
            />
          </div>
        )}
        <ul
          className={styles['zds-filter__list']}
          role="listbox"
          aria-multiselectable={type === 'checkbox'}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const itemId = item.id || `filter-item-${index}`;
              const isSelected = !!tempSelectedItems[itemId];
              return (
                <li
                  key={itemId}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={item.disabled}
                  className={clsx(styles['zds-filter__item'], {
                    [styles['zds-filter__item--selected']]: isSelected,
                    [styles['zds-filter__item--disabled']]: item.disabled,
                    [styles['zds-filter__item--checkbox']]: type === 'checkbox',
                  })}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleItem(itemId, item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(itemId, item);
                    }
                  }}
                >
                  {type === 'checkbox' && (
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => {}}
                      disabled={item.disabled}
                      label=""
                    />
                  )}
                  {type === 'icon' && item.icon && (
                    <span className={styles['zds-filter__item-icon']}>{item.icon}</span>
                  )}
                  <span className={styles['zds-filter__item-text']}>{item.text}</span>
                </li>
              );
            })
          ) : (
            <li className={styles['zds-filter__no-results']} role="status" aria-live="polite">
              Nenhum item encontrado
            </li>
          )}
        </ul>
        <div className={styles['zds-filter__footer']}>
          <Button size="sm" variant="outlined" onClick={handleClearFilter}>
            Limpar
          </Button>
          <Button size="sm" onClick={handleApplyFilter}>
            Aplicar
          </Button>
        </div>
      </div>
    );

  return (
    <div className={filterClass} id={id} {...rest}>
      <Popover
        open={isOpen}
        onOpenChange={handleOpenChange}
        side={side}
        align={align}
        showArrow={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        trigger={triggerButton}
        content={popoverContent}
      />
    </div>
  );
};

export default Filter;

