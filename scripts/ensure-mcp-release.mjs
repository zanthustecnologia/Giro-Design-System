import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// Use the same release-plan implementation as the installed Changesets CLI.
// Unlike `changeset status`, this API does not compare Git branches.
const changesetsRequire = createRequire(require.resolve('@changesets/cli'));
const getReleasePlan = changesetsRequire('@changesets/get-release-plan').default;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function ensureMcpRelease(cwd = root) {
  const { releases } = await getReleasePlan(cwd);
  const releasing = releases.filter(release => release.type !== 'none');
  const sources = releasing.filter(release => ['@giro-ds/react', '@giro-ds/tokens'].includes(release.name));
  if (!sources.length || releasing.some(release => release.name === '@giro-ds/mcp')) return false;

  writeFileSync(join(cwd, '.changeset', 'auto-mcp-sync.md'),
    `---\n"@giro-ds/mcp": patch\n---\n\nSynchronize component metadata and design tokens with ${sources.map(release => `${release.name}@${release.newVersion}`).join(', ')}.\n`,
    { flag: 'wx' });
  console.log('[release] Added MCP patch to accompany the design system release.');
  return true;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await ensureMcpRelease();
