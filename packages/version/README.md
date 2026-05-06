# @giro-ds/version

Fonte única de verdade da versão do Giro Design System.

---

## Conceito

O Giro possui duas formas de versionamento com papéis distintos:

| Tipo | Exemplo | Responsável por |
|---|---|---|
| **Conceitual (nome)** | `Moholy-Nagy` | Linguagem visual, tokens, paradigma de interação |
| **Técnico (número)** | `4.0.0` | Estado do código, componentes, breaking changes |

### Formato oficial

```
Giro: Moholy-Nagy (v4.0.0)
```

O nome conceitual muda **raramente** — apenas quando há uma mudança estrutural no sistema (nova linguagem visual, mudança forte de tokens, mudança de paradigma de interação). O número técnico muda continuamente via Changesets a cada release.

---

## O que este pacote exporta

```ts
import { giroVersion, formatGiroVersion } from '@giro-ds/version';

giroVersion.system      // "Giro"
giroVersion.conceptual  // "Moholy-Nagy"
giroVersion.packages.react      // "4.0.0"
giroVersion.packages.tokens     // "1.0.1"
giroVersion.packages.utilities  // "1.1.0"
giroVersion.packages.mcp        // "1.0.0"

formatGiroVersion() // "Giro: Moholy-Nagy (v4.0.0)"
```

`formatGiroVersion()` usa `packages.react` como versão canônica de display, pois `@giro-ds/react` é o pacote de identidade pública do sistema.

---

## Estrutura do pacote

```
packages/version/
├── scripts/
│   └── generate.ts        # Lê os package.json e gera semver.ts
├── src/
│   ├── generated/
│   │   └── semver.ts      # AUTO-GERADO — não editar manualmente
│   └── index.ts           # API pública
└── package.json
```

---

## Como funciona a automação

O arquivo `src/generated/semver.ts` é gerado automaticamente pelo script `scripts/generate.ts`, que lê os `package.json` de cada pacote do monorepo:

```
@giro-ds/react      → packages/react/package.json
@giro-ds/tokens     → packages/tokens/package.json
@giro-ds/utilities  → packages/utilities/package.json
@giro-ds/mcp        → packages/mcp/package.json
```

Ninguém precisa atualizar versão manualmente no código.

---

## Fluxo de release

```bash
# 1. Develop normalmente e crie um changeset
pnpm changeset

# 2. Aplique as versões (atualiza os package.json dos pacotes)
pnpm changeset:version

# 3. Regenere o semver.ts com as versões atualizadas
pnpm --filter @giro-ds/version generate

# 4. Build e publish
pnpm build
pnpm changeset:publish
```

---

## Quando mudar o nome conceitual

O nome (`Moholy-Nagy`) deve mudar **somente** quando houver:

- Nova linguagem visual do sistema
- Mudança estrutural forte nos tokens de design
- Mudança de paradigma de interação

**Não muda** para: novos componentes, ajustes visuais, correções ou melhorias incrementais.

Para alterar, edite a propriedade `conceptual` em `src/index.ts`.

---

## Onde é usado

- **Storybook** — `brandTitle` do tema exibe `formatGiroVersion()`
- **Código** — qualquer parte do sistema pode importar `giroVersion` para logs, debug, suporte e QA
