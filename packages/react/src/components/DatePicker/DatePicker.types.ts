import { Locale, BaseProps, Position } from '../../types/common.types';
export interface DatePickerProps {
  locale?: Locale;
  calendarPosition?: Position;
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
