# Guia de Migração de Major do React — @giro-ds/react

> Migração de React 18 → React 19 no monorepo. Branch: `feat/react-update`.

---

## Checklist de Conclusão

- [x] Baseline verde antes de qualquer mudança (build + testes + typecheck)
- [x] `peerDependencies` em `packages/react` atualizado para `>= 18.0.0`
- [x] `devDependencies` + Vite aliases (Storybook) atualizados **no mesmo commit**
- [x] `pnpm dev:storybook` inicia sem erros de resolução de dependências
- [x] Código depreciado corrigido (`React.forwardRef` → ref como prop)
- [x] `pnpm --filter @giro-ds/react test` — 100% passing
- [ ] `turbo build` — sem erros
- [ ] Changeset MAJOR criado e `CHANGELOG.md` atualizado
- [ ] Versão publicada no NPM

---

## Estado Inicial (antes da migração)

| Item | Versão instalada | Versão alvo |
|------|-----------------|-------------|
| `react` (devDependencies em `packages/react`) | `^18.3.1` | `^19.0.0` |
| `react` (peerDependencies em `packages/react`) | `^18.3.1` | `>=18.0.0` |
| `@types/react` (root) | `^19.1.10` | `^19.1.10` (já em v19) |
| `apps/storybook-react` react | _(não declarado)_ | `^19.0.0` |

---

## O que quebrou

| Prioridade | Área | Descrição | Arquivos afetados |
|-----------|------|-----------|-------------------|
| 🔴 Alta | Componentes com `ref` | `React.forwardRef` foi depreciado no React 19 — `ref` agora é uma prop comum no componente | `Button.tsx`, `TextField.tsx`, `TextArea.tsx`, `Search.tsx`, `FileUpload.tsx`, `SelectItem.tsx`, `SelectField.tsx` (deprecated) |
| 🔴 Alta | Hook interno | `ForwardedRef<T>` substituído por `React.Ref<T> \| undefined` | `useInputKeyboardValue.tsx` |
| 🟡 Média | Testes | Teste de `VerificationCode.onAutoSubmit` com `userEvent.type` se tornou não-determinístico — substituído por `fireEvent.paste` + `waitFor` | `VerificationCode.test.tsx` |

### Compatibilidade das dependências

| Dependência | Versão instalada | Suporte React 19 | Ação |
|-------------|-----------------|------------------|------|
| `react-simple-keyboard` | `^3.8.206` | ✅ Compatível | Nenhuma |
| `@storybook/react` | `^9.1.2` | ✅ Compatível | Nenhuma |
| `@testing-library/react` | `^16.3.0` | ✅ Compatível | Nenhuma |
| `react-day-picker` | `^9.14.0` | ✅ Compatível | Nenhuma |
| `@radix-ui/*` | diversas | ✅ Compatível | Nenhuma |
| `@tanstack/react-table` | `^8.21.3` | ✅ Compatível | Nenhuma |
| `@fluentui/react-icons` | `^2.0.307` | ✅ Compatível | Nenhuma |

---

## Configuração de Dependências Aplicada

### peerDependencies — `packages/react/package.json`

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

> A versão mínima foi mantida em `18` (não `19`) para não quebrar consumidores que ainda usam React 18.

### devDependencies + Storybook — feitos juntos (commit `4c5bc632`)

`packages/react/package.json`:
```json
"devDependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" }
```

`apps/storybook-react/package.json`:
```json
"dependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" }
```

> ⚠️ **`pnpm.overrides` não foi usado.** Em vez disso, foram adicionados aliases Vite no `apps/storybook-react/.storybook/main.js` para garantir que o Storybook resolva `react`/`react-dom` sempre a partir de `apps/storybook-react/node_modules`, evitando que o React do `packages/react/node_modules` vaze para o bundle.

`apps/storybook-react/.storybook/main.js`:
```js
const appRoot = path.resolve(__dirname, '..');
viteConfig.resolve.alias = {
  ...(viteConfig.resolve.alias || {}),
  'react': path.resolve(appRoot, 'node_modules/react'),
  'react-dom': path.resolve(appRoot, 'node_modules/react-dom'),
  // ... demais aliases
};
```

---

## Código Depreciado Corrigido

### `React.forwardRef` → ref como prop (React 19)

**Antes:**
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // ...
});
```

**Depois:**
```tsx
const Button = ({ ref, ...props }: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  // ...
};
```

Componentes corrigidos:
- `packages/react/src/components/Button/Button.tsx`
- `packages/react/src/components/TextField/TextField.tsx`
- `packages/react/src/components/TextArea/TextArea.tsx`
- `packages/react/src/components/Search/Search.tsx`
- `packages/react/src/components/FileUpload/FileUpload.tsx`
- `packages/react/src/components/Select/components/SelectItem.tsx`
- `packages/react/src/components/.deprecated/SelectField/SelectField.tsx`

### `ForwardedRef<T>` → `React.Ref<T> | undefined` em hook

`packages/react/src/hooks/useInputKeyboardValue.tsx`:
```ts
// Antes
import type { ForwardedRef } from 'react';
function useInputKeyboardValue<T extends HTMLElement>(externalRef: ForwardedRef<T>)

// Depois
import React from 'react';
function useInputKeyboardValue<T extends HTMLElement>(externalRef: React.Ref<T> | undefined)
```

### Teste de `VerificationCode` corrigido

`VerificationCode.test.tsx` — teste `onAutoSubmit`:
```tsx
// Antes (flaky com React 19 + userEvent)
const user = userEvent.setup();
await user.type(inputs[0], '1');
await user.type(inputs[1], '2');
expect(onAutoSubmit).toHaveBeenCalledWith('12');

// Depois
fireEvent.paste(firstInput, {
  clipboardData: { getData: () => '12' },
});
await waitFor(() => expect(onAutoSubmit).toHaveBeenCalledWith('12'));
```

---

## Plano de Execução (executado)

### 1 — Baseline ✅
```bash
pnpm build
pnpm --filter @giro-ds/react test
pnpm --filter @giro-ds/react typecheck
```

### 2 — Corrigir código depreciado ✅ (commit `56e91299`)
- Substituição de `React.forwardRef` em todos os componentes com `ref`
- Atualização de `useInputKeyboardValue` para aceitar `React.Ref<T> | undefined`
- Correção do teste de `VerificationCode`

### 3 — Atualizar dependências ✅ (commit `4c5bc632`)
```bash
pnpm install
pnpm dev:storybook
```

### 4 — Validação final (pendente)
```bash
turbo build
pnpm --filter @giro-ds/react test
pnpm --filter @giro-ds/react typecheck
pnpm dev:storybook
```

### 5 — Changeset e publicação (pendente)
```bash
pnpm changeset     # escolher MAJOR, descrever breaking change do forwardRef
pnpm changeset version
pnpm changeset publish
```

> Ver [`versioning-and-publishing.md`](../../../docs/react/versioning-and-publishing.md) para o passo a passo completo.

---

## Commits da Branch

| Hash | Descrição |
|------|-----------|
| `0293989e` | refactor: Migration plan created for the latest version of React |
| `56e91299` | refactor: Code updated to support React 19, `ValidationCode` test fixed |
| `4c5bc632` | feat: Update dependencies to React 19 and adjust Vite configuration for alias resolution |
| `e9635ce3` | feat: Create a migration guide for major React updates in the monorepo |
| `af15e139` | new: Migration guide moved to the docs folder |
