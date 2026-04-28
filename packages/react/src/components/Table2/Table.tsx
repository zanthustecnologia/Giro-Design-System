import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import TableHeader from '../Table/TableHeader';

import type { Table2Props } from './Table.types';

function Table2<T>({
  columns,
  data,
  enableFilters = false,
  header,
}: Table2Props<T>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState('');

  const hasHeader = !!header;
  const showSearch = hasHeader && (header.showSearch ?? true);

  const table = useReactTable({
    data,
    columns,
    state: {
      ...(enableFilters ? { columnFilters } : {}),
      ...(showSearch ? { globalFilter } : {}),
    },
    onColumnFiltersChange: enableFilters ? setColumnFilters : undefined,
    onGlobalFilterChange: showSearch ? setGlobalFilter : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      enableFilters || showSearch ? getFilteredRowModel() : undefined,
  });

  return (
    <div>
      {hasHeader && (
        <TableHeader
          searchValue={globalFilter}
          onSearchChange={setGlobalFilter}
          searchPlaceholder={header.searchPlaceholder}
          showSearch={showSearch}
          showFilters={!!header.filterItems?.length}
          filterItems={header.filterItems}
        />
      )}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {enableFilters && header.column.getCanFilter() && (
                    <input
                      value={(header.column.getFilterValue() as string) ?? ''}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Filtrar...`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
