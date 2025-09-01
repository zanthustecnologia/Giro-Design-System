import './Table.scss';
import React, { useState, useMemo, useCallback, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Checkbox from '../Checkbox';
import LoaderList from './LoaderList';
import EmptyRows150Color from './EmptyRows150Color';

// ✅ TIPOS SIMPLIFICADOS
export type TableColumnType = 'text' | 'datetime' | 'custom';
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  label: ReactNode;
  type?: TableColumnType;
  format?: string;
  render?: (row: TableRowData, index: number) => ReactNode;
  align?: TableAlign;
  style?: CSSProperties;
}

export type TableRowData = Record<string, any>;

export interface TableProps {
  /** Colunas da tabela */
  columns: TableColumn[];
  /** Dados da tabela */
  dataSource: TableRowData[];
  /** Classe CSS adicional */
  className?: string;
  /** Estado de carregamento */
  loading?: boolean;
  /** Configuração de seleção */
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (keys: (string | number)[], rows: TableRowData[]) => void;
    getCheckboxProps?: (row: TableRowData, index: number) => { disabled?: boolean };
  };
  /** Textos customizados */
  locale?: {
    emptyText?: ReactNode;
  };
  /** Eventos de linha */
  onRow?: (row: TableRowData, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
}

const useSelection = (
  dataSource: TableRowData[],
  rowSelection?: TableProps['rowSelection']
) => {
  const [internalKeys, setInternalKeys] = useState<(string | number)[]>([]);
  const selectedKeys = rowSelection?.selectedRowKeys ?? internalKeys;
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);
  
  const handleChange = useCallback((newKeys: (string | number)[]) => {
    const newRows = dataSource.filter((_, index) => newKeys.includes(index));
    
    if (rowSelection?.selectedRowKeys !== undefined) {
      // Controlled
      rowSelection.onChange?.(newKeys, newRows);
    } else {
      // Uncontrolled
      setInternalKeys(newKeys);
      rowSelection?.onChange?.(newKeys, newRows);
    }
  }, [dataSource, rowSelection]);
  
  const toggleRow = useCallback((key: string | number) => {
    const newKeys = selectedSet.has(key)
      ? selectedKeys.filter(k => k !== key)
      : [...selectedKeys, key];
    handleChange(newKeys);
  }, [selectedKeys, selectedSet, handleChange]);
  
  const toggleAll = useCallback(() => {
    const allKeys = dataSource.map((_, index) => index);
    const newKeys = selectedKeys.length === dataSource.length ? [] : allKeys;
    handleChange(newKeys);
  }, [dataSource, selectedKeys.length, handleChange]);
  
  const isAllSelected = selectedKeys.length === dataSource.length && dataSource.length > 0;
  const isIndeterminate = selectedKeys.length > 0 && selectedKeys.length < dataSource.length;
  
  return {
    selectedSet,
    selectedKeys,
    toggleRow,
    toggleAll,
    isAllSelected,
    isIndeterminate,
  };
};

// ✅ RENDERIZADOR DE CÉLULA SIMPLES (10 linhas vs 50+)
const renderCell = (column: TableColumn, row: TableRowData, index: number): ReactNode => {
  if (column.render) {
    return column.render(row, index);
  }
  
  const value = row[column.key];
  
  switch (column.type) {
    case 'datetime':
      if (!value) return '';
      try {
        const date = new Date(value);
        return format(date, column.format || 'dd/MM/yyyy', { locale: ptBR });
      } catch {
        return value;
      }
    default:
      return value;
  }
};

// ✅ COMPONENTE PRINCIPAL SIMPLIFICADO (100 linhas vs 400+)
const Table: React.FC<TableProps> = ({
  columns = [],
  dataSource = [],
  className,
  loading = false,
  rowSelection,
  locale = {},
  onRow,
}) => {
  // Validação básica
  if (!Array.isArray(columns) || !Array.isArray(dataSource)) {
    console.warn('Table: columns e dataSource devem ser arrays');
    return null;
  }
  
  const { selectedSet, toggleRow, toggleAll, isAllSelected, isIndeterminate } = useSelection(
    dataSource,
    rowSelection
  );
  
  // Colunas finais com checkbox se necessário
  const finalColumns = useMemo(() => {
    if (!rowSelection) return columns;
    
    const checkboxColumn: TableColumn = {
      key: '__checkbox__',
      label: (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={toggleAll}
        />
      ),
      render: (_, index) => {
        const props = rowSelection.getCheckboxProps?.(dataSource[index], index) || {};
        return (
          <Checkbox
            checked={selectedSet.has(index)}
            onChange={() => toggleRow(index)}
            disabled={props.disabled}
          />
        );
      },
      align: 'center',
    };
    
    return [checkboxColumn, ...columns];
  }, [columns, rowSelection, isAllSelected, isIndeterminate, toggleAll, selectedSet, toggleRow, dataSource]);
  
  // Loading state
  if (loading) {
    return (
      <div className={clsx('zds-table__container', className)}>
        <div className="zds-table__loader">
          <LoaderList />
        </div>
      </div>
    );
  }
  
  // Empty state
  const emptyText = locale.emptyText || (
    <div className="zds-table__empty">
      <div className="zds-table__empty__content">
        <EmptyRows150Color />
      </div>
      <div className="zds-table__empty__text">
        <h3 className="zds-table__empty__title">Nenhum dado encontrado</h3>
        <p className="zds-table__empty__caption">Nenhum registro encontrado</p>
      </div>
    </div>
  );
  
  return (
    <div className={clsx('zds-table__container', className)}>
      <div className="zds-table__scroll-wrapper">
        <table className="zds-table" role="table">
          <thead className="zds-table__head">
            <tr>
              {finalColumns.map((column) => (
                <th
                  key={column.key}
                  className={clsx('zds-table__th', column.align && `text-${column.align}`)}
                  style={column.style}
                >
                  <div className="zds-table__th-content">{column.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="zds-table__body">
            {dataSource.length > 0 ? (
              dataSource.map((row, index) => {
                const rowProps = onRow?.(row, index) || {};
                return (
                  <tr
                    key={index}
                    className={clsx('zds-table__row', rowProps.className)}
                    onClick={rowProps.onClick}
                    onDoubleClick={rowProps.onDoubleClick}
                  >
                    {finalColumns.map((column) => (
                      <td
                        key={column.key}
                        className={clsx('zds-table__td', column.align && `text-${column.align}`)}
                      >
                        {renderCell(column, row, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={finalColumns.length} className="zds-table__empty-cell">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;