import React from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Representa um item individual do dropdown
 */
export interface DropdownItem {
  /** ID único do item (será gerado automaticamente se não fornecido) */
  id?: string;
  
  /** Texto principal do item */
  text: string;
  
  /** Texto secundário/descrição do item */
  subText?: string;
  
  /** Ícone do item */
  icon?: React.ReactNode;
  
  /** Define se o item está desabilitado */
  disabled?: boolean;
}

/** Tipos de dropdown disponíveis */
export type DropdownType = 'text' | 'checkbox' | 'icon';

/**
 * Props do componente Dropdown
 * @example
 * ```tsx
 * <Dropdown 
 *   items={[
 *     { text: 'Opção 1', icon: <Icon1 /> },
 *     { text: 'Opção 2', icon: <Icon2 /> }
 *   ]}
 *   type="text"
 *   placeholder="Selecione uma opção"
 * />
 * ```
 * @example
 * ```tsx
 * <Dropdown 
 *   items={items}
 *   type="checkbox"
 *   applySearch={true}
 *   onSelectionChange={(ids) => console.log(ids)}
 *   defaultSelectedIds={['1', '2']}
 *   maxHeight="300px"
 * />
 * ```
 */
export interface DropdownProps extends BaseProps {
  /** Força posição do dropdown: 'top' abre para cima, 'bottom' para baixo (detecção automática se não especificado) */
  position?: 'top' | 'bottom';
  
  /** Array de itens para o dropdown */
  items: DropdownItem[];
  
  /** Tipo do dropdown */
  type?: DropdownType;
  
  /** Habilita campo de busca */
  applySearch?: boolean;
  
  /** Placeholder do campo de busca */
  placeholder?: string;
  
  /** Callback executado quando a seleção muda: (selectedIds) => void */
  onSelectionChange?: (selectedIds: string[]) => void;
  
  /** Controla exibição do subtexto dos itens */
  showSubText?: boolean;
  
  /** IDs dos itens selecionados por padrão */
  defaultSelectedIds?: string[];
  
  /** Estado inicial dos itens selecionados (objeto chave-valor) */
  initialItemsSelected?: Record<string, boolean>;
  
  /** Largura do dropdown */
  width?: string | number;
  
  /** Largura máxima do dropdown */
  maxWidth?: string | number;
  
  /** Largura mínima do dropdown */
  minWidth?: string | number;
  
  /** Altura máxima do dropdown */
  maxHeight?: string | number;
  
  /** Define se o componente está sendo usado para filtro */
  filter?: boolean;
  
  /** Configurações para paginação infinita */
  infiniteScroll?: {
    /** Status atual do carregamento */
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    /** Página atual */
    page: number;
    /** Última página disponível */
    lastPage: number;
    /** Callback executado para carregar próxima página: () => void */
    onLoadMore: () => void;
    /** Threshold para trigger do scroll infinito (0-1) */
    threshold?: number;
    /** Margem para trigger do scroll infinito */
    rootMargin?: string;
    /** Modo de debug */
    debug?: boolean;
  };
}
