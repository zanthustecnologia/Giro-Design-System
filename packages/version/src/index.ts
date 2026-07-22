import { PACKAGE_VERSIONS } from './generated/semver.js';

/**
 * Versão oficial do Giro Design System.
 *
 * - `system`     → nome do produto ("Giro")
 * - `conceptual` → nome da versão conceitual/linguagem visual ("Moholy-Nagy")
 *                  Muda apenas quando houver mudança estrutural: nova linguagem visual,
 *                  mudança forte de tokens ou de paradigma de interação.
 * - `packages`   → versões técnicas de cada pacote publicado, gerenciadas pelo Changesets.
 *                  Auto-geradas via `pnpm --filter @giro-ds/version generate`.
 *
 * @example
 * import { giroVersion, formatGiroVersion } from '@giro-ds/version';
 * console.log(formatGiroVersion()); // "Giro: Moholy-Nagy (v4.0.0)"
 *
 * @example
 * import { giroVersion } from '@giro-ds/version';
 * console.log(giroVersion.packages.tokens); // "1.0.1"
 */
export const giroVersion = {
  system: 'Giro',
  conceptual: 'Moholy-Nagy',
  packages: PACKAGE_VERSIONS,
} as const;

export type GiroVersion = typeof giroVersion;

/**
 * Retorna a string de versão no formato oficial, usando @giro-ds/react como versão canônica:
 * "Giro: Moholy-Nagy (v4.0.0)"
 */
export function formatGiroVersion(): string {
  const reactVersion = giroVersion.packages['react'] ?? '?';
  return `${giroVersion.system}: ${giroVersion.conceptual} (v${reactVersion})`;
}
