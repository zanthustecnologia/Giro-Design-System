import { TableProps, TableRowData } from './Table.types';
import { TableHeaderProps } from './TableHeader';
import { TablePaginationProps } from './TablePagination';

/**
 * Props do componente TableWrapper
 * @typeParam T - Tipo dos dados da linha
 */
export interface TableWrapperProps<T = TableRowData> {
  /** Props do TableHeader (opcional) */
  header?: TableHeaderProps;
  
  /** Props da Table (obrigatório) */
  table: TableProps<T>;
  
  /** Props da TablePagination (opcional) */
  pagination?: TablePaginationProps;
  
  /** Classe CSS adicional para o container wrapper */
  className?: string;
}
