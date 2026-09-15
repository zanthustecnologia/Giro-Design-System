# React (`@giro-ds/react`) — Índice de Documentação

## Processo e versionamento

- [versioning-and-publishing.md](./versioning-and-publishing.md) — passo a passo para versionar e publicar no NPM via changesets.
- [giovani-guidelines.md](./giovani-guidelines.md) — como decidir patch/minor/major e preencher o MR corretamente.
- [changeset-template.md](./changeset-template.md) — formato padrão das entradas do `CHANGELOG.md`.

## Qualidade e testes

- [eslint-commands.md](./eslint-commands.md) — comandos de lint.
- [testing-commands.md](./testing-commands.md) — comandos de teste (Vitest).
- [testing-local-packages.md](./testing-local-packages.md) — como testar o pacote localmente antes de publicar (`npm pack`).

## Regras de código (`rules/`)

Diretrizes de padrão de código, usadas como referência em revisão manual e por agentes de IA:

- [rules/general.md](./rules/general.md) — regras gerais do monorepo (escopo, semver, depreciação, tokens).
- [rules/components.md](./rules/components.md) — estrutura e convenções de componentes React.
- [rules/scss.md](./rules/scss.md) — CSS Modules, tokens e boas práticas de SCSS.
- [rules/typescript.md](./rules/typescript.md) — tipagem, hooks e organização de tipos.

## Guias de migração (`migration-guides/`)

- [migration-guides/v2-to-v3.md](./migration-guides/v2-to-v3.md) — guia de migração v2 → v3.
- [migration-guides/react-19-migration.md](./migration-guides/react-19-migration.md) — checklist da migração React 18 → 19.
- [migration-guides/migration-template.md](./migration-guides/migration-template.md) — template para novos guias de migração major.
