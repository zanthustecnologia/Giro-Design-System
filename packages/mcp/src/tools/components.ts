import { z } from 'zod';
import type { ToolResult } from '../types.js';
import { COMPONENTS, COMPONENT_NAMES } from '../data/react/components.js';
import { formatComponentBlock } from '../lib/formatter.js';
import { scoreComponentsByQuery } from '../lib/scorer.js';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const listComponentsSchema = {};

export const getMetadataSchema = {
  name: z
    .string()
    .optional()
    .describe('Component name (e.g. "Button", "Drawer"). Omit to get all.'),
};

export const getExamplesSchema = {
  name: z.string().optional().describe('Component name. Omit to get all.'),
};

export const findComponentSchema = {
  query: z
    .string()
    .describe(
      'Natural language or keyword query in PT-BR or EN (e.g. "modal de confirmação", "dropdown", "botão com ícone")',
    ),
};

// ── Handlers ─────────────────────────────────────────────────────────────────

export async function handleListComponents(): Promise<ToolResult> {
  return {
    content: [
      {
        type: 'text',
        text: `# Giro DS Components (${COMPONENT_NAMES.length})\n\n${COMPONENT_NAMES.map((n) => `- ${n}`).join('\n')}\n\nUse \`get-giro-component-metadata\` passing the component name for full props and examples.`,
      },
    ],
  };
}

export async function handleGetMetadata({
  name,
}: {
  name?: string;
}): Promise<ToolResult> {
  const targets = name
    ? COMPONENTS.filter((c) => c.name.toLowerCase() === name.toLowerCase())
    : COMPONENTS;

  if (name && targets.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Component "${name}" not found. Available: ${COMPONENT_NAMES.join(', ')}`,
        },
      ],
    };
  }

  const text = targets.map(formatComponentBlock).join('\n\n---\n\n');
  return { content: [{ type: 'text', text }] };
}

export async function handleGetExamples({
  name,
}: {
  name?: string;
}): Promise<ToolResult> {
  const targets = name
    ? COMPONENTS.filter((c) => c.name.toLowerCase() === name.toLowerCase())
    : COMPONENTS;

  if (name && targets.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Component "${name}" not found. Available: ${COMPONENT_NAMES.join(', ')}`,
        },
      ],
    };
  }

  const text = targets
    .map((c) => {
      const examples = c.examples.map((e) => `\`\`\`tsx\n${e}\n\`\`\``).join('\n\n');
      return `## ${c.name}\n\n${examples}`;
    })
    .join('\n\n---\n\n');

  return { content: [{ type: 'text', text }] };
}

export async function handleFindComponent({
  query,
}: {
  query: string;
}): Promise<ToolResult> {
  const scored = scoreComponentsByQuery(COMPONENTS, query, 5);

  if (scored.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No components found for query "${query}".\n\nAvailable components: ${COMPONENT_NAMES.join(', ')}`,
        },
      ],
    };
  }

  const text = scored
    .map(
      ({ component: c, score }) =>
        `## ${c.name} (score: ${score})\n\n${c.description}\n\n**Props:** ${c.props.map((p) => `\`${p.name}\``).join(', ')}`,
    )
    .join('\n\n---\n\n');

  return {
    content: [
      {
        type: 'text',
        text: `# Components found for "${query}"\n\n${text}\n\nUse \`get-giro-component-metadata\` for full details.`,
      },
    ],
  };
}
