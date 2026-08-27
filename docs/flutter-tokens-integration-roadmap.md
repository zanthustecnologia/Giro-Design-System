# Integração de tokens React e Flutter

> Status: implementado.

Os tokens de React e Flutter têm uma única fonte em `packages/tokens/src`. O Style Dictionary gera os formatos consumidos pelas duas plataformas, evitando cópia manual de valores.

## Saídas

O comando abaixo gera CSS, SCSS, JavaScript e Dart:

```bash
pnpm check:tokens
```

As saídas Dart relevantes são:

```text
packages/tokens/build/dart/tokens.dart
packages/flutter/lib/tokens/generated_tokens.dart
```

`generated_tokens.dart` expõe `GiroTokens`. Os wrappers de conveniência, como `GiroColors`, `GiroSpacing`, `GiroTypography`, `GiroBorderRadius` e `GiroShadows`, ficam em `packages/flutter/lib/tokens/design_tokens.dart`.

## Regra de manutenção

- edite os arquivos-fonte em `packages/tokens/src`;
- não edite os arquivos gerados;
- execute `pnpm check:tokens` após alterar tokens;
- inclua as saídas geradas no mesmo commit quando houver mudança;
- execute `pnpm check:flutter` para validar o consumo Dart.

## Proteção na CI

O job `tokens` executa o build e falha quando encontra diferenças não versionadas em `packages/tokens/build` ou em `packages/flutter/lib/tokens/generated_tokens.dart`. Isso impede que uma alteração de fonte seja integrada sem os artefatos correspondentes.

Consulte o [pipeline de qualidade](./ci-pipeline.md) para o gate completo.
