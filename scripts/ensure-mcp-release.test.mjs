import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { ensureMcpRelease } from './ensure-mcp-release.mjs';

const require = createRequire(import.meta.url);

function fixture(t, changeset) {
  const root = mkdtempSync(join(tmpdir(), 'giro-release-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'fixture', private: true, workspaces: ['packages/*'] }));
  mkdirSync(join(root, '.changeset'));
  writeFileSync(join(root, '.changeset', 'config.json'), JSON.stringify({
    changelog: false, commit: false, fixed: [], linked: [], access: 'public', baseBranch: 'main', updateInternalDependencies: 'patch', ignore: [],
  }));
  for (const name of ['react', 'tokens', 'mcp', 'utilities']) {
    mkdirSync(join(root, 'packages', name), { recursive: true });
    writeFileSync(join(root, 'packages', name, 'package.json'), JSON.stringify({ name: `@giro-ds/${name}`, version: '1.0.0' }));
  }
  execFileSync('git', ['init', '-b', 'main'], { cwd: root, stdio: 'pipe' });
  execFileSync('git', ['add', '.'], { cwd: root, stdio: 'pipe' });
  execFileSync('git', ['-c', 'user.name=Release Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-m', 'Fixture'], { cwd: root, stdio: 'pipe' });
  if (changeset) writeFileSync(join(root, '.changeset', 'change.md'), `---\n${changeset}\n---\n\nTest release.\n`);
  return root;
}

for (const source of ['react', 'tokens']) {
  test(`${source} release adds an idempotent MCP patch`, async t => {
    const root = fixture(t, `"@giro-ds/${source}": minor`);
    assert.equal(await ensureMcpRelease(root), true);
    const generated = readFileSync(join(root, '.changeset', 'auto-mcp-sync.md'), 'utf8');
    assert.match(generated, /"@giro-ds\/mcp": patch/);
    assert.ok(generated.includes(`@giro-ds/${source}@1.1.0`));
    assert.equal(await ensureMcpRelease(root), false);
    execFileSync(process.execPath, [require.resolve('@changesets/cli/bin.js'), 'version'], { cwd: root, stdio: 'pipe' });
    assert.equal(JSON.parse(readFileSync(join(root, 'packages/mcp/package.json'), 'utf8')).version, '1.0.1');
  });
}

test('existing MCP major release is preserved', async t => {
  const root = fixture(t, '"@giro-ds/react": patch\n"@giro-ds/mcp": major');
  assert.equal(await ensureMcpRelease(root), false);
});

test('unrelated release does not bump MCP', async t => {
  assert.equal(await ensureMcpRelease(fixture(t, '"@giro-ds/utilities": patch')), false);
});

test('empty release does not bump MCP', async t => {
  assert.equal(await ensureMcpRelease(fixture(t)), false);
});

test('invalid release plan stops versioning', async t => {
  const root = fixture(t, '"@giro-ds/unknown": patch');
  await assert.rejects(ensureMcpRelease(root), /unknown/);
});

test('release synchronization does not require a local main branch', async t => {
  const root = fixture(t, '"@giro-ds/react": minor');
  execFileSync('git', ['branch', '-m', 'feature'], { cwd: root, stdio: 'pipe' });
  assert.equal(await ensureMcpRelease(root), true);
});
