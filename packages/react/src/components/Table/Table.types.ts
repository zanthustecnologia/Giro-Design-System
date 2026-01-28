import { ReactNode, CSSProperties } from 'react';

export type TableColumnType = 'text' | 'datetime' | 'custom';
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  label: ReactNode;
  type?: TableColumnType;
  format?: string;
  render?: (row: TableRowData, index: number) => ReactNode;
  align?: TableAlign;
  style?: CSSProperties;
}

export type TableRowData = Record<string, any>;

export interface TableProps {
  columns: TableColumn[];
  dataSource: TableRowData[];
  className?: string;
  loading?: boolean;
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (keys: (string | number)[], rows: TableRowData[]) => void;
    getCheckboxProps?: (row: TableRowData, index: number) => { disabled?: boolean };
    disableSelectAll?: boolean;
  };
  locale?: {
    emptyText?: ReactNode;
  };
  /** Eventos de linha */
  onRow?: (row: TableRowData, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
}
