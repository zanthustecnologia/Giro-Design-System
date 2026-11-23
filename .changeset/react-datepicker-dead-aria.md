---
"@giro-ds/react": patch
---

Remove do `DatePicker` os atributos `aria-describedby` e `aria-invalid` que eram sempre sobrescritos pelo `TextField` interno. O `aria-describedby` ainda apontava para um ID inexistente (`-help`). O `TextField` continua definindo os dois atributos a partir de `error`/`errorMessage`/`helperText`, sem mudança de comportamento.
