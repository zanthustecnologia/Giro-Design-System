import type { ComponentMetadata, ComponentProp, DesignToken } from '../types.js';

// ── Props table ──────────────────────────────────────────────────────────────

export function formatPropsTable(props: ComponentProp[]): string {
  if (props.length === 0) return '_No props documented._';
  return props
    .map(
      (p) =>
        `| \`${p.name}\` | \`${p.type}\` | ${p.required ? '✅ required' : 'optional'} | ${
          p.defaultValue ? `\`${p.defaultValue}\`` : '—'
        } | ${p.description} |`,
    )
    .join('\n');
}

// ── Component metadata block ─────────────────────────────────────────────────

export function formatComponentBlock(c: ComponentMetadata): string {
  const propsTable = formatPropsTable(c.props);
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
}

// ── Token table ───────────────────────────────────────────────────────────────

/**
 * Returns a markdown table or grouped markdown sections for a list of tokens.
 * When `grouped` is true, groups tokens by category.
 */
export function formatTokensGrouped(tokens: DesignToken[]): string {
  const categorized = tokens.reduce<Record<string, DesignToken[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return Object.entries(categorized)
    .map(([cat, toks]) => {
      const rows = toks.map((t) => `| \`${t.name}\` | \`${t.value}\` |`).join('\n');
      return `## ${cat}\n\n| Token | Value |\n|-------|-------|\n${rows}`;
    })
    .join('\n\n---\n\n');
}
