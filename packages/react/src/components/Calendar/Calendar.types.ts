import React from 'react';

import type { Matcher } from 'react-day-picker';
import type { BaseProps, Locale } from '../../types/common.types';

// ---------------------------------------------------------------------------
// Tipos auxiliares
// ---------------------------------------------------------------------------

/** Formato de exibição da data aceito pelo componente. */
export type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy' | (string & {});

// ---------------------------------------------------------------------------
// Props do componente Calendar
// ---------------------------------------------------------------------------

export interface CalendarProps extends Omit<BaseProps, 'disabled'> {
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
   * @default currentMonth
   */
  defaultMonth?: Date;

  /** Primeiro mês navegável. */
  startMonth?: Date;

  /** Último mês navegável. */
  endMonth?: Date;

  /** Número de meses exibidos simultaneamente. @default 1 */
  numberOfMonths?: number;

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

  /**
   * Dias ocultados — aceita qualquer `Matcher` do react-day-picker.
   */
  hidden?: Matcher | Matcher[];

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

  // --- Layout ----------------------------------------------------------

  /**
   * Layout do cabeçalho do calendário.
   * - `'label'` — exibe mês/ano como texto (padrão).
   * - `'dropdown'` — exibe dropdowns para mês e ano.
   * - `'dropdown-months'` — dropdown apenas para mês.
   * - `'dropdown-years'` — dropdown apenas para ano.
   */
  captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';

  /** Inverte a ordem dos anos no dropdown. */
  reverseYears?: boolean;

  /** Sempre exibe 6 semanas por mês, preenchendo com dias do mês seguinte. */
  fixedWeeks?: boolean;

  /** Exibe os dias pertencentes ao mês anterior/próximo. */
  showOutsideDays?: boolean;

  /** Exibe a coluna com o número da semana. */
  showWeekNumber?: boolean;

  /** Oculta os botões de navegação (sem desabilitar a navegação). */
  hideNavigation?: boolean;

  /** Desabilita a navegação entre meses. */
  disableNavigation?: boolean;

  /**
   * Posicionamento dos botões de navegação.
   * - `'around'` — um botão de cada lado do caption.
   * - `'after'` — ambos após o caption.
   */
  navLayout?: 'after' | 'around';

  // --- Acessibilidade --------------------------------------------------

  /** Atributo `aria-label` para o elemento raiz. */
  'aria-label'?: string;

  /** Atributo `aria-labelledby` para o elemento raiz. */
  'aria-labelledby'?: string;

  /** Foca automaticamente o primeiro dia selecionado ou hoje. */
  autoFocus?: boolean;

  /** Atributo `role` do elemento raiz (`'application'` ou `'dialog'`). */
  role?: 'application' | 'dialog';

  /** Atributo `title` do elemento raiz. */
  title?: string;

  // --- Animação --------------------------------------------------------

  /** Anima a transição entre meses. */
  animate?: boolean;

  // --- Fuso horário ----------------------------------------------------

  /**
   * Fuso horário IANA usado nos cálculos de datas.
   * @example 'America/Sao_Paulo'
   */
  timeZone?: string;

  // --- Estilização -----------------------------------------------------

  /** Estilos inline para o elemento raiz. */
  style?: React.CSSProperties;

  /** Substitui os `classNames` padrão do react-day-picker. */
  classNames?: Partial<Record<string, string>>;

  /** Modificadores customizados para dias específicos. */
  modifiers?: Record<string, Matcher | Matcher[] | undefined>;

  /** ClassNames aplicadas aos dias que correspondem aos `modifiers`. */
  modifiersClassNames?: Record<string, string>;

  // --- Footer ----------------------------------------------------------

  /** Rodapé do calendário — exibido como live region para acessibilidade. */
  footer?: React.ReactNode;
}
