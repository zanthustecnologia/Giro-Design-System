import type { Side, Align, Locale, Variant } from '../../types/common.types';
import type { FilterItem as FilterDropdownItem } from '../Filter';
import type { VirtualKeyboardType } from '../VirtualKeyboard/VirtualKeyboard.types';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { ReactNode, ReactElement } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Alinhamento do conteúdo da célula */
    align?: 'left' | 'center' | 'right';
    /** Altura máxima do conteúdo da célula (padrão: 64px). Aplica overflow: hidden */
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
 * Props de filtro do tipo combined.
 * Abre um painel lateral (Drawer) com conteúdo composto via children.
 */
interface CombinedFilterItem extends BaseFilterItem {
  /** Tipo do filtro */
  type: 'combined';
  /** Título do painel lateral (padrão: 'Filtrar') */
  title?: string;
  /** Largura do painel lateral (ex: '400px', '50vw') */
  drawerWidth?: string;
  /** Número de filtros ativos exibido como badge no botão */
  activeCount?: number;
  /** Conteúdo customizado no cabeçalho do Drawer */
  drawerHeaderContent?: ReactNode;
  /** Conteúdo do painel lateral */
  children?: ReactNode;
  /** Callback ao clicar em Aplicar */
  onApply?: () => void;
  /** Callback ao clicar em Limpar */
  onClear?: () => void;
  /** Variante visual do botão (padrão: 'outlined') */
  variant?: Variant;
}

/**
 * Union type representando um item de filtro da tabela.
 * Pode ser do tipo multiple/single, calendário ou combined (Drawer).
 */
export type FilterItem = CheckboxFilterItem | CalendarFilterItem | CombinedFilterItem;

/**
 * Props do cabeçalho do TableV2, com busca global e filtros.
 */
export interface TableV2HeaderProps {
  /** Placeholder do campo de busca global */
  searchPlaceholder?: string;
  /** Items de filtro (Status, Data de início, etc.) */
  filterItems?: FilterItem[];
  /** Habilita o teclado virtual */
  virtualKeyboard?: VirtualKeyboardType;
  /** Modo de busca: 'instant' chama onSearchChange a cada tecla; 'on-enter' chama apenas ao pressionar Enter (padrão) */
  searchMode?: 'instant' | 'on-enter';
  /**
   * Valor controlado do campo de busca.
   * Permite que o pai redefina o texto exibido no campo (ex: ao limpar filtros).
   */
  searchValue?: string;
  /**
   * Callback chamado quando o valor da busca é confirmado.
   * A presença deste callback é o que exibe o campo de busca —
   * quando não fornecido, o campo de busca não é renderizado.
   * A paginação é automaticamente resetada para a página 1 ao buscar.
   */
  onSearchChange?: (value: string) => void;
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
  /**
   * Página atual (1-based) para controle externo da paginação.
   * Quando fornecido, sincroniza o estado interno com este valor,
   * permitindo que o pai redefina a página — por exemplo, ao aplicar
   * um filtro externo que deva redefinir para a página 1.
   * Funciona tanto no modo client-side quanto no modo `manualPagination`.
   */
  currentPage?: number;
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
 * Props de configuração de seleção de linhas do TableV2.
 */
export interface TableV2RowSelectionProps<T = Record<string, unknown>> {
  /**
   * Keys das linhas selecionadas (modo controlado).
   * Quando fornecido, o componente não gerencia o estado de seleção internamente —
   * o pai é responsável por atualizar este array via `onRowChange`.
   */
  selectedRowKeys?: (string | number)[];
  /**
   * Desabilita a seleção de uma linha específica.
   * Pode ser um booleano global ou uma função chamada por linha.
   */
  disabled?: boolean | ((row: T, index: number) => boolean);
  /** Callback chamado quando a seleção de linhas muda.
   * Recebe os dados das linhas selecionadas e suas keys (índices). */
  onRowChange?: (selectedRows: T[], selectedKeys: (string | number)[]) => void;
  /** Desabilita o checkbox "selecionar todos" */
  disableSelectAll?: boolean;
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
 *   rowSelection={{ onRowChange: (rows, keys) => console.log(rows, keys) }}
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
  /**
   * Configuração de seleção de linhas via checkbox.
   * A presença deste objeto habilita a seleção. Use `disabled` para controlar
   * linhas específicas e `onRowChange` para reagir às mudanças.
   * @example
   * ```tsx
   * rowSelection={{
   *   disabled: (row) => row.status !== 'pronto_para_fechar',
   *   onRowChange: (rows, keys) => handleRowChange(rows, keys),
   * }}
   * ```
   */
  rowSelection?: TableV2RowSelectionProps<T>;
  /** Habilita ordenação de colunas ao clicar no cabeçalho */
  enableSorting?: boolean;
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

