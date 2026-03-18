import { Calendar16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useEffect, useRef, useCallback, useId, KeyboardEvent, useMemo } from 'react';

import Calendar from '../Calendar/Calendar';
import Popover from '../Popover';
import TextField from '../TextField';
import styles from './DatePicker.module.scss';
import { formatDate, parseDate, applyDateMask, isValidDateFormat } from './Utils/DateUtils';

import type { DatePickerProps } from './DatePicker.types';

const DatePicker: React.FC<DatePickerProps> = ({
  locale = 'pt-br',
  calendarSide = 'bottom',
  calendarAlign = 'center',
  helperText,
  required = false,
  label = 'Data',
  value,
  defaultValue,
  onChange,
  disabled = false,
  error: externalError,
  minDate,
  maxDate,
  'data-testid': testId,
}) => {
  const fieldId = useId();
  const calendarId = `${fieldId}-calendar`;
  const errorId = `${fieldId}-error`;
  const helperTextId = `${fieldId}-help`;

  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue || null);
  const [tempInputValue, setTempInputValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentSelectedDate = isControlled ? value : internalDate;
  const currentError = externalError || internalError;
  const displayValue = isEditing ? tempInputValue : (currentSelectedDate ? formatDate(currentSelectedDate, locale) : '');

  const combinedHelperText = useMemo(() => {
    const texts = [];
    if (helperText) {
      texts.push(helperText);
    }
    if (currentError) {
      texts.push(currentError);
    }
    return texts.join(' • ');
  }, [helperText, currentError]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      const isInsideWrapper = wrapperRef.current?.contains(target as Node);
      const isInsideCalendar = !!target.closest?.('[data-radix-popper-content-wrapper]');
      if (!isInsideWrapper && !isInsideCalendar) {
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

  const handleDateChange = useCallback((newDate: Date | null) => {
    if (!isControlled) {
      setInternalDate(newDate);
    }
    onChange?.(newDate);
    setIsEditing(false);
    setTempInputValue('');
    setInternalError('');
    if (newDate) {
      setCurrentDate(newDate);
    }
  }, [isControlled, onChange]);

  const handleIconClick = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Enter') {
      if (showCalendar) {
        if (currentSelectedDate) {
          setShowCalendar(false);
          event.preventDefault();
          return;
        }
        if (tempInputValue.length === 10 && isValidDateFormat(tempInputValue, locale)) {
          const parsedDate = parseDate(tempInputValue, locale);
          if (parsedDate && !isNaN(parsedDate.getTime())) {
            handleDateChange(parsedDate);
            setShowCalendar(false);
            event.preventDefault();
            return;
          }
        }
      } else {
        setShowCalendar(true);
        event.preventDefault();
        return;
      }
    }

    if (key === 'Escape') {
      if (showCalendar) {
        setShowCalendar(false);
        event.preventDefault();
        return;
      }
    }

    const controlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
    ];

    if (controlKeys.includes(key)) {
      return;
    }

    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  };

  const handleDaySelect = (newSelectedDate: Date) => {
    setShowCalendar(false);
    handleDateChange(newSelectedDate);
  };

  const handleFocus = () => {
    if (!disabled) {
      setShowCalendar(true);
    }
  };

  const handleTextFieldChange = (value: string) => {
    const maskedValue = applyDateMask(value, locale);

    setTempInputValue(maskedValue);
    setIsEditing(true);

    if (maskedValue === '') {
      setInternalError('');
      handleDateChange(null);
      setCurrentDate(new Date());
      return;
    }

    if (maskedValue.length === 10) {
      if (isValidDateFormat(maskedValue, locale)) {
        const parsedDate = parseDate(maskedValue, locale);
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          setInternalError('');
          handleDateChange(parsedDate);
          setCurrentDate(parsedDate);
        } else {
          setInternalError('Data inválida');
          handleDateChange(null);
        }
      } else {
        setInternalError('Data inválida');
        handleDateChange(null);
      }
    } else {
      setInternalError('');
    }
  };

  return (
    <div ref={wrapperRef} className={styles.datePicker}>
        <Popover
          open={showCalendar}
          onOpenChange={setShowCalendar}
          trigger={
            <TextField
              className={styles.textfieldContainer}
              type="tel"
              icon={
                <Calendar16Regular 
                  onClick={!disabled ? handleIconClick : undefined}
                  className={clsx(
                    styles.datePickerIcon,
                    disabled && styles.datePickerIconDisabled
                  )}
                />
              }
              onChange={(e: string | number) => {
                handleTextFieldChange(String(e));
              }}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              persistIcon
              value={displayValue}
              helperText={combinedHelperText}
              maxLength={10}
              required={required}
              label={label}
              disabled={disabled}
              id={fieldId}
              data-testid={testId}
              placeholder={locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
              aria-label="Open calendar"
              aria-expanded={showCalendar}
              aria-controls={calendarId}
              aria-invalid={!!currentError}
              aria-describedby={currentError ? errorId : (helperText ? helperTextId : undefined)}
            />       
          }
          content={
            <Calendar
              selected={currentSelectedDate}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              onDaySelect={handleDaySelect}
              locale={locale}
              format={locale === 'en-us' ? 'mm/dd/yyyy' : 'dd/mm/yyyy'}
              minDate={minDate}
              maxDate={maxDate}
              id={calendarId}
              onClear={() => {
                handleDateChange(null);
                setCurrentDate(new Date());
              }}
            /> 
          }
          side={calendarSide}
          align={calendarAlign}
        />         
    </div>
  );
};

export default React.memo(DatePicker);