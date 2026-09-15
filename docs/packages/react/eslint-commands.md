# 🔍 Guia de Comandos ESLint

> [!info] Sobre este guia
> Este documento contém todos os comandos e instruções para utilizar o ESLint no Giro Design System.

---

## 🛠️ Framework de Linting

O projeto utiliza **ESLint v9** (Flat Config) com suporte para:
- TypeScript
- React e React Hooks
- Acessibilidade (jsx-a11y)
- Import/Export organization
- Storybook

---

## 📦 Comandos Básicos

### Executar Lint no Projeto Inteiro

#### **Da raiz do projeto** (Recomendado)

```bash
# Executar lint em todos os pacotes
pnpm lint
```

> [!tip] Comando Global
> Este comando executa o lint em todos os pacotes configurados no Turborepo.

---

### Executar Lint com Correção Automática

```bash
# Corrigir automaticamente o que for possível
pnpm lint:fix
```

> [!warning] Atenção
> Nem todos os problemas podem ser corrigidos automaticamente. Erros de lógica, React Hooks condicionais e alguns problemas de acessibilidade precisam ser corrigidos manualmente.

---

### Executar Lint em Pacote Específico

```bash
# Lint no pacote React
pnpm lint --filter=@giro-ds/react

# Lint no Storybook
pnpm lint --filter=storybook-react

# Forma curta (React)
pnpm -F @giro-ds/react lint

# Forma curta (Storybook)
pnpm -F storybook-react lint
```

---

### Executar Lint Dentro do Pacote

```bash
# Navegar até o pacote
cd packages/react

# Executar lint
pnpm lint

# Executar lint com correção
pnpm lint:fix
```

---

## 🎯 Comandos Avançados

### Lint em Arquivo Específico

```bash
# Navegar até o pacote
cd packages/react

# Verificar um arquivo específico
npx eslint src/components/Button/Button.tsx

# Corrigir um arquivo específico
npx eslint src/components/Button/Button.tsx --fix
```

---

### Ver Apenas Erros (Sem Warnings)

```bash
# Mostrar apenas erros críticos
npx eslint . --quiet
```

> [!info] Modo Quiet
> Útil para CI/CD ou quando você quer focar apenas nos erros que impedem o build.

---

### Ver Output com Diferentes Formatos

```bash
# Formato padrão (stylish)
npx eslint . --format stylish

# Formato compacto (mais conciso)
npx eslint . --format compact

# Formato JSON (para CI/CD ou scripts)
npx eslint . --format json

# Formato HTML (gera relatório visual)
npx eslint . --format html --output-file report.html
```

---

### Verificar Padrão Específico de Arquivos

```bash
# Lint apenas em arquivos .tsx
npx eslint "src/**/*.tsx"

# Lint em componentes específicos
npx eslint "src/components/*/index.tsx"

# Lint em testes
npx eslint "**/__tests__/**/*.test.tsx"
```

---

### Depurar Configuração do ESLint

```bash
# Ver quais regras estão aplicadas a um arquivo
npx eslint --print-config src/components/Button/Button.tsx

# Ver se ESLint encontra o arquivo de configuração
npx eslint --debug src/components/Button/Button.tsx

# Modo verboso (mais informações)
npx eslint . --debug
```

---

### Gerenciar Cache do ESLint

```bash
# Usar cache para execução mais rápida
npx eslint . --cache

# Limpar cache (força revalidação)
npx eslint . --cache --cache-strategy content .

# Especificar local do cache
npx eslint . --cache --cache-location .eslintcache
```

---

### Especificar Arquivo de Configuração Customizado

```bash
# Usar configuração personalizada
npx eslint -c custom.config.mjs src/

# Ignorar arquivo de configuração
npx eslint --no-config-lookup src/
```

---

## 🔄 Workflow no Dia a Dia

### Antes de Commitar

```bash
# 1. Verificar todos os erros
pnpm lint

# 2. Corrigir automaticamente
pnpm lint:fix

# 3. Verificar se ainda há erros
pnpm lint --quiet

# 4. Commit apenas se não houver erros críticos
git add .
git commit -m "feat: add new component"
```

---

### Durante o Desenvolvimento

```bash
# 1. Criar novo componente
cd packages/react/src/components/NewComponent

# 2. Escrever código...

# 3. Verificar lint apenas neste arquivo
npx eslint NewComponent.tsx --fix

# 4. Verificar se está ok
npx eslint NewComponent.tsx
```

---

### Ao Revisar Pull Request

```bash
# 1. Checkout do branch
git checkout feature/new-component

# 2. Executar lint
pnpm lint

# 3. Ver apenas erros
pnpm lint --quiet

# 4. Gerar relatório HTML
cd packages/react
npx eslint . --format html --output-file ../../pr-lint-report.html
```

---

## 🎨 Integração com Editor

### VS Code

Instale a extensão oficial do ESLint:

```json
// .vscode/settings.json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

> [!tip] Auto-fix no Save
> Com esta configuração, o ESLint corrige automaticamente os problemas quando você salva o arquivo.

---

## 🚫 Desabilitar Regras (Quando Necessário)

### Desabilitar para Linha Específica

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = await fetchData()
```

### Desabilitar para Arquivo Inteiro

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// Todo o arquivo pode usar any
```

### Desabilitar para Bloco de Código

```typescript
/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {
  // Código sem validação de deps
}, [])
/* eslint-enable react-hooks/exhaustive-deps */
```

> [!warning] Use com Moderação
> Sempre adicione um comentário explicando **por que** você está desabilitando a regra.

---

## 📊 Usando com Turborepo

### Executar Lint em Paralelo

```bash
# Lint em todos os pacotes simultaneamente
turbo run lint

# Com filtro específico
turbo run lint --filter=@giro-ds/*
```

---

### Cache do Turborepo

```bash
# Limpar cache do Turbo (força re-lint)
turbo run lint --force

# Ver se está usando cache
turbo run lint --dry-run
```

---

## 🧹 Scripts de Manutenção

### Verificar Todo o Projeto

```bash
# Da raiz
pnpm lint

# Ver apenas erros críticos
pnpm lint | grep "error"

# Contar erros e warnings
pnpm lint 2>&1 | Select-String "problems" -Context 0,1
```

---

### Corrigir em Lote

```bash
# Corrigir tudo automaticamente
pnpm lint:fix

# Corrigir apenas um pacote
pnpm -F @giro-ds/react lint:fix
```

---

## 🆘 Troubleshooting

### "Module not found" ou "Cannot find plugin"

```bash
# Reinstalar dependências
pnpm install

# Limpar cache e reinstalar
rm -rf node_modules .pnpm-store
pnpm install
```

---

### ESLint não detecta mudanças

```bash
# Limpar cache do ESLint
rm -rf .eslintcache
npx eslint . --cache
```

---

### Conflito entre ESLint e Prettier

```bash
# Executar Prettier primeiro, depois ESLint
pnpm format
pnpm lint:fix
```

---

### Muitos Erros ao Rodar pela Primeira Vez

```bash
# 1. Ver apenas erros críticos
pnpm lint --quiet

# 2. Corrigir automaticamente
pnpm lint:fix

# 3. Focar nos erros restantes
pnpm lint --quiet
```

---

## 📝 Dicas e Boas Práticas

### ✅ DO's (Faça)

- ✅ Execute `pnpm lint` antes de commitar
- ✅ Use `lint:fix` para correções automáticas
- ✅ Configure seu editor para auto-fix no save
- ✅ Corrija warnings gradualmente
- ✅ Adicione comentários ao desabilitar regras

### ❌ DON'Ts (Não faça)

- ❌ Não ignore todos os erros com `.eslintignore`
- ❌ Não desabilite regras globalmente sem motivo
- ❌ Não commite código com erros de ESLint
- ❌ Não use `eslint-disable` sem explicação

---

## 🔗 Links Úteis

- [ESLint Official Docs](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

---

> [!success] Pronto!
> Agora você está pronto para usar o ESLint eficientemente no Giro Design System. 🚀
