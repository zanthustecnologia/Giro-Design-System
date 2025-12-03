# Zanthus Design Tokens

Este pacote contém os **tokens de design oficiais da Zanthus**, organizados para garantir escalabilidade, clareza e flexibilidade entre produtos, marcas e plataformas.

---

## 📁 Estrutura de Pastas

```
tokens/
├── design-tokens-export.css       # Exportação global dos tokens em CSS puro
└── src/
    ├── colors/
    │   ├── _brand-colors.scss     # Cores institucionais da marca
    │   ├── _feedback-colors.scss  # Cores para estados (success, warning, error)
    │   ├── _neutral-colors.scss   # Cinzas, fundos, texto
    │   └── index.scss             # Importa todos os arquivos de colors/
    ├── border/
    │   ├── _border-radius.scss    # Arredondamentos (pill, circular, 4px, etc.)
    │   ├── _border-width.scss     # Espessura das bordas (1px, 2px, etc.)
    │   └── index.scss
    ├── spacing/
    │   ├── _spacing.scss          # Espaçamentos base (4px, 8px, 16px, etc.)
    │   └── index.scss
    ├── typography/
    │   ├── _font-family.scss      # Famílias tipográficas (primária, secundária)
    │   ├── _font-size.scss        # Tamanhos de fonte (sm, md, lg)
    │   ├── _font-weight.scss      # Pesos (regular, bold, semibold)
    │   └── index.scss
    ├── misc/
    │   └── _misc.scss             # Tokens avulsos ou temporários
    ├── themes/
    │   ├── _light.scss            # Tema claro via :root
    │   └── _dark.scss             # Tema escuro via [data-theme="dark"]
    └── index.scss                 # Importa todas as categorias acima
```

---

## 📦 Objetivo

Organizar os tokens para permitir:

- Uso em SCSS e CSS puro
- Suporte a temas dinâmicos (claro/escuro)
- Reaproveitamento entre múltiplos produtos
- Exportação para apps e Storybook

---

## 🛠 Como usar

### 1. Uso via SCSS

No seu arquivo global:

```scss
@import "@giro-ds/tokens/src/index";
@import "@giro-ds/tokens/src/themes/light";
@import "@giro-ds/tokens/src/themes/dark";
```

Agora você pode usar variáveis como:

```scss
.button {
  background-color: var(--brand-color-primary-default);
  border-radius: var(--border-radius-8);
}
```

### 2. Uso via CSS direto (ex: Web Components, HTML, Vite, Storybook)

```html
<link rel="stylesheet" href="/node_modules/@giro-ds/tokens/design-tokens-export.css" />
```

Ou via JavaScript:

```js
import "@giro-ds/tokens/design-tokens-export.css";
```

---

## 🌗 Como ativar tema escuro

```html
<html data-theme="dark">
```

Isso ativa automaticamente os tokens definidos no arquivo `_dark.scss`.

---

## 💬 Convenções adotadas

| Tipo de Token      | Prefixo                     |
|--------------------|-----------------------------|
| Cores da marca     | `--brand-color-*`           |
| Feedbacks visuais  | `--feedback-color-*`        |
| Neutros            | `--neutral-color-*`, `--text-*`, `--surface-*` |
| Espaçamento        | `--spacing-*`               |
| Borda              | `--border-radius-*`, `--border-width-*` |
| Tipografia         | `--font-family-*`, `--font-size-*`, `--font-weight-*` |

---

## 📚 Boas práticas

- Use `--tokens` no CSS sempre que possível para suportar temas dinâmicos
- Nunca codifique valores diretamente (ex: `8px`, `#000`)
- Prefira usar `spacing`, `radius`, `font-*` sempre vindos dos tokens

---

## 🧩 Observação técnica

Tokens SCSS (`$...`) são usados para gerar `--tokens` via interpolação:

```scss
$spacing-4: 16px;

:root {
  --spacing-4: #{$spacing-4}; // vira → 16px
}
```

---

## 🏁 Pronto para escalabilidade

Esta estrutura é compatível com:

- SCSS tradicional
- CSS puro
- Web Components
- Storybook com múltiplos temas
- Frameworks modernos (Vite, Webpack, PostCSS)

