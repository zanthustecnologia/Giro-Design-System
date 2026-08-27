#!/usr/bin/env node
// Diagnóstico pontual pra descobrir por que um projeto específico não
// apareceu no scan do discover-adopters.mjs: lista quantas páginas/entradas
// a árvore do repo tem, quais manifests foram achados, e procura por
// qualquer menção a "giro" nos manifests (mesmo fora do formato que o
// discover-adopters.mjs sabe parsear), pra pegar casos como dependência
// via git: multi-linha no pubspec.yaml.
//
// Uso: node scripts/debug-adopter.mjs web/nome-do-projeto

const GITLAB_URL = (process.env.GITLAB_URL ?? 'https://gitlab.zanthus.com.br').replace(/\/$/, '');
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const projectPath = process.argv[2];

if (!GITLAB_TOKEN) {
  console.error('Defina GITLAB_TOKEN antes de rodar.');
  process.exit(1);
}
if (!projectPath) {
  console.error('Uso: node scripts/debug-adopter.mjs <namespace/projeto>');
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

async function main() {
  const projectRes = await gitlabApi(`/projects/${encodeURIComponent(projectPath)}`);
  if (!projectRes) {
    console.log(`Projeto "${projectPath}" não encontrado (404) — verifique se seu token tem acesso a ele.`);
    return;
  }
  const project = await projectRes.json();
  console.log(`Projeto: ${project.path_with_namespace} (id=${project.id}), default_branch=${project.default_branch}, archived=${project.archived}`);

  if (!project.default_branch) {
    console.log('Sem default_branch — repo vazio? scan pularia esse projeto.');
    return;
  }

  const allEntries = [];
  let page = 1;
  for (;;) {
    const res = await gitlabApi(
      `/projects/${project.id}/repository/tree?recursive=true&ref=${encodeURIComponent(project.default_branch)}&per_page=100&page=${page}`,
    );
    if (!res) break;
    const batch = await res.json();
    if (batch.length === 0) break;
    allEntries.push(...batch);
    if (!res.headers.get('x-next-page')) break;
    page += 1;
  }
  console.log(`Árvore completa: ${allEntries.length} entradas em ${page} página(s).`);

  const manifestPaths = allEntries
    .filter((e) => e.type === 'blob' && !e.path.includes('node_modules/'))
    .filter((e) => {
      const base = e.path.split('/').pop();
      return base === 'package.json' || base === 'pubspec.yaml';
    })
    .map((e) => e.path);
  console.log(`Manifests encontrados (package.json/pubspec.yaml): ${manifestPaths.length}`);
  manifestPaths.forEach((p) => console.log(`  - ${p}`));

  for (const manifestPath of manifestPaths) {
    const fileRes = await gitlabApi(
      `/projects/${project.id}/repository/files/${encodeURIComponent(manifestPath)}/raw?ref=${encodeURIComponent(project.default_branch)}`,
    );
    if (!fileRes) continue;
    const content = await fileRes.text();
    const giroLines = content.split('\n').filter((line) => /giro/i.test(line));
    console.log(`\n=== ${manifestPath} — linhas contendo "giro" ===`);
    if (giroLines.length === 0) {
      console.log('  (nenhuma)');
    } else {
      giroLines.forEach((l) => console.log(`  ${l.trim()}`));
    }
  }

  if (manifestPaths.length === 0) {
    const anyGiroFile = allEntries.find((e) => e.type === 'blob' && /giro/i.test(e.path));
    console.log('\nNenhum manifest achado. Arquivo com "giro" no caminho (se houver):', anyGiroFile?.path ?? 'nenhum');
  }
}

main().catch((err) => {
  console.error('Falha no diagnóstico:', err);
  process.exit(1);
});
