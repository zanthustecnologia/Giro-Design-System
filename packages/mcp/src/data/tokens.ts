import type { DesignToken } from '../types.js';
import { GENERATED_TOKENS } from './tokens.generated.js';

/**
 * TOKENS é a fonte de dados usada pelo MCP para list-giro-tokens e resolve-giro-token.
 *
 * Os tokens são gerados automaticamente a partir de @giro-ds/tokens via:
 *   pnpm --filter @giro-ds/mcp generate:tokens
 *
 * Se precisar sobrescrever ou adicionar um token manualmente antes da próxima geração,
 * adicione-o ao array MANUAL_OVERRIDES abaixo. Tokens com o mesmo nome que os gerados
 * substituem o valor gerado; tokens novos são adicionados ao final.
 */
const MANUAL_OVERRIDES: DesignToken[] = [
  // Exemplo:
  // { name: '--meu-novo-token', value: '#ff0000', category: 'color-brand' },
];

const overrideMap = new Map(MANUAL_OVERRIDES.map((t) => [t.name, t]));

export const TOKENS: DesignToken[] = [
  ...GENERATED_TOKENS.map((t) => overrideMap.get(t.name) ?? t),
  ...MANUAL_OVERRIDES.filter((t) => !GENERATED_TOKENS.some((g) => g.name === t.name)),
];

export const TOKEN_CATEGORIES = [...new Set(TOKENS.map((t) => t.category))];
