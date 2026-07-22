import { z } from 'zod';
import type { ToolResult } from '../types.js';
import { TOKENS, TOKEN_CATEGORIES } from '../data/react/tokens.js';
import { formatTokensGrouped } from '../lib/formatter.js';
import { scoreTokensByIntent } from '../lib/scorer.js';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const listTokensSchema = {
  category: z
    .string()
    .optional()
    .describe(`Filter by category. Available: ${TOKEN_CATEGORIES.join(', ')}`),
  query: z
    .string()
    .optional()
    .describe('Filter tokens by name substring (e.g. "color-brand", "spacing")'),
  limit: z.number().optional().describe('Limit number of results'),
};

export const resolveTokenSchema = {
  intent: z
    .string()
    .describe(
      'Natural language description of the token you need, in PT-BR or EN (e.g. "primary color", "large spacing", "success background", "border radius pill")',
    ),
};

// ── Handlers ─────────────────────────────────────────────────────────────────

export async function handleListTokens({
  category,
  query,
  limit,
}: {
  category?: string;
  query?: string;
  limit?: number;
}): Promise<ToolResult> {
  let results = TOKENS;

  if (category) results = results.filter((t) => t.category === category);
  if (query) results = results.filter((t) => t.name.includes(query));
  if (limit) results = results.slice(0, limit);

  const text = formatTokensGrouped(results);

  return {
    content: [
      {
        type: 'text',
        text: `# Giro DS Design Tokens (${results.length} results)\n\nUsage: \`var(--token-name)\` in CSS or inline styles.\n\n${text}`,
      },
    ],
  };
}

export async function handleResolveToken({
  intent,
}: {
  intent: string;
}): Promise<ToolResult> {
  const scored = scoreTokensByIntent(TOKENS, intent, 10);

  if (scored.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No tokens found for intent "${intent}".\n\nTry describing it differently (e.g. "cor primária", "espaçamento grande", "border radius").\n\nAvailable categories: ${TOKEN_CATEGORIES.join(', ')}`,
        },
      ],
    };
  }

  const rows = scored
    .map(({ token: t }) => `| \`${t.name}\` | \`${t.value}\` | ${t.category} |`)
    .join('\n');

  return {
    content: [
      {
        type: 'text',
        text: `# Tokens for "${intent}"\n\n| Token | Value | Category |\n|-------|-------|----------|\n${rows}\n\nUsage in CSS:\n\`\`\`css\nproperty: var(${scored[0].token.name});\n\`\`\``,
      },
    ],
  };
}
