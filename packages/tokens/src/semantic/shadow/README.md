# Semantic Shadow

Tokens que mapeiam a escala de sombras do core em papéis de elevação.

---

## Elevation

| Token | Alias | Descrição |
| --- | --- | --- |
| `shadow.raised` | `shadow.sm` | Cards e elementos ligeiramente elevados |
| `shadow.overlay` | `shadow.md` | Dropdowns, tooltips e popovers |
| `shadow.dialog` | `shadow.lg` | Modais e drawers |

---

## Regras

- Sombra comunica elevação — elementos mais próximos do usuário têm sombra maior.
- Não usar `dialog` para elementos não-modais.
- Não usar sombras core (`shadow.md`) diretamente em componentes.
