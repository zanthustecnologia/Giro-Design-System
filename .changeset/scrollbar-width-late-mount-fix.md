---
"@giro-ds/react": patch
---

Corrige `useScrollbarWidth` (usado por `Modal` e `Drawer`) retornando largura `0` quando o elemento rolável monta em um render posterior ao de `isOpen`/`children` (ex.: conteúdo do `Dialog.Content` do Radix). O hook agora captura o elemento via callback ref em vez de um `RefObject` externo, garantindo que a medição rode assim que o elemento existir.
