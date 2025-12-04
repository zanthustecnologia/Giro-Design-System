# @giro-ds/utilities

Utilitários CSS/SCSS do Zanthus Design System. Classes utilitárias prontas para uso com suporte a breakpoints responsivos.

## 📦 Instalação

```bash
npm install @giro-ds/utilities
# ou
yarn add @giro-ds/utilities
# ou
pnpm add @giro-ds/utilities
```

## 🚀 Uso

### Importação

```scss
// No seu arquivo SCSS principal
@use '@giro-ds/utilities';
```

Ou importe o CSS compilado diretamente:

```javascript
// No seu arquivo JavaScript/TypeScript
import '@giro-ds/utilities/dist/ui.css';
```

## 📚 Utilitários Disponíveis

### 🎯 Breakpoints Responsivos

Sistema de breakpoints para criar layouts responsivos:

```scss
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  2xl: 1536px
);
```

#### Uso em SCSS

```scss
@use '@giro-ds/utilities' as util;

.my-component {
  padding: 8px;
  
  @include util.respond(md) {
    padding: 16px;
  }
  
  @include util.respond(lg) {
    padding: 24px;
  }
}
```

### 📏 Sistema de Espaçamento

Classes utilitárias para margin e padding, baseadas nos tokens do design system.

#### Valores Disponíveis
`0`, `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `120`, `160`, `200`

#### Prefixos de Propriedades
- `m-` - margin
- `p-` - padding

#### Direções
- **(nenhuma)** - todas as direções
- `t` - top
- `b` - bottom
- `l` - left
- `r` - right
- `x` - left e right
- `y` - top e bottom

#### Exemplos de Classes

```html
<!-- Margin -->
<div class="m-16">Margin de 16px em todas as direções</div>
<div class="mt-24">Margin-top de 24px</div>
<div class="mx-32">Margin horizontal (left e right) de 32px</div>
<div class="my-40">Margin vertical (top e bottom) de 40px</div>

<!-- Padding -->
<div class="p-16">Padding de 16px em todas as direções</div>
<div class="pt-24">Padding-top de 24px</div>
<div class="px-32">Padding horizontal (left e right) de 32px</div>
<div class="py-40">Padding vertical (top e bottom) de 40px</div>
```

#### Classes Responsivas

Todas as classes de espaçamento possuem variações responsivas:

```html
<!-- Padding de 8px em mobile, 16px em tablet, 24px em desktop -->
<div class="p-8 md:p-16 lg:p-24">
  Conteúdo responsivo
</div>

<!-- Margin horizontal de 16px em mobile, 32px em desktop -->
<div class="mx-16 lg:mx-32">
  Conteúdo com margin responsiva
</div>
```

### 🔲 Flexbox

Classes utilitárias para layouts flexíveis:

```html
<!-- Direção -->
<div class="flex-row">Flex row</div>
<div class="flex-col">Flex column</div>

<!-- Alinhamento -->
<div class="items-center">Align items center</div>
<div class="items-start">Align items start</div>
<div class="items-end">Align items end</div>

<div class="justify-center">Justify content center</div>
<div class="justify-between">Justify content space-between</div>
<div class="justify-around">Justify content space-around</div>

<!-- Wrap -->
<div class="flex-wrap">Flex wrap</div>
<div class="flex-nowrap">Flex nowrap</div>

<!-- Responsivo -->
<div class="flex-col md:flex-row">
  Column em mobile, row em tablet+
</div>
```

### 🎲 Grid

Classes utilitárias para layouts em grid:

```html
<!-- Colunas -->
<div class="grid-cols-2">2 colunas</div>
<div class="grid-cols-3">3 colunas</div>
<div class="grid-cols-4">4 colunas</div>
<div class="grid-cols-12">12 colunas</div>

<!-- Auto -->
<div class="grid-cols-auto-fit">Auto-fit</div>
<div class="grid-cols-auto-fill">Auto-fill</div>

<!-- Responsivo -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  1 coluna em mobile, 2 em tablet, 4 em desktop
</div>
```

### 📐 Gap

Classes para espaçamento entre itens em flex e grid:

```html
<!-- Gap padrão -->
<div class="gap-8">Gap de 8px</div>
<div class="gap-16">Gap de 16px</div>
<div class="gap-24">Gap de 24px</div>

<!-- Gap responsivo -->
<div class="gap-8 md:gap-16 lg:gap-24">
  Gap aumenta com a tela
</div>
```

## 💡 Exemplos Práticos

### Layout Responsivo Completo

```html
<div class="p-16 md:p-24 lg:p-32">
  <div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
    <div class="p-16">Card 1</div>
    <div class="p-16">Card 2</div>
    <div class="p-16">Card 3</div>
  </div>
</div>
```

### Navbar com Flexbox

```html
<nav class="flex-row items-center justify-between px-16 py-12">
  <div class="flex-row items-center gap-12">
    <img src="logo.svg" alt="Logo" />
    <span>Meu Site</span>
  </div>
  <div class="flex-row gap-16">
    <a href="#">Home</a>
    <a href="#">Sobre</a>
    <a href="#">Contato</a>
  </div>
</nav>
```

### Card com Espaçamento Consistente

```html
<div class="p-24 m-16">
  <h2 class="mb-12">Título do Card</h2>
  <p class="mb-16">Descrição do conteúdo...</p>
  <button class="px-24 py-12">Ação</button>
</div>
```

## 🎨 Integração com Tokens

Os utilitários de espaçamento utilizam automaticamente os tokens do `@giro-ds/tokens`, garantindo consistência com o design system.

## 📖 Uso Avançado em SCSS

Se você precisa de mais controle, pode importar os mixins e funções diretamente:

```scss
@use '@giro-ds/utilities/src/utilities/breakpoints' as bp;
@use '@giro-ds/utilities/src/utilities/spacing' as spacing;

.custom-component {
  @include bp.respond(lg) {
    // Estilos para telas grandes
  }
}
```

## 🔧 Customização

Para customizar os breakpoints ou espaçamentos, você pode sobrescrever as variáveis SCSS antes de importar:

```scss
// Defina suas customizações
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

// Importe os utilitários
@use '@giro-ds/utilities' with (
  $breakpoints: $breakpoints
);
```

## 📄 Licença

Consulte o arquivo LICENSE na raiz do projeto.

## 🤝 Contribuindo

Consulte o arquivo CONTRIBUTING.md na raiz do projeto para diretrizes de contribuição.
