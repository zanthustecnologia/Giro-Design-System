# @giro-ds/tokens

Design tokens do Zanthus Design System. Valores de design fundamentais (cores, espaçamentos, tipografia, bordas, etc.) disponíveis em múltiplos formatos.

## 📦 Instalação

```bash
npm install @giro-ds/tokens
# ou
yarn add @giro-ds/tokens
# ou
pnpm add @giro-ds/tokens
```

## 🎨 O que são Design Tokens?

Design tokens são valores de design reutilizáveis que garantem consistência visual em todo o sistema. Incluem cores, espaçamentos, tipografia, bordas e outros elementos fundamentais.

## 📚 Tokens Disponíveis

### Cores

#### Brand (Marca)
- **Primary:** `default`, `dark`, `medium`, `light`
- **Secondary:** `default`, `dark`, `medium`, `light`

#### Feedback
- **Alert:** `default`, `dark`, `medium`, `light`
- **Success:** `default`, `dark`, `medium`, `light`

#### Neutral
- **Low:** `default`, `dark`, `medium`, `light`
- **High:** `default`, `dark`, `medium`, `light`

### Espaçamento
`0`, `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `120`, `160`, `200` (em pixels)

### Tipografia
- **Font Family:** `primary` (Figtree)
- **Font Size:** `12`, `14`, `16`, `18`, `20`, `24`, `28`, `32`, `40`, `48`, `64`, `96`, `inherit`
- **Font Weight:** `regular` (400), `medium` (500), `bold` (700)

### Bordas
- **Border Radius:** `4`, `8`, `12`, `16`, `24`, `none`, `pill`, `circular`
- **Border Width:** `1`, `2`, `4`, `6`, `8`, `12`, `none`

## 🚀 Uso

Os tokens estão disponíveis em três formatos diferentes. Escolha o que melhor se adequa ao seu projeto:

### 1. JavaScript/TypeScript

```javascript
import {
  ColorBrandPrimaryDefault,
  Spacing16,
  FontSize14,
  BorderRadius8
} from '@giro-ds/tokens/build/js/tokens.js';

const styles = {
  backgroundColor: ColorBrandPrimaryDefault,
  padding: Spacing16,
  fontSize: FontSize14,
  borderRadius: BorderRadius8
};
```

### 2. SCSS

```scss
@use '@giro-ds/tokens/build/scss/tokens.scss' as tokens;

.my-component {
  background-color: tokens.$color-brand-primary-default;
  padding: tokens.$spacing-16;
  font-size: tokens.$font-size-14;
  border-radius: tokens.$border-radius-8;
}
```

### 3. CSS (Custom Properties)

```css
@import '@giro-ds/tokens/build/css/tokens.css';

.my-component {
  background-color: var(--color-brand-primary-default);
  padding: var(--spacing-16);
  font-size: var(--font-size-14);
  border-radius: var(--border-radius-8);
}
```

## 📂 Estrutura de Arquivos

```
build/
├── css/
│   └── tokens.css          # CSS Custom Properties
├── js/
│   └── tokens.js           # JavaScript/TypeScript exports
└── scss/
    └── tokens.scss         # SCSS variables
```

## 🛠️ Desenvolvimento

Este pacote utiliza [Style Dictionary](https://amzn.github.io/style-dictionary/) para gerar os tokens a partir dos arquivos fonte em JSON.

### Arquivos Fonte

```
src/
├── border/
│   ├── border-radius.json
│   └── border-width.json
├── colors/
│   ├── brand-colors.json
│   ├── feedback-colors.json
│   └── neutral-colors.json
├── spacing/
│   └── spacing.json
├── typography/
│   ├── font-family.json
│   ├── font-size.json
│   └── font-weight.json
└── z-index/
```

### Build

Para regenerar os tokens:

```bash
pnpm build
```

## 💡 Convenção de Nomenclatura

Os tokens seguem a convenção kebab-case (no CSS/SCSS) e PascalCase (no JavaScript):

- **CSS/SCSS:** `$color-brand-primary-default` ou `--color-brand-primary-default`
- **JavaScript:** `ColorBrandPrimaryDefault`

## 🎯 Exemplos de Uso Comum

### Exemplo 1: React Component com CSS Modules

```tsx
// Button.module.scss
@use '@giro-ds/tokens/build/scss/tokens.scss' as tokens;

.button {
  background: tokens.$color-brand-primary-default;
  color: tokens.$color-neutral-high-default;
  padding: tokens.$spacing-12 tokens.$spacing-24;
  border-radius: tokens.$border-radius-8;
  font-size: tokens.$font-size-16;
  font-weight: tokens.$font-weight-medium;
}
```

### Exemplo 2: Styled Components

```tsx
import styled from 'styled-components';
import {
  ColorBrandPrimaryDefault,
  Spacing12,
  BorderRadius8
} from '@giro-ds/tokens/build/js/tokens.js';

const Button = styled.button`
  background: ${ColorBrandPrimaryDefault};
  padding: ${Spacing12};
  border-radius: ${BorderRadius8};
`;
```

### Exemplo 3: CSS Global

```css
@import '@giro-ds/tokens/build/css/tokens.css';

:root {
  /* Os tokens já estão disponíveis como custom properties */
}

body {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-16);
  color: var(--color-neutral-low-default);
}
```

## 📄 Licença

Consulte o arquivo LICENSE na raiz do projeto.

## 🤝 Contribuindo

Para adicionar ou modificar tokens, edite os arquivos JSON em `src/` e execute `pnpm build` para regenerar os arquivos de saída.
