import React, { useState, useRef, useEffect, ReactNode, ReactElement } from 'react';
import Button from '../Button/Button';
import { 
  Calendar16Regular, 
  Filter16Regular, 
  ChevronDown16Regular, 
  ChevronUp16Regular 
} from '@fluentui/react-icons';
import './styles.scss';
import clsx from 'clsx';

// ✅ Types para o componente
type FilterPosition = 'left' | 'right';
type ButtonVariant = 'filled' | 'outlined' | 'text';
type Locale = 'pt-br' | 'en-us';

export interface FilterProps {
  /** Idioma da data */
  locale?: Locale;
  /** Posição do conteúdo */
  filterPosition?: FilterPosition;
  /** Conteúdo a ser renderizado quando aberto */
  children?: ReactNode;
  /** Texto da variante de filtro que assume o valor escolhido (calendar por exemplo) */
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
  buttonRef?: React.RefObject<HTMLSpanElement>;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Componente Filter do Zanthus Design System
 * Implementa um botão de filtro com dropdown de conteúdo
 * Segue padrões WCAG 2.1 AA para acessibilidade
 */
const Filter: React.FC<FilterProps> = ({
  filterPosition = 'left',
  children,
  buttonText = 'Filtro',
  icon = <Filter16Regular />,
  variant = 'outlined',
  onToggle,
  onOpen,
  onClose,
  onButtonFocus,
  buttonRef: externalButtonRef,
  className = '',
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const internalButtonRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
     * @param event - Evento de clique
     */
    const handleClickOutside = (event: MouseEvent): void => {
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
   * Remove o foco do botão quando o filtro é aberto
   */
  const handleToggleContent = (): void => {
    const newState = !showContent;
    setShowContent(newState);

    onToggle?.(newState);

    // Executa callbacks específicos baseados no estado
    if (newState) {
      onOpen?.();

      // Remove o foco do botão quando o filtro é aberto
      setTimeout(() => {
        if (buttonRef.current) {
          (buttonRef.current as any).blur?.();
        }
        // Remove foco de qualquer elemento ativo
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }, 0);
    } else {
      onClose?.();
    }
  };

  /**
   * Fecha o conteúdo programaticamente
   */
  const handleCloseContent = (): void => {
    setShowContent(false);
    onToggle?.(false);
    onClose?.();
  };

  /**
   * Manipula o foco no botão
   * Executa callback personalizado se fornecido
   * @param event - Evento de foco
   */
  const handleButtonFocus = (event: React.FocusEvent<HTMLButtonElement>): void => {
    onButtonFocus?.(event);
  };

  /**
   * Determina qual ícone usar baseado no estado e no ícone fornecido
   * @returns Ícone a ser exibido
   */
  const getDisplayIcon = (): ReactElement => {
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

  // ✅ Adicionar props para children com onClose
  const enhancedChildren = React.isValidElement(children) 
    ? React.cloneElement(children, { onClose: handleCloseContent })
    : children;

  return (
    <div 
      className={clsx(
        'zds-filter', 
        `zds-filter--${filterPosition}`, 
        {
          'zds-filter--open': showContent,
        },
        className
      )}
      data-testid="filter"
    >
      <span ref={buttonRef}>
        <Button 
          variant={variant} 
          icon={getDisplayIcon()} 
          iconPosition="right" 
          onClick={handleToggleContent} 
          onFocus={handleButtonFocus}
          aria-expanded={showContent}
          aria-haspopup="true"
          data-testid="filter-button"
        >
          {buttonText}
        </Button>
      </span>
      {showContent && (
        <div 
          ref={contentRef} 
          className="zds-filter__content"
          role="region"
          aria-label="Conteúdo do filtro"
          data-testid="filter-content"
        >
          {enhancedChildren}
        </div>
      )}
    </div>
  );
};

export default Filter;