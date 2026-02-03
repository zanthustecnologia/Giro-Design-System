import styles from './Table.module.scss';
import React, { useState, useMemo, useCallback, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Checkbox from '../Checkbox';
import LoaderList from './LoaderList';
import EmptyRows150Color from './EmptyRows150Color';
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
  columns = [],
  dataSource = [],
  className,
  loading = false,
  rowSelection,
  locale = {},
  onRow,
}: TableProps<T>) => {
  if (!Array.isArray(columns) || !Array.isArray(dataSource)) {
    console.warn('Table: columns e dataSource devem ser arrays');
    return null;
  }

  const { selectedSet, toggleRow, toggleAll, isAllSelected, isIndeterminate } = useSelection(
    dataSource,
    rowSelection
  );

  const finalColumns = useMemo(() => {
    if (!rowSelection) return columns;

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
          const props = rowSelection.getCheckboxProps?.(dataSource[index], index) || {};
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

    return [checkboxColumn, ...columns];
  }, [columns, rowSelection, isAllSelected, isIndeterminate, toggleAll, selectedSet, toggleRow, dataSource]);
  const tableId = useMemo(() =>
    `table-${Math.random().toString(36).substr(2, 9)}`, []
  );
  if (loading) {
    return (
      <div className={clsx(styles['zds-table__container'], className)}>
        <div className={styles['zds-table__loader']}>
          <LoaderList />
        </div>
      </div>
    );
  }

  const emptyText = locale.emptyText || (
    <div className={styles['zds-table__empty']}>
      <div className={styles['zds-table__empty__content']}>
        <EmptyRows150Color />
      </div>
      <div className={styles['zds-table__empty__text']}>
        <h3 className={styles['zds-table__empty__title']}>Nenhum dado encontrado</h3>
        <p className={styles['zds-table__empty__caption']}>Nenhum registro encontrado</p>
      </div>
    </div>
  );

  return (
    <div className={clsx(styles['zds-table__container'], className)}>
      <div className={styles['zds-table__scroll-wrapper']}>
        <table 
          className={styles['zds-table']}
          role="table"
          aria-label="Tabela de dados"
          aria-describedby={loading ? `${tableId}-loading` : undefined}
          aria-rowcount={dataSource.length + 1}
        >
          <thead className={styles['zds-table__head']}>
            <tr>
              {finalColumns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(styles['zds-table__th'], column.align && `text-${column.align}`)}
                  style={column.style}
                >
                  <div className={styles['zds-table__th-content']}>{column.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles['zds-table__body']}>
            {dataSource.length > 0 ? (
              dataSource.map((row, index) => {
                const rowProps = onRow?.(row, index) || {};
                return (
                  <tr
                    key={index}
                    className={clsx(styles['zds-table__row'], rowProps.className)}
                    onClick={rowProps.onClick}
                    onDoubleClick={rowProps.onDoubleClick}
                  >
                    {finalColumns.map((column) => (
                      <td
                        key={column.key}
                        className={clsx(styles['zds-table__td'], column.align && `text-${column.align}`)}
                      >
                        {renderCell(column, row, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={finalColumns.length} className={styles['zds-table__empty-cell']}>
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