# Guia de início rápido — Flutter

O pacote `flutter_giro` concentra os componentes Flutter do Giro Design System. O Widgetbook fica em `apps/widgetbook-flutter` e permite validar os componentes de forma interativa.

## Pré-requisitos

- Flutter estável com Dart 3;
- Chrome ou outro dispositivo suportado para executar o Widgetbook;
- dependências do monorepo já instaladas quando também for trabalhar com tokens.

Confira o ambiente:

```bash
flutter doctor -v
```

## Preparar os projetos

Na raiz do monorepo:

```bash
cd packages/flutter
flutter pub get

cd ../../apps/widgetbook-flutter
flutter pub get
```

## Executar o Widgetbook

```bash
pnpm widgetbook
```

Ou diretamente:

```bash
cd apps/widgetbook-flutter
flutter run -d chrome
```

## Consumir o pacote

Em um projeto dentro do mesmo repositório, adicione a dependência local:

```yaml
dependencies:
  flutter_giro:
    path: ../../packages/flutter
```

Depois importe o entry point público:

```dart
import 'package:flutter_giro/flutter_giro.dart';

GiroButton(
  text: 'Continuar',
  onPressed: () {},
)
```

Os helpers de tokens também são exportados pelo mesmo entry point:

```dart
Container(
  padding: const EdgeInsets.all(GiroSpacing.md),
  color: GiroColors.primary,
  child: const Text('Giro'),
)
```

## Validar alterações

O gate local usado pela CI é:

```bash
pnpm check:flutter
```

Ele executa análise estática no pacote e no Widgetbook, além do smoke test do aplicativo. Para validar todo o monorepo, use `pnpm check`.

## Adicionar um componente

1. Crie ou atualize o componente em `packages/flutter/lib/components/`.
2. Exporte a API pública em `packages/flutter/lib/flutter_giro.dart`.
3. Crie a story correspondente em `apps/widgetbook-flutter/lib/stories/`.
4. Rode `dart format`, `dart analyze` e os testes antes de abrir o merge request.

Consulte também a [referência de comandos](./flutter-commands-reference.md) e o [pipeline de qualidade](./ci-pipeline.md).
