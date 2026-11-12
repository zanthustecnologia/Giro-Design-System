---
"@giro-ds/react": major
---

### Breaking Changes

- **Menu:** remove as props `enableInfiniteScroll`, `onScrollEnd`, `isLoadingMore`, `enableApiSearch` e `onApiSearch`; busca remota via API e scroll infinito deixam de existir no componente, que passa a trabalhar apenas com a lista de `items` recebida (a busca local via `search` continua disponível).
- **Menu:** remove a prop `type` (`'text' | 'icon'`), que nunca teve efeito e era repassada ao DOM; `selectedItems` passa a ser controlado de verdade, sem estado interno divergente quando o pai não atualiza a prop, e o Menu é documentado como single-select.

### Removed

- **Menu:** remove o estilo `.loadingMore` e as stories/documentação de busca via API e scroll infinito.
