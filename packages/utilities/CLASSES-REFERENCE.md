# 📚 Referência Completa de Classes Utilitárias

> **Design System Monorepo - @giro-ds/utilities v1.0.1**  
> Gerado em: 9 de dezembro de 2025

---

## 📖 Índice

1. [Breakpoints Responsivos](#breakpoints-responsivos)
2. [Spacing (Margin & Padding)](#spacing-margin--padding)
3. [Gap](#gap)
4. [Colors](#colors)
5. [Typography](#typography)
6. [Borders](#borders)
7. [Sizing (Width & Height)](#sizing-width--height)
8. [Display](#display)
9. [Flexbox](#flexbox)
10. [Grid](#grid)
11. [Position](#position)
12. [Opacity](#opacity)

---

## 🎯 Breakpoints Responsivos

Todas as classes podem ser prefixadas com os seguintes breakpoints:

- `sm:` - min-width: 640px
- `md:` - min-width: 768px
- `lg:` - min-width: 1024px
- `xl:` - min-width: 1280px
- `2xl:` - min-width: 1536px

**Exemplo:** `.m-4`, `md:m-8`, `lg:m-16`

---

## 📏 Spacing (Margin & Padding)

### Margin Classes

#### Todas as direções
`.m-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Eixo X (left + right)
`.mx-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Eixo Y (top + bottom)
`.my-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Top
`.mt-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Right
`.mr-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Bottom
`.mb-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Left
`.ml-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

### Padding Classes

#### Todas as direções
`.p-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Eixo X (left + right)
`.px-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Eixo Y (top + bottom)
`.py-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Top
`.pt-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

#### Right
`.pr-{value}`
## 🔲 Gap

### Gap (todas as direções)
`.gap-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

### Gap X (column-gap)
`.gap-x-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

### Gap Y (row-gap)
`.gap-y-{value}`
- Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

### Gap Default (responsivo por breakpoint)
`.gap-default`

**Total de classes de gap:** 46 classes base + versões responsivas

### Gap (todas as direções)
- `.gap-0`, `.gap-4`, `.gap-8`, `.gap-12`, `.gap-16`, `.gap-24`, `.gap-32`, `.gap-40`, `.gap-48`, `.gap-56`, `.gap-64`, `.gap-80`, `.gap-120`, `.gap-160`, `.gap-200`

### Gap X (column-gap)
- `.gap-x-0`, `.gap-x-4`, `.gap-x-8`, `.gap-x-12`, `.gap-x-16`, `.gap-x-24`, `.gap-x-32`, `.gap-x-40`, `.gap-x-48`, `.gap-x-56`, `.gap-x-64`, `.gap-x-80`, `.gap-x-120`, `.gap-x-160`, `.gap-x-200`

### Gap Y (row-gap)
- `.gap-y-0`, `.gap-y-4`, `.gap-y-8`, `.gap-y-12`, `.gap-y-16`, `.gap-y-24`, `.gap-y-32`, `.gap-y-40`, `.gap-y-48`, `.gap-y-56`, `.gap-y-64`, `.gap-y-80`, `.gap-y-120`, `.gap-y-160`, `.gap-y-200`

### Gap Default (responsivo por breakpoint)
- `.gap-default`

**Total de classes de gap:** 46 classes base + versões responsivas
## 🎨 Colors

### Background Colors
`.bg-{color}`

**Brand Primary:**
- default, dark, medium, light

**Brand Secondary:**
- default, dark, medium, light

**Neutral Low:**
- default, dark, medium, light

**Neutral High:**
- default, dark, medium, light

**Feedback Alert:**
- default, dark, medium, light

**Feedback Success:**
- default, dark, medium, light

**Utilitários:**
- transparent, current

### Text Colors
`.text-{color}`

**Brand Primary:**
- default, dark, medium, light

**Brand Secondary:**
- default, dark, medium, light

**Neutral Low:**
## ✍️ Typography

### Font Family
`.font-{family}`
- primary

### Font Size
`.text-{size}`
- 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64, 96, inherit

### Font Weight
`.font-{weight}`
- regular, medium, bold

### Text Align
`.text-{align}`
- left, center, right, justify

### Text Transform
- `.uppercase` - text-transform: uppercase
- `.lowercase` - text-transform: lowercase
- `.capitalize` - text-transform: capitalize
- `.normal-case` - text-transform: none

## 🔳 Borders

### Border Radius

#### Todas as direções
`.rounded-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Top
`.rounded-t-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Bottom
`.rounded-b-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Left
`.rounded-l-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Right
`.rounded-r-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Top Left
`.rounded-tl-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Top Right
`.rounded-tr-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Bottom Left
`.rounded-bl-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

#### Bottom Right
`.rounded-br-{size}`
- Valores: none, 4, 8, 12, 16, 24, pill, circular

### Border Width

#### Todas as direções
`.border-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Top
`.border-t-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Bottom
`.border-b-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Left
`.border-l-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Right
`.border-r-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Eixo X (left + right)
`.border-x-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

#### Eixo Y (top + bottom)
`.border-y-{width}`
- Valores: 0, 1, 2, 4, 6, 8, 12

### Border Style
- `.border-solid` - border-style: solid
- `.border-dashed` - border-style: dashed
- `.border-dotted` - border-style: dotted
- `.border-none` - border-style: none

**Total de classes de borders:** 125 classes base + versões responsivas
#### Todas as direções
- `.rounded-none`, `.rounded-4`, `.rounded-8`, `.rounded-12`, `.rounded-16`, `.rounded-24`, `.rounded-pill`, `.rounded-circular`

#### Top
- `.rounded-t-none`, `.rounded-t-4`, `.rounded-t-8`, `.rounded-t-12`, `.rounded-t-16`, `.rounded-t-24`, `.rounded-t-pill`, `.rounded-t-circular`

#### Bottom
- `.rounded-b-none`, `.rounded-b-4`, `.rounded-b-8`, `.rounded-b-12`, `.rounded-b-16`, `.rounded-b-24`, `.rounded-b-pill`, `.rounded-b-circular`

#### Left
- `.rounded-l-none`, `.rounded-l-4`, `.rounded-l-8`, `.rounded-l-12`, `.rounded-l-16`, `.rounded-l-24`, `.rounded-l-pill`, `.rounded-l-circular`

#### Right
- `.rounded-r-none`, `.rounded-r-4`, `.rounded-r-8`, `.rounded-r-12`, `.rounded-r-16`, `.rounded-r-24`, `.rounded-r-pill`, `.rounded-r-circular`

#### Top Left
- `.rounded-tl-none`, `.rounded-tl-4`, `.rounded-tl-8`, `.rounded-tl-12`, `.rounded-tl-16`, `.rounded-tl-24`, `.rounded-tl-pill`, `.rounded-tl-circular`

#### Top Right
- `.rounded-tr-none`, `.rounded-tr-4`, `.rounded-tr-8`, `.rounded-tr-12`, `.rounded-tr-16`, `.rounded-tr-24`, `.rounded-tr-pill`, `.rounded-tr-circular`

#### Bottom Left
- `.rounded-bl-none`, `.rounded-bl-4`, `.rounded-bl-8`, `.rounded-bl-12`, `.rounded-bl-16`, `.rounded-bl-24`, `.rounded-bl-pill`, `.rounded-bl-circular`

#### Bottom Right
- `.rounded-br-none`, `.rounded-br-4`, `.rounded-br-8`, `.rounded-br-12`, `.rounded-br-16`, `.rounded-br-24`, `.rounded-br-pill`, `.rounded-br-circular`

### Border Width

## 📐 Sizing (Width & Height)

### Width
`.w-{size}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, screen, min, max, fit

### Height
`.h-{size}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, screen (100vh), min, max, fit

### Min Width
`.min-w-{size}`
- Valores: 0, full, min, max, fit

### Max Width
`.max-w-{size}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: full, min, max, fit, screen

### Min Height
`.min-h-{size}`
- Valores: 0, full, screen, min, max, fit

### Max Height
`.max-h-{size}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
## 👁️ Display

### Display Type
- `.block` - display: block
- `.inline-block` - display: inline-block
- `.inline` - display: inline
- `.hidden` - display: none

### Visibility
- `.visible` - visibility: visible
- `.invisible` - visibility: hidden

### Overflow

#### Overflow (todas as direções)
`.overflow-{type}`
- Valores: auto, hidden, visible, scroll
## 🔀 Flexbox

### Flex Base
- `.flex` - display: flex

### Flex Direction
- `.flex-row` - flex-direction: row
- `.flex-col` - flex-direction: column

### Flex Wrap
- `.flex-wrap` - flex-wrap: wrap
- `.flex-nowrap` - flex-wrap: nowrap

### Justify Content
`.justify-{value}`
- start, center, end, between, around, evenly

### Align Items
`.items-{value}`
- start, center, end, stretch, baseline

### Align Self
`.self-{value}`
- auto, start, center, end, stretch

### Flex Grow
- `.grow` - flex-grow: 1
- `.grow-0` - flex-grow: 0

### Flex Shrink
- `.shrink` - flex-shrink: 1
- `.shrink-0` - flex-shrink: 0

**Total de classes de flexbox:** 25 classes base + versões responsivas

---

## 👁️ Display

## 📊 Grid

### Grid Base
- `.grid` - display: grid

### Grid Template Columns
`.grid-cols-{n}`
- Valores: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

### Grid Template Rows
`.grid-rows-{n}`
- Valores: 1, 2, 3, 4, 5, 6

### Column Span
`.col-span-{n}`
- Valores: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, full

### Row Span
`.row-span-{n}`
- Valores: 1, 2, 3, 4, 5, 6, full

### Place Items
`.place-items-{value}`
- start, center, end, stretch

### Place Content
`.place-content-{value}`
- start, center, end, between, around, evenly

## 📍 Position

### Position Type
- `.static` - position: static
- `.relative` - position: relative
- `.absolute` - position: absolute
- `.fixed` - position: fixed
- `.sticky` - position: sticky

### Top
`.top-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, half

### Right
`.right-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, half

### Bottom
`.bottom-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, half

### Left
`.left-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, half

### Inset (todas as direções)
`.inset-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
- Valores especiais: auto, full, half

### Inset X (left + right)
`.inset-x-{value}`
- Valores numéricos: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200
## 🌫️ Opacity

### Opacity Levels
`.opacity-{level}`
- 0 (0), 5 (0.05), 10 (0.1), 20 (0.2), 25 (0.25), 30 (0.3), 40 (0.4), 50 (0.5), 60 (0.6), 70 (0.7), 75 (0.75), 80 (0.8), 90 (0.9), 95 (0.95), 100 (1)

**Total de classes de opacity:** 15 classes base + versões responsivas

**Total de classes de position:** 113 classes base + versões responsivas

### Row Span
- `.row-span-1`, `.row-span-2`, `.row-span-3`, `.row-span-4`, `.row-span-5`, `.row-span-6`
- `.row-span-full`

### Place Items
- `.place-items-start`, `.place-items-center`, `.place-items-end`, `.place-items-stretch`

### Place Content
- `.place-content-start`, `.place-content-center`, `.place-content-end`, `.place-content-between`, `.place-content-around`, `.place-content-evenly`

**Total de classes de grid:** 49 classes base + versões responsivas

---

## 📍 Position

### Position Type
- `.static`, `.relative`, `.absolute`, `.fixed`, `.sticky`

### Top
- `.top-0`, `.top-4`, `.top-8`, `.top-12`, `.top-16`, `.top-24`, `.top-32`, `.top-40`, `.top-48`, `.top-56`, `.top-64`, `.top-80`, `.top-120`, `.top-160`, `.top-200`
- `.top-auto`, `.top-full`, `.top-half`

### Right
- `.right-0`, `.right-4`, `.right-8`, `.right-12`, `.right-16`, `.right-24`, `.right-32`, `.right-40`, `.right-48`, `.right-56`, `.right-64`, `.right-80`, `.right-120`, `.right-160`, `.right-200`
- `.right-auto`, `.right-full`, `.right-half`

### Bottom
- `.bottom-0`, `.bottom-4`, `.bottom-8`, `.bottom-12`, `.bottom-16`, `.bottom-24`, `.bottom-32`, `.bottom-40`, `.bottom-48`, `.bottom-56`, `.bottom-64`, `.bottom-80`, `.bottom-120`, `.bottom-160`, `.bottom-200`
- `.bottom-auto`, `.bottom-full`, `.bottom-half`

### Left
- `.left-0`, `.left-4`, `.left-8`, `.left-12`, `.left-16`, `.left-24`, `.left-32`, `.left-40`, `.left-48`, `.left-56`, `.left-64`, `.left-80`, `.left-120`, `.left-160`, `.left-200`
- `.left-auto`, `.left-full`, `.left-half`

### Inset (todas as direções)
- `.inset-0`, `.inset-4`, `.inset-8`, `.inset-12`, `.inset-16`, `.inset-24`, `.inset-32`, `.inset-40`, `.inset-48`, `.inset-56`, `.inset-64`, `.inset-80`, `.inset-120`, `.inset-160`, `.inset-200`
- `.inset-auto`, `.inset-full`, `.inset-half`

### Inset X (left + right)
- `.inset-x-0`, `.inset-x-4`, `.inset-x-8`, `.inset-x-12`, `.inset-x-16`, `.inset-x-24`, `.inset-x-32`, `.inset-x-40`, `.inset-x-48`, `.inset-x-56`, `.inset-x-64`, `.inset-x-80`, `.inset-x-120`, `.inset-x-160`, `.inset-x-200`
- `.inset-x-auto`, `.inset-x-full`, `.inset-x-half`

### Inset Y (top + bottom)
- `.inset-y-0`, `.inset-y-4`, `.inset-y-8`, `.inset-y-12`, `.inset-y-16`, `.inset-y-24`, `.inset-y-32`, `.inset-y-40`, `.inset-y-48`, `.inset-y-56`, `.inset-y-64`, `.inset-y-80`, `.inset-y-120`, `.inset-y-160`, `.inset-y-200`
- `.inset-y-auto`, `.inset-y-full`, `.inset-y-half`

**Total de classes de position:** 113 classes base + versões responsivas

---

## 🌫️ Opacity

### Opacity Levels
- `.opacity-0`, `.opacity-5`, `.opacity-10`, `.opacity-20`, `.opacity-25`, `.opacity-30`, `.opacity-40`, `.opacity-50`, `.opacity-60`, `.opacity-70`, `.opacity-75`, `.opacity-80`, `.opacity-90`, `.opacity-95`, `.opacity-100`

**Total de classes de opacity:** 15 classes base + versões responsivas

---

## 📊 Resumo Total

| Categoria | Classes Base | Com Responsivo (estimado) |
|-----------|--------------|---------------------------|
| Spacing | 210 | ~1,260 |
| Gap | 46 | ~276 |
| Colors | 78 | ~468 |
| Typography | 28 | ~168 |
| Borders | 125 | ~750 |
| Sizing | 91 | ~546 |
| Display | 18 | ~108 |
| Flexbox | 25 | ~150 |
| Grid | 49 | ~294 |
| Position | 113 | ~678 |
| Opacity | 15 | ~90 |
| **TOTAL** | **798** | **~4,788** |

---

## ℹ️ Notas

- Todas as classes acima possuem versões responsivas para os breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Os valores numéricos (4, 8, 12, etc.) estão em pixels e seguem os design tokens definidos
- As cores seguem a nomenclatura do design system: brand, neutral, feedback
- Classes de position usam `.top-half`, `.right-half`, etc. para 50% (não `.top-1/2` devido a limitações do SCSS)
