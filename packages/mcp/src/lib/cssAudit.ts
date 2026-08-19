import type { DesignToken } from '../types.js';

export interface CssIssue {
  raw: string;
  kind: 'exact-token' | 'color-no-match' | 'value-no-match';
  exactToken?: string;
  candidates: DesignToken[];
}

const HEX_REGEX = /#([0-9a-fA-F]{3,8})\b/g;
const FUNCTIONAL_COLOR_REGEX = /:\s*(rgb|rgba|hsl|hsla)\([^)]+\)/g;
const PX_REGEX = /:\s*(\d+(?:\.\d+)?px)\b/g;
const REM_REGEX = /:\s*(\d+(?:\.\d+)?rem)\b/g;

/**
 * Detects hardcoded color/spacing/radius values in CSS-like source and matches
 * them against known design tokens. Shared by review-giro-css and review-giro-file
 * so both tools apply the exact same detection rules.
 */
export function detectHardcodedCssValues(code: string, tokens: DesignToken[]): CssIssue[] {
  const valueToToken = new Map<string, string>();
  for (const token of tokens) valueToToken.set(token.value.toLowerCase(), token.name);

  const issues: CssIssue[] = [];

  const colorMatches = [
    ...code.matchAll(HEX_REGEX),
    ...code.matchAll(FUNCTIONAL_COLOR_REGEX),
  ];
  for (const match of colorMatches) {
    const raw = match[0].replace(/:\s*/, '').trim();
    const exactToken = valueToToken.get(raw.toLowerCase());
    if (exactToken) {
      issues.push({ raw, kind: 'exact-token', exactToken, candidates: [] });
      continue;
    }
    const candidates = tokens.filter((t) => t.category.startsWith('color')).slice(0, 3);
    issues.push({ raw, kind: 'color-no-match', candidates });
  }

  for (const match of [...code.matchAll(PX_REGEX), ...code.matchAll(REM_REGEX)]) {
    const raw = match[1];
    const exactToken = valueToToken.get(raw.toLowerCase());
    if (exactToken) {
      issues.push({ raw, kind: 'exact-token', exactToken, candidates: [] });
      continue;
    }
    const px = parseFloat(raw);
    const candidates = tokens.filter(
      (t) =>
        (t.category === 'spacing' || t.category === 'border-radius') &&
        Math.abs(parseFloat(t.value) - px) <= 4,
    );
    issues.push({ raw, kind: 'value-no-match', candidates: candidates.slice(0, 3) });
  }

  return issues;
}
