# GiroSelect

Componente de campo de selecao do design system Giro, seguindo a arquitetura de 4 camadas.

## Arquitetura

```
generated_tokens.dart   → Camada 1: tokens gerados pelo Style Dictionary
select_tokens.dart      → Camada 2: tokens semanticos do componente
giro_theme.dart         → Camada 3: dropdownMenuTheme aplicado globalmente
giro_select.dart        → Camada 4: wrapper StatelessWidget
```

## Uso

```dart
GiroSelect(
  label: 'Categoria',
  hintText: 'Selecione uma categoria',
  helperText: 'Optional support text',
  required: true,
  width: 320,
  items: const [
    GiroSelectItem(value: 'one', label: 'Option One'),
    GiroSelectItem(value: 'two', label: 'Option Two'),
  ],
  onSelected: (value) => print(value),
)
```

## Props

| Prop | Tipo | Padrao | Descricao |
|------|------|--------|-----------|
| `label` | `String?` | `null` | Label externo acima do campo |
| `hintText` | `String?` | `null` | Placeholder dentro do campo |
| `errorText` | `String?` | `null` | Mensagem de erro (ativa estado de erro) |
| `helperText` | `String?` | `null` | Texto auxiliar abaixo do campo |
| `required` | `bool` | `false` | Exibe asterisco `*` ao lado do label |
| `enabled` | `bool` | `true` | Estado habilitado/desabilitado |
| `initialSelection` | `String?` | `null` | Valor pre-selecionado |
| `items` | `List<GiroSelectItem>` | obrigatorio | Lista de opcoes |
| `onSelected` | `ValueChanged<String?>?` | `null` | Callback chamado ao selecionar um item |
| `enableSearch` | `bool` | `false` | Ativa campo de busca e filtro interno |
| `width` | `double?` | `null` | Largura do campo (ver limitacoes) |

## GiroSelectItem

```dart
const GiroSelectItem({
  required String value,
  required String label,
})
```

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `value` | `String` | Valor interno do item (usado no callback) |
| `label` | `String` | Texto exibido na lista e no trigger |

## Tokens (`GiroSelectTokens`)

| Token | Valor | Fonte |
|-------|-------|-------|
| `height` | `44.0` | Especificacao |
| `borderRadius` | `GiroTokens.borderRadius8` | `8.0` |
| `borderWidth` | `1.0` | `GiroTokens.borderWidth1` |
| `paddingHorizontal` | `GiroTokens.spacing16` | `16.0` |
| `menuBorderRadius` | `GiroTokens.borderRadius8` | `8.0` |
| `menuElevation` | `4.0` | Especificacao |
| `menuMaxHeight` | `320.0` | Especificacao |
| `menuItemHeight` | `44.0` | Especificacao |
| `labelFontSize` | `GiroTokens.fontSize12` | `12.0` |
| `fontSize` | `GiroTokens.fontSize16` | `16.0` |
| `backgroundColor` | `colorNeutralHighDefault` | Branco |
| `borderColorDefault` | `colorNeutralHighDark` | Borda padrao |
| `borderColorFocus` | `colorBrandPrimaryDefault` | Azul |
| `borderColorError` | `colorFeedbackAlertDefault` | Vermelho |
| `textColor` | `colorNeutralLowDefault` | Texto principal |
| `placeholderColor` | `colorNeutralLowMedium` | Placeholder e helper text |
| `iconColor` | `colorNeutralLowDefault` | Chevron |
| `menuBackgroundColor` | `colorNeutralHighDefault` | Fundo do dropdown |
| `itemHoverColor` | `colorNeutralHighMedium` | Hover do item |
| `itemSelectedColor` | `colorBrandPrimaryLight` | Fundo do item selecionado |
| `itemSelectedTextColor` | `colorBrandPrimaryDefault` | Texto do item selecionado |

## Estados

| Estado | Comportamento |
|--------|---------------|
| Default | Borda colorNeutralHighDark, fundo branco |
| Focus | Borda colorBrandPrimaryDefault (azul), definido via dropdownMenuTheme na Camada 3 |
| Error | Borda colorFeedbackAlertDefault (vermelho), label vermelho, errorText renderizado externamente |
| Disabled | Opacity 0.6, fundo branco (colorNeutralHighDefault), borda colorNeutralHighDark, label e helper text em colorNeutralLowLight |

## Icones

Chevron fechado: `FluentIcons.chevron_down_16_regular`, size 16.
Chevron aberto: `FluentIcons.chevron_up_16_regular`, size 16.
Definidos diretamente no `GiroSelect`, sem configuracao externa necessaria.

## Decisoes de Implementacao

### errorText renderizado externamente
O `DropdownMenu` nativo ao receber `errorText` ativa a borda vermelha e renderiza o texto com espaco interno proprio. Para ter controle total sobre posicao e tamanho do texto de erro, o texto nativo e suprimido via `errorStyle: TextStyle(fontSize: 0, height: 0)` no `inputDecorationTheme` local, e um `Text` proprio e renderizado abaixo do campo com gap de 4px.

### Estado desabilitado via Opacity
O `DropdownMenu` desabilitado escurece o fundo por padrao. Para replicar o comportamento do React (background-color: colorNeutralHighDefault + opacity: 0.6), o campo e envolto em `Opacity(opacity: 0.6)` e o `fillColor` e forcado para colorNeutralHighDefault via `inputDecorationTheme` local no estado desabilitado.

### width obrigatorio
O `DropdownMenu` do Flutter exige `width` numerico explicito. Diferente do `TextField`, ele nao expande automaticamente para preencher o espaco disponivel. Quem usa o componente deve passar o valor de largura adequado ao layout. No widgetbook e usado 480px fixo.

### Label externo
O `DropdownMenu` nao suporta label externo nativamente. O label e renderizado acima do campo via `RichText` com as mesmas regras do `GiroTextField`: fontSize 12, fontWeight 400, cor dinamica por estado, asterisco `*` quando required.

### dropdownMenuTheme na Camada 3
O `applyGiroTheme()` configura o `DropdownMenuThemeData` globalmente. Qualquer `DropdownMenu` nativo dentro do app ja herda automaticamente o visual do design system sem precisar do `GiroSelect`.

## Limitacoes Conhecidas

- Nao suporta itens com icone ou subtitulo (variantes `icon` e `checkbox` do React). Aguarda Escopo 2.
- Nao suporta selecao multipla (`multiple`). Aguarda Escopo 2.
- `width` deve ser informado explicitamente -- nao ha expansao automatica.
- Busca via API (`enableApiSearch`, `onApiSearch`) nao implementada. Aguarda Escopo 2.

## Widgetbook

Stories em `apps/widgetbook-flutter/lib/stories/select/select_story.dart`:

| Story | Descricao |
|-------|-----------|
| Default | Todos os knobs configurados |
| Select | Estado padrao com helper text |
| Obrigatorio | required: true com asterisco |
| Com valor selecionado | initialSelection pre-definido |
| Com Erro | errorText ativo com label e borda vermelhos |
| Desabilitado | enabled: false com opacity 0.6 |
| Com busca | enableSearch: true |

## Manutencao

- Novos tokens devem ser adicionados em `select_tokens.dart` referenciando `GiroTokens.*`
- Alteracoes visuais globais de borda e fundo devem ser feitas em `giro_theme.dart` na `dropdownMenuTheme`
- Alteracoes especificas de estado (erro, disabled) devem ser feitas em `giro_select.dart` no `inputDecorationTheme` local
