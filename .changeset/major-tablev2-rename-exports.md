---
"@giro-ds/react": major
---

**TableV2**: Renomeia exports do TanStack para evitar conflito de nomes
- **Alterado**: `createColumnHelper` → `createTableColumnHelper`
- **Alterado**: `ColumnDef` → `TableColumnDefinition`
- **Como migrar**:
  ```tsx
  // Antes
  import { createColumnHelper, ColumnDef } from '@giro-ds/react'

  // Depois
  import { createTableColumnHelper, TableColumnDefinition } from '@giro-ds/react'
  ```
