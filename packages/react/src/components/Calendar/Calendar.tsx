import {
  ChevronDown16Regular,
  ChevronLeft16Regular,
  ChevronRight16Regular,
  ChevronUp16Regular,
} from "@fluentui/react-icons";
import { createContext, useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import { enUS, ptBR } from "react-day-picker/locale";

import styles from "./Calendar.module.scss";

import type { CalendarProps } from "./Calendar.types";
import type { MonthCaptionProps } from "react-day-picker";

type ChevronOrientation = "up" | "down" | "left" | "right";

const FLUENT_CHEVRON_MAP: Record<ChevronOrientation, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  down: ChevronDown16Regular,
  up: ChevronUp16Regular,
  left: ChevronLeft16Regular,
  right: ChevronRight16Regular,
};

const CustomChevron = ({
  orientation = "left",
  className,
}: {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: ChevronOrientation;
}) => {
  const Icon = FLUENT_CHEVRON_MAP[orientation];
  return <Icon className={className} aria-hidden />;
};

type GridView = "days" | "months" | "years";

interface GridPickerContext {
  view: GridView;
  intlLocale: string;
  onYearLabelClick: () => void;
}

const GridCtx = createContext<GridPickerContext | null>(null);

const GridMonthCaption = ({ calendarMonth, displayIndex: _displayIndex, ...divProps }: MonthCaptionProps) => {
  const ctx = useContext(GridCtx);
  const { view, intlLocale, onYearLabelClick } = ctx ?? ({} as GridPickerContext);
  const date = calendarMonth.date;
  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: "long" }).format(date);
  const yearLabel = String(date.getFullYear());

  return (
    <div {...divProps}>
      <span className={styles.caption_grid_label}>
        {monthLabel}
      </span>
      <button
        type="button"
        className={styles.caption_grid_btn}
        aria-pressed={view === "years"}
        onClick={onYearLabelClick}
      >
        {yearLabel}
        {view !== "days" ? (
          <ChevronUp16Regular className={styles.caption_year_chevron} aria-hidden />
        ) : (
          <ChevronDown16Regular className={styles.caption_year_chevron} aria-hidden />
        )}
      </button>
    </div>
  );
};

const YEARS_PER_PAGE = 20;

const Calendar = ({
  selected,
  currentDate,
  defaultMonth,
  startMonth,
  endMonth,
  onDaySelect,
  onDateChange,
  onClear: _onClear,
  minDate,
  maxDate,
  disabled,
  format: _format,
  locale = "pt-br",
  autoFocus,
  id,
  "aria-label": ariaLabel,
  ...rest
}: CalendarProps) => {
  const animate = true;

  const [internalSelected, setInternalSelected] = useState<Date | undefined>(
    selected ?? undefined
  );

  const [internalDisplayMonth, setInternalDisplayMonth] = useState<Date>(
    () => currentDate ?? defaultMonth ?? new Date()
  );

  const [gridView, setGridView] = useState<GridView>("days");
  const [yearPageStart, setYearPageStart] = useState<number>(
    () => (currentDate ?? defaultMonth ?? new Date()).getFullYear() - 9
  );

  const resolvedSelected =
    selected !== undefined
      ? (selected ?? undefined)
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

  const handleYearLabelClick = () => {
    setYearPageStart(displayedYear - 9);
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
    onYearLabelClick: handleYearLabelClick,
  };

  const sharedDayPickerProps = {
    classNames: styles,
    animate,
    mode: "single" as const,
    selected: resolvedSelected,
    onSelect: handleSelect,
    startMonth,
    endMonth,
    disabled: disabledMatchers.length > 0 ? disabledMatchers : undefined,
    locale: resolvedLocale,
    autoFocus,
    "aria-label": ariaLabel,
  };

  return (
    <GridCtx.Provider value={gridCtxValue}>
      <div className={styles.calendar_grid_wrapper}>
        <DayPicker
          id={id}
          {...sharedDayPickerProps}
          {...rest}
          captionLayout="label"
          month={resolvedDisplayMonth}
          onMonthChange={handleMonthChange}
          components={{ MonthCaption: GridMonthCaption, Chevron: CustomChevron }}
        />
        {gridView !== "days" && (
          <div
            className={`${styles.gridOverlay}${gridView === "years" ? ` ${styles.gridOverlayYears}` : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={gridView === "months" ? "Selecione o mês" : "Selecione o ano"}
          >
            {gridView === "months" && (
              <>
                <div className={styles.gridOverlayCaption}>
                  <span className={styles.caption_grid_label}>
                    {new Intl.DateTimeFormat(intlLocale, { month: "long" }).format(resolvedDisplayMonth)}
                  </span>
                  <button
                    type="button"
                    className={styles.caption_grid_btn}
                    onClick={() => setGridView("days")}
                    aria-label="Fechar seleção de mês"
                  >
                    {displayedYear}
                    <ChevronUp16Regular
                      className={styles.caption_year_chevron}
                      aria-hidden
                    />
                  </button>
                </div>
                <div className={styles.gridCells}>
                  {monthsGrid.map(({ index, label, disabled: monthDisabled }) => (
                    <button
                      key={index}
                      type="button"
                      disabled={monthDisabled}
                      className={`${styles.gridCell}${displayedMonthIndex === index ? ` ${styles.gridCellActive}` : ""}`}
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
                <div className={styles.gridOverlayCaption}>
                  <span className={styles.caption_grid_label}>
                    {new Intl.DateTimeFormat(intlLocale, { month: "long" }).format(resolvedDisplayMonth)}
                  </span>
                  <button
                    type="button"
                    className={styles.caption_grid_btn}
                    onClick={() => setGridView("days")}
                    aria-label="Fechar seleção de ano"
                  >
                    {displayedYear}
                    <ChevronUp16Regular
                      className={styles.caption_year_chevron}
                      aria-hidden
                    />
                  </button>
                  <div className={styles.gridOverlayYearsNav}>
                    <button
                      type="button"
                      className={styles.gridNavBtn}
                      disabled={!canGoPrevYears}
                      onClick={() => setYearPageStart((s) => s - YEARS_PER_PAGE)}
                      aria-label="Anos anteriores"
                    >
                      <ChevronLeft16Regular className={styles.chevronNavBtnPrev} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className={styles.gridNavBtn}
                      disabled={!canGoNextYears}
                      onClick={() => setYearPageStart((s) => s + YEARS_PER_PAGE)}
                      aria-label="Próximos anos"
                    >
                      <ChevronRight16Regular className={styles.chevronNavBtnNext} aria-hidden />
                    </button>
                  </div>
                </div>
                <div className={`${styles.gridCells} ${styles.gridCellsYears}`}>
                  {yearsInPage.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={`${styles.gridCell}${displayedYear === year ? ` ${styles.gridCellActive}` : ""}`}
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
