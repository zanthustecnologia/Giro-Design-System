// Filter.tsx
import { ChevronDownRegular, Calendar16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import Badge from '../Badge';
import Button from '../Button';
import styles from './Filter.module.scss';
import Calendar from '../Calendar/Calendar';
import Dropdown from '../Dropdown/Dropdown';

import type { FilterProps } from './Filter.types';
import type { DropdownType } from '../Dropdown/Dropdown.types';

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
  position = 'left',
  disabled = false,
  className,
  selectedDate,
  onDateSelect,
  onClearDate,
  minDate,
  maxDate,
  locale = 'pt-br',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date | null>(
    () => selectedDate || new Date()
  );
  const filterRef = useRef<HTMLDivElement>(null);

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
    if (!selectedIds || selectedIds.length <= 1) {
      return null;
    }
    return selectedIds.length - 1;
  }, [selectedIds]);

  const handleToggle = useCallback(() => {
    if (disabled) return;

    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [disabled, isOpen, onOpen, onClose]);

  const handleApplyFilter = useCallback(
    (newSelectedIds: string[]) => {
      onApplyFilter?.(newSelectedIds);
      setIsOpen(false);
      onClose?.();
    },
    [onApplyFilter, onClose]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          onClose?.();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const filterClass = clsx(styles['zds-filter__container'], className);
  const dropdownClass = clsx(styles['zds-filter__dropdown'], {
    [styles[`zds-filter__dropdown--${position}`]]: position,
  });
  return (
    <div ref={filterRef} className={filterClass} {...rest}>
      <Button
        variant={variant}
        onClick={handleToggle}
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

      {isOpen && (
        <div className={dropdownClass}>
          {type === 'calendar' ? (
            <Calendar
              currentDate={currentCalendarDate}
              selectedDate={selectedDate}
              onDaySelect={handleDateSelection}
              onDateChange={handleCalendarNavigation}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              onClear={handleClear}
              id={`filter-calendar-${filterRef.current?.id || ''}`}
              aria-label="Selecionar data para filtro"
            />
          ) : (
            <Dropdown
              items={items || []}
              type={type as DropdownType}
              defaultSelectedIds={selectedIds}
              placeholder={placeholder}
              applySearch={enableSearch}
              filter={true}
              onSelectionChange={handleApplyFilter}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;
