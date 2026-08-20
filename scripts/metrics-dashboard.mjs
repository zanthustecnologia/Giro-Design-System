#!/usr/bin/env node
// Lê os snapshots de reports/package-stats/ e reports/usage-audit/ e gera um
// dashboard HTML estático (Chart.js via CDN, sem dependências novas) para
// visualizar a evolução das métricas do Giro DS ao longo do tempo.
//
// Uso: node scripts/metrics-dashboard.mjs

import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PACKAGE_STATS_DIR = join(ROOT, 'reports', 'package-stats');
const USAGE_AUDIT_DIR = join(ROOT, 'reports', 'usage-audit');
const OUT_FILE = join(ROOT, 'reports', 'dashboard.html');

function readJsonFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(dir, f), 'utf-8')) }));
}

function buildPackageStatsSeries(snapshots) {
  // dias no eixo X, uma série por pacote (downloads do último mês)
  const labels = snapshots.map((s) => s.data.collectedAt.slice(0, 10));
  const packageNames = [...new Set(snapshots.flatMap((s) => s.data.results.map((r) => r.name)))];

  const npmSeries = packageNames
    .filter((name) => snapshots.some((s) => s.data.results.find((r) => r.name === name && r.registry === 'npm')))
    .map((name) => ({
      name,
      data: snapshots.map((s) => s.data.results.find((r) => r.name === name)?.downloadsLastMonth ?? null),
    }));

  const pubSeries = packageNames
    .filter((name) => snapshots.some((s) => s.data.results.find((r) => r.name === name && r.registry === 'pub.dev')))
    .map((name) => ({
      name,
      data: snapshots.map((s) => s.data.results.find((r) => r.name === name)?.likeCount ?? null),
    }));

  return { labels, npmSeries, pubSeries };
}

function buildUsageAuditLatest(snapshots) {
  // pega o snapshot mais recente por target (nome do arquivo tem prefixo do target + data)
  const latestByTarget = new Map();
  for (const { data } of snapshots) {
    const existing = latestByTarget.get(data.target);
    if (!existing || data.collectedAt > existing.collectedAt) {
      latestByTarget.set(data.target, data);
    }
  }
  return [...latestByTarget.values()];
}

function main() {
  const packageStats = readJsonFiles(PACKAGE_STATS_DIR);
  const usageAudits = readJsonFiles(USAGE_AUDIT_DIR);

  if (packageStats.length === 0 && usageAudits.length === 0) {
    console.log('Nenhum snapshot encontrado em reports/. Rode "pnpm stats:packages" e "pnpm stats:usage" primeiro.');
    process.exit(0);
  }

  const { labels, npmSeries, pubSeries } = buildPackageStatsSeries(packageStats);
  const usageLatest = buildUsageAuditLatest(usageAudits);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Giro DS — Dashboard de métricas</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; background: #0f1115; color: #e6e6e6; }
  h1 { font-size: 1.4rem; }
  h2 { font-size: 1.1rem; margin-top: 2.5rem; color: #9fb4ff; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 2rem; }
  .card { background: #1a1d24; border-radius: 12px; padding: 1.25rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { text-align: left; padding: 0.4rem 0.6rem; border-bottom: 1px solid #2c303a; }
  small { color: #8a8f9c; }
</style>
</head>
<body>
<h1>Giro DS — Dashboard de métricas</h1>
<small>Gerado em ${new Date().toISOString()}</small>

<h2>Downloads npm (último mês)</h2>
<div class="card"><canvas id="npmChart"></canvas></div>

<h2>Score pub.dev (likes)</h2>
<div class="card"><canvas id="pubChart"></canvas></div>

<h2>Adoção de tokens por app (snapshot mais recente)</h2>
<div class="grid">
  <div class="card"><canvas id="tokenChart"></canvas></div>
  <div class="card">
    <table>
      <thead><tr><th>Target</th><th>Token vars</th><th>Hex hardcoded</th><th>Px hardcoded</th><th>Adoção</th></tr></thead>
      <tbody>
        ${usageLatest
          .map(
            (u) => `<tr>
          <td>${u.target}</td>
          <td>${u.tokenAudit.tokenVarUsages}</td>
          <td>${u.tokenAudit.hardcodedHexColors}</td>
          <td>${u.tokenAudit.hardcodedPxValues}</td>
          <td>${(u.tokenAudit.tokenAdoptionRatio * 100).toFixed(1)}%</td>
        </tr>`
          )
          .join('\n')}
      </tbody>
    </table>
  </div>
</div>

<h2>Uso de componentes @giro-ds/react por app</h2>
<table>
  <thead><tr><th>Target</th><th>Componente</th><th>Arquivos</th><th>Ocorrências</th></tr></thead>
  <tbody>
    ${usageLatest
      .flatMap((u) => u.componentUsage.map((c) => ({ target: u.target, ...c })))
      .map((c) => `<tr><td>${c.target}</td><td>${c.componente}</td><td>${c.arquivos}</td><td>${c.ocorrencias}</td></tr>`)
      .join('\n')}
  </tbody>
</table>

<script>
const labels = ${JSON.stringify(labels)};
const npmSeries = ${JSON.stringify(npmSeries)};
const pubSeries = ${JSON.stringify(pubSeries)};
const usageLatest = ${JSON.stringify(usageLatest)};
const palette = ['#7c9dff', '#ff9f7c', '#7cffb0', '#e07cff', '#ffe27c'];

new Chart(document.getElementById('npmChart'), {
  type: 'line',
  data: { labels, datasets: npmSeries.map((s, i) => ({ label: s.name, data: s.data, borderColor: palette[i % palette.length], tension: 0.25 })) },
  options: { responsive: true, plugins: { legend: { labels: { color: '#e6e6e6' } } }, scales: { x: { ticks: { color: '#9aa' } }, y: { ticks: { color: '#9aa' } } } },
});

new Chart(document.getElementById('pubChart'), {
  type: 'line',
  data: { labels, datasets: pubSeries.map((s, i) => ({ label: s.name, data: s.data, borderColor: palette[i % palette.length], tension: 0.25 })) },
  options: { responsive: true, plugins: { legend: { labels: { color: '#e6e6e6' } } }, scales: { x: { ticks: { color: '#9aa' } }, y: { ticks: { color: '#9aa' } } } },
});

new Chart(document.getElementById('tokenChart'), {
  type: 'bar',
  data: {
    labels: usageLatest.map((u) => u.target),
    datasets: [{ label: 'Adoção de tokens (%)', data: usageLatest.map((u) => +(u.tokenAudit.tokenAdoptionRatio * 100).toFixed(1)), backgroundColor: '#7c9dff' }],
  },
  options: { responsive: true, plugins: { legend: { labels: { color: '#e6e6e6' } } }, scales: { x: { ticks: { color: '#9aa' } }, y: { ticks: { color: '#9aa' }, beginAtZero: true, max: 100 } } },
});
</script>
</body>
</html>`;

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, html);
  console.log(`Dashboard gerado em reports/dashboard.html`);
  console.log('Abra o arquivo no navegador para visualizar (ex: start reports/dashboard.html no Windows).');
}

main();
