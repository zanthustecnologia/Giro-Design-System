# Semantic Border

Tokens que mapeiam a escala de espessura de borda do core em papÃ©is de uso.

---

## Width

| Token | Alias | Valor | DescriÃ§Ã£o |
| --- | --- | --- | --- |
| `border.width.default` | `border.width.1` | 1px | Borda padrÃ£o de componentes |
| `border.width.medium` | `border.width.2` | 2px | Borda de Ãªnfase ou seleÃ§Ã£o |
| `border.width.strong` | `border.width.4` | 4px | Borda de destaque estrutural |
| `border.width.focus` | `border.width.2` | 2px | Anel de foco |

---

## Regras

- `focus` e `medium` compartilham o mesmo valor, mas tÃªm intenÃ§Ãµes distintas â€” nÃ£o sÃ£o intercambiÃ¡veis.
- Componentes nÃ£o referenciam `border.width.2` diretamente; usam `border.width.medium` ou `border.width.focus` conforme o papel.
