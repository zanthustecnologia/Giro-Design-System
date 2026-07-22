# Semantic Typography

Tokens que mapeiam a escala tipográfica do core em papéis de estilo de texto.

---

## Escala

| Papel | Uso típico |
| --- | --- |
| `label` | Rótulos de campo, captions, badges, tags |
| `body` | Texto corrido, parágrafos, descrições |
| `title` | Títulos de seção, cabeçalhos de card |
| `heading` | Títulos de página e seções principais |
| `display` | Títulos de hero, marketing, telas de apresentação |

---

## Size

| Token | Alias |
| --- | --- |
| `font.size.label.sm` | `font.size.12` |
| `font.size.label.md` | `font.size.14` |
| `font.size.label.lg` | `font.size.16` |
| `font.size.body.sm` | `font.size.14` |
| `font.size.body.md` | `font.size.16` |
| `font.size.body.lg` | `font.size.18` |
| `font.size.title.sm` | `font.size.18` |
| `font.size.title.md` | `font.size.20` |
| `font.size.title.lg` | `font.size.24` |
| `font.size.heading.sm` | `font.size.28` |
| `font.size.heading.md` | `font.size.32` |
| `font.size.heading.lg` | `font.size.40` |
| `font.size.display.sm` | `font.size.48` |
| `font.size.display.md` | `font.size.64` |
| `font.size.display.lg` | `font.size.96` |

---

## Weight

| Token | Alias |
| --- | --- |
| `font.weight.label` | `font.weight.medium` |
| `font.weight.body` | `font.weight.regular` |
| `font.weight.title` | `font.weight.medium` |
| `font.weight.heading` | `font.weight.bold` |
| `font.weight.display` | `font.weight.bold` |

---

## Line Height

| Token | Alias |
| --- | --- |
| `font.lineHeight.label.sm` | `font.lineHeight.12` |
| `font.lineHeight.label.md` | `font.lineHeight.16` |
| `font.lineHeight.label.lg` | `font.lineHeight.20` |
| `font.lineHeight.body.sm` | `font.lineHeight.20` |
| `font.lineHeight.body.md` | `font.lineHeight.24` |
| `font.lineHeight.body.lg` | `font.lineHeight.28` |
| `font.lineHeight.title.sm` | `font.lineHeight.24` |
| `font.lineHeight.title.md` | `font.lineHeight.28` |
| `font.lineHeight.title.lg` | `font.lineHeight.32` |
| `font.lineHeight.heading.sm` | `font.lineHeight.32` |
| `font.lineHeight.heading.md` | `font.lineHeight.40` |
| `font.lineHeight.heading.lg` | `font.lineHeight.48` |
| `font.lineHeight.display.sm` | `font.lineHeight.56` |
| `font.lineHeight.display.md` | `font.lineHeight.64` |
| `font.lineHeight.display.lg` | `font.lineHeight.96` |

---

## Family

| Token | Alias | Descrição |
| --- | --- | --- |
| `font.family.body` | `font.family.primary` | Família para texto corrido |
| `font.family.heading` | `font.family.primary` | Família para títulos e displays |

---

## Letter Spacing

| Token | Alias | Descrição |
| --- | --- | --- |
| `font.letterSpacing.label` | `font.letterSpacing.wide` | Rótulos e labels — leve abertura |
| `font.letterSpacing.body` | `font.letterSpacing.normal` | Texto corrido — neutro |
| `font.letterSpacing.heading` | `font.letterSpacing.tight` | Títulos — leve compressão |
| `font.letterSpacing.display` | `font.letterSpacing.tight` | Displays — leve compressão |

---

## Regras

- Cada papel tipográfico tem `size`, `weight`, `lineHeight` e `letterSpacing` correspondentes — usá-los em conjunto.
- Não misturar papéis: `display` não deve aparecer em tabelas, listas ou texto corrido.
- Componentes não referenciam tokens core tipográficos diretamente.
