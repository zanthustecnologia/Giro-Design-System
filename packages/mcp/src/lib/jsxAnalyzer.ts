import { Project, SyntaxKind } from 'ts-morph';

export interface JsxElementUsage {
  component: string;
  propNames: string[];
  hasSpread: boolean;
}

// Reused across calls; in-memory files are added/forgotten per call so this never leaks source files.
const project = new Project({
  useInMemoryFileSystem: true,
  skipAddingFilesFromTsConfig: true,
});

let fileCounter = 0;

/**
 * Finds JSX usages of the given component names via the TypeScript AST (ts-morph),
 * instead of regexes — correctly handles multi-line JSX, spread props ({...props}),
 * and attribute-like text inside string/template literals.
 */
export function findJsxUsages(
  code: string,
  componentNames: Set<string>,
): JsxElementUsage[] {
  const sourceFile = project.createSourceFile(`snippet-${fileCounter++}.tsx`, code, {
    overwrite: true,
  });

  try {
    const elements = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ];

    const usages: JsxElementUsage[] = [];
    for (const el of elements) {
      const tagName = el.getTagNameNode().getText();
      if (!componentNames.has(tagName)) continue;

      const attributes = el.getAttributes();
      const hasSpread = attributes.some(
        (a) => a.getKind() === SyntaxKind.JsxSpreadAttribute,
      );
      const propNames = attributes
        .filter((a) => a.getKind() === SyntaxKind.JsxAttribute)
        .map((a) => a.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText());

      usages.push({ component: tagName, propNames, hasSpread });
    }
    return usages;
  } catch {
    // Malformed/unparsable snippet: fall back to reporting no usages rather than crashing the tool.
    return [];
  } finally {
    sourceFile.forget();
  }
}
