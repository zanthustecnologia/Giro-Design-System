/**
 * generate.ts — Auto-generates src/data/components.ts from .types.ts source files
 * Run: pnpm --filter @giro-ds/mcp generate
 */
import { Project, InterfaceDeclaration, JSDocableNode, PropertySignature } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'fs';

const COMPONENTS_DIR = path.resolve('../../packages/react/src/components');
const OUTPUT_FILE = path.resolve('src/data/components.generated.ts');

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
          .replace(/^@example\s*/, '')
          .replace(/```tsx?\n?/, '')
          .replace(/```$/, '')
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

  // Find the main Props interface (ComponentNameProps)
  const propsInterface = sourceFile.getInterface(`${componentName}Props`) as InterfaceDeclaration | undefined;
  if (!propsInterface) return null;

  const description = extractJsDocComment(propsInterface as unknown as JSDocableNode);
  const examples = extractExamples(propsInterface as unknown as JSDocableNode);

  const props: PropEntry[] = propsInterface.getProperties().map((prop) => {
    const propDescription = extractJsDocComment(prop as unknown as JSDocableNode);
    const typeText = getTypeText(prop);
    const isOptional = prop.hasQuestionToken();

    // Extract @default, @since, @deprecated from JSDoc
    let defaultValue: string | undefined;
    let since: string | undefined;
    let deprecated: string | undefined;
    const jsDocs = (prop as unknown as JSDocableNode).getJsDocs?.() ?? [];
    for (const doc of jsDocs) {
      for (const tag of doc.getTags()) {
        const tagName = tag.getTagName();
        if (tagName === 'default') defaultValue = tag.getCommentText()?.trim();
        if (tagName === 'since') since = tag.getCommentText()?.trim();
        if (tagName === 'deprecated') deprecated = tag.getCommentText()?.trim() || 'deprecated';
      }
    }

    return {
      name: prop.getName(),
      type: typeText,
      required: !isOptional,
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
    const typesFile = path.join(COMPONENTS_DIR, componentName, `${componentName}.types.ts`);
    if (!fs.existsSync(typesFile)) continue;

    try {
      const entry = parseComponent(typesFile, componentName);
      if (entry) {
        entries.push(entry);
        console.log(`✅ ${componentName} — ${entry.props.length} props`);
      } else {
        console.warn(`⚠️  ${componentName} — interface ${componentName}Props not found`);
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
