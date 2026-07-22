# Semantic Motion

Tokens que mapeiam durações e curvas de animação do core em papéis de interação.

---

## Duration

| Token | Alias | Valor | Descrição |
| --- | --- | --- | --- |
| `duration.interact` | `motion.duration.fast` | 120ms | Feedback imediato de controles |
| `duration.appear` | `motion.duration.moderate` | 180ms | Entrada de elementos na tela |
| `duration.disappear` | `motion.duration.fast` | 120ms | Saída de elementos da tela |
| `duration.expand` | `motion.duration.slow` | 240ms | Expansão de regiões |
| `duration.collapse` | `motion.duration.moderate` | 180ms | Colapso de regiões |
| `duration.page` | `motion.duration.slower` | 320ms | Transições de página ou fluxo |

---

## Easing

| Token | Alias | Descrição |
| --- | --- | --- |
| `easing.enter` | `motion.easing.decelerate` | Elementos entrando na tela (desaceleram) |
| `easing.exit` | `motion.easing.accelerate` | Elementos saindo da tela (aceleram) |

---

## Regras

- Elementos que entram usam `enter`; elementos que saem usam `exit`.
- Saídas são mais rápidas que entradas — `disappear` < `appear`.
- Não usar `page` para micro interações de controle.
