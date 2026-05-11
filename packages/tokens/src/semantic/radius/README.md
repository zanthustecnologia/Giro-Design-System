# Semantic Radius

Tokens que mapeiam a escala de raio de borda do core em papéis de componente.

---

## Role

| Token | Alias | Valor | Descrição |
| --- | --- | --- | --- |
| `radius.xs` | `radius.4` | 4px | Elementos muito compactos |
| `radius.sm` | `radius.8` | 8px | Componentes pequenos |
| `radius.md` | `radius.12` | 12px | Componentes padrão |
| `radius.lg` | `radius.16` | 16px | Componentes com mais arredondamento |
| `radius.xl` | `radius.24` | 24px | Componentes muito arredondados |
| `radius.full` | `radius.pill` | 500px | Elementos alongados completamente arredondados |
| `radius.round` | `radius.circular` | 100% | Elementos circulares |

---

## Regras

- Consistência de raio dentro de um mesmo componente é obrigatória.
- `full` é para elementos alongados (badges, chips, botões pílula); `round` é para elementos quadrados (avatares, botões de ícone).
- Não usar `radius.4` diretamente em componentes — usar `radius.xs`.
