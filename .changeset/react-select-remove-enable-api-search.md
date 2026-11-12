---
"@giro-ds/react": major
---

### Breaking Changes

- **Select:** remove a prop `enableApiSearch`; a busca via API passa a ser ativada pela presença de `onApiSearch`, que desativa o filtro local e deixa a filtragem a cargo do consumidor. Quem usava `enableApiSearch={false}` junto com `onApiSearch` para manter o filtro local deve parar de passar `onApiSearch`.
