---
"@giro-ds/react": major
---

### Breaking Changes

- **Menu:** remove as props `enableInfiniteScroll`, `onScrollEnd`, `isLoadingMore`, `enableApiSearch` e `onApiSearch`; busca remota via API e scroll infinito deixam de existir no componente, que passa a trabalhar apenas com a lista de `items` recebida (a busca local via `search` continua disponível).

### Removed

- **Menu:** remove o estilo `.loadingMore` e as stories/documentação de busca via API e scroll infinito.
