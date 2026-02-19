import { ReactNode, CSSProperties } from 'react';
import { BaseProps } from '../../types';

/**
 * Tipo base para dados da tabela. Use `<Table<SeuTipo>>` para type-safety completo.
 * @example <Table<User> dataSource={users} />
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableRowData = Record<string, any>;

/** Tipos de coluna suportados */
export type TableColumnType = 'text' | 'datetime' | 'custom';

/** Opções de alinhamento de coluna */
export type TableAlign = 'left' | 'center' | 'right';

/**
 * Configuração de coluna da tabela
 * @typeParam T - Tipo dos dados da linha
 */
export interface TableColumn<T = TableRowData> {
  /** Chave única identificadora da coluna */
  key: string;
  /** Conteúdo do cabeçalho da coluna */
  label: ReactNode;
  /** Tipo de dados da coluna */
  type?: TableColumnType;
  /** Formato de exibição (ex: 'dd/MM/yyyy' para datetime) */
  format?: string;
  /** Função customizada para renderizar o conteúdo da célula */
  render?: (row: T, index: number) => ReactNode;
  /** Alinhamento do conteúdo */
  align?: TableAlign;
  /** Estilos CSS customizados */
  style?: CSSProperties;
}

/**
 * Props do componente Table. Use genérico para autocomplete: `<Table<User>>`
 * @typeParam T - Tipo dos dados da linha
 */
export interface TableProps<T = TableRowData> extends BaseProps{
  /** Configuração das colunas */
  columns: TableColumn<T>[];
  /** Array de dados a serem exibidos */
  dataSource: T[];
  /** Estado de carregamento */
  loading?: boolean;
  /** Configuração de seleção de linhas */
  rowSelection?: {
    /** Keys das linhas selecionadas (modo controlado) */
    selectedRowKeys?: (string | number)[];
    /** Callback quando seleção muda: (keys, rows) => void */
    onChange?: (keys: (string | number)[], rows: T[]) => void;
    /** Customiza props dos checkboxes: (row, index) => { disabled? } */
    getCheckboxProps?: (row: T, index: number) => { disabled?: boolean };
    /** Desabilita o checkbox "selecionar todos" */
    disableSelectAll?: boolean;
  };
  /** Configurações de localização */
  locale?: {
    /** Texto quando não há dados */
    emptyText?: ReactNode;
  };
  /** Eventos de linha: (row, index) => { onClick?, onDoubleClick?, className? } */
  onRow?: (row: T, index: number) => {
    /** Clique simples na linha */
    onClick?: () => void;
    /** Clique duplo na linha */
    onDoubleClick?: () => void;
    /** Classe CSS da linha */
    className?: string;
  };
}
