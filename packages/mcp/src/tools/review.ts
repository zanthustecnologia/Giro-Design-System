import { z } from 'zod';
import { readFileSync, existsSync } from 'fs';
import { resolve, extname, basename, relative, isAbsolute } from 'path';
import type { ToolResult } from '../types.js';
import { COMPONENTS, COMPONENT_NAMES } from '../data/react/components.js';
import { TOKENS } from '../data/react/tokens.js';
import { DEPRECATED_PROPS } from '../data/react/migration.js';
import type { PropDeprecation } from '../data/migration.js';
import { findJsxUsages } from '../lib/jsxAnalyzer.js';
import { detectHardcodedCssValues } from '../lib/cssAudit.js';

const IGNORED_PROP_NAMES = new Set(['className', 'style', 'ref', 'key', 'id']);

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

  const componentNames = new Set(COMPONENTS.map((c) => c.name));
  const usages = findJsxUsages(code, componentNames);
  const usedComponents = COMPONENTS.filter((c) =>
    usages.some((u) => u.component === c.name),
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
    const componentUsages = usages.filter((u) => u.component === c.name);

    for (const usage of componentUsages) {
      // Spread props ({...rest}) may supply any prop, so we can't safely flag unknown/missing props here.
      if (usage.hasSpread) continue;

      for (const propName of usage.propNames) {
        if (!knownPropNames.has(propName) && !IGNORED_PROP_NAMES.has(propName)) {
          issues.push(
            `❌ \`<${c.name}>\`: prop \`${propName}\` is not in the component API. Known props: ${[...knownPropNames].join(', ')}`,
          );
        }
      }

      for (const req of requiredProps) {
        if (!usage.propNames.includes(req.name)) {
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
  const cssIssues = detectHardcodedCssValues(code, TOKENS);

  const issues = cssIssues.map((issue) => {
    if (issue.kind === 'exact-token') {
      return `🔄 \`${issue.raw}\` → use \`var(${issue.exactToken})\``;
    }
    if (issue.kind === 'color-no-match') {
      const suggestions = issue.candidates.map((t) => `\`var(${t.name})\``).join(', ');
      return `⚠️ Hardcoded color \`${issue.raw}\` — no exact token match. Nearest color tokens: ${suggestions}`;
    }
    if (issue.candidates.length) {
      const candidates = issue.candidates.map((t) => `\`var(${t.name})\` (${t.value})`).join(', ');
      return `⚠️ Hardcoded \`${issue.raw}\` — consider: ${candidates}`;
    }
    return `⚠️ Hardcoded \`${issue.raw}\` — no close spacing/radius token found. Check \`--spacing-*\` and \`--border-radius-*\``;
  });

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

// ── review-giro-file ─────────────────────────────────────────────────────────

export const reviewFileSchema = {
  filePath: z
    .string()
    .describe(
      'Absolute or relative path to a .tsx, .jsx, .ts, .js, .css or .scss file to review and auto-fix',
    ),
};

/** Prop renames that are safe to apply automatically (simple identifier → identifier). */
function buildSafeRenames(deprecations: PropDeprecation[]): Array<{ from: string; to: string; component: string; since: string }> {
  return deprecations
    .filter((d) => /^\w+$/.test(d.prop) && d.replacement && /^\w+$/.test(d.replacement))
    .map((d) => ({ from: d.prop, to: d.replacement!, component: d.component, since: d.since }));
}

/** Apply auto-fixable changes to source code. Returns fixed code and a log of applied changes. */
function applyAutoFixes(
  code: string,
  deprecations: PropDeprecation[],
): { fixed: string; appliedFixes: string[] } {
  let fixed = code;
  const appliedFixes: string[] = [];

  // Build a lookup of valid props per component so we don't rename to a prop that doesn't exist
  const componentPropMap = new Map(
    COMPONENTS.map((c) => [c.name, new Set(c.props.map((p) => p.name))]),
  );

  for (const { from, to, component, since } of buildSafeRenames(deprecations)) {
    // Only apply the rename if the target prop actually exists in the current component API
    const knownProps = componentPropMap.get(component);
    if (!knownProps?.has(to)) continue;

    const regex = new RegExp(`(?<=[\\s<])${from}=`, 'g');
    const updated = fixed.replace(regex, `${to}=`);
    if (updated !== fixed) {
      appliedFixes.push(
        `\`${from}\` → \`${to}\` (${component}, deprecated since ${since})`,
      );
      fixed = updated;
    }
  }

  return { fixed, appliedFixes };
}

/** Collect CSS issues from source code in Portuguese (reuses the same detection logic as review-giro-css). */
function collectCssIssues(code: string): string[] {
  return detectHardcodedCssValues(code, TOKENS)
    .map((issue) => {
      if (issue.kind === 'exact-token') {
        return `🔄 \`${issue.raw}\` tem token exato: \`var(${issue.exactToken})\``;
      }
      if (issue.kind === 'color-no-match') {
        const nearby = issue.candidates.slice(0, 2).map((t) => `\`var(${t.name})\``).join(', ');
        return `⚠️ Cor hardcoded \`${issue.raw}\` sem token exato. Verifique: ${nearby}`;
      }
      if (issue.candidates.length) {
        const nearby = issue.candidates.slice(0, 2).map((t) => `\`var(${t.name})\` (${t.value})`).join(', ');
        return `⚠️ Valor hardcoded \`${issue.raw}\`. Próximos tokens: ${nearby}`;
      }
      return null;
    })
    .filter((line): line is string => line !== null);
}

export async function handleReviewFile({
  filePath,
}: {
  filePath: string;
}): Promise<ToolResult> {
  // Resolve path relative to cwd, then ensure it didn't escape the project root (path traversal guard)
  const projectRoot = process.cwd();
  const absPath = resolve(projectRoot, filePath);
  const relativePath = relative(projectRoot, absPath);
  const isInsideRoot =
    relativePath === '' || (!relativePath.startsWith('..') && !isAbsolute(relativePath));

  if (!isInsideRoot) {
    return {
      content: [
        {
          type: 'text',
          text: `Caminho fora do diretório do projeto não é permitido: \`${filePath}\``,
        },
      ],
    };
  }

  if (!existsSync(absPath)) {
    return {
      content: [{ type: 'text', text: `Arquivo não encontrado: \`${absPath}\`` }],
    };
  }

  const allowed = ['.tsx', '.jsx', '.ts', '.js', '.css', '.scss'];
  if (!allowed.includes(extname(absPath))) {
    return {
      content: [{ type: 'text', text: `Extensão não suportada. Arquivos aceitos: ${allowed.join(', ')}` }],
    };
  }

  const originalCode = readFileSync(absPath, 'utf-8');
  const fileName = basename(absPath);

  // 1. Auto-fix deprecated props
  const { fixed: fixedCode, appliedFixes } = applyAutoFixes(originalCode, DEPRECATED_PROPS);

  // 2. Detect component usage issues on the FIXED code so already-corrected props aren't re-reported
  const codeToAnalyze = fixedCode;
  const usageIssues: string[] = [];
  const componentNames = new Set(COMPONENTS.map((c) => c.name));
  const usages = findJsxUsages(codeToAnalyze, componentNames);
  const usedComponents = COMPONENTS.filter((c) => usages.some((u) => u.component === c.name));

  for (const c of usedComponents) {
    const knownProps = new Set(c.props.map((p) => p.name));
    const requiredProps = c.props.filter((p) => p.required);
    const componentUsages = usages.filter((u) => u.component === c.name);

    for (const usage of componentUsages) {
      if (usage.hasSpread) continue;

      for (const propName of usage.propNames) {
        if (!knownProps.has(propName) && !IGNORED_PROP_NAMES.has(propName)) {
          usageIssues.push(`❌ \`<${c.name}>\`: prop \`${propName}\` não existe na API`);
        }
      }

      for (const req of requiredProps) {
        if (!usage.propNames.includes(req.name)) {
          usageIssues.push(`⚠️ \`<${c.name}>\`: prop obrigatória \`${req.name}\` (${req.type}) parece ausente`);
        }
      }
    }
  }

  // 3. Detect CSS issues (on original — values haven't been auto-fixed)
  const cssIssues = collectCssIssues(originalCode);

  // ── Build response ──────────────────────────────────────────────────────────
  const remainingIssues = usageIssues.length + cssIssues.length;
  const hasChanges = appliedFixes.length > 0;

  const summaryParts = [];
  if (hasChanges) summaryParts.push(`${appliedFixes.length} corrigido(s) automaticamente`);
  if (remainingIssues > 0) summaryParts.push(`${remainingIssues} requer(em) atenção manual`);
  if (!hasChanges && remainingIssues === 0) summaryParts.push('nenhum problema encontrado');
  const summaryLine = summaryParts.join(' · ');

  const autoFixSection = hasChanges
    ? `\n\n## Corrigido automaticamente\n\n${appliedFixes.map((f) => `- ${f}`).join('\n')}`
    : '';

  const usageSection =
    usageIssues.length > 0
      ? `\n\n## Uso de componentes\n\n${usageIssues.join('\n')}`
      : '';

  const cssSection =
    cssIssues.length > 0
      ? `\n\n## Valores hardcoded\n\n${cssIssues.join('\n')}`
      : '';

  const noIssues =
    !hasChanges && usageIssues.length === 0 && cssIssues.length === 0
      ? '\n\n✅ Nenhum problema encontrado.'
      : '';

  const codeSection = hasChanges
    ? `\n\n## Código corrigido\n\n\`\`\`tsx\n${fixedCode}\n\`\`\``
    : '';

  const text =
    `# Giro DS — Review: ${fileName}\n\n**${summaryLine}**` +
    autoFixSection +
    usageSection +
    cssSection +
    noIssues +
    codeSection;

  return { content: [{ type: 'text', text }] };
}
