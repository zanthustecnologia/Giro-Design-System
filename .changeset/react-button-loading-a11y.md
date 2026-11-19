---
"@giro-ds/react": patch
---

Corrige o `Button` durante `loading`:

- O botão mantém o nome acessível: o conteúdo continua oculto apenas visualmente (`opacity: 0`) e deixou de ser `aria-hidden`, então leitores de tela anunciam o texto junto com `aria-busy`. Os ícones continuam `aria-hidden`.
- O `<button>` nativo passa a receber `disabled` durante `loading`, bloqueando o submit nativo (clique ou Enter num campo) em `type="submit"`. O visual de `loading` não muda: os estilos de `:disabled` não se aplicam a botões em `loading`. Como todo `<button disabled>`, o botão perde o foco ao entrar em `loading`.
