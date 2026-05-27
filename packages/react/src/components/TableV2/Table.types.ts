import type { Side, Align, Locale } from '../../types/common.types';
import type { FilterItem as FilterDropdownItem } from '../Filter';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { ReactNode, ReactElement } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Alinhamento do conteúdo da célula */
    align?: 'left' | 'center' | 'right';
    /** Altura máxima do conteúdo da célula (ex: 48, '3rem'). Aplica overflow: hidden */
    maxHeight?: number | string;
  }
}

/**
 * Props base compartilhadas por todos os tipos de filtro da tabela.
 */
interface BaseFilterItem {
  /** Identificador único do filtro */
  id?: string;
  /** Texto ou nó exibido no botão que abre o filtro */
  buttonText: string | ReactNode;
  /** Ícone exibido no botão do filtro */
  icon?: ReactElement;
  /** Lado em que o dropdown do filtro será exibido */
  side?: Side;
  /** Alinhamento do dropdown do filtro */
  align?: Exclude<Align, 'center'>;
  /** Desabilita o botão do filtro */
  disabled?: boolean;
  /** Callback chamado quando o estado de abertura do filtro muda */
  onToggle?: (isOpen: boolean) => void;
}

/**
 * Props de filtro do tipo multiple, single ou ícone.
 * Renderiza uma lista de opções selecionáveis.
 */
interface CheckboxFilterItem extends BaseFilterItem {
  /** Tipo do filtro */
  type: 'multiple' | 'single';
  /** Lista de itens disponíveis para seleção */
  items: FilterDropdownItem[];
  /** IDs dos itens atualmente selecionados */
  selectedIds?: string[];
  /** Callback chamado quando a seleção muda */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Placeholder do campo de busca interno do filtro */
  placeholder?: string;
  /** Habilita campo de busca dentro do dropdown */
  enableSearch?: boolean;
}

/**
 * Props de filtro do tipo calendário.
 * Renderiza um seletor de data.
 */
interface CalendarFilterItem extends BaseFilterItem {
  /** Tipo do filtro */
  type: 'calendar';
  /** Data atualmente selecionada */
  selectedDate?: Date | null;
  /** Callback chamado quando uma data é selecionada */
  onDateSelect?: (date: Date) => void;
  /** Callback chamado ao limpar a data selecionada */
  onClear?: () => void;
  /** Data mínima permitida para seleção */
  minDate?: Date;
  /** Data máxima permitida para seleção */
  maxDate?: Date;
  /** Locale utilizado para formatar datas no calendário */
  locale?: Locale;
  /** Placeholder exibido quando nenhuma data está selecionada */
  placeholder?: string;
}

/**
 * Union type representando um item de filtro da tabela.
 * Pode ser do tipo multiple/single/ícone ou calendário.
 */
export type FilterItem = CheckboxFilterItem | CalendarFilterItem;

/**
 * Props do cabeçalho do TableV2, com busca global e filtros.
 */
export interface TableV2HeaderProps {
  /** Placeholder do campo de busca global */
  searchPlaceholder?: string;
  /** Exibe o campo de busca (padrão: true) */
  showSearch?: boolean;
  /** Items de filtro (Status, Data de início, etc.) */
  filterItems?: FilterItem[];
}

/**
 * Props do rodapé do TableV2, com controles de paginação.
 */
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

/**
 * Props para personalização do estado vazio da tabela.
 */
export interface EmptyStateProps {
  /** Ícone exibido no estado vazio */
  emptyIcon?: ReactNode;
  /** Título exibido no estado vazio */
  emptyTitle?: ReactNode;
  /** Texto descritivo exibido no estado vazio */
  emptyText?: ReactNode;
}

/**
 * Definição de uma ação em massa disponível na barra de seleção.
 */
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

/**
 * Props da barra de ações em massa do TableV2.
 * Exibida quando há linhas selecionadas.
 */
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

/**
 * Props do componente TableV2.
 * @example
 * ```tsx
 * <TableV2
 *   columns={columns}
 *   data={data}
 *   enableSorting
 *   enableRowSelection
 *   loading={isLoading}
 * />
 * ```
 */
export interface TableV2Props<T = Record<string, unknown>> extends EmptyStateProps {
  /** Definições das colunas da tabela */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  /** Dados exibidos na tabela */
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

