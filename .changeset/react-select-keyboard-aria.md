---
"@giro-ds/react": patch
---

### Bug Fixes

- **Select:** corrige a navegação por teclado na variante `checkbox` e em itens com `children`; antes o foco não entrava na lista e os itens-pai eram inalcançáveis. Agora `ArrowUp`, `ArrowDown`, `Home` e `End` percorrem todos os itens (pulando os desabilitados), o foco inicial vai para o item selecionado ou o primeiro, e `ArrowDown` no campo de busca leva o foco ao primeiro item.
- **Select:** expõe o estado de erro ao leitor de tela com `aria-invalid` e `aria-describedby` no trigger, apontando para a mensagem de erro ou o texto de ajuda apenas enquanto renderizados.
- **Select:** itens-pai passam a expor `aria-expanded`; folhas da variante `checkbox` em itens com `children` passam a renderizar o `Checkbox`; itens desabilitados deixam de ser selecionáveis ao clicar.
- **Label:** marca o asterisco de campo obrigatório com `aria-hidden`, evitando que o leitor de tela o leia como parte do nome (afeta os componentes que usam o rótulo compartilhado).
