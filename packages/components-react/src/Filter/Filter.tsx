// Filter.tsx
import React, { useState, useRef, useEffect, ReactNode, ReactElement, useCallback } from 'react';
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
// ✅ CORREÇÃO: Problema de loop infinito no useEffect
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

  // ✅ CORREÇÃO: Sincronizar com prop externa apenas quando selectedIds realmente muda
  useEffect(() => {
    // Comparar arrays para evitar loops desnecessários
    if (JSON.stringify(selectedIds) !== JSON.stringify(internalSelectedIds)) {
      setInternalSelectedIds(selectedIds);
    }
  }, [selectedIds]); // ✅ Remover internalSelectedIds das dependências

  // ✅ CORREÇÃO: Memoizar handler para evitar re-criações
  const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
    setInternalSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  }, [onSelectionChange]);

  // ✅ CORREÇÃO: Handle toggle otimizado
  const handleToggle = useCallback(() => {
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
  }, [disabled, isOpen, onOpen, onClose, onToggle]);

  // ✅ CORREÇÃO: Close on outside click otimizado
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

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]); // ✅ Dependências otimizadas

  // ✅ CORREÇÃO: Close on Escape key otimizado
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
        onToggle?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]); // ✅ Dependências otimizadas

  // ✅ Resto do componente...
  return (
    <div ref={filterRef} className={`filter-container ${className}`}>
      <Button
        variant={variant}
        onClick={handleToggle}
        disabled={disabled}
        className="filter-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {icon && <span className="filter-button__icon">{icon}</span>}
        <span className="filter-button__text">{buttonText}</span>
        <span className={`filter-button__arrow ${isOpen ? 'filter-button__arrow--open' : ''}`}>
          ▼
        </span>
      </Button>

      {isOpen && (
        <div className={`filter-dropdown filter-dropdown--${position}`}>
          {children ? (
            children
          ) : (
            <Dropdown
              items={items}
              type={type}
              defaultSelectedIds={internalSelectedIds} // ✅ Usar estado interno
              onSelectionChange={handleSelectionChange} // ✅ Usar handler memoizado
              placeholder={placeholder}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;