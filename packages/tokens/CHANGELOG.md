# @giro-ds/tokens

## [1.1.0]

### Added

#### Tokens

Introduz arquitetura core/semantic/theme. Os tokens core cobrem border, color (brand, feedback, neutral), motion, opacity, radius, shadow, size, spacing e typography. Os tokens semânticos mapeiam os valores core para contextos de uso: background, border, focus, icon, interactive, surface e text.

Adiciona tema dark, tokens de componente para Avatar, Button e Calendar, e saída Dart para integração Flutter.

Novos outputs em `build-next/`: `core.css`, `semantic.css`, `components.css`, `themes/dark.css`, `tokens.scss`, `tokens.js` e `tokens.dart`.

## 1.0.1

### Patch Changes

- **Documentação**: Adiciona arquivos README aos pacotes

## 1.0.0

### Major Changes

- **Release Inicial**: Lançamento do pacote `@giro-ds/tokens`
  - Migração de `@zanthus/tokens` para `@giro-ds/tokens`
  - Design tokens completos do Zanthus Design System
  - Tokens disponíveis: cores (brand, feedback, neutral), espaçamentos, tipografia, bordas
  - Formatos: CSS, SCSS, JavaScript
  - Geração via Style Dictionary

## Histórico anterior (@zanthus/tokens)

O pacote foi migrado de `@zanthus/tokens` para `@giro-ds/tokens@1.0.0`.
Para consultar o histórico completo de versões anteriores, veja as tags Git com prefixo `@zanthus/`.
