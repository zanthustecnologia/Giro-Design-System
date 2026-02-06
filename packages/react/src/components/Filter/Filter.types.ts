import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps, Locale, Position } from '../../types/common.types';
import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';

/**
 * Props do componente Filter
 * @example
 * ```tsx
 * <Filter 
 *   items={filterItems}
 *   type="checkbox"
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
export interface FilterProps {
  /** Array de itens para filtros do tipo dropdown */
  items?: DropdownItem[];
  
  /** Tipo do filtro (dropdown ou calendário) */
  type?: DropdownType | 'calendar';
  
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
  
  /** Posição do dropdown em relação ao botão */
  position?: Position;
  
  /** Estado desabilitado do filtro */
  disabled?: BaseProps['disabled'];
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
  
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
  
  /** Locale do calendário */
  locale?: Locale;
}
