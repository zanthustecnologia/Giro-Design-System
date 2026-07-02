/**
 * React platform component data — merges auto-generated and static entries.
 *
 * Generated data (from scripts/extract-react.ts) takes precedence.
 * Static data (components-static.ts) fills gaps for components that
 * cannot be auto-generated (e.g. Button's complex union type).
 *
 * To regenerate: pnpm --filter @giro-ds/mcp generate
 */
import { COMPONENTS as STATIC } from '../components.js';
import { COMPONENTS as GENERATED } from '../components.generated.js';
import type { ComponentMetadata } from '../../types.js';

const generatedNames = new Set(GENERATED.map((c) => c.name));

export const COMPONENTS: ComponentMetadata[] = [
  ...GENERATED,
  ...STATIC.filter((c) => !generatedNames.has(c.name)),
];

export const COMPONENT_NAMES: string[] = COMPONENTS.map((c) => c.name).sort();
