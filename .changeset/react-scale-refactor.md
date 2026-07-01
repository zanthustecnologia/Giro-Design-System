---
"@giro-ds/react": major
---

## [11.0.0]

### Changed

#### Scale system (todos os componentes)

O sistema de escala foi refatorado em todos os componentes. O mecanismo anterior aplicava `transform: scale()` via classes CSS globais (`.scale-1-0`, `.scale-1-5`, `.scale-2-0`) passadas no `className`. O novo mecanismo injeta CSS custom properties (`--component-scale`) via prop `style` com `useMemo`, eliminando os efeitos colaterais de `transform: scale()` sobre dropdowns, tooltips e elementos posicionados via portal (Radix UI).

Todos os componentes continuam aceitando `scale?: 1 | 1.5 | 2`.

#### Menu

A prop `scale` unifica o comportamento antes dividido entre `dropdownScale` e `buttonScale`. O valor é aplicado simultaneamente ao trigger e ao dropdown.

#### DatePicker

A prop `scale` unifica o comportamento antes dividido entre `datePickerScale` e `calendarScale`. O valor é aplicado simultaneamente ao campo e ao calendário interno.

### Removed

#### Menu

Remove as props `dropdownScale` e `buttonScale` em favor da prop unificada `scale`. Remove também a prop `className` duplicada, que já estava disponível via `BaseProps`.

| Antes | Depois |
| --- | --- |
| `<Menu dropdownScale={1.5} buttonScale={1.5}>` | `<Menu scale={1.5}>` |

#### DatePicker

Remove as props `datePickerScale` e `calendarScale` em favor da prop unificada `scale`. Remove também a prop `className` duplicada, que já estava disponível via `BaseProps`.

| Antes | Depois |
| --- | --- |
| `<DatePicker datePickerScale={2} calendarScale={2} />` | `<DatePicker scale={2} />` |

#### global.scss

Remove as classes `.scale-1-0`, `.scale-1-5` e `.scale-2-0`. A escala agora é controlada exclusivamente via CSS custom property `--component-scale` injetada por `style`.
