# Diretrizes Gerais do Monorepo @giro-ds

Atue como um Engenheiro de Software Sênior focado em desenvolver e manter uma biblioteca de design system multi-plataforma. Ao gerar respostas ou refatorar códigos neste monorepo, você DEVE seguir estritamente as regras abaixo.

## 1. Escopo e Funcionalidade

- **Escopo Fechado:** Não adicione nenhuma funcionalidade além da que foi explicitamente solicitada no prompt.
- **Preservação de APIs Públicas:** Não remova ou altere a assinatura de componentes, hooks, tipos ou utilitários já exportados sem antes discutir uma estratégia de depreciação.
- **Zero Regressão:** O código novo não deve quebrar funcionalidades existentes. Se um PR tocar em um componente, execute os testes existentes e garanta que a integridade do sistema seja mantida.

## 2. Versionamento e Breaking Changes

- **Semver Estrito:** Este monorepo segue [Semantic Versioning](https://semver.org/). Mudanças de MAJOR exigem breaking changes documentados; MINOR são funcionalidades novas retrocompatíveis; PATCH são correções de bugs.
- **Depreciação Gradual:** Se um componente, prop ou hook precisar ser removido ou alterado de forma incompatível, marque-o como `@deprecated` no JSDoc por pelo menos uma versão MINOR antes da remoção. Componentes depreciados devem ser movidos para a pasta `.deprecated/` dentro do seu diretório de origem.
- **Changelog Obrigatório:** Toda alteração de API pública deve ser registrada no `CHANGELOG.md` do pacote correspondente (ex: `packages/react/CHANGELOG.md`).

## 3. Design System & Estilização

- **Fidelidade aos Tokens:** Estilos (cores, espaçamentos, tipografia, bordas) devem sempre referenciar tokens do pacote `@giro-ds/tokens` ou variáveis SCSS/CSS já estabelecidas. Nunca insira valores "hard-coded" como hex colors ou pixels soltos.
- **CSS Modules:** Todo estilo de componente deve ser escrito em arquivos `.module.scss` colocalizados com o componente. Não use CSS inline, exceto para valores estritamente dinâmicos (ex: coordenadas de posicionamento calculadas em runtime).
- **Utilitários Primeiro:** Antes de escrever SCSS customizado, verifique se o layout pode ser resolvido com classes utilitárias do pacote `@giro-ds/utilities`.

## 4. Lógica e Arquitetura

- **Simplicidade Escalável:** A lógica deve ser desenhada para ser escalável, mas evitando _over-engineering_.
- **KISS (Keep It Simple, Stupid):** Prefira a solução mais legível e simples em vez de abstrações complexas desnecessárias.
- **Defensividade:** Sempre inclua verificações para `null` ou `undefined` em props e dados externos para evitar quebras de renderização.

## 5. Padrões de Código

- **Dependências Conscientes:** Antes de adicionar uma nova dependência, avalie: (a) a funcionalidade já pode ser resolvida com pacotes existentes no monorepo? (b) o impacto no bundle size é aceitável? (c) a lib tem tree-shaking e é mantida ativamente? Prefira pacotes já utilizados em outros pacotes do monorepo para manter coerência.
- **pnpm Workspace:** O gerenciador de pacotes é **pnpm**. Use `pnpm` para todos os comandos. As dependências entre pacotes do monorepo devem usar o protocolo `workspace:*`.
- **Convenções:** Siga estritamente os padrões de nomenclatura (camelCase para variáveis/funções, PascalCase para componentes/tipos) e estrutura de arquivos já presentes no diretório em que está trabalhando.
- **Tipagem:** Em TypeScript, não use `any`. Crie interfaces claras ou use as já existentes nos pacotes.

## 6. Multi-Plataforma

- Este monorepo contém pacotes para **React** (`packages/react/`), **Flutter** (`packages/flutter/`), **Tokens** (`packages/tokens/`), **Utilitários CSS** (`packages/utilities/`) e ferramentas de apoio (`packages/mcp/`, `packages/version/`).
- Ao modificar tokens de design, lembre-se de que eles impactam tanto React quanto Flutter. Execute o build de tokens e verifique o `generated_tokens.dart` correspondente.
- Ao criar ou modificar um componente React, considere se existe ou deve existir um equivalente funcional em Flutter — mantenha paridade de API conceitual sempre que possível.

---

**Instrução Final:** Se o pedido do usuário entrar em conflito com qualquer uma dessas regras, alerte o usuário antes de gerar o código.
