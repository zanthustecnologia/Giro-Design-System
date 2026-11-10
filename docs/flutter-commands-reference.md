# 🚀 Comandos Rápidos - Flutter

Referência rápida de comandos para trabalhar com Flutter no Giro Design System.

## 📦 Instalação e Configuração

```bash
# Verificar instalação do Flutter
flutter doctor -v

# Instalar dependências - Pacote de componentes
cd packages/flutter
flutter pub get

# Instalar dependências - Widgetbook Flutter
cd apps/widgetbook-flutter
flutter pub get
```

## 🎨 Executar Widgetbook

```bash
# Via script do monorepo (raiz do repositório) - Recomendado
pnpm widgetbook

# Web (Chrome) - equivalente manual
cd apps/widgetbook-flutter
flutter run -d chrome

# Windows Desktop
cd apps/widgetbook-flutter
flutter run -d windows

# Listar dispositivos disponíveis
flutter devices
```

## 🔧 Desenvolvimento

```bash
# Análise de código
flutter analyze

# Formatar código
flutter format .

# Executar testes
flutter test

# Limpar build
flutter clean
```

## 📱 Build para Produção

```bash
# Web
cd apps/widgetbook-flutter
flutter build web

# Android APK
flutter build apk

# iOS
flutter build ios

# Windows
flutter build windows
```

## 🧪 Testes e Qualidade

```bash
# Rodar todos os testes
cd packages/flutter
flutter test

# Análise com mais detalhes
flutter analyze --verbose

# Verificar problemas
flutter doctor --verbose
```

## 📦 Gerenciamento de Pacotes

```bash
# Obter dependências
flutter pub get

# Atualizar dependências
flutter pub upgrade

# Listar dependências desatualizadas
flutter pub outdated

# Limpar cache
flutter pub cache clean
```

## 🔍 Debugging

```bash
# Executar em modo debug
flutter run --debug

# Executar em modo release
flutter run --release

# Executar em modo profile
flutter run --profile

# Observar logs
flutter logs
```

## ⌨️ Atalhos Durante Execução

Quando o app está rodando:

- `r` - Hot reload
- `R` - Hot restart
- `h` - Lista de comandos
- `c` - Limpar console
- `q` - Quit (sair)
- `d` - Detach (manter app rodando)
- `w` - Dump widget hierarchy
- `t` - Dump rendering tree
- `p` - Toggle performance overlay
- `P` - Toggle platform selector

## 🎯 Workflows Comuns

### Criar Novo Componente

```bash
# 1. Criar arquivo do componente
cd packages/flutter/lib/components/meu_componente
# Criar meu_componente.dart

# 2. Exportar no flutter_giro.dart
# Adicionar: export 'components/meu_componente/meu_componente.dart';

# 3. Criar story no Widgetbook
cd apps/widgetbook-flutter/lib/stories
# Criar meu_componente_story.dart

# 4. Registrar story no main.dart
# Importar e adicionar ao Widgetbook

# 5. Testar
pnpm widgetbook
```

### Atualizar Tokens

```bash
# 1. Editar tokens fonte (Style Dictionary)
cd packages/tokens/src
# Editar arquivo de token (ex: colors/brand-colors.json)

# 2. Rebuildar tokens (gera CSS/SCSS/JS/Dart e copia para packages/flutter)
cd ../
pnpm build

# 3. Verificar mudanças
cd ../flutter
flutter analyze

# 4. Testar no Widgetbook
pnpm widgetbook
```

### Publicar Versão

```bash
# 1. Atualizar CHANGELOG.md
cd packages/flutter
# Editar CHANGELOG.md

# 2. Atualizar versão no pubspec.yaml
# version: 0.5.0

# 3. Testar tudo
flutter test
flutter analyze

# 4. Commit e tag
git add .
git commit -m "feat: nova versão 0.5.0"
git tag v0.5.0
git push --tags
```

## 🆘 Troubleshooting Rápido

```bash
# Problemas com build
flutter clean
flutter pub get
flutter run

# Problemas com dependências
rm -rf pubspec.lock
flutter pub get

# Problemas com cache
flutter pub cache clean
flutter clean
flutter pub get

# Atualizar Flutter
flutter upgrade

# Verificar instalação
flutter doctor --verbose
```

## 📱 Emuladores

```bash
# Listar emuladores
flutter emulators

# Criar novo emulador
flutter emulators --create

# Executar emulador específico
flutter emulators --launch <emulator_id>

# Executar app em emulador
flutter run -d <device_id>
```

## 🌐 Web Específico

```bash
# Executar no Chrome
flutter run -d chrome

# Executar no Chrome com hot reload
flutter run -d chrome --web-renderer html

# Build otimizado para web
flutter build web --release

# Build para web com canvaskit
flutter build web --web-renderer canvaskit

# Servir build local
cd build/web
python -m http.server 8000
```

## 💡 Dicas

### Performance
```bash
# Build com tree shaking
flutter build apk --split-per-abi

# Análise de tamanho do bundle
flutter build apk --analyze-size
```

### Debugging
```bash
# Executar com observatory
flutter run --observatory-port=8888

# Executar com DevTools
flutter run --devtools
```

### Linting
```bash
# Aplicar todas as correções automáticas
dart fix --apply
```

## 📚 Links Úteis

- [Flutter Docs](https://docs.flutter.dev/)
- [Widgetbook Docs](https://docs.widgetbook.io/)
- [Dart Packages](https://pub.dev/)
- [Flutter Samples](https://flutter.github.io/samples/)

---

💡 **Dica:** Salve este arquivo como referência rápida ou crie aliases no seu terminal para os comandos mais usados!
