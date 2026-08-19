# @giro-ds/mcp

Model Context Protocol (MCP) server for Giro Design System — enables AI tools (GitHub Copilot, Cursor, Claude Desktop) to access component metadata, design tokens and migration guides directly.

## Tools

| Tool | Description |
| ------ | ------------- |
| `list-giro-components` | Lists all public `@giro-ds/react` component names |
| `get-giro-component-metadata` | Returns props, types, defaults and descriptions for a component |
| `get-giro-component-examples` | Returns React usage examples for components |
| `list-giro-tokens` | Lists all design tokens from `@giro-ds/tokens` with filtering support |
| `giro-migration-guide` | Returns the breaking changes and migration guide between major versions |
| `find-giro-component` | Semantic search for components by description in PT-BR or EN |
| `review-giro-usage` | Analyzes a JSX/TSX snippet for invalid props, missing required props and outdated patterns |
| `review-giro-css` | Audits CSS/SCSS or inline `style={{}}` for hardcoded values that should be tokens |
| `review-giro-file` | Reads a file from disk, auto-fixes safe deprecated-prop renames and reports remaining usage/CSS issues |
| `resolve-giro-token` | Returns the most suitable tokens for a design intent (e.g. `"error color"`, `"large spacing"`) |
| `generate-giro-component` | Generates a ready-to-use JSX/TSX snippet from a description in PT-BR or EN |
| `get-giro-system-prompt` | Returns a system prompt that makes any AI aware of Giro DS |
| `get-giro-changelog` | Lists deprecated APIs with version, affected prop and suggested replacement |

## Usage

### VS Code (GitHub Copilot)

When you install `@giro-ds/mcp` as a dependency, a `.vscode/mcp.json` is created automatically in your project root — no manual setup needed.

If you prefer to configure it manually, or if you're using `npx` (without installing).

**Manual configuration** — add to your `.vscode/mcp.json`:

```json
{
  "servers": {
    "giro-ds": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@giro-ds/mcp"]
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "giro-ds": {
      "command": "npx",
      "args": ["-y", "@giro-ds/mcp"]
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "giro-ds": {
      "command": "npx",
      "args": ["-y", "@giro-ds/mcp"]
    }
  }
}
```

### Local development (monorepo)

```json
{
  "servers": {
    "giro-ds": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/mcp/dist/index.js"]
    }
  }
}
```

## Tool Examples

### List all components

```text
list-giro-components
```

### Get Button metadata

```text
get-giro-component-metadata name="Button"
```

### Get Drawer examples

```text
get-giro-component-examples name="Drawer"
```

### Find a component by description

```text
find-giro-component query="modal de confirmação"
```

### List color tokens

```text
list-giro-tokens category="color-brand"
```

### List spacing tokens

```text
list-giro-tokens category="spacing"
```

### Resolve a token by design intent

```text
resolve-giro-token intent="cor de erro"
```

### Review a code snippet

```text
review-giro-usage code="<Button variant='ghost' size='xl'>Save</Button>"
```

### Audit CSS for hardcoded values

```text
review-giro-css code="color: #3b45f2; padding: 16px;"
```

### Review and auto-fix a file on disk

```text
review-giro-file filePath="src/components/LoginForm.tsx"
```

### Generate a component from a description

```text
generate-giro-component description="formulário de login com email, senha e botão de entrar"
```

### Get a system prompt for ChatGPT / Claude

```text
get-giro-system-prompt
```

### Get migration guide

```text
giro-migration-guide
```

### List deprecated APIs for a component

```text
get-giro-changelog component="Dialog"
```

## Development

### Generate component metadata

Component metadata is auto-generated from `*.types.ts` files in `@giro-ds/react` using `ts-morph`:

```bash
pnpm --filter @giro-ds/mcp generate
pnpm --filter @giro-ds/mcp build
```

### Generate token data

Token data is auto-generated from the `@giro-ds/tokens` CSS build output:

```bash
pnpm --filter @giro-ds/tokens build
pnpm --filter @giro-ds/mcp generate:tokens
pnpm --filter @giro-ds/mcp build
```

Run these commands whenever a component or token is added or changed.

O único passo manual necessário no futuro é rodar os scripts sempre que o pacote React ou os tokens evoluírem:

```bash
# Quando componentes mudarem
pnpm --filter @giro-ds/mcp generate

# Quando tokens mudarem (após build do @giro-ds/tokens)
pnpm --filter @giro-ds/mcp generate:tokens

# Após qualquer geração
pnpm --filter @giro-ds/mcp build
```
