# 📱 Guia de Início Rápido - Flutter

Este guia ajudará você a configurar e começar a trabalhar com os componentes Flutter do Giro Design System.

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
cd packages/flutter
flutter pub get

# Instalar dependências do Storybook Flutter
cd ../../apps/widgetbook-flutter
flutter pub get
```

### 2. Executar Widgetbook (Storybook Flutter)

```bash
cd apps/widgetbook-flutter
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
  flutter_giro:
    path: ../packages/flutter  # Ajuste o caminho conforme necessário
```

Depois execute:

```bash
flutter pub get
```

### Exemplo de Uso

```dart
import 'package:flutter/material.dart';
import 'package:flutter_giro/flutter_giro.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Giro Demo',
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
        title: const Text('Giro Components'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(GiroSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Avatar
            const GiroAvatar(
              initials: 'AB',
              size: GiroAvatarSize.large,
            ),
            
            const SizedBox(height: GiroSpacing.lg),
            
            // Button
            GiroButton(
              text: 'Click me',
              variant: GiroButtonVariant.primary,
              size: GiroButtonSize.medium,
              onPressed: () {
                print('Button pressed!');
              },
            ),
            
            const SizedBox(height: GiroSpacing.lg),
            
            // Card
            GiroCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: const [
                  GiroText.h3('Card Title'),
                  SizedBox(height: GiroSpacing.sm),
                  GiroText.body('This is a card with some content.'),
                ],
              ),
            ),
            
            const SizedBox(height: GiroSpacing.lg),
            
            // Badge
            const GiroBadge(
              text: 'New',
              variant: GiroBadgeVariant.primary,
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
  color: GiroColors.primary,
  child: Text(
    'Texto',
    style: TextStyle(color: GiroColors.onPrimary),
  ),
)

// Espaçamento
Padding(
  padding: EdgeInsets.all(GiroSpacing.md),
  child: ...
)

// Tipografia
Text(
  'Título',
  style: GiroTypography.heading1,
)

// Border Radius
Container(
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: GiroBorderRadius.borderRadiusMd,
  ),
)

// Sombras
Container(
  decoration: BoxDecoration(
    color: Colors.white,
    boxShadow: GiroShadows.shadowMd,
  ),
)
```

## 🧪 Rodando Testes

```bash
cd packages/flutter
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
cd apps/widgetbook-flutter
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

1. Verifique a documentação em `packages/flutter/README.md`
2. Veja exemplos no Widgetbook em `apps/widgetbook-flutter/lib/stories/`
3. Consulte o `CONTRIBUTING.md` para guidelines de desenvolvimento

---

**Próximos Passos:**

1. ✅ Execute o Widgetbook para ver todos os componentes
2. ✅ Explore os exemplos nas stories
3. ✅ Crie seu primeiro app usando os componentes
4. ✅ Customize os tokens conforme sua necessidade
