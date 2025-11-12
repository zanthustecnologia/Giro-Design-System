export type DatePickerLocale = 'pt-br' | 'en-us';
export type CalendarPosition = 'left' | 'right';

export interface DatePickerProps {
  /** Locale para formatação da data */
  locale?: DatePickerLocale;
  /** Posição do calendário */
  calendarPosition?: CalendarPosition;
  /** Texto de ajuda */
  helperText?: string;
  /** Se o campo é obrigatório */
  required?: boolean;
  /** Label do campo */
  label?: string;
  /** Valor controlado da data */
  value?: Date | null;
  /** Valor inicial para modo não controlado */
  defaultValue?: Date | null;
  /** Callback chamado quando a data muda */
  onChange?: (date: Date | null) => void;
  /** Se o campo está desabilitado */
  disabled?: boolean;
  /** Mensagem de erro */
  error?: string;
  /** Data mínima permitida */
  minDate?: Date;
  /** Data máxima permitida */
  maxDate?: Date;
  /** Classes CSS adicionais */
  className?: string;
  /** ID para testes */
  'data-testid'?: string;
}
