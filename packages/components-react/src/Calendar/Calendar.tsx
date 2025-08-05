import React, { useId, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import './Calendar.scss';
import { ChevronLeft16Regular, ChevronRight16Regular, ChevronDown16Regular, ChevronUp16Regular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import './i18n';

type Locale = 'pt-br' | 'en-us';
type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy';

interface DayItem {
  type: 'day';
  key: number;
  day: number;
  date: moment.Moment;
  isToday: boolean;
  isSelected: boolean;
  label: string;
}

interface EmptyItem {
  type: 'empty';
  key: string;
}

type CalendarItem = DayItem | EmptyItem;

interface YearItem {
  year: number;
  isCurrent: boolean;
  key: number;
}

interface CalendarProps {
  /** Data do dia Atual */
  currentDate: Date;
  /** Classe CSS adicional */
  className?: string;
  /** Dia Selecionado pelo usuário */
  selectedDate?: Date | null;
  /** Função que é executada quando a data escolhida é alterada */
  onDateChange?: (date: Date) => void;
  /** Função que é executada quando um dia é selecionado */
  onDaySelect?: (date: Date) => void;
  minDate?: Date,
  maxDate?: Date,
  /** Locale do calendário ('pt-br' ou 'en-us') */
  locale?: Locale;
  /** Formato de exibição da data ('dd/mm/yyyy' ou 'mm/dd/yyyy') */
  format?: DateFormat;
  /** Identificador do elemento raiz do calendário */
  id?: string;
}

/**
 * Calendar component with keyboard navigation support and full TypeScript implementation.
 */
const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  className,
  selectedDate = null,
  onDateChange,
  onDaySelect,
  locale = 'pt-br',
  format = 'dd/mm/yyyy',
  id = ''
}) => {
  const { t, i18n } = useTranslation();
  const componentId = id || useId();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [changeView, setChangeView] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');
  const [yearRangeStart, setYearRangeStart] = useState<number>(moment(currentDate).year() - 13);

  // ✅ Effect para configuração de idioma
  useEffect(() => {
    i18n.changeLanguage(locale);
    moment.locale(locale === 'en-us' ? 'en' : 'pt-br');
  }, [locale, i18n]);

  // ✅ Memoizar cálculos pesados - moments
  const currentMoment = useMemo((): moment.Moment => moment(currentDate), [currentDate]);
  const selectedMoment = useMemo((): moment.Moment | null => 
    selectedDate ? moment(selectedDate) : null, [selectedDate]);

  // ✅ Memoizar valores derivados do momento atual
  const { month, year, daysInMonth } = useMemo(() => ({
    month: currentMoment.month(),
    year: currentMoment.year(),
    daysInMonth: currentMoment.daysInMonth()
  }), [currentMoment]);

  // ✅ Weekdays para cada idioma - memoizado com tipos
  const weekDaysLabels = useMemo((): string[] => 
    locale === 'en-us'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    [locale]
  );

  /**
   * Retorna o formato de data conforme a prop format e locale.
   */
  const getDateFormat = useCallback((): string => {
    if (format === 'mm/dd/yyyy' || locale === 'en-us') return 'MMMM DD, YYYY';
    return 'DD [de] MMMM [de] YYYY';
  }, [format, locale]);

  /**
   * Verifica se o dia é hoje.
   */
  const isToday = useCallback((day: number): boolean => {
    const today = moment();
    return (
      !selectedDate &&
      day === today.date() &&
      month === today.month() &&
      year === today.year()
    );
  }, [selectedDate, month, year]);

  /**
   * Verifica se o dia está selecionado.
   */
  const isSelected = useCallback((day: number): boolean => {
    return Boolean(
      selectedMoment &&
      selectedMoment.date() === day &&
      selectedMoment.month() === month &&
      selectedMoment.year() === year
    );
  }, [selectedMoment, month, year]);

  /**
   * Retorna o nome do mês conforme o locale.
   */
  const getMonthName = useCallback((): string => {
    // Garante que o moment use o locale correto para o nome do mês
    return currentMoment
      .locale(locale === 'en-us' ? 'en' : 'pt-br')
      .format('MMMM');
  }, [currentMoment, locale]);

  // ✅ Memoizar array de dias - tipado e otimizado
  const daysArray = useMemo((): CalendarItem[] => {
    const days: CalendarItem[] = [];
    const startDay = moment([year, month]).day();
    
    // Dias vazios para alinhar o início do mês
    for (let i = 0; i < startDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }
    
    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment([year, month, i]);
      days.push({
        type: 'day',
        key: i,
        day: i,
        date,
        isToday: isToday(i),
        isSelected: isSelected(i),
        label: date.format(getDateFormat()),
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
  const handleSelectDay = useCallback((day: number): void => {
    const selectedDay = moment([year, month, day]).toDate();
    onDateChange?.(selectedDay);
    onDaySelect?.(selectedDay);
  }, [year, month, onDateChange, onDaySelect]);

  /**
   * Navega para o mês anterior ou range de anos anterior.
   */
  const handlePrevMonth = useCallback((): void => {
    if (changeView) {
      setYearRangeStart((prev) => prev - 20);
      setAnnouncement(locale === 'en-us' ? 'Previous years displayed' : 'Anos anteriores exibidos');
    } else {
      const newDate = currentMoment.clone().subtract(1, 'month');
      onDateChange?.(newDate.toDate());
      setAnnouncement(
        locale === 'en-us'
          ? `Month changed to ${newDate.format('MMMM YYYY')}`
          : `Mês alterado para ${newDate.format('MMMM [de] YYYY')}`
      );
    }
  }, [changeView, locale, currentMoment, onDateChange]);

  /**
   * Navega para o próximo mês ou range de anos seguinte.
   */
  const handleNextMonth = useCallback((): void => {
    if (changeView) {
      setYearRangeStart((prev) => prev + 20);
      setAnnouncement(locale === 'en-us' ? 'Next years displayed' : 'Próximos anos exibidos');
    } else {
      const newDate = currentMoment.clone().add(1, 'month');
      onDateChange?.(newDate.toDate());
      setAnnouncement(
        locale === 'en-us'
          ? `Month changed to ${newDate.format('MMMM YYYY')}`
          : `Mês alterado para ${newDate.format('MMMM [de] YYYY')}`
      );
    }
  }, [changeView, locale, currentMoment, onDateChange]);

  /**
   * Alterna entre visualização de mês e ano.
   */
  const handleToggleView = useCallback((): void => {
    setChangeView(prev => !prev);
  }, []);

  /**
   * Handler de eventos de teclado para navegação.
   */
  const handleCalendarKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (changeView) {
      if (e.key === 'ArrowLeft') {
        setYearRangeStart(prev => prev - 20);
        setAnnouncement(locale === 'en-us' ? 'Previous years displayed' : 'Anos anteriores exibidos');
      }
      if (e.key === 'ArrowRight') {
        setYearRangeStart(prev => prev + 20);
        setAnnouncement(locale === 'en-us' ? 'Next years displayed' : 'Próximos anos exibidos');
      }
    } else {
      if (e.key === 'ArrowLeft') {
        handlePrevMonth();
      }
      if (e.key === 'ArrowRight') {
        handleNextMonth();
      }
    }
  }, [changeView, locale, handlePrevMonth, handleNextMonth]);

  /**
   * Handler para seleção de ano.
   */
  const handleYearSelect = useCallback((selectedYear: number): void => {
    setChangeView(false);
    onDateChange?.(moment([selectedYear, month, 1]).toDate());
    setAnnouncement(
      locale === 'en-us' 
        ? `Year changed to ${selectedYear}` 
        : `Ano alterado para ${selectedYear}`
    );
  }, [month, onDateChange, locale]);

  /**
   * Handler para eventos de teclado nos dias.
   */
  const handleDayKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>, day: number): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectDay(day);
    }
  }, [handleSelectDay]);

  /**
   * Renderiza os anos usando o array de objetos memoizado.
   */
  const renderYears = useCallback((): React.ReactNode => {
    return yearsArray.map((item) => (
      <div
        key={item.key}
        className={clsx('zds-calendar__year', {
          'zds-calendar__year--current': item.isCurrent,
        })}
        onClick={() => handleYearSelect(item.year)}
        tabIndex={0}
        role="button"
        aria-pressed={item.isCurrent}
        aria-label={
          item.isCurrent 
            ? (locale === 'en-us' ? `Current year, ${item.year}` : `Ano atual, ${item.year}`) 
            : (locale === 'en-us' ? `Select year ${item.year}` : `Selecionar ano ${item.year}`)
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
            className={clsx('zds-calendar__day', 'zds-calendar__day--empty')} 
            aria-hidden="true" 
          />
        );
      }

      const dayItem = item as DayItem;
      return (
        <div
          key={dayItem.key}
          className={clsx(
            'zds-calendar__day',
            {
              'zds-calendar__day--today': dayItem.isToday,
              'zds-calendar__day--selected': dayItem.isSelected,
            }
          )}
          onClick={() => handleSelectDay(dayItem.day)}
          onKeyDown={(e) => handleDayKeyDown(e, dayItem.day)}
          tabIndex={0}
          role="gridcell"
          aria-selected={dayItem.isSelected}
          aria-current={dayItem.isToday ? 'date' : undefined}
          aria-label={`${dayItem.day} ${getMonthName()} ${year}${
            dayItem.isToday ? ` (${t('today')})` : ''
          }${dayItem.isSelected ? ` (${t('selected')})` : ''}`}
        >
          {dayItem.day}
        </div>
      );
    });
  }, [daysArray, handleSelectDay, handleDayKeyDown, getMonthName, year, t]);

  // ✅ Memoizar componentes de weekdays para evitar re-renders
  const weekdaysComponent = useMemo((): React.ReactNode | null => {
    if (changeView) return null;
    
    return weekDaysLabels.map((day, idx) => (
      <div key={`${day}-${idx}`} className="zds-calendar__weekday">
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
      setYearRangeStart(currentMoment.year() - 13);
    }
  }, [changeView, currentMoment]);

  return (
    <div
      className={clsx(
        "zds-calendar",
        { "zds-calendar--year-view": changeView },
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
        className="zds-calendar__aria-live"
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
      <div className="zds-calendar__header">
        <span
          className="zds-calendar__month-name"
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
              ? (locale === 'en-us' ? 'Close year selection' : 'Fechar seleção de ano') 
              : (locale === 'en-us' ? 'Open year selection' : 'Abrir seleção de ano')
          }
        >
          {`${getMonthName()} ${year}`}
          {changeView ? <ChevronUp16Regular aria-hidden="true" /> : <ChevronDown16Regular aria-hidden="true" />}
        </span>

        <div className="zds-calendar__navigation">
          <button
            onClick={handlePrevMonth}
            aria-label={
              changeView
                ? (locale === 'en-us'
                  ? "Show previous years"
                  : "Mostrar anos anteriores")
                : (locale === 'en-us'
                  ? `Previous month, ${currentMoment.clone().subtract(1, 'month').format('MMMM YYYY')}`
                  : `Mês anterior, ${currentMoment.clone().subtract(1, 'month').format('MMMM [de] YYYY')}`)
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
                ? (locale === 'en-us'
                  ? "Show next years"
                  : "Mostrar próximos anos")
                : (locale === 'en-us'
                  ? `Next month, ${currentMoment.clone().add(1, 'month').format('MMMM YYYY')}`
                  : `Próximo mês, ${currentMoment.clone().add(1, 'month').format('MMMM [de] YYYY')}`)
            }
            type="button"
            className="zds-calendar__nav-button"
          >
            <ChevronRight16Regular aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Weekdays header */}
      <div className="zds-calendar__weekdays">
        {weekdaysComponent}
      </div>

      {/* Calendar grid - days or years */}
      <div className="zds-calendar__grid">
        {changeView ? (
          <div className="zds-calendar__year-view" role="grid" aria-label={t('yearSelection')}>
            {renderYears()}
          </div>
        ) : (
          <div className="zds-calendar__days" role="grid" aria-label={`${getMonthName()} ${year}`}>
            {renderDays()}
          </div>
        )}
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