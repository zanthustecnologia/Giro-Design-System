# Diretrizes de Estilização (SCSS / Sass — Monorepo @giro-ds)

O projeto adota CSS Modules com SCSS, tokens de design centralizados e classes utilitárias.

## 1. Prioridade de Estilização
- **Classes Utilitárias:** Dê sempre prioridade ao uso das classes utilitárias fornecidas pelo pacote `@giro-ds/utilities` (`packages/utilities/`). Evite escrever SCSS customizado se o layout puder ser resolvido com utilitários.
- **Tokens de Design:** Consulte `packages/tokens/` como fonte da verdade para cores, espaçamentos, tipografia e bordas. Os tokens são gerados via Style Dictionary e consumidos tanto pelo React quanto pelo Flutter.

## 2. Estrutura e Escopo de Arquivos SCSS
- **CSS Modules (Obrigatório):** Todo arquivo `.scss` criado no projeto DEVE usar a extensão `.module.scss` e ser importado como CSS Module (`import styles from './Componente.module.scss'`). As classes devem ser referenciadas via objeto `styles` nos componentes (`className={styles.minhaClasse}`). Isso garante escopo local e evita colisão de nomes globais.
- **Proibição de CSS Inline (Crítico):** Não utilize estilos inline (`style="..."` ou `style={{...}}`) nos elementos JSX/TSX. Toda a estilização deve ser centralizada nas classes utilitárias do `@giro-ds/utilities` ou em arquivos de estilo locais.
- **Arquivos Locais:** Quando for necessário criar arquivos `.scss` customizados, eles devem ser colocados dentro da pasta do respectivo componente em `packages/react/src/components/`.
- **Estilos Globais:** Estilos estruturantes e variáveis que precisam ser reutilizadas em diferentes componentes devem ser adicionadas no arquivo `global.scss` localizado em `packages/react/src/styles/`. Prefira `mixins` para lógica reutilizável.

## 3. Boas Práticas de Escrita
- **Aninhamento Limitado (Nesting):** Evite aninhamentos excessivos no SCSS. O limite máximo aceitável é de 3 níveis de profundidade para manter a especificidade sob controle e evitar problemas de performance de renderização.
- **Uso de Design Tokens:** Nunca insira cores em formato Hexadecimal (`#FFF`), valores de `px` ou espaçamentos estáticos diretamente. Use sempre as variáveis e tokens de design providas pelo pacote `@giro-ds/tokens` ou definidas no arquivo de tokens SCSS (`packages/react/src/styles/tokens.js`).