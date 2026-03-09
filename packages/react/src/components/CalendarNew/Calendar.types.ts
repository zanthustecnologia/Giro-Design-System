import { Locale, BaseProps } from '../../types/common.types';

export interface CalendarProps {
  /**
   * Data atualmente selecionada no calendário.
   */
  selectedDate?: Date | null;

  timezone?: string;

  /**
   * Data atualmente exibida no calendário.
   */
  currentDate?: Date;

  dayOfWeekFormatter?: (day: Date) => string;

  /**
   * Callback acionado quando a data exibida no calendário é alterada.
   * Recebe a nova data exibida como argumento.
   */
  onDateChange?: (date: Date) => void;

  locale?: Locale;

}