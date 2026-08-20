#!/usr/bin/env node
// Agrega o log local de uso do MCP (JSONL) em um resumo por tool.
// Só existe conteúdo aqui se o dev rodou o servidor com GIRO_MCP_TELEMETRY=1
// (ou GIRO_MCP_USAGE_LOG=<path>) — é opt-in e 100% local, nada é enviado
// para fora da máquina automaticamente.
//
// Uso: node scripts/usage-report.mjs [caminho-do-log]
//   Default: ~/.giro-ds/mcp-usage.jsonl

import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const logPath = process.argv[2] ?? join(homedir(), '.giro-ds', 'mcp-usage.jsonl');

if (!existsSync(logPath)) {
  console.log(`Nenhum log encontrado em ${logPath}.`);
  console.log('Rode o servidor MCP com GIRO_MCP_TELEMETRY=1 para começar a registrar uso localmente.');
  process.exit(0);
}

const lines = readFileSync(logPath, 'utf-8')
  .replace(/^\uFEFF/, '') // remove BOM caso o arquivo tenha sido salvo/editado no Windows
  .split('\n')
  .filter(Boolean);
const stats = new Map(); // tool -> { calls, errors, totalDurationMs }

for (const line of lines) {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue;
  }
  const current = stats.get(entry.tool) ?? { calls: 0, errors: 0, totalDurationMs: 0 };
  current.calls += 1;
  if (!entry.success) current.errors += 1;
  current.totalDurationMs += entry.durationMs ?? 0;
  stats.set(entry.tool, current);
}

const rows = [...stats.entries()]
  .sort((a, b) => b[1].calls - a[1].calls)
  .map(([tool, s]) => ({
    tool,
    chamadas: s.calls,
    erros: s.errors,
    duracaoMediaMs: Math.round(s.totalDurationMs / s.calls),
  }));

console.log(`\nUso do MCP (${lines.length} eventos, ${logPath})\n`);
console.table(rows);
