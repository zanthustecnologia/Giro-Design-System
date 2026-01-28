import { ReactNode, CSSProperties } from 'react';

export type TableColumnType = 'text' | 'datetime' | 'custom';
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<T = TableRowData> {
  key: string;
  label: ReactNode;
  type?: TableColumnType;
  format?: string;
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  style?: CSSProperties;
}

export type TableRowData = Record<string, any>;

export interface TableProps<T = TableRowData> {
  columns: TableColumn<T>[];
  dataSource: T[];
  className?: string;
  loading?: boolean;
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (keys: (string | number)[], rows: T[]) => void;
    getCheckboxProps?: (row: T, index: number) => { disabled?: boolean };
    disableSelectAll?: boolean;
  };
  locale?: {
    emptyText?: ReactNode;
  };
  /** Eventos de linha */
  onRow?: (row: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
}
