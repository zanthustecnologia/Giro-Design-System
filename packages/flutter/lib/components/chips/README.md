# Chips

## Visao geral

Este diretorio contem a implementacao dos tokens semanticos do componente Chip para o Giro Design System no Flutter. Nenhum wrapper customizado foi criado. A identidade visual do design system e aplicada exclusivamente via `ChipThemeData` dentro de `applyGiroTheme()`, preservando 100% da API e do comportamento nativo dos widgets de chip do Flutter Material 3.

Os widgets nativos disponiveis e re-exportados pelo pacote sao: `Chip`, `InputChip`, `ChoiceChip`, `FilterChip` e `ActionChip`.

---

## Arquitetura

A implementacao segue a arquitetura de 4 camadas padrao do pacote `flutter_giro`.

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary. Nao deve ser editado manualmente. E a fonte da verdade para todos os valores atomicos do design system.

**Camada 2 - chip_tokens.dart** (este diretorio)
Mapeamento semantico dos tokens brutos para o contexto especifico do chip. E a unica camada que deve ser editada quando as especificacoes visuais do chip mudarem.

**Camada 3 - giro_theme.dart**
Aplica os tokens do `GiroChipTokens` ao `ChipThemeData` dentro de `applyGiroTheme()`. Garante que todos os chips nativos herdem automaticamente a identidade visual do Giro sempre que o tema for aplicado.

**Camada 4 - wrappers**
Nao existe wrapper para chips. A decisao foi intencional: os cinco tipos de chip do Material 3 possuem APIs fundamentalmente diferentes entre si, e a criacao de um wrapper unificado exigiria props opcionais que seriam ignoradas dependendo do tipo, gerando uma API confusa e menos segura do que usar os widgets nativos diretamente.

---

## Arquivo chip_tokens.dart

### Responsabilidade

Centralizar todos os valores de design especificos para chips em um unico lugar. Quando o designer atualizar uma especificacao visual do chip, a alteracao deve ser feita aqui e se propagara automaticamente para o tema.

### Valores definidos

**Shape**

```
radius = GiroTokens.borderRadiusPill (500.0)
```

O chip usa `StadiumBorder` no tema, que ignora o valor de radius e aplica o arredondamento maximo automaticamente. O token esta documentado aqui por referencia semantica.

**Spacing**

```
paddingX = GiroTokens.spacing16 (16.0)
paddingY = 6.0
```

O `paddingY` nao vem de um token gerado porque nao existe um token de 6px no sistema. O valor foi calculado para atingir a altura alvo de 30px: `6 * 2 (padding vertical) + ~18px (line-height do texto Figtree 14px) = 30px`. Se a fonte ou o line-height mudarem, este valor deve ser recalculado.

**Logica de padding horizontal no tema**

O Flutter nao permite padding condicional por presenca de icone no `ChipThemeData`. Para replicar o comportamento do React (16px cada lado sem icone, 8px de gap icone-texto com icone), a solucao foi:

```
padding: EdgeInsets.symmetric(horizontal: 8, vertical: 6)
labelPadding: EdgeInsets.symmetric(horizontal: 8)
```

Resultado: sem icone, `8 (chip) + 8 (label) = 16px` cada lado. Com icone, `8 (chip) + icone + 8 (label) = 8px de gap` icone para texto.

**Typography**

```
fontFamily = GiroTokens.fontFamilyPrimary ('Figtree')
fontSize   = GiroTokens.fontSize14 (14.0)
fontWeight = FontWeight.w500 (medium)
```

No tema, a tipografia e aplicada via `GoogleFonts.getFont('Figtree', ...)` tanto no `labelStyle` (estado nao selecionado) quanto no `secondaryLabelStyle` (estado selecionado, usado por `ChoiceChip` e `FilterChip`).

**Icon**

```
iconSize  = 16.0
iconGap   = GiroTokens.spacing8 (8.0)
iconColor = GiroTokens.colorNeutralLowDefault (#111119)
```

O `iconColor` e aplicado via `iconTheme` no `ChipThemeData` e afeta `avatar`, `deleteIcon` e leading icons automaticamente. Todos os icones devem ser do pacote `fluentui_system_icons`.

**Borda**

Nenhum token de borda foi definido. O componente React nao possui borda. No tema, `side: BorderSide.none` remove a borda padrao que o Flutter Material 3 aplicaria.

**Cores por estado**

```
backgroundColor    = colorNeutralHighMedium (#E8E8EE) -- estado neutral/default
labelColor         = colorNeutralLowDefault  (#111119)
selectedColor      = colorBrandPrimaryLight  (#CADAFF) -- chips selecionados
selectedLabelColor = colorBrandPrimaryDark   (#0D1874)
checkmarkColor     = colorBrandPrimaryDefault (#3B45F2)
disabledColor      = colorNeutralHighLight   (#F5F5FA)
disabledLabelColor = colorNeutralLowLight    (#B8B9BE)
deleteIconColor    = colorNeutralLowMedium   (#88898C)
```

**Elevation**

```
elevation      = 0.0
pressElevation = 0.0
```

Flat, sem sombra, igual ao comportamento do React.

---

## Variantes semanticas

O `ChipThemeData` define um unico `backgroundColor` e um unico `selectedColor`. As variantes semanticas `neutral`, `brand`, `success` e `alert` do design system nao podem ser configuradas globalmente no tema.

O mapeamento de cada variante para o token de cor correspondente e:

```
neutral -> GiroTokens.colorNeutralHighMedium   (#E8E8EE)
brand   -> GiroTokens.colorBrandPrimaryLight   (#CADAFF)
success -> GiroTokens.colorFeedbackSuccessLight (#C1FAE6)
alert   -> GiroTokens.colorFeedbackAlertLight  (#FFC7D8)
```

O tema aplica automaticamente apenas o `neutral` (via `backgroundColor`) e o `brand` (via `selectedColor` para chips selecionados). Para `success` e `alert`, o desenvolvedor deve passar `backgroundColor` diretamente na instancia do widget:

```dart
Chip(
  label: Text('Ativo'),
  backgroundColor: GiroTokens.colorFeedbackSuccessLight,
)
```

Os tokens estao disponiveis via `GiroTokens` ou `GiroChipTokens` importados de `flutter_giro`.

---

## Limitacao do deleteIcon

O `ChipThemeData` do Flutter nao possui uma propriedade `deleteIcon` global. Todo widget que usa `onDeleted` exibira por padrao o icone `Icons.cancel` do Material, que nao faz parte da biblioteca de icones do design system.

Para manter a consistencia visual, qualquer chip com `onDeleted` deve declarar explicitamente:

```dart
deleteIcon: const Icon(FluentIcons.dismiss_16_regular),
```

Esta e uma limitacao do Flutter que nao pode ser contornada via tema.

---

## Exports do pacote

O arquivo `flutter_giro.dart` exporta:

```dart
export 'components/chips/chips.dart';       // re-exports nativos dos widgets
export 'components/chips/chip_tokens.dart'; // GiroChipTokens para uso no ponto de instancia
```

---

## Widgetbook

**Localizacao:** `apps/widgetbook-flutter/lib/stories/chips/chips_story.dart`

**Dependencias da story:** `flutter_giro`, `fluentui_system_icons`, `widgetbook`

**Use cases disponiveis:**

`Default` - playground principal com knobs para label, variant (neutral/brand/success/alert), disabled, left icon e right icon. Demonstra a aplicacao manual de cores por variante no ponto de uso.

`Chip` - widget nativo com deleteIcon FluentUI.

`InputChip` - widget nativo com avatar FluentUI (`person_16_regular`) e deleteIcon FluentUI (`dismiss_16_regular`).

`ChoiceChip` - widget nativo com estado gerenciado por `_ChoiceChipState` (StatefulWidget local). Demonstra selecao exclusiva entre 3 opcoes.

`FilterChip` - widget nativo com estado gerenciado por `_FilterChipState` (StatefulWidget local). Demonstra selecao toggle.

`ActionChip` - widget nativo com avatar FluentUI (`add_16_regular`).

`All Variants` - todos os cinco tipos de chip lado a lado sem knobs, para validacao visual rapida do tema.

`Todas as variantes` - as quatro variantes semanticas do design system (neutral, brand, success, alert) e o estado disabled, demonstrando o uso de `backgroundColor` no ponto de instancia.

`Com icones` - tres chips demonstrando as combinacoes de avatar e deleteIcon com icones FluentUI.

---

## Como atualizar especificacoes visuais

Se o designer alterar padding, tamanho de fonte, cores ou forma dos chips, o fluxo de alteracao e:

1. Atualizar os valores em `chip_tokens.dart`
2. Se a propriedade ja existe no `ChipThemeData`, a alteracao sera propagada automaticamente via `applyGiroTheme()`
3. Se a propriedade nao existe no `ChipThemeData` (como `deleteIcon`), a alteracao precisa ser aplicada no ponto de uso em cada instancia do widget

Para alterar a altura alvo de 30px, ajustar `paddingY` em `chip_tokens.dart` recalculando como: `(altura_alvo - line_height_figtree_14) / 2`.
