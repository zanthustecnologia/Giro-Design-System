import React from 'react';

import type { BaseProps, Locale } from '../../types/common.types';
import type { Matcher } from 'react-day-picker';

// ---------------------------------------------------------------------------
// Tipos auxiliares
// ---------------------------------------------------------------------------

/** Formato de exibição da data aceito pelo componente. */
export type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy' | (string & {});

// ---------------------------------------------------------------------------
// Props do componente Calendar
// ---------------------------------------------------------------------------

interface CalendarBaseProps extends Omit<BaseProps, 'disabled'> {
  // --- Seleção ----------------------------------------------------------

  /** Data selecionada atualmente (usada pelo DatePicker). */
  selected?: Date | null;

  /** Data selecionada atualmente (usada pelo Filter). */
  selectedDate?: Date | null;

  // --- Navegação --------------------------------------------------------

  /**
   * Mês exibido no calendário. Use junto com `onDateChange` para
   * controlar a navegação externamente.
   */
  currentDate?: Date | null;

  /**
   * Mês inicial padrão exibido quando não controlado.
   * @default currentDate
   */
  defaultMonth?: Date;

  /** Primeiro mês navegável. */
  startMonth?: Date;

  /** Último mês navegável. */
  endMonth?: Date;

  // --- Callbacks --------------------------------------------------------

  /** Chamado quando o usuário seleciona um dia. */
  onDaySelect?: (date: Date) => void;

  /** Chamado quando o usuário navega entre meses. */
  onDateChange?: (date: Date) => void;

  /** Chamado quando o usuário limpa a seleção. */
  onClear?: () => void;

  // --- Restrições -------------------------------------------------------

  /** Data mínima selecionável. */
  minDate?: Date;

  /** Data máxima selecionável. */
  maxDate?: Date;

  /**
   * Dias desabilitados — aceita qualquer `Matcher` do react-day-picker
   * (Date, DateRange, DateBefore, DateAfter, DayOfWeek, função…).
   */
  disabled?: Matcher | Matcher[];

  // --- Formatação e localização ----------------------------------------

  /**
   * Formato de exibição da data.
   * @example 'dd/mm/yyyy' | 'mm/dd/yyyy'
   */
  format?: DateFormat;

  /**
   * Locale da interface — aceita os códigos internos do design system.
   * @default 'pt-br'
   */
  locale?: Locale;

  // --- Acessibilidade --------------------------------------------------

  /** Atributo `aria-label` para o elemento raiz. */
  'aria-label'?: string;

  /** Foca automaticamente o primeiro dia selecionado ou hoje. */
  autoFocus?: boolean;

  // --- Estilização -----------------------------------------------------
  /** Substitui os `classNames` padrão do react-day-picker. */
  classNames?: Partial<Record<string, string>>;
}

// --- Layout --------------------------------------------------------------

type CalendarCaptionProps = {
  /**
   * Modo do seletor de mês/ano no cabeçalho do calendário.
   * - `'grid'` (padrão) — painel em grade para seleção visual de mês e ano.
   * - `'dropdown'` — dropdowns nativos do react-day-picker.
   */
  captionMode?: 'dropdown' | 'grid';
};

export type CalendarProps = CalendarBaseProps & CalendarCaptionProps;
