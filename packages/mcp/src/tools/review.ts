import { z } from 'zod';
import type { ToolResult } from '../types.js';
import { COMPONENTS, COMPONENT_NAMES } from '../data/react/components.js';
import { TOKENS } from '../data/react/tokens.js';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const reviewUsageSchema = {
  code: z
    .string()
    .describe('JSX/TSX code snippet that uses @giro-ds/react components'),
};

export const reviewCssSchema = {
  code: z.string().describe('CSS, SCSS, or JSX inline style snippet to audit'),
};

// ── Handlers ─────────────────────────────────────────────────────────────────

export async function handleReviewUsage({
  code,
}: {
  code: string;
}): Promise<ToolResult> {
  const issues: string[] = [];
  const suggestions: string[] = [];

  const usedComponents = COMPONENTS.filter((c) =>
    new RegExp(`<${c.name}[\\s/>]`).test(code),
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

    const componentRegex = new RegExp(`<${c.name}([^>]*)`, 'g');
    const componentMatches = [...code.matchAll(componentRegex)];

    for (const match of componentMatches) {
      const propsStr = match[1] ?? '';

      const usedPropNames = [...propsStr.matchAll(/(\w+)=/g)].map((m) => m[1]);
      for (const propName of usedPropNames) {
        if (
          !knownPropNames.has(propName) &&
          propName !== 'className' &&
          propName !== 'style' &&
          propName !== 'ref' &&
          propName !== 'key'
        ) {
          issues.push(
            `❌ \`<${c.name}>\`: prop \`${propName}\` is not in the component API. Known props: ${[...knownPropNames].join(', ')}`,
          );
        }
      }

      for (const req of requiredProps) {
        if (!propsStr.includes(req.name)) {
          issues.push(
            `⚠️ \`<${c.name}>\`: required prop \`${req.name}\` (${req.type}) appears to be missing.`,
          );
        }
      }
    }

    if (c.name === 'Button' && /style=\{/.test(code)) {
      suggestions.push(
        `💡 \`<Button>\`: avoid inline \`style\` prop — use \`variant\`, \`size\`, and token-based className instead.`,
      );
    }
    if (c.name === 'TextField' && /onChange.*setState/.test(code)) {
      suggestions.push(
        `💡 \`<TextField>\`: consider using \`useForm\` or controlled patterns recommended by the design system.`,
      );
    }
  }

  const detectedList = usedComponents.map((c) => `- \`<${c.name}>\``).join('\n');
  const issueSection =
    issues.length > 0
      ? `\n\n## Issues\n\n${issues.join('\n')}`
      : '\n\n## Issues\n\n✅ No issues found.';
  const suggestionSection =
    suggestions.length > 0 ? `\n\n## Suggestions\n\n${suggestions.join('\n')}` : '';

  return {
    content: [
      {
        type: 'text',
        text: `# Giro DS Usage Review\n\n**Detected components:**\n${detectedList}${issueSection}${suggestionSection}`,
      },
    ],
  };
}

export async function handleReviewCss({ code }: { code: string }): Promise<ToolResult> {
  const issues: string[] = [];

  const valueToToken = new Map<string, string>();
  for (const token of TOKENS) {
    valueToToken.set(token.value.toLowerCase(), token.name);
  }

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

      if (label === 'color') {
        const colorTokens = TOKENS.filter((t) => t.category.startsWith('color')).slice(0, 3);
        const suggestions = colorTokens.map((t) => `\`var(${t.name})\``).join(', ');
        issues.push(
          `⚠️ Hardcoded ${label} \`${raw}\` — no exact token match. Nearest color tokens: ${suggestions}`,
        );
      } else if (label === 'px value' || label === 'rem value') {
        const px = parseFloat(raw);
        const spacingTokens = TOKENS.filter(
          (t) => t.category === 'spacing' && Math.abs(parseFloat(t.value) - px) <= 4,
        );
        const radiusTokens = TOKENS.filter(
          (t) =>
            t.category === 'border-radius' && Math.abs(parseFloat(t.value) - px) <= 4,
        );
        const candidates = [...spacingTokens, ...radiusTokens].map(
          (t) => `\`var(${t.name})\` (${t.value})`,
        );
        if (candidates.length) {
          issues.push(`⚠️ Hardcoded \`${raw}\` — consider: ${candidates.join(', ')}`);
        } else {
          issues.push(
            `⚠️ Hardcoded \`${raw}\` — no close spacing/radius token found. Check \`--spacing-*\` and \`--border-radius-*\``,
          );
        }
      }
    }
  }

  if (issues.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: '✅ No hardcoded values found. Code is using tokens correctly.',
        },
      ],
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
