import React, { useState, useRef, useEffect, useCallback, ReactNode, ReactElement } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import { MoreVertical16Regular } from '@fluentui/react-icons';
import './Menu.scss';

// ✅ Definir interfaces TypeScript
export interface MenuItem {
  /** ID único do item */
  id: string;
  /** Texto principal do item */
  text: string;
  /** Texto secundário opcional */
  subText?: string;
  /** Ícone do item */
  icon?: ReactNode;
  /** Estado desabilitado */
  disabled?: boolean;
  /** Valor customizado do item */
  value?: any;
}

export interface MenuProps {
  /** Elemento React que será usado como âncora do menu */
  children?: ReactElement;
  
  /** Array de itens do menu */
  menuItems?: MenuItem[];
  
  /** Callback executado quando um item do menu é clicado */
  onMenuItemClick?: (item: MenuItem) => void;
  
  /** Callback executado quando o menu é aberto/fechado */
  onToggle?: (isOpen: boolean) => void;
  
  /** Tipo do dropdown */
  type?: 'text' | 'checkbox' | 'icon';
  
  /** Habilita campo de busca */
  applySearch?: boolean;
  
  /** Placeholder do campo de busca */
  placeholder?: string;
  
  /** Controla exibição do subtexto */
  showSubText?: boolean;
  
  /** Controla exibição dos ícones */
  showIcons?: boolean;
  
  /** Classes CSS adicionais */
  className?: string;
  
  /** ID único do componente */
  id?: string;
}

const Menu: React.FC<MenuProps> = ({
  children,
  menuItems = [
    {
      id: 'item-1',
      text: 'Editar usuário',
    },
    {
      id: 'item-2',
      text: 'Visualizar detalhes',
    },
    {
      id: 'item-3',
      text: 'Remover usuário',
    },
  ],
  onMenuItemClick,
  onToggle,
  type = 'text',
  applySearch = false,
  placeholder = '',
  showSubText = false,
  showIcons = false,
  className,
  id,
}) => {
  // ✅ Estados tipados
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  // ✅ Refs tipadas
  const anchorRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Fecha o menu e executa callback de toggle se fornecido
   */
  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    if (onToggle) {
      onToggle(false);
    }
  }, [onToggle]);

  /**
   * Abre o menu e executa callback de toggle se fornecido
   */
  const openMenu = useCallback((): void => {
    setIsMenuOpen(true);
    if (onToggle) {
      onToggle(true);
    }
  }, [onToggle]);

  /**
   * Alterna a visibilidade do dropdown
   */
  const toggleDropdown = useCallback((): void => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuOpen, closeMenu, openMenu]);

  /**
   * Função melhorada para fechar o menu ao clicar fora
   * Verifica se o clique foi fora de todos os elementos do menu
   */
  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      // Verifica se o menu está aberto antes de processar
      if (!isMenuOpen) return;

      const target = event.target as Node;

      // Verifica se o clique foi dentro do container principal do menu
      if (menuContainerRef.current?.contains(target)) {
        return;
      }

      // Verifica se o clique foi no elemento âncora (botão/children)
      if (anchorRef.current?.contains(target)) {
        return;
      }

      // Verifica se o clique foi dentro do dropdown
      if (dropdownRef.current?.contains(target)) {
        return;
      }

      // Se chegou até aqui, o clique foi fora do menu - fecha o menu
      closeMenu();
    },
    [isMenuOpen, closeMenu]
  );

  /**
   * Função para fechar o menu ao pressionar a tecla Escape
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
        // Retorna o foco para o elemento âncora após fechar
        if (anchorRef.current) {
          anchorRef.current.focus();
        }
      }
    },
    [isMenuOpen, closeMenu]
  );

  /**
   * Manipula a seleção de itens do menu
   */
  const handleSelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0 && menuItems.length > 0) {
        const selectedItem = menuItems.find((item) => item.id === selectedIds[0]);
        if (selectedItem && onMenuItemClick) {
          onMenuItemClick(selectedItem);
        }
      }

      // Fecha o menu após seleção apenas para tipos que não são checkbox
      if (type !== 'checkbox') {
        closeMenu();
      }
    },
    [menuItems, onMenuItemClick, type, closeMenu]
  );

  // Effect para adicionar listeners de eventos quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      // Adiciona listener para cliques fora do menu
      document.addEventListener('mousedown', handleClickOutside);
      // Adiciona listener para tecla Escape
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup function para remover os listeners
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen, handleClickOutside, handleKeyDown]);

  /**
   * Renderiza a âncora do menu
   * Se children for fornecido, usa children; caso contrário, usa o botão padrão
   */
  const renderAnchor = (): ReactElement => {
    if (children) {
      return React.cloneElement(children, {
        ref: anchorRef,
        onClick: toggleDropdown,
        'aria-expanded': isMenuOpen,
        'aria-haspopup': 'menu' as const,
      });
    }

    return (
      <Button
        ref={anchorRef}
        variant="text"
        onClick={toggleDropdown}
        icon={<MoreVertical16Regular />}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="Abrir menu de ações"
      />
    );
  };

  return (
    <div 
      ref={menuContainerRef} 
      className={`menu-container ${className || ''}`} 
      id={id}
    >
      {renderAnchor()}
      {isMenuOpen && (
        <div ref={dropdownRef} className="menu-dropdown">
          <Dropdown
            type={type}
            items={menuItems}
            onSelectionChange={handleSelectionChange}
            applySearch={applySearch}
            placeholder={placeholder}
            showSubText={showSubText}
            aria-label="Menu de ações"
          />
        </div>
      )}
    </div>
  );
};

export default Menu;