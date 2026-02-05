---
"@giro-ds/react": patch
---

fix(DatePicker): corrige digitação manual e seleção via calendário

- Corrige TextField para sincronizar estado interno com prop value externa
- Remove DIV wrapper que interceptava eventos do TextField
- Adiciona props disabled, id, className, data-testid ao TextField interno
- Conecta minDate/maxDate ao componente Calendar
- Remove estilo inline do ícone, substituindo por classes CSS
