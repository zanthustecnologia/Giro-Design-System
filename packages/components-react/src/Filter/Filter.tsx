import React, { useState, useRef, useEffect, ReactNode, ReactElement, RefObject } from 'react';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import { Filter16Regular, ChevronDown16Regular, ChevronUp16Regular } from '@fluentui/react-icons';
import './Filter.scss';
import clsx from 'clsx';

// ✅ Definir tipos e interfaces TypeScript
export type FilterPosition = 'left' | 'right';
export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type Locale = 'pt-br' | 'en-us';

export interface FilterProps {
  /** Idioma da data */
  locale?: Locale;
  /** Posição do conteúdo do filtro */
  filterPosition?: FilterPosition;
  /** Conteúdo a ser renderizado quando aberto */
  children?: ReactNode;
  /** Texto do botão do filtro */
  buttonText?: string | ReactNode;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Variante do botão */
  variant?: ButtonVariant;
  /** Callback chamado quando o estado do filtro muda */
  onToggle?: (isOpen: boolean) => void;
  /** Callback chamado quando o filtro é aberto */
  onOpen?: () => void;
  /** Callback chamado quando o filtro é fechado */
  onClose?: () => void;
  /** Callback chamado quando o botão recebe foco */
  onButtonFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Referência externa para o botão */
  buttonRef?: RefObject<HTMLSpanElement>;
  /** Classes CSS adicionais */
  className?: string;
  
  // ✅ Gerenciamento interno de itens selecionados
  /** Array de IDs dos itens selecionados (controlado externamente) */
  selectedItems?: string[];
  /** Array inicial de IDs selecionados (não controlado) */
  defaultSelectedItems?: string[];
  /** Callback chamado quando a seleção muda */
  onSelectionChange?: (selectedItems: string[]) => void;
  
  // ✅ Compatibilidade com a API anterior (deprecated)
  /** @deprecated Use selectedItems.length em vez disso */
  selectedCount?: number;
}

const Filter: React.FC<FilterProps> = ({
  locale = 'pt-br',
  filterPosition = 'left',
  children,
  buttonText = 'Filtrar',
  icon,
  variant = 'outlined',
  onToggle,
  onOpen,
  onClose,
  onButtonFocus,
  buttonRef: externalButtonRef,
  className = '',
  
  // ✅ Gerenciamento de itens selecionados
  selectedItems: controlledSelectedItems,
  defaultSelectedItems = [],
  onSelectionChange,
  
  selectedCount,
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const internalButtonRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ Estado interno para itens selecionados (controlled vs uncontrolled)
  const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>(defaultSelectedItems);
  
  // Determina se é controlado externamente ou não
  const isControlled = controlledSelectedItems !== undefined;
  const selectedItems = isControlled ? controlledSelectedItems : internalSelectedItems;

  // ✅ Hook para atualizar itens selecionados
  const updateSelectedItems = (newItems: string[]) => {
    if (!isControlled) {
      setInternalSelectedItems(newItems);
    }
    onSelectionChange?.(newItems);
  };

  // ✅ Calcula a contagem atual (nova API tem prioridade sobre a deprecated)
  const currentSelectedCount = selectedItems.length || selectedCount || 0;

  // ✅ Integração automática com Dropdown - monitora mudanças nos children
  useEffect(() => {
    // Se há children e eles são um Dropdown, podemos integrar automaticamente
    if (React.isValidElement(children) && children.type && 
        (children.type as any).displayName === 'Dropdown') {
      
      // Se o Dropdown tem defaultSelectedIds e não estamos controlados externamente
      if (!isControlled && children.props.defaultSelectedIds) {
        setInternalSelectedItems(children.props.defaultSelectedIds);
      }
    }
  }, [children, isControlled]);

  // Usa a ref externa se fornecida, senão usa a interna
  const buttonRef = externalButtonRef || internalButtonRef;

  /**
   * Fecha o conteúdo ao clicar fora do botão ou do conteúdo
   * Modificado para manter seleções do dropdown quando aplicável
   */
  useEffect(() => {
    if (!showContent) return;

    /**
     * Manipula cliques fora do componente
     * Mantém estado das seleções nos dropdowns
     */
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
      ) {
        setShowContent(false);
        onToggle?.(false);
        onClose?.();
        // Nota: Não limpa as seleções do dropdown aqui para manter o estado
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContent, onToggle, onClose, buttonRef]);

  /**
   * Alterna a visibilidade do conteúdo
   */
  const handleToggleContent = () => {
    const newState = !showContent;
    setShowContent(newState);

    if (onToggle) onToggle(newState);

    // Executa callbacks específicos baseados no estado
    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  /**
   * Fecha o conteúdo programaticamente
   */
  const handleCloseContent = () => {
    setShowContent(false);
    if (onToggle) onToggle(false);
    if (onClose) onClose();
  };

  /**
   * Manipula o foco no botão
   * Executa callback personalizado se fornecido
   */
  const handleButtonFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    onButtonFocus?.(event);
  };

  /**
   * Determina se o filtro tem múltipla seleção baseado no children
   */
  const isMultipleSelection = () => {
    if (React.isValidElement(children) && children.type && 
        (children.type as any).displayName === 'Dropdown') {
      return children.props.type === 'checkbox';
    }
    return false;
  };

  /**
   * Obtém o texto do primeiro item selecionado do Dropdown
   */
  const getFirstSelectedItemText = () => {
    if (!React.isValidElement(children) || !children.type || 
        (children.type as any).displayName !== 'Dropdown') {
      return null;
    }

    const dropdownItems = children.props.items || [];
    const firstSelectedId = selectedItems[0];
    
    if (!firstSelectedId) return null;

    const firstItem = dropdownItems.find((item: any) => item.id === firstSelectedId);
    return firstItem?.text || null;
  };

  /**
   * Gera o texto do botão baseado na seleção
   * Se múltipla seleção: mostra primeiro item + badge com incremento
   * Se única seleção: mostra o item ou texto padrão
   */
  const getButtonText = () => {
    if (!isMultipleSelection() || currentSelectedCount === 0) {
      return buttonText;
    }

    if (currentSelectedCount === 1) {
      const firstItemText = getFirstSelectedItemText();
      return firstItemText || buttonText;
    }

    // Para múltipla seleção com mais de 1 item
    const firstItemText = getFirstSelectedItemText();
    return firstItemText || buttonText;
  };

  /**
   * Calcula o valor a ser exibido no badge
   * Para múltipla seleção: incremento baseado em +X (onde X = total - 1)
   */
  const getBadgeValue = () => {
    if (!isMultipleSelection() || currentSelectedCount <= 1) {
      return 0;
    }
    
    // Badge mostra +X onde X é o número de itens além do primeiro
    return currentSelectedCount - 1;
  };
  
  /**
   * Calcula o texto a ser exibido no badge
   */
  const getBadgeText = () => {
    const value = getBadgeValue();
    const maxValue = 99;

    if (value <= 0) {
      return '';
    }

    // Para incremento, sempre mostra +X
    return `+${value > maxValue ? `${maxValue}+` : value}`;
  };

  /**
   * Determina se deve mostrar o badge
   * Badge só aparece para filtros múltiplos com mais de 1 item selecionado
   */
  const shouldShowBadge = isMultipleSelection() && currentSelectedCount > 1;

  useEffect(() =>{
    console.log('Badge value:', getBadgeValue(), 'Selected count:', currentSelectedCount, 'Show badge:', shouldShowBadge)
  },[getBadgeValue, selectedItems, currentSelectedCount, shouldShowBadge])

  /**
   * Renderiza o conteúdo do botão - Badge como wrapper ou texto padrão
   */
  const renderButtonContent = () => {
    const displayText = getButtonText();
    
    if (shouldShowBadge) {
      const badgeText = getBadgeText();
      return (
        <div className="zds-filter-button-content">
          <span>{displayText}</span>
          <Badge
            type="status"
            value={badgeText}
            aria-label={`${currentSelectedCount} itens selecionados`}
            className="zds-filter-badge"
          />
        </div>
      );
    }
    return displayText;
  };

  /**
   * Determina qual ícone usar baseado no estado e no ícone fornecido
   * @returns {JSX.Element} Ícone a ser exibido
   */
  const getDisplayIcon = () => {
    // Se o ícone padrão for usado (Filter16Regular), mantém o mesmo ícone
    if (React.isValidElement(icon) && icon.type === Filter16Regular) {
      return icon;
    }

    // Para outros ícones, alterna entre ChevronDown e ChevronUp
    if (showContent) {
      return <ChevronUp16Regular />;
    }

    return icon || <ChevronDown16Regular />;
  };

  /**
   * Renderiza os children com props automaticamente injetadas
   */
  const renderChildren = () => {
    if (!React.isValidElement(children)) {
      return children;
    }

    // Props que serão injetadas nos children
    const injectedProps: any = {
      onClose: handleCloseContent,
    };

    // Se o children é um Dropdown, injeta também onSelectionChange
    if (children.type && (children.type as any).displayName === 'Dropdown') {
      injectedProps.onSelectionChange = (selectedIds: string[]) => {
        // Chama o callback original do Dropdown se existir
        if (children.props.onSelectionChange) {
          children.props.onSelectionChange(selectedIds);
        }
        // Atualiza o estado interno do Filter
        updateSelectedItems(selectedIds);
      };

      // Define selectedItems padrão se não estiver definido
      if (!children.props.defaultSelectedIds && !children.props.selectedIds) {
        injectedProps.defaultSelectedIds = selectedItems;
      }
      
      // Se não é controlado externamente, força uso do estado interno
      if (!isControlled) {
        injectedProps.defaultSelectedIds = selectedItems;
        // Remove selectedIds se existir para evitar conflitos
        delete injectedProps.selectedIds;
      }
    }

    return React.cloneElement(children, injectedProps);
  };

  return (
    <div className={clsx('zds-filter', `zds-filter--${filterPosition}`, className, {
      'zds-filter--dropdown-open': showContent,
      'zds-filter--with-badge': shouldShowBadge
    })}>
      <span ref={buttonRef}>
        <Button variant={variant} icon={getDisplayIcon()} iconPosition='right' onClick={handleToggleContent} onFocus={handleButtonFocus}>
          {renderButtonContent()}
        </Button>
      </span>
      {showContent && (
        <div ref={contentRef} className='zds-filter__content'>
          {renderChildren()}
        </div>
      )}
    </div>
  );
};

// ✅ Hook personalizado para gerenciar estado do Filter externamente
export const useFilterState = (initialItems: string[] = []) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialItems);

  const addItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev : [...prev, itemId]
    );
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const clearItems = () => {
    setSelectedItems([]);
  };

  const hasItem = (itemId: string) => {
    return selectedItems.includes(itemId);
  };

  return {
    selectedItems,
    setSelectedItems,
    addItem,
    removeItem,
    toggleItem,
    clearItems,
    hasItem,
    count: selectedItems.length,
  };
};

export default Filter;
