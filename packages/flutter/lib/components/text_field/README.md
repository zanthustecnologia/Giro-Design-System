# GiroTextField

Componente de campo de texto do design system Giro, seguindo a arquitetura de 4 camadas.

## Arquitetura

```
generated_tokens.dart   → Camada 1: tokens gerados pelo Style Dictionary
text_field_tokens.dart  → Camada 2: tokens semânticos do componente
giro_theme.dart         → Camada 3: inputDecorationTheme aplicado globalmente
giro_text_field.dart    → Camada 4: wrapper StatefulWidget
```

## Uso

```dart
GiroTextField(
  label: 'E-mail',
  hintText: 'exemplo@giro.com',
  helperText: 'Optional support text',
  required: true,
  onChanged: (value) => print(value),
)
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `String?` | `null` | Label externo acima do campo |
| `hintText` | `String?` | `null` | Placeholder dentro do campo |
| `errorText` | `String?` | `null` | Mensagem de erro (ativa estado de erro) |
| `helperText` | `String?` | `null` | Texto auxiliar abaixo do campo |
| `required` | `bool` | `false` | Exibe asterisco `*` ao lado do label |
| `controller` | `TextEditingController?` | `null` | Controller externo (opcional) |
| `onChanged` | `ValueChanged<String>?` | `null` | Callback chamado a cada alteração |
| `keyboardType` | `TextInputType?` | `null` | Tipo de teclado |
| `obscureText` | `bool` | `false` | Oculta o texto (para senhas — ver limitações) |
| `enabled` | `bool` | `true` | Estado habilitado/desabilitado |
| `suffixIcon` | `Widget?` | `null` | Ícone à direita (substituído pelo X quando há texto) |

## Tokens (`GiroTextFieldTokens`)

| Token | Valor | Fonte |
|-------|-------|-------|
| `height` | `44.0` | Especificação |
| `borderRadius` | `GiroTokens.borderRadius8` | `8.0` |
| `borderWidth` | `1.0` | `GiroTokens.borderWidth1` |
| `paddingHorizontal` | `GiroTokens.spacing16` | `16.0` |
| `labelGap` | `GiroTokens.spacing4` | `4.0` |
| `labelFontSize` | `GiroTokens.fontSize12` | `12.0` |
| `inputFontSize` | `GiroTokens.fontSize16` | `16.0` |
| `labelFontWeight` | `FontWeight.w400` | Regular |
| `labelColor` | `colorNeutralLowDefault` | — |
| `inputColor` | `colorNeutralLowDefault` | — |
| `placeholderColor` | `colorNeutralLowMedium` | — |
| `helperTextColor` | `colorNeutralLowMedium` | — |
| `requiredAsteriskColor` | `colorBrandPrimaryDefault` | — |
| `backgroundColor` | `colorNeutralHighDefault` | Branco |
| `borderColorDefault` | `colorNeutralHighDark` | — |
| `borderColorFocus` | `colorBrandPrimaryDefault` | — |
| `borderColorError` | `colorFeedbackAlertDefault` | — |

## Estados

| Estado | Comportamento |
|--------|---------------|
| **Default** | Borda `colorNeutralHighDark`, fundo branco |
| **Focus** | Borda `colorBrandPrimaryDefault` (azul), definido via `inputDecorationTheme` na Camada 3 |
| **Error** | Borda `colorFeedbackAlertDefault` (vermelho), `errorText` renderizado externamente para preservar a altura de 44px |
| **Disabled** | Borda `colorNeutralHighDark`, fundo `colorNeutralHighLight`, texto `colorNeutralLowLight` |

## Comportamento do Botão de Limpar (X)

O botão de limpar aparece automaticamente quando o campo está **em foco** e **possui texto**. Usa `FluentIcons.dismiss_16_regular`.

- Ícone: 16px
- Padding direito: `8px` (para equilibrar visualmente dentro do campo)
- Quando visível, substitui o `suffixIcon` passado externamente

## Ícone de Sufixo

Quando `suffixIcon` é fornecido e não há botão de limpar ativo:

- Tamanho forçado para `16px` via `IconTheme`
- Padding direito: `16px` (alinhado ao `paddingHorizontal` do campo)

## Decisões de Implementação

### `errorText` renderizado externamente
O Flutter nativo ao receber `errorText` no `InputDecoration` altera a altura do campo para acomodar a mensagem. Para preservar a altura fixa de 44px, o `errorText` é renderizado fora do `TextField`, abaixo do `SizedBox`.

### `contentPadding: vertical: 0`
O Flutter usa padding vertical padrão que empurra o texto para baixo dentro do campo. `vertical: 0` força a centralização dentro do `SizedBox` de 44px.

### `suffixIcon` vs `suffix`
O componente usa `suffixIcon` (fora do `contentPadding`) para o botão X e ícones externos. A abordagem com `suffix` (inline com o texto) foi testada mas causou quebra de layout.

### Controller interno
Se `controller` não for fornecido, o componente cria e gerencia um `TextEditingController` interno. Ao trocar o controller externamente via `didUpdateWidget`, o controller interno é descartado corretamente.

## Limitações Conhecidas

- **`obscureText: true`** não exibe botão de olho para revelar a senha. Aguarda implementação de `GiroPasswordField`.
- Não suporta `maxLines > 1` (campo multiline). Campo de texto expandido será um componente separado.

## Widgetbook

Stories em `apps/widgetbook-flutter/lib/stories/text_field/text_field_story.dart`:

| Story | Descrição |
|-------|-----------|
| GiroTextField Playground | Todos os knobs configuráveis |
| Default | Estado padrão com helper text |
| Obrigatório | Com asterisco de campo obrigatório |
| Com Erro | Borda vermelha + mensagem de erro |
| Desabilitado | Estado `enabled: false` |
| Com Ícone de Sufixo | `suffixIcon` com `FluentIcons.mail_16_regular` |
| Todas as variantes | Todas as variantes empilhadas |

## Manutenção

- Novos tokens devem ser adicionados em `text_field_tokens.dart` referenciando `GiroTokens.*`
- Alterações visuais de borda/fundo em foco devem ser feitas em `giro_theme.dart` → `inputDecorationTheme`
- Novos estados (hover, loading) devem seguir o mesmo padrão de delegação para tokens
