# Semantic Spacing

Tokens que mapeiam a escala de espaçamento do core em papéis de layout.

---

## Inset

Espaçamento interno de componentes (padding).

| Token | Alias |
| --- | --- |
| `inset.2xs` | `spacing.4` |
| `inset.xs` | `spacing.8` |
| `inset.sm` | `spacing.12` |
| `inset.md` | `spacing.16` |
| `inset.lg` | `spacing.24` |
| `inset.xl` | `spacing.32` |

---

## Gap

Espaço entre elementos irmãos (flex/grid gap).

| Token | Alias |
| --- | --- |
| `gap.2xs` | `spacing.4` |
| `gap.xs` | `spacing.8` |
| `gap.sm` | `spacing.12` |
| `gap.md` | `spacing.16` |
| `gap.lg` | `spacing.24` |
| `gap.xl` | `spacing.32` |

---

## Stack

Espaçamento vertical entre blocos empilhados.

| Token | Alias |
| --- | --- |
| `stack.2xs` | `spacing.4` |
| `stack.xs` | `spacing.8` |
| `stack.sm` | `spacing.12` |
| `stack.md` | `spacing.16` |
| `stack.lg` | `spacing.24` |
| `stack.xl` | `spacing.32` |
| `stack.2xl` | `spacing.40` |

---

## Container

Respiro interno de blocos estruturais — cards, modais, drawers.

| Token | Alias |
| --- | --- |
| `container.sm` | `spacing.16` |
| `container.md` | `spacing.24` |
| `container.lg` | `spacing.32` |
| `container.xl` | `spacing.40` |
| `container.2xl` | `spacing.48` |

---

## Famílias

| Família | Intenção |
| --- | --- |
| `inset` | Espaço **dentro** de um elemento |
| `gap` | Espaço **entre** elementos irmãos |
| `stack` | Espaço **vertical** entre blocos empilhados |
| `container` | Respiro interno de estruturas maiores |

---

## Regras

- O mesmo valor físico pode aparecer em famílias diferentes — a intenção de uso é o que os distingue.
- `container` é para blocos maiores; `inset` para micro componentes.
- Componentes não referenciam o core (`spacing.16`) diretamente.
