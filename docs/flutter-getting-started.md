# 📱 Guia de Início Rápido - Flutter

Este guia ajudará você a configurar e começar a trabalhar com os componentes Flutter do Zanthus Design System.

## 📋 Pré-requisitos

### 1. Instalar Flutter SDK

**Windows:**

1. Baixe o Flutter SDK: https://docs.flutter.dev/get-started/install/windows
2. Extraia o arquivo ZIP
3. Adicione `flutter\bin` ao PATH do sistema
4. Execute no terminal:
   ```bash
   flutter doctor
   ```

**Verificar instalação:**
```bash
flutter --version
```

### 2. Configurar Editor

**VS Code (Recomendado):**

1. Instale a extensão "Flutter" (Dart Code)
2. Instale a extensão "Dart"

**Verificar:**
- Abra a paleta de comandos (Ctrl+Shift+P)
- Digite "Flutter: New Project" para verificar se está funcionando

## 🚀 Começando

### 1. Instalar Dependências

No diretório raiz do monorepo:

```bash
# Instalar dependências do pacote de componentes
cd packages/components-flutter
flutter pub get

# Instalar dependências do Storybook Flutter
cd ../../apps/storybook-flutter
flutter pub get
```

### 2. Executar Widgetbook (Storybook Flutter)

```bash
cd apps/storybook-flutter
flutter run
```

**Opções de execução:**

- **Chrome (Web):**
  ```bash
  flutter run -d chrome
  ```

- **Windows:**
  ```bash
  flutter run -d windows
  ```

- **Android Emulator:**
  ```bash
  flutter emulators --launch <emulator_id>
  flutter run -d <device_id>
  ```

### 3. Listar Dispositivos Disponíveis

```bash
flutter devices
```

## 📦 Usando os Componentes

### Criar um Novo Projeto Flutter

```bash
# No diretório que você quiser
flutter create meu_app
cd meu_app
```

### Adicionar Dependência Local

Edite `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  zanthus_flutter:
    path: ../packages/components-flutter  # Ajuste o caminho conforme necessário
```

Depois execute:

```bash
flutter pub get
```

### Exemplo de Uso

```dart
import 'package:flutter/material.dart';
import 'package:zanthus_flutter/zanthus_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Zanthus Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Zanthus Components'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(ZanthusSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Avatar
            const ZanthusAvatar(
              initials: 'AB',
              size: ZanthusAvatarSize.large,
            ),
            
            const SizedBox(height: ZanthusSpacing.lg),
            
            // Button
            ZanthusButton(
              text: 'Click me',
              variant: ZanthusButtonVariant.primary,
              size: ZanthusButtonSize.medium,
              onPressed: () {
                print('Button pressed!');
              },
            ),
            
            const SizedBox(height: ZanthusSpacing.lg),
            
            // Card
            ZanthusCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: const [
                  ZanthusText.h3('Card Title'),
                  SizedBox(height: ZanthusSpacing.sm),
                  ZanthusText.body('This is a card with some content.'),
                ],
              ),
            ),
            
            const SizedBox(height: ZanthusSpacing.lg),
            
            // Badge
            const ZanthusBadge(
              text: 'New',
              variant: ZanthusBadgeVariant.primary,
            ),
          ],
        ),
      ),
    );
  }
}
```

## 🎨 Usando Design Tokens

```dart
// Cores
Container(
  color: ZanthusColors.primary,
  child: Text(
    'Texto',
    style: TextStyle(color: ZanthusColors.onPrimary),
  ),
)

// Espaçamento
Padding(
  padding: EdgeInsets.all(ZanthusSpacing.md),
  child: ...
)

// Tipografia
Text(
  'Título',
  style: ZanthusTypography.heading1,
)

// Border Radius
Container(
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: ZanthusBorderRadius.borderRadiusMd,
  ),
)

// Sombras
Container(
  decoration: BoxDecoration(
    color: Colors.white,
    boxShadow: ZanthusShadows.shadowMd,
  ),
)
```

## 🧪 Rodando Testes

```bash
cd packages/components-flutter
flutter test
```

## 🔧 Comandos Úteis

```bash
# Analisar código
flutter analyze

# Formatar código
flutter format .

# Verificar problemas
flutter doctor -v

# Limpar build
flutter clean

# Obter dependências
flutter pub get

# Atualizar dependências
flutter pub upgrade

# Ver versão do Flutter
flutter --version

# Listar emuladores
flutter emulators

# Criar emulador Android
flutter emulators --create

# Hot reload (durante execução)
# Pressione 'r' no terminal

# Hot restart (durante execução)
# Pressione 'R' no terminal

# Sair da aplicação
# Pressione 'q' no terminal
```

## 📱 Plataformas Suportadas

- ✅ Android
- ✅ iOS
- ✅ Web
- ✅ Windows
- ✅ macOS
- ✅ Linux

## 🐛 Troubleshooting

### Problema: `flutter: command not found`

**Solução:** Adicione o Flutter ao PATH do sistema.

### Problema: Dependências não encontradas

**Solução:**
```bash
flutter pub get
flutter clean
flutter pub get
```

### Problema: Widgetbook não inicia

**Solução:**
```bash
cd apps/storybook-flutter
flutter clean
flutter pub get
flutter run
```

### Problema: Erros de compilação no Windows

**Solução:** Certifique-se de que o Visual Studio está instalado com suporte a C++.

## 📚 Recursos Adicionais

- [Documentação Flutter](https://docs.flutter.dev/)
- [Flutter Samples](https://flutter.github.io/samples/)
- [Widgetbook Documentation](https://docs.widgetbook.io/)
- [Material Design Guidelines](https://m3.material.io/)

## 🆘 Precisa de Ajuda?

1. Verifique a documentação em `packages/components-flutter/README.md`
2. Veja exemplos no Widgetbook em `apps/storybook-flutter/lib/stories/`
3. Consulte o `CONTRIBUTING.md` para guidelines de desenvolvimento

---

**Próximos Passos:**

1. ✅ Execute o Widgetbook para ver todos os componentes
2. ✅ Explore os exemplos nas stories
3. ✅ Crie seu primeiro app usando os componentes
4. ✅ Customize os tokens conforme sua necessidade
