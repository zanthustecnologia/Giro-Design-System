import type { Side, Align, Locale } from '../../types/common.types';
import type { FilterItem as FilterDropdownItem } from '../Filter';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { ReactNode, ReactElement } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right';
    /** Altura máxima do conteúdo da célula (ex: 48, '3rem'). Aplica overflow: hidden */
    maxHeight?: number | string;
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
  locale?: Locale;
  placeholder?: string;
}

export type FilterItem = CheckboxFilterItem | CalendarFilterItem;

export interface TableV2HeaderProps {
  /** Placeholder do campo de busca global */
  searchPlaceholder?: string;
  /** Exibe o campo de busca (padrão: true) */
  showSearch?: boolean;
  /** Items de filtro (Status, Data de início, etc.) */
  filterItems?: FilterItem[];
}

export interface TableV2FooterProps {
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

export interface EmptyStateProps {
  emptyIcon?: ReactNode;
  emptyTitle?: ReactNode;
  emptyText?: ReactNode;
}

export interface BulkAction {
  /** Label do botão de ação */
  label: ReactNode;
  /** Callback ao clicar no botão */
  onClick: () => void;
  /** Desabilita o botão */
  disabled?: boolean;
  /** Variante visual do botão (padrão: 'outlined') */
  variant?: 'filled' | 'outlined' | 'text';
}

export interface TableV2BulkActionsProps<T = Record<string, unknown>> {
  /** Função que retorna o label da barra de ações em massa.
   * Recebe a contagem de itens selecionados e os itens originais.
   * Se não fornecido, exibe "{count} itens selecionados". */
  label?: (count: number, selectedRows: T[]) => ReactNode;
  /** Lista de ações disponíveis quando há itens selecionados */
  actions: BulkAction[];
  /** Callback chamado ao clicar no botão de limpar seleção (X) */
  onClear?: () => void;
}

export interface TableV2Props<T = Record<string, unknown>> extends EmptyStateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  /** Habilita filtros individuais por coluna no <th> */
  enableFilters?: boolean;
  /** Habilita seleção de linhas via checkbox */
  enableRowSelection?: boolean;
  /** Habilita ordenação de colunas ao clicar no cabeçalho */
  enableSorting?: boolean;
  /** Callback chamado quando a seleção de linhas muda */
  onRowSelectionChange?: (selectedRows: T[]) => void;
  /** Configuração das ações em massa exibidas quando há linhas selecionadas */
  bulkActions?: TableV2BulkActionsProps<T>;
  /** Header acima da tabela com busca + filtros */
  header?: TableV2HeaderProps;
  /** Footer com paginação */
  footer?: TableV2FooterProps;
  /** Classe CSS personalizada para o componente */
  className?: string;
  /** Estado de carregamento — exibe skeleton animado no lugar da tabela */
  loading?: boolean;
  /** Eventos e classe aplicados por linha */
  onRow?: (row: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
}

