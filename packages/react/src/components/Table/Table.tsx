import clsx from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useState, useMemo, useCallback, ReactNode } from 'react';

import styles from './Table.module.scss';
import Checkbox from '../Checkbox';
import EmptyRows150Color from './EmptyRows150Color';
import LoaderList from './LoaderList';

import type { TableColumn, TableRowData, TableProps } from './Table.types';

const useSelection = <T extends TableRowData = TableRowData>(
  dataSource: T[],
  rowSelection?: TableProps<T>['rowSelection']
) => {
  const [internalKeys, setInternalKeys] = useState<(string | number)[]>([]);
  const selectedKeys = rowSelection?.selectedRowKeys ?? internalKeys;
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const handleChange = useCallback((newKeys: (string | number)[]) => {
    const newRows = dataSource.filter((_, index) => newKeys.includes(index)) as T[];

    if (rowSelection?.selectedRowKeys !== undefined) {
      rowSelection.onChange?.(newKeys, newRows);
    } else {
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

  const selectableKeys = useMemo(() => (
    dataSource
      .map((row, index) => ({ index, disabled: rowSelection?.getCheckboxProps?.(row, index)?.disabled }))
      .filter(({ disabled }) => !disabled)
      .map(({ index }) => index)
  ), [dataSource, rowSelection]);

  const toggleAll = useCallback(() => {
    const isAllSelectableSelected = selectableKeys.every(k => selectedSet.has(k));
    const newKeys = isAllSelectableSelected
      ? selectedKeys.filter(k => !selectableKeys.includes(k as number))
      : [...new Set([...selectedKeys, ...selectableKeys])];
    handleChange(newKeys);
  }, [selectableKeys, selectedKeys, selectedSet, handleChange]);

  const isAllSelected = selectableKeys.length > 0 && selectableKeys.every(k => selectedSet.has(k));
  const isIndeterminate = selectableKeys.some(k => selectedSet.has(k)) && !isAllSelected;

  return {
    selectedSet,
    selectedKeys,
    toggleRow,
    toggleAll,
    isAllSelected,
    isIndeterminate,
  };
};

const renderCell = <T extends TableRowData = TableRowData>(column: TableColumn<T>, row: T, index: number): ReactNode => {
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

const Table = <T extends TableRowData = TableRowData>({
  columns,
  dataSource,
  className,
  loading = false,
  rowSelection,
  locale,
  onRow,
  ...rest
}: TableProps<T>) => {
  const hasValidData = Array.isArray(columns) && Array.isArray(dataSource);
  const safeColumns = useMemo(() => Array.isArray(columns) ? columns : [], [columns]);
  const safeDataSource = useMemo(() => Array.isArray(dataSource) ? dataSource : [], [dataSource]);

  const { selectedSet, toggleRow, toggleAll, isAllSelected, isIndeterminate } = useSelection(
    safeDataSource,
    rowSelection
  );

  const finalColumns = useMemo(() => {
    if (!rowSelection) return safeColumns;

    const checkboxColumn: TableColumn<T> = {
      key: '__checkbox__',
      label: (
          <Checkbox
            checked={isAllSelected || isIndeterminate}
            indeterminate={isIndeterminate}
            onCheckedChange={toggleAll}
            disabled={rowSelection.disableSelectAll}
          />
        ),
        render: (_, index) => {
          const props = rowSelection.getCheckboxProps?.(safeDataSource[index], index) || {};
          return (
            <Checkbox
              checked={selectedSet.has(index)}
              onCheckedChange={() => toggleRow(index)}
              disabled={props.disabled}
            />
          );
      },
      align: 'center',
    };

    return [checkboxColumn, ...safeColumns];
  }, [safeColumns, rowSelection, isAllSelected, isIndeterminate, toggleAll, selectedSet, toggleRow, safeDataSource]);
  const tableId = useMemo(() =>
    `table-${Math.random().toString(36).substr(2, 9)}`, []
  );

  if (!hasValidData) {
    console.warn('Table: columns e dataSource devem ser arrays');
    return null;
  }

  if (loading) {
    return (
      <div className={clsx(styles.tableContainer, className)}>
        <div className={styles.tableLoader}>
          <LoaderList />
        </div>
      </div>
    );
  }

  const emptyText = locale?.emptyText || (
    <div className={styles.tableEmpty}>
      <div className={styles.tableEmptyContent}>
        <EmptyRows150Color />
      </div>
      <div className={styles.tableEmptyText}>
        <h3 className={styles.tableEmptyTitle}>Nenhum dado encontrado</h3>
        <p className={styles.tableEmptyCaption}>Nenhum registro encontrado</p>
      </div>
    </div>
  );

  return (
    <div className={clsx(styles.tableContainer, className)} {...rest}>
      <div className={styles.tableScrollWrapper}>
        <table 
          className={styles.table}
          role="table"
          aria-label="Tabela de dados"
          aria-describedby={loading ? `${tableId}-loading` : undefined}
          aria-rowcount={safeDataSource.length + 1}
        >
          <thead className={styles.tableHead}>
            <tr>
              {finalColumns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(styles.tableTh, column.align && `text-${column.align}`)}
                  style={column.style}
                >
                  <div className={styles.tableThContent}>{column.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {safeDataSource.length > 0 ? (
              safeDataSource.map((row, index) => {
                const rowProps = onRow?.(row, index) || {};
                return (
                  <tr
                    key={index}
                    className={clsx(styles.tableRow, rowProps.className)}
                    onClick={rowProps.onClick}
                    onDoubleClick={rowProps.onDoubleClick}
                  >
                    {finalColumns.map((column) => (
                      <td
                        key={column.key}
                        className={clsx(styles.tableTd, column.align && `text-${column.align}`)}
                      >
                        {renderCell(column, row, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={finalColumns.length} className={styles.tableEmptyCell}>
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
