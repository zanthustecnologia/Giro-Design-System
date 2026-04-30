import type { Side, Align } from '../../types/common.types';
import type { FilterItem as FilterDropdownItem } from '../Filter';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { ReactNode, ReactElement } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right';
  }
}

interface BaseFilterItem {
  id?: string;
  buttonText: string | ReactNode;
  icon?: ReactElement;
  side?: Side;
  align?: Exclude<Align, 'center'>;
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

interface CheckboxFilterItem extends BaseFilterItem {
  type: 'checkbox' | 'text' | 'icon';
  items: FilterDropdownItem[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  placeholder?: string;
  enableSearch?: boolean;
}

interface CalendarFilterItem extends BaseFilterItem {
  type: 'calendar';
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  placeholder?: string;
}

export type FilterItem = CheckboxFilterItem | CalendarFilterItem;

export interface Table2HeaderProps {
  /** Placeholder do campo de busca global */
  searchPlaceholder?: string;
  /** Exibe o campo de busca (padrão: true) */
  showSearch?: boolean;
  /** Items de filtro (Status, Data de início, etc.) */
  filterItems?: FilterItem[];
}

export interface Table2FooterProps {
  /** Total de itens (para calcular número de páginas) */
  totalItems: number;
  /** Itens por página inicial (padrão: 10) */
  defaultPageSize?: number;
  /** Opções do seletor de itens por página */
  pageSizeOptions?: number[];
  /** Callback chamado quando a página muda */
  onPageChange?: (page: number) => void;
  /** Callback chamado quando o tamanho da página muda */
  onPageSizeChange?: (pageSize: number) => void;
}

export interface Table2Props<T = Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  /** Habilita filtros individuais por coluna no <th> */
  enableFilters?: boolean;
  /** Habilita seleção de linhas via checkbox */
  enableRowSelection?: boolean;
  /** Callback chamado quando a seleção de linhas muda */
  onRowSelectionChange?: (selectedRows: T[]) => void;
  /** Header acima da tabela com busca + filtros */
  header?: Table2HeaderProps;
  /** Footer com paginação */
  footer?: Table2FooterProps;
  /** Classe CSS personalizada para o componente */
  className?: string;
  /** Estado de carregamento — exibe skeleton animado no lugar da tabela */
  loading?: boolean;
  /** Configurações de localização */
  locale?: {
    /** Componente/texto exibido quando não há dados */
    emptyText?: ReactNode;
  };
  /** Eventos e classe aplicados por linha */
  onRow?: (row: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
}

