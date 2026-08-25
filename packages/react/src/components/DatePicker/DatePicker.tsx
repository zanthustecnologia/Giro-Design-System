import { Calendar16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useEffect, useRef, useCallback, useId, KeyboardEvent } from 'react';

import Calendar from '../Calendar/Calendar';
import Popover from '../Popover';
import TextField from '../TextField';
import styles from './DatePicker.module.scss';
import { formatDate, parseDate, applyDateMask, isValidDateFormat, validatePartialDate } from './Utils/DateUtils';

import type { DatePickerProps } from './DatePicker.types';

const DatePicker: React.FC<DatePickerProps> = ({
  locale = 'pt-br',
  calendarSide = 'bottom',
  calendarAlign = 'start',
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
  scale = 1,
  id,
  className,
  style,
  ...rest
}) => {
  const fieldId = useId();
  const calendarId = `${fieldId}-calendar`;

  const containerStyle = { '--giro-scale': scale } as React.CSSProperties;

  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue || null);
  const [tempInputValue, setTempInputValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentSelectedDate = isControlled ? value : internalDate;
  const hasValidationError = !!(externalError || internalError);
  const displayValue = isEditing ? tempInputValue : (currentSelectedDate ? formatDate(currentSelectedDate, locale) : '');

  const combinedHelperText = externalError && helperText
    ? `${helperText} • ${externalError}`
    : externalError || helperText || '';

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

    const result = validatePartialDate(maskedValue, locale);

    if (result === 'invalid') {
      setInternalError('invalid');
      if (maskedValue.length === 10) {
        if (!isControlled) setInternalDate(null);
        onChange?.(null);
      }
    } else if (result === 'valid') {
      setInternalError('');
      if (maskedValue.length === 10) {
        const parsedDate = parseDate(maskedValue, locale);
        if (parsedDate) {
          handleDateChange(parsedDate);
          setCurrentDate(parsedDate);
        }
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      id={id}
      className={clsx(styles.datePicker, className)}
      style={{ ...containerStyle, ...style }}
      {...rest}
    >
        <Popover
          open={showCalendar}
          onOpenChange={setShowCalendar}
          asAnchor={true}
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
              autoComplete="off"
              value={displayValue}
              helperText={!externalError ? (helperText || undefined) : undefined}
              errorMessage={externalError ? combinedHelperText : undefined}
              error={hasValidationError ? true : undefined}
              maxLength={10}
              required={required}
              label={label}
              disabled={disabled}
              scale={scale}
              id={fieldId}
              data-testid={testId}
              placeholder={locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
              aria-label="Open calendar"
              aria-expanded={showCalendar}
              aria-controls={calendarId}
              aria-invalid={hasValidationError}
              aria-describedby={externalError ? undefined : (helperText ? `${fieldId}-help` : undefined)}
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
              scale={scale}
              id={calendarId}
              onClear={() => {
                handleDateChange(null);
                setCurrentDate(new Date());
              }}
            /> 
          }
          side={calendarSide}
          align={calendarAlign}
          sideOffset={8}
        />         
    </div>
  );
};

export default React.memo(DatePicker);