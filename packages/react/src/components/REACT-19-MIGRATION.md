# Guia de Migração de Major do React — @giro-ds/react

> Template reutilizável para atualizações de major version do React no monorepo.  
> Preencha os campos `<versão-atual>` e `<versão-alvo>` antes de iniciar.

## Descrição da Tarefa

Atualizar o React e ajustar as configurações de dependência dos pacotes internos do monorepo, garantindo que o projeto permaneça seguro e atualizado, sem gerar conflitos de instalação (peer dependency resolution errors) entre workspaces.

---

## Critérios de Aceite

- [ ] **Mapeamento e Atualização:** Todas as principais bibliotecas do ecossistema do monorepo foram atualizadas para suas versões estáveis mais recentes (varredura de segurança/breaking changes).
- [ ] **Compatibilidade do React:** O pacote `@giro-ds/react` (e outros pacotes compartilhados) aceita a nova versão nas `peerDependencies` sem conflitos.
- [ ] **Sem Duplicidade:** `pnpm install` não gera múltiplas instâncias do React no `node_modules` (verificar com `pnpm why react`).
- [ ] **Storybook estável:** `pnpm dev:storybook` inicia sem erros de resolução de dependências.
- [ ] **Sucesso no Build:** `turbo build` roda sem erros.
- [ ] **Testes Passando:** `pnpm --filter @giro-ds/react test` — 100% passing.
- [ ] **Changeset criado:** bump MAJOR registrado e `CHANGELOG.md` atualizado.
- [ ] **Publicado:** versão MAJOR do `@giro-ds/react` publicada no NPM.

---

## Estado Atual

> Preencher ao iniciar a migração.

| Item | Versão instalada | Versão alvo |
|------|-----------------|-------------|
| `react` (devDependencies) | | |
| `react` (peerDependencies) | | |
| `@types/react` (root) | | |
| `@types/react-dom` (root) | | |
| `apps/storybook-react` react | | |

Listar dependências que bloqueiam (peer conflicts):

```bash
pnpm outdated --recursive
pnpm why react
```

---

## O que precisa mudar em `packages/react/package.json`

### peerDependencies — configuração recomendada

```json
"peerDependencies": {
  "react": ">= <versão-mínima-suportada>.0.0",
  "react-dom": ">= <versão-mínima-suportada>.0.0"
}
```

> Usar `>=N.0.0` é a forma mais segura: aceita versões futuras sem precisar alterar o `package.json` a cada major.  
> Alternativa controlada por major: `"^X.0.0 || ^Y.0.0"`

### devDependencies — atualizar para a versão alvo

```json
"devDependencies": {
  "react": "^<versão-alvo>.0.0",
  "react-dom": "^<versão-alvo>.0.0"
}
```

> ⚠️ **Atenção:** nunca atualizar devDependencies para a nova versão sem também atualizar o Storybook e adicionar `pnpm.overrides` na raiz. Fazer só parte disso cria uma **combinação mista de peers** no pnpm (ex: `react-dom@18` runtime + `@types/react@19` tipos), o que impede que sub-dependências do Radix UI sejam instaladas corretamente pela pré-bundling do Vite.

### pnpm.overrides na raiz — garantia de versão única (etapa obrigatória)

```json
// package.json (raiz do monorepo)
"pnpm": {
  "overrides": {
    "react": "^<versão-alvo>.0.0",
    "react-dom": "^<versão-alvo>.0.0"
  }
}
```

> Sem esse override, o pnpm pode resolver versões diferentes de React simultaneamente para pacotes distintos do workspace, gerando instâncias duplicadas e erros na pré-bundling do Vite. O override força que **todo o monorepo** use a mesma versão.

---

## ⚠️ Classificação da mudança (Breaking Change)

Usar a checklist de [`giovani-guidelines.md`](../../../docs/react/giovani-guidelines.md) para determinar o tipo de bump:

| Pergunta | Se SIM → |
|----------|----------|
| Removi/renomeei alguma prop ou API pública? | **MAJOR** 💥 |
| Mudei comportamento padrão de algum componente? | **MAJOR** 💥 |
| Adicionei nova funcionalidade sem quebrar compatibilidade? | **MINOR** ✨ |
| Apenas corrigi bug ou warning de deprecação? | **PATCH** 🐛 |

**Preencher a tabela de breaking changes para o MR:**

| Componente/API | Antes | Depois |
|---------------|-------|--------|
| | | |

> **Ação obrigatória:** atualizar `packages/react/CHANGELOG.md` com a breaking change antes de publicar. Ver [`rules/general.md`](../../../docs/react/rules/general.md) — "Changelog Obrigatório".

---

## O que pode quebrar

> Preencher durante o mapeamento inicial (`pnpm outdated`, leitura dos changelogs da nova versão do React).

### 🔴 Alta Prioridade

| # | Área | Descrição | Arquivos afetados |
|---|------|-----------|--------------------|
| | | | |

### 🟡 Média Prioridade

| # | Área | Descrição | Arquivos afetados |
|---|------|-----------|--------------------|
| | | | |

---

## Compatibilidade das Dependências

> Preencher consultando o `peerDependencies` de cada pacote e os changelogs oficiais.

| Dependência | Versão instalada | Suporte versão alvo | Ação necessária |
|-------------|-----------------|--------------------|-----------------|
| `react-simple-keyboard` | | | |
| `@storybook/react` | | | |
| `@testing-library/react` | | | |
| `react-day-picker` | | | |
| `@radix-ui/*` | | | |
| `@tanstack/react-table` | | | |
| `react-router-dom` | | | |
| `react-i18next` | | | |
| `react-loading-skeleton` | | | |
| `react-content-loader` | | | |
| `@fluentui/react-icons` | | | |

---

## Estratégia de Atualização das demais Libs

Conforme orientação do card:

1. **Rodar `pnpm outdated`** para listar o que está crítico no monorepo.
2. **Atualizar em blocos:**
   - Primeiro: ferramentas de build (`rollup`, `typescript`, `vite`, `turbo`)
   - Segundo: libs de UI e runtime (`@radix-ui/*`, `@tanstack/*`, `react-day-picker`)
   - Terceiro: React e React DOM
3. **Verificar breaking changes** de cada lib antes de atualizar (changelogs).
4. **Testar após cada bloco** para facilitar o "find and fix" de regressões.

---

## Plano de Migração — Passo a Passo

### Etapa 1 — Snapshot do estado atual e baseline

```bash
# Verificar o que está desatualizado
pnpm outdated --recursive

# Confirmar versões de react instaladas no workspace
pnpm why react
pnpm why react-dom

# Rodar build e testes ANTES de qualquer mudança para registrar o baseline
pnpm build
pnpm --filter @giro-ds/react test
pnpm --filter @giro-ds/react typecheck
```

Registrar quaisquer falhas pré-existentes. Não prosseguir até o baseline estar verde.

---

### Etapa 2 — Ajuste de peerDependencies

Alterar `packages/react/package.json`:

```diff
 "peerDependencies": {
-  "react": "^<versão-atual>.x",
-  "react-dom": "^<versão-atual>.x"
+  "react": ">= <versão-mínima-suportada>.0.0",
+  "react-dom": ">= <versão-mínima-suportada>.0.0"
 },
```

Rodar `pnpm install` e verificar ausência de warnings de peer dependency.

---

### Etapa 3 — Atualizar React (devDependencies + pnpm.overrides + Storybook)

> ⚠️ **Estas três sub-etapas devem ser feitas juntas, no mesmo commit.** Fazer apenas uma parte cria uma combinação mista de peers no pnpm (ex: `react-dom@18` runtime + `@types/react@19` tipos), que impede a instalação dos sub-pacotes do Radix UI e quebra a pré-bundling do Vite.

**3a. Atualizar `packages/react/package.json` — devDependencies:**

```diff
 "devDependencies": {
-  "react": "^<versão-atual>.0.0",
-  "react-dom": "^<versão-atual>.0.0"
+  "react": "^<versão-alvo>.0.0",
+  "react-dom": "^<versão-alvo>.0.0"
 }
```

**3b. Adicionar `pnpm.overrides` no `package.json` raiz:**

```json
"pnpm": {
  "overrides": {
    "react": "^<versão-alvo>.0.0",
    "react-dom": "^<versão-alvo>.0.0"
  }
}
```

**3c. Atualizar `apps/storybook-react/package.json`:**

```json
"dependencies": {
  "react": "^<versão-alvo>.0.0",
  "react-dom": "^<versão-alvo>.0.0"
}
```

E verificar que `apps/storybook-react/.storybook/main.js` contém aliases Vite para `react`/`react-dom` apontando para `apps/storybook-react/node_modules` — isso impede o Vite de resolver React pelo `packages/react/node_modules`.

**3d. Rodar e validar:**

```bash
pnpm install
pnpm why react    # deve mostrar apenas UMA versão
pnpm dev:storybook  # deve iniciar sem erros de resolução de dependências
```

---

### Etapa 4 — Corrigir código depreciado

Verificar no [blog oficial do React](https://react.dev/blog) e no changelog da versão alvo quais APIs foram depreciadas ou removidas. Corrigir todos os usos nos componentes mapeados na seção "O que pode quebrar".

Exemplo de padrão de migração (adaptar conforme a API depreciada):

```tsx
// Antes
const MyComponent = deprecatedAPI<Props>((props, param) => {
  // ...
});

// Depois
const MyComponent = ({ param, ...props }: Props) => {
  // ...
};
```

---

### Etapa 5 — Revisar e corrigir testes

- Verificar testes que usam APIs alteradas na nova versão do React.
- Converter `act()` síncronos problemáticos para `await act(async () => {...})` quando necessário.
- Executar a suite completa:

```bash
pnpm --filter @giro-ds/react test
```

---

### Etapa 6 — Validação final

```bash
pnpm build                             # build global via turbo — sem erros
pnpm --filter @giro-ds/react test      # 100% passing
pnpm --filter @giro-ds/react typecheck # sem erros de tipo
pnpm dev:storybook                     # verificação visual — sem erros de resolução
```

---

### Etapa 7 — Criar Changeset (MAJOR) e atualizar CHANGELOG

A remoção de `forwardRef` é uma **breaking change** — exige bump **MAJOR** conforme [`giovani-guidelines.md`](../../../docs/react/giovani-guidelines.md) e [`rules/general.md`](../../../docs/react/rules/general.md).

```bash
pnpm changeset
```

No wizard:
1. Selecionar `@giro-ds/react`
2. Escolher **major**
3. Descrever a breaking change de forma clara (exemplo):

```
BREAKING CHANGE: <descrever a API removida/alterada, os componentes afetados e
o que o consumidor precisa fazer para migrar>.
```

Verificar que `packages/react/CHANGELOG.md` foi atualizado automaticamente pelo changeset.

```bash
pnpm changeset version   # aplica o bump de versão
pnpm changeset publish   # publica no NPM
```

> Ver passo a passo completo em [`versioning-and-publishing.md`](../../../docs/react/versioning-and-publishing.md).
