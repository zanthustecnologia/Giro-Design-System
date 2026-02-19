import React, {
  useId,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import clsx from 'clsx';
import styles from './Calendar.module.scss';
import {
  ChevronLeft16Regular,
  ChevronRight16Regular,
  ChevronDown16Regular,
  ChevronUp16Regular,
} from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import './i18n';
import Button from '../Button';
import type { DateFormat, DayItem, EmptyItem, CalendarItem, YearItem, CalendarProps } from './Calendar.types';
import { Locale } from '../../types/common.types';

/**
 * Calendar component with keyboard navigation support and full TypeScript implementation.
 */
const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  className,
  selectedDate = null,
  onDateChange,
  onDaySelect,
  onClear,
  locale = 'pt-br',
  format = 'dd/mm/yyyy',
  id,
  minDate,
  maxDate,
}) => {
  const { t, i18n } = useTranslation();
  const componentId = id || useId();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [changeView, setChangeView] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');
  
  const displayDate = currentDate || new Date();
  
  const [yearRangeStart, setYearRangeStart] = useState<number>(
    displayDate.getFullYear() - 13
  );

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  const { month, year, daysInMonth } = useMemo(
    () => ({
      month: displayDate.getMonth(),
      year: displayDate.getFullYear(),
      daysInMonth: new Date(
        displayDate.getFullYear(),
        displayDate.getMonth() + 1,
        0
      ).getDate(),
    }),
    [displayDate]
  );

  const weekDaysLabels = useMemo(
    (): string[] =>
      locale === 'en-us'
        ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        : ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    [locale]
  );

  /**
   * Retorna o formato de data conforme a prop format e locale.
   */
  const handleClearDate = useCallback((): void => {
    onClear?.(); // Chama callback externo se existir

    setAnnouncement(
      locale === 'en-us' ? 'Selected date cleared' : 'Data selecionada limpa'
    );
  }, [onClear, locale]);

  const getDateFormat = useCallback(
    (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      if (locale === 'en-us') {
        return date.toLocaleDateString('en-US', options);
      }
      return date.toLocaleDateString('pt-BR', options);
    },
    [locale]
  );

  /**
   * Verifica se o dia é hoje.
   */
  const isToday = useCallback(
    (day: number): boolean => {
      const today = new Date();
      return (
        !selectedDate &&
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
    },
    [selectedDate, month, year]
  );

  /**
   * Verifica se o dia está selecionado.
   */
  const isSelected = useCallback(
    (day: number): boolean => {
      return Boolean(
        selectedDate &&
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year
      );
    },
    [selectedDate, month, year]
  );

  /**
   * Verifica se uma data está dentro dos limites permitidos.
   */
  const isDateInRange = useCallback(
    (date: Date): boolean => {
      if (minDate && date < minDate) return false;
      if (maxDate && date > maxDate) return false;
      return true;
    },
    [minDate, maxDate]
  );

  /**
   * Retorna o nome do mês conforme o locale.
   */
  const getMonthName = useCallback((): string => {
    const monthNames =
      locale === 'en-us'
        ? [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]
        : [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ];

    return monthNames[month];
  }, [month, locale]);

  // ✅ Memoizar array de dias - tipado e otimizado
  const daysArray = useMemo((): CalendarItem[] => {
    const days: CalendarItem[] = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Dias vazios para alinhar o início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        type: 'day',
        key: i,
        day: i,
        date,
        isToday: isToday(i),
        isSelected: isSelected(i),
        label: getDateFormat(date),
      });
    }
    return days;
  }, [year, month, daysInMonth, isToday, isSelected, getDateFormat]);

  // ✅ Memoizar array de anos - tipado e otimizado
  const yearsArray = useMemo((): YearItem[] => {
    const years: YearItem[] = [];
    for (let y = yearRangeStart; y < yearRangeStart + 20; y++) {
      years.push({
        year: y,
        isCurrent: y === year,
        key: y,
      });
    }
    return years;
  }, [yearRangeStart, year]);

  // ✅ Memoizar handlers para evitar re-renders desnecessários
  const handleSelectDay = useCallback(
    (day: number): void => {
      const selectedDay = new Date(year, month, day);

      if (!isDateInRange(selectedDay)) {
        return;
      }

      onDateChange?.(selectedDay);
      onDaySelect?.(selectedDay);
    },
    [year, month, onDateChange, onDaySelect, isDateInRange]
  );

  /**
   * Navega para o mês anterior ou range de anos anterior.
   */
  const handlePrevMonth = useCallback((): void => {
    if (changeView) {
      setYearRangeStart((prev) => prev - 20);
      setAnnouncement(
        locale === 'en-us'
          ? 'Previous years displayed'
          : 'Anos anteriores exibidos'
      );
    } else {
      const newDate = new Date(year, month - 1, 1);
      onDateChange?.(newDate);
      setAnnouncement(
        locale === 'en-us'
          ? `Month changed to ${newDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          : `Mês alterado para ${newDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
      );
    }
  }, [changeView, locale, year, month, onDateChange]);

  /**
   * Navega para o próximo mês ou range de anos seguinte.
   */
  const handleNextMonth = useCallback((): void => {
    if (changeView) {
      setYearRangeStart((prev) => prev + 20);
      setAnnouncement(
        locale === 'en-us' ? 'Next years displayed' : 'Próximos anos exibidos'
      );
    } else {
      const newDate = new Date(year, month + 1, 1);
      onDateChange?.(newDate);
      setAnnouncement(
        locale === 'en-us'
          ? `Month changed to ${newDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          : `Mês alterado para ${newDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
      );
    }
  }, [changeView, locale, year, month, onDateChange]);

  /**
   * Alterna entre visualização de mês e ano.
   */
  const handleToggleView = useCallback((): void => {
    setChangeView((prev) => !prev);
  }, []);

  /**
   * Handler de eventos de teclado para navegação.
   */
  const handleCalendarKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (changeView) {
        if (e.key === 'ArrowLeft') {
          setYearRangeStart((prev) => prev - 20);
          setAnnouncement(
            locale === 'en-us'
              ? 'Previous years displayed'
              : 'Anos anteriores exibidos'
          );
        }
        if (e.key === 'ArrowRight') {
          setYearRangeStart((prev) => prev + 20);
          setAnnouncement(
            locale === 'en-us'
              ? 'Next years displayed'
              : 'Próximos anos exibidos'
          );
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handlePrevMonth();
        }
        if (e.key === 'ArrowRight') {
          handleNextMonth();
        }
      }
    },
    [changeView, locale, handlePrevMonth, handleNextMonth]
  );

  /**
   * Handler para seleção de ano.
   */
  const handleYearSelect = useCallback(
    (selectedYear: number): void => {
      setChangeView(false);
      const newDate = new Date(selectedYear, month, 1);
      onDateChange?.(newDate);
      setAnnouncement(
        locale === 'en-us'
          ? `Year changed to ${selectedYear}`
          : `Ano alterado para ${selectedYear}`
      );
    },
    [month, onDateChange, locale]
  );

  /**
   * Handler para eventos de teclado nos dias.
   */
  const handleDayKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, day: number): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelectDay(day);
      }
    },
    [handleSelectDay]
  );

  /**
   * Renderiza os anos usando o array de objetos memoizado.
   */
  const renderYears = useCallback((): React.ReactNode => {
    return yearsArray.map((item) => (
      <div
        key={item.key}
        className={clsx(styles['zds-calendar__year'], {
          [styles['zds-calendar__year--current']]: item.isCurrent,
        })}
        onClick={() => handleYearSelect(item.year)}
        tabIndex={0}
        role="button"
        aria-pressed={item.isCurrent}
        aria-label={
          item.isCurrent
            ? locale === 'en-us'
              ? `Current year, ${item.year}`
              : `Ano atual, ${item.year}`
            : locale === 'en-us'
              ? `Select year ${item.year}`
              : `Selecionar ano ${item.year}`
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleYearSelect(item.year);
          }
        }}
      >
        {item.year}
      </div>
    ));
  }, [yearsArray, handleYearSelect, locale]);

  /**
   * Renderiza os dias do mês atual usando o array de objetos memoizado.
   */
  const renderDays = useCallback((): React.ReactNode => {
    return daysArray.map((item) => {
      if (item.type === 'empty') {
        return (
          <div
            key={item.key}
            className={clsx(styles['zds-calendar__day'], styles['zds-calendar__day--empty'])}
            aria-hidden="true"
          />
        );
      }

      const dayItem = item as DayItem;
      const isDisabled = !isDateInRange(dayItem.date);

      return (
        <div
          key={dayItem.key}
          className={clsx(styles['zds-calendar__day'], {
            [styles['zds-calendar__day--today']]: dayItem.isToday,
            [styles['zds-calendar__day--selected']]: dayItem.isSelected,
            [styles['zds-calendar__day--disabled']]: isDisabled,
          })}
          onClick={isDisabled ? undefined : () => handleSelectDay(dayItem.day)}
          onKeyDown={
            isDisabled ? undefined : (e) => handleDayKeyDown(e, dayItem.day)
          }
          tabIndex={isDisabled ? -1 : 0}
          role="gridcell"
          aria-selected={dayItem.isSelected}
          aria-current={dayItem.isToday ? 'date' : undefined}
          aria-disabled={isDisabled}
          aria-label={`${dayItem.day} ${getMonthName()} ${year}${
            dayItem.isToday ? ` (${t('today')})` : ''
          }${dayItem.isSelected ? ` (${t('selected')})` : ''}${
            isDisabled ? ` (${t('disabled')})` : ''
          }`}
        >
          {dayItem.day}
        </div>
      );
    });
  }, [
    daysArray,
    handleSelectDay,
    handleDayKeyDown,
    getMonthName,
    year,
    t,
    isDateInRange,
  ]);

  // ✅ Memoizar componentes de weekdays para evitar re-renders
  const weekdaysComponent = useMemo((): React.ReactNode | null => {
    if (changeView) return null;

    return weekDaysLabels.map((day, idx) => (
      <div key={`${day}-${idx}`} className={styles['zds-calendar__weekday']}>
        {day}
      </div>
    ));
  }, [changeView, weekDaysLabels]);

  // ✅ Limpa o anúncio após um tempo para evitar repetições
  useEffect(() => {
    if (announcement) {
      const timeout = setTimeout(() => setAnnouncement(''), 1500);
      return () => clearTimeout(timeout);
    }
  }, [announcement]);

  // ✅ Sempre que abrir a view de anos, centraliza o range no ano atual
  useEffect(() => {
    if (changeView) {
      setYearRangeStart(year - 13);
    }
  }, [changeView, year]);

  return (
    <div
      className={clsx(
        styles['zds-calendar'],
        { [styles['zds-calendar--year-view']]: changeView },
        className
      )}
      id={componentId}
      tabIndex={0}
      ref={calendarRef}
      onKeyDown={handleCalendarKeyDown}
      aria-label={t('calendar')}
    >
      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={styles['zds-calendar__aria-live']}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(1px, 1px, 1px, 1px)',
        }}
      >
        {announcement}
      </div>

      {/* Header with month/year and navigation */}
      <div className={styles['zds-calendar__header']}>
        <span
          className={styles['zds-calendar__month-name']}
          onClick={handleToggleView}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleView();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={
            changeView
              ? locale === 'en-us'
                ? 'Close year selection'
                : 'Fechar seleção de ano'
              : locale === 'en-us'
                ? 'Open year selection'
                : 'Abrir seleção de ano'
          }
        >
          {`${getMonthName()} ${year}`}
          {changeView ? (
            <ChevronUp16Regular aria-hidden="true" />
          ) : (
            <ChevronDown16Regular aria-hidden="true" />
          )}
        </span>

        <div className={styles['zds-calendar__navigation']}>
          <button
            onClick={handlePrevMonth}
            aria-label={
              changeView
                ? locale === 'en-us'
                  ? 'Show previous years'
                  : 'Mostrar anos anteriores'
                : locale === 'en-us'
                  ? `Previous month, ${new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                  : `Mês anterior, ${new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
            }
            type="button"
            className="zds-calendar__nav-button"
          >
            <ChevronLeft16Regular aria-hidden="true" />
          </button>

          <button
            onClick={handleNextMonth}
            aria-label={
              changeView
                ? locale === 'en-us'
                  ? 'Show next years'
                  : 'Mostrar próximos anos'
                : locale === 'en-us'
                  ? `Next month, ${new Date(year, month + 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                  : `Próximo mês, ${new Date(year, month + 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
            }
            type="button"
            className="zds-calendar__nav-button"
          >
            <ChevronRight16Regular aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Weekdays header */}
      <div className={styles['zds-calendar__weekdays']}>{weekdaysComponent}</div>

      {/* Calendar grid - days or years */}
      <div className={styles['zds-calendar__grid']}>
        {changeView ? (
          <div
            className={styles['zds-calendar__year-view']}
            role="grid"
            aria-label={t('yearSelection')}
          >
            {renderYears()}
          </div>
        ) : (
          <div
            className={styles['zds-calendar__days']}
            role="grid"
            aria-label={`${getMonthName()} ${year}`}
          >
            {renderDays()}
          </div>
        )}
      </div>
      <div className={styles['zds-calendar__clear']}>
        <Button
          size="sm"
          variant="outlined"
          onClick={handleClearDate}
          disabled={!selectedDate}
        >
          Limpar
        </Button>
      </div>
    </div>
  );
};

// ✅ Default props integrados na função usando valores padrão dos parâmetros
Calendar.displayName = 'Calendar';

const MemoizedCalendar = React.memo(Calendar);
MemoizedCalendar.displayName = 'Calendar';

export default MemoizedCalendar;
export type { CalendarProps, Locale, DateFormat };
