// ✅ CORREÇÃO COMPLETA
// Componente principal
export { default } from './Table';
export { default as Table } from './Table';

// Tipos principais - ESSENCIAL para TypeScript
export type { 
  TableProps,
  TableColumn,
  TableRowData,
  TableColumnType,
  TableAlign,
} from './Table.types';

// Sub-componentes relacionados
export { default as TableHeader } from './TableHeader';
export type { TableHeaderProps } from './TableHeader';

export { default as TablePagination } from './TablePagination';
export type { TablePaginationProps } from './TablePagination';

// Componente Wrapper
export { default as TableWrapper } from './TableWrapper';
export type { TableWrapperProps } from './TableWrapper.types';
