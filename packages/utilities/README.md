# @giro-ds/utilities

Biblioteca de classes utilitárias CSS para o Zanthus Design System.

## 📦 Instalação

```bash
pnpm add @giro-ds/utilities
```

## 🚀 Uso

### Importação em JavaScript/TypeScript

```javascript
// Importação padrão (desenvolvimento com sourcemaps)
import '@giro-ds/utilities';

// Ou explícito
import '@giro-ds/utilities/css/giro.css';

// Produção (minificado - 23% menor)
import '@giro-ds/utilities/css/giro.min.css';
```

### Importação em CSS/SCSS

```css
/* Versão de desenvolvimento */
@import '@giro-ds/utilities/css/giro.css';

/* Versão minificada para produção */
@import '@giro-ds/utilities/css/giro.min.css';
```

## 📚 Classes Disponíveis

> 📖 **Documentação completa:** Veja [CLASSES-REFERENCE.md](./CLASSES-REFERENCE.md) para lista detalhada de todas as 798+ classes base e suas ~4.788 variações responsivas.

### 📏 Spacing
- **Margin**: `.m-*`, `.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`, `.mx-*`, `.my-*`
- **Padding**: `.p-*`, `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`, `.px-*`, `.py-*`
- **Valores**: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200 (em pixels)

### 🔲 Gap
- **Gap**: `.gap-*`, `.gap-x-*`, `.gap-y-*`
- **Gap Default**: `.gap-default` (responsivo: 16px → 24px → 32px → 40px → 48px → 56px)
- **Valores**: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200

### 🎨 Colors
- **Background**: `.bg-brand-primary-*`, `.bg-brand-secondary-*`, `.bg-neutral-*`, `.bg-feedback-*`
- **Text**: `.text-brand-primary-*`, `.text-brand-secondary-*`, `.text-neutral-*`, `.text-feedback-*`
- **Border**: `.border-brand-primary-*`, `.border-brand-secondary-*`, `.border-neutral-*`, `.border-feedback-*`
- **Variações**: default, dark, medium, light

### 🔳 Borders
- **Radius**: `.rounded-*` (none, 4, 8, 12, 16, 24, pill, circular)
  - Direções: `-t-`, `-b-`, `-l-`, `-r-`, `-tl-`, `-tr-`, `-bl-`, `-br-`
- **Width**: `.border-*` (0, 1, 2, 4, 6, 8, 12)
  - Direções: `-t-`, `-b-`, `-l-`, `-r-`, `-x-`, `-y-`

### ✍️ Typography
- **Size**: `.text-12`, `.text-14`, `.text-16`, `.text-20`, `.text-24`, `.text-32`, `.text-40`, `.text-48`, `.text-64`, `.text-96`
- **Weight**: `.font-regular`, `.font-medium`, `.font-bold`
- **Align**: `.text-left`, `.text-center`, `.text-right`, `.text-justify`
- **Transform**: `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`
- **Decoration**: `.underline`, `.line-through`, `.no-underline`

### 🔲 Flexbox
- **Base**: `.flex`, `.flex-row`, `.flex-col`
- **Wrap**: `.flex-wrap`, `.flex-nowrap`
- **Justify**: `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`, `.justify-evenly`
- **Align**: `.items-start`, `.items-center`, `.items-end`, `.items-stretch`, `.items-baseline`
- **Self**: `.self-auto`, `.self-start`, `.self-center`, `.self-end`, `.self-stretch`
- **Grow/Shrink**: `.grow`, `.grow-0`, `.shrink`, `.shrink-0`

### 🎲 Grid
- **Base**: `.grid`
- **Columns**: `.grid-cols-1` até `.grid-cols-12`, `.grid-cols-none`
- **Rows**: `.grid-rows-1` até `.grid-rows-6`, `.grid-rows-none`
- **Span**: `.col-span-*`, `.row-span-*` (1-12 para cols, 1-6 para rows, full para ambos)
- **Place**: `.place-items-*`, `.place-content-*`, `.items-*`, `.justify-items-*`

### 👁️ Display
- **Display**: `.block`, `.inline-block`, `.inline`, `.flex`, `.grid`, `.hidden`
- **Visibility**: `.visible`, `.invisible`
- **Overflow**: `.overflow-auto`, `.overflow-hidden`, `.overflow-visible`, `.overflow-scroll`

### 📐 Sizing
- **Width**: `.w-*` (0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200)
  - Especiais: `.w-auto`, `.w-full`, `.w-screen`, `.w-min`, `.w-max`, `.w-fit`
- **Height**: `.h-*` (mesmos valores de width)
  - Especiais: `.h-auto`, `.h-full`, `.h-screen`, `.h-min`, `.h-max`, `.h-fit`
- **Min/Max Width**: `.min-w-*`, `.max-w-*` (0, full, min, max, fit, screen + valores em px)
- **Min/Max Height**: `.min-h-*`, `.max-h-*` (0, full, screen, min, max, fit + valores em px)

### 📍 Position
- **Type**: `.static`, `.relative`, `.absolute`, `.fixed`, `.sticky`
- **Positioning**: `.top-*`, `.right-*`, `.bottom-*`, `.left-*`
  - Valores: 0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 120, 160, 200, auto, full, half
- **Inset**: `.inset-*`, `.inset-x-*`, `.inset-y-*` (mesmos valores)

### 🔍 Opacity
- **Levels**: `.opacity-0`, `.opacity-5`, `.opacity-10`, `.opacity-20`, `.opacity-25`, `.opacity-30`, `.opacity-40`, `.opacity-50`, `.opacity-60`, `.opacity-70`, `.opacity-75`, `.opacity-80`, `.opacity-90`, `.opacity-95`, `.opacity-100`

## 📱 Responsividade

**Todas as 798+ classes base possuem variantes responsivas (~4.788 classes totais):**

```html
<!-- Padding responsivo -->
<div class="p-16 md:p-24 lg:p-32">
  Conteúdo
</div>

<!-- Flexbox responsivo -->
<div class="flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Position responsivo -->
<div class="relative lg:absolute top-0 lg:top-16">
  Posicionamento adaptativo
</div>

<!-- Opacity responsivo -->
<div class="opacity-50 hover:opacity-100 md:opacity-75">
  Transparência adaptativa
</div>
```

**Breakpoints disponíveis:**
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Gap Default Responsivo:**
A classe `.gap-default` ajusta automaticamente conforme o breakpoint:
- Base: 16px
- `sm:` 24px
- `md:` 32px
- `lg:` 40px
- `xl:` 48px
- `2xl:` 56px

## 🏗️ Build e Arquivos

### Variantes Disponíveis

```javascript
// Desenvolvimento (372KB com sourcemaps)
import '@giro-ds/utilities/css/giro.css';

// Produção (286KB minificado - 23% menor)
import '@giro-ds/utilities/css/giro.min.css';
```

### Sourcemaps

A versão de desenvolvimento (`giro.css`) inclui sourcemaps que permitem debugging no DevTools apontando para os arquivos SCSS originais:

```
dist/css/
  ├── giro.css (372KB - dev)
  ├── giro.min.css (286KB - prod)  
  └── giro.css.map (125KB - sourcemap)
```

### Build Local

```bash
# Build completo (dev + minificado)
pnpm build

# Apenas desenvolvimento
pnpm build:dev

# Apenas minificado
pnpm build:min
```

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
packages/utilities/
├── src/
│   ├── index.scss                 # Entrada principal
│   └── scss/
│       ├── _breakpoints.scss      # Sistema de breakpoints
│       ├── _spacing.scss          # Margin e Padding
│       ├── _gap.scss              # Gap utilitários
│       ├── _gap-defaults.scss     # Gap default responsivo
│       ├── _colors.scss           # Background, text, border colors
│       ├── _borders.scss          # Border radius e width
│       ├── _typography.scss       # Font sizes, weights, alignment
│       ├── _flex.scss             # Flex utilities
│       ├── _grid.scss             # Grid utilities
│       ├── _display.scss          # Display e visibility
│       ├── _sizing.scss           # Width, height, min/max
│       ├── _position.scss         # Position e positioning
│       └── _opacity.scss          # Opacity levels
├── dist/css/
│   ├── giro.css                   # Build development (372KB)
│   ├── giro.min.css               # Build production (286KB)
│   └── giro.css.map               # Sourcemap
├── CLASSES-REFERENCE.md           # Documentação completa
└── package.json
```

### Scripts Disponíveis

```bash
# Build completo (dev + prod)
pnpm build

# Apenas desenvolvimento com sourcemaps
pnpm build:dev

# Apenas minificado para produção
pnpm build:min
```

## 💡 Exemplos Práticos

### Layout Responsivo

```html
<div class="p-16 md:p-24 lg:p-32">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-default">
    <div class="p-16 rounded-8 bg-neutral-light">Card 1</div>
    <div class="p-16 rounded-8 bg-neutral-light">Card 2</div>
    <div class="p-16 rounded-8 bg-neutral-light">Card 3</div>
  </div>
</div>
```

### Navbar Flexível

```html
<nav class="flex flex-row items-center justify-between px-16 py-12 bg-brand-primary-default">
  <div class="flex flex-row items-center gap-12">
    <img src="logo.svg" alt="Logo" class="w-32 h-32" />
    <span class="text-16 font-bold text-neutral-light">Giro DS</span>
  </div>
  <div class="flex flex-row gap-16">
    <a href="#" class="text-neutral-light opacity-90 hover:opacity-100">Home</a>
    <a href="#" class="text-neutral-light opacity-90 hover:opacity-100">Sobre</a>
    <a href="#" class="text-neutral-light opacity-90 hover:opacity-100">Contato</a>
  </div>
</nav>
```

### Card com Posicionamento

```html
<div class="relative p-24 m-16 rounded-12 bg-neutral-light">
  <div class="absolute top-12 right-12 opacity-75">
    <span class="text-12 text-neutral-dark">Novo</span>
  </div>
  <h2 class="mb-12 text-20 font-bold">Título do Card</h2>
  <p class="mb-16 text-14 opacity-80">Descrição do conteúdo...</p>
  <button class="px-24 py-12 rounded-8 bg-brand-primary-default text-neutral-light">
    Ação
  </button>
</div>
```

### Grid Responsivo Avançado

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-default">
  <div class="col-span-1 lg:col-span-2 p-24 bg-brand-primary-light rounded-8">
    Destaque
  </div>
  <div class="p-16 bg-neutral-light rounded-8">Item 2</div>
  <div class="p-16 bg-neutral-light rounded-8">Item 3</div>
  <div class="p-16 bg-neutral-light rounded-8">Item 4</div>
</div>
```

## 🎨 Integração com Design Tokens

Os utilitários utilizam automaticamente os tokens do `@giro-ds/tokens`:

- **Spacing**: Valores consistentes de espaçamento
- **Colors**: Paleta completa de cores (brand, neutral, feedback)
- **Typography**: Tamanhos e pesos padronizados
- **Borders**: Raios e espessuras do design system
- **Z-index**: Camadas hierárquicas definidas

Isso garante que suas interfaces sigam o design system sem configuração adicional.

## 📄 Licença

Consulte o arquivo LICENSE na raiz do projeto.

## 🤝 Contribuindo

Consulte o arquivo CONTRIBUTING.md na raiz do projeto para diretrizes de contribuição.
