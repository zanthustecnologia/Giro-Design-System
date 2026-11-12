---
"@giro-ds/react": patch
---

### Bug Fixes

- **Menu:** corrige o retorno de foco ao trigger após selecionar um item com o mouse, que deixava `document.activeElement` em `document.body`; o foco agora volta como na seleção por teclado, sem abrir o tooltip do trigger no caso do mouse.
- **Menu:** com `search`, o campo de busca recebe foco ao abrir o menu pelo teclado e `ArrowDown` move o foco para o primeiro item habilitado; antes, digitar uma letra disparava o typeahead do Radix em vez de escrever no campo.
