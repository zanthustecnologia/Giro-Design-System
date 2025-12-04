  ---
  tags: [documentação, pnpm, comandos, monorepo]
  aliases: [Guia pnpm, Comandos pnpm]
  created: 2025-12-01
  updated: 2025-12-01
  ---

  # 📚 Guia de Comandos pnpm - Zanthus Design System

  > [!info] Sobre este guia
  > Este documento contém todos os comandos essenciais para trabalhar com o Zanthus Design System usando pnpm.

  ---pm

  ## 🚀 Comandos Principais

  ### Instalar o projeto

  ```bash
  # Instala todas as dependências de todos os workspaces
  pnpm install

  # ou simplesmente
  pnpm i
  ```

  ### Build geral do projeto

  ```bash
  # Executa build de todos os pacotes (usa Turbo)
  pnpm build
  ```

  ### Builds individuais

  ```bash
  # Build de um pacote específico
  pnpm --filter @zanthus/tokens build
  pnpm --filter @zanthus/react build
  pnpm --filter @zanthus/utilities build

  # Forma curta (com -F)
  pnpm -F @zanthus/tokens build
  ```

  ### Executar Storybook

  ```bash
  # Inicia o Storybook em modo dev
  pnpm storybook
  ```

  ---

  ## 🔧 Comandos de Desenvolvimento

  ### Modo desenvolvimento

  ```bash
  # Modo dev em todos os apps/pacotes simultaneamente
  pnpm dev

  # Dev em um app/pacote específico
  pnpm --filter storybook-react dev
  pnpm --filter @zanthus/react dev
  ```

  ### Testes e Qualidade

  ```bash
  # Lint em todo o projeto
  pnpm lint

  # Typecheck (verificação TypeScript)
  pnpm typecheck

  # Testes
  pnpm test
  ```

  ### Storybook

  ```bash
  # Iniciar Storybook (modo dev)
  pnpm storybook

  # Build do Storybook (produção)
  ---

  ## 📦 Gerenciamento de Dependências

  ### Adicionar dependências

  ```bash
  # Adicionar no workspace raiz
  pnpm add -D typescript

  # Adicionar em um pacote específico
  pnpm --filter @zanthus/react add react-icons

  # Adicionar como dependência de dev
  pnpm --filter @zanthus/tokens add -D sass

  # Adicionar em múltiplos pacotes
  pnpm --filter @zanthus/* add lodash
  ```

  ### Remover dependências

  ```bash
  # Remover do raiz
  pnpm remove package-name

  # Remover de um pacote específico
  pnpm --filter @zanthus/react remove package-name
  ```

  ### Atualizar dependências

  ```bash
  # Verificar pacotes desatualizados
  pnpm outdated

  # Atualizar todas as dependências
  pnpm update

  # Atualizar dependência específica
  pnpm update react

  # Atualizar em um workspace específico
  pnpm --filter @zanthus/react update react
  ```
  # Atualizar em um workspace específico
  ---

  ## 🔄 Versionamento e Publicação (Changesets)

  ### Criar um changeset

  ```bash
  # Iniciar processo de versionamento
  pnpm changeset
  ```

  > [!tip] Wizard interativo
  > 1. Selecione os pacotes alterados
  > 2. Escolha o tipo de versão (major/minor/patch)
  > 3. Descreva as mudanças

  ### Aplicar changesets

  ```bash
  # Atualizar versões dos pacotes baseado nos changesets
  pnpm changeset:version
  ```

  ### Publicar pacotes

  ```bash
  # Publicar no npm
  pnpm changeset:publish

  # Release completo (version + build + publish)
  pnpm release
  ```
  # Release completo (version + build + publish)
  ---

  ## 🛠️ Comandos Específicos do pnpm

  ### Executar scripts

  ```bash
  # Executar qualquer script do package.json (sem "run")
  pnpm <nome-do-script>

  # Executar em um workspace específico
  pnpm --filter <nome-do-pacote> <script>

  # Exemplos:
  pnpm build
  pnpm --filter @zanthus/tokens build
  ```

  ### Listar pacotes

  ```bash
  # Ver todos os pacotes do monorepo
  pnpm list --depth 0

  # Ver dependências de um pacote específico
  pnpm --filter @zanthus/react list

  # Ver árvore completa de dependências
  pnpm list
  ```

  ### Executar comandos em múltiplos workspaces

  ```bash
  # Executar script em todos os pacotes (recursive)
  pnpm -r <comando>

  # Exemplos:
  pnpm -r build          # Build em todos
  pnpm -r test           # Testar todos
  pnpm -r lint           # Lint em todos

  # Executar apenas em pacotes que possuem o script
  pnpm -r --if-present test
  ```

  ### Limpar e reinstalar

  ```bash
  # Limpar node_modules de todos os workspaces
  rm -rf node_modules pnpm-lock.yaml
  pnpm install

  # Limpar cache do pnpm
  pnpm store prune

  ---

  ## 🎯 Comandos do dia a dia

  > [!example]- Setup inicial
  > ```bash
  > pnpm install
  > ```

  > [!example]- Desenvolvimento
  > ```bash
  > pnpm dev              # Todos em modo watch
  > pnpm storybook        # Ver componentes
  > ```

  > [!example]- Antes de commitar
  > ```bash
  > pnpm lint             # Verificar código
  > pnpm typecheck        # Verificar tipos
  > pnpm build            # Build completo
  > pnpm test             # Rodar testes
  > ```

  > [!example]- Versionamento
  > ```bash
  > pnpm changeset        # Criar changeset
  ---

  ## 📊 Comparação npm vs pnpm

  | Ação                     | npm                        | pnpm                    |
  | ------------------------ | -------------------------- | ----------------------- |
  | Instalar                 | `npm install`              | `pnpm install`          |
  | Adicionar dep            | `npm install react`        | `pnpm add react`        |
  | Remover dep              | `npm uninstall react`      | `pnpm remove react`     |
  | Executar script          | `npm run build`            | `pnpm build`            |
  | Dev dep                  | `npm install -D typescript`| `pnpm add -D typescript`|
  | Workspace específico     | `npm --workspace=pkg`      | `pnpm --filter pkg`     |
  | Todos workspaces         | `npm run -ws build`        | `pnpm -r build`         |

  ---

  ## 💡 Dicas e Truques

  ### Aliases úteis

  ```bash
  # Forma curta do --filter
  pnpm -F @zanthus/react build

  # Executar múltiplos comandos
  pnpm lint && pnpm build && pnpm test
  ```

  ### Workspace protocols

  > [!note] Uso no package.json
  > ```json
  > {
  >   "dependencies": {
  >     "@zanthus/tokens": "workspace:*"
  >   }
  > }
  > ```

  ### Verificar configuração

  ```bash
  # Ver configuração do pnpm
  pnpm config list

  # Ver workspaces detectados
  pnpm -r list --depth -1
  ```

  ### Performance

  ```bash
  # Instalar sem gerar pnpm-lock.yaml (CI)
  pnpm install --frozen-lockfile

  # Instalar apenas dependências de produção
  pnpm install --prod

  # Fazer cache do pnpm store
  pnpm store path  # Ver onde está o store
  ``` **Performance**
  ```bash
  ---

  ## 🔍 Troubleshooting

  > [!warning]- Problemas com cache
  > ```bash
  > pnpm store prune
  > rm -rf node_modules
  > pnpm install
  > ```

  > [!bug]- Conflitos de versão
  > ```bash
  > # Ver por que um pacote está instalado
  > pnpm why <package-name>
  > 
  > # Ver todas as versões de um pacote
  > pnpm list <package-name>
  > ```

  > [!tip]- Rebuild de pacotes nativos
  > ```bash
  > pnpm rebuild
  > ```

  ---

  ## 📚 Recursos Adicionais

  - 🔗 [Documentação oficial do pnpm](https://pnpm.io/)
  - 🔗 [pnpm Workspaces](https://pnpm.io/workspaces)
  - 🔗 [CLI Commands](https://pnpm.io/cli/add)
  - 🔗 [Filtering](https://pnpm.io/filtering)

  ---

  > [!info]- Metadados
  > **Mantido por:** Zanthus Design System Team  
  > **Última atualização:** Dezembro 2025

  - [Documentação oficial do pnpm](https://pnpm.io/)
  - [pnpm Workspaces](https://pnpm.io/workspaces)
  - [CLI Commands](https://pnpm.io/cli/add)
  - [Filtering](https://pnpm.io/filtering)

  ---

  **Mantido por:** Zanthus Design System Team  
  **Última atualização:** Dezembro 2025
