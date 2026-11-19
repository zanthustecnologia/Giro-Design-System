---
"@giro-ds/react": patch
---

Corrige o `aria-describedby` do `TextArea`: o atributo só é definido quando o texto de ajuda/erro é realmente renderizado. Antes, `<TextArea error />` sem `errorMessage`, validação interna ou `helperText` apontava para um elemento inexistente. Mesma correção aplicada ao `TextField`.
