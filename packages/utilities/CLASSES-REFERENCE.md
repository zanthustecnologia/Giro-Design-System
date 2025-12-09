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
- `.m-0`, `.m-4`, `.m-8`, `.m-12`, `.m-16`, `.m-24`, `.m-32`, `.m-40`, `.m-48`, `.m-56`, `.m-64`, `.m-80`, `.m-120`, `.m-160`, `.m-200`

#### Eixo X (left + right)
- `.mx-0`, `.mx-4`, `.mx-8`, `.mx-12`, `.mx-16`, `.mx-24`, `.mx-32`, `.mx-40`, `.mx-48`, `.mx-56`, `.mx-64`, `.mx-80`, `.mx-120`, `.mx-160`, `.mx-200`

#### Eixo Y (top + bottom)
- `.my-0`, `.my-4`, `.my-8`, `.my-12`, `.my-16`, `.my-24`, `.my-32`, `.my-40`, `.my-48`, `.my-56`, `.my-64`, `.my-80`, `.my-120`, `.my-160`, `.my-200`

#### Top
- `.mt-0`, `.mt-4`, `.mt-8`, `.mt-12`, `.mt-16`, `.mt-24`, `.mt-32`, `.mt-40`, `.mt-48`, `.mt-56`, `.mt-64`, `.mt-80`, `.mt-120`, `.mt-160`, `.mt-200`

#### Right
- `.mr-0`, `.mr-4`, `.mr-8`, `.mr-12`, `.mr-16`, `.mr-24`, `.mr-32`, `.mr-40`, `.mr-48`, `.mr-56`, `.mr-64`, `.mr-80`, `.mr-120`, `.mr-160`, `.mr-200`

#### Bottom
- `.mb-0`, `.mb-4`, `.mb-8`, `.mb-12`, `.mb-16`, `.mb-24`, `.mb-32`, `.mb-40`, `.mb-48`, `.mb-56`, `.mb-64`, `.mb-80`, `.mb-120`, `.mb-160`, `.mb-200`

#### Left
- `.ml-0`, `.ml-4`, `.ml-8`, `.ml-12`, `.ml-16`, `.ml-24`, `.ml-32`, `.ml-40`, `.ml-48`, `.ml-56`, `.ml-64`, `.ml-80`, `.ml-120`, `.ml-160`, `.ml-200`

### Padding Classes

#### Todas as direções
- `.p-0`, `.p-4`, `.p-8`, `.p-12`, `.p-16`, `.p-24`, `.p-32`, `.p-40`, `.p-48`, `.p-56`, `.p-64`, `.p-80`, `.p-120`, `.p-160`, `.p-200`

#### Eixo X (left + right)
- `.px-0`, `.px-4`, `.px-8`, `.px-12`, `.px-16`, `.px-24`, `.px-32`, `.px-40`, `.px-48`, `.px-56`, `.px-64`, `.px-80`, `.px-120`, `.px-160`, `.px-200`

#### Eixo Y (top + bottom)
- `.py-0`, `.py-4`, `.py-8`, `.py-12`, `.py-16`, `.py-24`, `.py-32`, `.py-40`, `.py-48`, `.py-56`, `.py-64`, `.py-80`, `.py-120`, `.py-160`, `.py-200`

#### Top
- `.pt-0`, `.pt-4`, `.pt-8`, `.pt-12`, `.pt-16`, `.pt-24`, `.pt-32`, `.pt-40`, `.pt-48`, `.pt-56`, `.pt-64`, `.pt-80`, `.pt-120`, `.pt-160`, `.pt-200`

#### Right
- `.pr-0`, `.pr-4`, `.pr-8`, `.pr-12`, `.pr-16`, `.pr-24`, `.pr-32`, `.pr-40`, `.pr-48`, `.pr-56`, `.pr-64`, `.pr-80`, `.pr-120`, `.pr-160`, `.pr-200`

#### Bottom
- `.pb-0`, `.pb-4`, `.pb-8`, `.pb-12`, `.pb-16`, `.pb-24`, `.pb-32`, `.pb-40`, `.pb-48`, `.pb-56`, `.pb-64`, `.pb-80`, `.pb-120`, `.pb-160`, `.pb-200`

#### Left
- `.pl-0`, `.pl-4`, `.pl-8`, `.pl-12`, `.pl-16`, `.pl-24`, `.pl-32`, `.pl-40`, `.pl-48`, `.pl-56`, `.pl-64`, `.pl-80`, `.pl-120`, `.pl-160`, `.pl-200`

**Total de classes de spacing:** 210 classes base + versões responsivas

---

## 🔲 Gap

### Gap (todas as direções)
- `.gap-0`, `.gap-4`, `.gap-8`, `.gap-12`, `.gap-16`, `.gap-24`, `.gap-32`, `.gap-40`, `.gap-48`, `.gap-56`, `.gap-64`, `.gap-80`, `.gap-120`, `.gap-160`, `.gap-200`

### Gap X (column-gap)
- `.gap-x-0`, `.gap-x-4`, `.gap-x-8`, `.gap-x-12`, `.gap-x-16`, `.gap-x-24`, `.gap-x-32`, `.gap-x-40`, `.gap-x-48`, `.gap-x-56`, `.gap-x-64`, `.gap-x-80`, `.gap-x-120`, `.gap-x-160`, `.gap-x-200`

### Gap Y (row-gap)
- `.gap-y-0`, `.gap-y-4`, `.gap-y-8`, `.gap-y-12`, `.gap-y-16`, `.gap-y-24`, `.gap-y-32`, `.gap-y-40`, `.gap-y-48`, `.gap-y-56`, `.gap-y-64`, `.gap-y-80`, `.gap-y-120`, `.gap-y-160`, `.gap-y-200`

### Gap Default (responsivo por breakpoint)
- `.gap-default`

**Total de classes de gap:** 46 classes base + versões responsivas

---

## 🎨 Colors

### Background Colors
- `.bg-brand-primary-default`, `.bg-brand-primary-dark`, `.bg-brand-primary-medium`, `.bg-brand-primary-light`
- `.bg-brand-secondary-default`, `.bg-brand-secondary-dark`, `.bg-brand-secondary-medium`, `.bg-brand-secondary-light`
- `.bg-neutral-low-default`, `.bg-neutral-low-dark`, `.bg-neutral-low-medium`, `.bg-neutral-low-light`
- `.bg-neutral-high-default`, `.bg-neutral-high-dark`, `.bg-neutral-high-medium`, `.bg-neutral-high-light`
- `.bg-feedback-alert-default`, `.bg-feedback-alert-dark`, `.bg-feedback-alert-medium`, `.bg-feedback-alert-light`
- `.bg-feedback-success-default`, `.bg-feedback-success-dark`, `.bg-feedback-success-medium`, `.bg-feedback-success-light`
- `.bg-transparent`, `.bg-current`

### Text Colors
- `.text-brand-primary-default`, `.text-brand-primary-dark`, `.text-brand-primary-medium`, `.text-brand-primary-light`
- `.text-brand-secondary-default`, `.text-brand-secondary-dark`, `.text-brand-secondary-medium`, `.text-brand-secondary-light`
- `.text-neutral-low-default`, `.text-neutral-low-dark`, `.text-neutral-low-medium`, `.text-neutral-low-light`
- `.text-neutral-high-default`, `.text-neutral-high-dark`, `.text-neutral-high-medium`, `.text-neutral-high-light`
- `.text-feedback-alert-default`, `.text-feedback-alert-dark`, `.text-feedback-alert-medium`, `.text-feedback-alert-light`
- `.text-feedback-success-default`, `.text-feedback-success-dark`, `.text-feedback-success-medium`, `.text-feedback-success-light`
- `.text-transparent`, `.text-current`

### Border Colors
- `.border-brand-primary-default`, `.border-brand-primary-dark`, `.border-brand-primary-medium`, `.border-brand-primary-light`
- `.border-brand-secondary-default`, `.border-brand-secondary-dark`, `.border-brand-secondary-medium`, `.border-brand-secondary-light`
- `.border-neutral-low-default`, `.border-neutral-low-dark`, `.border-neutral-low-medium`, `.border-neutral-low-light`
- `.border-neutral-high-default`, `.border-neutral-high-dark`, `.border-neutral-high-medium`, `.border-neutral-high-light`
- `.border-feedback-alert-default`, `.border-feedback-alert-dark`, `.border-feedback-alert-medium`, `.border-feedback-alert-light`
- `.border-feedback-success-default`, `.border-feedback-success-dark`, `.border-feedback-success-medium`, `.border-feedback-success-light`
- `.border-transparent`, `.border-current`

**Total de classes de cores:** 78 classes base + versões responsivas

---

## ✍️ Typography

### Font Family
- `.font-primary`

### Font Size
- `.text-12`, `.text-14`, `.text-16`, `.text-18`, `.text-20`, `.text-24`, `.text-28`, `.text-32`, `.text-40`, `.text-48`, `.text-64`, `.text-96`, `.text-inherit`

### Font Weight
- `.font-regular`, `.font-medium`, `.font-bold`

### Text Align
- `.text-left`, `.text-center`, `.text-right`, `.text-justify`

### Text Transform
- `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`

### Text Decoration
- `.underline`, `.line-through`, `.no-underline`

**Total de classes de tipografia:** 28 classes base + versões responsivas

---

## 🔳 Borders

### Border Radius

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

#### Todas as direções
- `.border-0`, `.border-1`, `.border-2`, `.border-4`, `.border-6`, `.border-8`, `.border-12`

#### Top
- `.border-t-0`, `.border-t-1`, `.border-t-2`, `.border-t-4`, `.border-t-6`, `.border-t-8`, `.border-t-12`

#### Bottom
- `.border-b-0`, `.border-b-1`, `.border-b-2`, `.border-b-4`, `.border-b-6`, `.border-b-8`, `.border-b-12`

#### Left
- `.border-l-0`, `.border-l-1`, `.border-l-2`, `.border-l-4`, `.border-l-6`, `.border-l-8`, `.border-l-12`

#### Right
- `.border-r-0`, `.border-r-1`, `.border-r-2`, `.border-r-4`, `.border-r-6`, `.border-r-8`, `.border-r-12`

#### Eixo X (left + right)
- `.border-x-0`, `.border-x-1`, `.border-x-2`, `.border-x-4`, `.border-x-6`, `.border-x-8`, `.border-x-12`

#### Eixo Y (top + bottom)
- `.border-y-0`, `.border-y-1`, `.border-y-2`, `.border-y-4`, `.border-y-6`, `.border-y-8`, `.border-y-12`

### Border Style
- `.border-solid`, `.border-dashed`, `.border-dotted`, `.border-none`

**Total de classes de borders:** 125 classes base + versões responsivas

---

## 📐 Sizing (Width & Height)

### Width
- `.w-0`, `.w-4`, `.w-8`, `.w-12`, `.w-16`, `.w-24`, `.w-32`, `.w-40`, `.w-48`, `.w-56`, `.w-64`, `.w-80`, `.w-120`, `.w-160`, `.w-200`
- `.w-auto`, `.w-full`, `.w-screen`, `.w-min`, `.w-max`, `.w-fit`

### Height
- `.h-0`, `.h-4`, `.h-8`, `.h-12`, `.h-16`, `.h-24`, `.h-32`, `.h-40`, `.h-48`, `.h-56`, `.h-64`, `.h-80`, `.h-120`, `.h-160`, `.h-200`
- `.h-auto`, `.h-full`, `.h-screen`, `.h-min`, `.h-max`, `.h-fit`

### Min Width
- `.min-w-0`, `.min-w-full`, `.min-w-min`, `.min-w-max`, `.min-w-fit`

### Max Width
- `.max-w-0`, `.max-w-4`, `.max-w-8`, `.max-w-12`, `.max-w-16`, `.max-w-24`, `.max-w-32`, `.max-w-40`, `.max-w-48`, `.max-w-56`, `.max-w-64`, `.max-w-80`, `.max-w-120`, `.max-w-160`, `.max-w-200`
- `.max-w-full`, `.max-w-min`, `.max-w-max`, `.max-w-fit`, `.max-w-screen`

### Min Height
- `.min-h-0`, `.min-h-full`, `.min-h-screen`, `.min-h-min`, `.min-h-max`, `.min-h-fit`

### Max Height
- `.max-h-0`, `.max-h-4`, `.max-h-8`, `.max-h-12`, `.max-h-16`, `.max-h-24`, `.max-h-32`, `.max-h-40`, `.max-h-48`, `.max-h-56`, `.max-h-64`, `.max-h-80`, `.max-h-120`, `.max-h-160`, `.max-h-200`
- `.max-h-full`, `.max-h-screen`, `.max-h-min`, `.max-h-max`, `.max-h-fit`

**Total de classes de sizing:** 91 classes base + versões responsivas

---

## 👁️ Display

### Display Type
- `.block`, `.inline-block`, `.inline`, `.hidden`

### Visibility
- `.visible`, `.invisible`

### Overflow
- `.overflow-auto`, `.overflow-hidden`, `.overflow-visible`, `.overflow-scroll`
- `.overflow-x-auto`, `.overflow-x-hidden`, `.overflow-x-visible`, `.overflow-x-scroll`
- `.overflow-y-auto`, `.overflow-y-hidden`, `.overflow-y-visible`, `.overflow-y-scroll`

**Total de classes de display:** 18 classes base + versões responsivas

---

## 🔀 Flexbox

### Flex Base
- `.flex`

### Flex Direction
- `.flex-row`, `.flex-col`

### Flex Wrap
- `.flex-wrap`, `.flex-nowrap`

### Justify Content
- `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`, `.justify-evenly`

### Align Items
- `.items-start`, `.items-center`, `.items-end`, `.items-stretch`, `.items-baseline`

### Align Self
- `.self-auto`, `.self-start`, `.self-center`, `.self-end`, `.self-stretch`

### Flex Grow
- `.grow`, `.grow-0`

### Flex Shrink
- `.shrink`, `.shrink-0`

**Total de classes de flexbox:** 25 classes base + versões responsivas

---

## 📊 Grid

### Grid Base
- `.grid`

### Grid Template Columns
- `.grid-cols-1`, `.grid-cols-2`, `.grid-cols-3`, `.grid-cols-4`, `.grid-cols-5`, `.grid-cols-6`, `.grid-cols-7`, `.grid-cols-8`, `.grid-cols-9`, `.grid-cols-10`, `.grid-cols-11`, `.grid-cols-12`

### Grid Template Rows
- `.grid-rows-1`, `.grid-rows-2`, `.grid-rows-3`, `.grid-rows-4`, `.grid-rows-5`, `.grid-rows-6`

### Column Span
- `.col-span-1`, `.col-span-2`, `.col-span-3`, `.col-span-4`, `.col-span-5`, `.col-span-6`, `.col-span-7`, `.col-span-8`, `.col-span-9`, `.col-span-10`, `.col-span-11`, `.col-span-12`
- `.col-span-full`

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
