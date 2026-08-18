# Dialog

## Visao geral

Este diretorio contem a implementacao do `GiroDialog` para o Giro Design System no
Flutter, alinhado ao componente `Dialog` do React (baseado em Radix UI `AlertDialog`).
Diferente de Chip (sem wrapper) e semelhante a Button/Select, o Dialog precisa de um
wrapper porque a API nativa do Flutter (`AlertDialog`/`Dialog`) nao expressa sozinha
as regras do Design System: largura fixa responsiva (400px / 312px), gap fixo entre
titulo/descricao/acoes e o mapeamento automatico de botoes (secundaria = outlined,
primaria = filled).

Os widgets nativos `AlertDialog`, `SimpleDialog` e `AboutDialog` continuam
re-exportados em `dialogs.dart` para casos que fogem do padrao do Design System.

---

## Arquitetura

**Camada 1 - generated_tokens.dart**
Tokens brutos auto-gerados pelo Style Dictionary.

**Camada 2 - dialog_tokens.dart** (este diretorio)
Mapeamento semantico: largura (400/312 com breakpoint em 1024), padding (24),
gaps (16/32), radius (16), borda, tipografia do titulo/descricao e cor do overlay.

**Camada 3 - giro_theme.dart**
Aplica `backgroundColor` e `shape` (radius + borda) via `DialogThemeData` em
`applyGiroTheme()`. Isso garante que ate `AlertDialog`/`SimpleDialog` nativos
herdem a identidade visual base. Largura e overlay nao sao configuraveis via
`ThemeData` e por isso ficam na Camada 4.

**Camada 4 - giro_dialog.dart** (este diretorio)
- `GiroDialog`: widget que monta titulo, descricao (scrollavel se necessario) e
  acoes dentro de um `ConstrainedBox` com a largura/altura responsivas do token.
- `showGiroDialog()`: helper que chama `showDialog` aplicando o `barrierColor`
  do Design System (30% de opacidade) e constroi o `GiroDialog`.

---

## Regra de negocio (paridade com React)

A acao secundaria (`GiroButton.outlined`) so e renderizada quando
`textSecondaryAction` e informado e nao-vazio — mesma logica do
`!!(textSecondaryAction && textSecondaryAction.trim())` do React. A acao
primaria (`GiroButton.filled`) e sempre exibida.

## API

```dart
showGiroDialog(
  context: context,
  title: 'Confirmar ação',
  bodyContent: 'Tem certeza que deseja continuar?',
  textPrimaryAction: 'Confirmar',
  textSecondaryAction: 'Cancelar',
);
```

Sem `onPrimaryAction`/`onSecondaryAction`, o dialog apenas fecha (`Navigator.pop`),
igual ao comportamento padrao esperado em um dialog de confirmacao simples.
