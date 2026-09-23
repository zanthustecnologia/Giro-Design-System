import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const packageDir = fileURLToPath(new URL('../', import.meta.url));

function run(script, args = [], cwd = packageDir) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Also support a direct package build, outside Turbo. When Turbo schedules this
// task, tokens#build has already finished, so these writes cannot race it.
run('config/style-dictionary.config.js', [], fileURLToPath(new URL('../../tokens/', import.meta.url)));
const tsx = require.resolve('tsx/cli');
run(tsx, ['scripts/generate.ts']);
run(tsx, ['scripts/generate-tokens.ts']);
run(tsx, ['--test', 'scripts/collect-props.test.ts']);
run(require.resolve('typescript/bin/tsc'), ['-p', 'tsconfig.json']);
