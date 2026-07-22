# Semantic Opacity

Tokens que mapeiam a escala de opacidade do core em papéis de uso na interface.

---

## Role

| Token | Alias | Valor | Descrição |
| --- | --- | --- | --- |
| `opacity.hover` | `opacity.8` | 8% | Camada de hover sobre um elemento |
| `opacity.pressed` | `opacity.12` | 12% | Camada de pressed sobre um elemento |
| `opacity.overlay` | `opacity.24` | 24% | Camada leve sobre conteúdo |
| `opacity.disabled` | `opacity.32` | 32% | Opacidade de elementos desativados |
| `opacity.scrim` | `opacity.48` | 48% | Scrim sobre conteúdo de fundo |

---

## Regras

- `hover` e `pressed` são usados como overlay de cor — não como `opacity` do elemento inteiro.
- `scrim` é reservado para bloqueio de interação com o fundo (ex: fundo de modal).
- `disabled` pode ser aplicado como `opacity` direta no elemento.
