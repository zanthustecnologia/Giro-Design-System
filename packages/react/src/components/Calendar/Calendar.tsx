import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { enUS, ptBR } from "react-day-picker/locale";

import styles from "./Calendar.module.scss";

import type { CalendarProps } from "./Calendar.types";

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

  const resolvedSelected =
    selected !== undefined
      ? (selected ?? undefined)
      : selectedDate !== undefined
        ? (selectedDate ?? undefined)
        : internalSelected;

  const resolvedLocale = locale === "pt-br" ? ptBR : enUS;

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

  return (
    <DayPicker
      id={id}
      classNames={styles}
      captionLayout={captionLayout}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      animate={animate}
      mode="single"
      selected={resolvedSelected}
      onSelect={handleSelect}
      month={currentDate ?? undefined}
      defaultMonth={defaultMonth}
      startMonth={startMonth}
      endMonth={endMonth}
      numberOfMonths={numberOfMonths}
      onMonthChange={onDateChange}
      disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
      hidden={hidden}
      timeZone={timeZone}
      locale={resolvedLocale}
      reverseYears={reverseYears}
      fixedWeeks={fixedWeeks}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      hideNavigation={hideNavigation}
      disableNavigation={disableNavigation}
      navLayout={navLayout}
      role={role}
      title={title}
      footer={footer}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    />
  );
};

export default Calendar;