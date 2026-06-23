# Filosofia de Arquitetura do Giro DS — Flutter

> **Versão:** 1.0.0  
> **Data:** 2026-06-23  
> **Escopo:** Pacote `flutter_giro` (v0.4.0+)  
> **Propósito:** Este documento é a referência canônica da arquitetura. Qualquer novo componente ou alteração DEVE seguir os princípios aqui definidos. Desvios geram inconsistência e não serão aceitos.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Evolução Histórica](#2-evolução-histórica)
3. [As Duas Estratégias de Componente](#3-as-duas-estratégias-de-componente)
4. [Arquitetura de 4 Camadas](#4-arquitetura-de-4-camadas)
5. [O Fluxo de Dados Completo](#5-o-fluxo-de-dados-completo)
6. [Padrões de Design](#6-padrões-de-design)
7. [Critérios de Decisão](#7-critérios-de-decisão)
8. [Checklist para Novos Componentes](#8-checklist-para-novos-componentes)
9. [Exemplos Completos](#9-exemplos-completos)
10. [Regras Invioláveis](#10-regras-invioláveis)

---

## 1. Visão Geral

O pacote `flutter_giro` é a implementação Flutter do Giro Design System. Sua arquitetura foi refinada ao longo de 4 versões até chegar a um equilíbrio entre:

- **Aproveitar o Material 3 nativo** — não reinventar o que o Flutter já faz bem
- **Controlar a identidade visual** — garantir consistência com tokens do Style Dictionary
- **Oferecer boa DX** — APIs idiomáticas em Dart, documentação inline, type-safety

O resultado é uma filosofia de **dualidade estratégica**: re-exports puros para componentes simples + wrappers de 4 camadas para componentes que exigem controle visual.

---

## 2. Evolução Histórica

O pacote passou por 4 versões até chegar à filosofia atual. Entender essa jornada é essencial para não repetir erros.

| Versão | Abordagem | Problema |
|--------|-----------|----------|
| **v0.1.0** | Todos componentes customizados (Avatar, Badge, Button, Card, Checkbox, Chip, Dialog, Divider, Dropdown) | Muito código para manter. Desvio desnecessário do Material 3. Sempre atrás das atualizações do Flutter. |
| **v0.2.0** | Híbrido confuso: alguns customizados, alguns re-exports | Duas fontes de verdade. Inconsistência entre componentes. Dev não sabia qual abordagem esperar. |
| **v0.3.0** | **BREAKING**: Removeu TODOS os customizados. Só re-exports puros do Material 3. | Foi longe demais — perdia controle sobre tokens de design. Impossível garantir identidade visual. |
| **v0.4.0** (atual) | **Híbrido com critério claro**: re-exports para o simples, 4-layer para o complexo. | ✅ Equilíbrio ideal. |

### Lições Aprendidas

1. **Não combata o framework.** O Material 3 do Flutter é maduro, acessível e bem testado. Use-o.
2. **Só customize quando houver ganho real.** Se a API nativa já entrega o que o design precisa, re-exporte.
3. **Nunca misture estratégias no mesmo componente.** Ou é re-export puro, ou é wrapper 4-layer. Nada de meio-termo.

---

## 3. As Duas Estratégias de Componente

### Estratégia A: Re-export Puro

**O que é:** Um arquivo Dart que simplesmente re-exporta widgets nativos do Flutter Material 3, com documentação inline de exemplos de uso.

**Exemplo real — `components/badges/badges.dart`:**
```dart
/// Badge widget for small labels, typically on icons or avatars.
///
/// Example:
/// ```dart
/// Badge(
///   label: Text('3'),
///   child: Icon(Icons.notifications),
/// )
/// ```
export 'package:flutter/material.dart' show Badge, BadgeTheme;
```

**Quando usar:**
- A API nativa do Material 3 já é suficiente
- O componente é estruturalmente simples (badge, divider, card, chip, scaffold, app_bar, snackbar, dialog, bottom_sheet, selection_controls)
- Não há necessidade de tokens específicos além do que o tema global já provê
- O desenvolvedor já conhece a API do Flutter — não há valor em encapsular

**Benefícios:**
- **Zero código de manutenção.** Atualizações do Flutter Material 3 são herdadas automaticamente.
- **API familiar.** Quem sabe Flutter, sabe usar.
- **Documentação oficial do Flutter se aplica diretamente.**

**Componentes que seguem esta estratégia:**
- AppBar, Autocomplete, Avatars, Badges, Banner, BottomNavigation, BottomSheet, ButtonBar, Cards, Chips, DataTable, DatePicker, Dialogs, Dividers, Drawer, DropdownButton, Expansion, FAB, Form, IconButton, ListTile, Menu, Navigation, PopupMenu, Progress, RefreshIndicator, Scaffold, SearchBar, SegmentedButton, SelectionControls, Slider, SnackBar, Stepper, Tabs, TimePicker, Tooltip

### Estratégia B: Wrapper Customizado (4 Camadas)

**O que é:** Um componente `Giro*` completo, implementado como wrapper sobre widgets nativos do Flutter, seguindo a arquitetura de 4 camadas.

**Quando usar:**
- O componente precisa de tokens de design **específicos e calculados** (cores exatas, espaçamentos, border-radius)
- A API nativa não oferece controle fino suficiente (ex: posicionamento de ícone, altura fixa)
- Existem variantes/sizes/tamanhos que o Material 3 não cobre nativamente
- A experiência de uso (DX) melhora **significativamente** com named constructors ou convenções do Giro

**Custo assumido:** Código para manter (~200 linhas por componente), mas justificado pelo controle sobre a identidade visual.

**Componentes que seguem esta estratégia:**
- `GiroButton` — variantes (filled/outlined/text), sizes (lg/sm), posicionamento de ícone, fullWidth, iconOnly
- `GiroTextField` — label externo, altura fixa 44px, clear button automático, estados visuais por token

---

## 4. Arquitetura de 4 Camadas

Esta é a espinha dorsal da estratégia B. Documentada originalmente em `components/text_field/README.md`.

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  CAMADA 4: giro_*.dart                                  │
│  "O componente que o desenvolvedor usa"                   │
│  Wrapper StatefulWidget/StatelessWidget                  │
│  API idiomática: named constructors, enums do Giro        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CAMADA 3: giro_theme.dart                              │
│  "Configuração centralizada via ThemeData.copyWith()"     │
│  applyGiroTheme() — aplica tokens globais no Material 3   │
│  Preenche: ButtonTheme, InputDecorationTheme, etc.        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CAMADA 2: *_tokens.dart                                │
│  "Tokens semânticos do componente"                        │
│  Tradução: token genérico → valor específico              │
│  Classe com consts: altura, cores, espaçamentos, bordas   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CAMADA 1: generated_tokens.dart                        │
│  "Fonte única da verdade — Style Dictionary"              │
│  Auto-gerado, NUNCA editado manualmente                   │
│  Classe GiroTokens com TODOS os tokens visuais            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 4.1 Camada 1 — `generated_tokens.dart`

**Arquivo:** `lib/tokens/generated_tokens.dart`  
**Fonte:** Style Dictionary processa `packages/tokens/`  
**Regra:** **NUNCA EDITAR MANUALMENTE**

```dart
// Do not edit directly, this file was auto-generated.

import 'dart:ui';

class GiroTokens {
  GiroTokens._();
  static const borderRadius8 = 8.0;
  static const colorBrandPrimaryDefault = Color(0xFF3B45F2);
  static const spacing16 = 16.0;
  static const fontFamilyPrimary = 'Figtree';
  static const fontSize14 = 14.0;
  // ... centenas de tokens
}
```

**Responsabilidade:** Fornecer a lista completa e exaustiva de todos os tokens de design. É a **single source of truth** para cores, espaçamentos, tipografia, bordas e shadows.

**Garantia:** O mesmo Style Dictionary gera tokens para React, Flutter e (futuramente) Compose. Um token alterado no design é propagado para todas as plataformas.

### 4.2 Camada 2 — `*_tokens.dart`

**Arquivos:** `lib/components/buttons/button_tokens.dart`, `lib/components/text_field/text_field_tokens.dart`  
**Padrão:** Um arquivo por componente que precise de customização

```dart
import '../../tokens/generated_tokens.dart';

class GiroButtonTokens {
  GiroButtonTokens._();

  // Dimensões
  static const double heightLg = 44.0;
  static const double heightSm = 36.0;
  static const double minWidthLg = 92.0;
  static const double minWidthSm = 76.0;

  // Padding
  static const double paddingXLg = GiroTokens.spacing24;  // 24
  static const double paddingXSm = GiroTokens.spacing16;   // 16
  static const double paddingTextXLg = GiroTokens.spacing12;  // 12
  static const double paddingTextXSm = GiroTokens.spacing8;   // 8

  // Ícone
  static const double iconSize = 16.0;
  static const double iconGap = GiroTokens.spacing8;       // 8
  static const double iconOnlyLg = 44.0;
  static const double iconOnlySm = 36.0;

  // Forma
  static const double radius = GiroTokens.borderRadius8;    // 8

  // Tipografia
  static const double fontSize = GiroTokens.fontSize14;     // 14
  static const FontWeight fontWeightMedium = FontWeight.w500;

  // Borda (outlined)
  static BorderSide get outlinedBorder => BorderSide(
    width: 1.0,
    color: GiroTokens.colorNeutralHighDark,
  );
}
```

**Responsabilidade:** Traduzir tokens genéricos do Style Dictionary em valores semânticos para o componente específico. É a camada de **desacoplamento**: se um token muda, só este arquivo precisa ser atualizado.

**Regras:**
- Classe com construtor privado `._()` — não é instanciável
- Todos os campos são `static const` (ou `static` getters para tipos não-const como `BorderSide`)
- Referencia APENAS `GiroTokens.*` da Camada 1, nunca valores hardcoded
- Nomes descritivos: `heightLg`, `paddingXSm`, `borderColorFocus`

### 4.3 Camada 3 — `giro_theme.dart`

**Arquivo:** `lib/theme/giro_theme.dart`  
**Função principal:** `applyGiroTheme(ThemeData base)`

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/generated_tokens.dart';
import '../components/buttons/button_tokens.dart';
import '../components/text_field/text_field_tokens.dart';

ThemeData applyGiroTheme(ThemeData base) {
  return base.copyWith(
    // Configuração global de botões
    filledButtonTheme: FilledButtonThemeData(
      style: _baseStyle(
        fg: GiroTokens.colorNeutralHighDefault,
        bg: GiroTokens.colorBrandPrimaryDefault,
        hoverBg: GiroTokens.colorBrandPrimaryDark,
        pressedBg: GiroTokens.colorBrandPrimaryDark,
        disabledFg: GiroTokens.colorNeutralLowLight,
        disabledBg: GiroTokens.colorNeutralHighMedium,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: _baseStyle(/* ... */),
    ),
    textButtonTheme: TextButtonThemeData(
      style: _baseStyle(/* ... */),
    },

    // Configuração global de campos de texto
    inputDecorationTheme: InputDecorationTheme(
      contentPadding: EdgeInsets.symmetric(
        vertical: 0,
        horizontal: GiroTextFieldTokens.paddingHorizontal,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(GiroTextFieldTokens.borderRadius),
        borderSide: BorderSide(
          color: GiroTextFieldTokens.borderColorDefault,
          width: GiroTextFieldTokens.borderWidth,
        ),
      ),
      // ... focused, error, disabled states
    },

    // Tipografia global
    textTheme: GoogleFonts.figtreeTextTheme(base.textTheme),
  );
}
```

**Responsabilidade:** Configurar o Material 3 "por baixo dos panos" para que:
1. **Componentes de re-export (Estratégia A)** herdem automaticamente a identidade visual do Giro — o desenvolvedor usa `ElevatedButton` nativo e já vem com as cores Giro.
2. **Componentes customizados (Estratégia B)** tenham um fallback consistente para estados que não controlam diretamente.

**Regras:**
- Usa tokens da Camada 1 e Camada 2
- Centraliza TODA a configuração visual global em um único lugar
- O desenvolvedor chama `applyGiroTheme(ThemeData())` no `MaterialApp` e tudo funciona
- Novos temas globais (ex: `cardTheme`, `chipTheme`) devem ser adicionados AQUI

### 4.4 Camada 4 — `giro_*.dart`

**Arquivos:** `lib/components/buttons/giro_button.dart`, `lib/components/text_field/giro_text_field.dart`  
**Tipo:** `StatelessWidget` ou `StatefulWidget`

```dart
import 'package:flutter/material.dart';
import '../../types/giro_types.dart';
import 'button_tokens.dart';

enum GiroButtonVariant { filled, outlined, text }

class GiroButton extends StatelessWidget {
  final GiroButtonVariant variant;
  final GiroSize size;
  final GiroPosition iconPosition;
  final VoidCallback? onPressed;
  final String text;
  final Widget? icon;
  final bool iconOnly;
  final bool fullWidth;
  final bool disable;

  // Construtor BASE — recebe todos os parâmetros
  const GiroButton({
    required this.text,
    required this.onPressed,
    this.variant = GiroButtonVariant.filled,
    this.size = GiroSize.lg,
    this.iconPosition = GiroPosition.left,
    this.icon,
    this.iconOnly = false,
    this.fullWidth = false,
    this.disable = false,
    super.key,
  }) : assert(/* validações de enum */);

  // Named constructors para cada variante
  const GiroButton.filled({
    required String text,
    required VoidCallback? onPressed,
    GiroSize size = GiroSize.lg,
    GiroPosition iconPosition = GiroPosition.left,
    Widget? icon,
    bool iconOnly = false,
    bool fullWidth = false,
    bool disable = false,
    Key? key,
  }) : this(
    variant: GiroButtonVariant.filled,
    text: text,
    onPressed: onPressed,
    size: size,
    iconPosition: iconPosition,
    icon: icon,
    iconOnly: iconOnly,
    fullWidth: fullWidth,
    disable: disable,
    key: key,
  );

  const GiroButton.outlined({ /* ... */ }) : this(variant: GiroButtonVariant.outlined, /* ... */);
  const GiroButton.text({ /* ... */ }) : this(variant: GiroButtonVariant.text, /* ... */);

  @override
  Widget build(BuildContext context) {
    // Calcula dimensões a partir dos tokens
    final double height = size == GiroSize.lg
        ? GiroButtonTokens.heightLg
        : GiroButtonTokens.heightSm;

    // Constrói o widget interno com base na variante
    // ... (lógica de layout com ícone, texto, etc.)
  }
}
```

**Responsabilidade:** Fornecer a API pública que o desenvolvedor usa. Deve:
- Ser idiomática em Dart (named constructors, enums, const)
- Usar EXCLUSIVAMENTE tokens da Camada 2 para valores visuais
- Beneficiar-se do tema da Camada 3 para herdar configurações base
- Ter asserts que validam combinações inválidas de parâmetros
- Documentar cada parâmetro com comentários `///`

---

## 5. O Fluxo de Dados Completo

```
Style Dictionary (packages/tokens/)
        │
        │ script de build: style-dictionary build
        ▼
  generated_tokens.dart          ←  Camada 1 | SINGLE SOURCE OF TRUTH
  (GiroTokens.spacing16,          ←  Comum a React, Flutter, Compose
   GiroTokens.colorBrand*, ...)
        │
        ├─────────────────────────────────────────────┐
        │                                             │
        ▼                                             ▼
  design_tokens.dart                          *_tokens.dart
  (GiroColors.primary,                   (GiroButtonTokens.heightLg,
   GiroSpacing.md,                         GiroTextFieldTokens.borderRadius,
   GiroShadows.sm,                         etc.)
   GiroTypography.fontSizeMd)
        │                                      │
        ├──────────────────┐                    │
        │                  │                    │
        ▼                  ▼                    ▼
  giro_theme.dart    Componentes          Componentes
  (applyGiroTheme)   Re-export            Customizados
        │            (Estratégia A)       (Estratégia B)
        │                  │                    │
        │    ┌─────────────┘                    │
        │    │                                  │
        ▼    ▼                                  ▼
  MaterialApp(theme: applyGiroTheme(...))
        │
        ▼
  APLICATIVO FINAL
  (todos os componentes, re-export ou custom,
   herdam identidade visual Giro)
```

---

## 6. Padrões de Design

Estes padrões se aplicam a TODO o pacote. São decisões intencionais, não acidentais.

### 6.1 Enums como API Pública

**Regra:** Toda propriedade com valores fixos deve ser um enum, nunca uma `String` ou `int` mágico.

```dart
// ✅ CORRETO
enum GiroSize { sm, md, lg, xl }
enum GiroPosition { left, right, top, bottom, none }
enum GiroButtonVariant { filled, outlined, text }

// ❌ ERRADO — nunca faça isso
final String variant; // "filled", "outlined", "text"
final int size;        // 0, 1, 2
```

**Motivo:** Type-safety em tempo de compilação. O analisador Dart garante que nenhum valor inválido seja passado. O autocomplete do IDE funciona perfeitamente.

### 6.2 Named Constructors para Variantes

**Regra:** Prefira named constructors a parâmetros de configuração.

```dart
// ✅ CORRETO — API fluente e descritiva
GiroButton.filled(label: 'Salvar', onPressed: () {})
GiroButton.outlined(label: 'Cancelar', onPressed: () {})
GiroButton.text(label: 'Voltar', onPressed: () {})

// ❌ ERRADO — menos expressivo
GiroButton(label: 'Salvar', variant: GiroButtonVariant.filled, onPressed: () {})
```

**Motivo:** Named constructors são idiomáticos em Dart. Tornam o código mais legível e eliminam um parâmetro obrigatório. O construtor base ainda existe para casos de uso dinâmico.

### 6.3 Asserts para Validação

**Regra:** Use `assert` no construtor base para validar combinações de parâmetros.

```dart
const GiroButton({
  // ...
}) : assert(
  size == GiroSize.lg || size == GiroSize.sm,
  'GiroButton only supports lg or sm for size.',
),
assert(
  iconPosition == GiroPosition.left ||
  iconPosition == GiroPosition.right ||
  iconPosition == GiroPosition.none,
  'GiroButton only supports left, right, or none for iconPosition.',
);
```

**Motivo:** Falha em tempo de desenvolvimento (debug mode), não em produção. Mensagens claras ajudam o dev a corrigir.

### 6.4 Documentação Inline com Exemplos

**Regra:** TODO arquivo de componente (re-export ou custom) deve ter documentação com exemplos de uso.

```dart
/// Badge widget for small labels, typically on icons or avatars.
///
/// Example:
/// ```dart
/// Badge(
///   label: Text('3'),
///   child: Icon(Icons.notifications),
/// )
/// ```
export 'package:flutter/material.dart' show Badge, BadgeTheme;
```

**Motivo:** O pacote é auto-documentado. O desenvolvedor lê o fonte e já sabe como usar. Não depende de documentação externa.

### 6.5 Helpers de Design Tokens

**Regra:** A Camada 1 (`generated_tokens.dart`) é complementada por helpers semânticos.

```dart
// design_tokens.dart — nomes amigáveis para consumo humano
class GiroColors {
  GiroColors._();
  static const Color primary = GiroTokens.colorBrandPrimaryDefault;
  static const Color onPrimary = GiroTokens.colorNeutralHighDefault;
  static const Color error = GiroTokens.colorFeedbackAlertDefault;
  // ...
}

class GiroSpacing {
  GiroSpacing._();
  static const double xs = GiroTokens.spacing4;   // 4
  static const double sm = GiroTokens.spacing8;   // 8
  static const double md = GiroTokens.spacing16;  // 16
  static const double lg = GiroTokens.spacing24;  // 24
  static const double xl = GiroTokens.spacing32;  // 32
  static const double xxl = GiroTokens.spacing40; // 40
}
```

**Motivo:** `GiroColors.primary` é mais legível que `GiroTokens.colorBrandPrimaryDefault`. Os helpers são a "fachada humana" dos tokens de máquina.

### 6.6 Barrel File Centralizado

**Regra:** O arquivo `flutter_giro.dart` exporta tudo que é público.

```dart
library flutter_giro;

// Re-export do Flutter Material (conveniência)
export 'package:flutter/material.dart';

// Tokens
export 'tokens/tokens.dart';

// Componentes re-export
export 'components/app_bar/app_bar.dart';
export 'components/badges/badges.dart';
// ...

// Componentes customizados
export 'components/buttons/giro_button.dart';
export 'components/buttons/button_tokens.dart';
// ...

// Tema
export 'theme/giro_theme.dart';
```

**Motivo:** O desenvolvedor importa UM único pacote e tem acesso a tudo. Sem caça aos arquivos.

### 6.7 Separação Física por Componente

**Regra:** Cada componente tem sua própria pasta com todos os arquivos relacionados.

```
components/
├── buttons/
│   ├── giro_button.dart        ← Camada 4: wrapper
│   └── button_tokens.dart      ← Camada 2: tokens
├── text_field/
│   ├── giro_text_field.dart    ← Camada 4: wrapper
│   ├── text_field_tokens.dart  ← Camada 2: tokens
│   ├── text_field.dart         ← barrel do componente
│   └── README.md               ← documentação da arquitetura
├── badges/
│   └── badges.dart             ← re-export puro
└── chips/
    └── chips.dart              ← re-export puro
```

---

## 7. Critérios de Decisão

Use este fluxograma ao criar ou modificar um componente:

```
PRECISO CRIAR/MODIFICAR UM COMPONENTE
              │
              ▼
┌─────────────────────────────────┐
│ 1. O Material 3 já oferece      │
│    esse widget nativamente?      │
└────────────┬────────────────────┘
             │
    ┌────────┴────────┐
    │ Sim             │ Não
    ▼                 ▼
┌──────────────┐  ┌──────────────────────┐
│ 2. Preciso de │  │ CRIAR WRAPPER        │
│    controle   │  │ CUSTOMIZADO           │
│    visual     │  │ (Estratégia B)        │
│    além do    │  │ Seguir 4 camadas      │
│    tema?      │  └──────────────────────┘
└──────┬───────┘
       │
  ┌────┴────┐
  │ Sim     │ Não
  ▼         ▼
┌──────┐  ┌──────────────┐
│WRAPPER│  │ RE-EXPORT    │
│4-LAYER│  │ PURO         │
│(Est. B)│  │ (Estratégia A)│
└──────┘  └──────────────┘
```

### Perguntas de diagnóstico

Antes de decidir por um wrapper customizado, responda:

| # | Pergunta | Se "Sim", wrapper |
|---|----------|-------------------|
| 1 | O componente precisa de altura/largura fixa específica? | ✅ |
| 2 | Existem variantes visuais que o Material 3 não cobre? | ✅ |
| 3 | O posicionamento de elementos internos (ícone, label) precisa de controle preciso? | ✅ |
| 4 | Há estados (focus, error, disabled) que precisam de cores exatas dos tokens? | ✅ |
| 5 | A API nativa do Flutter é confusa/pouco intuitiva para este caso? | ✅ |
| 6 | É apenas uma questão de cores e fontes que o `applyGiroTheme()` já resolve? | ❌ Use re-export |

---

## 8. Checklist para Novos Componentes

Use este checklist ao implementar qualquer componente novo. Ele garante conformidade com a filosofia.

### Se for Re-export (Estratégia A)

- [ ] Arquivo único: `components/<nome>/<nome>.dart`
- [ ] Contém SOMENTE `export 'package:flutter/material.dart' show ...;`
- [ ] Documentação `///` com descrição e exemplo de uso em código
- [ ] Registrado no barrel file `flutter_giro.dart`
- [ ] O tema global (`applyGiroTheme`) já cobre os aspectos visuais necessários
- [ ] Nenhum token hardcoded, nenhuma lógica customizada

### Se for Wrapper Customizado (Estratégia B)

- [ ] **Camada 2:** Arquivo `<nome>_tokens.dart` criado
- [ ] Todos os tokens referenciam `GiroTokens.*` da Camada 1
- [ ] Nenhum valor hardcoded nos tokens (cores, espaçamentos, fontes)
- [ ] **Camada 3:** Tema relevante configurado em `giro_theme.dart` (se aplicável)
- [ ] **Camada 4:** Classe `Giro<Nome>` implementada
- [ ] Usa `GiroSize`, `GiroPosition` e/ou enums específicos (nunca strings)
- [ ] Named constructors para cada variante (`.filled()`, `.outlined()`, etc.)
- [ ] `assert`s para validação de parâmetros em debug
- [ ] Documentação `///` em cada propriedade pública
- [ ] Registrado no barrel file `flutter_giro.dart`
- [ ] README.md na pasta do componente (se complexo) documentando a arquitetura
- [ ] Stories no Widgetbook (`apps/widgetbook-flutter/`)

### Verificações Finais (qualquer estratégia)

- [ ] `flutter analyze` passa sem erros
- [ ] Widgetbook story renderiza corretamente
- [ ] Documentação inline é clara e tem exemplos
- [ ] Nomes de classes, enums e arquivos seguem o padrão `Giro*`

---

## 9. Exemplos Completos

### 9.1 Exemplo: Re-export Puro (Chips)

**Estrutura:**
```
components/chips/
└── chips.dart
```

**`chips.dart`:**
```dart
/// Material 3 Chips for compact elements like filters, inputs, or selections.
///
/// Example:
/// ```dart
/// FilterChip(
///   label: Text('Filter'),
///   selected: isSelected,
///   onSelected: (value) => setState(() => isSelected = value),
/// )
/// ```
export 'package:flutter/material.dart'
    show Chip, InputChip, ChoiceChip, FilterChip, ActionChip;
```

**Registro em `flutter_giro.dart`:**
```dart
export 'components/chips/chips.dart';
```

**Tema em `giro_theme.dart`:**
```dart
// Se necessário, configurar chipTheme no applyGiroTheme()
chipTheme: ChipThemeData(
  backgroundColor: GiroTokens.colorNeutralHighLight,
  selectedColor: GiroTokens.colorBrandPrimaryLight,
  // ...
),
```

**Total de código:** ~8 linhas. Manutenção: zero.

### 9.2 Exemplo: Wrapper 4 Camadas (Button)

**Estrutura:**
```
components/buttons/
├── giro_button.dart       ← Camada 4 (~180 linhas)
└── button_tokens.dart     ← Camada 2 (~40 linhas)
```

**`button_tokens.dart` (Camada 2):**
```dart
import 'package:flutter/material.dart';
import '../../tokens/generated_tokens.dart';

class GiroButtonTokens {
  GiroButtonTokens._();

  static const double heightLg = 44.0;
  static const double heightSm = 36.0;
  static const double minWidthLg = 92.0;
  static const double minWidthSm = 76.0;
  static const double paddingXLg = GiroTokens.spacing24;
  static const double paddingXSm = GiroTokens.spacing16;
  static const double paddingTextXLg = GiroTokens.spacing12;
  static const double paddingTextXSm = GiroTokens.spacing8;
  static const double iconSize = 16.0;
  static const double iconGap = GiroTokens.spacing8;
  static const double iconOnlyLg = 44.0;
  static const double iconOnlySm = 36.0;
  static const double radius = GiroTokens.borderRadius8;
  static const double fontSize = GiroTokens.fontSize14;
  static const FontWeight fontWeightMedium = FontWeight.w500;

  static BorderSide get outlinedBorder => BorderSide(
    width: 1.0,
    color: GiroTokens.colorNeutralHighDark,
  );
}
```

**`giro_button.dart` (Camada 4):**
```dart
import 'package:flutter/material.dart';
import '../../types/giro_types.dart';
import 'button_tokens.dart';

enum GiroButtonVariant { filled, outlined, text }

class GiroButton extends StatelessWidget {
  final GiroButtonVariant variant;
  final GiroSize size;
  final GiroPosition iconPosition;
  final VoidCallback? onPressed;
  final String text;
  final Widget? icon;
  final bool iconOnly;
  final bool fullWidth;
  final bool disable;

  const GiroButton({
    required this.text,
    required this.onPressed,
    this.variant = GiroButtonVariant.filled,
    this.size = GiroSize.lg,
    this.iconPosition = GiroPosition.left,
    this.icon,
    this.iconOnly = false,
    this.fullWidth = false,
    this.disable = false,
    super.key,
  }) : assert(/* ... */);

  const GiroButton.filled({
    required String text,
    required VoidCallback? onPressed,
    GiroSize size = GiroSize.lg,
    GiroPosition iconPosition = GiroPosition.left,
    Widget? icon,
    bool iconOnly = false,
    bool fullWidth = false,
    bool disable = false,
    Key? key,
  }) : this(
    variant: GiroButtonVariant.filled,
    text: text,
    onPressed: onPressed,
    size: size,
    iconPosition: iconPosition,
    icon: icon,
    iconOnly: iconOnly,
    fullWidth: fullWidth,
    disable: disable,
    key: key,
  );

  const GiroButton.outlined({ /* ... */ }) : this(variant: GiroButtonVariant.outlined, /* ... */);
  const GiroButton.text({ /* ... */ }) : this(variant: GiroButtonVariant.text, /* ... */);

  @override
  Widget build(BuildContext context) {
    // Calcula dimensões a partir dos tokens
    final double height = size == GiroSize.lg
        ? GiroButtonTokens.heightLg
        : GiroButtonTokens.heightSm;

    // Constrói o widget interno com base na variante
    // ... (lógica de layout com ícone, texto, etc.)
  }
}
```

**`giro_theme.dart` (Camada 3 — trecho relevante):**
```dart
ThemeData applyGiroTheme(ThemeData base) {
  return base.copyWith(
    filledButtonTheme: FilledButtonThemeData(
      style: ButtonStyle(
        textStyle: WidgetStateProperty.all(TextStyle(
          fontSize: GiroButtonTokens.fontSize,
          fontWeight: GiroButtonTokens.fontWeightMedium,
          fontFamily: GiroTokens.fontFamilyPrimary,
        )),
        shape: WidgetStateProperty.all(RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(GiroButtonTokens.radius),
        )),
        // ... cores por estado
      ),
    ),
  );
}
```

**Registro em `flutter_giro.dart`:**
```dart
export 'components/buttons/giro_button.dart';
export 'components/buttons/button_tokens.dart';
```

---

## 10. Regras Invioláveis

Estas regras **NÃO PODEM** ser quebradas. São a constituição do pacote.

| # | Regra | Consequência se quebrada |
|---|-------|--------------------------|
| **R1** | `generated_tokens.dart` NUNCA é editado manualmente | Divergência entre plataformas. Tokens inconsistentes. |
| **R2** | Nenhum valor visual hardcoded em componentes | Basta o design mudar um token para quebrar a consistência. |
| **R3** | Nenhuma `String` ou `int` onde um `enum` cabe | Perda de type-safety. Bugs silenciosos em produção. |
| **R4** | Componente é OU re-export puro OU wrapper 4-layer. Nunca híbrido. | Duas fontes de verdade. Inconsistência na API. |
| **R5** | Toda configuração visual global vai em `applyGiroTheme()` | Temas espalhados = impossível garantir identidade visual. |
| **R6** | Tokens específicos de componente vão em `<nome>_tokens.dart` | Tokens misturados = difícil manutenção e auditoria. |
| **R7** | Todo componente público está no barrel `flutter_giro.dart` | Dev precisa caçar imports. DX prejudicada. |
| **R8** | Nomes de classes públicas começam com `Giro` | Colisão com nomes do Flutter. Ambiguidade para o dev. |
| **R9** | Documentação inline com exemplo em TODO componente | Dev precisa consultar docs externas. Barreira de adoção. |
| **R10** | Sempre referenciar tokens da Camada 2, nunca direto da Camada 1 (em componentes) | Se um token muda de nome na Camada 1, quebra todos os componentes. Camada 2 isola o impacto. |

---

## Apêndice A: Estrutura de Diretórios de Referência

```
packages/flutter/
├── lib/
│   ├── flutter_giro.dart              ← Barrel file principal
│   ├── tokens/
│   │   ├── tokens.dart                ← Barrel de tokens
│   │   ├── generated_tokens.dart      ← Camada 1: Style Dictionary (auto)
│   │   └── design_tokens.dart         ← Helpers: GiroColors, GiroSpacing, etc.
│   ├── types/
│   │   └── giro_types.dart            ← Enums: GiroSize, GiroPosition
│   ├── theme/
│   │   └── giro_theme.dart            ← Camada 3: applyGiroTheme()
│   ├── components/
│   │   ├── buttons/                   ← Estratégia B (wrapper)
│   │   │   ├── giro_button.dart       ← Camada 4
│   │   │   └── button_tokens.dart     ← Camada 2
│   │   ├── text_field/                ← Estratégia B (wrapper)
│   │   │   ├── giro_text_field.dart   ← Camada 4
│   │   │   ├── text_field_tokens.dart ← Camada 2
│   │   │   ├── text_field.dart        ← Barrel do componente
│   │   │   └── README.md              ← Documentação arquitetural
│   │   ├── badges/
│   │   │   └── badges.dart            ← Estratégia A (re-export)
│   │   ├── chips/
│   │   │   └── chips.dart             ← Estratégia A (re-export)
│   │   ├── app_bar/
│   │   │   └── app_bar.dart           ← Estratégia A (re-export)
│   │   └── ... (demais componentes)
│   └── deprecated/                    ← Componentes antigos (v0.1-v0.2)
│       └── button/
│           └── button.dart
├── pubspec.yaml
├── README.md
└── CHANGELOG.md
```

---

## Apêndice B: Glossário

| Termo | Definição |
|-------|-----------|
| **Style Dictionary** | Ferramenta que gera tokens de design para múltiplas plataformas a partir de uma fonte única (JSON). |
| **Camada 1** | `generated_tokens.dart` — tokens crus auto-gerados. |
| **Camada 2** | `*_tokens.dart` — tokens semânticos por componente. |
| **Camada 3** | `giro_theme.dart` — tema global Material 3 com `applyGiroTheme()`. |
| **Camada 4** | `giro_*.dart` — wrapper customizado. |
| **Estratégia A** | Re-export puro de widgets nativos do Flutter. |
| **Estratégia B** | Wrapper customizado seguindo a arquitetura de 4 camadas. |
| **Re-export** | Arquivo que apenas faz `export 'package:flutter/material.dart' show ...`. |
| **Wrapper** | Componente `Giro*` que encapsula widgets nativos com lógica e tokens próprios. |
| **Barrel file** | Arquivo que centraliza exports para um único ponto de import. |
| **DX** | Developer Experience — a experiência de quem USA o pacote. |
