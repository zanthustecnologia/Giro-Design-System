#!/usr/bin/env node
// Coleta downloads (npm) e score (pub.dev) dos pacotes publicados do Giro DS
// e salva um snapshot em reports/package-stats/ para acompanhar evolução no tempo.
//
// Uso: node scripts/package-stats.mjs

import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const NPM_PACKAGES = ['@giro-ds/react', '@giro-ds/tokens', '@giro-ds/mcp'];
const PUB_PACKAGES = ['flutter_giro'];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function getNpmStats(name) {
  const [lastMonth, lastWeek, registry] = await Promise.all([
    fetchJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(name)}`),
    fetchJson(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`),
    fetchJson(`https://registry.npmjs.org/${encodeURIComponent(name)}`),
  ]);

  return {
    name,
    registry: 'npm',
    downloadsLastMonth: lastMonth?.downloads ?? null,
    downloadsLastWeek: lastWeek?.downloads ?? null,
    latestVersion: registry?.['dist-tags']?.latest ?? null,
    totalVersionsPublished: registry ? Object.keys(registry.versions ?? {}).length : null,
  };
}

async function getPubStats(name) {
  const score = await fetchJson(`https://pub.dev/api/packages/${encodeURIComponent(name)}/score`);
  if (!score) {
    return { name, registry: 'pub.dev', published: false };
  }
  return {
    name,
    registry: 'pub.dev',
    published: true,
    likeCount: score.likeCount ?? null,
    grantedPoints: score.grantedPoints ?? null,
    maxPoints: score.maxPoints ?? null,
  };
}

function printTable(rows) {
  console.table(rows);
}

async function main() {
  const results = await Promise.all([
    ...NPM_PACKAGES.map(getNpmStats),
    ...PUB_PACKAGES.map(getPubStats),
  ]);

  printTable(results);

  const outDir = join(ROOT, 'reports', 'package-stats');
  mkdirSync(outDir, { recursive: true });
  const snapshot = { collectedAt: new Date().toISOString(), results };
  const fileName = `${new Date().toISOString().slice(0, 10)}.json`;
  writeFileSync(join(outDir, fileName), JSON.stringify(snapshot, null, 2));
  console.log(`\nSnapshot salvo em reports/package-stats/${fileName}`);
  console.log('Rode este script periodicamente (ex: cron semanal) para acumular histórico e medir crescimento.');
}

main().catch((err) => {
  console.error('Falha ao coletar estatísticas:', err);
  process.exit(1);
});
