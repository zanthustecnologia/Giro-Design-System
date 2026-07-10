# Migração React 18 → 19 — @giro-ds/react

## Descrição da Tarefa

Como desenvolvedor da equipe de front-end, queremos atualizar as bibliotecas desatualizadas do monorepo e ajustar as configurações de dependência do React nos pacotes internos, para que o projeto permaneça seguro, performático e os pacotes internos aceitem o React 18 e qualquer versão posterior (como o React 19) sem gerar conflitos de instalação (peer dependency resolution errors).

---

## Critérios de Aceite

- [ ] **Mapeamento e Atualização:** Todas as principais bibliotecas do ecossistema do monorepo foram atualizadas para suas versões estáveis mais recentes (varredura de segurança/breaking changes).
- [ ] **Compatibilidade do React:** O pacote `@giro-ds/react` (e outros pacotes compartilhados) deve aceitar React de forma abrangente nas `peerDependencies` (ex: `>=18.0.0`).
- [ ] **Sem Duplicidade:** O processo de instalação (`pnpm install`) não deve gerar múltiplas instâncias do React no `node_modules` final.
- [ ] **Sucesso no Build:** O comando de build global do monorepo (`turbo build`) deve rodar sem erros.
- [ ] **Testes Passando:** A suíte de testes de todos os pacotes e aplicações deve passar com sucesso após as atualizações.

---

## Estado Atual

| Item | Versão atual | Versão mais recente |
|------|-------------|---------------------|
| `react` (runtime) | **18.3.1** | 19.2.7 |
| `@types/react` (root) | **19.2.7** | 19.2.7 |
| `@types/react-dom` (root) | **19.2.3** | 19.2.3 |

> **Inconsistência pré-existente:** o `package.json` raiz já aponta `@types/react` v19, mas o runtime ainda é v18. O código já compila com os tipos do React 19 mas executa sobre React 18.

---

## O que precisa mudar em `packages/react/package.json`

### peerDependencies — configuração recomendada pelo card

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```

> Usar `>=18.0.0` é a forma mais segura: aceita React 18, 19 e versões futuras sem precisar atualizar o `package.json` a cada major.  
> Alternativa mais restrita (se quiser controle por major): `"^18.0.0 || ^19.0.0"`

### devDependencies — manter base de teste estável

```json
"devDependencies": {
  "react": "^18.3.0",
  "react-dom": "^18.3.0"
}
```

> As devDependencies permanecem em React 18 para garantir que os testes locais do pacote continuem passando enquanto a migração não é concluída end-to-end.

---

## O que pode quebrar

### 🔴 Alta Prioridade

#### 1. `forwardRef` depreciado — 7 componentes, 15 arquivos

Em React 19, `ref` é agora uma prop comum. O `forwardRef` continua funcionando mas gera **warning no console** em toda renderização.

| Componente | Arquivo |
|------------|---------|
| `Button` | `Button/Button.tsx` |
| `Search` | `Search/Search.tsx` |
| `TextField` | `TextField/TextField.tsx` |
| `TextArea` | `TextArea/TextArea.tsx` |
| `FileUpload` | `FileUpload/FileUpload.tsx` |
| `SelectItem` | `Select/components/SelectItem.tsx` |
| `SelectField` *(deprecated)* | `.deprecated/SelectField/SelectField.tsx` |

**Correção esperada:**

```tsx
// Antes (React 18 — forwardRef wrapper)
const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Depois (React 19 — ref como prop normal)
const TextField = ({ ref, ...props }: TextFieldProps & { ref?: React.Ref<HTMLInputElement> }) => {
  return <input ref={ref} {...props} />;
};
```

---

#### 2. `act()` nos testes — ~25+ usos no VirtualKeyboard

React 19 alterou o batching automático de state updates e como o `act()` processa microtasks. Testes que misturam `act()` síncrono com atualizações assíncronas podem emitir warnings ou falhar silenciosamente.

Arquivo afetado: `VirtualKeyboard/__tests__/VirtualKeyboard.test.tsx`

---

### 🟡 Média Prioridade

#### 3. `React.cloneElement` passando `ref` nos testes

Em `Select/__tests__/Select.test.tsx` e `Dialog/__tests__/Dialog.test.tsx`, `cloneElement` é usado passando `ref` explicitamente. Em React 19, `ref` deixou de ser "especial" no `cloneElement` — pode gerar comportamento diferente ou warnings nos mocks.

#### 4. Strict Mode mais rigoroso — VirtualKeyboard

React 19 em Strict Mode faz double-invoke de efeitos de forma mais agressiva. O `VirtualKeyboard` usa `MutationObserver` + `useEffect` montado uma única vez (`[]`) para reinjetar ícones Fluent. Esse padrão pode ter comportamento imprevisível com o double-invoke do Strict Mode (observer registrado duas vezes, callbacks duplicados).

#### 5. `React.FC` — 30+ componentes

`React.FC` ainda existe no React 19 e não é removido, mas é considerado convenção legada. Não quebra, mas é recomendado migrar para tipagem explícita ao longo do tempo. Nenhuma ação urgente necessária.

---

## Compatibilidade das Dependências

| Dependência | Versão instalada | Suporte React 19 |
|-------------|-----------------|------------------|
| `react-simple-keyboard` | 3.8.206 | ✅ `^16 \|\| ^17 \|\| ^18 \|\| ^19` |
| `@storybook/react` | 9.1.2 | ✅ `^16 \|\| ^17 \|\| ^18 \|\| ^19` |
| `@testing-library/react` | 16.3.1 | ✅ `^18 \|\| ^19` |
| `react-day-picker` | 9.14.0 | ✅ `>=16.8.0` |
| `@radix-ui/*` (todas) | v1.x+ | ✅ suporta React 19 |
| `@tanstack/react-table` | 8.21.3 | ✅ `>=16.8` |
| `react-router-dom` | 7.10.1 | ✅ `>=18` |
| `react-i18next` | 15.7.4 | ✅ `>=16.8.0` |
| `react-loading-skeleton` | 3.5.0 | ✅ `>=16.8.0` |
| `react-content-loader` | 7.1.1 | ✅ `>=18.0.0` |
| `@fluentui/react-icons` | 2.0.316 | ✅ `>=16.8.0 <20.0.0` |

> Todas as dependências de produção do `@giro-ds/react` são compatíveis com React 19. Nenhuma atualização de dependência é bloqueante para a migração.

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

### Etapa 1 — Ajuste de peerDependencies (baixo risco, sem quebra)

Alterar `packages/react/package.json`:

```diff
 "peerDependencies": {
-  "react": "^18.3.1",
-  "react-dom": "^18.3.1"
+  "react": ">=18.0.0",
+  "react-dom": ">=18.0.0"
 },
 "devDependencies": {
   ...
-  "react": "^18.3.1",
-  "react-dom": "^18.3.1"
+  "react": "^18.3.0",
+  "react-dom": "^18.3.0"
 }
```

Rodar `pnpm install` e verificar ausência de warnings de peer dependency.

---

### Etapa 2 — Verificar build e testes (estado baseline)

```bash
pnpm build            # build global via turbo
pnpm test             # suite completa
pnpm typecheck        # verificação TypeScript
```

Registrar quaisquer falhas pré-existentes antes de prosseguir.

---

### Etapa 3 — Atualizar React para v19 (devDependencies)

```diff
 "devDependencies": {
-  "react": "^18.3.0",
-  "react-dom": "^18.3.0"
+  "react": "^19.0.0",
+  "react-dom": "^19.0.0"
 }
```

Rodar `pnpm install`, `pnpm build` e `pnpm test`. Esperado: warnings de `forwardRef` depreciado.

---

### Etapa 4 — Corrigir `forwardRef` nos 7 componentes afetados

Migrar `Button`, `Search`, `TextField`, `TextArea`, `FileUpload`, `SelectItem` e `SelectField` (deprecated) para aceitar `ref` como prop normal.

---

### Etapa 5 — Revisar testes

- Converter `act()` síncronos problemáticos para `await act(async () => {...})` no `VirtualKeyboard.test.tsx`.
- Revisar mocks que usam `cloneElement` com `ref` em `Select.test.tsx` e `Dialog.test.tsx`.

---

### Etapa 6 — Validação final

```bash
pnpm build            # deve rodar sem erros
pnpm test             # todos os testes devem passar
pnpm typecheck        # sem erros de tipo
pnpm storybook        # verificação visual manual
```

Testar `VirtualKeyboard` manualmente em Strict Mode para confirmar que o `MutationObserver` não duplica os ícones Fluent.
