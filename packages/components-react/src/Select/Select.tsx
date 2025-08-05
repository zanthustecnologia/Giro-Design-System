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
  /** Tipo do dropdown (single ou multiple) */
  type?: DropdownType;
  /** Label do campo */
  label?: string;
  /** Texto de ajuda */
  helperText?: string;
  /** Mensagem de erro */
  errorMessage?: string;
  /** Campo obrigatório */
  required?: boolean;
  /** Campo desabilitado */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Texto para acessibilidade */
  ariaLabel?: string;
}

/**
 * Componente Select do Zanthus Design System
 * 
 * @description Select customizado com suporte a variantes visuais (outlined, filled, standard),
 * opções múltiplas, validação de dados e acessibilidade WCAG 2.1 AA.
 * 
 * @features
 * - Variantes visuais consistentes com o design system
 * - Validação robusta de opções
 * - Suporte a teclado e screen readers
 * - Performance otimizada com React.memo
 * - Gerenciamento de estado eficiente
 */
const Select = React.memo<SelectProps>(({
  id,
  options = [],
  value,
  onChange,
  placeholder = 'Selecione',
  type = 'text',
  label,
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  className,
  ariaLabel
}) => {
  // Hooks e refs
  const componentId = useId();
  const finalId = id || componentId;
  const isUpdatingRef = useRef<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const previousValueRef = useRef<string | string[] | undefined>(value);
  
  // Estados
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  // Validação e normalização das opções
  const validatedOptions = useMemo(() => {
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

      if (!option.text || typeof option.text !== 'string' || option.text.trim().length === 0) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Select: opção ${index} sem text válido:`, option);
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

  // Conversão para itens do Dropdown
  const dropdownItems: DropdownItem[] = useMemo(() => {
    return validatedOptions.map((option, index) => ({
      id: option.id || `dropdown-item-${index}`,
      text: option.text,
      subText: option.subText,
      icon: option.icon,
      disabled: option.disabled || disabled
    }));
  }, [validatedOptions, disabled]);

  // Texto de exibição das opções selecionadas
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) return '';
    return selectedOptions
      .map((item) => item.text || 'Item sem nome')
      .join(', ');
  }, [selectedOptions]);

  // IDs das opções selecionadas para o Dropdown
  const selectedIds = useMemo(() => {
    return selectedOptions.map((selectedItem) => {
      const optionIndex = validatedOptions.findIndex((option) => {
        return option.id === selectedItem.id ||
          option.text === selectedItem.text ||
          option === selectedItem;
      });

      return optionIndex !== -1
        ? (validatedOptions[optionIndex].id || `dropdown-item-${optionIndex}`)
        : null;
    }).filter((id): id is string => Boolean(id));
  }, [selectedOptions, validatedOptions]);

  // Mapa inicial de seleção para o Dropdown
  const initialItemsSelected = useMemo(() => {
    const selectedMap: Record<string, boolean> = {};
    selectedIds.forEach((id) => {
      selectedMap[id] = true;
    });
    return selectedMap;
  }, [selectedIds]);

  // Handlers de evento
  const handleOptionSelect = useCallback((selectedIds: string[]) => {
    if (isUpdatingRef.current || disabled) return;
    
    isUpdatingRef.current = true;

    const selectedItems = selectedIds.map((id) => {
      let foundOption = validatedOptions.find((option) => option.id === id);
      if (!foundOption && id.startsWith('dropdown-item-')) {
        const index = parseInt(id.replace('dropdown-item-', ''), 10);
        foundOption = validatedOptions[index];
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
      setIsOpen(false);
    }

    isUpdatingRef.current = false;
  }, [validatedOptions, onChange, type, disabled]);

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    if (selectRef.current && relatedTarget && selectRef.current.contains(relatedTarget)) {
      return;
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [disabled]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const allowedKeys = ['Tab', 'Enter', ' ', 'Escape', 'ArrowDown', 'ArrowUp'];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  }, [isOpen, disabled]);

  // Click outside handler
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Effects
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, handleClickOutside]);

  // Sincronização com value prop
  useEffect(() => {
    if (value !== previousValueRef.current) {
      previousValueRef.current = value;

      if (value !== undefined) {
        const valueArray = Array.isArray(value) ? value : [value];
        const newSelectedOptions = valueArray
          .map((val) => validatedOptions.find((option) => option.id === val || option.text === val))
          .filter((option): option is SelectOption => Boolean(option));

        setSelectedOptions(newSelectedOptions);
      } else {
        setSelectedOptions([]);
      }
    }
  }, [value, validatedOptions]);

  // Classes CSS
  const selectClasses = clsx(
    'zds-select',
    {
      'zds-select--open': isOpen,
      'zds-select--disabled': disabled,
      'zds-select--error': Boolean(errorMessage),
      'zds-select--required': required,
    },
    className
  );

  return (
    <div 
      className={selectClasses} 
      ref={selectRef} 
      id={finalId}
      data-testid="select-container"
    >
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label || placeholder || 'Selecione uma opção'}
        tabIndex={disabled ? -1 : 0}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="zds-select__trigger"
      >
        <TextField
          name={`select-${finalId}`}
          placeholder={displayText || placeholder}
          value={displayText}
          onChange={() => { }}
          readOnly={true}
          disabled={disabled}
          helper={Boolean(helperText)}
          helperText={helperText}
          errorMessage={errorMessage}
          icon={isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
          required={required}
          label={label}
        />
      </div>
      {isOpen && !disabled && (
        <Dropdown
          items={dropdownItems}
          type={type}
          onSelectionChange={handleOptionSelect}
          initialItemsSelected={initialItemsSelected}
          defaultSelectedIds={selectedIds}
          key={`dropdown-${selectedIds.join('-')}`}
          id={`${finalId}-dropdown`}
        />
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;