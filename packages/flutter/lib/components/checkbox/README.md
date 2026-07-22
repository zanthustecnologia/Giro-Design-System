# Checkbox

## Visao geral

Este diretorio contem a implementacao dos tokens semanticos do componente Checkbox para o Giro Design System no Flutter. Nenhum wrapper customizado foi criado. A identidade visual do design system e aplicada exclusivamente via `CheckboxThemeData` dentro de `applyGiroTheme()`, preservando 100% da API e do comportamento nativo do widget `Checkbox` do Flutter Material 3.

---

## Arquitetura

A implementacao segue a arquitetura de 4 camadas padrao do pacote `flutter_giro`.

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary. Nao deve ser editado manualmente.

**Camada 2 - checkbox_tokens.dart** (este diretorio)
Mapeamento semantico dos tokens brutos para o contexto especifico do Checkbox. E a unica camada a ser editada quando as especificacoes visuais do Checkbox mudarem.

**Camada 3 - giro_theme.dart**
Aplica os tokens do `GiroCheckboxTokens` ao `CheckboxThemeData` dentro de `applyGiroTheme()`. Garante que todos os `Checkbox` nativos herdem automaticamente a identidade visual do Giro sempre que o tema for aplicado.

**Camada 4 - wrappers**
Nao existe wrapper para Checkbox. O widget nativo `Checkbox` do Flutter Material e usado diretamente no produto.

---

## Uso

```dart
// Estado controlado pelo pai
bool _checked = false;

Checkbox(
  value: _checked,
  onChanged: (v) => setState(() => _checked = v ?? false),
)
```

```dart
// Desabilitado
Checkbox(
  value: true,
  onChanged: null,
)
```

```dart
// Indeterminado (tristate)
bool? _value; // null = indeterminado

Checkbox(
  tristate: true,
  value: _value,
  onChanged: (v) => setState(() => _value = v),
)
```

---

## Estados

| Estado | Descricao |
|---|---|
| Unchecked | Caixa vazia com borda `colorNeutralLowDark` |
| Checked | Fundo `colorBrandPrimaryDefault`, icone check branco |
| Indeterminate | Fundo `colorBrandPrimaryDefault`, icone traco branco (tristate: true, value: null) |
| Disabled unchecked | Borda `colorNeutralLowLight`, interacao desabilitada |
| Disabled checked | Fundo `colorNeutralLowLight`, sem interacao |
| Hover | Area de toque circular com fundo `colorNeutralHighMedium` |
| Focus / Press | Area de toque circular com fundo `colorNeutralHighDark` |

---

## Tokens (checkbox_tokens.dart)

### Dimensoes

| Token | Valor | Descricao |
|---|---|---|
| `boxSize` | `18.0` | Tamanho da caixa do checkbox |
| `touchSize` | `40.0` | Area de toque ao redor da caixa |
| `splashRadius` | `20.0` | Raio do ripple/overlay circular |
| `borderWidth` | `2.0` | Espessura da borda da caixa |
| `borderRadius` | `borderRadius4` | Arredondamento dos cantos da caixa |
| `labelGap` | `spacing8` | Espaco entre o checkbox e o label |

### Tipografia (para label externo)

| Token | Valor |
|---|---|
| `fontFamily` | `fontFamilyPrimary` (Figtree) |
| `fontSize` | `fontSize16` |
| `fontWeight` | `FontWeight.w400` |

### Cores

| Token | Valor | Descricao |
|---|---|---|
| `boxBorderColor` | `colorNeutralLowDark` | Borda no estado normal |
| `checkedFillColor` | `colorBrandPrimaryDefault` | Fundo quando marcado |
| `checkedBorderColor` | `colorBrandPrimaryDefault` | Borda quando marcado |
| `checkColor` | `colorNeutralHighDefault` | Cor do icone de check |
| `disabledBorderColor` | `colorNeutralLowLight` | Borda quando desabilitado |
| `disabledCheckedFillColor` | `colorNeutralLowLight` | Fundo quando desabilitado + marcado |
| `labelColor` | `colorNeutralLowDefault` | Cor do label externo |
| `labelDisabledColor` | `colorNeutralLowLight` | Cor do label externo desabilitado |
| `overlayHoverColor` | `colorNeutralHighMedium` | Overlay no hover |
| `overlayPressColor` | `colorNeutralHighDark` | Overlay no press |
| `overlayFocusColor` | `colorNeutralHighDark` | Overlay no focus |

---

## Decisoes de design

**Por que sem wrapper?**
O `Checkbox` nativo do Flutter tem uma API simples e bem definida (`value`, `onChanged`, `tristate`, `onChanged: null` para desabilitar). Criar um wrapper adicionaria indirection sem beneficio real. A identidade visual e garantida 100% pelo tema.

**Label e responsabilidade do consumidor**
O `Checkbox` nativo nao inclui label. Cabe ao consumidor compor o `Checkbox` com um `Text` usando `GiroCheckboxTokens.fontFamily`, `fontSize`, `fontWeight` e `labelColor`. Veja o exemplo de uso acima.

**Por que `borderWidth = 2.0` fixo?**
O token `GiroTokens.borderWidth2` e do tipo `int`, nao `double`. O Flutter exige `double` para `BorderSide.width`. O valor `2.0` e equivalente e foi declarado diretamente para evitar cast em tempo de execucao.
