#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { COMPONENTS as COMPONENTS_STATIC, COMPONENT_NAMES as COMPONENT_NAMES_STATIC } from './data/components.js';
import { COMPONENTS as COMPONENTS_GENERATED } from './data/components.generated.js';

// Merge: generated data takes precedence; static fills any gaps
const generatedNames = new Set(COMPONENTS_GENERATED.map((c) => c.name));
const COMPONENTS = [
  ...COMPONENTS_GENERATED,
  ...COMPONENTS_STATIC.filter((c) => !generatedNames.has(c.name)),
];
const COMPONENT_NAMES = COMPONENTS.map((c) => c.name).sort();
import { TOKENS, TOKEN_CATEGORIES } from './data/tokens.js';
import { MIGRATION_GUIDE, DEPRECATED_PROPS } from './data/migration.js';

const server = new McpServer({
  name: 'giro-ds',
  version: '1.0.0',
});

// ── Tool: list-giro-components ──────────────────────────────────────────────
server.tool(
  'list-giro-components',
  'Get a list of all public @giro-ds/react component names.',
  {},
  async () => ({
    content: [
      {
        type: 'text',
        text: `# Giro DS Components (${COMPONENT_NAMES.length})\n\n${COMPONENT_NAMES.map((n) => `- ${n}`).join('\n')}\n\nUse \`get-giro-component-metadata\` passing the component name for full props and examples.`,
      },
    ],
  })
);

// ── Tool: get-giro-component-metadata ──────────────────────────────────────
server.tool(
  'get-giro-component-metadata',
  'Returns props, types, descriptions and usage examples for a specific Giro DS component (or all components if no name is provided).',
  { name: z.string().optional().describe('Component name (e.g. "Button", "Drawer"). Omit to get all.') },
  async ({ name }) => {
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

    const text = targets.map((c) => {
      const propsTable = c.props
        .map(
          (p) =>
            `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✅ required' : 'optional'} | ${p.defaultValue ? `\`${p.defaultValue}\`` : '—'} | ${p.description} |`
        )
        .join('\n');

      const examples = c.examples.map((e) => `\`\`\`tsx\n${e}\n\`\`\``).join('\n\n');

      return `# ${c.name}

**Category:** ${c.category}

${c.description}

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
${propsTable}

## Examples

${examples}`;
    }).join('\n\n---\n\n');

    return { content: [{ type: 'text', text }] };
  }
);

// ── Tool: get-giro-component-examples ──────────────────────────────────────
server.tool(
  'get-giro-component-examples',
  'Returns React usage examples for Giro DS components. Specify a component name or omit to get all.',
  { name: z.string().optional().describe('Component name. Omit to get all.') },
  async ({ name }) => {
    const targets = name
      ? COMPONENTS.filter((c) => c.name.toLowerCase() === name.toLowerCase())
      : COMPONENTS;

    if (name && targets.length === 0) {
      return {
        content: [{ type: 'text', text: `Component "${name}" not found. Available: ${COMPONENT_NAMES.join(', ')}` }],
      };
    }

    const text = targets.map((c) => {
      const examples = c.examples.map((e) => `\`\`\`tsx\n${e}\n\`\`\``).join('\n\n');
      return `## ${c.name}\n\n${examples}`;
    }).join('\n\n---\n\n');

    return { content: [{ type: 'text', text }] };
  }
);

// ── Tool: list-giro-tokens ──────────────────────────────────────────────────
server.tool(
  'list-giro-tokens',
  'Get all Giro DS design tokens from @giro-ds/tokens. Supports filtering by category or text query.',
  {
    category: z.string().optional().describe(`Filter by category. Available: ${TOKEN_CATEGORIES.join(', ')}`),
    query: z.string().optional().describe('Filter tokens by name substring (e.g. "color-brand", "spacing")'),
    limit: z.number().optional().describe('Limit number of results'),
  },
  async ({ category, query, limit }) => {
    let results = TOKENS;

    if (category) {
      results = results.filter((t) => t.category === category);
    }
    if (query) {
      results = results.filter((t) => t.name.includes(query));
    }
    if (limit) {
      results = results.slice(0, limit);
    }

    const categorized = results.reduce<Record<string, typeof results>>((acc, t) => {
      if (!acc[t.category]) acc[t.category] = [];
      acc[t.category].push(t);
      return acc;
    }, {});

    const text = Object.entries(categorized).map(([cat, tokens]) => {
      const rows = tokens.map((t) => `| \`${t.name}\` | \`${t.value}\` |`).join('\n');
      return `## ${cat}\n\n| Token | Value |\n|-------|-------|\n${rows}`;
    }).join('\n\n---\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `# Giro DS Design Tokens (${results.length} results)\n\nUsage: \`var(--token-name)\` in CSS or inline styles.\n\n${text}`,
        },
      ],
    };
  }
);

// ── Tool: giro-migration-guide ──────────────────────────────────────────────
server.tool(
  'giro-migration-guide',
  'Returns the Giro DS migration guide for upgrading between major versions (v2→v3→v4), including breaking changes and code examples.',
  {},
  async () => ({
    content: [{ type: 'text', text: MIGRATION_GUIDE }],
  })
);

// ── Tool: get-giro-changelog ────────────────────────────────────────────────
server.tool(
  'get-giro-changelog',
  'Returns a structured list of deprecated props and removed APIs in Giro DS, with replacement suggestions. Useful for auditing code during version upgrades.',
  {
    component: z.string().optional().describe('Filter by component name (e.g. "Dialog", "Avatar"). Omit to get all.'),
  },
  async ({ component }) => {
    const entries = component
      ? DEPRECATED_PROPS.filter((d) => d.component.toLowerCase() === component.toLowerCase())
      : DEPRECATED_PROPS;

    if (entries.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: component
              ? `No deprecations found for "${component}". Components with known deprecations: ${[...new Set(DEPRECATED_PROPS.map((d) => d.component))].join(', ')}`
              : 'No deprecation data available.',
          },
        ],
      };
    }

    const rows = entries.map((d) => {
      const removed = d.removedIn ? ` — **removed in ${d.removedIn}**` : '';
      const replacement = d.replacement ? `\n  → Replace with: \`${d.replacement}\`` : '';
      return `### ${d.component}: \`${d.prop}\`\nDeprecated since **${d.since}**${removed}\n${d.note}${replacement}`;
    }).join('\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `# Giro DS Deprecated APIs (${entries.length})\n\n${rows}\n\nFor full migration steps, use \`giro-migration-guide\`.`,
        },
      ],
    };
  }
);

// ── Tool: find-giro-component ───────────────────────────────────────────────
server.tool(
  'find-giro-component',
  'Find Giro DS components that match a semantic query (e.g. "input de texto", "notificação", "selecionar opção"). Returns ranked matches with descriptions.',
  { query: z.string().describe('Natural language or keyword query in PT-BR or EN (e.g. "modal de confirmação", "dropdown", "botão com ícone")') },
  async ({ query }) => {
    const terms = query.toLowerCase().split(/\s+/);

    const scored = COMPONENTS.map((c) => {
      const haystack = [
        c.name,
        c.description,
        ...(c.keywords ?? []),
        ...c.props.map((p) => p.description),
      ]
        .join(' ')
        .toLowerCase();

      const score = terms.reduce((acc, term) => {
        if (c.name.toLowerCase().includes(term)) return acc + 3;
        if ((c.keywords ?? []).some((k) => k.includes(term))) return acc + 2;
        if (haystack.includes(term)) return acc + 1;
        return acc;
      }, 0);

      return { component: c, score };
    })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

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
          `## ${c.name} (score: ${score})\n\n${c.description}\n\n**Props:** ${c.props.map((p) => `\`${p.name}\``).join(', ')}`
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
);

// ── Tool: review-giro-usage ─────────────────────────────────────────────────
server.tool(
  'review-giro-usage',
  'Diagnoses a JSX/TSX code snippet for Giro DS usage issues: unknown props, deprecated patterns, missing required props, and style suggestions.',
  { code: z.string().describe('JSX/TSX code snippet that uses @giro-ds/react components') },
  async ({ code }) => {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Detect which components are used
    const usedComponents = COMPONENTS.filter((c) =>
      new RegExp(`<${c.name}[\\s/>]`).test(code)
    );

    if (usedComponents.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No Giro DS components detected in the provided code.\n\nAvailable components: ${COMPONENT_NAMES.join(', ')}`,
          },
        ],
      };
    }

    for (const c of usedComponents) {
      const knownPropNames = new Set(c.props.map((p) => p.name));
      const requiredProps = c.props.filter((p) => p.required);

      // Extract props used for this component from JSX
      const componentRegex = new RegExp(`<${c.name}([^>]*)`, 'g');
      const componentMatches = [...code.matchAll(componentRegex)];

      for (const match of componentMatches) {
        const propsStr = match[1] ?? '';

        // Find unknown props (not in metadata)
        const usedPropNames = [...propsStr.matchAll(/(\w+)=/g)].map((m) => m[1]);
        for (const propName of usedPropNames) {
          if (!knownPropNames.has(propName) && propName !== 'className' && propName !== 'style' && propName !== 'ref' && propName !== 'key') {
            issues.push(`❌ \`<${c.name}>\`: prop \`${propName}\` is not in the component API. Known props: ${[...knownPropNames].join(', ')}`);
          }
        }

        // Check required props
        for (const req of requiredProps) {
          if (!propsStr.includes(req.name)) {
            issues.push(`⚠️ \`<${c.name}>\`: required prop \`${req.name}\` (${req.type}) appears to be missing.`);
          }
        }
      }

      // Check for common anti-patterns
      if (c.name === 'Button' && /style=\{/.test(code)) {
        suggestions.push(`💡 \`<Button>\`: avoid inline \`style\` prop — use \`variant\`, \`size\`, and token-based className instead.`);
      }
      if (c.name === 'TextField' && /onChange.*setState/.test(code)) {
        suggestions.push(`💡 \`<TextField>\`: consider using \`useForm\` or controlled patterns recommended by the design system.`);
      }
    }

    const detectedList = usedComponents.map((c) => `- \`<${c.name}>\``).join('\n');
    const issueSection = issues.length > 0 ? `\n\n## Issues\n\n${issues.join('\n')}` : '\n\n## Issues\n\n✅ No issues found.';
    const suggestionSection = suggestions.length > 0 ? `\n\n## Suggestions\n\n${suggestions.join('\n')}` : '';

    return {
      content: [
        {
          type: 'text',
          text: `# Giro DS Usage Review\n\n**Detected components:**\n${detectedList}${issueSection}${suggestionSection}`,
        },
      ],
    };
  }
);

// ── Tool: resolve-giro-token ────────────────────────────────────────────────
server.tool(
  'resolve-giro-token',
  'Resolve the best Giro DS design token for a given intent (e.g. "cor de erro", "espaçamento entre cards", "raio de borda de botão"). Returns matching tokens with values and CSS usage.',
  { intent: z.string().describe('Natural language description of the token you need, in PT-BR or EN (e.g. "primary color", "large spacing", "success background", "border radius pill")') },
  async ({ intent }) => {
    const terms = intent.toLowerCase().split(/\s+/);

    // Intent keyword map to token name patterns
    const intentMap: Record<string, string[]> = {
      erro: ['alert'],
      error: ['alert'],
      alerta: ['alert'],
      sucesso: ['success'],
      success: ['success'],
      primário: ['primary'],
      primary: ['primary'],
      brand: ['brand', 'primary'],
      secundário: ['secondary'],
      secondary: ['secondary'],
      neutro: ['neutral'],
      neutral: ['neutral'],
      espaçamento: ['spacing'],
      spacing: ['spacing'],
      borda: ['border'],
      border: ['border'],
      raio: ['radius'],
      radius: ['radius'],
      pill: ['pill'],
      arredond: ['radius'],
      tipografia: ['font'],
      typography: ['font'],
      fonte: ['font'],
      weight: ['font-weight'],
      tamanho: ['font-size', 'spacing'],
      verde: ['secondary', 'success'],
      azul: ['primary', 'brand'],
      vermelho: ['alert'],
      fundo: ['high', 'light', 'background'],
      background: ['high', 'light'],
      texto: ['low', 'default'],
      text: ['low', 'default'],
      grande: ['64', '48', '32', 'lg'],
      pequeno: ['4', '8', 'sm'],
      médio: ['16', '24', 'md'],
    };

    const expandedTerms = new Set<string>(terms);
    for (const term of terms) {
      const mapped = intentMap[term];
      if (mapped) mapped.forEach((m) => expandedTerms.add(m));
    }

    const scored = TOKENS.map((t) => {
      const haystack = `${t.name} ${t.category} ${t.value}`.toLowerCase();
      const score = [...expandedTerms].reduce((acc, term) => {
        return haystack.includes(term) ? acc + 1 : acc;
      }, 0);
      return { token: t, score };
    })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

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
);

// ── Tool: get-giro-system-prompt ───────────────────────────────────────────
server.tool(
  'get-giro-system-prompt',
  'Returns a ready-to-use system prompt that makes any AI assistant aware of the Giro DS component API. Paste it into ChatGPT, Claude, Cursor Rules, or any AI tool.',
  {
    format: z.enum(['full', 'compact']).optional().describe('"full" includes all props; "compact" includes only required props. Default: "compact"'),
  },
  async ({ format = 'compact' }) => {
    const componentSummaries = COMPONENTS.map((c) => {
      const props = format === 'full'
        ? c.props
        : c.props.filter((p) => p.required || p.defaultValue);

      const propList = props.map((p) => {
        const dep = p.deprecated ? ` [DEPRECATED since ${p.deprecated}]` : '';
        const def = p.defaultValue ? ` = ${p.defaultValue}` : '';
        return `  ${p.name}${p.required ? '' : '?'}: ${p.type}${def}${dep}`;
      }).join('\n');

      const deprecated = c.props.filter((p) => p.deprecated);
      const deprecatedNote = deprecated.length
        ? `\n  // Deprecated: ${deprecated.map((p) => `${p.name} (${p.deprecated})`).join(', ')}`
        : '';

      return `### ${c.name}\n${c.description}\n\`\`\`tsx\n<${c.name}\n${propList}\n/>${deprecatedNote}\n\`\`\``;
    }).join('\n\n');

    const tokenSummary = TOKEN_CATEGORIES.map((cat) => {
      const catTokens = TOKENS.filter((t) => t.category === cat).slice(0, 6);
      return `**${cat}**: ${catTokens.map((t) => `\`${t.name}\``).join(', ')}${TOKENS.filter(t => t.category === cat).length > 6 ? ', ...' : ''}`;
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
);

// ── Tool: review-giro-css ───────────────────────────────────────────────────
server.tool(
  'review-giro-css',
  'Audits CSS, SCSS, or inline style objects for hardcoded values that should be Giro DS design tokens (colors, spacing, border-radius, typography). Returns token suggestions for each match.',
  { code: z.string().describe('CSS, SCSS, or JSX inline style snippet to audit') },
  async ({ code }) => {
    const issues: string[] = [];

    // Build reverse lookup: value → token
    const valueToToken = new Map<string, string>();
    for (const token of TOKENS) {
      valueToToken.set(token.value.toLowerCase(), token.name);
    }

    // Patterns to detect hardcoded values
    const patterns: Array<{ regex: RegExp; label: string }> = [
      { regex: /#([0-9a-fA-F]{3,8})\b/g, label: 'color' },
      { regex: /:\s*(rgb|rgba|hsl|hsla)\([^)]+\)/g, label: 'color' },
      { regex: /:\s*(\d+(?:\.\d+)?px)\b/g, label: 'px value' },
      { regex: /:\s*(\d+(?:\.\d+)?rem)\b/g, label: 'rem value' },
    ];

    for (const { regex, label } of patterns) {
      const matches = [...code.matchAll(regex)];
      for (const match of matches) {
        const raw = match[0].replace(/:\s*/, '').trim();
        const normalized = raw.toLowerCase();

        const exactToken = valueToToken.get(normalized);
        if (exactToken) {
          issues.push(`🔄 \`${raw}\` → use \`var(${exactToken})\``);
          continue;
        }

        // Fuzzy: find closest tokens in the same category
        if (label === 'color') {
          const colorTokens = TOKENS.filter((t) => t.category.startsWith('color')).slice(0, 3);
          const suggestions = colorTokens.map((t) => `\`var(${t.name})\``).join(', ');
          issues.push(`⚠️ Hardcoded ${label} \`${raw}\` — no exact token match. Nearest color tokens: ${suggestions}`);
        } else if (label === 'px value' || label === 'rem value') {
          const px = parseFloat(raw);
          const spacingTokens = TOKENS.filter((t) => t.category === 'spacing' && Math.abs(parseFloat(t.value) - px) <= 4);
          const radiusTokens = TOKENS.filter((t) => t.category === 'border-radius' && Math.abs(parseFloat(t.value) - px) <= 4);
          const candidates = [...spacingTokens, ...radiusTokens].map((t) => `\`var(${t.name})\` (${t.value})`);
          if (candidates.length) {
            issues.push(`⚠️ Hardcoded \`${raw}\` — consider: ${candidates.join(', ')}`);
          } else {
            issues.push(`⚠️ Hardcoded \`${raw}\` — no close spacing/radius token found. Check \`--spacing-*\` and \`--border-radius-*\``);
          }
        }
      }
    }

    if (issues.length === 0) {
      return {
        content: [{ type: 'text', text: '✅ No hardcoded values found. Code is using tokens correctly.' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `# Giro DS CSS Audit\n\n${issues.length} issue(s) found:\n\n${issues.join('\n')}\n\nReplace hardcoded values with \`var(--token-name)\` to stay consistent with the design system.`,
        },
      ],
    };
  }
);

// ── Tool: generate-giro-component ──────────────────────────────────────────
server.tool(
  'generate-giro-component',
  'Generates a ready-to-use JSX/TSX snippet using Giro DS components based on a natural language description. Examples: "formulário de login", "tabela de usuários com paginação", "modal de confirmação de exclusão".',
  {
    description: z.string().describe('What you want to build, in PT-BR or EN (e.g. "formulário de cadastro com nome, email e botão de salvar")'),
    language: z.enum(['tsx', 'jsx']).optional().describe('Output language. Default: "tsx"'),
  },
  async ({ description, language = 'tsx' }) => {
    const terms = description.toLowerCase().split(/\s+/);

    // Score components by relevance to the description
    const scored = COMPONENTS.map((c) => {
      const haystack = [c.name, c.description, ...(c.keywords ?? [])].join(' ').toLowerCase();
      const score = terms.reduce((acc, t) => haystack.includes(t) ? acc + 1 : acc, 0);
      return { component: c, score };
    })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    if (scored.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `Could not infer components from "${description}".\n\nTry being more specific, e.g. "formulário com TextField, Select e Button".\n\nAvailable: ${COMPONENT_NAMES.join(', ')}`,
          },
        ],
      };
    }

    const usedComponents = scored.map((s) => s.component);
    const importLine = `import { ${usedComponents.map((c) => c.name).join(', ')} } from '@giro-ds/react';`;

    // Build a JSX skeleton for each detected component
    const jsxBlocks = usedComponents.map((c) => {
      const requiredProps = c.props.filter((p) => p.required && !p.deprecated);
      const optionalSample = c.props.filter((p) => !p.required && p.defaultValue && !p.deprecated).slice(0, 2);
      const allSampleProps = [...requiredProps, ...optionalSample];

      const propsStr = allSampleProps.map((p) => {
        if (p.type === 'string') return `${p.name}=""`;
        if (p.type === 'boolean') return p.name;
        if (p.type.includes('=>')) return `${p.name}={() => {}}`;
        if (p.defaultValue) return `${p.name}={${p.defaultValue}}`;
        return `${p.name}={/* ${p.type} */}`;
      }).join('\n    ');

      const hasChildren = c.props.some((p) => p.name === 'children');
      return hasChildren
        ? `<${c.name}\n    ${propsStr}\n  >\n    {/* content */}\n  </${c.name}>`
        : `<${c.name}\n    ${propsStr}\n  />`;
    });

    const componentName = 'MyComponent';
    const body = jsxBlocks.join('\n\n      ');
    const typeAnnotation = language === 'tsx' ? ': React.FC' : '';

    const code = `${importLine}
${language === 'tsx' ? "import React from 'react';" : ''}

// Generated for: "${description}"
// Review and adjust props according to your needs

export const ${componentName}${typeAnnotation} = () => {
  return (
    <div>
      ${body}
    </div>
  );
};`;

    const propDocs = usedComponents.map((c) => {
      const reqProps = c.props.filter((p) => p.required && !p.deprecated);
      return reqProps.length
        ? `**${c.name}** — required: ${reqProps.map((p) => `\`${p.name}: ${p.type}\``).join(', ')}`
        : `**${c.name}** — all props optional`;
    }).join('\n');

    return {
      content: [
        {
          type: 'text',
          text: `# Generated: ${description}\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n## Required props to fill in\n\n${propDocs}\n\nUse \`get-giro-component-metadata\` for full prop details on any component.`,
        },
      ],
    };
  }
);

// ── Start ───────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
