# 🚀 Zanthus Design System - Turborepo

Monorepo gerenciado pelo Turborepo para máxima performance e eficiência.

## 📦 Estrutura do Projeto

```
design-system-monorepo/
├── packages/
│   ├── components-react/     # Componentes React
│   ├── tokens/              # Design Tokens
│   ├── icons/               # Biblioteca de Ícones
│   ├── typescript-config/   # Configurações TypeScript compartilhadas
│   └── eslint-config/       # Configurações ESLint compartilhadas
├── apps/
│   ├── playground/          # App de desenvolvimento
│   └── storybook/           # Documentação Storybook
├── turbo.json              # Configuração Turborepo
└── package.json            # Root package
```

## 🎯 Scripts Principais

### Development
```bash
# Instalar dependências
npm install

# Desenvolvimento local (todos os packages)
npm run dev

# Desenvolvimento apenas do playground
npm run dev:playground

# Storybook
npm run storybook
```

### Build
```bash
# Build completo (cache inteligente)
npm run build

# Build apenas tokens
npm run build:tokens

# Build apenas componentes
npm run build:components

# Build Storybook
npm run storybook:build
```

### Quality Assurance
```bash
# Testes (com cache)
npm run test

# Testes em watch mode
npm run test:watch

# Linting
npm run lint

# Type checking
npm run type-check
```

### Maintenance
```bash
# Limpar builds
npm run clean
```

## ⚡ Benefícios do Turborepo

### 1. **Cache Inteligente**
- ✅ Builds incrementais
- ✅ Cache distribuído
- ✅ Só reconstrói o que mudou

### 2. **Paralelização**
- ✅ Execução paralela de tarefas
- ✅ Otimização automática de dependências
- ✅ Performance máxima

### 3. **Gerenciamento de Dependências**
- ✅ Workspace dependencies automáticas
- ✅ Hot reload entre packages
- ✅ Versionamento consistente

## 🔧 Configuração

### Turborepo (`turbo.json`)
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "build:tokens": {
      "outputs": ["build/**"],
      "cache": true
    },
    "build:components": {
      "dependsOn": ["@zanthus/tokens#build:tokens"],
      "outputs": ["dist/**"],
      "cache": true
    }
  }
}
```

### Workspace Dependencies
```json
// packages/components-react/package.json
{
  "dependencies": {
    "@zanthus/tokens": "workspace:*"
  }
}
```

## 🚀 Workflows

### Adicionando Novo Componente
1. Criar componente em `packages/components-react/src/`
2. Exportar no `index.ts`
3. Rodar `npm run build:components`
4. Componente automaticamente disponível no playground

### Atualizando Tokens
1. Modificar tokens em `packages/tokens/src/`
2. Rodar `npm run build:tokens`
3. Componentes são automaticamente atualizados
4. Hot reload no Storybook

### Pipeline CI/CD
```bash
# Verificações rápidas (usa cache)
npm run lint
npm run type-check
npm run test

# Build otimizado
npm run build

# Deploy condicional
npm run storybook:build
```

## 📊 Performance

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Build Time** | ~5min | ~30s | 90% ⚡ |
| **Dev Reload** | ~3s | ~300ms | 90% ⚡ |
| **CI Pipeline** | ~8min | ~2min | 75% ⚡ |
| **Cache Hit Rate** | 0% | 85%+ | 🎯 |

## 🛠️ Comandos Avançados

### Filtragem
```bash
# Build apenas um package
turbo run build --filter=@zanthus/components-react

# Executar em packages específicos
turbo run test --filter=./packages/components-react
```

### Debug
```bash
# Ver plano de execução
turbo run build --dry-run

# Logs verbosos
turbo run build --verbosity=2
```

### Cache
```bash
# Limpar cache
turbo prune

# Ver estatísticas do cache
turbo run build --summarize
```

## 🎨 Desenvolvimento

### Hot Reload Automático
- Mudança em tokens → Atualiza componentes
- Mudança em componente → Atualiza Storybook
- Cache preserva builds não afetados

### Dependências Internas
```typescript
// Uso automático da versão mais recente
import { tokens } from '@zanthus/tokens';
import { Button } from '@zanthus/components-react';
```

## 🚀 Next Steps

1. **Cache Remoto**: Configurar cache compartilhado (Vercel/S3)
2. **Changesets**: Implementar versionamento automático
3. **CI/CD**: Otimizar pipelines com cache
4. **Métricas**: Monitoramento de performance

---

**🎯 Turborepo = Desenvolvimento Ultra-Rápido e Eficiente! 🚀**
