import React, { useEffect, useState, useCallback, useRef, useMemo, useId } from 'react';
import Dropdown, { DropdownItem, DropdownType } from '../Dropdown/Dropdown';
import './Select.scss';
import { ChevronUp16Regular, ChevronDown16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import SelectField from '../SelectField/SelectField';


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
  showSubText?: boolean;
  /** Aria-label do campo */
  ariaLabel?: string;
  maxWidth?: string;
  minWidth?: string;
  tooltip?: boolean;
  tooltipText?: string;
  positionTooltip?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
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
  ariaLabel,
  showSubText,
  maxWidth = '250px',
  minWidth = '210px',
  tooltip = false,
  tooltipText = 'tooltip',
  positionTooltip = 'top-right'
}) => {
  // Hooks e refs
  const componentId = useId();
  const finalId = id || componentId;
  const selectRef = useRef<HTMLDivElement | null>(null);
  // ✅ REMOVIDO: isUpdatingRef, previousValueRef, textFieldRef (desnecessários)

  // ✅ NOVO: Validação de props em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    // Validar unidades CSS
    if (maxWidth && typeof maxWidth === 'string' && 
        !maxWidth.match(/^\d+(px|%|rem|em|vw|vh)$/)) {
      console.warn('Select: maxWidth deve ter unidade CSS válida (px, %, rem, em, vw, vh)');
    }
    
    if (minWidth && typeof minWidth === 'string' && 
        !minWidth.match(/^\d+(px|%|rem|em|vw|vh)$/)) {
      console.warn('Select: minWidth deve ter unidade CSS válida');
    }
    
    // Validar performance
    if (options.length > 1000) {
      console.warn('Select: Muitas opções (>1000) podem impactar performance. Considere virtualização.');
    }

    // Validar onChange obrigatório
    if (!onChange) {
      console.warn('Select: onChange prop é recomendado para controle de estado.');
    }
  }

  // Estados
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);



  // Lógica de validação para campo obrigatório
  const hasValue = selectedOptions.length > 0;
  const shouldShowRequiredError = required && isTouched && !hasValue && !disabled;

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

  // ✅ SIMPLIFICADO: Handlers de evento sem refs desnecessários
  const handleOptionSelect = useCallback((selectedIds: string[]) => {
    if (disabled) return;

    // Marca como "tocado" quando uma opção for selecionada
    setIsTouched(true);

    const selectedItems = selectedIds.map((id) => {
      let foundOption = validatedOptions.find((option) => option.id === id);
      if (!foundOption && id.startsWith('dropdown-item-')) {
        const index = parseInt(id.replace('dropdown-item-', ''), 10);
        foundOption = validatedOptions[index];
      }
      return foundOption;
    }).filter((option): option is SelectOption => Boolean(option));

    setSelectedOptions(selectedItems);
    onChange?.(selectedItems);

    // Fechar dropdown se não for múltipla seleção
    if (type !== 'checkbox') {
      setIsOpen(false);
    }
  }, [validatedOptions, onChange, type, disabled]);

  // ✅ NOVO: Busca rápida por primeira letra
  const handleQuickSearch = useCallback((char: string) => {
    if (!isOpen || dropdownItems.length === 0) return;
    
    // Buscar a partir do índice atual + 1
    const startIndex = focusedOptionIndex + 1;
    let matchingIndex = dropdownItems.findIndex((item, index) => 
      index >= startIndex && 
      item.text.toLowerCase().startsWith(char) &&
      !item.disabled
    );
    
    // Se não encontrou após o índice atual, buscar do início
    if (matchingIndex === -1) {
      matchingIndex = dropdownItems.findIndex(item => 
        item.text.toLowerCase().startsWith(char) &&
        !item.disabled
      );
    }
    
    if (matchingIndex >= 0) {
      setFocusedOptionIndex(matchingIndex);
    }
  }, [isOpen, focusedOptionIndex, dropdownItems]);

  const handleTriggerClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();

    // Toggle do dropdown independente do estado atual
    setIsOpen(prev => !prev);
  }, [disabled]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (disabled) return;
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    if (selectRef.current && relatedTarget && selectRef.current.contains(relatedTarget)) {
      return; // Não fechar se foco está dentro do select
    }
    setTimeout(() => {
      setIsTouched(true);
      setIsOpen(false);
      setFocusedOptionIndex(-1); // ✅ Reset foco quando blur
    }, 200);
  }, [disabled]);
  // ✅ MELHORADO: Navegação por teclado com foco em opções
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        if (isOpen && focusedOptionIndex >= 0) {
          // Selecionar opção focada
          const optionId = dropdownItems[focusedOptionIndex]?.id;
          if (optionId) {
            handleOptionSelect([optionId]);
          }
        } else {
          setIsOpen(prev => !prev);
          if (!isOpen) {
            setFocusedOptionIndex(0);
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        setIsTouched(true);
        setIsOpen(false);
        setFocusedOptionIndex(-1);
        // ✅ Devolver foco para o trigger
        selectRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedOptionIndex(0);
        } else {
          setFocusedOptionIndex(prev => 
            prev < dropdownItems.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        if (isOpen) {
          setFocusedOptionIndex(prev => 
            prev > 0 ? prev - 1 : dropdownItems.length - 1
          );
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setFocusedOptionIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setFocusedOptionIndex(dropdownItems.length - 1);
        }
        break;
      case 'Tab':
        // ✅ Permitir navegação natural com Tab
        if (isOpen) {
          setIsOpen(false);
          setIsTouched(true);
          setFocusedOptionIndex(-1);
        }
        break;
      default:
        // ✅ Busca por primeira letra (Type-ahead)
        if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
          handleQuickSearch(event.key.toLowerCase());
        }
        break;
    }
  }, [isOpen, disabled, focusedOptionIndex, dropdownItems, handleOptionSelect]);

  // Click outside handler
  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    const target = event.target as Node;

    if (selectRef.current && !selectRef.current.contains(target)) {
      setIsTouched(true);
      setIsOpen(false);
      setFocusedOptionIndex(-1);
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

  // ✅ SIMPLIFICADO: Sincronização com value prop sem refs
  useEffect(() => {
    if (value !== undefined) {
      const valueArray = Array.isArray(value) ? value : [value];
      const newSelectedOptions = valueArray
        .map((val) => validatedOptions.find((option) => option.id === val || option.text === val))
        .filter((option): option is SelectOption => Boolean(option));

      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([]);
    }
  }, [value, validatedOptions]);


  // ✅ OTIMIZADO: Estilos sem duplicação width/maxWidth
  const containerStyles: React.CSSProperties = useMemo(() => {
    const styles: React.CSSProperties = {};

    if (minWidth) {
      styles.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }

    if (maxWidth) {
      const maxWidthValue = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      // ✅ Usar apenas maxWidth para limitar, não width
      styles.maxWidth = maxWidthValue;
    }

    return styles;
  }, [maxWidth, minWidth]);


  // ✅ MELHORADO: Classes CSS com estados visuais
  const selectClasses = clsx(
    'zds-select',
    {
      'zds-select--disabled': disabled,
      'zds-select--error': Boolean(errorMessage) || shouldShowRequiredError,
      'zds-select--focused': isOpen,
      'zds-select--required': required,
      'zds-select--touched': isTouched,
    },
    className
  );

  return (
    <div
      className={selectClasses}
      ref={selectRef}
      id={finalId}
      data-testid="select-container"
      style={containerStyles}
    >
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns={isOpen ? `${finalId}-dropdown` : undefined}
        aria-controls={`${finalId}-dropdown`}
        aria-describedby={helperText ? `${finalId}-helper` : undefined}
        aria-invalid={Boolean(errorMessage)}
        aria-required={required}
        aria-label={ariaLabel || label || placeholder || 'Selecione uma opção'}
        aria-activedescendant={
          isOpen && focusedOptionIndex >= 0 
            ? dropdownItems[focusedOptionIndex]?.id 
            : selectedIds.length > 0 ? selectedIds[0] : undefined
        }
        tabIndex={disabled ? -1 : 0}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleTriggerClick}
        className="zds-select__trigger"
      >
        <SelectField
          name={`select-${finalId}`}
          placeholder={displayText || placeholder}
          value={displayText}
          disabled={disabled}
          helperText={helperText}
          errorMessage={errorMessage}
          icon={isOpen ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
          required={required}
          label={label}
          isTouched={isTouched}
          hasError={shouldShowRequiredError}
          isOpen={isOpen}
          tooltip={tooltip}
          tooltipText={tooltipText}
        />
      </div>
      {isOpen && !disabled && (
        <div className='zds-select__dropdown'>

          <Dropdown
            items={dropdownItems}
            type={type}
            onSelectionChange={handleOptionSelect}
            initialItemsSelected={initialItemsSelected}
            defaultSelectedIds={selectedIds}
            key={`dropdown-${selectedIds.join('-')}`}
            id={`${finalId}-dropdown`}
            showSubText={showSubText}
            maxWidth={maxWidth}
          />
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;