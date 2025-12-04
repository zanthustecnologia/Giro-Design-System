# 🌝 Zanthus Design System

Design system escalável, white-label e multiplataforma. Desenvolvido para acelerar a criação de interfaces consistentes, acessíveis e responsivas com suporte nativo a múltiplas marcas, temas e tecnologias.

---

## 📦 Arquitetura

Monorepo gerenciado com [Turborepo](https://turbo.build/repo), organizado por workspaces independentes para tokens, componentes, documentação e utilitários.

### Workspaces

```
├── apps/                                 # Aplicações consumidoras ou de visualização
│   └── storybook-react/                  # Instância do Storybook (React)
│       ├── .storybook/                   # Configurações do Storybook
│       ├── src/
│       │   ├── assets/                   # Recursos estáticos
│       │   ├── internal-components/      # Componentes internos do Storybook
│       │   │   ├── decorators/           # Decorators customizados
│       │   │   ├── layouts/              # Layouts para documentação
│       │   │   └── mdx/                  # Componentes MDX
│       │   ├── stories/                  # Stories organizadas
│       │   │   ├── Components/           # Stories de componentes
│       │   │   ├── Foundation/           # Stories de fundamentos
│       │   │   └── General/              # Stories gerais
│       │   ├── styles/                   # Estilos globais do Storybook
│       │   └── types/                    # Definições de tipos
├── packages/                             # Pacotes reutilizáveis, versionáveis e independentes
│   ├── react/                            # Biblioteca de componentes React
│   │   ├── src/
│   │   │   ├── components/               # Componentes React
│   │   │   ├── hooks/                   # Hooks customizados
│   │   │   ├── shared/                  # Recursos compartilhados
│   │   │   ├── styles/                  # Estilos e tokens
│   │   │   ├── types/                   # Definições de tipos
│   │   │   └── index.ts                 # Entry point do pacote
│   │   ├── dist/                        # Build output
│   ├── tokens/                          # Design Tokens
│   │   ├── src/                         # Tokens fonte em JSON
│   │   │   ├── border/                  # Tokens de borda
│   │   │   ├── colors/                  # Tokens de cores
│   │   │   ├── spacing/                 # Tokens de espaçamento
│   │   │   ├── typography/              # Tokens tipográficos
│   │   │   └── z-index/                 # Tokens de z-index
│   │   ├── build/                       # Tokens gerados pelo Style Dictionary
│   │   ├── config/                      # Configuração do Style Dictionary
│   └── utilities/                       # Utilitários CSS/SCSS
│       ├── src/
│       │   ├── utilities/               # Mixins e helpers SCSS
│       │   └── index.scss               # Entry point
│       ├── dist/                        # Build output
└── docs/                                # Documentação adicional
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
pnpm run build

# Rodar Storybook
pnpm run storybook

# Build do Storybook
pnpm run build-storybook

# Executar testes
pnpm run test

# Executar linting
pnpm run lint

# Limpa cache do Turborepo
npx turbo clean
```

> O comportamento do Turborepo é configurado no arquivo `turbo.json`. Certifique-se de que cada `package.json` tenha os scripts corretos mapeados para build, lint, test etc.

---

## 🎨 Design Tokens

Tokens centralizados via [Style Dictionary](https://amzn.github.io/style-dictionary/) com estrutura compatível com o [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/).

### Fontes

* Local: `packages/tokens/src/`
* Categorias: `colors/`, `spacing/`, `border/`, `typography/`, `z-index/`

### Saídas

```
build/css/
└── tokens.css              # Custom properties CSS

build/scss/
└── tokens.scss             # Tokens para uso em SCSS

build/js/
└── tokens.js               # Tokens para JavaScript
```

### Temas

* Sistema de temas planejado para próximas versões
* Suporte futuro a `light` e `dark` via `[data-theme]`
* Integração com `prefers-color-scheme` em desenvolvimento

---

## ⚛️ Componentes React

Local: `packages/react/src/components/`

### Componentes Disponíveis

O design system conta com os seguintes componentes implementados:

* **Avatar** - Representação visual de usuário
* **Badge** - Etiquetas e indicadores
* **Button** - Botões de ação
* **Calendar** - Calendário e seleção de datas
* **Callout** - Mensagens de destaque e avisos
* **Checkbox** / **CheckboxRadix** - Caixas de seleção
* **Chips** - Tags e filtros
* **Container** - Container de layout
* **DatePicker** - Seletor de data
* **Dialog** - Modais e diálogos
* **Drawer** - Painel lateral
* **Dropdown** - Menu suspenso
* **Filter** - Componente de filtros
* **ListItem** - Item de lista
* **Menu** / **MenuRadix** - Menus de navegação
* **Quantity** - Seletor de quantidade
* **Radio** / **RadioRadix** - Botões de opção
* **Search** - Campo de busca
* **Select** / **SelectField** / **SelectRadix** - Seleção de opções
* **Table** - Tabelas de dados
* **TextField** - Campo de texto
* **Toast** - Notificações temporárias
* **Tooltip** - Dicas de contexto
* **VerificationCode** - Input de código de verificação

### Características

* Componentes funcionais com TypeScript
* Estilos escopados via CSS Modules (`.module.scss`)
* Consumo de tokens via `var(--token-name)`
* Integração com Radix UI para acessibilidade
* Prontos para SSR, SPAs ou qualquer ambiente que consuma CSS

### Hooks Customizados

* `ApiSimulation` - Simulação de chamadas API
* `InfiniteScroll` - Scroll infinito
* `NormalizeText` - Normalização de texto

### Responsividade

* Breakpoints: `1920`, `1440`, `1024`, `768`, `360`
* Grid nativo com `auto-fit` + `minmax()` planejado

---

## 📚 Documentação com Storybook

Local: `apps/storybook-react/`

* Builder: [`@storybook/react-vite`](https://storybook.js.org/blog/storybook-for-vite/)
* Organização por categorias: Components, Foundation e General
* Componentes internos customizados (decorators, layouts, MDX)
* Suporte a temas globais (light/dark)
* Acessibilidade com `@storybook/addon-a11y`
* Integração com [Chromatic](https://www.chromatic.com/) para CI/CD visual

---

## 🛠️ Utilitários

Local: `packages/utilities/`

Biblioteca de utilitários SCSS com mixins e helpers para:

* **Breakpoints** - Sistema de media queries responsivas
* **Flex** - Utilitários para flexbox
* **Gap Defaults** - Espaçamentos padrão
* **Grid** - Sistema de grid
* **Spacing** - Helpers de espaçamento

---

## 🚀 Scripts Principais

```bash
# Instalar dependências (usando pnpm)
pnpm install

# Gerar tokens
pnpm --filter tokens build

# Build de todos os pacotes
pnpm run build

# Rodar Storybook em modo desenvolvimento
pnpm run storybook

# Build do Storybook para produção
pnpm run build-storybook

# Rodar desenvolvimento de todos os pacotes em paralelo
pnpm run dev

# Executar testes
pnpm run test

# Executar linting
pnpm run lint

# Verificação de tipos TypeScript
pnpm run typecheck

# Gerenciamento de versões com Changesets
pnpm run changeset              # Criar um novo changeset
pnpm run changeset:version      # Atualizar versões baseado nos changesets
pnpm run changeset:publish      # Publicar pacotes

# Limpar cache do Turborepo
npx turbo clean
```

---

## 🧹 Futuro / Roadmap

* [ ] 🎨 Implementar sistema de temas (light/dark) com suporte a `prefers-color-scheme`
* [ ] 🧪 Lint e validação de tokens (`stylelint`, `design-tokens-validate`)
* [ ] 🖼️ Pré-visualização de tokens temáticos no Storybook
* [ ] 📲 Suporte completo a Flutter (`widgetbook`, `components-flutter`)
* [ ] 🎮 Playground React para testes manuais
* [ ] 📦 Publicação automática de pacotes via Changesets
* [ ] 🌐 Internacionalização (i18n) dos componentes
* [ ] ♿ Testes automatizados de acessibilidade
* [ ] 📱 Suporte a componentes mobile-first

---

## 🤝 Contribuição

Para instruções detalhadas, consulte o arquivo [`CONTRIBUTING.md`](./CONTRIBUTING.md).

📍 Licença

Este projeto é privado e protegido por direitos autorais. Todos os direitos reservados.
