## 📁 Estrutura de Pastas

```bash
zanthus-design-system/
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
│   │   └── config/                        # Tokens gerados pelo Style Dictionary
│   │   └── src/                       # Configuração do style dictionary
│   │       ├── colors/                   # .Jason de Tokens de cor (brand, neutrals, feedback)
│   │       ├── spacing/                  # .Jason de Tokens de espaçamento
│   │       ├── border/                   # .Jason de Tokens de borda (largura, raio)
│   │       ├── typography/               # .Jason de Tokens tipográficos (fontes, tamanhos, pesos)
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
│   │       ├── iconMap.jsx                # Mapeamento dos nomes para ícones do Fluent
│   │       └── index.jsx                  # Exportação do pacote

│   ├── onboarding/                       # Componentes e configurações de onboarding (Intro.js) ❌ Ainda não implementado
│   │   └── src/
│   │       ├── IntroOnboarding.js        # Wrapper genérico do tour
│   │       ├── intro.config.js           # Configurações padrão para os passos
│   │       └── index.js                  # Exportação principal

│   ├── grid/                            # Sistema de grid ❌ Ainda não implementado
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