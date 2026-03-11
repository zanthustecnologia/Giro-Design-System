import { createContext, useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { enUS, ptBR } from "react-day-picker/locale";

import styles from "./Calendar.module.scss";

import type { CalendarProps } from "./Calendar.types";
import type { MonthCaptionProps } from "react-day-picker";

// ─── Grid Picker Context ───────────────────────────────────────────────────────

type GridView = "days" | "months" | "years";

interface GridPickerContext {
  view: GridView;
  intlLocale: string;
  onMonthLabelClick: () => void;
  onYearLabelClick: () => void;
}

const GridCtx = createContext<GridPickerContext | null>(null);

// ─── Custom MonthCaption para o modo grid ─────────────────────────────────────

const GridMonthCaption = ({ calendarMonth, displayIndex: _displayIndex, ...divProps }: MonthCaptionProps) => {
  const ctx = useContext(GridCtx);
  const { view, intlLocale, onMonthLabelClick, onYearLabelClick } = ctx ?? ({} as GridPickerContext);
  const date = calendarMonth.date;
  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: "long" }).format(date);
  const yearLabel = String(date.getFullYear());

  return (
    <div {...divProps}>
      <button
        type="button"
        className={styles.caption_grid_btn}
        aria-pressed={view === "months"}
        onClick={onMonthLabelClick}
      >
        {monthLabel}
      </button>
      <button
        type="button"
        className={styles.caption_grid_btn}
        aria-pressed={view === "years"}
        onClick={onYearLabelClick}
      >
        {yearLabel}
      </button>
    </div>
  );
};

// ─── Constantes ───────────────────────────────────────────────────────────────

const YEARS_PER_PAGE = 12;

// ─── Componente Calendar ──────────────────────────────────────────────────────

const Calendar = ({
  selected,
  selectedDate,
  currentDate,
  defaultMonth,
  startMonth,
  endMonth,
  numberOfMonths,
  onDaySelect,
  onDateChange,
  onClear: _onClear,
  minDate,
  maxDate,
  disabled,
  hidden,
  format: _format,
  locale = "pt-br",
  captionLayout = "dropdown",
  captionMode = "grid",
  reverseYears,
  fixedWeeks,
  showOutsideDays,
  showWeekNumber,
  hideNavigation,
  disableNavigation,
  navLayout,
  role,
  title,
  animate = true,
  timeZone = "America/Sao_Paulo",
  modifiers,
  modifiersClassNames,
  footer,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: CalendarProps) => {
  const [internalSelected, setInternalSelected] = useState<Date | undefined>(
    selected ?? selectedDate ?? undefined
  );

  const [internalDisplayMonth, setInternalDisplayMonth] = useState<Date>(
    () => currentDate ?? defaultMonth ?? new Date()
  );

  const [gridView, setGridView] = useState<GridView>("days");
  const [yearPageStart, setYearPageStart] = useState<number>(
    () => (currentDate ?? defaultMonth ?? new Date()).getFullYear() - 5
  );

  const resolvedSelected =
    selected !== undefined
      ? (selected ?? undefined)
      : selectedDate !== undefined
        ? (selectedDate ?? undefined)
        : internalSelected;

  const resolvedLocale = locale === "pt-br" ? ptBR : enUS;
  const intlLocale = locale === "pt-br" ? "pt-BR" : "en-US";

  const disabledMatchers = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
    ...(disabled ? (Array.isArray(disabled) ? disabled : [disabled]) : []),
  ];

  const handleSelect = (date: Date | undefined) => {
    setInternalSelected(date);
    if (date) {
      onDaySelect?.(date);
    }
  };

  const handleMonthChange = (date: Date) => {
    setInternalDisplayMonth(date);
    onDateChange?.(date);
  };

  const isGridMode = captionMode === "grid";

  // ─── Helpers do modo grid ──────────────────────────────────────────────────

  const resolvedDisplayMonth = currentDate ?? internalDisplayMonth;
  const displayedMonthIndex = resolvedDisplayMonth.getMonth();
  const displayedYear = resolvedDisplayMonth.getFullYear();

  const startYear = startMonth?.getFullYear() ?? 1900;
  const endYear = endMonth?.getFullYear() ?? 2100;

  const handleGridMonthSelect = (monthIndex: number) => {
    const newDate = new Date(displayedYear, monthIndex, 1);
    setInternalDisplayMonth(newDate);
    onDateChange?.(newDate);
    setGridView("days");
  };

  const handleGridYearSelect = (year: number) => {
    const newDate = new Date(year, displayedMonthIndex, 1);
    setInternalDisplayMonth(newDate);
    onDateChange?.(newDate);
    setGridView("months");
  };

  const handleMonthLabelClick = () => {
    setGridView((v) => (v === "months" ? "days" : "months"));
  };

  const handleYearLabelClick = () => {
    setYearPageStart(displayedYear - 5);
    setGridView((v) => (v === "years" ? "days" : "years"));
  };

  const clampedYearPageStart = Math.max(startYear, yearPageStart);
  const yearsInPage = Array.from({ length: YEARS_PER_PAGE }, (_, i) => clampedYearPageStart + i).filter(
    (y) => y <= endYear
  );

  const canGoPrevYears = clampedYearPageStart - YEARS_PER_PAGE >= startYear;
  const canGoNextYears = clampedYearPageStart + YEARS_PER_PAGE <= endYear;

  const monthsGrid = Array.from({ length: 12 }, (_, i) => ({
    index: i,
    label: new Intl.DateTimeFormat(intlLocale, { month: "short" }).format(new Date(2000, i, 1)),
    disabled:
      (startMonth != null &&
        new Date(displayedYear, i, 1) < new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)) ||
      (endMonth != null &&
        new Date(displayedYear, i, 1) > new Date(endMonth.getFullYear(), endMonth.getMonth(), 1)),
  }));

  const gridCtxValue: GridPickerContext = {
    view: gridView,
    intlLocale,
    onMonthLabelClick: handleMonthLabelClick,
    onYearLabelClick: handleYearLabelClick,
  };

  // ─── Props compartilhadas do DayPicker ────────────────────────────────────

  const sharedDayPickerProps = {
    classNames: styles,
    modifiers,
    modifiersClassNames,
    animate,
    mode: "single" as const,
    selected: resolvedSelected,
    onSelect: handleSelect,
    startMonth,
    endMonth,
    numberOfMonths,
    disabled: disabledMatchers.length > 0 ? disabledMatchers : undefined,
    hidden,
    timeZone,
    locale: resolvedLocale,
    reverseYears,
    fixedWeeks,
    showOutsideDays,
    showWeekNumber,
    hideNavigation,
    disableNavigation,
    navLayout,
    role,
    title,
    footer,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  };

  // ─── Modo padrão (dropdown/label) ─────────────────────────────────────────

  if (!isGridMode) {
    return (
      <DayPicker
        id={id}
        {...sharedDayPickerProps}
        captionLayout={captionLayout}
        month={currentDate ?? undefined}
        defaultMonth={defaultMonth}
        onMonthChange={onDateChange}
      />
    );
  }

  // ─── Modo grid ────────────────────────────────────────────────────────────

  return (
    <GridCtx.Provider value={gridCtxValue}>
      <div className={styles.calendar_grid_wrapper}>
        <DayPicker
          id={id}
          {...sharedDayPickerProps}
          captionLayout="label"
          month={resolvedDisplayMonth}
          onMonthChange={handleMonthChange}
          components={{ MonthCaption: GridMonthCaption }}
        />
        {gridView !== "days" && (
          <div
            className={styles.grid_overlay}
            role="dialog"
            aria-modal="true"
            aria-label={gridView === "months" ? "Selecione o mês" : "Selecione o ano"}
          >
            {gridView === "months" && (
              <>
                <div className={styles.grid_overlay_header}>
                  <span>{displayedYear}</span>
                </div>
                <div className={styles.grid_cells}>
                  {monthsGrid.map(({ index, label, disabled: monthDisabled }) => (
                    <button
                      key={index}
                      type="button"
                      disabled={monthDisabled}
                      className={`${styles.grid_cell}${displayedMonthIndex === index ? ` ${styles.grid_cell_active}` : ""}`}
                      onClick={() => handleGridMonthSelect(index)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
            {gridView === "years" && (
              <>
                <div className={styles.grid_overlay_header}>
                  <button
                    type="button"
                    className={styles.grid_nav_btn}
                    disabled={!canGoPrevYears}
                    onClick={() => setYearPageStart((s) => s - YEARS_PER_PAGE)}
                    aria-label="Anos anteriores"
                  >
                    ‹
                  </button>
                  <span>
                    {clampedYearPageStart} – {clampedYearPageStart + yearsInPage.length - 1}
                  </span>
                  <button
                    type="button"
                    className={styles.grid_nav_btn}
                    disabled={!canGoNextYears}
                    onClick={() => setYearPageStart((s) => s + YEARS_PER_PAGE)}
                    aria-label="Próximos anos"
                  >
                    ›
                  </button>
                </div>
                <div className={`${styles.grid_cells} ${styles.grid_cells_years}`}>
                  {yearsInPage.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={`${styles.grid_cell}${displayedYear === year ? ` ${styles.grid_cell_active}` : ""}`}
                      onClick={() => handleGridYearSelect(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </GridCtx.Provider>
  );
};

export default Calendar;
