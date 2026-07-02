import type { ComponentMetadata, DesignToken } from '../types.js';

// ── Component scoring ────────────────────────────────────────────────────────

/**
 * Scores components by relevance to a free-text query.
 * Name matches score highest (3), keyword matches next (2), haystack matches lowest (1).
 */
export function scoreComponentsByQuery(
  components: ComponentMetadata[],
  query: string,
  topN = 5,
): Array<{ component: ComponentMetadata; score: number }> {
  const terms = query.toLowerCase().split(/\s+/);
  return components
    .map((c) => {
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
    .slice(0, topN);
}

// ── Token scoring ────────────────────────────────────────────────────────────

/**
 * Maps PT-BR / EN intent keywords to token name patterns.
 * Used by scoreTokensByIntent to expand the search terms.
 */
const INTENT_MAP: Record<string, string[]> = {
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

/**
 * Scores tokens by relevance to a natural language intent string.
 * Expands terms using the INTENT_MAP before scoring.
 */
export function scoreTokensByIntent(
  tokens: DesignToken[],
  intent: string,
  topN = 10,
): Array<{ token: DesignToken; score: number }> {
  const terms = intent.toLowerCase().split(/\s+/);
  const expandedTerms = new Set<string>(terms);
  for (const term of terms) {
    const mapped = INTENT_MAP[term];
    if (mapped) mapped.forEach((m) => expandedTerms.add(m));
  }

  return tokens
    .map((t) => {
      const haystack = `${t.name} ${t.category} ${t.value}`.toLowerCase();
      const score = [...expandedTerms].reduce((acc, term) => {
        return haystack.includes(term) ? acc + 1 : acc;
      }, 0);
      return { token: t, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
