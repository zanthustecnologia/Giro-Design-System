# Padrões de Documentação de Arquivos Types

Este guia define os padrões para documentar arquivos `.types.ts` no design system, garantindo consistência, clareza e boa experiência de desenvolvimento (DX) com IntelliSense.

## Princípios Fundamentais

### 1. Documentação Concisa e Útil
- **Objetivo:** Fornecer informação essencial sem poluir o código
- **Foco:** Comentários que aparecem no IntelliSense e ajudam o desenvolvedor
- **Evitar:** Exemplos longos, comentários óbvios, verbosidade desnecessária

### 2. Comentários Inline Essenciais
- **Sempre incluir** comentários inline nas propriedades (aparecem no autocomplete)
- Comentários devem ter **1 linha** quando possível
- Para funções/callbacks: incluir assinatura resumida no comentário

### 3. TSDoc Estratégico
- Usar TSDoc (`/** */`) nas interfaces/types principais
- Incluir `@typeParam` quando usar generics
- Incluir `@example` inline (1 linha) quando útil
- **NÃO usar:** `@remarks` extensos, separadores `===`, exemplos multi-linha

## Estrutura Padrão de Arquivo

```typescript
import { ReactNode, CSSProperties } from 'react';

/**
 * [Descrição concisa do tipo base]. Use `<Component<SeuTipo>>` para type-safety.
 * @example <Component<User> data={users} />
 */
export type BaseType = Record<string, any>;

/** [Descrição concisa de tipo auxiliar] */
export type AuxiliaryType = 'option1' | 'option2' | 'option3';

/**
 * [Descrição concisa da interface principal]
 * @typeParam T - [Descrição do generic]
 */
export interface ComponentProps<T = BaseType> {
  /** [Descrição concisa da prop obrigatória] */
  requiredProp: string;
  
  /** [Descrição da prop opcional] */
  optionalProp?: boolean;
  
  /** [Descrição da função]: (param1, param2) => returnType */
  callback?: (param1: T, param2: number) => void;
  
  /** [Descrição de objeto aninhado] */
  nestedConfig?: {
    /** [Descrição da propriedade aninhada] */
    nestedProp?: string;
    /** [Descrição de callback aninhado]: (param) => type */
    onChange?: (value: T) => void;
  };
}
```

## Regras Específicas

### ✅ Tipos Base e Auxiliares

```typescript
// ✅ CORRETO - Conciso com exemplo inline
/**
 * Tipo base para dados da tabela. Use `<Table<SeuTipo>>` para type-safety completo.
 * @example <Table<User> dataSource={users} />
 */
export type TableRowData = Record<string, any>;

/** Tipos de coluna suportados */
export type TableColumnType = 'text' | 'datetime' | 'custom';

// ❌ EVITAR - Verboso com exemplos longos
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
 * // Uso básico
 * <Table dataSource={data} />
 * // Uso recomendado
 * <Table<User> dataSource={users} />
 * ```
 */
export type TableRowData = Record<string, any>;
```

### ✅ Interfaces com Generics

```typescript
// ✅ CORRETO - TSDoc principal conciso + comentários inline
/**
 * Configuração de coluna da tabela
 * @typeParam T - Tipo dos dados da linha
 */
export interface TableColumn<T = TableRowData> {
  /** Chave única identificadora da coluna */
  key: string;
  /** Função customizada para renderizar o conteúdo da célula */
  render?: (row: T, index: number) => ReactNode;
}

// ❌ EVITAR - Sem comentários inline
export interface TableColumn<T = TableRowData> {
  key: string;
  render?: (row: T, index: number) => ReactNode;
}
```

### ✅ Callbacks e Funções

```typescript
// ✅ CORRETO - Assinatura resumida no comentário
/** Callback quando seleção muda: (keys, rows) => void */
onChange?: (keys: (string | number)[], rows: T[]) => void;

/** Customiza props dos checkboxes: (row, index) => { disabled? } */
getCheckboxProps?: (row: T, index: number) => { disabled?: boolean };

// ❌ EVITAR - Sem assinatura ou muito verboso
/** Callback executado quando a seleção de linhas é alterada */
onChange?: (keys: (string | number)[], rows: T[]) => void;
```

### ✅ Objetos Aninhados

```typescript
// ✅ CORRETO - Comentários inline em todos os níveis
/** Configuração de seleção de linhas */
rowSelection?: {
  /** Keys das linhas selecionadas (modo controlado) */
  selectedRowKeys?: (string | number)[];
  /** Callback quando seleção muda: (keys, rows) => void */
  onChange?: (keys: (string | number)[], rows: T[]) => void;
};

/** Eventos de linha: (row, index) => { onClick?, onDoubleClick?, className? } */
onRow?: (row: T, index: number) => {
  /** Clique simples na linha */
  onClick?: () => void;
  /** Clique duplo na linha */
  onDoubleClick?: () => void;
};
```

## Checklist de Qualidade

Ao documentar um arquivo `.types.ts`, verifique:

- [ ] **Importações no topo** (React types quando necessário)
- [ ] **TSDoc nas interfaces principais** com `@typeParam` se generic
- [ ] **Comentários inline em TODAS as propriedades** (aparecem no IntelliSense)
- [ ] **Comentários de 1 linha** sempre que possível
- [ ] **Assinatura resumida** para callbacks: `(param1, param2) => type`
- [ ] **Exemplo inline** quando útil: `@example <Component<Type> />`
- [ ] **Sem `@remarks`** extensos ou separadores `===`
- [ ] **Sem exemplos multi-linha** em blocos de código
- [ ] **Sem comentários óbvios** (ex: "Estado de carregamento" para `loading`)

## Exemplo Completo (Referência)

Veja o arquivo [Table.types.ts](../../packages/react/src/components/Table/Table.types.ts) como referência de documentação bem feita seguindo esses padrões.

**Características principais:**
- 73 linhas (conciso)
- Comentários inline em todas as props
- TSDoc estratégico apenas onde agrega valor
- Assinaturas resumidas em callbacks
- Exemplo inline no tipo base
- Zero verbosidade desnecessária

## Alinhamento com Rules.md

Esta documentação segue as diretrizes de:
- **KISS:** Simplicidade em vez de complexidade desnecessária
- **Tipagem:** Não usar `any` sem justificativa (com `eslint-disable` quando necessário)
- **Convenções:** Padrões consistentes de nomenclatura e estrutura
- **Zero Regressão:** Documentação que não quebra IntelliSense ou DX existente
