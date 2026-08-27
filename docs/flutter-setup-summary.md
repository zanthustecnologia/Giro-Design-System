# Flutter no monorepo

O suporte Flutter está ativo e é composto por dois projetos:

- `packages/flutter`: pacote publicável `flutter_giro`;
- `apps/widgetbook-flutter`: catálogo interativo dos componentes.

## Pacote Flutter

O entry point público é `packages/flutter/lib/flutter_giro.dart`. Ele exporta os tokens, o tema Giro, componentes próprios e reexports de componentes Material 3 organizados em `lib/components/`.

Os componentes cobrem ações, navegação, seleção, entrada, apresentação de dados, layout e feedback. A lista válida é a definida pelos exports do entry point; a documentação não mantém uma contagem fixa para evitar divergência conforme a biblioteca cresce.

## Widgetbook

As stories ficam em `apps/widgetbook-flutter/lib/stories/`, separadas por família de componente. O aplicativo usa o pacote local por path dependency, permitindo visualizar alterações sem publicar uma versão.

Execute com:

```bash
pnpm widgetbook
```

## Tokens compartilhados

`packages/tokens` é a fonte dos tokens. O build do Style Dictionary produz saídas CSS, SCSS, JavaScript e Dart. A saída Dart é sincronizada em:

```text
packages/flutter/lib/tokens/generated_tokens.dart
```

O arquivo é gerado; alterações manuais serão sobrescritas. Os wrappers de uso ficam em `packages/flutter/lib/tokens/design_tokens.dart`.

## Qualidade

```bash
pnpm check:tokens
pnpm check:flutter
```

Na CI, o primeiro comando também é acompanhado por uma verificação de diff para impedir artefatos gerados desatualizados. O segundo analisa pacote e Widgetbook e executa o smoke test.

Veja o [guia de início](./flutter-getting-started.md) e o [pipeline de qualidade](./ci-pipeline.md).
