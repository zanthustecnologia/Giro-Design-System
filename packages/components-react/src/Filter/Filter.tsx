// Filter.tsx
import React, { useState, useRef, useEffect, ReactNode, ReactElement } from 'react';
import Button from '../Button';
import Dropdown, { DropdownItem, DropdownType } from '../Dropdown/Dropdown';
import './Filter.scss';

// ✅ Definir as variantes de botão disponíveis
type FilterButtonVariant = 'filled' | 'outlined' | 'text';

export interface FilterProps {
  /** Items para o dropdown (quando não usar children customizado) */
  items?: DropdownItem[];
  /** Tipo do dropdown */
  type?: DropdownType;
  /** IDs selecionados */
  selectedIds?: string[];
  /** Callback quando seleção muda */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Placeholder do dropdown */
  placeholder?: string;
  /** Habilita busca no dropdown */
  enableSearch?: boolean;
  /** Conteúdo customizado (sobrescreve o dropdown padrão) */
  children?: ReactNode;
  /** Texto do botão do filtro */
  buttonText?: string | ReactNode;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Variante do botão */
  variant?: FilterButtonVariant;
  /** Callback chamado quando o estado do filtro muda */
  onToggle?: (isOpen: boolean) => void;
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
}

const Filter: React.FC<FilterProps> = ({
  items = [],
  type = 'checkbox',
  selectedIds = [],
  onSelectionChange,
  placeholder = 'Selecionar...',
  enableSearch = false,
  children,
  buttonText = 'Filter',
  icon,
  variant = 'outlined',
  onToggle,
  onOpen,
  onClose,
  position = 'left',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedIds);
  const filterRef = useRef<HTMLDivElement>(null);

  // Sincronizar com prop externa
  useEffect(() => {
    setInternalSelectedIds(selectedIds);
  }, [selectedIds]);

  // Handler para mudança de seleção
  const handleSelectionChange = (newSelectedIds: string[]) => {
    setInternalSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Call appropriate callbacks
    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
    
    onToggle?.(newState);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          onClose?.();
          onToggle?.(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, onToggle]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
        onToggle?.(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, onToggle]);

  return (
    <div className="filter-container" ref={filterRef}>
      <Button
        className={`filter-button filter-button--${variant} ${isOpen ? 'filter-button--open' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="true"
        variant={variant}
      >
        {icon && <span className="filter-icon">{icon}</span>}
        <span className="filter-text">{buttonText}</span>
        <span className={`filter-arrow ${isOpen ? 'filter-arrow--up' : 'filter-arrow--down'}`}>
          ▼
        </span>
      </Button>
      
      {isOpen && (
        <div className={`filter-dropdown filter-dropdown--${position}`}>''
            <Dropdown
              items={items}
              type={type}
              placeholder={placeholder}
              defaultSelectedIds={internalSelectedIds}
              onSelectionChange={handleSelectionChange}
                applySearch={enableSearch}
                showSubText={true}
              />   
        </div>
      )}
    </div>
  );
};

export default Filter;