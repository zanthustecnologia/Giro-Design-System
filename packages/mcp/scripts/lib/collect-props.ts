import { Node, type JSDocableNode, type PropertySignature } from 'ts-morph';

interface Prop {
  declarations: PropertySignature[];
  type: string;
  required: boolean;
}

/** Flatten the public prop catalogue; conditional requirements remain in JSDoc.
 * Only follow declarations in this file, keeping React's HTML attributes out.
 */
export function collectProps(root: Node) {
  const source = root.getSourceFile();
  const docs = new Set<JSDocableNode>();

  function merge(parts: Map<string, Prop>[], union: boolean): Map<string, Prop> {
    const result = new Map<string, Prop>();
    for (const name of new Set(parts.flatMap(part => [...part.keys()]))) {
      const entries = parts.map(part => part.get(name)).filter((p): p is Prop => !!p);
      const types = [...new Set(entries.map(p => p.type))];
      const usable = union ? types.filter(type => type !== 'never') : types;
      result.set(name, {
        declarations: [...new Set(entries.flatMap(p => p.declarations))],
        type: usable.length > 1 ? usable.map(type => `(${type})`).join(union ? ' | ' : ' & ') : usable[0] ?? 'never',
        required: union
          ? entries.length === parts.length && entries.every(p => p.required)
          : entries.some(p => p.required),
      });
    }
    return result;
  }

  function visit(node: Node | undefined, ancestors = new Set<Node>()): Map<string, Prop> {
    if (!node || ancestors.has(node)) return new Map();
    const next = new Set(ancestors).add(node);
    if (Node.isInterfaceDeclaration(node) || Node.isTypeAliasDeclaration(node)) docs.add(node);
    if (Node.isTypeAliasDeclaration(node)) return visit(node.getTypeNode(), next);
    if (Node.isParenthesizedTypeNode(node)) return visit(node.getTypeNode(), next);
    if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
      return merge(node.getTypeNodes().map(child => visit(child, next)), Node.isUnionTypeNode(node));
    }
    if (Node.isTypeReference(node) || Node.isExpressionWithTypeArguments(node)) {
      const name = Node.isTypeReference(node) ? node.getTypeName().getText() : node.getExpression().getText();
      // Imported types and generic utilities are intentionally not expanded.
      if (node.getTypeArguments().length) return new Map();
      return visit(source.getInterface(name) ?? source.getTypeAlias(name), next);
    }
    if (Node.isInterfaceDeclaration(node) || Node.isTypeLiteral(node)) {
      const inherited = Node.isInterfaceDeclaration(node)
        ? merge(node.getExtends().map(base => visit(base, next)), false)
        : new Map<string, Prop>();
      for (const prop of node.getProperties()) {
        inherited.set(prop.getName(), {
          declarations: [prop],
          type: prop.getTypeNode()?.getText() ?? prop.getType().getText(),
          required: !prop.hasQuestionToken(),
        });
      }
      return inherited;
    }
    return new Map();
  }

  const props = visit(root);
  return { props, docs: [...docs] };
}
