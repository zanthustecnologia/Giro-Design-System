---
"@giro-ds/react": major
---

**Breaking change no `DatePicker`:** a prop `error` deixa de ser `string` e passa a ser `boolean`, e a mensagem vai para a nova prop `errorMessage`, no mesmo padrão do `TextField`.

- `error?: boolean` sinaliza o erro externo (react-hook-form, formik, etc.).
- `errorMessage?: string` é exibida no lugar do `helperText` quando `error` é `true`.
- A concatenação `"helperText • error"` foi removida: com erro, a mensagem substitui o `helperText`, como no `TextField`.
- Os erros internos de validação ("Data inválida", "Data fora do intervalo permitido") continuam com prioridade sobre o erro externo.

Migração:

```tsx
// antes
<DatePicker error={errors.date?.message} />

// depois
<DatePicker error={!!errors.date} errorMessage={errors.date?.message} />
```
