---
tags: [documentação, testes, vitest, comandos]
aliases: [Guia de Testes, Comandos de Teste]
created: 2025-12-18
updated: 2025-12-18
---

# 🧪 Guia de Testes - Zanthus Design System

> [!info] Sobre este guia
> Este documento contém todos os comandos e instruções para executar testes no Zanthus Design System.

---

## 🛠️ Framework de Testes

O projeto utiliza **Vitest** como framework de testes, com suporte para:
- Testes unitários
- Testes de componentes React
- Cobertura de código (coverage)
- Interface gráfica para visualização de testes

---

## 📦 Pacote React - Comandos de Teste

### Executar Testes

#### **Da raiz do projeto** (Recomendado)

```bash
# Executar testes no modo watch (reexecuta quando arquivos mudam)
pnpm --filter @giro-ds/react test

# Forma curta
pnpm -F @giro-ds/react test
```

#### **Dentro do pacote** (packages/react)

```bash
# Navegar até o pacote
cd packages/react

# Executar testes
pnpm test
```

---

### Executar Testes com Interface Gráfica

```bash
# Da raiz do projeto
pnpm --filter @giro-ds/react test:ui

# Dentro do pacote
cd packages/react
pnpm test:ui
```

> [!tip] Interface Gráfica
> A UI do Vitest abre no navegador e permite visualizar os testes de forma interativa, ver resultados, e executar testes específicos.

---

### Gerar Relatório de Cobertura

#### **Da raiz do projeto** (Recomendado)

```bash
# Executar testes com cobertura
pnpm --filter @giro-ds/react test:coverage

# Forma curta
pnpm -F @giro-ds/react test:coverage
```

#### **Dentro do pacote** (packages/react)

```bash
# Navegar até o pacote
cd packages/react

# Executar com cobertura
pnpm test:coverage
```

> [!info] Relatório de Cobertura
> O relatório é gerado em `packages/react/coverage/index.html` e pode ser visualizado no navegador.

---

### Usando turbo (Executar testes em múltiplos pacotes)

```bash
# Da raiz do projeto - executa testes em todos os pacotes que têm script "test"
pnpm test
```

Este comando usa o Turbo e executa testes em paralelo em todos os workspaces configurados.

---

## 📊 Visualizar Relatório de Cobertura

Após executar `test:coverage`, abra o relatório:

### No Windows (PowerShell)

```powershell
# Abrir relatório no navegador padrão
Start-Process "packages\react\coverage\index.html"
```

### No Windows (CMD)

```cmd
start packages\react\coverage\index.html
```

### Manualmente

1. Navegue até: `packages/react/coverage/`
2. Abra o arquivo `index.html` no navegador

---

## 🎯 Executar Testes Específicos

### Executar um arquivo de teste específico

```bash
# Da raiz
pnpm --filter @giro-ds/react test src/components/Button/Button.test.tsx

# Dentro do pacote
pnpm test src/components/Button/Button.test.tsx
```

### Executar testes que correspondem a um padrão

```bash
# Testes que incluem "Button" no nome
pnpm --filter @giro-ds/react test Button

# Testes de um diretório específico
pnpm --filter @giro-ds/react test components/
```

---

## 🔍 Opções Úteis do Vitest

### Modo Watch (padrão)

```bash
pnpm --filter @giro-ds/react test
```

No modo watch, os testes são reexecutados automaticamente quando arquivos mudam.

### Executar uma única vez (run mode)

```bash
pnpm --filter @giro-ds/react test --run
```

### Modo silencioso (menos output)

```bash
pnpm --filter @giro-ds/react test --silent
```

### Ver apenas testes que falharam

```bash
pnpm --filter @giro-ds/react test --reporter=verbose
```

---

## 📝 Estrutura de Testes

Os testes ficam organizados junto aos componentes:

```
packages/react/src/
  components/
    Button/
      Button.tsx
      Button.test.tsx          # Testes do componente
      Button.module.scss
    TextField/
      TextField.tsx
      TextField.test.tsx        # Testes do componente
      TextField.module.scss
```

---

## 🔧 Configuração de Testes

### Arquivos de Configuração

- **`vitest.config.ts`** - Configuração principal do Vitest
- **`vitest.setup.ts`** - Setup global dos testes (ex: setup do Testing Library)

### Dependências de Teste

Instaladas como `devDependencies` no [packages/react/package.json](../packages/react/package.json):

- `vitest` - Framework de testes
- `@vitest/ui` - Interface gráfica
- `@vitest/coverage-v8` - Gerador de cobertura
- `@testing-library/react` - Utilitários para testar React
- `@testing-library/jest-dom` - Matchers customizados
- `@testing-library/user-event` - Simular interações do usuário
- `jsdom` - Ambiente DOM para testes

---

## 🚀 Quick Reference

| Comando | Descrição |
|---------|-----------|
| `pnpm -F @giro-ds/react test` | Executar testes no modo watch |
| `pnpm -F @giro-ds/react test:ui` | Abrir interface gráfica |
| `pnpm -F @giro-ds/react test:coverage` | Gerar relatório de cobertura |
| `pnpm -F @giro-ds/react test --run` | Executar testes uma única vez |
| `pnpm test` | Executar testes em todos os pacotes (turbo) |

---

## 📚 Links Úteis

- [Documentação do Vitest](https://vitest.dev/)
- [Testing Library - React](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

---

## 💡 Dicas

> [!tip] Performance
> Use `--filter` ao executar comandos da raiz para rodar apenas o pacote necessário e economizar tempo.

> [!tip] Debugging
> Use `test:ui` para facilitar o debugging visual dos testes.

> [!warning] Cobertura
> O relatório de cobertura é sobrescrito a cada execução. Se precisar comparar, faça backup da pasta `coverage/`.
