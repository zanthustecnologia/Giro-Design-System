#!/usr/bin/env node
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Read version from package.json at runtime so it can never drift from the published version.
const { version } = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8'),
) as { version: string };

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
import { withUsageLogging } from './telemetry.js';

// ── Server ───────────────────────────────────────────────────────────────────
const server = new McpServer({
  name: 'giro-ds',
  version,
});

// ── Components ───────────────────────────────────────────────────────────────
server.tool(
  'list-giro-components',
  'Get a list of all public @giro-ds/react component names.',
  listComponentsSchema,
  withUsageLogging('list-giro-components', handleListComponents),
);

server.tool(
  'get-giro-component-metadata',
  'Returns props, types, descriptions and usage examples for a specific Giro DS component (or all components if no name is provided).',
  getMetadataSchema,
  withUsageLogging('get-giro-component-metadata', handleGetMetadata),
);

server.tool(
  'get-giro-component-examples',
  'Returns React usage examples for Giro DS components. Specify a component name or omit to get all.',
  getExamplesSchema,
  withUsageLogging('get-giro-component-examples', handleGetExamples),
);

server.tool(
  'find-giro-component',
  'Find Giro DS components that match a semantic query (e.g. "input de texto", "notificação", "selecionar opção"). Returns ranked matches with descriptions.',
  findComponentSchema,
  withUsageLogging('find-giro-component', handleFindComponent),
);

// ── Tokens ───────────────────────────────────────────────────────────────────
server.tool(
  'list-giro-tokens',
  'Get all Giro DS design tokens from @giro-ds/tokens. Supports filtering by category or text query.',
  listTokensSchema,
  withUsageLogging('list-giro-tokens', handleListTokens),
);

server.tool(
  'resolve-giro-token',
  'Resolve the best Giro DS design token for a given intent (e.g. "cor de erro", "espaçamento entre cards", "raio de borda de botão"). Returns matching tokens with values and CSS usage.',
  resolveTokenSchema,
  withUsageLogging('resolve-giro-token', handleResolveToken),
);

// ── Review ───────────────────────────────────────────────────────────────────
server.tool(
  'review-giro-usage',
  'Diagnoses a JSX/TSX code snippet for Giro DS usage issues: unknown props, deprecated patterns, missing required props, and style suggestions.',
  reviewUsageSchema,
  withUsageLogging('review-giro-usage', handleReviewUsage),
);

server.tool(
  'review-giro-css',
  'Audits CSS, SCSS, or inline style objects for hardcoded values that should be Giro DS design tokens (colors, spacing, border-radius, typography). Returns token suggestions for each match.',
  reviewCssSchema,
  withUsageLogging('review-giro-css', handleReviewCss),
);

server.tool(
  'review-giro-file',
  'Reads a .tsx/.jsx/.ts/.js/.css/.scss file, detects all Giro DS issues (invalid props, missing required props, hardcoded CSS values, deprecated patterns) and returns a corrected version of the file with safe auto-fixes applied.',
  reviewFileSchema,
  withUsageLogging('review-giro-file', handleReviewFile),
);

// ── Generation ───────────────────────────────────────────────────────────────
server.tool(
  'generate-giro-component',
  'Generates a ready-to-use JSX/TSX snippet using Giro DS components based on a natural language description. Examples: "formulário de login", "tabela de usuários com paginação", "modal de confirmação de exclusão".',
  generateComponentSchema,
  withUsageLogging('generate-giro-component', handleGenerateComponent),
);

// ── System ───────────────────────────────────────────────────────────────────
server.tool(
  'giro-migration-guide',
  'Returns the Giro DS migration guide for upgrading between major versions (v2→v3→v4), including breaking changes and code examples.',
  migrationGuideSchema,
  withUsageLogging('giro-migration-guide', handleMigrationGuide),
);

server.tool(
  'get-giro-changelog',
  'Returns a structured list of deprecated props and removed APIs in Giro DS, with replacement suggestions. Useful for auditing code during version upgrades.',
  changelogSchema,
  withUsageLogging('get-giro-changelog', handleChangelog),
);

server.tool(
  'get-giro-system-prompt',
  'Returns a ready-to-use system prompt that makes any AI assistant aware of the Giro DS component API. Paste it into ChatGPT, Claude, Cursor Rules, or any AI tool.',
  systemPromptSchema,
  withUsageLogging('get-giro-system-prompt', handleSystemPrompt),
);

// ── Start ────────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);