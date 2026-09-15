import { ChevronLeft16Regular, ChevronRight16Regular, ArrowSort16Regular, ArrowSortUp16Regular, ArrowSortDown16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState, useMemo, useRef, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './Table.module.scss';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import EmptyState from './components/EmptyState';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import ToggleButton from '../ToggleButton/ToggleButton';

import type { TableV2Props } from './Table.types';

const TableV2 = <T,>({
  columns,
  data,
  rowSelection: rowSelectionConfig,
  enableSorting = true,
  bulkActions,
  header,
  footer,
  loading = false,
  emptyIcon,
  emptyTitle,
  emptyText,
  onRow,
  className,
}: TableV2Props<T>) => {
  const isRowSelectionEnabled = !!rowSelectionConfig;
  const isControlled = rowSelectionConfig?.selectedRowKeys !== undefined;

  const [pendingSearch, setPendingSearch] = useState(header?.searchValue ?? '');

  useEffect(() => {
    if (header?.searchValue !== undefined) {
      setPendingSearch(header.searchValue);
    }
  }, [header?.searchValue]);

  const [activeView, setActiveView] = useState<string>(
    header?.viewToggle?.value ??
    header?.viewToggle?.defaultValue ??
    header?.viewToggle?.items?.[0]?.value ??
    ''
  );

  useEffect(() => {
    if (header?.viewToggle?.value !== undefined) {
      setActiveView(header.viewToggle.value);
    }
  }, [header?.viewToggle?.value]);

  const currentViewData = header?.viewToggle?.views?.[activeView];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectiveColumns = (currentViewData?.columns ?? columns) as ColumnDef<T, any>[];
  const effectiveData = currentViewData?.data ?? data;
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});
  const rowSelectionRef = useRef<RowSelectionState>({});

  const externalSelectionState = useMemo<RowSelectionState>(() => {
    if (!rowSelectionConfig?.selectedRowKeys) return {};
    return Object.fromEntries(
      rowSelectionConfig.selectedRowKeys.map((key) => [String(key), true])
    );
  }, [rowSelectionConfig?.selectedRowKeys]);

  const effectiveRowSelection = isControlled ? externalSelectionState : rowSelectionState;
  rowSelectionRef.current = effectiveRowSelection;
  const lastEmittedSelectionKey = useRef('{}');
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
          disabled={rowSelectionConfig?.disableSelectAll}
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
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      </div>
    ),
  }), [rowSelectionConfig?.disableSelectAll]);

  const resolvedColumns = useMemo(
    () => (isRowSelectionEnabled ? [selectionColumn, ...effectiveColumns] : effectiveColumns),
    [isRowSelectionEnabled, selectionColumn, effectiveColumns]
  );

  const showSearch = !!(header?.onSearchChange);

  const table = useReactTable({
    data: effectiveData,
    columns: resolvedColumns,
    defaultColumn: { minSize: 44, size: 0 },
    state: {
      ...(isRowSelectionEnabled ? { rowSelection: effectiveRowSelection } : {}),
      ...(enableSorting ? { sorting } : {}),
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    enableSorting,
    onRowSelectionChange: isRowSelectionEnabled
      ? (updater) => {
          const prev = rowSelectionRef.current;
          const next = typeof updater === 'function' ? updater(prev) : updater;
          const selectionKey = JSON.stringify(next, Object.keys(next).sort());
          if (selectionKey === lastEmittedSelectionKey.current) return;
          lastEmittedSelectionKey.current = selectionKey;
          rowSelectionRef.current = next;
          if (!isControlled) {
            setRowSelectionState(next);
          }
          if (rowSelectionConfig?.onRowChange) {
            const allRows = table.getCoreRowModel().rows;
            const selectedRows = allRows.filter((r) => next[r.id]).map((r) => r.original);
            const selectedKeys = allRows.filter((r) => next[r.id]).map((r) => r.index as (string | number));
            rowSelectionConfig.onRowChange(selectedRows, selectedKeys);
          }
        }
      : undefined,
    enableRowSelection: isRowSelectionEnabled
      ? typeof rowSelectionConfig?.disabled === 'function'
        ? (row) => !(rowSelectionConfig.disabled as (r: T, i: number) => boolean)(row.original, row.index)
        : typeof rowSelectionConfig?.disabled === 'boolean'
          ? !rowSelectionConfig.disabled
          : true
      : false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  });

  const effectiveTotalItems = footer?.totalItems ?? 0;
  const totalPages = footer ? Math.ceil(effectiveTotalItems / pageSize) : 0;
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex + 1 < totalPages;

  const skeletonRowCount = footer ? pageSize : (effectiveData.length > 0 ? effectiveData.length : pageSize);

  const selectedRows = useMemo(
    () =>
      table
        .getCoreRowModel()
        .rows.filter((r) => effectiveRowSelection[r.id])
        .map((r) => r.original),
    [effectiveRowSelection, table]
  );
  const selectedCount = selectedRows.length;
  const showBulkActions = isRowSelectionEnabled && !!bulkActions && selectedCount > 0;

  useEffect(() => {
    if (isRowSelectionEnabled) {
      table.resetRowSelection();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  useEffect(() => {
    if (footer?.currentPage !== undefined) {
      const targetPageIndex = footer.currentPage - 1;
      setPagination((prev) =>
        prev.pageIndex !== targetPageIndex
          ? { ...prev, pageIndex: targetPageIndex }
          : prev,
      );
    }
  }, [footer?.currentPage]);

  const handleClearSelection = () => {
    table.resetRowSelection();
    bulkActions?.onClear?.();
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setPagination({ pageIndex: 0, pageSize: size });
    footer?.onPageSizeChange?.(size);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      {showBulkActions && (
        <div className={styles.bulkActionsBar}>
          <div className={styles.bulkActionsInfo}>
            <Button
              variant="text"
              iconOnly
              icon={<Dismiss16Regular />}
              ariaLabel="Limpar seleção"
              onClick={handleClearSelection}
              className={styles.bulkActionsClearButton}
            />
            <span className={styles.bulkActionsLabel}>
              {bulkActions.label
                ? bulkActions.label(selectedCount, selectedRows)
                : `${selectedCount} ${selectedCount === 1 ? 'item selecionado' : 'itens selecionados'}`}
            </span>
          </div>
          <div className={styles.bulkActionsButtons}>
            {bulkActions.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant ?? 'outlined'}
                type="button"
                disabled={action.disabled}
                onClick={action.onClick}
                size="sm"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      {header && (
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            {showSearch && (
              <div className={styles.tableHeaderSearchContainer}>
                <Search
                  value={pendingSearch}
                  virtualKeyboard={header.virtualKeyboard}
                  searchMode={header?.searchMode ?? "on-enter"}
                  onChange={(e) => {
                    setPendingSearch(e.target.value);
                  }}
                  onSearch={(val) => {
                    if (footer) {
                      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                      footer?.onPageChange?.(1);
                    }
                    header?.onSearchChange?.(val);
                  }}
                  onClear={() => {
                    setPendingSearch('');
                    if (footer) {
                      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                      footer?.onPageChange?.(1);
                    }
                    header?.onSearchChange?.('');
                  }}
                  placeholder={header.searchPlaceholder ?? 'Pesquisar...'}
                  className={styles.tableHeaderSearch}
                />
              </div>
            )}
            {header.viewToggle && (
              <ToggleButton
                mode="combined"
                selectionType="single"
                value={activeView}
                requireSelection={true}
                onValueChange={(val) => {
                  if (!val) return;
                  setActiveView(val);
                  if (footer) {
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                    footer?.onPageChange?.(1);
                  }
                  header.viewToggle?.onValueChange?.(val);
                }}
                items={header.viewToggle.items.map((item) => ({
                  value: item.value,
                  icon: item.icon,
                  iconOnly: true,
                  tooltipText: item.tooltipText,
                }))}
              />
            )}
          </div>
          {!!header.filterItems?.length && (
            <div className={styles.tableHeaderFilters}>
              {header.filterItems.some((item) => item.type !== 'combined') && (
                <span className={styles.tableHeaderFilterLabel}>Filtros</span>
              )}
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
                  if (filterItem.type === 'combined') {
                    return (
                      <Filter
                        key={filterItem.id ?? index}
                        mode="combined"
                        buttonText={filterItem.buttonText}
                        icon={filterItem.icon}
                        title={filterItem.title}
                        drawerWidth={filterItem.drawerWidth}
                        appliedFilterCount={filterItem.activeCount}
                        drawerHeaderContent={filterItem.drawerHeaderContent}
                        onApply={filterItem.onApply}
                        onClear={filterItem.onClear}
                        variant={filterItem.variant ?? 'outlined'}
                        disabled={filterItem.disabled}
                      >
                        {filterItem.children}
                      </Filter>
                    );
                  }
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
                        locale={filterItem.locale}
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
                        width: col.column.columnDef.size || undefined,
                        minWidth: col.column.columnDef.minSize,
                        maxWidth: col.column.columnDef.maxSize !== Number.MAX_SAFE_INTEGER
                          ? col.column.columnDef.maxSize
                          : undefined,
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
                              <ArrowSort16Regular className={styles.tableSortIconNeutral} />
                            )}
                          </button>
                        ) : (
                          flexRender(col.column.columnDef.header, col.getContext())
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tableBody}>
              {loading ? (
                Array.from({ length: skeletonRowCount }).map((_, rowIdx) => (
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
                            width: cell.column.columnDef.size || undefined,
                            minWidth: cell.column.columnDef.minSize,
                            maxWidth: cell.column.columnDef.maxSize !== Number.MAX_SAFE_INTEGER
                              ? cell.column.columnDef.maxSize
                              : undefined,
                          }}
                        >
                          <div
                            className={styles.tableCellMaxHeight}
                            style={{ maxHeight: cell.column.columnDef.meta?.maxHeight ?? '64px' }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
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
