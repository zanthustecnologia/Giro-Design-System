import './Table.scss';
import React, {
  useId,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
} from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Checkbox from '../Checkbox';
import LoaderList from './LoaderList';
import EmptyRows150Color from './EmptyRows150Color';

// Tipos e interfaces
export type TableColumnType = 'info' | 'datetime' | 'custom';
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  label: ReactNode;
  type?: TableColumnType;
  format?: string; // Para tipo datetime
  render?: (row: TableRowData, index?: number) => ReactNode; // Para tipo custom ou renderização personalizada
  align?: TableAlign;
  style?: CSSProperties;
}

export type TableRowData = Record<string, any>;

export interface TableProps {
  /** Define as colunas da tabela */
  columns: TableColumn[];
  /** Array com os dados da tabela */
  data: TableRowData[];
  /** Classe CSS adicional */
  className?: string;
  /** Define o ID do componente */
  id?: string;
  /** Componente de cabeçalho da tabela */
  tableHeader?: ReactNode;
  /** Componente de paginação da tabela */
  tablePagination?: ReactNode;
  /** Componente de loader personalizado a ser renderizado externamente */
  loader?: ReactNode;
  /** Estado de carregamento interno (mostra loader padrão) */
  internalLoader?: boolean;
  /** Exibe coluna de checkbox para seleção de itens */
  showCheckbox?: boolean;
  /** Array de índices dos itens selecionados (para controle externo) */
  selectedItems?: number[];
  /** Callback executado quando a seleção muda */
  onSelectionChange?: (selectedItems: number[]) => void;
  /** Título exibido quando não há dados */
  emptyTitle?: string;
  /** Legenda exibida quando não há dados */
  emptyCaption?: string;
  /** Página atual para controle de limpeza de seleção */
  currentPage?: number;
}

// Interface para o estado de seleção
interface SelectionState {
  selectAll: boolean;
  indeterminate: boolean;
}

// Props do MemoizedCheckbox
interface MemoizedCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  indeterminate?: boolean;
}

/**
 * Componente de checkbox memoizado individualmente para evitar re-renders em cascata
 * Cada checkbox é isolado e só re-renderiza quando seu próprio estado muda
 */
const MemoizedCheckbox: React.FC<MemoizedCheckboxProps> = React.memo(
  ({ checked, onChange, label = '' }) => {
    return <Checkbox label={label} checked={checked} onChange={onChange} />;
  }
);
MemoizedCheckbox.displayName = 'MemoizedCheckbox';

// Retorno do hook useTableSelection
interface UseTableSelectionReturn {
  selectedItems: number[];
  selectedItemsSet: Set<number>;
  selectionState: SelectionState;
  updateSelection: (newSelection: number[]) => void;
}

/**
 * Hook customizado para gerenciar seleção com otimizações de performance
 * Inclui limpeza automática de memory leaks e debouncing
 */
const useTableSelection = (
  data: TableRowData[],
  externalSelectedItems: number[] | undefined,
  onSelectionChange: ((selectedItems: number[]) => void) | undefined,
  currentPage?: number
): UseTableSelectionReturn => {
  const [internalSelectedItems, setInternalSelectedItems] = useState<number[]>([]);
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const previousDataLengthRef = useRef(data.length);
  const maxSelectionSize = 1000; // Limite para prevenir memory leaks

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    };
  }, []);

  // Determina se usa seleção externa ou interna
  const selectedItems = externalSelectedItems !== undefined ? externalSelectedItems : internalSelectedItems;

  // Set otimizado para lookup O(1) - memoizado com limite de tamanho
  const selectedItemsSet = useMemo(() => {
    const set = new Set(selectedItems.slice(0, maxSelectionSize));
    if (selectedItems.length > maxSelectionSize) {
      console.warn(
        `TableSelection: Limitando seleção a ${maxSelectionSize} itens para prevenir memory leaks`
      );
    }
    return set;
  }, [selectedItems, maxSelectionSize]);

  /**
   * Atualiza seleção com debounce e validação de memory leaks
   */
  const updateSelection = useCallback(
    (newSelection: number[]) => {
      if (!isMountedRef.current) return;

      // Limita seleção para prevenir memory leaks
      const limitedSelection = newSelection.slice(0, maxSelectionSize);

      // Debounce para múltiplas seleções rápidas
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }

      selectionTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;

        if (externalSelectedItems !== undefined) {
          onSelectionChange?.(limitedSelection);
        } else {
          setInternalSelectedItems(limitedSelection);
          onSelectionChange?.(limitedSelection);
        }
      }, 10);
    },
    [externalSelectedItems, onSelectionChange, maxSelectionSize]
  );

  // Limpa seleção quando página muda ou dataset muda drasticamente
  useEffect(() => {
    // Limpa seleção ao mudar de página
    if (currentPage !== undefined) {
      updateSelection([]);
      return;
    }

    // Limpa seleção se dataset mudou drasticamente (>50%)
    const currentDataLength = data.length;
    const previousDataLength = previousDataLengthRef.current;

    if (previousDataLength > 0) {
      const changePercentage = Math.abs(currentDataLength - previousDataLength) / previousDataLength;
      if (changePercentage > 0.5) {
        console.log('Table: Dataset mudou drasticamente, limpando seleção para prevenir memory leaks');
        updateSelection([]);
      }
    }

    previousDataLengthRef.current = currentDataLength;
  }, [currentPage, data.length, updateSelection]);

  // Estados de seleção calculados uma única vez
  const selectionState = useMemo((): SelectionState => {
    if (data.length === 0) {
      return { selectAll: false, indeterminate: false };
    }

    const visibleItemIndices = data.map((_, index) => index);
    const selectedVisibleCount = visibleItemIndices.filter((index) => selectedItemsSet.has(index)).length;

    if (selectedVisibleCount > 0 && selectedVisibleCount < data.length) {
      return { selectAll: false, indeterminate: true };
    } else if (selectedVisibleCount === data.length && data.length > 0) {
      return { selectAll: true, indeterminate: false };
    } else {
      return { selectAll: false, indeterminate: false };
    }
  }, [selectedItemsSet, data.length]);

  return {
    selectedItems,
    selectedItemsSet,
    selectionState,
    updateSelection,
  };
};

/**
 * Hook para gerenciar renderização de células com cache
 */
const useCellRenderer = () => {
  const cellCache = useRef<Map<string, ReactNode>>(new Map());
  const maxCacheSize = 500; // Limite do cache para memory management

  return useCallback((column: TableColumn, row: TableRowData, rowIndex: number): ReactNode => {
    // Cria chave única para cache
    const cacheKey = `${column.key}-${rowIndex}-${JSON.stringify(row[column.key])}`;

    // Verifica se está no cache
    if (cellCache.current.has(cacheKey)) {
      return cellCache.current.get(cacheKey);
    }

    // Limpa cache se ficou muito grande
    if (cellCache.current.size > maxCacheSize) {
      const keys = Array.from(cellCache.current.keys());
      keys.slice(0, maxCacheSize / 2).forEach((key) => cellCache.current.delete(key));
    }

    let content: ReactNode;
    try {
      switch (column.type) {
        case 'info':
          content = row[column.key];
          break;
        case 'datetime': {
          let date = row[column.key];
          if (date) {
            // Usa date-fns em vez de moment.js (muito menor)
            const parsedDate = new Date(date.replace(/T/gim, ' ').replace(/Z/gim, ''));
            content = format(parsedDate, column.format || 'dd/MM/yyyy HH:mm', { locale: ptBR });
          } else {
            content = date;
          }
          break;
        }
        case 'custom':
          content = typeof column.render === 'function' ? column.render(row, rowIndex) : row[column.key];
          break;
        default:
          content = typeof column.render === 'function' ? column.render(row, rowIndex) : row[column.key];
      }

      // Armazena no cache apenas para valores simples (não JSX complexo)
      if (typeof content === 'string' || typeof content === 'number') {
        cellCache.current.set(cacheKey, content);
      }

      return content;
    } catch (error) {
      console.error('Table: Erro ao renderizar célula:', error);
      return '';
    }
  }, []);
};

// Props do TableRow
interface TableRowProps {
  row: TableRowData;
  rowIndex: number;
  columns: TableColumn[];
  renderCellContent: (column: TableColumn, row: TableRowData, rowIndex: number) => ReactNode;
}

/**
 * Componente reutilizável de Tabela otimizado para performance
 */
const Table: React.FC<TableProps> = ({
  columns = [],
  data = [],
  className = '',
  id = '',
  tableHeader = null,
  tablePagination = null,
  loader = null,
  internalLoader = false,
  showCheckbox = false,
  selectedItems: externalSelectedItems,
  onSelectionChange = () => {},
  emptyTitle = 'Nenhuma promoção encontrada',
  emptyCaption = 'Nenhuma promoção encontrada pela busca ou filtros aplicados',
  currentPage,
  ...props
}) => {
  const generatedId = useId();
  const tableId = id || `table-${generatedId}`;

  // Hook de seleção otimizado
  const { selectedItems, selectedItemsSet, selectionState, updateSelection } = useTableSelection(
    data,
    externalSelectedItems,
    onSelectionChange,
    currentPage
  );

  // Hook de renderização com cache
  const renderCellContent = useCellRenderer();

  // Classes CSS memoizadas
  const tableClass = useMemo(() => clsx('zds-table__container', className && className), [className]);

  /**
   * Toggle de seleção geral memoizado
   */
  const toggleSelectAll = useCallback(() => {
    const newSelectAll = !selectionState.selectAll;

    if (!newSelectAll) {
      // Remove apenas itens visíveis
      const visibleItemIndices = data.map((_, index) => index);
      const newSelection = selectedItems.filter((index) => !visibleItemIndices.includes(index));
      updateSelection(newSelection);
      return;
    }

    // Adiciona todos os itens visíveis
    const visibleItemIndices = data.map((_, index) => index);
    const newSelection = [...new Set([...selectedItems, ...visibleItemIndices])];
    updateSelection(newSelection);
  }, [selectionState.selectAll, selectedItems, data, updateSelection]);

  /**
   * Factory de função de toggle para cada checkbox - memoizada por linha
   */
  const createToggleCheckbox = useCallback(
    (index: number) => {
      return () => {
        const newSelection = selectedItemsSet.has(index)
          ? selectedItems.filter((i) => i !== index)
          : [...selectedItems, index];
        updateSelection(newSelection);
      };
    },
    [selectedItems, selectedItemsSet, updateSelection]
  );

  // Memoiza as funções de toggle por linha para evitar re-renders
  const toggleFunctions = useMemo(() => {
    const functions = new Map<number, () => void>();
    data.forEach((_, index) => {
      functions.set(index, createToggleCheckbox(index));
    });
    return functions;
  }, [data.length, createToggleCheckbox]);

  /**
   * Colunas finais com checkbox otimizado
   */
  const getFinalColumns = useMemo((): TableColumn[] => {
    if (!showCheckbox) return columns;

    const checkboxColumn: TableColumn = {
      key: 'checkbox',
      label: (
        <MemoizedCheckbox
          checked={selectionState.selectAll}
          indeterminate={selectionState.indeterminate}
          onChange={toggleSelectAll}
        />
      ),
      render: (_row: TableRowData, index?: number) => (
        <MemoizedCheckbox
          checked={selectedItemsSet.has(index!)}
          onChange={toggleFunctions.get(index!) || (() => {})}
        />
      ),
      align: 'center',
    };

    return [checkboxColumn, ...columns];
  }, [columns, showCheckbox, selectionState, selectedItemsSet, toggleSelectAll, toggleFunctions]);

  // Renderização das linhas com React.memo individual
  const TableRow: React.FC<TableRowProps> = React.memo(({ row, rowIndex, columns: rowColumns }) => (
    <tr key={rowIndex} data-index={rowIndex} className="zds-table__row">
      {rowColumns.map((col) => (
        <td
          key={col.key}
          data-index={rowIndex}
          className={clsx('zds-table__td', col.align && `text-${col.align}`)}
        >
          {col.key === 'checkbox' ? col.render!(row, rowIndex) : renderCellContent(col, row, rowIndex)}
        </td>
      ))}
    </tr>
  ));

  TableRow.displayName = 'TableRow';

  // Memoiza as linhas da tabela
  const tableRows = useMemo(() => {
    return data.map((row, rowIndex) => (
      <TableRow
        key={`row-${rowIndex}`}
        row={row}
        rowIndex={rowIndex}
        columns={getFinalColumns}
        renderCellContent={renderCellContent}
      />
    ));
  }, [data, getFinalColumns, renderCellContent]);

  // Renderização condicional: Loader personalizado
  if (loader) {
    return (
      <div id={tableId} className={tableClass} {...props}>
        <div className="zds-table__external-loader">{loader}</div>
      </div>
    );
  }

  // Renderização condicional: Loader interno
  if (internalLoader) {
    return (
      <div id={tableId} className={tableClass} {...props}>
        <div className="zds-table__loader">
          <LoaderList />
        </div>
      </div>
    );
  }

  // Renderização principal
  return (
    <div id={tableId} className={tableClass} {...props}>
      {tableHeader && <div className="zds-table__header">{tableHeader}</div>}
      <div className="zds-table__scroll-wrapper">
        <table className="zds-table" role="table" aria-label="Tabela de dados">
          <thead className="zds-table__head" role="rowgroup">
            <tr role="row">
              {getFinalColumns.map((col) => (
                <th
                  key={col.key}
                  role="columnheader"
                  scope="col"
                  className={clsx('zds-table__th', col.align && `text-${col.align}`)}
                  style={col.style}
                >
                  <div className="zds-table__th-content">{col.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="zds-table__body">
            {data.length > 0 ? (
              tableRows
            ) : (
              <tr className="zds-table__empty-row">
                <td className="zds-table__empty-td" colSpan={getFinalColumns.length}>
                  <div className="zds-table__empty">
                    <div className="zds-table__empty__content">
                      <EmptyRows150Color />
                    </div>
                    <div className="zds-table__empty__text">
                      <h3 className="zds-table__empty__title">{emptyTitle}</h3>
                      <p className="zds-table__empty__caption">{emptyCaption}</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {tablePagination && <div className="zds-table__pagination">{tablePagination}</div>}
    </div>
  );
};

const MemorizedTable = React.memo(Table);
MemorizedTable.displayName = 'Table';
export default MemorizedTable;

// Exportar tipos para uso externo
// export type { TableColumn, TableRowData, TableProps, TableColumnType, TableAlign };