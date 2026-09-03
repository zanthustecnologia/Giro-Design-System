---
"@giro-ds/react": minor
---

### Features

- **VirtualKeyboard:** adiciona prop `nativeHeight` para customizar a altura do teclado no modo `native` (aceita qualquer valor CSS, ex.: `'320px'`, `'50dvh'`, `'40%'`); quando omitida, mantém o comportamento padrão de altura fluida baseada no viewport.

### Bug Fixes

- **VirtualKeyboard:** corrige altura do modo `native` (overlay), antes travada em valores fixos por breakpoint; agora a altura do overlay e das teclas (layouts QWERTY e numérico) escala de forma fluida via flexbox, com piso mínimo de 280px; largura máxima do layout numérico passa a escalar proporcionalmente (razão 360:280) conforme a altura aumenta.
