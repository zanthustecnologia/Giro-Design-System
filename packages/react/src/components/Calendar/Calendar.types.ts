import type { ScalableProps, Locale } from '../../types/common.types';
import type { DateRange, Matcher } from 'react-day-picker';

export type { DateRange };

// ---------------------------------------------------------------------------
// Tipos auxiliares
// ---------------------------------------------------------------------------

/** Formato de exibição da data aceito pelo componente. */
export type DateFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy' | (string & {});


// ---------------------------------------------------------------------------
// Props do componente Calendar
// ---------------------------------------------------------------------------

interface CalendarBaseProps extends Omit<ScalableProps, 'disabled'> {
  // --- Modo de seleção --------------------------------------------------

  /**
   * Modo de seleção de datas.
   * @default 'single'
   */
  mode?: 'single' | 'range';

  // --- Seleção ----------------------------------------------------------

  /** Data selecionada atualmente (modo `single`). */
  selected?: Date | null;

  /** Intervalo de datas selecionado (modo `range`). */
  selectedRange?: DateRange | null;

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

  /**
   * Quantidade de meses exibidos simultaneamente.
   * @default 1
   */
  numberOfMonths?: number;

  // --- Callbacks --------------------------------------------------------

  /** Chamado quando o usuário seleciona um dia (modo `single`). */
  onDaySelect?: (date: Date) => void;

  /** Chamado quando o usuário seleciona um intervalo (modo `range`). */
  onRangeSelect?: (range: DateRange | undefined) => void;

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
   * Idioma da interface — aceita os códigos internos do design system.
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

export type CalendarProps = CalendarBaseProps;
