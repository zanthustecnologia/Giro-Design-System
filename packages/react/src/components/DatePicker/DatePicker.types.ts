import { Locale, BaseProps } from '../../types/common.types';

export type CalendarPosition = 'left' | 'right';

export interface DatePickerProps {
  locale?: Locale;
  calendarPosition?: CalendarPosition;
  helperText?: string;
  required?: boolean;
  label?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  disabled?: BaseProps['disabled'];
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: BaseProps['className'];
  'data-testid'?: string;
}
