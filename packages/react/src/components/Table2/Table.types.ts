import type { FilterItem } from '../Table/TableHeader';
import type { ColumnDef } from '@tanstack/react-table';

export type { FilterItem };

export interface Table2HeaderProps {
  /** Placeholder do campo de busca global */
  searchPlaceholder?: string;
  /** Exibe o campo de busca (padrão: true) */
  showSearch?: boolean;
  /** Items de filtro (Status, Data de início, etc.) */
  filterItems?: FilterItem[];
}

export interface Table2Props<T = Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  /** Habilita filtros individuais por coluna no <th> */
  enableFilters?: boolean;
  /** Header acima da tabela com busca + filtros */
  header?: Table2HeaderProps;
}

