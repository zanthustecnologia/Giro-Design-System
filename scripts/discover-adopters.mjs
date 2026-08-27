#!/usr/bin/env node
// Varre todos os projetos de um grupo GitLab via API (sem clonar nada) e
// verifica quais deles declaram @giro-ds/* (package.json) ou flutter_giro
// (pubspec.yaml) como dependência. Serve como descoberta automática de
// "quem usa o Giro DS na organização", complementando o stats:usage (que
// mede profundidade de uso, mas exige saber o caminho do repo de antemão).
//
// Uso: node scripts/discover-adopters.mjs
// Requer variáveis de ambiente:
//   GITLAB_TOKEN  - Personal/Group Access Token com escopo read_api
//   GITLAB_URL    - opcional, default https://gitlab.zanthus.com.br
//   GITLAB_GROUP  - opcional, default "web"

import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const GITLAB_URL = (process.env.GITLAB_URL ?? 'https://gitlab.zanthus.com.br').replace(/\/$/, '');
const GITLAB_GROUP = process.env.GITLAB_GROUP ?? 'web';
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

const NPM_PACKAGES = ['@giro-ds/react', '@giro-ds/tokens', '@giro-ds/mcp', '@giro-ds/utilities', '@giro-ds/version'];
const PUB_PACKAGES = ['flutter_giro'];

if (!GITLAB_TOKEN) {
  console.error('Defina a variável de ambiente GITLAB_TOKEN (Personal Access Token, escopo read_api) antes de rodar.');
  process.exit(1);
}

async function gitlabApi(path) {
  const res = await fetch(`${GITLAB_URL}/api/v4${path}`, {
    headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitLab API ${path} -> ${res.status} ${res.statusText}`);
  return res;
}

async function listGroupProjects(groupPath) {
  const projects = [];
  let page = 1;
  for (;;) {
    const res = await gitlabApi(
      `/groups/${encodeURIComponent(groupPath)}/projects?include_subgroups=true&per_page=100&page=${page}&archived=false`,
    );
    if (!res) break;
    const batch = await res.json();
    if (batch.length === 0) break;
    projects.push(...batch);
    if (!res.headers.get('x-next-page')) break;
    page += 1;
  }
  return projects;
}

async function fetchRawFile(projectId, filePath, ref) {
  const res = await gitlabApi(
    `/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}/raw?ref=${encodeURIComponent(ref)}`,
  );
  if (!res) return null;
  return res.text();
}

// NOTA: chegamos a tentar `scope=blobs&search=filename:X` no lugar do
// crawl abaixo por ser mais rápido, mas sem Elasticsearch/Advanced Search
// essa busca não é confiável — perdeu adotantes reais conhecidos
// (mkt-sign, zeus-retail-evolution). Ficamos com o crawl da árvore
// completa (mais lento, mas correto), compensado com paralelismo entre
// projetos em scanProjectsWithProgress.
const MAX_TREE_PAGES = 200; // ~20000 entradas — repos grandes (3000+ arquivos) precisam de mais que 1000

async function findManifestPaths(projectId, ref) {
  const paths = [];
  let page = 1;
  for (; page <= MAX_TREE_PAGES; page += 1) {
    const res = await gitlabApi(
      `/projects/${projectId}/repository/tree?recursive=true&ref=${encodeURIComponent(ref)}&per_page=100&page=${page}`,
    );
    if (!res) break;
    const entries = await res.json();
    if (entries.length === 0) break;
    for (const entry of entries) {
      if (entry.type !== 'blob') continue;
      if (entry.path.includes('node_modules/')) continue;
      const base = entry.path.split('/').pop();
      if (base === 'package.json' || base === 'pubspec.yaml') paths.push(entry.path);
    }
    if (!res.headers.get('x-next-page')) break;
  }
  return paths;
}

function findNpmDependencies(packageJsonText) {
  let pkg;
  try {
    pkg = JSON.parse(packageJsonText);
  } catch {
    return [];
  }
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  return NPM_PACKAGES
    .filter((name) => name in allDeps)
    .map((name) => ({ name, version: allDeps[name] }));
}

function findPubDependencies(pubspecText) {
  const found = [];
  for (const name of PUB_PACKAGES) {
    const match = pubspecText.match(new RegExp(`^\\s*${name}\\s*:\\s*(.+)$`, 'm'));
    if (match) found.push({ name, version: match[1].trim() });
  }
  return found;
}

async function scanProject(project) {
  const ref = project.default_branch;
  if (!ref) return null;

  const manifestPaths = await findManifestPaths(project.id, ref);
  const manifests = [];

  for (const manifestPath of manifestPaths) {
    const content = await fetchRawFile(project.id, manifestPath, ref);
    if (!content) continue;
    const packages = manifestPath.endsWith('package.json')
      ? findNpmDependencies(content)
      : findPubDependencies(content);
    if (packages.length > 0) manifests.push({ path: manifestPath, packages });
  }

  if (manifests.length === 0) return null;

  return {
    project: project.path_with_namespace,
    webUrl: project.web_url,
    defaultBranch: ref,
    manifests,
  };
}

const CONCURRENCY = 4; // requisições de projetos em paralelo; mantido baixo pra evitar sobrecarga com repos grandes

async function scanProjectsWithProgress(projects) {
  const adopters = [];
  let done = 0;
  let index = 0;

  async function worker() {
    for (;;) {
      const i = index;
      index += 1;
      if (i >= projects.length) return;
      const project = projects[i];
      let result = null;
      try {
        result = await scanProject(project);
      } catch (err) {
        process.stdout.write(`\n  falha ao verificar ${project.path_with_namespace}: ${err.message}\n`);
      }
      done += 1;
      process.stdout.write(`\r  ${done}/${projects.length} projetos verificados...`);
      if (result) adopters.push(result);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n');
  return adopters;
}

async function main() {
  console.log(`Listando projetos do grupo "${GITLAB_GROUP}" em ${GITLAB_URL}...`);
  const projects = await listGroupProjects(GITLAB_GROUP);
  console.log(`${projects.length} projeto(s) encontrado(s). Verificando dependências do Giro DS...`);

  const adopters = await scanProjectsWithProgress(projects);

  console.table(
    adopters.flatMap((a) =>
      a.manifests.map((m) => ({
        projeto: a.project,
        arquivo: m.path,
        pacotes: m.packages.map((p) => `${p.name}@${p.version}`).join(', '),
      })),
    ),
  );

  const outDir = join(ROOT, 'reports', 'adoption-scan');
  mkdirSync(outDir, { recursive: true });
  const snapshot = {
    collectedAt: new Date().toISOString(),
    group: GITLAB_GROUP,
    projectsScanned: projects.length,
    adopters,
  };
  const fileName = `${new Date().toISOString().slice(0, 10)}.json`;
  writeFileSync(join(outDir, fileName), JSON.stringify(snapshot, null, 2));
  console.log(`\n${adopters.length} adotante(s) do Giro DS encontrado(s) de ${projects.length} projetos.`);
  console.log(`Snapshot salvo em reports/adoption-scan/${fileName}`);
}

main().catch((err) => {
  console.error('Falha ao descobrir adotantes:', err);
  process.exit(1);
});
