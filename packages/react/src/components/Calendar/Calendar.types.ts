import type { BaseProps, Locale, Scale } from '../../types/common.types';
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

  /** Escala visual aplicada ao componente */
  scale?: Scale;

  /** Estilo CSS inline opcional */
  style?: React.CSSProperties;
}

export type CalendarProps = CalendarBaseProps;
