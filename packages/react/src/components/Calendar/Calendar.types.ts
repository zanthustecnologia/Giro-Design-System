import React from 'react';

import { Locale, BaseProps } from '../../types/common.types';

/** Formatos de exibição de data disponíveis */
export type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy';

/**
 * Representa um dia no calendário
 */
export interface DayItem {
  /** Tipo do item (sempre 'day') */
  type: 'day';
  /** Chave única para renderização */
  key: number;
  /** Número do dia */
  day: number;
  /** Objeto Date completo */
  date: Date;
  /** Indica se é o dia atual */
  isToday: boolean;
  /** Indica se o dia está selecionado */
  isSelected: boolean;
  /** Label acessível do dia */
  label: string;
}

/**
 * Representa um espaço vazio no grid do calendário
 */
export interface EmptyItem {
  /** Tipo do item (sempre 'empty') */
  type: 'empty';
  /** Chave única para renderização */
  key: string;
}

/** Item do calendário (pode ser um dia ou espaço vazio) */
export type CalendarItem = DayItem | EmptyItem;

/**
 * Representa um ano na visualização de seleção de ano
 */
export interface YearItem {
  /** Número do ano */
  year: number;
  /** Indica se é o ano atual */
  isCurrent: boolean;
  /** Chave única para renderização */
  key: number;
}

/**
 * Props do componente Calendar
 * @example
 * ```tsx
 * <Calendar 
 *   currentDate={new Date()} 
 *   onDateChange={(date) => console.log(date)}
 *   locale="pt-br"
 * />
 * ```
 * @example
 * ```tsx
 * <Calendar 
 *   currentDate={new Date()}
 *   selectedDate={selectedDate}
 *   onDaySelect={handleDaySelect}
 *   minDate={new Date('2024-01-01')}
 *   maxDate={new Date('2024-12-31')}
 *   format="dd/mm/yyyy"
 * />
 * ```
 */
export interface CalendarProps {
  /** Data do dia atual */
  currentDate: Date | null;
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
  /** Dia selecionado pelo usuário */
  selectedDate?: Date | null;
  
  /** Callback executado quando a data escolhida é alterada: (date) => void */
  onDateChange?: (date: Date) => void;
  
  /** Callback executado quando um dia é selecionado: (date) => void */
  onDaySelect?: (date: Date) => void;
  
  /** Callback executado ao limpar a seleção: () => void */
  onClear?: () => void;
  
  /** Data mínima selecionável */
  minDate?: Date;
  
  /** Data máxima selecionável */
  maxDate?: Date;
  
  /** Locale do calendário */
  locale?: Locale;
  
  /** Formato de exibição da data */
  format?: DateFormat;
  
  /** ID único do elemento */
  id?: BaseProps['id'];
}
