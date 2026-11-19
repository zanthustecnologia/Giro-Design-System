---
"@giro-ds/react": patch
---

Corrige o `aria-describedby` do `TextField`: o atributo só é definido quando o texto de ajuda/erro é realmente renderizado. Antes, `<TextField error />` sem `errorMessage`, validação interna ou `helperText` apontava para um elemento inexistente. A prioridade da mensagem exibida fica documentada: erro externo (`error` + `errorMessage`) > validação interna > `helperText`.
