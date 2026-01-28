import { ReactNode, CSSProperties } from 'react';

// =============================================================================
// TIPOS BASE
// =============================================================================

/**
 * Tipo base para representar uma linha de dados da tabela.
 * Pode ser qualquer objeto com propriedades string.
 * 
 * @remarks
 * Este tipo serve como fallback quando não é especificado um tipo genérico.
 * Recomenda-se usar o generic `<T>` para ter type-safety completo.
 * 
 * @example
 * ```tsx
 * // Uso básico (usa TableRowData)
 * <Table dataSource={data} />
 * 
 * // Uso recomendado (com tipo específico)
 * type User = { id: number; name: string };
 * <Table<User> dataSource={users} />
 * ```
 */
export type TableRowData = Record<string, any>;

// =============================================================================
// TIPOS AUXILIARES
// =============================================================================

/**
 * Tipos de coluna suportados pela tabela.
 */
export type TableColumnType = 'text' | 'datetime' | 'custom';

/**
 * Opções de alinhamento para colunas da tabela.
 */
export type TableAlign = 'left' | 'center' | 'right';

// =============================================================================
// INTERFACES DE CONFIGURAÇÃO
// =============================================================================

/**
 * Configuração de uma coluna da tabela.
 * 
 * @typeParam T - Tipo dos dados da linha (padrão: TableRowData)
 * 
 * @example
 * ```tsx
 * type Product = { id: number; name: string; price: number };
 * 
 * const columns: TableColumn<Product>[] = [
 *   { key: 'name', label: 'Nome' },
 *   { key: 'price', label: 'Preço', align: 'right' },
 *   { 
 *     key: 'custom', 
 *     label: 'Ações',
 *     render: (row) => <button>Ver {row.name}</button>
 *   }
 * ];
 * ```
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
  /** Alinhamento do conteúdo da coluna */
  align?: TableAlign;
  /** Estilos CSS customizados para a coluna */
  style?: CSSProperties;
}

// =============================================================================
// INTERFACE PRINCIPAL
// =============================================================================

/**
 * Props do componente Table.
 * 
 * @typeParam T - Tipo dos dados da linha (padrão: TableRowData)
 * 
 * @remarks
 * O componente Table suporta TypeScript Generics para type-safety completo.
 * Especifique o tipo dos seus dados usando `<T>` para ter autocomplete e validação.
 * 
 * @example
 * Uso básico
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Nome' },
 *     { key: 'age', label: 'Idade' }
 *   ]}
 *   dataSource={data}
 * />
 * ```
 * 
 * @example
 * Uso com tipo específico e seleção de linhas
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * <Table<User>
 *   columns={[
 *     { key: 'name', label: 'Nome' },
 *     { key: 'email', label: 'Email' }
 *   ]}
 *   dataSource={users}
 *   rowSelection={{
 *     selectedRowKeys: selectedKeys,
 *     onChange: (keys, rows) => {
 *       // rows é User[] automaticamente
 *       console.log(rows[0].email);
 *     }
 *   }}
 * />
 * ```
 */
export interface TableProps<T = TableRowData> {
  /** Configuração das colunas da tabela */
  columns: TableColumn<T>[];
  /** Array de dados a serem exibidos na tabela */
  dataSource: T[];
  /** Classe CSS customizada para o container da tabela */
  className?: string;
  /** Estado de carregamento da tabela */
  loading?: boolean;
  /** Configuração de seleção de linhas */
  rowSelection?: {
    /** Keys das linhas atualmente selecionadas (modo controlado) */
    selectedRowKeys?: (string | number)[];
    /** Callback executado quando a seleção muda */
    onChange?: (keys: (string | number)[], rows: T[]) => void;
    /** Função para customizar props dos checkboxes individuais */
    getCheckboxProps?: (row: T, index: number) => { disabled?: boolean };
    /** Desabilita o checkbox "selecionar todos" */
    disableSelectAll?: boolean;
  };
  /** Configurações de localização/i18n */
  locale?: {
    /** Texto exibido quando não há dados */
    emptyText?: ReactNode;
  };
  /** Configuração de eventos de linha */
  onRow?: (row: T, index: number) => {
    /** Evento de clique simples na linha */
    onClick?: () => void;
    /** Evento de clique duplo na linha */
    onDoubleClick?: () => void;
    /** Classe CSS customizada para a linha */
    className?: string;
  };
}
