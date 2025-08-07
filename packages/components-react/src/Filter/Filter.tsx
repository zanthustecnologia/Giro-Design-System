// Filter.tsx
import React, { useState, useRef, useEffect, ReactNode, ReactElement } from 'react';
import Button from '../Button';

// ✅ Definir as variantes de botão disponíveis
type FilterButtonVariant = 'filled' | 'outlined' | 'text';

export interface FilterProps {
  /** Conteúdo a ser renderizado quando aberto */
  children?: ReactNode;
  /** Texto da variante de filtro que assume o valor escolhido */
  buttonText?: string | ReactNode;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Variante do botão */
  variant?: FilterButtonVariant; // ✅ Usar o tipo correto
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
  className?: string;
}

const Filter: React.FC<FilterProps> = ({
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
  const filterRef = useRef<HTMLDivElement>(null);

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
        <div className={`filter-dropdown filter-dropdown--${position}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Filter;