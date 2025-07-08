# 🌝 Zanthus Design System

Design system escalável, white-label e multiplataforma. Desenvolvido para acelerar a criação de interfaces consistentes, acessíveis e responsivas com suporte nativo a múltiplas marcas, temas e tecnologias.

---

## 📦 Arquitetura

Monorepo gerenciado com [Turborepo](https://turbo.build/repo), organizado por workspaces independentes para tokens, componentes, documentação e utilitários.

### Workspaces

```
├── apps/                                 # Aplicações consumidoras ou de visualização
│   ├── storybook/                        # Instância do Storybook (React)
│   │   └── .storybook/                   # Configurações (main.js, preview.js etc.)
│   ├── widgetbook/                       # Instância do Widgetbook (Flutter) ❌ Ainda não implementado
│   │   └── ...                           # Configuração de visualização Flutter
│   └── playground/                       # Sandbox React para testes manuais ❌ Ainda não implementado
│       ├── public/
│       └── src/
│           ├── App.jsx
│           └── main.jsx

├── packages/                             # Pacotes reutilizáveis, versionáveis e independentes
│   ├── tokens/ 
│   │   └── build/                        # Tokens gerados pelo Style Dictionary
│   │   └── config/                       # Configuração do style dictionary
│   │   └── src/                        
│   │       ├── colors/                   # .Json de Tokens de cor (brand, neutrals, feedback)
│   │       ├── spacing/                  # .Json de Tokens de espaçamento
│   │       ├── border/                   # .Json de Tokens de borda (largura, raio)
│   │       ├── typography/               # .Json de Tokens tipográficos (fontes, tamanhos, pesos)
│   │       ├── themes/                   # Temas claro/escuro via :root e [data-theme]

│   ├── components-react/                 # Componentes React consumíveis pelos produtos
│   │   └── src/
│   │       ├── component/
│   │       │   ├── component.jsx         # Componente funcional
│   │       │   ├── component.module.scss # Estilo scoped via SCSS module
│   │       └── index.js                  # Exportação consolidada dos componentes

│   ├── icons/                            # Biblioteca de ícones baseada no Fluent UI
│   │   └── src/
│   │       ├── Icon.jsx                  # Componente wrapper genérico
│   │       ├── iconMap.jsx               # Mapeamento dos nomes para ícones do Fluent
│   │       └── index.jsx                 # Exportação do pacote

│   ├── onboarding/                       # Componentes e configurações de onboarding (Intro.js) ❌ Ainda não implementado
│   │   └── src/
│   │       ├── IntroOnboarding.js        # Wrapper genérico do tour
│   │       ├── intro.config.js           # Configurações padrão para os passos
│   │       └── index.js                  # Exportação principal

│   ├── grid/                             # Sistema de grid ❌ Ainda não implementado
│   │   └── src/

│   ├── utils/                            # Helpers e hooks reutilizáveis ❌ Ainda não implementado
│   │   └── src/
│   │       ├── useDebounce.js            # Exemplo de hook
│   │       ├── formatCpf.js              # Exemplo de utilitário
│   │       └── index.js                  # Barrel file

│   └── components-flutter/               # Versão Flutter do design system ❌ Ainda não implementado
│       └── zanthus_flutter/
│           ├── tokens/                   # Tokens adaptados para Dart
│           ├── components/               # Componentes Flutter
│           └── zanthus_flutter.dart      # Entry point do pacote

├── turbo.json                            # Configuração das pipelines do Turborepo
├── package.json                          # Declaração dos workspaces e scripts globais
└── README.md                             # Visão geral e instruções do repositório
```

---

## 🔀 Turborepo

O Zanthus Design System utiliza o [Turborepo](https://turbo.build/repo) para orquestrar builds otimizados, cache entre pacotes e execução paralela entre workspaces.

### Principais vantagens

* Cache inteligente de tarefas
* Execução paralela com dependência entre pacotes
* Build incremental e rápido
* Compartilhamento de artefatos entre CI/CD

### Principais comandos

```bash
# Executa build para todos os pacotes
npm run build:components

# Executa apenas os tokens
npm run build:tokens

# Executa Storybook (via scripts definidos)
npx run storybook

# Executa lint ou testes
npm test

# Limpa cache do Turborepo
npx turbo clean
```

> O comportamento do Turborepo é configurado no arquivo `turbo.json`. Certifique-se de que cada `package.json` tenha os scripts corretos mapeados para build, lint, test etc.

---

## 🎨 Design Tokens

Tokens centralizados via [Style Dictionary](https://amzn.github.io/style-dictionary/) com estrutura compatível com o [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/).

### Fontes

* Local: `packages/tokens/src/`
* Categorias: `colors/`, `spacing/`, `border/`, `typography/`, `themes/`

### Saídas

```
build/css/
├── tokens.css              # :root (modo padrão)
├── tokens-light.css        # :root, [data-theme="light"]
└── tokens-dark.css         # [data-theme="dark"]

build/scss/_tokens.scss     # Tokens para uso em SCSS
build/js/tokens.js          # Tokens para JavaScript
build/json/tokens.json      # Tokens em JSON bruto
```

### Temas - Aninda não implementado

* Suporte a `light` e `dark` via `[data-theme]`
* Sem herança implícita (`include: []`)
* Switch de tema baseado em `document.documentElement.dataset.theme`

---

## ⚛️ Componentes React

Local: `packages/components-react/src/`

* Componentes funcionais com estilos escopados via `.module.scss`
* Consumo de tokens via `var(--token-name)`
* Prontos para SSR, SPAs ou qualquer ambiente que consuma CSS

### Responsividade

* Breakpoints: `1920`, `1440`, `1024`, `768`, `360`
* Grid nativo com `auto-fit` + `minmax()` planejado

---

## 📚 Documentação com Storybook

Local: `apps/storybook/`

* Builder: [`@storybook/react-vite`](https://storybook.js.org/blog/storybook-for-vite/)
* Suporte a temas globais (light/dark)
* Acessibilidade com `@storybook/addon-a11y`
* Integração com [Chromatic](https://www.chromatic.com/) para CI/CD visual

---

## 🚀 Scripts Principais

```bash
# Instalar dependências
npm install

# Gerar tokens
npm run tokens:build

# Rodar Storybook
npm run storybook

# Rodar build completo com Turborepo
npx turbo run build
```

---

## 🧹 Futuro / Roadmap

* [ ] 🔠 Implementar `packages/grid/` como componente modular
* [ ] 🌙 Fallback automático com `prefers-color-scheme`
* [ ] 🧪 Lint e validação de tokens (`stylelint`, `design-tokens-validate`)
* [ ] 🖼️ Pré-visualização de tokens temáticos no Storybook
* [ ] 📲 Suporte completo a Flutter (`widgetbook`, `components-flutter`)

---

## 🤝 Contribuição

Para instruções detalhadas, consulte o arquivo [`CONTRIBUTING.md`](./CONTRIBUTING.md).

📍 Licença

Este projeto é privado e protegido por direitos autorais. Todos os direitos reservados.
