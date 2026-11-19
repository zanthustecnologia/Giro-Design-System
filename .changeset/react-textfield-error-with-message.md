---
"@giro-ds/react": patch
---

Corrige a cor do texto de ajuda do `TextField` no modo `attachedToVirtualKeyboard` (usado pelo `VirtualKeyboard` em `variant="fixed"`): a classe `errorWithMessage` passa a depender do estado de erro (`hasError`) e não apenas da presença de `errorMessage`. Antes, informar `errorMessage` sem erro ativo deixava o `helperText` vermelho.
