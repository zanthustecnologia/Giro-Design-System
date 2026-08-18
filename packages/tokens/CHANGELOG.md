# @giro-ds/tokens

## [2.0.0]

### Breaking Changes

- **Build:** renomeia `index.css` para `giro-tokens.css`.

### Features

- **Build:** adiciona formatos SCSS por camada (`core.scss`, `semantic.scss`, `components.scss`) em `build/scss/`.
- **Build:** unifica configs de build em arquivo unico; `giro-tokens.css` passa a ser o entry point importando `core.css`, `semantic.css` e `components.css`.

## [1.2.0] - 2026-08-05

### Features

- **Tokens:** adiciona tokens de componente `toggleButton.*` para o novo componente `ToggleButton`.

## [1.1.0]

### Features

- **Tokens:** introduz arquitetura core/semantic/theme com tokens de border, color, motion, opacity, radius, shadow, size, spacing e typography
- **Tokens:** adiciona tema dark, tokens de componente (Avatar, Button, Calendar) e saída Dart para Flutter
- **Build:** novos outputs em `build-next/`: `core.css`, `semantic.css`, `components.css`, `themes/dark.css`, `tokens.scss`, `tokens.js` e `tokens.dart`

## 1.0.1

### Bug Fixes

- **Documentação:** adiciona arquivos README aos pacotes

## 1.0.0

### Features

- **Release Inicial:** lançamento do pacote `@giro-ds/tokens` com design tokens completos em CSS, SCSS e JavaScript gerados via Style Dictionary

## Histórico anterior (@zanthus/tokens)

O pacote foi migrado de `@zanthus/tokens` para `@giro-ds/tokens@1.0.0`.
Para consultar o histórico completo de versões anteriores, veja as tags Git com prefixo `@zanthus/`.
