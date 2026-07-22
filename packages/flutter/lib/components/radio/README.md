# Radio

## Visao geral

Este diretorio contem a implementacao dos tokens semanticos do componente Radio para o Giro Design System no Flutter. Nenhum wrapper customizado foi criado. A identidade visual do design system e aplicada exclusivamente via `RadioThemeData` dentro de `applyGiroTheme()`, preservando 100% da API e do comportamento nativo do widget `Radio` do Flutter Material 3.

---

## Arquitetura

A implementacao segue a arquitetura de 4 camadas padrao do pacote `flutter_giro`.

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary. Nao deve ser editado manualmente.

**Camada 2 - radio_tokens.dart** (este diretorio)
Mapeamento semantico dos tokens brutos para o contexto especifico do Radio. E a unica camada a ser editada quando as especificacoes visuais do Radio mudarem.

**Camada 3 - giro_theme.dart**
Aplica os tokens do `GiroRadioTokens` ao `RadioThemeData` dentro de `applyGiroTheme()`. Garante que todos os `Radio` nativos herdem automaticamente a identidade visual do Giro sempre que o tema for aplicado.

**Camada 4 - wrappers**
Nao existe wrapper para Radio. O widget nativo `Radio<T>` do Flutter Material e usado diretamente no produto.

---

## Uso

O `Radio` nativo do Flutter requer gerenciamento de grupo pelo consumidor via `groupValue`.

```dart
// Grupo controlado pelo pai
int? _selected = 0;

Column(
  children: [
    Radio<int>(
      value: 0,
      groupValue: _selected,
      onChanged: (v) => setState(() => _selected = v),
    ),
    Radio<int>(
      value: 1,
      groupValue: _selected,
      onChanged: (v) => setState(() => _selected = v),
    ),
    Radio<int>(
      value: 2,
      groupValue: _selected,
      onChanged: (v) => setState(() => _selected = v),
    ),
  ],
)
```

```dart
// Desabilitado (com item selecionado)
Radio<int>(
  value: 0,
  groupValue: 0,
  onChanged: null,
)
```

```dart
// Com strings como valor
String? _selected = 'sp';

Radio<String>(
  value: 'sp',
  groupValue: _selected,
  onChanged: (v) => setState(() => _selected = v),
)
```

---

## Estados

| Estado | Descricao |
|---|---|
| Unselected | Circulo vazio com borda `colorNeutralLowDark` |
| Selected | Borda `colorBrandPrimaryDefault`, ponto central `colorBrandPrimaryDefault` |
| Disabled unselected | Borda `colorNeutralLowLight`, sem interacao |
| Disabled selected | Borda e ponto `colorNeutralLowLight`, sem interacao |
| Hover | Area de toque circular com fundo `colorNeutralHighMedium` |
| Focus / Press | Area de toque circular com fundo `colorNeutralHighDark` |

---

## Tokens (radio_tokens.dart)

### Dimensoes

| Token | Valor | Descricao |
|---|---|---|
| `boxSize` | `20.0` | Diametro do circulo do radio |
| `touchSize` | `40.0` | Area de toque ao redor do circulo |
| `splashRadius` | `20.0` | Raio do ripple/overlay circular |
| `borderWidth` | `2.0` | Espessura da borda do circulo |
| `labelGap` | `spacing8` | Espaco entre o radio e o label |

### Tipografia (para label externo)

| Token | Valor |
|---|---|
| `fontFamily` | `fontFamilyPrimary` (Figtree) |
| `fontSize` | `fontSize16` |
| `fontWeight` | `FontWeight.w400` |

### Cores

| Token | Valor | Descricao |
|---|---|---|
| `borderColor` | `colorNeutralLowDark` | Borda no estado normal |
| `checkedBorderColor` | `colorBrandPrimaryDefault` | Borda quando selecionado |
| `disabledBorderColor` | `colorNeutralLowLight` | Borda quando desabilitado |
| `fillColor` | `colorBrandPrimaryDefault` | Ponto central quando selecionado |
| `disabledFillColor` | `colorNeutralLowLight` | Ponto central quando desabilitado |
| `labelColor` | `colorNeutralLowDefault` | Cor do label externo |
| `labelDisabledColor` | `colorNeutralLowLight` | Cor do label externo desabilitado |
| `overlayHoverColor` | `colorNeutralHighMedium` | Overlay no hover |
| `overlayPressColor` | `colorNeutralHighDark` | Overlay no press |
| `overlayFocusColor` | `colorNeutralHighDark` | Overlay no focus |

---

## Decisoes de design

**Por que sem wrapper?**
O `Radio<T>` nativo do Flutter tem uma API simples e bem definida. O gerenciamento de grupo (`groupValue`) e responsabilidade do consumidor, o que e o comportamento correto — o componente nao deve assumir estado de grupo. A identidade visual e garantida 100% pelo tema.

**Por que generico `Radio<T>`?**
O Flutter usa generics para garantir type safety entre `value` e `groupValue`. Qualquer tipo pode ser usado (`int`, `String`, enum), desde que `value` e `groupValue` sejam do mesmo tipo `T`.

**Label e responsabilidade do consumidor**
O `Radio` nativo nao inclui label. Cabe ao consumidor compor o `Radio` com um `Text` usando `GiroRadioTokens.fontFamily`, `fontSize`, `fontWeight` e `labelColor`.

**Por que `borderWidth = 2.0` fixo?**
O token `GiroTokens.borderWidth2` e do tipo `int`, nao `double`. O Flutter exige `double` para `BorderSide.width`. O valor `2.0` e equivalente e foi declarado diretamente para evitar cast em tempo de execucao.
