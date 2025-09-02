import React, { useState, useEffect, useRef, useCallback, useId, KeyboardEvent, useMemo } from 'react';
import clsx from 'clsx';
import TextField from '../TextField';
import Calendar from '../Calendar/Calendar';
import { Calendar16Regular } from '@fluentui/react-icons';
import { formatDate, parseDate, applyDateMask, isValidDateFormat } from './DateUtils';
import './DatePicker.scss';

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

const DatePicker: React.FC<DatePickerProps> = ({
  locale = 'pt-br',
  calendarPosition = 'left',
  helperText = '',
  required = false,
  label = 'Data',
  value,
  defaultValue,
  onChange,
  disabled = false,
  error: externalError,
  minDate,
  maxDate,
  className = '',
  'data-testid': testId,
}) => {
  // ✅ IDs únicos para acessibilidade
  const fieldId = useId();
  const calendarId = `${fieldId}-calendar`;
  const errorId = `${fieldId}-error`;
  const helperTextId = `${fieldId}-help`;

  // ✅ Suporte controlled/uncontrolled adequado
  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue || null);
  const [tempInputValue, setTempInputValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ✅ Estados derivados - uma única fonte de verdade
  const currentSelectedDate = isControlled ? value : internalDate;
  const currentError = externalError || internalError;
  const displayValue = isEditing ? tempInputValue : (currentSelectedDate ? formatDate(currentSelectedDate, locale) : '');

  // ✅ Combinar helperText normal com mensagem de erro
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

  // ✅ Click outside handler
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

  // ✅ Handler unificado para mudança de data - SEMPRE chama onChange
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

  const handleFieldClick = () => {
    if (!disabled) {
      setShowCalendar(true);
    }
  };

  const handleFieldFocus = () => {
    if (!disabled) {
      setShowCalendar(true);
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Permite números e barras da máscara
  const filterNumericInput = (inputValue: string): string => {
    // Permite apenas números e barras (para manter a máscara)
    return inputValue.replace(/[^\d/]/g, '');
  };

  // ✅ Handler para prevenir teclas não numéricas
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey, metaKey } = event;

    // ✅ NOVA FUNCIONALIDADE: Enter fecha calendário se data válida
    if (key === 'Enter') {
      if (showCalendar) {
        // Se há uma data válida selecionada, fechar calendário
        if (currentSelectedDate) {
          setShowCalendar(false);
          event.preventDefault();
          return;
        }
        // Se a data digitada está completa e válida, processar e fechar
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
        // Se calendário está fechado, Enter abre o calendário
        setShowCalendar(true);
        event.preventDefault();
        return;
      }
    }

    // ✅ Escape sempre fecha o calendário
    if (key === 'Escape') {
      if (showCalendar) {
        setShowCalendar(false);
        event.preventDefault();
        return;
      }
    }

    // Permite teclas de controle (Backspace, Delete, Tab, etc.)
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'Home', 'End'
    ];

    // Permite Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X (atalhos de teclado)
    const isCtrlCommand = ctrlKey || metaKey;
    const allowedCtrlKeys = ['a', 'c', 'v', 'x'];

    // Se é uma tecla de controle ou atalho permitido, deixa passar
    if (controlKeys.includes(key) || (isCtrlCommand && allowedCtrlKeys.includes(key.toLowerCase()))) {
      return;
    }

    // Se não é um número (0-9), previne a entrada
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  };

  const handleDaySelect = (newSelectedDate: Date) => {
    setShowCalendar(false);
    handleDateChange(newSelectedDate);
  };

  const handleTextFieldChange = (value: string) => {
    // ✅ Filtra caracteres inválidos, mantendo números e barras
    const filteredValue = filterNumericInput(value);

    // ✅ Remove barras para processar apenas números
    const numbersOnly = filteredValue.replace(/[^\d]/g, '');

    // ✅ Aplica máscara progressiva em tempo real
    const maskedValue = applyDateMask(numbersOnly, locale);

    // ✅ Atualizar valor temporário SEMPRE (máscara em tempo real)
    setTempInputValue(maskedValue);
    setIsEditing(true);

    // ✅ Limpar erro se campo estiver vazio
    if (maskedValue === '') {
      setInternalError('');
      handleDateChange(null);
      setCurrentDate(new Date());
      return;
    }

    // ✅ Validar apenas quando data estiver completa (10 caracteres)
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
      // ✅ Data incompleta - limpar erro mas não validar ainda
      setInternalError('');
      // ✅ Não chamar handleDateChange para data incompleta
    }
  };

  // ✅ Effect para atualizar valor do campo quando data muda
  useEffect(() => {
    if (!isEditing && currentSelectedDate) {
      setTempInputValue(formatDate(currentSelectedDate, locale));
    }
  }, [locale, currentSelectedDate, isEditing]);

  return (
    <div ref={wrapperRef}>
      <div className={clsx('zds-date-picker')}>
        <div
          onClick={handleFieldClick}
          onFocus={handleFieldFocus}
          onKeyDown={handleKeyDown}
          style={{ cursor: 'pointer' }}
        >
          <TextField
            type="tel"
            icon={<Calendar16Regular onClick={handleIconClick} style={{ cursor: 'pointer' }} />}
            onChange={(e: string) => {
              handleTextFieldChange(e);
            }}
            aria-label="Open calendar"
            aria-expanded={showCalendar}
            aria-controls="calendar-popup"
            placeholder={locale === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
            value={displayValue}
            errorMessage={undefined}
            aria-invalid={!!currentError}
            aria-describedby={combinedHelperText ? helperTextId : undefined}
            maxLength={10}
            helper={combinedHelperText ? true : false}
            helperText={combinedHelperText}
            required={required}
            label={label}
          />
        </div>
        <div
          className={clsx(
            'zds-date-picker__calendar-popup',
            calendarPosition === 'left' && 'zds-calendar--left',
            calendarPosition === 'right' && 'zds-calendar--right'
          )}
        >
          {showCalendar && (
            <Calendar
              selectedDate={currentSelectedDate}
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