#!/usr/bin/env node
// Audita a adoção do Giro DS em uma base de código: quais componentes de
// @giro-ds/react são usados (e com que frequência) e a proporção de valores
// hardcoded vs. tokens (var(--...)) em CSS/SCSS. Serve como proxy de adoção
// e de ROI (menos CSS custom = menos manutenção).
//
// Uso: node scripts/audit-usage.mjs [caminho]
//   caminho pode ser um app deste monorepo (ex: apps/hub) ou um repositório
//   externo qualquer que consuma @giro-ds/react — o script não depende de
//   nada além de Node.

import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'fs';
import { extname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const IGNORED_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.turbo', '.next', '.astro']);
const CODE_EXTENSIONS = new Set(['.tsx', '.jsx', '.ts', '.js']);
const STYLE_EXTENSIONS = new Set(['.css', '.scss']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function extractImportedComponents(source) {
  const names = [];
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@giro-ds\/react['"]/g;
  let match;
  while ((match = importRegex.exec(source))) {
    for (const raw of match[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (name) names.push(name);
    }
  }
  return names;
}

function countTagOccurrences(source, tagName) {
  const tagRegex = new RegExp(`<${tagName}[\\s/>]`, 'g');
  return (source.match(tagRegex) ?? []).length;
}

function auditComponents(files) {
  const usage = new Map(); // componentName -> { files: Set, occurrences: number }
  let filesImportingDs = 0;

  for (const file of files) {
    if (!CODE_EXTENSIONS.has(extname(file))) continue;
    const source = readFileSync(file, 'utf-8');
    const components = extractImportedComponents(source);
    if (components.length === 0) continue;
    filesImportingDs += 1;

    for (const name of components) {
      const occurrences = countTagOccurrences(source, name);
      const entry = usage.get(name) ?? { files: new Set(), occurrences: 0 };
      entry.files.add(file);
      entry.occurrences += occurrences;
      usage.set(name, entry);
    }
  }

  return { usage, filesImportingDs };
}

function auditTokens(files) {
  let tokenVarUsages = 0;
  let hardcodedHexColors = 0;
  let hardcodedPxValues = 0;
  let filesScanned = 0;

  const varRegex = /var\(--/g;
  const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
  const pxRegex = /\b\d+(\.\d+)?px\b/g;

  for (const file of files) {
    if (!STYLE_EXTENSIONS.has(extname(file))) continue;
    filesScanned += 1;
    const source = readFileSync(file, 'utf-8');
    tokenVarUsages += (source.match(varRegex) ?? []).length;
    hardcodedHexColors += (source.match(hexRegex) ?? []).length;
    hardcodedPxValues += (source.match(pxRegex) ?? []).length;
  }

  return { tokenVarUsages, hardcodedHexColors, hardcodedPxValues, filesScanned };
}

function printReport(targetLabel, files, componentAudit, tokenAudit) {
  const totalHardcoded = tokenAudit.hardcodedHexColors + tokenAudit.hardcodedPxValues;
  const totalTokenSignals = tokenAudit.tokenVarUsages + totalHardcoded;
  const tokenAdoptionRatio = totalTokenSignals === 0
    ? null
    : (tokenAudit.tokenVarUsages / totalTokenSignals);

  console.log(`\n=== Auditoria de uso do Giro DS: ${targetLabel} ===`);
  console.log(`Arquivos de código analisados: ${files.filter((f) => CODE_EXTENSIONS.has(extname(f))).length}`);
  console.log(`Arquivos que importam @giro-ds/react: ${componentAudit.filesImportingDs}`);

  const rows = [...componentAudit.usage.entries()]
    .sort((a, b) => b[1].occurrences - a[1].occurrences)
    .map(([name, entry]) => ({
      componente: name,
      arquivos: entry.files.size,
      ocorrencias: entry.occurrences,
    }));
  console.table(rows);

  console.log(`\nArquivos CSS/SCSS analisados: ${tokenAudit.filesScanned}`);
  console.log(`Usos de tokens (var(--...)): ${tokenAudit.tokenVarUsages}`);
  console.log(`Cores hex hardcoded: ${tokenAudit.hardcodedHexColors}`);
  console.log(`Valores px hardcoded: ${tokenAudit.hardcodedPxValues}`);
  if (tokenAdoptionRatio !== null) {
    console.log(`Proxy de adoção de tokens: ${(tokenAdoptionRatio * 100).toFixed(1)}%`);
  }
  console.log(
    '\nAviso: "hardcoded" é uma proxy (regex), não um linter real — use packages/mcp' +
    ' (tool review-giro-css) para uma análise precisa arquivo a arquivo.',
  );

  return { rows, tokenAdoptionRatio };
}

function main() {
  const targetArg = process.argv[2] ?? '.';
  const targetPath = join(ROOT, targetArg);
  const files = walk(targetPath);

  const componentAudit = auditComponents(files);
  const tokenAudit = auditTokens(files);
  const { rows, tokenAdoptionRatio } = printReport(targetArg, files, componentAudit, tokenAudit);

  const outDir = join(ROOT, 'reports', 'usage-audit');
  mkdirSync(outDir, { recursive: true });
  const safeName = targetArg.replace(/[\\/]/g, '_') || 'root';
  const fileName = `${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
  writeFileSync(
    join(outDir, fileName),
    JSON.stringify(
      {
        target: targetArg,
        collectedAt: new Date().toISOString(),
        filesImportingDs: componentAudit.filesImportingDs,
        componentUsage: rows,
        tokenAudit: { ...tokenAudit, tokenAdoptionRatio },
      },
      null,
      2,
    ),
  );
  console.log(`\nSnapshot salvo em reports/usage-audit/${fileName}`);
}

main();
