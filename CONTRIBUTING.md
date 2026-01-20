# 🤝 Contribuindo com o Zanthus Design System

Obrigado por se interessar em contribuir com o Zanthus Design System! Este documento descreve como colaborar com segurança e consistência, mantendo a qualidade do projeto para todos os times e plataformas.

---

## ✅ Pré-requisitos

Antes de começar, você vai precisar de:

* Node.js 18+ instalado
* pnpm instalado globalmente (`npm install -g pnpm`)
* Conta no GitHub
* Conhecimentos básicos em Git, terminal e React (caso vá contribuir com componentes)

---

## 🚀 Começando

1. **Fork este repositório** e clone localmente:

   ```bash
   git clone https://github.com/seu-usuario/zanthus-design-system.git
   cd zanthus-design-system
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Crie uma nova branch:**

   ```bash
   git checkout -b feat/nome-da-sua-feature
   ```

4. **Faça sua contribuição:**

   * Tokens → `packages/tokens/src/`
   * Componentes React → `packages/react/src/`
   * Hooks/utilitários → `packages/utils/src/`
   * Documentação → `README.md`, Storybook ou arquivos Markdown

5. **Rode os testes, linter e build antes de commitar:**

   ```bash
   pnpm lint
   pnpm turbo run build
   pnpm test
   ```

6. **Crie um pull request** usando o **template de MR** (`.gitlab/merge_request_templates/component_change.md`) e preencha todas as seções obrigatórias, especialmente o **Tipo de Mudança** (patch/minor/major).

---

## 🔄 Workflow de Versionamento (IMPORTANTE)

### Para Desenvolvedores (Giovani)

Quando criar um **Merge Request** no GitLab:

1. **Use o template de MR:** `.gitlab/merge_request_templates/component_change.md`
2. **Identifique o tipo de mudança:**
   - 🐛 **PATCH** - Bug fix, documentação (v1.0.0 → v1.0.1)
   - ✨ **MINOR** - Nova funcionalidade SEM quebrar compatibilidade (v1.0.0 → v1.1.0)
   - 💥 **MAJOR** - Breaking change, API incompatível (v1.0.0 → v2.0.0)

3. **Se for MAJOR (Breaking Change), documente:**
   - Tabela de props removidas/alteradas
   - Exemplos de migração (antes/depois)
   - Justificativa técnica

📖 **Leia o guia completo:** [docs/guides/giovani-guidelines.md](docs/guides/giovani-guidelines.md)

### Para Reviewer (Felipe)

Ao revisar um MR:

1. **Valide o tipo de versão** marcado pelo desenvolvedor
2. **Confirme que breaking changes estão documentadas** (se MAJOR)
3. **Após merge, crie o changeset:**

```bash
pnpm changeset
# Selecione o pacote e tipo de versão (baseado no MR)
# Descreva a mudança (copie do MR)
```

---

## ✍️ Padrão de Commits (Conventional Commits)

Todos os commits devem seguir o padrão:

```
<tipo>(escopo): descrição
```

### Exemplos válidos:

* `feat(button): adiciona botão com ícone`
* `fix(grid): corrige espaçamento em telas pequenas`
* `docs(readme): adiciona seção sobre Turborepo`

### Tipos permitidos:

| Tipo     | Descrição                            |
| -------- | ------------------------------------ |
| feat     | Nova funcionalidade                  |
| fix      | Correção de bug                      |
| docs     | Apenas mudanças de documentação      |
| style    | Formatação, identação, etc.          |
| refactor | Refatoração sem alteração funcional  |
| test     | Adição ou alteração de testes        |
| chore    | Tarefas auxiliares (builds, configs) |

> Use `pnpm run commit` com [commitizen](https://github.com/commitizen/cz-cli) se desejar ajuda na formatação.

---

## 📐 Padrões Visuais

* **Use tokens sempre que possível.** Nunca codifique cores, espaçamentos ou fontes diretamente.
* **Siga os breakpoints oficiais** (`1920`, `1440`, `1024`, `768`, `360`)
* **Componentes visuais devem vir com exemplo no Storybook**
* **Grid, espaçamento e tipografia devem estar alinhados ao sistema de design**

---

## 🔍 Revisão de PRs

Todos os pull requests são revisados manualmente. O que buscamos:

* Código limpo, claro e modular
* Tokens e temas usados corretamente
* Storybook atualizado se for componente visual
* Commits semânticos e descrição clara

---

## 📦 Criando novos pacotes

Para criar um novo pacote (ex: `grid`, `icons`, `charts`):

```bash
cd packages/
mkdir nome-do-pacote
```

Inclua um `package.json`, scripts (`build`, `dev`, etc.) e registre como workspace no `package.json` raiz.

---

## 🧹 Checklist antes do PR

* [ ] Lint passou sem erros
* [ ] Build está funcionando (`pnpm turbo run build`)
* [ ] Storybook atualizado (se aplicável)
* [ ] Commit segue padrão
* [ ] Descrevi o que foi feito no PR

---

Obrigado por contribuir! 💜
