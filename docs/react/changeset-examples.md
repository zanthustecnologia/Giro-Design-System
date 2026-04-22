# Exemplos de Changesets

Este arquivo contém exemplos práticos de como escrever changesets.
**NÃO COMMITE ESTE ARQUIVO** - é apenas referência.

---

## Exemplo 1: Patch (Bug Fix)

**Arquivo:** `.changeset/fix-textfield-numeric.md`
```markdown
---
"@giro-ds/react": patch
---

**TextField**: Corrige erro ao digitar valores numéricos
```

---

## Exemplo 2: Minor (Nova Feature)

**Arquivo:** `.changeset/add-textarea-component.md`
```markdown
---
"@giro-ds/react": minor
---

**TextArea**: Novo componente com suporte completo a formulários
  - Suporte a label e validação
  - Contador de caracteres
  - Controle de redimensionamento
```

---

## Exemplo 3: Major (Breaking Change - Único Componente)

**Arquivo:** `.changeset/migrate-calendar-radix.md`
```markdown
---
"@giro-ds/react": major
---

**Calendar**: Migrado para react-day-picker v9
  - **Removido**: Exports de tipos internos (DayItem, EmptyItem, CalendarItem, YearItem)
  - **Alterado**: Prop `selectedDate` → `selected`, prop `currentDate` agora é opcional
  - **Por quê**: Alinhamento com biblioteca padrão da comunidade e melhor manutenibilidade
  - **Como migrar**:
    ```tsx
    // Antes
    <Calendar selectedDate={date} currentDate={new Date()} />
    
    // Depois
    <Calendar selected={date} />
    ```
```

---

## Exemplo 4: Major (Múltiplas Breaking Changes)

**Arquivo:** `.changeset/radix-migration-v4.md`
```markdown
---
"@giro-ds/react": major
---

**Breaking Changes**: Migração para Radix UI e refatorações de API

- **Avatar**: Valores de tamanho alterados de 'small'/'large' para 'sm'/'lg' para alinhamento com Radix UI

- **Dialog**: Migração completa para Radix UI
  - **Removido**: Props show, onClose
  - **Alterado**: fnConfirm→onConfirm, fnCancel→onCancel

- **Toast**: Reescrita completa da API
  - Agora requer configuração ToastProvider/ToastContainer
  - API baseada em objetos: showToast({ title, iconType, ... })

**Novos Recursos:**
- **Button**: Adicionado tooltip automático para modo iconOnly com novas props
- **Popover**: Novo componente baseado em Radix UI com padrão trigger/content

**Melhorias:**
- **Container**: Refatoração interna com design tokens e testes abrangentes
- **Search**: Corrigido bug do useId() e melhorada acessibilidade
```

---

## Exemplo 5: Múltiplos Pacotes

**Arquivo:** `.changeset/update-docs.md`
```markdown
---
"@giro-ds/react": patch
"@giro-ds/tokens": patch
"@giro-ds/utilities": patch
---

**Documentação**: Adiciona arquivos README aos pacotes
```

---

## Exemplo 6: Utilities/Tokens (Sistema)

**Arquivo:** `.changeset/add-utility-classes.md`
```markdown
---
"@giro-ds/utilities": minor
---

**Sistema de Classes Utilitárias**: Adiciona sistema abrangente de classes utilitárias com suporte responsivo
  - Suporte para breakpoints (sm, md, lg, xl, 2xl)
  - Classes de espaçamento (margin/padding)
  - Utilitários de Flexbox e Grid
```

---

## ❌ ERROS COMUNS A EVITAR

### ❌ Não faça (com emojis e prefixos):
```markdown
---
"@giro-ds/react": patch
---

🐛 fix(TextField): corrige bug no input
```

### ✅ Faça (limpo e objetivo):
```markdown
---
"@giro-ds/react": patch
---

**TextField**: Corrige comportamento do input ao receber valores externos
```

---

### ❌ Não faça (em inglês):
```markdown
---
"@giro-ds/react": minor
---

feat: add new Button tooltip feature
```

### ✅ Faça (em português):
```markdown
---
"@giro-ds/react": minor
---

**Button**: Adiciona tooltip automático para modo iconOnly
```

---

### ❌ Não faça (sem contexto):
```markdown
---
"@giro-ds/react": patch
---

Corrige bug
```

### ✅ Faça (específico):
```markdown
---
"@giro-ds/react": patch
---

**Select**: Corrige navegação por teclado ao buscar em API externa
```
