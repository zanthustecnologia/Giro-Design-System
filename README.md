# 🌝 Zanthus Design System

Design system escalável, white-label e multiplataforma. Desenvolvido para acelerar a criação de interfaces consistentes, acessíveis e responsivas com suporte nativo a múltiplas marcas, temas e tecnologias.

---

## 📦 Arquitetura

Monorepo gerenciado com [Turborepo](https://turbo.build/repo), organizado por workspaces independentes para tokens, componentes, documentação e utilitários.

### Workspaces

```
├── apps/                                 # Aplicações consumidoras ou de visualização
│   ├── storybook-react/                  # Instância do Storybook (React)
│   │   ├── .storybook/                   # Configurações do Storybook
│   │   ├── src/
│   │   │   ├── assets/                   # Recursos estáticos
│   │   │   ├── internal-components/      # Componentes internos do Storybook
│   │   │   │   ├── decorators/           # Decorators customizados
│   │   │   │   ├── layouts/              # Layouts para documentação
│   │   │   │   └── mdx/                  # Componentes MDX
│   │   │   ├── stories/                  # Stories organizadas
│   │   │   │   ├── Components/           # Stories de componentes
│   │   │   │   ├── Foundation/           # Stories de fundamentos
│   │   │   │   └── General/              # Stories gerais
│   │   │   ├── styles/                   # Estilos globais do Storybook
│   │   │   └── types/                    # Definições de tipos
│   └── storybook-flutter/                # Widgetbook (Flutter)
│       ├── lib/
│       │   ├── main.dart                 # App principal Widgetbook
│       │   └── stories/                  # Stories de componentes Flutter
│       └── pubspec.yaml                  # Dependências Flutter
├── packages/                             # Pacotes reutilizáveis, versionáveis e independentes
│   ├── components-flutter/               # Biblioteca de componentes Flutter
│   │   ├── lib/
│   │   │   ├── components/               # Componentes Flutter
│   │   │   │   ├── avatar/
│   │   │   │   ├── badge/
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── checkbox/
│   │   │   │   ├── chip/
│   │   │   │   ├── dialog/
│   │   │   │   ├── divider/
│   │   │   │   ├── dropdown/
│   │   │   │   ├── icon_button/
│   │   │   │   ├── input/
│   │   │   │   ├── list_item/
│   │   │   │   ├── radio/
│   │   │   │   ├── select/
│   │   │   │   ├── switch/
│   │   │   │   ├── text/
│   │   │   │   └── tooltip/
│   │   │   ├── tokens/                   # Design tokens Flutter
│   │   │   │   ├── colors.dart
│   │   │   │   ├── spacing.dart
│   │   │   │   ├── typography.dart
│   │   │   │   ├── border_radius.dart
│   │   │   │   └── shadows.dart
│   │   │   └── zanthus_flutter.dart      # Entry point do pacote
│   │   └── pubspec.yaml
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

## 📱 Componentes Flutter

Local: `packages/components-flutter/lib/components/`

### Componentes Disponíveis

O design system Flutter conta com os seguintes componentes implementados:

* **Avatar** - Imagens de perfil com fallback para iniciais
* **Badge** - Indicadores e etiquetas com variantes
* **Button** - Botões com múltiplas variantes (primary, secondary, outline, ghost, text) e tamanhos
* **Card** - Container com elevação e cantos arredondados
* **Checkbox** - Caixas de seleção com suporte a label
* **Chip** - Elementos compactos para tags e filtros
* **Dialog** - Diálogos modais
* **Divider** - Separadores visuais (horizontal e vertical)
* **Dropdown** - Menus de seleção
* **Icon Button** - Botões de ícone com tooltip
* **Input** - Campos de entrada de texto com validação
* **List Item** - Itens de lista com leading/trailing content
* **Radio** - Seleção única entre múltiplas opções
* **Select** - Seleção com item builder customizável
* **Switch** - Controles de alternância
* **Text** - Tipografia com estilos predefinidos
* **Tooltip** - Informações contextuais

### Design Tokens Flutter

* **ZanthusColors** - Sistema de cores
* **ZanthusSpacing** - Espaçamentos
* **ZanthusTypography** - Tipografia e estilos de texto
* **ZanthusBorderRadius** - Raios de borda
* **ZanthusShadows** - Sombras e elevação

### Características

* Componentes baseados em Material Design
* Totalmente tipados com Dart
* Suporte a temas light/dark
* Acessibilidade integrada
* Integração com tokens do design system
* Prontos para iOS, Android, Web e Desktop

### Instalação

```yaml
dependencies:
  zanthus_flutter:
    path: ../packages/components-flutter
```

### Uso

```dart
import 'package:zanthus_flutter/zanthus_flutter.dart';

// Usando componentes
ZanthusButton(
  text: 'Click me',
  onPressed: () {},
  variant: ZanthusButtonVariant.primary,
  size: ZanthusButtonSize.medium,
)

// Usando tokens
Container(
  padding: EdgeInsets.all(ZanthusSpacing.md),
  decoration: BoxDecoration(
    color: ZanthusColors.primary,
    borderRadius: ZanthusBorderRadius.borderRadiusMd,
  ),
)
```

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

## 📚 Documentação

### Storybook React

Local: `apps/storybook-react/`

* Builder: [`@storybook/react-vite`](https://storybook.js.org/blog/storybook-for-vite/)
* Organização por categorias: Components, Foundation e General
* Componentes internos customizados (decorators, layouts, MDX)
* Suporte a temas globais (light/dark)
* Acessibilidade com `@storybook/addon-a11y`
* Integração com [Chromatic](https://www.chromatic.com/) para CI/CD visual

**Executar:**
```bash
pnpm run storybook
```

### Widgetbook Flutter

Local: `apps/storybook-flutter/`

* Framework: [Widgetbook](https://widgetbook.io/) v3.8.0
* Showcase interativo de todos os componentes Flutter
* Theme switcher (Light/Dark)
* Device frame preview para iOS, Android e Desktop
* Text scale testing para acessibilidade
* Component knobs para customização em tempo real

**Executar:**
```bash
cd apps/storybook-flutter
flutter pub get
flutter run
```

**Build para web:**
```bash
cd apps/storybook-flutter
flutter build web
```

---

## 🛠️ Utilitários

Local: `packages/utilities/`

Biblioteca completa de classes utilitárias CSS baseadas nos tokens do design system.

### Instalação

```bash
pnpm add @giro-ds/utilities
```

### Uso

```javascript
import '@giro-ds/utilities';
```

### Categorias de Utilitários

* **Spacing** - Margin e padding (`.m-*`, `.p-*`, `.mx-*`, `.py-*`, etc.)
* **Gap** - Espaçamento entre elementos flex/grid (`.gap-*`, `.gap-x-*`, `.gap-y-*`)
* **Colors** - Background, text e border colors usando tokens
* **Borders** - Border radius, width e style com todas as direções
* **Typography** - Font family, size, weight, align, transform e decoration
* **Flexbox** - Direction, wrap, justify, align, grow e shrink
* **Grid** - Columns, rows, span e placement
* **Display** - Block, inline, hidden, visibility e overflow
* **Sizing** - Width, height, min/max com tokens de spacing
* **Breakpoints** - Sistema de media queries responsivas

### Responsividade

Todas as classes suportam prefixos responsivos: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```html
<div class="flex flex-col md:flex-row lg:gap-32">
  <!-- Responsivo -->
</div>
```

### Output

```
dist/
└── index.css              # Classes utilitárias compiladas
```

---

## 🚀 Scripts Principais

### Geral

```bash
# Instalar dependências (usando pnpm)
pnpm install

# Build de todos os pacotes
pnpm run build

# Rodar desenvolvimento de todos os pacotes em paralelo
pnpm run dev

# Executar testes
pnpm run test

# Executar linting
pnpm run lint

# Verificação de tipos TypeScript
pnpm run typecheck

# Limpar cache do Turborepo
npx turbo clean
```

### React

```bash
# Gerar tokens
pnpm --filter tokens build

# Rodar Storybook em modo desenvolvimento
pnpm run storybook

# Build do Storybook para produção
pnpm run build-storybook
```

### Flutter

```bash
# Executar Widgetbook
cd apps/storybook-flutter
flutter pub get
flutter run

# Build para web
cd apps/storybook-flutter
flutter build web

# Build pacote de componentes
cd packages/components-flutter
flutter pub get
flutter test
```

### Changesets

```bash
# Gerenciamento de versões
pnpm run changeset              # Criar um novo changeset
pnpm run changeset:version      # Atualizar versões baseado nos changesets
pnpm run changeset:publish      # Publicar pacotes
```

---

## 🧹 Futuro / Roadmap

* [ ] 🎨 Implementar sistema de temas (light/dark) com suporte a `prefers-color-scheme`
* [ ] 🧪 Lint e validação de tokens (`stylelint`, `design-tokens-validate`)
* [ ] 🖼️ Pré-visualização de tokens temáticos no Storybook
* [x] 📲 Suporte completo a Flutter (`widgetbook`, `components-flutter`)
* [ ] 🔄 Sincronização de tokens entre React e Flutter
* [ ] 🎨 Geração automática de tokens Flutter via Style Dictionary
* [ ] 🎮 Playground React para testes manuais
* [ ] 📦 Publicação automática de pacotes via Changesets
* [ ] 🌐 Internacionalização (i18n) dos componentes
* [ ] ♿ Testes automatizados de acessibilidade
* [ ] 📱 Suporte a componentes mobile-first
* [ ] 🧪 Testes unitários para componentes Flutter
* [ ] 📸 Visual regression testing com Widgetbook Cloud

---

## 🤝 Contribuição

Para instruções detalhadas, consulte o arquivo [`CONTRIBUTING.md`](./CONTRIBUTING.md).

📍 Licença

Este projeto é privado e protegido por direitos autorais. Todos os direitos reservados.
