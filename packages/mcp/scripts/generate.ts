/**
 * generate.ts — Auto-generates src/data/components.generated.ts from .types.ts source files
 * Run: pnpm --filter @giro-ds/mcp generate
 */
import { Project, JSDocableNode, PropertySignature } from 'ts-morph';
import { collectProps } from './lib/collect-props.js';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COMPONENTS_DIR = path.resolve(__dirname, '../../react/src/components');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/components.generated.ts');

const SKIP_DIRS = ['.deprecated'];

interface PropEntry {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  since?: string;
  deprecated?: string;
}

interface ComponentEntry {
  name: string;
  description: string;
  category: string;
  props: PropEntry[];
  examples: string[];
  keywords: string[];
}

function extractJsDocComment(node: JSDocableNode): string {
  const docs = node.getJsDocs();
  if (!docs.length) return '';
  return docs.map(d => d.getDescription().trim()).join(' ').trim();
}

function extractExamples(node: JSDocableNode): string[] {
  const docs = node.getJsDocs();
  const examples: string[] = [];
  for (const doc of docs) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'example') {
        const text = tag.getText()
          .replace(/\r\n/g, '\n')          // normalize Windows line endings
          .replace(/^@example\s*/m, '')    // remove @example prefix
          .replace(/^\s*\*\s?/gm, '')      // strip JSDoc * prefixes from each line
          .replace(/^```tsx?\n/, '')       // remove opening code fence
          .replace(/\n```\s*$/, '')        // remove closing code fence
          .trim();
        if (text) examples.push(text);
      }
    }
  }
  return examples;
}

function getTypeText(prop: PropertySignature): string {
  try {
    return prop.getTypeNode()?.getText() ?? prop.getType().getText();
  } catch {
    return 'unknown';
  }
}

function deriveKeywords(name: string, description: string): string[] {
  const words = `${name} ${description}`.toLowerCase()
    .replace(/[^a-záàâãéèêíïóôõöúüç\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  return [...new Set(words)];
}

function parseComponent(typesFile: string, componentName: string): ComponentEntry | null {
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFileAtPath(typesFile);
  const sourceFile = project.getSourceFile(typesFile)!;

  const declaration = sourceFile.getInterface(`${componentName}Props`)
    ?? sourceFile.getTypeAlias(`${componentName}Props`);
  if (!declaration) return null;

  const collected = collectProps(declaration);
  const description = extractJsDocComment(declaration);
  const examples = [...new Set(collected.docs.flatMap(extractExamples))];

  const props: PropEntry[] = [...collected.props].map(([name, entry]) => {
    const prop = entry.declarations.find(p => getTypeText(p) !== 'never') ?? entry.declarations[0];
    const propDescription = extractJsDocComment(prop as unknown as JSDocableNode);
    const typeText = entry.type;

    // Extract @default, @since, @deprecated from JSDoc
    let defaultValue: string | undefined;
    let since: string | undefined;
    let deprecated: string | undefined;
    const jsDocs = entry.declarations.flatMap(p => p.getJsDocs());
    for (const doc of jsDocs) {
      for (const tag of doc.getTags()) {
        const tagName = tag.getTagName();
        if (tagName === 'default') defaultValue = tag.getCommentText()?.trim();
        if (tagName === 'since') since = tag.getCommentText()?.trim();
        if (tagName === 'deprecated') deprecated = tag.getCommentText()?.trim() || 'deprecated';
      }
    }

    return {
      name,
      type: typeText,
      required: entry.required,
      ...(defaultValue && { defaultValue }),
      description: propDescription,
      ...(since && { since }),
      ...(deprecated && { deprecated }),
    };
  });

  return {
    name: componentName,
    description,
    category: 'Components',
    props,
    examples,
    keywords: deriveKeywords(componentName, description),
  };
}

function main() {
  const entries: ComponentEntry[] = [];

  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !SKIP_DIRS.includes(d.name))
    .map(d => d.name);

  for (const componentName of componentDirs) {
    // Try multiple naming conventions for the types file
    const typesFileCandidates = [
      path.join(COMPONENTS_DIR, componentName, `${componentName}.types.ts`),
      path.join(COMPONENTS_DIR, componentName, `${componentName}.type.ts`),
      // Fallback: first *.types.ts or *.type.ts file in the directory
      ...fs.readdirSync(path.join(COMPONENTS_DIR, componentName))
        .filter(f => /\.types?\.ts$/.test(f) && !f.includes('.test.') && !f.includes('.spec.'))
        .map(f => path.join(COMPONENTS_DIR, componentName, f)),
    ];
    const typesFile = typesFileCandidates.find(f => fs.existsSync(f));
    if (!typesFile) continue;

    try {
      const entry = parseComponent(typesFile, componentName);
      if (entry) {
        entries.push(entry);
        console.log(`✅ ${componentName} — ${entry.props.length} props`);
      } else {
        console.warn(`⚠️  ${componentName} — declaration ${componentName}Props not found`);
      }
    } catch (err) {
      console.error(`❌ ${componentName} — ${err}`);
    }
  }

  const output = `// AUTO-GENERATED — do not edit manually
// Run: pnpm --filter @giro-ds/mcp generate
import type { ComponentMetadata } from '../types.js';

export const COMPONENTS: ComponentMetadata[] = ${JSON.stringify(entries, null, 2)};

export const COMPONENT_NAMES = COMPONENTS.map((c) => c.name);
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\n✨ Generated ${entries.length} components → ${OUTPUT_FILE}`);
}

main();
