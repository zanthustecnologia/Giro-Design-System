# Arquitetura do `@giro-ds/mcp`

## O que é este pacote

O `@giro-ds/mcp` é o servidor MCP (Model Context Protocol) do Giro Design System. Ele expõe o conhecimento do design system para ferramentas de IA (GitHub Copilot, Claude, Cursor, ChatGPT) via protocolo padronizado.

O servidor roda como um processo Node.js via stdio e é declarado no `.vscode/mcp.json` do monorepo. Ao iniciar o VS Code, o Copilot Chat o detecta automaticamente e passa a ter acesso a todos os dados do design system.

---

## Stack

| Tecnologia | Versão | Papel |
| ----------- | ------ | ------- |
| TypeScript | ^5.7.3 | Linguagem principal |
| `@modelcontextprotocol/sdk` | ^1.28.0 | Protocolo MCP (McpServer, StdioServerTransport) |
| `ts-morph` | ^27.0.2 | Extração de props dos arquivos `.types.ts` do React |
| `zod` | ^4.3.6 | Validação dos parâmetros das tools |
| `tsx` | ^4.21.0 | Execução dos scripts de extração em desenvolvimento |

**Configuração TypeScript:** `module: Node16`, `moduleResolution: Node16`, `outDir: dist`, `rootDir: src`, `strict: true`. Todos os imports usam extensão `.js`.

---

## Estrutura de pastas atual

```text
packages/mcp/
  src/
    index.ts              ← Entrypoint thin: só registra as 13 tools
    types.ts              ← Contratos internos: ComponentProp, ComponentMetadata,
                            DesignToken, ToolResult
    postinstall.ts        ← Cria .vscode/mcp.json no projeto consumidor
    lib/
      scorer.ts           ← Lógica de scoring para busca semântica de componentes
                            e resolução de tokens por intenção
      formatter.ts        ← Serialização markdown compartilhada entre tools
    tools/
      components.ts       ← Handlers: list-giro-components, get-giro-component-metadata,
                            get-giro-component-examples, find-giro-component
      tokens.ts           ← Handlers: list-giro-tokens, resolve-giro-token
      review.ts           ← Handlers: review-giro-usage, review-giro-css, review-giro-file
      generation.ts       ← Handler: generate-giro-component
      system.ts           ← Handlers: giro-migration-guide, get-giro-changelog,
                            get-giro-system-prompt
    data/
      react/
        components.ts     ← Barrel: merge de gerado + estático, exporta COMPONENTS
                            e COMPONENT_NAMES
        tokens.ts         ← Barrel: re-exporta TOKENS e TOKEN_CATEGORIES
        migration.ts      ← Barrel: re-exporta MIGRATION_GUIDE e DEPRECATED_PROPS
      components.ts       ← Dados estáticos manuais (usado para Button e fallbacks)
      components.generated.ts  ← AUTO-GERADO por scripts/extract-react.ts
      tokens.ts           ← Merge de gerado + overrides manuais
      tokens.generated.ts ← AUTO-GERADO por scripts/extract-tokens.ts
      migration.ts        ← Guia de migração v2→v3→v4 e lista de deprecações
  scripts/
    extract-react.ts      ← Extrai props dos .types.ts do React via ts-morph
                            → gera src/data/components.generated.ts
    extract-tokens.ts     ← Extrai tokens do CSS em packages/tokens/build/
                            → gera src/data/tokens.generated.ts
  dist/                   ← Build compilado (não versionar, exceto no npm publish)
  ARCHITECTURE.md         ← Este arquivo
  package.json
  tsconfig.json
```

---

## Fluxo de dados

```text
packages/react/src/components/**/*.types.ts
        ↓ scripts/extract-react.ts (ts-morph)
src/data/components.generated.ts

packages/tokens/build/css/tokens.css
        ↓ scripts/extract-tokens.ts (regex)
src/data/tokens.generated.ts

src/data/components.ts (manual, fallbacks)
src/data/migration.ts (manual, guia de migração)
        ↓
src/data/react/components.ts (merge: generated > static)
src/data/react/tokens.ts
src/data/react/migration.ts
        ↓
src/tools/*.ts (handlers com lógica de cada tool)
src/lib/scorer.ts (scoring compartilhado)
src/lib/formatter.ts (formatação markdown)
        ↓
src/index.ts (registro das tools no McpServer)
        ↓
dist/index.js (executável publicado no npm)
```

---

## As 13 tools expostas

| Tool | Arquivo handler | Descrição |
| ------ | ---------------- | ----------- |
| `list-giro-components` | `tools/components.ts` | Lista todos os 30 componentes React |
| `get-giro-component-metadata` | `tools/components.ts` | Props, tipos e exemplos de um componente |
| `get-giro-component-examples` | `tools/components.ts` | Exemplos de uso de um componente |
| `find-giro-component` | `tools/components.ts` | Busca semântica por componente |
| `list-giro-tokens` | `tools/tokens.ts` | Lista tokens com filtro por categoria/query |
| `resolve-giro-token` | `tools/tokens.ts` | Encontra o token ideal para uma intenção |
| `review-giro-usage` | `tools/review.ts` | Diagnostica props erradas em JSX/TSX |
| `review-giro-css` | `tools/review.ts` | Audita valores hardcoded no CSS |
| `review-giro-file` | `tools/review.ts` | Lê um arquivo do disco, aplica auto-fix de props depreciadas e reporta o que resta |
| `generate-giro-component` | `tools/generation.ts` | Gera snippets JSX a partir de descrição |
| `giro-migration-guide` | `tools/system.ts` | Guia v2→v3→v4 |
| `get-giro-changelog` | `tools/system.ts` | Lista props depreciadas |
| `get-giro-system-prompt` | `tools/system.ts` | System prompt completo do design system |

---

## Como adicionar um componente manualmente

1. Abrir `src/data/components.ts`
2. Adicionar uma entrada `ComponentMetadata` ao array `COMPONENTS`
3. Rodar `pnpm --filter @giro-ds/mcp build`

O dado manual é usado **apenas** se não houver entrada gerada com o mesmo nome. O dado gerado sempre tem precedência.

---

## Como regenerar os dados automaticamente

```bash
# Extrair props de packages/react/src/components/**/*.types.ts
pnpm --filter @giro-ds/mcp generate

# Extrair tokens de packages/tokens/build/css/tokens.css
pnpm --filter @giro-ds/mcp generate:tokens

# Compilar
pnpm --filter @giro-ds/mcp build
```

O script `extract-react.ts` usa ts-morph para:

1. Localizar o arquivo `*.types.ts` de cada componente em `packages/react/src/components/`
2. Encontrar a interface `ComponentNameProps` (ou type alias que aponta para ela)
3. Extrair todas as props com JSDoc — incluindo props herdadas de interfaces no mesmo arquivo
4. Exportar para `src/data/components.generated.ts`

**Comportamento especial:**

- Button não é gerado automaticamente (seu `ButtonProps` é uma union type complexa). O fallback estático em `components.ts` é usado.
- `collectAllProperties()` em `extract-react.ts` resolve herança de interfaces **do mesmo arquivo** (ex: `TableV2Props extends EmptyStateProps`). Herança cross-file (ex: `ScalableProps` de `common.types.ts`) é ignorada intencionalmente para evitar poluição de props de bibliotecas externas.

---

## Como testar o MCP localmente

```bash
# Via MCP Inspector (abre UI de teste)
pnpm --filter @giro-ds/mcp inspect
# Ou via VS Code Task: Ctrl+Shift+P → "Tasks: Run Task" → "MCP: Inspect"
```

O Inspector abre em `http://localhost:6274`. Usar o VS Code Simple Browser para acessar (Kaspersky bloqueia SSE em browsers externos).

O servidor também é ativado automaticamente pelo Copilot Chat via `.vscode/mcp.json`.

---

## Publicação npm

```bash
# Versão está em package.json → "version"
cd packages/mcp
npm publish
```

O pacote é público (`"access": "public"`) em `registry.npmjs.org`. O campo `"files"` inclui apenas `dist/`.

---

## Plano de evolução

### Estado atual

O MCP é hoje um servidor React-centric com toda lógica já extraída em módulos (`lib/`, `tools/`). O `index.ts` é thin (138 linhas). Os dados React estão isolados em `data/react/`.

---

### Fase 3 — Modelo canônico (próxima)

**Objetivo:** criar entidades do design system independentes de plataforma.

**O que fazer:**

Criar `src/data/canonical/components.ts` mapeando os componentes para o tipo `CanonicalComponent`:

```typescript
// src/types.ts (adicionar após as fases anteriores)
export interface CanonicalComponent {
  name: string;
  description: string;
  category: 'action' | 'input' | 'feedback' | 'navigation' | 'layout' | 'display';
  platforms: {
    react?: import('./data/react/components.js').ReactComponentData;
    flutter?: FlutterComponentData;   // futuro
    compose?: ComposeComponentData;   // futuro
  };
}
```

Começar com os 10 componentes mais usados. Os outros 20 continuam funcionando via fallback `data/react/`.

Os handlers em `tools/components.ts` passam a consultar o canônico primeiro, com fallback para `data/react/`.

---

### Fase 4 — Parâmetro `platform`

**Pré-requisito:** `scripts/extract-flutter.ts` existir e funcionar.

**O que fazer:**

Adicionar `platform?: 'react' | 'flutter'` nas tools:

- `get-giro-component-metadata`
- `get-giro-component-examples`
- `generate-giro-component`
- `review-giro-usage`

Lógica no `lib/merger.ts`:

```typescript
// src/lib/merger.ts
export function resolveComponent(
  canonical: CanonicalComponent,
  platform: 'react' | 'flutter' | 'compose' = 'react',
): ComponentMetadata | null {
  const data = canonical.platforms[platform];
  if (!data) return null;
  return { name: canonical.name, description: canonical.description, ...data };
}
```

---

### Fase 5 — Recipes

**Decisão:** recipes são dados estáticos — arquivos TypeScript com snippets revisados e aprovados.

**Estrutura:**

```typescript
// src/data/recipes/forms.ts
export interface Recipe {
  id: string;
  title: string;
  description: string;
  components: string[];
  code: string;
  platform: 'react';
}

export const FORM_RECIPES: Recipe[] = [
  {
    id: 'login-form',
    title: 'Formulário de login',
    description: 'Email + senha + botão de entrar com validação',
    components: ['TextField', 'Button'],
    platform: 'react',
    code: `...`,
  },
  // ...
];
```

Nova tool: `get-giro-recipe(query?)`.

Começar com 5 recipes dos padrões mais usados. Expandir conforme demanda real da equipe.

---

### Fase 6 — Flutter como segundo adapter

**Pré-requisitos:**

- `packages/flutter/lib/components/` estar organizado com arquivos de tipos Dart legíveis
- Decidir a estratégia de extração: parser manual em TypeScript, Dart Analysis Server, ou JSON intermediário gerado por um script Dart

**O que fazer:**

1. Criar `scripts/extract-flutter.ts` — ler arquivos Dart e extrair props/exemplos
2. Gerar `src/data/flutter/components.generated.ts`
3. Mapear no modelo canônico: `platforms.flutter = { symbolName: 'GiroButton', props: [...] }`
4. Nenhuma nova tool necessária — as existentes já terão `platform` da Fase 4

**Nota:** a extração de Dart é o gargalo técnico desta fase. A arquitetura já está preparada — o que falta é o pipeline de extração.

---

### Critérios de sucesso

| Fase | Critério verificável |
| ------ | --------------------- |
| ✅ Fase 1 | `index.ts` < 60 linhas, lógica em `tools/` e `lib/` |
| ✅ Fase 2 | Dados React isolados em `data/react/` |
| Fase 3 | Modelo canônico com 30 componentes |
| Fase 4 | `platform` param funciona para React e Flutter |
| Fase 5 | 5+ recipes disponíveis via tool |
| Fase 6 | Flutter como adapter real |

---

## O que não mudar

- O `index.ts` deve continuar sendo o único entrypoint do servidor MCP
- Os nomes das 13 tools são estáveis — mudar nomes quebra integrações existentes
- O `postinstall.ts` não é tocado (cria `.vscode/mcp.json` no projeto consumidor)
- O `tsconfig.json` usa `rootDir: src` — scripts em `scripts/` são executados com `tsx`, não compilados pelo `tsc`
