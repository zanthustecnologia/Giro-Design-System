#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// ── Tool handlers ────────────────────────────────────────────────────────────
import {
  listComponentsSchema,
  getMetadataSchema,
  getExamplesSchema,
  findComponentSchema,
  handleListComponents,
  handleGetMetadata,
  handleGetExamples,
  handleFindComponent,
} from './tools/components.js';
import {
  listTokensSchema,
  resolveTokenSchema,
  handleListTokens,
  handleResolveToken,
} from './tools/tokens.js';
import {
  reviewUsageSchema,
  reviewCssSchema,
  reviewFileSchema,
  handleReviewUsage,
  handleReviewCss,
  handleReviewFile,
} from './tools/review.js';
import {
  generateComponentSchema,
  handleGenerateComponent,
} from './tools/generation.js';
import {
  migrationGuideSchema,
  changelogSchema,
  systemPromptSchema,
  handleMigrationGuide,
  handleChangelog,
  handleSystemPrompt,
} from './tools/system.js';

// ── Server ───────────────────────────────────────────────────────────────────
const server = new McpServer({
  name: 'giro-ds',
  version: '1.1.0',
});

// ── Components ───────────────────────────────────────────────────────────────
server.tool(
  'list-giro-components',
  'Get a list of all public @giro-ds/react component names.',
  listComponentsSchema,
  handleListComponents,
);

server.tool(
  'get-giro-component-metadata',
  'Returns props, types, descriptions and usage examples for a specific Giro DS component (or all components if no name is provided).',
  getMetadataSchema,
  handleGetMetadata,
);

server.tool(
  'get-giro-component-examples',
  'Returns React usage examples for Giro DS components. Specify a component name or omit to get all.',
  getExamplesSchema,
  handleGetExamples,
);

server.tool(
  'find-giro-component',
  'Find Giro DS components that match a semantic query (e.g. "input de texto", "notificação", "selecionar opção"). Returns ranked matches with descriptions.',
  findComponentSchema,
  handleFindComponent,
);

// ── Tokens ───────────────────────────────────────────────────────────────────
server.tool(
  'list-giro-tokens',
  'Get all Giro DS design tokens from @giro-ds/tokens. Supports filtering by category or text query.',
  listTokensSchema,
  handleListTokens,
);

server.tool(
  'resolve-giro-token',
  'Resolve the best Giro DS design token for a given intent (e.g. "cor de erro", "espaçamento entre cards", "raio de borda de botão"). Returns matching tokens with values and CSS usage.',
  resolveTokenSchema,
  handleResolveToken,
);

// ── Review ───────────────────────────────────────────────────────────────────
server.tool(
  'review-giro-usage',
  'Diagnoses a JSX/TSX code snippet for Giro DS usage issues: unknown props, deprecated patterns, missing required props, and style suggestions.',
  reviewUsageSchema,
  handleReviewUsage,
);

server.tool(
  'review-giro-css',
  'Audits CSS, SCSS, or inline style objects for hardcoded values that should be Giro DS design tokens (colors, spacing, border-radius, typography). Returns token suggestions for each match.',
  reviewCssSchema,
  handleReviewCss,
);

server.tool(
  'review-giro-file',
  'Reads a .tsx/.jsx/.ts/.js/.css/.scss file, detects all Giro DS issues (invalid props, missing required props, hardcoded CSS values, deprecated patterns) and returns a corrected version of the file with safe auto-fixes applied.',
  reviewFileSchema,
  handleReviewFile,
);

// ── Generation ───────────────────────────────────────────────────────────────
server.tool(
  'generate-giro-component',
  'Generates a ready-to-use JSX/TSX snippet using Giro DS components based on a natural language description. Examples: "formulário de login", "tabela de usuários com paginação", "modal de confirmação de exclusão".',
  generateComponentSchema,
  handleGenerateComponent,
);

// ── System ───────────────────────────────────────────────────────────────────
server.tool(
  'giro-migration-guide',
  'Returns the Giro DS migration guide for upgrading between major versions (v2→v3→v4), including breaking changes and code examples.',
  migrationGuideSchema,
  handleMigrationGuide,
);

server.tool(
  'get-giro-changelog',
  'Returns a structured list of deprecated props and removed APIs in Giro DS, with replacement suggestions. Useful for auditing code during version upgrades.',
  changelogSchema,
  handleChangelog,
);

server.tool(
  'get-giro-system-prompt',
  'Returns a ready-to-use system prompt that makes any AI assistant aware of the Giro DS component API. Paste it into ChatGPT, Claude, Cursor Rules, or any AI tool.',
  systemPromptSchema,
  handleSystemPrompt,
);

// ── Start ────────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);