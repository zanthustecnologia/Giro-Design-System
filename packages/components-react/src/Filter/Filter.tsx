// Filter.tsx
import React, { useState, useRef, useEffect, ReactNode, ReactElement, useCallback } from 'react';
import Button from '../Button';
import Dropdown, { DropdownItem, DropdownType } from '../Dropdown/Dropdown';
import Calendar from '../Calendar/Calendar';
import './Filter.scss';
import Badge from '../Badge';
import { ChevronDownRegular, CalendarRegular } from '@fluentui/react-icons/fonts';
import clsx from 'clsx';
// ✅ Definir as variantes de botão disponíveis
type FilterButtonVariant = 'filled' | 'outlined' | 'text';

export interface FilterProps {
  /** Items para o dropdown */
  items?: DropdownItem[];
  /** Tipo do dropdown */
  type?: DropdownType | 'calendar';
  /** IDs selecionados */
  selectedIds?: string[];
  /** Callback quando aplicar filtros */
  onApplyFilter?: (selectedIds: string[]) => void;
  /** Placeholder do dropdown */
  placeholder?: string;
  /** Habilita busca no dropdown */
  enableSearch?: boolean;
  /** Texto do botão do filtro */
  buttonText?: string | ReactNode;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Variante do botão */
  variant?: FilterButtonVariant;
  /** Callback chamado quando o filtro é aberto */
  onOpen?: () => void;
  /** Callback chamado quando o filtro é fechado */
  onClose?: () => void;
  /** Posição do dropdown */
  position?: 'left' | 'right';
  /** Se o filtro está desabilitado */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;

  // ✅ Props específicas para Calendar
  /** Data selecionada (quando type='calendar') */
  selectedDate?: Date | null;
  /** Callback quando data é selecionada */
  onDateSelect?: (date: Date) => void;
  /** Data mínima permitida */
  minDate?: Date;
  /** Data máxima permitida */
  maxDate?: Date;
  /** Locale do calendar */
  locale?: 'pt-br' | 'en-us';
}
// ✅ CORREÇÃO: Problema de loop infinito no useEffect
const Filter: React.FC<FilterProps> = ({
  items = [],
  type = 'checkbox',
  selectedIds = [],
  onApplyFilter,
  placeholder = 'Selecionar...',
  enableSearch = false,
  buttonText = 'Filter',
  icon,
  variant = 'outlined',
  onOpen,
  onClose,
  position = 'left',
  disabled = false,
  className = '',
  // ✅ Props específicas para Calendar
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  locale = 'pt-br'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());
  const filterRef = useRef<HTMLDivElement>(null);

  // ✅ FUNÇÃO ATUALIZADA: Gerar texto dinâmico baseado no tipo
  const getButtonText = useCallback(() => {
    // Para filtros de calendar
    if (type === 'calendar') {
      if (selectedDate) {
        const formattedDate = selectedDate.toLocaleDateString(
          locale === 'en-us' ? 'en-US' : 'pt-BR'
        );
        return formattedDate;
      }
      return buttonText; // Texto original quando nada selecionado
    }

    // Para filtros normais
    if (!selectedIds || selectedIds.length === 0) {
      return buttonText; // Texto original quando nada selecionado
    }

    // Encontrar o primeiro item selecionado
    const firstSelectedItem = items?.find(item => item.id === selectedIds[0]);
    const firstItemText = firstSelectedItem?.text || selectedIds[0];

    // Sempre retorna apenas o nome do primeiro filtro
    // O badge vai mostrar a quantidade de filtros adicionais
    return firstItemText;
  }, [type, selectedDate, selectedIds, items, buttonText, locale]);

  // ✅ NOVA FUNÇÃO: Calcular valor do badge (filtros adicionais)
  const getBadgeValue = useCallback(() => {
    if (!selectedIds || selectedIds.length <= 1) {
      return null; // Não mostra badge para 0 ou 1 filtro
    }
    return selectedIds.length - 1; // Quantidade de filtros além do primeiro
  }, [selectedIds]);

  // Handler para abrir/fechar dropdown
  const handleToggle = useCallback(() => {
    if (disabled) return;

    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [disabled, isOpen, onOpen, onClose]);

  // Handler para aplicar filtro
  const handleApplyFilter = useCallback((newSelectedIds: string[]) => {
    onApplyFilter?.(newSelectedIds);
    setIsOpen(false);
    onClose?.();
  }, [onApplyFilter, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          onClose?.();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const filterClass = clsx('zds-filter__container', className);
  const dropdownClass = clsx('zds-filter__dropdown', {
    [`zds-filter__dropdown--${position}`]: position
  });
  return (
    <div ref={filterRef} className={filterClass}>
      <Button
        variant={variant}
        onClick={handleToggle}
        disabled={disabled}
        className="filter-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className='zds-filter-button__content'>
          {icon && <span className="zds-filter-button__icon">{icon}</span>}
          <span className="zds-filter-button__text">{getButtonText()}</span>
          {getBadgeValue() && (
            <Badge value={`+${getBadgeValue()}`} type='status' />
          )}
          <span className={`zds-filter-button__arrow ${isOpen ? 'zds-filter-button__arrow--open' : ''}`}>
            <ChevronDownRegular />
          </span>

        </div>
      </Button>

      {isOpen && (
        <div className={dropdownClass}>
          {type === 'calendar' ? (
            <Calendar
              currentDate={currentCalendarDate}
              selectedDate={selectedDate}
              onDaySelect={onDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
              id={`filter-calendar-${filterRef.current?.id || ''}`}
              aria-label="Selecionar data para filtro"
            />
          ) : (
            <Dropdown
              items={items}
              type={type as DropdownType}
              defaultSelectedIds={selectedIds}
              placeholder={placeholder}
              applySearch={enableSearch}
              filter={true}
              onSelectionChange={handleApplyFilter}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;