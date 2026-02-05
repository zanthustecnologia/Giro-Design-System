import React from 'react';

import { Locale, BaseProps } from '../../types/common.types';

export type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy';

export interface DayItem {
  type: 'day';
  key: number;
  day: number;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  label: string;
}

export interface EmptyItem {
  type: 'empty';
  key: string;
}

export type CalendarItem = DayItem | EmptyItem;

export interface YearItem {
  year: number;
  isCurrent: boolean;
  key: number;
}

export interface CalendarProps {
  currentDate: Date | null;
  className?: BaseProps['className'];
  selectedDate?: Date | null;
  onDateChange?: (date: Date) => void;
  onDaySelect?: (date: Date) => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  format?: DateFormat;
  id?: BaseProps['id'];
}
