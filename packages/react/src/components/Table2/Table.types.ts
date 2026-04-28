
import type { ColumnDef } from '@tanstack/react-table';

export interface Table2Props<T = Record<string, unknown>> {
  columns: ColumnDef<T>[];
  data: T[];
}

