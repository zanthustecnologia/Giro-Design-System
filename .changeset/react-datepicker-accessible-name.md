---
"@giro-ds/react": patch
---

Corrige o nome acessível do campo do `DatePicker`: o `aria-label="Open calendar"` fixo substituía o `label` visível e era sempre anunciado em inglês. Agora, com `label`, o nome vem do próprio label; sem `label`, o campo é anunciado como "Data" (`pt-br`) ou "Date" (`en-us`).
