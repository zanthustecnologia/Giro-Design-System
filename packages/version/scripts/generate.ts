/**
 * generate.ts — Auto-descobre todos os pacotes em packages/* e grava src/generated/semver.ts
 *
 * Executar após `pnpm changeset:version`:
 *   pnpm --filter @giro-ds/version generate
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesRoot = resolve(__dirname, '../../');
const SELF_PKG = '@giro-ds/version';

const versions: Record<string, string> = {};

for (const entry of readdirSync(packagesRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dirPath = join(packagesRoot, entry.name);

  // Pacote npm
  const pkgJsonPath = join(dirPath, 'package.json');
  if (existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as { name?: string; version?: string };
      if (pkg.name && pkg.name !== SELF_PKG && pkg.version) {
        const key = pkg.name.replace(/^@giro-ds\//, '');
        versions[key] = pkg.version;
      }
    } catch {}
    continue;
  }

  // Pacote Dart / Flutter (pubspec.yaml)
  const pubspecPath = join(dirPath, 'pubspec.yaml');
  if (existsSync(pubspecPath)) {
    try {
      const pubspec = readFileSync(pubspecPath, 'utf-8');
      const name = pubspec.match(/^name:\s*(.+)/m)?.[1].trim();
      const version = pubspec.match(/^version:\s*(.+)/m)?.[1].trim();
      if (name && version) versions[name] = version;
    } catch {}
  }
}

const outputDir = resolve(__dirname, '../src/generated');
const outputFile = resolve(outputDir, 'semver.ts');

const lines = [
  '// AUTO-GENERATED — do not edit manually',
  '// Run: pnpm --filter @giro-ds/version generate',
  'export const PACKAGE_VERSIONS: Record<string, string> = {',
  ...Object.entries(versions).map(([k, v]) => `  ${k}: '${v}',`),
  '};',
  '',
];

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, lines.join('\n'), 'utf-8');

console.log('[@giro-ds/version] semver.ts gerado:');
Object.entries(versions).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
