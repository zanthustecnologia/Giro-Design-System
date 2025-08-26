import React, { useState, useEffect, useRef, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import clsx from 'clsx';
import TextField from '../TextField/TextField';
import Calendar from '../Calendar/Calendar';
import { Calendar16Regular } from '@fluentui/react-icons';
import { formatDate, parseDate } from './DateUtils';
import './DatePicker.scss';

export type DatePickerLocale = 'pt-br' | 'en-us';
export type CalendarPosition = 'left' | 'right';

export interface DatePickerProps {
  locale?: DatePickerLocale;
  calendarPosition?: CalendarPosition;
}

const DatePicker: React.FC<DatePickerProps> = ({
  locale = 'pt-br',
  calendarPosition = 'left',
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const errorId = 'zds-date-picker-error';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleIconClick = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDaySelect = (newSelectedDate: Date) => {
    setSelectedDate(newSelectedDate);
    setCurrentDate(newSelectedDate);
    setTextFieldValue(formatDate(newSelectedDate, locale));
    setShowCalendar(false);
    setError('');
  };

  const handleTextFieldChange = (value: string) => {
    setTextFieldValue(value);

    const dateRegex =
      locale === 'en-us'
        ? /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
        : /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (value === '') {
      setError('');
      setSelectedDate(null);
      setCurrentDate(new Date());
      return;
    }

    if (dateRegex.test(value)) {
      const parsedDate = parseDate(value, locale);
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setCurrentDate(parsedDate);
        setError('');
      } else {
        setSelectedDate(null);
        setError('Data inválida');
      }
    } else {
      setSelectedDate(null);
      setError('Data inválida');
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setTextFieldValue(formatDate(selectedDate, locale));
    }
  }, [locale, selectedDate]);

  return (
    <div ref={wrapperRef}>
      <div className={clsx('zds-date-picker')}>
        <TextField
          icon={<Calendar16Regular />}
          label="Data"
          // onFocus={() => setShowCalendar(true)}
          onChange={(e: string) => {
            setShowCalendar(true);
            handleTextFieldChange(e);
          }}
          // onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          //   if (e.key === 'Enter') {
          //     handleTextFieldChange((e.target as HTMLInputElement).value);
          //   }
          // }}
          aria-label="Open calendar"
          aria-expanded={showCalendar}
          aria-controls="calendar-popup"
          placeholder={locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
          value={textFieldValue}
          // error={error}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <span id={errorId} className="zds-date-picker__error" role="alert">
            {error}
          </span>
        )}
        <div
          className={clsx(
            'zds-date-picker__calendar-popup',
            calendarPosition === 'left' && 'zds-calendar--left',
            calendarPosition === 'right' && 'zds-calendar--right'
          )}
        >
          {showCalendar && (
            <Calendar
              selectedDate={selectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onDaySelect={handleDaySelect}
              locale={locale}
              format={locale === 'en-us' ? 'mm/dd/yyyy' : 'dd/mm/yyyy'}
             
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DatePicker);