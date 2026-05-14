import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps, Locale, Side, Align } from '../../types/common.types';

// ─── Combined Filter ──────────────────────────────────────────────────────────

/** Tipos de campo disponíveis no filtro combinado */
export type CombinedFilterFieldType = 'date' | 'select' | 'chips';

/** Opção de um campo select ou chips no filtro combinado */
export interface CombinedFilterOption {
  /** Identificador único da opção */
  id: string;
  /** Texto exibido para o usuário */
  text: string;
}

/** Definição de um campo do filtro combinado */
export interface CombinedFilterField {
  /** Identificador único do campo */
  id: string;
  /** Label exibida acima do campo */
  label: string;
  /** Tipo do campo */
  type: CombinedFilterFieldType;
  /** Opções disponíveis (para campos select e chips) */
  options?: CombinedFilterOption[];
  /** Placeholder do campo (para date e select) */
  placeholder?: string;
  /** Ocupação na grade: 'half' = metade da linha, 'full' = linha completa */
  layout?: 'half' | 'full';
  /** Permite seleção múltipla nos chips (padrão: true) */
  multiSelect?: boolean;
  /** Data mínima selecionável (para tipo date) */
  minDate?: Date;
  /** Data máxima selecionável (para tipo date) */
  maxDate?: Date;
  /** Idioma do campo de data (padrão: 'pt-br') */
  locale?: Locale;
}

/** Mapa de valores dos campos do filtro combinado */
export type CombinedFilterValues = Record<string, Date | null | string | string[]>;

export interface FilterItem {
  id?: string;
  text: string;
  subText?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export type FilterType = 'text' | 'checkbox' | 'icon' | 'calendar';

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
   * - `'combined'`: filtro combinado com painel lateral para múltiplos critérios
   */
  mode?: 'simple' | 'combined';

  // ─── Props exclusivas do modo combined ─────────────────────────────────────

  /** Título do painel lateral (padrão: 'Filtrar') */
  title?: string;

  /** Campos do filtro combinado */
  fields?: CombinedFilterField[];

  /** Valores controlados dos campos no modo combined */
  values?: CombinedFilterValues;

  /** Callback ao aplicar no modo combined: (values) => void */
  onApply?: (values: CombinedFilterValues) => void;

  /** Callback ao limpar no modo combined: () => void */
  onClear?: () => void;
}
