import clsx from 'clsx';
import React from 'react';

import Table from './Table';
import styles from './Table.module.scss';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';

import type { TableRowData } from './Table.types';
import type { TableWrapperProps } from './TableWrapper.types';

/**
 * TableWrapper - Componente wrapper que unifica Table, TableHeader e TablePagination
 * com uma borda estilizada ao redor de todos os elementos.
 * 
 * @example
 * ```tsx
 * <TableWrapper
 *   header={{
 *     searchValue: search,
 *     onSearchChange: handleSearch,
 *     showFilters: true,
 *     filterItems: filters,
 *   }}
 *   table={{
 *     columns: columns,
 *     dataSource: data,
 *     loading: false,
 *   }}
 *   pagination={{
 *     currentPage: 1,
 *     totalItems: 100,
 *     itemsPerPage: 10,
 *     onPageChange: handlePageChange,
 *     onItemsPerPageChange: handleItemsPerPageChange,
 *   }}
 * />
 * ```
 */
const TableWrapper = <T extends TableRowData = TableRowData>({
  header,
  table,
  pagination,
  className,
}: TableWrapperProps<T>) => {
  if (!table) {
    console.warn('TableWrapper: A prop "table" é obrigatória');
    return null;
  }

  return (
    <div className={clsx(styles['zds-table-wrapper'], className)}>
      {header && <TableHeader {...header} />}
      <Table<T> {...table} />
      {pagination && <TablePagination {...pagination} />}
    </div>
  );
};

export default TableWrapper;
