import { z } from 'zod';
import type { ToolResult } from '../types.js';
import { COMPONENTS } from '../data/react/components.js';
import { TOKENS, TOKEN_CATEGORIES } from '../data/react/tokens.js';
import { MIGRATION_GUIDE, DEPRECATED_PROPS } from '../data/react/migration.js';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const migrationGuideSchema = {};

export const changelogSchema = {
  component: z
    .string()
    .optional()
    .describe(
      'Filter by component name (e.g. "Dialog", "Avatar"). Omit to get all.',
    ),
};

export const systemPromptSchema = {
  format: z
    .enum(['full', 'compact'])
    .optional()
    .describe(
      '"full" includes all props; "compact" includes only required props. Default: "compact"',
    ),
};

// ── Handlers ─────────────────────────────────────────────────────────────────

export async function handleMigrationGuide(): Promise<ToolResult> {
  return { content: [{ type: 'text', text: MIGRATION_GUIDE }] };
}

export async function handleChangelog({
  component,
}: {
  component?: string;
}): Promise<ToolResult> {
  const entries = component
    ? DEPRECATED_PROPS.filter(
        (d) => d.component.toLowerCase() === component.toLowerCase(),
      )
    : DEPRECATED_PROPS;

  if (entries.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: component
            ? `No deprecations found for "${component}". Components with known deprecations: ${[
                ...new Set(DEPRECATED_PROPS.map((d) => d.component)),
              ].join(', ')}`
            : 'No deprecation data available.',
        },
      ],
    };
  }

  const rows = entries
    .map((d) => {
      const removed = d.removedIn ? ` — **removed in ${d.removedIn}**` : '';
      const replacement = d.replacement ? `\n  → Replace with: \`${d.replacement}\`` : '';
      return `### ${d.component}: \`${d.prop}\`\nDeprecated since **${d.since}**${removed}\n${d.note}${replacement}`;
    })
    .join('\n\n');

  return {
    content: [
      {
        type: 'text',
        text: `# Giro DS Deprecated APIs (${entries.length})\n\n${rows}\n\nFor full migration steps, use \`giro-migration-guide\`.`,
      },
    ],
  };
}

export async function handleSystemPrompt({
  format = 'compact',
}: {
  format?: 'full' | 'compact';
}): Promise<ToolResult> {
  const componentSummaries = COMPONENTS.map((c) => {
    const props =
      format === 'full'
        ? c.props
        : c.props.filter((p) => p.required || p.defaultValue);

    const propList = props
      .map((p) => {
        const dep = p.deprecated ? ` [DEPRECATED since ${p.deprecated}]` : '';
        const def = p.defaultValue ? ` = ${p.defaultValue}` : '';
        return `  ${p.name}${p.required ? '' : '?'}: ${p.type}${def}${dep}`;
      })
      .join('\n');

    const deprecated = c.props.filter((p) => p.deprecated);
    const deprecatedNote = deprecated.length
      ? `\n  // Deprecated: ${deprecated.map((p) => `${p.name} (${p.deprecated})`).join(', ')}`
      : '';

    return `### ${c.name}\n${c.description}\n\`\`\`tsx\n<${c.name}\n${propList}\n/>${deprecatedNote}\n\`\`\``;
  }).join('\n\n');

  const tokenSummary = TOKEN_CATEGORIES.map((cat) => {
    const catTokens = TOKENS.filter((t) => t.category === cat).slice(0, 6);
    const hasMore = TOKENS.filter((t) => t.category === cat).length > 6;
    return `**${cat}**: ${catTokens.map((t) => `\`${t.name}\``).join(', ')}${hasMore ? ', ...' : ''}`;
  }).join('\n');

  const prompt = `You are working with @giro-ds/react — a React design system.
IMPORTANT: Only use components and props documented below. Do not invent props or components.

## Available Components (${COMPONENTS.length})

${componentSummaries}

## Design Tokens

Always use CSS variables instead of hardcoded values.
${tokenSummary}

Usage: \`style={{ color: 'var(--color-brand-primary-default)' }}\` or className with token variables.

## Rules
- Import from \`@giro-ds/react\`: \`import { Button, TextField } from '@giro-ds/react'\`
- Import tokens from \`@giro-ds/tokens\`
- Never use props marked as DEPRECATED
- Prefer token variables over hardcoded hex/px values
`;

  return { content: [{ type: 'text', text: prompt }] };
}
