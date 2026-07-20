# Switch

## Visao geral

Este diretorio contem a implementacao dos tokens semanticos do componente Switch para o Giro Design System no Flutter. Nenhum wrapper customizado foi criado. A identidade visual do design system e aplicada exclusivamente via `SwitchThemeData` dentro de `applyGiroTheme()`, preservando 100% da API e do comportamento nativo do widget `Switch` do Flutter Material 3.

---

## Arquitetura

A implementacao segue a arquitetura de 4 camadas padrao do pacote `flutter_giro`.

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary. Nao deve ser editado manualmente.

**Camada 2 - switch_tokens.dart** (este diretorio)
Mapeamento semantico dos tokens brutos para o contexto especifico do Switch. E a unica camada a ser editada quando as especificacoes visuais do Switch mudarem.

**Camada 3 - giro_theme.dart**
Aplica os tokens do `GiroSwitchTokens` ao `SwitchThemeData` dentro de `applyGiroTheme()`. Garante que todos os `Switch` nativos herdem automaticamente a identidade visual do Giro sempre que o tema for aplicado.

**Camada 4 - wrappers**
Nao existe wrapper para Switch. O widget nativo `Switch` do Flutter Material e usado diretamente no produto.

---

## Uso

```dart
// Estado controlado pelo pai
bool _enabled = false;

Switch(
  value: _enabled,
  onChanged: (v) => setState(() => _enabled = v),
)
```

```dart
// Desabilitado
Switch(
  value: false,
  onChanged: null,
)
```

```dart
// Desabilitado e ligado
Switch(
  value: true,
  onChanged: null,
)
```

---

## Estados

| Estado | Track | Thumb |
|---|---|---|
| Off | `colorNeutralHighLight` com borda `colorNeutralHighDark` | `colorNeutralLowMedium` |
| Off + hover | `colorNeutralHighMedium` | `colorNeutralLowMedium` |
| On | `colorBrandPrimaryDefault` sem borda | `colorNeutralHighDefault` (branco) |
| On + hover | `colorBrandPrimaryMedium` | `colorNeutralHighDefault` |
| Disabled off | `colorNeutralHighDark` sem borda | `colorNeutralLowMedium` |
| Disabled on | `colorBrandPrimaryLight` sem borda | `colorNeutralHighDefault` |
| Focus / Press | Overlay `colorBrandPrimaryLight` com opacidade 20% | — |

---

## Tokens (switch_tokens.dart)

### Dimensoes do track

| Token | Valor | Descricao |
|---|---|---|
| `trackWidth` | `54.0` | Largura do track |
| `trackHeight` | `34.0` | Altura do track |
| `trackBorderRadius` | `borderRadiusPill` | Arredondamento do track |
| `trackPadding` | `spacing4` | Padding interno do track |
| `trackBorderWidth` | `1.0` | Espessura da borda do track (estado off) |
| `focusBorderWidth` | `2.0` | Espessura do anel de foco |

### Dimensoes do thumb

| Token | Valor | Descricao |
|---|---|---|
| `thumbSize` | `22.0` | Diametro do thumb no estado off |
| `thumbSizeChecked` | `26.0` | Diametro do thumb no estado on |
| `thumbBorderRadius` | `borderRadiusPill` | Arredondamento do thumb |

### Cores do track

| Token | Valor | Descricao |
|---|---|---|
| `trackColor` | `colorNeutralHighLight` | Track no estado off |
| `trackHoverColor` | `colorNeutralHighMedium` | Track off com hover |
| `trackDisabledColor` | `colorNeutralHighDark` | Track off desabilitado |
| `trackCheckedColor` | `colorBrandPrimaryDefault` | Track no estado on |
| `trackCheckedHoverColor` | `colorBrandPrimaryMedium` | Track on com hover |
| `trackCheckedDisabledColor` | `colorBrandPrimaryLight` | Track on desabilitado |
| `trackBorderColor` | `colorNeutralHighDark` | Borda do track no estado off |

### Cores do thumb e foco

| Token | Valor | Descricao |
|---|---|---|
| `thumbColor` | `colorNeutralLowMedium` | Thumb no estado off |
| `thumbCheckedColor` | `colorNeutralHighDefault` | Thumb no estado on |
| `focusColor` | `colorBrandPrimaryLight` | Cor base do overlay de foco/press |

---

## Decisoes de design

**Por que sem wrapper?**
O `Switch` nativo do Flutter tem uma API minimal (`value`, `onChanged`). Nao ha variantes, slots ou composicao necessaria. A identidade visual e garantida 100% pelo tema.

**Borda so no estado off**
O design React usa `outline` apenas quando o switch esta desligado. No Flutter isso e mapeado via `trackOutlineColor`: retorna `Colors.transparent` quando `selected` ou `disabled`, e `trackBorderColor` caso contrario.

**Overlay de foco com opacidade**
O Flutter usa `overlayColor` para o ripple ao redor do thumb. O valor e `colorBrandPrimaryLight` com `alpha: 0.2`, alinhado com o `outline` de foco do React.
