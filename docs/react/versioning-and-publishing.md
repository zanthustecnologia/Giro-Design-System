# 🚀 Workflow de Release - Passo a Passo

> [!important] Guia Prático
> Este documento contém o **passo a passo exato** para versionar e publicar pacotes no NPM.
> Siga esta ordem à risca para garantir releases consistentes.

---

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Workflow Completo](#-workflow-completo)
- [Exemplo Prático](#-exemplo-prático)
- [Verificações](#-verificações)
- [Troubleshooting](#-troubleshooting)

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter:

```bash
# 1. Login no NPM
npm login
# Insira suas credenciais quando solicitado

# 2. Verificar se está logado
npm whoami
# Deve mostrar seu username

# 3. Branch atualizada
git checkout main
git pull origin main

# 4. Workspace limpo (sem mudanças pendentes)
git status
# Deve mostrar "working tree clean"
```

---

## 🔄 Workflow Completo

### **Passo 1: Fazer as mudanças no código**

Desenvolva normalmente:
- Adicione novos componentes
- Corrija bugs
- Atualize documentação
- etc.

```bash
# Trabalhe normalmente no código
# Faça commits das suas mudanças
git add .
git commit -m "feat: add new Tabs component"
```

---

### **Passo 2: Criar Changeset**

**Sempre que fizer uma mudança**, crie um changeset:

```bash
pnpm changeset
```

O wizard vai perguntar:

#### 2.1. Quais pacotes foram alterados?
```
? Which packages would you like to include?
  ◯ @giro-ds/react
  ◯ @giro-ds/tokens
  ◯ @giro-ds/utilities
```
**Use espaço para selecionar**, Enter para confirmar.

#### 2.2. Qual tipo de mudança?
```
? Which packages should have a major bump?
  No items were selected

? Which packages should have a minor bump?
  ◉ @giro-ds/react

? Which packages should have a patch bump?
  No items were selected
```

**Escolha o tipo correto:**
- **PATCH** (1.0.0 → 1.0.1): Correções de bug, documentação
- **MINOR** (1.0.0 → 1.1.0): Novas funcionalidades (sem quebrar)
- **MAJOR** (1.0.0 → 2.0.0): Mudanças que quebram compatibilidade

#### 2.3. Descreva a mudança
```
Please enter a summary for this change (this will be in the changelogs).
Summary › 
```

**Siga o padrão Conventional Commits:**
```
feat: add new Tabs component
fix: correct Dialog accessibility issue
docs: update installation instructions
refactor: simplify Button component logic
```

#### 2.4. Confirmar
```
Is this your desired changeset? (Y/n) › true
```
Pressione **Enter** para confirmar.

---

### **Passo 3: Commitar o Changeset**

```bash
# Adicionar o changeset criado
git add .changeset

# Commitar junto com suas mudanças (ou separado)
git commit -m "feat: add new Tabs component"

# Push para o repositório
git push origin main
```

> [!tip] Dica
> Você pode criar múltiplos changesets antes de fazer o release.
> Cada PR/MR deve ter seu próprio changeset.

---

### **Passo 4: Quando pronto para Release**

Quando acumular changesets suficientes e quiser publicar:

#### 4.1. Aplicar os Changesets (Atualizar Versões)

```bash
pnpm changeset:version
```

**O que acontece:**
- ✅ Atualiza versões nos `package.json`
- ✅ Atualiza/cria `CHANGELOG.md`
- ✅ Remove os changesets aplicados (arquivos `.changeset/*.md`)

**Resultado esperado:**
```
🦋  All files have been updated. Review them and commit at your leisure
```

#### 4.2. Revisar as Mudanças

```bash
# Ver o que foi alterado
git status

# Revisar CHANGELOGs
cat packages/react/CHANGELOG.md
cat packages/tokens/CHANGELOG.md
cat packages/utilities/CHANGELOG.md
```

**Certifique-se que:**
- ✅ Versões estão corretas
- ✅ CHANGELOGs fazem sentido
- ✅ Changesets foram removidos

#### 4.3. Commitar as Versões

```bash
git add .
git commit -m "chore: version packages to X.X.X"
```

> [!warning] Importante
> **NÃO faça push ainda!** As tags serão criadas no próximo passo.

---

### **Passo 5: Build dos Pacotes**

```bash
pnpm build
```

**O que acontece:**
- ✅ Compila `@giro-ds/react` → `packages/react/dist/`
- ✅ Gera tokens `@giro-ds/tokens` → `packages/tokens/build/`
- ✅ Compila `@giro-ds/utilities` → `packages/utilities/dist/`

**Verificar se build funcionou:**
```bash
# Deve mostrar os arquivos compilados
ls packages/react/dist
ls packages/tokens/build
ls packages/utilities/dist
```

---

### **Passo 6: Publicar no NPM**

```bash
pnpm changeset:publish
```

**O que acontece:**
- ✅ Publica todos os pacotes alterados no NPM
- ✅ Cria tags Git localmente:
  - `@giro-ds/react@X.X.X`
  - `@giro-ds/tokens@X.X.X`
  - `@giro-ds/utilities@X.X.X`
- ✅ Usa provenance (autenticação NPM)

**Resultado esperado:**
```
🦋  success packages published successfully:
🦋  @giro-ds/react@1.0.1
🦋  @giro-ds/tokens@1.0.1
🦋  @giro-ds/utilities@1.0.1
```

> [!warning] Atenção
> As tags foram criadas **localmente**. Você precisa enviá-las no próximo passo.

---

### **Passo 7: Push com Tags**

```bash
git push --follow-tags
```

**O que acontece:**
- ✅ Envia o commit de versão para o GitLab
- ✅ Envia as tags criadas pelo changeset
- ✅ Sincroniza Git e NPM

**Verificar no GitLab:**
- Repository → Tags → Deve mostrar as novas tags
- Você pode criar Releases a partir dessas tags

---

## ✅ Verificações Pós-Release

### 1. Verificar no NPM

```bash
# Ver informações do pacote
npm view @giro-ds/react
npm view @giro-ds/tokens
npm view @giro-ds/utilities

# Ver versões publicadas
npm view @giro-ds/react versions
```

### 2. Verificar Tags no Git

```bash
# Listar tags locais
git tag -l

# Verificar se tags foram para o remoto
git ls-remote --tags origin
```

### 3. Testar Instalação

```bash
# Em outro projeto de teste
npm install @giro-ds/react@latest
npm install @giro-ds/tokens@latest
npm install @giro-ds/utilities@latest
```

---

## 📖 Exemplo Prático Completo

### Cenário: Adicionar documentação aos READMEs

```bash
# 1. Fazer as mudanças
# (editar packages/*/README.md)

# 2. Criar changeset
pnpm changeset
# → Selecionar: react, tokens, utilities
# → Tipo: patch (apenas documentação)
# → Summary: "docs: add comprehensive documentation to package READMEs"
# → Confirmar: true

# 3. Commitar changeset
git add .
git commit -m "docs: add comprehensive documentation to package READMEs"
git push origin main

# 4. Quando pronto para release:
pnpm changeset:version
# → Revisa mudanças nos CHANGELOGs

# 5. Commitar versões
git add .
git commit -m "chore: version packages to 1.0.1"

# 6. Build
pnpm build

# 7. Publicar
pnpm changeset:publish

# 8. Push com tags
git push --follow-tags
```

**Resultado:**
- Versão: 1.0.0 → 1.0.1
- Pacotes publicados no NPM
- Tags no GitLab: `@giro-ds/react@1.0.1`, etc.

---

## 🎯 Resumo (Checklist)

Use este checklist para cada release:

```markdown
- [ ] 1. Fazer mudanças no código
- [ ] 2. Criar changeset: `pnpm changeset`
- [ ] 3. Commitar e push
- [ ] 4. Aplicar changesets: `pnpm changeset:version`
- [ ] 5. Revisar CHANGELOGs
- [ ] 6. Commitar versões: `git commit -m "chore: version packages"`
- [ ] 7. Build: `pnpm build`
- [ ] 8. Publicar: `pnpm changeset:publish`
- [ ] 9. Push com tags: `git push --follow-tags`
- [ ] 10. Verificar no NPM e GitLab
```

---

## 🐛 Troubleshooting

### Erro: "You must be logged in to publish"

```bash
npm login
# Insira suas credenciais
```

### Erro: "Version already exists"

```bash
# Se já publicou por engano, incremente novamente
pnpm -r exec npm version patch --no-git-tag-version
git add .
git commit -m "chore: bump version"
```

### Esqueci de fazer push com --follow-tags

```bash
# Enviar apenas as tags
git push --tags

# Ou enviar tags específicas
git push origin @giro-ds/react@1.0.1
```

### Build falhou

```bash
# Limpar e rebuildar
pnpm -r exec rm -rf dist
pnpm build
```

### Changeset não detecta mudanças

```bash
# Forçar criação de changeset vazio
pnpm changeset add --empty
# Depois edite .changeset/*.md manualmente
```

---

## 📚 Recursos Adicionais

- 📄 [Semantic Versioning](https://semver.org/)
- 📄 [Conventional Commits](https://www.conventionalcommits.org/)
- 📄 [Changesets Documentation](https://github.com/changesets/changesets)
- 📄 [Guia de Versionamento Completo](./versioning-and-publishing.md)

---

> [!info] Metadados
> **Mantido por:** Giro Design System Team
> **Última atualização:** Dezembro 2025  
> **Versão do documento:** 1.0.0
