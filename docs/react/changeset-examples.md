# Exemplos de Changesets

---

## Patch

```markdown
---
"@giro-ds/react": patch
---

**TextField**: Corrige erro ao digitar valores numéricos
```

```markdown
---
"@giro-ds/react": patch
---

**DatePicker**: Corrige lógica de validação e exibição de mensagens de erro
- Ajusta `helperText` para exibir mensagens customizadas quando há erro de validação
- Corrige prop `error` para refletir sempre o estado de validação
```

---

## Minor

```markdown
---
"@giro-ds/react": minor
---

**TextArea**: Novo componente com suporte completo a formulários
- Suporte a label e validação
- Contador de caracteres
- Controle de redimensionamento
```

```markdown
---
"@giro-ds/utilities": minor
---

**Classes Utilitárias**: Adiciona sistema de classes com suporte responsivo
- Breakpoints: sm, md, lg, xl, 2xl
- Classes de espaçamento (margin/padding)
- Utilitários de Flexbox e Grid
```

---

## Major

```markdown
---
"@giro-ds/react": major
---

**Calendar**: Migrado para react-day-picker v9
- **Removido**: Exports de tipos internos (`DayItem`, `EmptyItem`, `CalendarItem`, `YearItem`)
- **Alterado**: Prop `selectedDate` → `selected`
- **Alterado**: Prop `currentDate` agora é opcional
- **Como migrar**:
  ```tsx
  // Antes
  <Calendar selectedDate={date} currentDate={new Date()} />

  // Depois
  <Calendar selected={date} />
  ```
```

```markdown
---
"@giro-ds/react": major
---

**Select**: Prop `onChange` substituída por `onValueChange`
- **Alterado**: `onChange: (e: ChangeEvent) => void` → `onValueChange: (value: string) => void`
- **Como migrar**:
  ```tsx
  // Antes
  <Select onChange={(e) => setValue(e.target.value)} />

  // Depois
  <Select onValueChange={(value) => setValue(value)} />
  ```
```

---

## Múltiplos pacotes

```markdown
---
"@giro-ds/react": patch
"@giro-ds/tokens": patch
"@giro-ds/utilities": patch
---

**Documentação**: Adiciona arquivos README aos pacotes
```
