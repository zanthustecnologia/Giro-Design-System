import React from 'react';

export type Locale = 'pt-br' | 'en-us';
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
  /** Data do dia Atual */
  currentDate: Date | null;
  /** Classe CSS adicional */
  className?: string;
  /** Dia Selecionado pelo usuário */
  selectedDate?: Date | null;
  /** Função que é executada quando a data escolhida é alterada */
  onDateChange?: (date: Date) => void;
  /** Função que é executada quando um dia é selecionado */
  onDaySelect?: (date: Date) => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
  /** Locale do calendário ('pt-br' ou 'en-us') */
  locale?: Locale;
  /** Formato de exibição da data ('dd/mm/yyyy' ou 'mm/dd/yyyy') */
  format?: DateFormat;
  /** Identificador do elemento raiz do calendário */
  id?: string;
}
