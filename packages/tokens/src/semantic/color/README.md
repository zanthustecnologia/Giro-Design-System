# Semantic Colors

Tokens que mapeiam a fundação cromática em papéis de uso na interface.

---

## Background

Plano de fundo estrutural da interface — páginas e seções amplas.

| Token | Alias | Descrição |
| --- | --- | --- |
| `background.default` | `color.neutral.0` | Fundo base |
| `background.subtle` | `color.neutral.100` | Fundo levemente rebaixado |
| `background.inverse` | `color.neutral.900` | Fundo invertido |
| `background.brand.subtle` | `color.brand.primary.100` | Fundo de marca suave |
| `background.success.subtle` | `color.feedback.success.100` | Fundo de sucesso suave |
| `background.alert.subtle` | `color.feedback.alert.100` | Fundo de alerta suave |

---

## Surface

Camadas de conteúdo sobre o background — cards, modais, drawers, painéis.

| Token | Alias | Descrição |
| --- | --- | --- |
| `surface.default` | `color.neutral.0` | Superfície base |
| `surface.subtle` | `color.neutral.100` | Superfície leve |
| `surface.sunken` | `color.neutral.200` | Superfície rebaixada |
| `surface.inverse` | `color.neutral.900` | Superfície invertida |
| `surface.brand.default` | `color.brand.primary.500` | Superfície de marca |
| `surface.brand.subtle` | `color.brand.primary.100` | Superfície de marca suave |
| `surface.success.default` | `color.feedback.success.500` | Superfície de sucesso |
| `surface.success.subtle` | `color.feedback.success.100` | Superfície de sucesso suave |
| `surface.alert.default` | `color.feedback.alert.500` | Superfície de alerta |
| `surface.alert.subtle` | `color.feedback.alert.100` | Superfície de alerta suave |

---

## Text

Conteúdo textual da interface.

| Token | Alias | Descrição |
| --- | --- | --- |
| `text.primary` | `color.neutral.900` | Texto principal |
| `text.secondary` | `color.neutral.800` | Texto secundário |
| `text.placeholder` | `color.neutral.700` | Texto auxiliar ou placeholder |
| `text.disabled` | `color.neutral.600` | Texto desativado |
| `text.inverse` | `color.neutral.0` | Texto sobre fundo invertido |
| `text.brand` | `color.brand.primary.500` | Texto de marca |
| `text.onBrand` | `color.neutral.0` | Texto sobre surface de marca |
| `text.onSecondary` | `color.neutral.900` | Texto sobre surface secundária |
| `text.success` | `color.feedback.success.700` | Texto contextual positivo |
| `text.onSuccess` | `color.neutral.0` | Texto sobre surface de sucesso |
| `text.alert` | `color.feedback.alert.700` | Texto contextual de alerta |
| `text.onAlert` | `color.neutral.0` | Texto sobre surface de alerta |

---

## Icon

Espelha a hierarquia de `text`.

| Token | Alias | Descrição |
| --- | --- | --- |
| `icon.primary` | `color.neutral.900` | Ícone principal |
| `icon.secondary` | `color.neutral.800` | Ícone secundário |
| `icon.disabled` | `color.neutral.600` | Ícone desativado |
| `icon.inverse` | `color.neutral.0` | Ícone sobre fundo invertido |
| `icon.brand` | `color.brand.primary.500` | Ícone de marca |
| `icon.onBrand` | `color.neutral.0` | Ícone sobre surface de marca |
| `icon.onSecondary` | `color.neutral.900` | Ícone sobre surface secundária |
| `icon.success` | `color.feedback.success.700` | Ícone contextual positivo |
| `icon.onSuccess` | `color.neutral.0` | Ícone sobre surface de sucesso |
| `icon.alert` | `color.feedback.alert.700` | Ícone contextual de alerta |
| `icon.onAlert` | `color.neutral.0` | Ícone sobre surface de alerta |

---

## Border

Contornos e separações estruturais.

| Token | Alias | Descrição |
| --- | --- | --- |
| `border.subtle` | `color.neutral.200` | Borda muito leve |
| `border.default` | `color.neutral.300` | Borda padrão |
| `border.strong` | `color.neutral.700` | Borda enfatizada |
| `border.disabled` | `color.neutral.200` | Borda de estado desativado |
| `border.inverse` | `color.neutral.0` | Borda sobre fundo invertido |
| `border.brand` | `color.brand.primary.500` | Borda de marca |
| `border.success` | `color.feedback.success.500` | Borda contextual positiva |
| `border.alert` | `color.feedback.alert.500` | Borda contextual de alerta |

---

## Interactive

Cor de ação e estados interativos.

| Token | Alias | Descrição |
| --- | --- | --- |
| `interactive.primary.default` | `color.brand.primary.500` | Ação primária |
| `interactive.primary.hover` | `color.brand.primary.300` | Ação primária — hover |
| `interactive.primary.pressed` | `color.brand.primary.700` | Ação primária — pressed |
| `interactive.primary.disabled` | `color.neutral.300` | Ação primária — desativada |
| `interactive.secondary.default` | `color.brand.secondary.500` | Ação secundária |
| `interactive.secondary.hover` | `color.brand.secondary.300` | Ação secundária — hover |
| `interactive.secondary.pressed` | `color.brand.secondary.700` | Ação secundária — pressed |
| `interactive.secondary.disabled` | `color.neutral.300` | Ação secundária — desativada |
| `interactive.alert.default` | `color.feedback.alert.500` | Ação destrutiva |
| `interactive.alert.hover` | `color.feedback.alert.300` | Ação destrutiva — hover |
| `interactive.alert.pressed` | `color.feedback.alert.700` | Ação destrutiva — pressed |
| `interactive.alert.disabled` | `color.neutral.300` | Ação destrutiva — desativada |

---

## Focus

Indicador de foco visível.

| Token | Alias | Descrição |
| --- | --- | --- |
| `focus.ring.default` | `color.brand.primary.500` | Foco padrão |
| `focus.ring.inverse` | `color.neutral.0` | Foco sobre fundo invertido |

---

## Regras

- Componentes consomem tokens semânticos — nunca tokens core diretamente.
- `background` é para estrutura de página; `surface` é para elementos sobre ela.
- Tokens `on*` são exclusivos para conteúdo sobre superfícies coloridas sólidas.
- Foco é família própria — não usar `border` para representar foco.
