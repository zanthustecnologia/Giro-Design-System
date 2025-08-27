import React, { useState, useRef, useEffect, useCallback, ReactNode, ReactElement, useMemo } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Menu.scss';
import { clsx } from 'clsx';

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
  value?: unknown;
}

export interface MenuProps {
  /** Elemento React que será usado como âncora do menu (obrigatório) */
  children: ReactElement<any, any>;

  /** Array de itens do menu */
  menuItems?: MenuItem[];

  /** Callback executado quando um item do menu é clicado */
  onMenuItemClick?: (item: MenuItem) => void;

  /** Callback executado quando o menu é aberto/fechado */
  onToggle?: (isOpen: boolean) => void;

  /** Tipo do dropdown */
  type?: 'text' | 'icon';

  /** Habilita campo de busca */
  applySearch?: boolean;

  /** Placeholder do campo de busca */
  placeholder?: string;

  /** Controla exibição do subtexto */
  showSubText?: boolean;

  /** Classes CSS adicionais */
  className?: string;

  /** ID único do componente */
  id?: string;
  maxWidth?: string | number;

  minWidth?: string | number;
}

const Menu: React.FC<MenuProps> = ({
  children,
  menuItems = [],
  onMenuItemClick,
  onToggle,
  type = 'text',
  applySearch = false,
  placeholder = '',
  showSubText = false,
  className,
  id,
  maxWidth = '210px',
  minWidth
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    if (onToggle) {
      onToggle(false);
    }
  }, [onToggle]);


  const openMenu = useCallback((): void => {
    setIsMenuOpen(true);
    if (onToggle) {
      onToggle(true);
    }
  }, [onToggle]);

  const toggleDropdown = useCallback((): void => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuOpen, closeMenu, openMenu]);

  const initialItemsSelected = useMemo(() => {
    const selectedMap: Record<string, boolean> = {};
    selectedItems.forEach((id) => {
      selectedMap[id] = true;
    });
    return selectedMap;
  }, [selectedItems, menuItems])

  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {

      if (!isMenuOpen) return;

      const target = event.target as Node;
      if (menuContainerRef.current?.contains(target)) {
        return;
      }
      if (anchorRef.current?.contains(target)) {
        return;
      }

      if (dropdownRef.current?.contains(target)) {
        return;
      }
      closeMenu();
    },
    [isMenuOpen, closeMenu]
  );



  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (!isMenuOpen) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          closeMenu();
          if (anchorRef.current) {
            anchorRef.current.focus();
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          setFocusedItemIndex(prev => {
            const nextIndex = prev < menuItems.length - 1 ? prev + 1 : 0;
            return nextIndex;
          });
          break;

        case 'ArrowUp':
          event.preventDefault();
          setFocusedItemIndex(prev => {
            const nextIndex = prev > 0 ? prev - 1 : menuItems.length - 1;
            return nextIndex;
          });
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedItemIndex >= 0 && focusedItemIndex < menuItems.length) {
            const selectedItem = menuItems[focusedItemIndex];
            if (selectedItem && !selectedItem.disabled && onMenuItemClick) {
              onMenuItemClick(selectedItem);
            }
          }
          break;

        case 'Home':
          event.preventDefault();
          setFocusedItemIndex(0);
          break;

        case 'End':
          event.preventDefault();
          setFocusedItemIndex(menuItems.length - 1);
          break;
      }
    },
    [isMenuOpen, closeMenu, focusedItemIndex, menuItems, onMenuItemClick, type]
  );
  useEffect(() => {
    if (!isMenuOpen) {
      setFocusedItemIndex(-1);
    }
  }, [isMenuOpen]);

  const handleSelectionChange = useCallback(
    (selectedIds: string[]): void => {
      if (selectedIds.length > 0 && menuItems.length > 0 && onMenuItemClick) {
        const lastSelectedId = selectedIds[selectedIds.length - 1];
        const selectedItem = menuItems.find((item) => item.id === lastSelectedId);

        if (selectedItem) {
          onMenuItemClick(selectedItem);
          closeMenu();
        }
      }
      setSelectedItems(selectedIds);
    },
    [menuItems, onMenuItemClick, closeMenu]
  );



  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen, handleClickOutside, handleKeyDown]);


  const renderAnchor = (): ReactElement => {
    const dropdownId = `${id || 'menu'}-dropdown`;
    return React.cloneElement(children, {
      ref: anchorRef,
      onClick: (e: React.MouseEvent) => {
        if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
          return;
        }
        if (children.props.onClick) {
          children.props.onClick(e);
        }
        toggleDropdown();
      },
      'aria-expanded': isMenuOpen ? 'true' : 'false',
      'aria-haspopup': 'menu',
      'aria-controls': isMenuOpen ? dropdownId: undefined
    });
  };

  const menuClass = clsx(
    'zds-menu__container',
    className
  )
  const dropdownClass = clsx(
    'zds-menu__dropdown',
  );
  return (
    <div
      ref={menuContainerRef}
      className={menuClass}
      id={id}
    >
      {renderAnchor()}
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          className={dropdownClass}
          role="menu"
          aria-label="Menu de ações"
          id={`${id || 'menu'}-dropdown`}
        >
          <Dropdown
            type={type}
            items={menuItems}
            onSelectionChange={handleSelectionChange}
            initialItemsSelected={initialItemsSelected}
            applySearch={applySearch}
            placeholder={placeholder}
            showSubText={showSubText}
            aria-label="Menu de ações"
            minWidth={minWidth}
            maxWidth={maxWidth}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;