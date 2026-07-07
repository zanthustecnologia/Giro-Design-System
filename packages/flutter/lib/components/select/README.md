# Select

## Visao geral

Este diretorio contem a implementacao do componente `GiroSelect` para o Giro Design System no Flutter. O componente e um campo de selecao que abre um `ModalBottomSheet` nativo do Flutter ao ser tocado, exibindo a lista de opcoes. Suporta selecao unica e multipla, com tres variantes visuais para os itens da lista.

A implementacao segue a arquitetura de 4 camadas padrao do pacote `flutter_giro`.

---

## Arquitetura

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary. Nao deve ser editado manualmente.

**Camada 2 - select_tokens.dart** (este diretorio)
Mapeamento semantico dos tokens brutos para o contexto especifico do Select. E a unica camada a ser editada quando as especificacoes visuais mudarem.

**Camada 3 - giro_theme.dart**
Adiciona `BottomSheetThemeData` com `backgroundColor: GiroTokens.colorNeutralHighDefault` para garantir que o sheet herde a cor de fundo correta do tema.

**Camada 4 - giro_select.dart** (este diretorio)
Widget `GiroSelect<T>` com o enum `GiroSelectVariant` e a classe `GiroSelectItem<T>`.

---

## API

### GiroSelectVariant

Enum que define a aparencia de cada item dentro do BottomSheet.

| Valor      | Descricao                                                                 |
|------------|---------------------------------------------------------------------------|
| `text`     | Somente texto (label + subTitle opcional). Padrao.                        |
| `icon`     | Icone a esquerda + texto (label + subTitle opcional). Selecao unica.      |
| `checkbox` | Checkbox a esquerda + texto. Permite multipla selecao, sheet fica aberto. |

---

### GiroSelectItem\<T\>

Modelo de dado que representa uma opcao na lista.

| Propriedade | Tipo      | Obrigatorio | Descricao                                              |
|-------------|-----------|-------------|--------------------------------------------------------|
| `value`     | `T`       | Sim         | Valor unico que identifica o item.                     |
| `label`     | `String`  | Sim         | Texto principal exibido no item.                       |
| `subTitle`  | `String?` | Nao         | Texto secundario abaixo do label (segunda linha).      |
| `icon`      | `Widget?` | Nao         | Icone exibido a esquerda (usado na variante `icon`).   |

> **Nota sobre `subTitle`:** a presenca desse campo e o que determina se o item tera uma ou duas linhas. Disponivel nas tres variantes.

> **Nota sobre `icon`:** deve ser um `Icon` com `FluentIcons.*`. Ignorado nas variantes `text` e `checkbox`.

---

### GiroSelect\<T\>

Widget principal do componente.

| Propriedade          | Tipo                        | Padrao              | Descricao                                                                        |
|----------------------|-----------------------------|---------------------|----------------------------------------------------------------------------------|
| `variant`            | `GiroSelectVariant`         | `text`              | Define a variante visual dos itens no sheet.                                     |
| `label`              | `String?`                   | `null`              | Label flutuante acima do campo.                                                  |
| `hintText`           | `String?`                   | `null`              | Placeholder exibido quando nenhum item esta selecionado.                         |
| `errorText`          | `String?`                   | `null`              | Mensagem de erro exibida abaixo do campo. Muda a borda para vermelho.            |
| `helperText`         | `String?`                   | `null`              | Texto auxiliar exibido abaixo do campo quando nao ha erro.                       |
| `required`           | `bool`                      | `false`             | Adiciona asterisco vermelho ao lado do label.                                    |
| `enabled`            | `bool`                      | `true`              | Quando `false`, desabilita o campo (nao abre o sheet).                           |
| `initialSelections`  | `List<T>`                   | `const []`          | Valores pre-selecionados ao montar o widget.                                     |
| `items`              | `List<GiroSelectItem<T>>`   | Obrigatorio         | Lista de opcoes disponíveis.                                                     |
| `onSelected`         | `ValueChanged<List<T>>?`    | `null`              | Callback chamado sempre que a selecao muda. Recebe a lista completa de valores.  |
| `width`              | `double?`                   | `null`              | Largura fixa do campo. Se omitido, expande para preencher o pai.                 |

---

## Comportamento

### Campo (trigger)

- Exibe o label flutuante quando ha texto ou quando o campo esta focado.
- Exibe o `hintText` quando nenhum item esta selecionado.
- Na variante `text` e `icon` (selecao unica): exibe o `label` do item selecionado.
- Na variante `checkbox` (multipla selecao): exibe os labels de todos os itens selecionados separados por virgula. Se o texto ultrapassar a largura do campo, e truncado com `...`.
- O icone chevron aponta para cima quando o sheet esta aberto e para baixo quando fechado.
- Borda muda para azul (brand primary) quando o sheet esta aberto.
- Borda muda para vermelho quando `errorText` esta preenchido.

### BottomSheet

- Abre com `showModalBottomSheet`, com `showDragHandle: true` (indicador de arraste visivel).
- Fecha automaticamente ao selecionar um item nas variantes `text` e `icon`.
- Na variante `checkbox`, o sheet permanece aberto para permitir multipla selecao. O usuario fecha arrastando para baixo ou tocando fora.
- Cada item tem altura fixa de 44px.
- O item selecionado e destacado com fundo `colorBrandPrimaryLight` e texto `colorBrandPrimaryDefault`.
- O sheet respeita o `viewInsets.bottom` (teclado virtual), caso alguma interacao futura exija isso.

---

## Exemplos de uso

### Selecao unica (variante texto)

```dart
GiroSelect<String>(
  label: 'Estado',
  hintText: 'Selecione um estado',
  items: const [
    GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
    GiroSelectItem(value: 'rj', label: 'Rio de Janeiro'),
    GiroSelectItem(value: 'mg', label: 'Minas Gerais'),
  ],
  onSelected: (values) => print(values),
)
```

### Selecao unica com icone e subtitulo

```dart
GiroSelect<String>(
  variant: GiroSelectVariant.icon,
  label: 'Cidade',
  hintText: 'Selecione uma cidade',
  items: [
    GiroSelectItem(
      value: 'sp',
      label: 'Sao Paulo',
      subTitle: 'Sudeste',
      icon: const Icon(FluentIcons.location_16_regular),
    ),
    GiroSelectItem(
      value: 'rj',
      label: 'Rio de Janeiro',
      subTitle: 'Sudeste',
      icon: const Icon(FluentIcons.location_16_regular),
    ),
  ],
  onSelected: (values) => print(values),
)
```

### Multipla selecao (checkbox)

```dart
GiroSelect<String>(
  variant: GiroSelectVariant.checkbox,
  label: 'Interesses',
  hintText: 'Selecione os interesses',
  items: const [
    GiroSelectItem(value: 'tech', label: 'Tecnologia'),
    GiroSelectItem(value: 'finance', label: 'Financas'),
    GiroSelectItem(value: 'health', label: 'Saude'),
  ],
  onSelected: (values) => print(values), // ['tech', 'finance']
)
```

### Com valor pre-selecionado

```dart
GiroSelect<String>(
  label: 'Estado',
  initialSelections: const ['sp'],
  items: const [
    GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
    GiroSelectItem(value: 'rj', label: 'Rio de Janeiro'),
  ],
  onSelected: (values) => print(values),
)
```

### Com validacao de erro

```dart
GiroSelect<String>(
  label: 'Estado',
  hintText: 'Selecione um estado',
  errorText: hasError ? 'Campo obrigatorio' : null,
  required: true,
  items: const [
    GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
  ],
  onSelected: (values) => print(values),
)
```

### Desabilitado

```dart
GiroSelect<String>(
  label: 'Estado',
  enabled: false,
  initialSelections: const ['sp'],
  items: const [
    GiroSelectItem(value: 'sp', label: 'Sao Paulo'),
  ],
)
```

---

## Tokens (select_tokens.dart)

### Dimensoes e espacamento

| Token                    | Valor                            | Descricao                                      |
|--------------------------|----------------------------------|------------------------------------------------|
| `height`                 | `44.0`                           | Altura do campo trigger.                       |
| `borderRadius`           | `GiroTokens.borderRadius8`       | Arredondamento das bordas.                     |
| `borderWidth`            | `1.0`                            | Espessura da borda.                            |
| `paddingHorizontal`      | `GiroTokens.spacing16`           | Padding interno horizontal do campo.           |
| `labelGap`               | `GiroTokens.spacing4`            | Espaco entre o label e o campo.                |
| `itemHeight`             | `44.0`                           | Altura de cada item no sheet.                  |
| `itemSpacing`            | `GiroTokens.spacing16`           | Espaco entre items no sheet.                   |
| `itemIconSize`           | `20.0`                           | Tamanho do icone do item (variante `icon`).    |
| `itemIconGap`            | `GiroTokens.spacing8`            | Espaco entre icone e texto do item.            |
| `sheetPaddingHorizontal` | `GiroTokens.spacing16`           | Padding horizontal interno do sheet.           |
| `sheetPaddingTop`        | `0.0`                            | Padding superior do sheet (drag handle ja adiciona espaco). |
| `sheetPaddingBottom`     | `GiroTokens.spacing16`           | Padding inferior do sheet.                     |
| `suffixIconSize`         | `16.0`                           | Tamanho do chevron (icone de seta).            |
| `suffixIconPaddingRight` | `GiroTokens.spacing16`           | Distancia do chevron ate a borda direita.      |

### Tipografia

| Token             | Valor                        | Descricao                         |
|-------------------|------------------------------|-----------------------------------|
| `fontFamily`      | `GiroTokens.fontFamilyPrimary` | Familia tipografica (Figtree).  |
| `labelFontSize`   | `GiroTokens.fontSize12`      | Tamanho do label flutuante.       |
| `inputFontSize`   | `GiroTokens.fontSize16`      | Tamanho do texto selecionado.     |
| `subTextFontSize` | `GiroTokens.fontSize14`      | Tamanho do subTitle do item.      |
| `labelFontWeight` | `FontWeight.w400`            | Peso do label.                    |

### Cores

| Token                    | Valor                                  | Descricao                                      |
|--------------------------|----------------------------------------|------------------------------------------------|
| `labelColor`             | `colorNeutralLowDefault`               | Cor do label flutuante.                        |
| `inputColor`             | `colorNeutralLowDefault`               | Cor do texto selecionado.                      |
| `placeholderColor`       | `colorNeutralLowMedium`                | Cor do hintText.                               |
| `helperTextColor`        | `colorNeutralLowMedium`                | Cor do helperText e subTitle.                  |
| `requiredAsteriskColor`  | `colorBrandPrimaryDefault`             | Cor do asterisco de campo obrigatorio.         |
| `backgroundColor`        | `colorNeutralHighDefault`              | Fundo do campo trigger.                        |
| `borderColorDefault`     | `colorNeutralHighDark`                 | Borda no estado normal.                        |
| `borderColorFocus`       | `colorBrandPrimaryDefault`             | Borda quando o sheet esta aberto.              |
| `borderColorError`       | `colorFeedbackAlertDefault`            | Borda quando ha erro.                          |
| `itemSelectedColor`      | `colorBrandPrimaryLight`               | Fundo do item selecionado no sheet.            |
| `itemSelectedTextColor`  | `colorBrandPrimaryDefault`             | Cor do texto/checkbox do item selecionado.     |
| `itemTextColor`          | `colorNeutralLowDefault`               | Cor do texto do item nao selecionado.          |

---

## Decisoes de design

**Por que BottomSheet e nao DropdownButton?**
O `DropdownButton` nativo do Flutter apresenta limitacoes visuais significativas (menu sobrepoe o campo, dificuldade de estilizacao, comportamento inconsistente em telas pequenas). O `ModalBottomSheet` oferece experiencia padrao em apps mobile, melhor acessibilidade e controle total sobre layout e animacao.

**Por que um unico widget com enum de variante?**
Segue o mesmo padrao do componente Select do React no design system, que usa `SelectVariant`. Simplifica a API publica: o consumidor instancia sempre `GiroSelect` e passa `variant:`. Evita proliferacao de widgets (`GiroSelectText`, `GiroSelectIcon`, etc.).

**Por que o sheet fica aberto na variante checkbox?**
Na variante `text` e `icon`, cada toque seleciona um item e a acao esta concluida. Na variante `checkbox`, o usuario pode querer selecionar varios itens antes de fechar, entao manter o sheet aberto e o comportamento esperado.

**Por que `IgnorePointer` no Checkbox?**
O `InkWell` pai ja gerencia o toque. Sem `IgnorePointer`, o `Checkbox` consome o evento e o ripple nao aparece corretamente. O checkbox e puramente visual; o estado e controlado pelo `InkWell`.

**Por que o estado e gerenciado internamente?**
O `GiroSelect` mantem `_selectedValues` internamente para renderizar o trigger e destacar itens no sheet sem exigir que o consumidor gerencie estado. O `onSelected` notifica o pai sempre que ha mudanca, permitindo integracao com formularios.
