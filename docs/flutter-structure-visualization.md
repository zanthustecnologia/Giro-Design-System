# Estrutura Flutter

```text
design-system-monorepo/
├── packages/
│   ├── tokens/
│   │   ├── src/                     # fontes dos design tokens
│   │   └── build/dart/tokens.dart   # saída Dart do Style Dictionary
│   └── flutter/
│       ├── lib/
│       │   ├── flutter_giro.dart    # API pública
│       │   ├── components/          # componentes por família
│       │   ├── theme/               # tema Giro
│       │   ├── tokens/
│       │   │   ├── generated_tokens.dart
│       │   │   ├── design_tokens.dart
│       │   │   └── tokens.dart
│       │   └── types/
│       ├── analysis_options.yaml
│       └── pubspec.yaml
└── apps/
    └── widgetbook-flutter/
        ├── lib/
        │   ├── main.dart
        │   ├── stories/
        │   └── theme/
        ├── test/
        ├── analysis_options.yaml
        └── pubspec.yaml
```

## Fluxo de tokens

```text
packages/tokens/src
        │
        ▼
Style Dictionary
        │
        ├──► build/css, build/scss e build/js
        └──► build/dart/tokens.dart
                       │
                       ▼
packages/flutter/lib/tokens/generated_tokens.dart
                       │
                       ▼
GiroTokens e wrappers GiroColors/GiroSpacing/...
```

## Fluxo de desenvolvimento

1. O componente é implementado em `packages/flutter/lib/components/`.
2. Sua API pública é adicionada a `flutter_giro.dart`.
3. A demonstração é criada em `apps/widgetbook-flutter/lib/stories/`.
4. `pnpm check:flutter` valida análise e smoke test.
5. `pnpm check:tokens` confirma que os tokens Dart continuam sincronizados.

O Hub não participa desse fluxo nem do pipeline enquanto estiver em desenvolvimento.
