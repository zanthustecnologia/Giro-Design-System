import React, { useEffect, useState, useCallback, useRef, useMemo, useId } from 'react';
import TextField from '../TextField/TextField';
import Dropdown, { DropdownItem, DropdownType } from '../Dropdown/Dropdown';
import './Select.scss';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';

/**
 * Interface para definir uma opção do Select
 */
export interface SelectOption {
  /** ID único da opção (opcional, será gerado automaticamente se não fornecido) */
  id?: string;
  /** Texto principal da opção */
  text: string;
  /** Texto secundário/descrição da opção */
  subText?: string;
  /** Ícone da opção (React node) */
  icon?: React.ReactNode;
  /** Define se a opção está desabilitada */
  disabled?: boolean;
}

/**
 * Interface para as propriedades do componente Select
 */
export interface SelectProps {
  /** ID único do componente */
  id?: string;
  /** Array de opções para seleção - obrigatório */
  options: SelectOption[];
  /** Valor(es) selecionado(s) */
  value?: string | string[];
  /** Callback para mudanças na seleção */
  onChange?: (selectedItems: SelectOption[]) => void;
  /** Placeholder do campo */
  placeholder?: string;
  /** Tipo do dropdown */
  type?: DropdownType;
  /** Label do campo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Campo obrigatório */
  required?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Componente Select do Zanthus Design System
 * Utiliza TextField e Dropdown para criar um select customizado
 * Corrigido problema de inconsistência de IDs
 */
const Select: React.FC<SelectProps> = ({
  id = '',
  options = [],
  value,
  onChange,
  placeholder = 'Selecione',
  type = 'text',
  helperText = '',
  errorMessage = '',
  required = false,
  className = '',
  label = ''
}) => {

  const safeOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Select: options deve ser um array, recebido:', typeof options, options);
      }
      return [];
    }

    return options.filter((option, index): option is SelectOption => {

      if (!option || typeof option !== 'object') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Select: opção ${index} é inválida (null/undefined):`, option);
        }
        return false;
      }


      if (!option.text || typeof option.text !== 'string') {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Select: opção ${index} sem text válido:`, option);
        }
        return false;
      }


      if (option.text.trim().length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Select: opção ${index} com text vazio/whitespace:`, option);
        }
        return false;
      }


      if (option.text.length > 200) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Select: opção ${index} com text muito longo (${option.text.length} chars):`, option.text.substring(0, 50) + '...');
        }
        return false;
      }
      return true;
    });
  }, [options]);

  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const itemId = useId() || id;
  const isUpdatingRef = useRef<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOptionSelect = useCallback((selectedIds: string[]) => {
    setTimeout(() => {
      if (isUpdatingRef.current) return;
      isUpdatingRef.current = true;

      const selectedItems = selectedIds.map((id) => {
        let foundOption = safeOptions.find((option) => option.id === id);
        if (!foundOption && id.startsWith('dropdown-item-')) {
          const index = parseInt(id.replace('dropdown-item-', ''), 10);
          foundOption = safeOptions[index];
        }
        return foundOption;
      }).filter((option): option is SelectOption => Boolean(option));

      setSelectedOptions(prevSelected => {
        const hasChanged = selectedItems.length !== prevSelected.length ||
          selectedItems.some((item, index) =>
            item.id !== prevSelected[index]?.id ||
            item.text !== prevSelected[index]?.text
          );

        if (hasChanged) {
          onChange?.(selectedItems);
          return selectedItems;
        }
        return prevSelected;
      });

      if (type !== 'checkbox') {
        setOpenSelect(false);
        inputRef.current?.blur();
      }

      isUpdatingRef.current = false;
    }, 0);
  }, [safeOptions, onChange, type]);

  const handleFocus = () => setOpenSelect(true);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    if (selectRef.current && relatedTarget && selectRef.current.contains(relatedTarget)) {
      return;
    }

    setTimeout(() => {
      setOpenSelect(false);
    }, 150);
  };

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setOpenSelect(false);
    }
  }, []);

  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) return '';
    return selectedOptions
      .map((item) => item.text || 'Item sem nome')
      .join(', ');
  }, [selectedOptions]);

  const generateConsistentId = useCallback((selectedItem: SelectOption): string | null => {
    const optionIndex = safeOptions.findIndex((option) => {
      return option.id === selectedItem.id ||
        option.text === selectedItem.text ||
        option === selectedItem;
    });

    return optionIndex !== -1
      ? (options[optionIndex].id || `dropdown-item-${optionIndex}`)
      : null;
  }, [options]);

  const selectedIds = useMemo(() => {
    return selectedOptions.map((selectedItem) => {
      const optionIndex = options.findIndex((option) => {
        return option.id === selectedItem.id ||
          option.text === selectedItem.text ||
          option === selectedItem;
      });

      return optionIndex !== -1
        ? (options[optionIndex].id || `dropdown-item-${optionIndex}`)
        : null;
    }).filter((id): id is string => Boolean(id));
  }, [selectedOptions, options]);

  const initialItemsSelected = useMemo(() => {
    const selectedMap: Record<string, boolean> = {};
    selectedIds.forEach((id) => {
      selectedMap[id] = true;
    });
    return selectedMap;
  }, [selectedIds]);


  useEffect(() => {
    if (openSelect) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openSelect, handleClickOutside]);

  const previousValueRef = useRef<string | string[] | undefined>();
  const previousOptionsLengthRef = useRef<number>(0);

  useEffect(() => {
    const valueChanged = value !== previousValueRef.current;
    const optionsChanged = options.length !== previousOptionsLengthRef.current;

    if (value !== undefined && (valueChanged || optionsChanged)) {
      previousValueRef.current = value;
      previousOptionsLengthRef.current = options.length;

      const valueArray = Array.isArray(value) ? value : [value];
      const newSelectedOptions = valueArray
        .map((val) => options.find((option) => option.id === val || option.text === val))
        .filter((option): option is SelectOption => Boolean(option));

      setSelectedOptions(newSelectedOptions);
    }
  }, [value, options]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Tab', 'Enter', ' ', 'Escape', 'ArrowDown', 'ArrowUp'];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setOpenSelect(!openSelect);
        break;
      case 'Escape':
        event.preventDefault();
        setOpenSelect(false);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!openSelect) setOpenSelect(true);
        break;
    }
  }, [openSelect]);

  /**
   * Classes CSS do container
   */
  const selectClass = clsx(
    'zds-select__container',
    {
      [className]: className,
    }
  );
  const dropdownItems: DropdownItem[] = useMemo(() => {
    return options.map((option, index) => ({
      id: option.id || `dropdown-item-${index}`,
      text: option.text,
      subText: option.subText,
      icon: option.icon,
      disabled: option.disabled
    }));
  }, [options]);

  return (
    <div className={selectClass} ref={selectRef} id={itemId}>
      <TextField
        ref={inputRef}
        name={`select-${itemId}`}
        placeholder={displayText || placeholder}
        value={displayText}
        onChange={() => { }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-expanded={openSelect}
        readOnly={true}
        aria-haspopup="listbox"
        helper={Boolean(helperText)}
        helperText={helperText}
        aria-label={placeholder || 'Selecione uma opção'}
        errorMessage={errorMessage}
        icon={openSelect ? <ChevronDown16Regular /> : <ChevronUp16Regular />}
        required={required}
        className={className}
        label={label}
      />
      {openSelect && (
        <Dropdown
          items={dropdownItems}
          type={type}
          onSelectionChange={handleOptionSelect}
          initialItemsSelected={initialItemsSelected}
          defaultSelectedIds={selectedIds}
          key={`dropdown-${selectedIds.join('-')}`}
          id={`${itemId}-dropdown`}
        />
      )}
    </div>
  );
};

// Memorized component para performance
export default Select;