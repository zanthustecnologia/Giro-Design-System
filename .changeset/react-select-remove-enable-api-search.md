---
"@giro-ds/react": major
---

### Breaking Changes

- **Select:** remove a prop `enableApiSearch`; a busca via API passa a ser ativada pela presença de `onApiSearch`, que desativa o filtro local e deixa a filtragem a cargo do consumidor. Quem usava `enableApiSearch={false}` junto com `onApiSearch` para manter o filtro local deve parar de passar `onApiSearch`.
- **Select:** remove a prop `enableInfiniteScroll`; o scroll infinito passa a ser ativado pela presença de `onScrollEnd`. Para indicar que não há mais páginas, use `hasMore={false}`; para desligar o recurso, deixe de passar `onScrollEnd`.
- **Select:** remove a prop `multiple`, que nunca teve efeito; a seleção múltipla é feita apenas por `variant="checkbox"`.
