# Guia de Migração de Major do React — @giro-ds/react

> Template para atualizações de major version do React no monorepo.  
> Substitua `<versão-atual>` e `<versão-alvo>` antes de iniciar.

---

## Checklist de Conclusão

- [ ] Baseline verde antes de qualquer mudança (build + testes + typecheck)
- [ ] `peerDependencies` em `packages/react` atualizado para `>= <versão-mínima>.0.0`
- [ ] `devDependencies` + `pnpm.overrides` + Storybook atualizados **no mesmo commit**
- [ ] `pnpm why react` exibe apenas **uma** versão no monorepo
- [ ] `pnpm dev:storybook` inicia sem erros de resolução de dependências
- [ ] Código depreciado corrigido (APIs removidas/alteradas na nova versão)
- [ ] `pnpm --filter @giro-ds/react test` — 100% passing
- [ ] `turbo build` — sem erros
- [ ] Changeset MAJOR criado e `CHANGELOG.md` atualizado
- [ ] Versão publicada no NPM

---

## Estado Atual

> Preencher ao iniciar.

| Item | Versão instalada | Versão alvo |
|------|-----------------|-------------|
| `react` (devDependencies) | | |
| `react` (peerDependencies) | | |
| `@types/react` | | |
| `apps/storybook-react` react | | |

```bash
pnpm outdated --recursive
pnpm why react
```

---

## O que pode quebrar

> Preencher consultando o changelog oficial da versão alvo e `pnpm outdated`.

| Prioridade | Área | Descrição | Arquivos afetados |
|-----------|------|-----------|-------------------|
| 🔴 Alta | | | |
| 🟡 Média | | | |

### Compatibilidade das dependências

| Dependência | Versão instalada | Suporte versão alvo | Ação |
|-------------|-----------------|---------------------|------|
| `react-simple-keyboard` | | | |
| `@storybook/react` | | | |
| `@testing-library/react` | | | |
| `react-day-picker` | | | |
| `@radix-ui/*` | | | |
| `@tanstack/react-table` | | | |
| `@fluentui/react-icons` | | | |

---

## Configuração de Dependências

### peerDependencies — `packages/react/package.json`

```json
"peerDependencies": {
  "react": ">= <versão-mínima>.0.0",
  "react-dom": ">= <versão-mínima>.0.0"
}
```

### devDependencies + pnpm.overrides + Storybook — fazer juntos

> ⚠️ Estas três alterações devem ir no **mesmo commit**. Atualizar só uma parte gera uma combinação mista de peers no pnpm, impedindo a instalação correta dos sub-pacotes do Radix UI e quebrando a pré-bundling do Vite.

`packages/react/package.json`:
```json
"devDependencies": { "react": "^<versão-alvo>.0.0", "react-dom": "^<versão-alvo>.0.0" }
```

`package.json` (raiz):
```json
"pnpm": { "overrides": { "react": "^<versão-alvo>.0.0", "react-dom": "^<versão-alvo>.0.0" } }
```

`apps/storybook-react/package.json`:
```json
"dependencies": { "react": "^<versão-alvo>.0.0", "react-dom": "^<versão-alvo>.0.0" }
```

Verificar também que `apps/storybook-react/.storybook/main.js` tem aliases Vite para `react`/`react-dom` apontando para `apps/storybook-react/node_modules`, impedindo o Vite de resolver o React do `packages/react/node_modules`.

---

## Plano de Execução

### 1 — Baseline

```bash
pnpm build
pnpm --filter @giro-ds/react test
pnpm --filter @giro-ds/react typecheck
```

Registrar falhas pré-existentes. **Não prosseguir até o baseline estar verde.**

### 2 — Atualizar dependências

Aplicar as três alterações da seção "Configuração de Dependências" no mesmo commit, depois:

```bash
pnpm install
pnpm why react   # deve exibir apenas UMA versão
pnpm dev:storybook
```

### 3 — Corrigir código depreciado

Consultar o [blog oficial do React](https://react.dev/blog) e o changelog da versão alvo. Corrigir todos os usos das APIs mapeadas em "O que pode quebrar".

### 4 — Corrigir testes

```bash
pnpm --filter @giro-ds/react test
```

### 5 — Validação final

```bash
pnpm build
pnpm --filter @giro-ds/react typecheck
pnpm dev:storybook
```

### 6 — Changeset e publicação

```bash
pnpm changeset     # escolher MAJOR, descrever a breaking change
pnpm changeset version
pnpm changeset publish
```

> Ver [`versioning-and-publishing.md`](../../../docs/react/versioning-and-publishing.md) para o passo a passo completo.
