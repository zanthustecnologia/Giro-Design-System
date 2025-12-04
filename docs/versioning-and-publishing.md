# 📦 Guia de Versionamento e Publicação - Zanthus Design System

> [!info] Sobre este guia
> Este documento detalha o processo completo de versionamento, changelog e publicação de pacotes no NPM.

---

## 📖 Índice

- [Semantic Versioning](#-semantic-versioning-semver)
- [Versionamento Manual](#-versionamento-manual)
- [Versionamento Automatizado](#-versionamento-automatizado-changesets)
- [Publicação no NPM](#-publicação-no-npm)
- [Workflow Completo](#-workflow-completo-de-release)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Semantic Versioning (SemVer)

O projeto segue a convenção [Semantic Versioning](https://semver.org/):

### Formato: `MAJOR.MINOR.PATCH` (X.Y.Z)

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| **PATCH** (x.x.1) | Correções de bugs, documentação, melhorias menores | `1.0.0` → `1.0.1` |
| **MINOR** (x.1.x) | Novas funcionalidades mantendo compatibilidade | `1.0.0` → `1.1.0` |
| **MAJOR** (1.x.x) | Mudanças que quebram compatibilidade (breaking changes) | `1.0.0` → `2.0.0` |

### Exemplos práticos:

```bash
# Correção de bug → PATCH
1.0.0 → 1.0.1

# Novo componente adicionado → MINOR
1.0.1 → 1.1.0

# Mudança na API de um componente → MAJOR
1.1.0 → 2.0.0
```

---

## 🔧 Versionamento Manual

### Comando básico

```bash
# Incrementar PATCH em todos os pacotes (1.0.0 → 1.0.1)
pnpm -r exec npm version patch

# Incrementar MINOR em todos os pacotes (1.0.0 → 1.1.0)
pnpm -r exec npm version minor

# Incrementar MAJOR em todos os pacotes (1.0.0 → 2.0.0)
pnpm -r exec npm version major
```

### Sem commits e tags Git automáticos

```bash
# Incrementar versão SEM criar commit/tag Git
pnpm -r exec npm version patch --no-git-tag-version
pnpm -r exec npm version minor --no-git-tag-version
pnpm -r exec npm version major --no-git-tag-version
```

### Versão específica

```bash
# Definir uma versão específica em todos os pacotes
pnpm -r exec npm version 1.2.3 --no-git-tag-version
```

### Versionar pacote individual

```bash
# Incrementar versão de um pacote específico
pnpm --filter @giro-ds/react exec npm version patch --no-git-tag-version
pnpm --filter @giro-ds/tokens exec npm version minor --no-git-tag-version
```

### Explicação dos comandos:

- **`pnpm -r`** → Recursive (executa em todos os workspaces)
- **`exec`** → Executa um comando arbitrário
- **`npm version patch`** → Incrementa a versão PATCH
- **`--no-git-tag-version`** → Não cria commit/tag Git automático

---

## 🤖 Versionamento Automatizado (Changesets)

O projeto usa [Changesets](https://github.com/changesets/changesets) para gerenciar versões e changelogs.

### 1. Criar um changeset

```bash
# Iniciar wizard interativo
pnpm changeset
```

O wizard perguntará:

1. **Quais pacotes foram alterados?** (selecione com espaço)
2. **Tipo de mudança?** (patch/minor/major)
3. **Descrição das mudanças** (para o CHANGELOG)

Isso criará um arquivo em `.changeset/` descrevendo as mudanças.

### 2. Aplicar changesets (atualizar versões)

```bash
# Consumir changesets e atualizar versões dos package.json
pnpm changeset:version
```

Isso irá:
- ✅ Atualizar versões nos `package.json`
- ✅ Atualizar arquivos `CHANGELOG.md`
- ✅ Remover os changesets aplicados

### 3. Publicar com changesets

```bash
# Publicar todos os pacotes que tiveram versão alterada
pnpm changeset:publish
```

### Workflow completo com Changesets:

```bash
# 1. Criar changeset para suas alterações
pnpm changeset

# 2. Commitar o changeset
git add .changeset
git commit -m "chore: add changeset for new feature"

# 3. Quando pronto para release:
pnpm changeset:version    # Atualiza versões e CHANGELOGs
git add .
git commit -m "chore: version packages"

# 4. Build dos pacotes
pnpm build

# 5. Publicar
pnpm changeset:publish

# 6. Push com tags
git push --follow-tags
```

---

## 📤 Publicação no NPM

### Pré-requisitos

```bash
# 1. Login no NPM
npm login

# 2. Verificar usuário logado
npm whoami

# 3. Verificar acesso ao scope @giro-ds
npm access list packages
```

### Publicar todos os pacotes

```bash
# Build antes de publicar
pnpm build

# Publicar todos os pacotes (com acesso público)
pnpm -r publish --access public

# Ou usar o script customizado
pnpm release
```

### Publicar pacote individual

```bash
# Build e publicar pacote específico
pnpm --filter @giro-ds/react build
pnpm --filter @giro-ds/react publish --access public
```

### Publicar versão beta/next

```bash
# Definir versão beta
pnpm -r exec npm version 1.1.0-beta.0 --no-git-tag-version

# Publicar com tag 'beta'
pnpm -r publish --access public --tag beta

# Usuários instalam com:
# npm install @giro-ds/react@beta
```

### Verificar publicação

```bash
# Ver informações do pacote no NPM
npm view @giro-ds/react
npm view @giro-ds/tokens
npm view @giro-ds/utilities

# Ver todas as versões publicadas
npm view @giro-ds/react versions
```

---

## 🔄 Workflow Completo de Release

### Opção 1: Versionamento Manual

```bash
# 1. Atualizar versões
pnpm -r exec npm version patch --no-git-tag-version

# 2. Atualizar CHANGELOGs manualmente
# Edite packages/*/CHANGELOG.md

# 3. Commit das mudanças
git add .
git commit -m "chore: bump version to 1.0.1"

# 4. Criar tag
git tag v1.0.1

# 5. Build
pnpm build

# 6. Publicar
pnpm -r publish --access public

# 7. Push com tags
git push origin main --tags
```

### Opção 2: Com Changesets (Recomendado)

```bash
# 1. Durante desenvolvimento: criar changesets
pnpm changeset
git add .changeset
git commit -m "chore: add changeset"

# 2. Quando pronto para release:
pnpm changeset:version
git add .
git commit -m "chore: version packages"

# 3. Build
pnpm build

# 4. Publicar
pnpm changeset:publish

# 5. Push
git push --follow-tags
```

### Opção 3: Script automatizado

```bash
# Um único comando que faz tudo
pnpm release
```

Este script deve executar:
1. `pnpm changeset:version`
2. `pnpm build`
3. `pnpm changeset:publish`

---

## 📝 Estrutura do CHANGELOG

### Formato recomendado:

```markdown
# @giro-ds/react

## 1.1.0

### Minor Changes

- feat: Adiciona novo componente Tabs
- feat: Suporte a tema escuro no Button

### Patch Changes

- fix: Corrige acessibilidade no Dialog
- docs: Atualiza README com exemplos

## 1.0.1

### Patch Changes

- docs: Adiciona documentação completa no README
- chore: Atualiza dependências

## 1.0.0

### Major Changes

- feat: Release inicial
```

---

## 🎯 Casos de Uso Comuns

### Apenas adicionar documentação

```bash
# Versão: 1.0.0 → 1.0.1 (PATCH)
pnpm -r exec npm version patch --no-git-tag-version
```

### Adicionar novo componente

```bash
# Versão: 1.0.1 → 1.1.0 (MINOR)
pnpm -r exec npm version minor --no-git-tag-version
```

### Mudança que quebra compatibilidade

```bash
# Versão: 1.1.0 → 2.0.0 (MAJOR)
pnpm -r exec npm version major --no-git-tag-version
```

### Versões diferentes por pacote

```bash
# React teve breaking change → MAJOR
pnpm --filter @giro-ds/react exec npm version major --no-git-tag-version

# Tokens apenas documentação → PATCH
pnpm --filter @giro-ds/tokens exec npm version patch --no-git-tag-version

# Utilities nova feature → MINOR
pnpm --filter @giro-ds/utilities exec npm version minor --no-git-tag-version
```

---

## 🐛 Troubleshooting

### Erro: "You need to be logged in"

```bash
npm login
# Insira suas credenciais do NPM
```

### Erro: "403 Forbidden"

```bash
# Verificar se você tem permissão no scope @giro-ds
npm access list packages

# Publicar com --access public
pnpm -r publish --access public
```

### Erro: "Version already exists"

```bash
# Incrementar versão novamente
pnpm -r exec npm version patch --no-git-tag-version

# Ou definir versão específica
pnpm -r exec npm version 1.0.2 --no-git-tag-version
```

### Reverter publicação (unpublish)

```bash
# ⚠️ Cuidado! Só funciona em até 72h após publicação
npm unpublish @giro-ds/react@1.0.1

# Deprecate (recomendado ao invés de unpublish)
npm deprecate @giro-ds/react@1.0.1 "Versão com bugs, use 1.0.2"
```

### Limpar e republicar

```bash
# 1. Limpar builds
pnpm -r exec rm -rf dist

# 2. Build limpo
pnpm build

# 3. Publicar novamente
pnpm -r publish --access public
```

---

## 📚 Recursos Adicionais

- 🔗 [Semantic Versioning](https://semver.org/)
- 🔗 [Changesets Documentation](https://github.com/changesets/changesets)
- 🔗 [NPM Publishing](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- 🔗 [pnpm publish](https://pnpm.io/cli/publish)

---

> [!info] Metadados
> **Mantido por:** Zanthus Design System Team  
> **Última atualização:** Dezembro 2025
