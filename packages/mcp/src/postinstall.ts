/**
 * postinstall.ts — Runs after `npm install @giro-ds/mcp`
 *
 * Creates .vscode/mcp.json in the consumer's project root if it doesn't exist,
 * so the MCP server is available in VS Code / GitHub Copilot without manual setup.
 */
import * as fs from 'fs';
import * as path from 'path';

const MCP_CONFIG = {
  servers: {
    'giro-ds': {
      type: 'stdio',
      command: 'npx',
      args: ['-y', '@giro-ds/mcp'],
    },
  },
};

function getProjectRoot(): string | null {
  // INIT_CWD is set by npm/pnpm/yarn to the directory where `install` was invoked.
  // If it differs from __dirname (inside node_modules), we're being installed as a dependency.
  const initCwd = process.env.INIT_CWD;
  if (!initCwd) return null;

  // Avoid running when the package is being developed locally (e.g. in the monorepo itself)
  const packageDir = path.resolve(import.meta.dirname, '..');
  if (path.resolve(initCwd) === path.resolve(packageDir)) return null;

  return initCwd;
}

function main() {
  const projectRoot = getProjectRoot();
  if (!projectRoot) return;

  const vscodeDir = path.join(projectRoot, '.vscode');
  const mcpJsonPath = path.join(vscodeDir, 'mcp.json');

  if (fs.existsSync(mcpJsonPath)) {
    console.log('[giro-ds/mcp] .vscode/mcp.json already exists — skipping auto-setup.');
    return;
  }

  try {
    fs.mkdirSync(vscodeDir, { recursive: true });
    fs.writeFileSync(mcpJsonPath, JSON.stringify(MCP_CONFIG, null, 2) + '\n', 'utf-8');
    console.log('[giro-ds/mcp] Created .vscode/mcp.json — Giro MCP is ready in VS Code.');
    console.log('[giro-ds/mcp] Reload VS Code and enable the server in the MCP panel to get started.');
  } catch (err) {
    // Non-fatal: some environments restrict file creation (CI, read-only fs, etc.)
    console.warn('[giro-ds/mcp] Could not create .vscode/mcp.json:', (err as Error).message);
  }
}

main();
