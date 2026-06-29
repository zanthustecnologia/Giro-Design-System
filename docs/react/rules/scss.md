# Diretrizes de Estilização (SCSS / Sass)

O projeto adota uma abordagem híbrida focada em utilitários e estilos escopo/componentizados.

## 1. Prioridade de Estilização
- **Classes Utilitárias:** Dê sempre prioridade absoluta ao desenvolvimento utilizando as classes utilitárias fornecidas pelo pacote `utilities` do `@giro-ds`. Evite escrever SCSS customizado se o layout puder ser resolvido com utilitários.

## 2. Estrutura e Escopo de Arquivos SCSS
- **CSS Modules (Obrigatório):** Todo arquivo `.scss` criado no projeto DEVE usar a extensão `.module.scss` e ser importado como CSS Module (`import styles from './Componente.module.scss'`). As classes devem ser referenciadas via objeto `styles` nos componentes (`className={styles.minhaClasse}`). Isso garante escopo local e evita colisão de nomes globais.
- **Proibição de CSS Inline (Crítico):** Não utilize estilos inline (`style="..."` ou `style={{...}}`) nos elementos JSX/TSX. Toda a estilização deve ser centralizada nas classes utilitárias do `@giro-ds` ou em arquivos de estilo locais.
- **Arquivos Locais:** Quando for necessário criar arquivos `.scss` customizados, eles devem ser colocados dentro da pasta do respectivo componente ou página onde serão consumidos.
- **Estilos Reutilizáveis:** Estilos globais e estruturas que precisam ser reutilizadas em diferentes locais do app devem ser criados em formato de `mixins` ou adicionados diretamente no arquivo `globals.scss` localizado na pasta `src/styles/`.

## 3. Boas Práticas de Escrita
- **Aninhamento Limitado (Nesting):** Evite aninhamentos excessivos no SCSS. O limite máximo aceitável é de 3 níveis de profundidade para manter a especificidade sob controle e evitar problemas de performance de renderização.
- **Uso de Design Tokens:** Nunca insira cores em formato Hexadecimal (`#FFF`) ou espaçamentos estáticos diretamente. Use sempre as variáveis e tokens de design providas pelo ecossistema do `@giro-ds`.