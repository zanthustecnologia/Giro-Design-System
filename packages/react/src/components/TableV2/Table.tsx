import { ChevronLeft16Regular, ChevronRight16Regular, ArrowSort16Regular, ArrowSortUp16Regular, ArrowSortDown16Regular } from '@fluentui/react-icons';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './Table.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import EmptyState from './components/EmptyState';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';

import type { TableV2Props } from './Table.types';

const TableV2 = <T,>({
  columns,
  data,
  enableFilters = false,
  enableRowSelection = false,
  enableSorting = true,
  onRowSelectionChange,
  header,
  footer,
  loading = false,
  emptyIcon,
  emptyTitle,
  emptyText,
  onRow,
  className,
}: TableV2Props<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: footer?.defaultPageSize ?? 10,
  });
  const { pageIndex, pageSize } = pagination;

  const selectionColumn = useMemo<ColumnDef<T, unknown>>(() => ({
    id: '__select__',
    size: 48,
    enableSorting: false,
    enableColumnFilter: false,
    header: ({ table: t }) => (
      <div className={styles.checkboxCell}>
        <Checkbox
          checked={t.getIsAllPageRowsSelected()}
          indeterminate={t.getIsSomePageRowsSelected()}
          onCheckedChange={(checked) =>
            t.toggleAllPageRowsSelected(checked)
          }
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={styles.checkboxCell}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      </div>
    ),
  }), []);

  const resolvedColumns = enableRowSelection
    ? [selectionColumn, ...columns]
    : columns;

  const showSearch = !!(header && (header.showSearch ?? true));

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      ...(enableFilters ? { columnFilters } : {}),
      ...(showSearch ? { globalFilter } : {}),
      ...(footer ? { pagination: { pageIndex, pageSize } } : {}),
      ...(enableRowSelection ? { rowSelection } : {}),
      ...(enableSorting ? { sorting } : {}),
    },
    onColumnFiltersChange: enableFilters ? setColumnFilters : undefined,
    onGlobalFilterChange: showSearch ? setGlobalFilter : undefined,
    onSortingChange: enableSorting ? setSorting : undefined,
    enableSorting,
    onRowSelectionChange: enableRowSelection
      ? (updater) => {
          setRowSelection((prev) => {
            const next =
              typeof updater === 'function' ? updater(prev) : updater;
            if (onRowSelectionChange) {
              const selectedRows = table
                .getCoreRowModel()
                .rows.filter((r) => next[r.id])
                .map((r) => r.original);
              onRowSelectionChange(selectedRows);
            }
            return next;
          });
        }
      : undefined,
    enableRowSelection,
    onPaginationChange: footer ? setPagination : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      enableFilters || showSearch ? getFilteredRowModel() : undefined,
    getPaginationRowModel: footer ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    manualPagination: false,
  });

  const totalPages = footer ? Math.ceil(footer.totalItems / pageSize) : 0;
  const canGoPrev = pageIndex > 0;
  const canGoNext = !!footer && pageIndex + 1 < totalPages;

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setPagination({ pageIndex: 0, pageSize: size });
    footer?.onPageSizeChange?.(size);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      {header && (
        <div className={styles.tableHeader}>
          {showSearch && (
            <div className={styles.tableHeaderSearchContainer}>
              <Search
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={header.searchPlaceholder ?? 'Pesquisar...'}
                className={styles.tableHeaderSearch}
              />
            </div>
          )}
          {!!header.filterItems?.length && (
            <div className={styles.tableHeaderFilters}>
              <span className={styles.tableHeaderFilterLabel}>Filtros</span>
              <div className={styles.tableHeaderFilterItems}>
                {header.filterItems.map((filterItem, index) => {
                  const commonProps = {
                    buttonText: filterItem.buttonText,
                    icon: filterItem.icon,
                    side: filterItem.side,
                    align: filterItem.align,
                    disabled: filterItem.disabled,
                    variant: 'outlined' as const,
                    onOpen: () => filterItem.onToggle?.(true),
                    onClose: () => filterItem.onToggle?.(false),
                  };
                  if (filterItem.type === 'calendar') {
                    return (
                      <Filter
                        key={filterItem.id ?? index}
                        {...commonProps}
                        type="calendar"
                        selectedDate={filterItem.selectedDate}
                        onDateSelect={filterItem.onDateSelect}
                        onClearDate={filterItem.onClear}
                        minDate={filterItem.minDate}
                        maxDate={filterItem.maxDate}
                        placeholder={filterItem.placeholder}
                      />
                    );
                  }
                  return (
                    <Filter
                      key={filterItem.id ?? index}
                      {...commonProps}
                      type={filterItem.type}
                      items={filterItem.items}
                      selectedIds={filterItem.selectedIds}
                      onApplyFilter={filterItem.onSelectionChange}
                      placeholder={filterItem.placeholder}
                      enableSearch={filterItem.enableSearch}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.tableContainer}>
        <div className={styles.tableScrollWrapper}>
          <table
            className={styles.table}
            role="table"
            aria-label="Tabela de dados"
            aria-rowcount={data.length + 1}
          >
            <thead className={styles.tableHead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((col) => (
                    <th
                      key={col.id}
                      className={styles.tableTh}
                      style={{
                        textAlign: col.column.columnDef.meta?.align,
                        width: col.column.columnDef.size,
                        minWidth: col.column.columnDef.minSize,
                        maxWidth: col.column.columnDef.maxSize,
                      }}
                    >
                      <div className={styles.tableThContent}>
                        {col.isPlaceholder ? null : col.column.getCanSort() ? (
                          <button
                            type="button"
                            className={styles.tableSortButton}
                            onClick={col.column.getToggleSortingHandler()}
                            aria-label={`Ordenar por ${typeof col.column.columnDef.header === 'string' ? col.column.columnDef.header : col.id}`}
                          >
                            {flexRender(col.column.columnDef.header, col.getContext())}
                            {col.column.getIsSorted() === 'asc' ? (
                              <ArrowSortUp16Regular className={styles.tableSortIcon} />
                            ) : col.column.getIsSorted() === 'desc' ? (
                              <ArrowSortDown16Regular className={styles.tableSortIcon} />
                            ) : (
                              <ArrowSort16Regular className={clsx(styles.tableSortIcon, styles.tableSortIconNeutral)} />
                            )}
                          </button>
                        ) : (
                          flexRender(col.column.columnDef.header, col.getContext())
                        )}
                      </div>
                      {enableFilters && col.column.getCanFilter() && (
                        <input
                          value={(col.column.getFilterValue() as string) ?? ''}
                          onChange={(e) =>
                            col.column.setFilterValue(e.target.value)
                          }
                          placeholder="Filtrar..."
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tableBody}>
              {loading ? (
                Array.from({ length: pageSize }).map((_, rowIdx) => (
                  <tr key={`skeleton-row-${rowIdx}`} className={styles.tableRow}>
                    {table.getVisibleLeafColumns().map((col) => (
                      <td key={col.id} className={styles.tableTd}>
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => {
                  const rowProps = onRow?.(row.original, index) ?? {};
                  return (
                    <tr
                      key={row.id}
                      className={clsx(styles.tableRow, rowProps.className)}
                      onClick={rowProps.onClick}
                      onDoubleClick={rowProps.onDoubleClick}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={styles.tableTd}
                          style={{
                            textAlign: cell.column.columnDef.meta?.align,
                            width: cell.column.columnDef.size,
                            minWidth: cell.column.columnDef.minSize,
                            maxWidth: cell.column.columnDef.maxSize,
                          }}
                        >
                          {cell.column.columnDef.meta?.maxHeight ? (
                            <div style={{ maxHeight: cell.column.columnDef.meta.maxHeight, overflow: 'hidden' }}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length}
                    className={styles.tableEmptyCell}
                  >
                    <EmptyState emptyIcon={emptyIcon} emptyTitle={emptyTitle} emptyText={emptyText} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {footer && (
        <div className={styles.tablePagination}>
          <div className={styles.tablePaginationSelect}>
            <label
              htmlFor="tablev2-page-size"
              className={styles.tablePaginationLabel}
            >
              Itens por página
            </label>
            <select
              id="tablev2-page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
              className={styles.tablePaginationSelectInput}
            >
              {(footer.pageSizeOptions ?? [10, 25, 50, 100]).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.tablePaginationInfo}>
            <span>
              {totalPages > 0
                ? `${pageIndex + 1} de ${totalPages}`
                : '0 páginas'}
            </span>
          </div>
          <div className={styles.tablePaginationControls}>
            <button
              className={styles.tablePaginationButton}
              onClick={() => {
                const newPage = pageIndex - 1;
                setPagination((prev) => ({ ...prev, pageIndex: newPage }));
                footer?.onPageChange?.(newPage + 1);
              }}
              disabled={!canGoPrev}
              aria-label="Página anterior"
            >
              <ChevronLeft16Regular />
            </button>
            <button
              className={styles.tablePaginationButton}
              onClick={() => {
                const newPage = pageIndex + 1;
                setPagination((prev) => ({ ...prev, pageIndex: newPage }));
                footer?.onPageChange?.(newPage + 1);
              }}
              disabled={!canGoNext}
              aria-label="Próxima página"
            >
              <ChevronRight16Regular />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableV2;
