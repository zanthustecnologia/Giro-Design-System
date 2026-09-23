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

### Automatic build and release

The MCP build now rebuilds tokens, regenerates component and token metadata,
runs the generator regression tests and compiles the server. For local changes,
run just:

```bash
pnpm --filter @giro-ds/mcp build
```

Restart your MCP client after building to load the new data.

For releases, keep creating changesets for React and tokens as usual. Use
`pnpm changeset:version` (or `pnpm release`): it automatically adds an MCP patch
when the release plan includes React or tokens and does not already include MCP.
An existing MCP minor or major release is preserved. `pnpm release` then builds,
validates and publishes through the existing Changesets publishing command.

Use the repository scripts: calling `pnpm exec changeset version` directly bypasses
the MCP synchronization step. A changeset is still required for the source package;
the automation does not infer releases from unversioned source edits.

Turbo tracks React sources and the tokens build so cached MCP data is invalidated
when either changes. The MCP does not depend on the React build, avoiding the
React → MCP → React cycle. Generation errors stop the build before publication.
Manually maintained migration guides and examples still require review.

Release regression tests: `pnpm test:release` (uses temporary Git repositories).
