import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps, Locale, Side, Align } from '../../types/common.types';

export interface FilterItem {
  id?: string;
  text: string;
  subText?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export type FilterType = 'single' | 'multiple' | 'icon' | 'calendar';

/**
 * Props do componente Filter
 * @example
 * ```tsx
 * <Filter 
 *   items={filterItems}
 *   type="multiple"
 *   placeholder="Filtrar por categoria"
 *   onApplyFilter={(ids) => handleFilter(ids)}
 *   buttonText="Filtros"
 * />
 * ```
 * @example
 * ```tsx
 * <Filter 
 *   type="calendar"
 *   selectedDate={selectedDate}
 *   onDateSelect={handleDateSelect}
 *   minDate={new Date('2024-01-01')}
 *   locale="pt-br"
 *   icon={<CalendarIcon />}
 * />
 * ```
 */
export interface FilterProps extends BaseProps {
  /** Array de itens para filtros do tipo dropdown */
  items?: FilterItem[];
  
  /** Tipo do filtro (dropdown ou calendário) */
  type?: FilterType;
  
  /** IDs dos itens selecionados */
  selectedIds?: string[];
  
  /** Callback executado ao aplicar filtro: (selectedIds) => void */
  onApplyFilter?: (selectedIds: string[]) => void;
  
  /** Placeholder do campo de busca */
  placeholder?: string;
  
  /** Habilita campo de busca no dropdown */
  enableSearch?: boolean;
  
  /** Texto ou conteúdo do botão de filtro */
  buttonText?: string | ReactNode;
  
  /** Ícone do botão de filtro */
  icon?: ReactElement;
  
  /** Variante visual do botão */
  variant?: Variant;
  
  /** Callback executado ao abrir o filtro: () => void */
  onOpen?: () => void;
  
  /** Callback executado ao fechar o filtro: () => void */
  onClose?: () => void;
  
  /** Posição do popover em relação ao botão */
  side?: Side;

  /** Alinhamento do popover em relação ao botão */
  align?: Exclude<Align, 'center'>;
  
  /** Data selecionada (para tipo calendar) */
  selectedDate?: Date | null;
  
  /** Callback executado ao selecionar data: (date) => void */
  onDateSelect?: (date: Date) => void;
  
  /** Callback executado ao limpar data: () => void */
  onClearDate?: () => void;
  
  /** Data mínima selecionável (para tipo calendar) */
  minDate?: Date;
  
  /** Data máxima selecionável (para tipo calendar) */
  maxDate?: Date;
  
  /** Idioma do calendário */
  locale?: Locale;

  /** Classe CSS opcional */
  className?: string;

  /**
   * Modo de exibição do filtro
   * - `'simple'`: filtro simples com popover (padrão)
   * - `'combined'`: filtro combinado com painel lateral onde o conteúdo é composto via children
   */
  mode?: 'simple' | 'combined';

  // ─── Props exclusivas do modo combined ─────────────────────────────────────

  /** Largura do painel lateral no modo combined (ex: '400px', '50vw'). Quando omitido, usa o tamanho padrão do Drawer */
  drawerWidth?: string;

  /** Título do painel lateral (padrão: 'Filtrar') */
  title?: string;

  /** Número de filtros ativos exibido como badge no botão */
  activeCount?: number;

  /** Conteúdo do painel lateral no modo combined */
  children?: ReactNode;

  /** Callback ao aplicar no modo combined: () => void */
  onApply?: () => void;

  /** Callback ao limpar no modo combined: () => void */
  onClear?: () => void;
}
