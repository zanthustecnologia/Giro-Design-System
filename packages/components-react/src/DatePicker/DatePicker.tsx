import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import TextField from '../TextField/TextField';
import Calendar from '../Calendar/Calendar';
import { Calendar16Regular } from '@fluentui/react-icons';
import { formatDate, parseDate } from './DateUtils';
import './DatePicker.scss';

// ✅ Types para o componente
type Locale = 'pt-br' | 'en-us';
type CalendarPosition = 'left' | 'right';

interface DatePickerProps {
  /** Idioma da data */
  locale?: Locale;
  /** Posição do calendário */
  calendarPosition?: CalendarPosition;
  /** Data inicial selecionada */
  defaultDate?: Date | null;
  /** Data mínima permitida */
  minDate?: Date;
  /** Data máxima permitida */
  maxDate?: Date;
  /** Label do campo de entrada */
  label?: string;
  /** Placeholder personalizado */
  placeholder?: string;
  /** Se o campo é obrigatório */
  required?: boolean;
  /** Se o campo está desabilitado */
  disabled?: boolean;
  /** Classe CSS adicional */
  className?: string;
  /** ID único do componente */
  id?: string;
  /** Callback quando a data é alterada */
  onDateChange?: (date: Date | null) => void;
  /** Callback quando ocorre erro de validação */
  onChange?: (value: Date | null) => void;
  /** Callback quando ocorre erro de validação */
  onError?: (error: string) => void;
  /** Nome do campo para formulários */
  name?: string;
  /** Função de validação customizada */
  customValidator?: (date: Date | null, value: string) => string | null;
}

/**
 * DatePicker component for selecting dates with calendar popup.
 * Provides both text input and calendar selection for dates.
 */
const DatePicker: React.FC<DatePickerProps> = ({
  locale = 'pt-br',
  calendarPosition = 'left',
  defaultDate = null,
  minDate,
  maxDate,
  label = 'Data',
  placeholder,
  required = false,
  disabled = false,
  className,
  id,
  onDateChange,
  onError,
  name,
  customValidator
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
  const [currentDate, setCurrentDate] = useState<Date>(defaultDate || new Date());
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const errorId = useMemo(() => id ? `${id}-error` : 'zds-date-picker-error', [id]);
  const calendarId = useMemo(() => id ? `${id}-calendar` : 'calendar-popup', [id]);

  // ✅ Regex para validação baseada no locale
  const dateRegex = useMemo((): RegExp => {
    return locale === 'en-us'
      ? /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
      : /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  }, [locale]);

  // ✅ Placeholder baseado no locale
  const defaultPlaceholder = useMemo((): string => {
    if (placeholder) return placeholder;
    return locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
  }, [locale, placeholder]);

  // ✅ Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // ✅ Escape key handler para fechar calendar
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && showCalendar) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showCalendar]);

  // ✅ Validação de data com range
  const validateDate = useCallback((date: Date | null, inputValue: string): string => {
    // Validação customizada primeiro
    if (customValidator) {
      const customError = customValidator(date, inputValue);
      if (customError) return customError;
    }

    // Validação de data inválida
    if (inputValue && !date) {
      return locale === 'en-us' ? 'Invalid date' : 'Data inválida';
    }

    // Validação de range
    if (date) {
      if (minDate && date < minDate) {
        return locale === 'en-us'
          ? `Date must be after ${formatDate(minDate, locale)}`
          : `Data deve ser posterior a ${formatDate(minDate, locale)}`;
      }

      if (maxDate && date > maxDate) {
        return locale === 'en-us'
          ? `Date must be before ${formatDate(maxDate, locale)}`
          : `Data deve ser anterior a ${formatDate(maxDate, locale)}`;
      }
    }

    // Validação de campo obrigatório
    if (required && !date && !inputValue) {
      return locale === 'en-us' ? 'Date is required' : 'Data é obrigatória';
    }

    return '';
  }, [customValidator, locale, minDate, maxDate, required]);

  // ✅ Handler para seleção de dia no calendário
  const handleDaySelect = useCallback((newSelectedDate: Date): void => {
    if (disabled) return;

    setSelectedDate(newSelectedDate);
    setCurrentDate(newSelectedDate);
    setTextFieldValue(formatDate(newSelectedDate, locale));
    setShowCalendar(false);

    const validationError = validateDate(newSelectedDate, formatDate(newSelectedDate, locale));
    setError(validationError);

    // Callbacks
    onDateChange?.(newSelectedDate);
    if (validationError && onError) {
      onError(validationError);
    }
  }, [disabled, locale, validateDate, onDateChange, onError]);

  // ✅ Handler para mudança no TextField
  const handleTextFieldChange = useCallback((value: string): void => {
    if (disabled) return;

    setTextFieldValue(value);

    if (value === '') {
      setSelectedDate(null);
      setCurrentDate(new Date());
      setError('');
      onDateChange?.(null);
      return;
    }

    let parsedDate: Date | null = null;
    let validationError = '';

    if (dateRegex.test(value)) {
      parsedDate = parseDate(value, locale);

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setCurrentDate(parsedDate);
        validationError = validateDate(parsedDate, value);
      } else {
        validationError = validateDate(null, value);
      }
    } else {
      validationError = validateDate(null, value);
    }

    setError(validationError);
    onDateChange?.(parsedDate);

    if (validationError && onError) {
      onError(validationError);
    }
  }, [disabled, dateRegex, locale, validateDate, onDateChange, onError]);

  // ✅ Handler para clique no ícone
  const handleIconClick = useCallback((): void => {
    if (disabled) return;
    setShowCalendar(prev => !prev);
  }, [disabled]);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Now call your original function or state setter with the string value
    onDateChange?.(value);
  };
  // ✅ Handler para Enter no campo
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (disabled) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      handleTextFieldChange((event.target as HTMLInputElement).value);
    } else if (event.key === 'ArrowDown' && !showCalendar) {
      event.preventDefault();
      setShowCalendar(true);
    }
  }, [disabled, handleTextFieldChange, showCalendar]);

  // ✅ Sincronizar valor quando locale muda
  useEffect(() => {
    if (selectedDate) {
      setTextFieldValue(formatDate(selectedDate, locale));
    }
  }, [locale, selectedDate]);

  // ✅ Inicializar com defaultDate
  useEffect(() => {
    if (defaultDate && !selectedDate) {
      setSelectedDate(defaultDate);
      setCurrentDate(defaultDate);
      setTextFieldValue(formatDate(defaultDate, locale));
    }
  }, [defaultDate, selectedDate, locale]);

  return (
    <div
      ref={wrapperRef}
      className={clsx('zds-date-picker-wrapper', className)}
    >
      <div className="zds-date-picker">
        <TextField
          icon={<Calendar16Regular />}
          label={label}
          name={name}
          id={id}
          required={required}
          disabled={disabled}
          onFocus={() => !disabled && setShowCalendar(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onIconClick={handleIconClick}
          aria-label={locale === 'en-us' ? 'Open calendar' : 'Abrir calendário'}
          aria-expanded={showCalendar}
          aria-controls={calendarId}
          aria-haspopup="dialog"
          placeholder={defaultPlaceholder}
          value={textFieldValue}
          error={error}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          autoComplete="off"
        />

        {error && (
          <span
            id={errorId}
            className="zds-date-picker__error"
            role="alert"
            aria-live="polite"
          >
            {error}
          </span>
        )}

        <div
          className={clsx(
            'zds-date-picker__calendar-popup',
            `zds-calendar--${calendarPosition}`,
            showCalendar && 'zds-calendar--visible'
          )}
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'en-us' ? 'Choose date' : 'Escolher data'}
          id={calendarId}
        >
          {showCalendar && (
            <Calendar
              selectedDate={selectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onDaySelect={handleDaySelect}
              locale={locale}
              format={locale === 'en-us' ? 'mm/dd/yyyy' : 'dd/mm/yyyy'}
              minDate={minDate}
              maxDate={maxDate}
              className="zds-date-picker__calendar"
            />
          )}
        </div>
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default React.memo(DatePicker);

// ✅ Exportar tipos para uso em outros componentes
export type { DatePickerProps, Locale, CalendarPosition };