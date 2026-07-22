import { z } from 'zod';
import type { ComponentMetadata, ToolResult } from '../types.js';
import { COMPONENTS, COMPONENT_NAMES } from '../data/react/components.js';
import { scoreComponentsByQuery } from '../lib/scorer.js';

// ── Schema ───────────────────────────────────────────────────────────────────

export const generateComponentSchema = {
  description: z
    .string()
    .describe(
      'What you want to build, in PT-BR or EN (e.g. "formulário de cadastro com nome, email e botão de salvar")',
    ),
  language: z
    .enum(['tsx', 'jsx'])
    .optional()
    .describe('Output language. Default: "tsx"'),
};

// ── Internal helpers ─────────────────────────────────────────────────────────

function buildJsxSkeleton(c: ComponentMetadata, language: 'tsx' | 'jsx'): string {
  const requiredProps = c.props.filter((p) => p.required && !p.deprecated);
  const optionalSample = c.props
    .filter((p) => !p.required && p.defaultValue && !p.deprecated)
    .slice(0, 2);

  const allSampleProps = [...requiredProps, ...optionalSample];

  const propsStr = allSampleProps
    .map((p) => {
      if (p.type === 'string') return `${p.name}=""`;
      if (p.type === 'boolean') return p.name;
      if (p.type.includes('=>')) return `${p.name}={() => {}}`;
      if (p.defaultValue) return `${p.name}={${p.defaultValue}}`;
      return `${p.name}={/* ${p.type} */}`;
    })
    .join('\n    ');

  const hasChildren = c.props.some((p) => p.name === 'children');
  void language; // reserved for future platform-specific formatting
  return hasChildren
    ? `<${c.name}\n    ${propsStr}\n  >\n    {/* content */}\n  </${c.name}>`
    : `<${c.name}\n    ${propsStr}\n  />`;
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function handleGenerateComponent({
  description,
  language = 'tsx',
}: {
  description: string;
  language?: 'tsx' | 'jsx';
}): Promise<ToolResult> {
  const scored = scoreComponentsByQuery(COMPONENTS, description, 6);

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

  const jsxBlocks = usedComponents.map((c) => buildJsxSkeleton(c, language));

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

  const propDocs = usedComponents
    .map((c) => {
      const reqProps = c.props.filter((p) => p.required && !p.deprecated);
      return reqProps.length
        ? `**${c.name}** — required: ${reqProps.map((p) => `\`${p.name}: ${p.type}\``).join(', ')}`
        : `**${c.name}** — all props optional`;
    })
    .join('\n');

  return {
    content: [
      {
        type: 'text',
        text: `# Generated: ${description}\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n## Required props to fill in\n\n${propDocs}\n\nUse \`get-giro-component-metadata\` for full prop details on any component.`,
      },
    ],
  };
}
