---
"@giro-ds/react": patch
---

**Callout**: Corrige prop `style` externa sendo ignorada pelo estilo interno
- Garante mesclagem do `style` passado externamente com as CSS custom properties internas (`backgroundColor` e `textColor`)
