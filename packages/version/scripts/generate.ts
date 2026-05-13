/**
 * generate.ts — Lê as versões de todos os pacotes @giro-ds/* e grava src/generated/semver.ts
 *
 * Executar após `pnpm changeset:version`:
 *   pnpm --filter @giro-ds/version generate
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readVersion(pkgRelPath: string): string {
  const pkgPath = resolve(__dirname, pkgRelPath);
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version: string };
  return pkg.version;
}

const versions = {
  react:     readVersion('../../react/package.json'),
  tokens:    readVersion('../../tokens/package.json'),
  utilities: readVersion('../../utilities/package.json'),
  mcp:       readVersion('../../mcp/package.json'),
};

const outputDir = resolve(__dirname, '../src/generated');
const outputFile = resolve(outputDir, 'semver.ts');

mkdirSync(outputDir, { recursive: true });
writeFileSync(
  outputFile,
  [
    '// AUTO-GENERATED — do not edit manually',
    '// Run: pnpm --filter @giro-ds/version generate',
    'export const PACKAGE_VERSIONS = {',
    `  react:     '${versions.react}',`,
    `  tokens:    '${versions.tokens}',`,
    `  utilities: '${versions.utilities}',`,
    `  mcp:       '${versions.mcp}',`,
    '} as const;',
    '',
  ].join('\n'),
  'utf-8'
);

console.log('[@giro-ds/version] semver.ts gerado:');
Object.entries(versions).forEach(([pkg, v]) => console.log(`  @giro-ds/${pkg}: ${v}`));
