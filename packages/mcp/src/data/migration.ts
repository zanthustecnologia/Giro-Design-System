export interface PropDeprecation {
  component: string;
  prop: string;
  since: string;
  removedIn?: string;
  replacement?: string;
  note: string;
}

export const DEPRECATED_PROPS: PropDeprecation[] = [
  {
    component: 'Avatar',
    prop: 'size (small/large)',
    since: 'v3',
    replacement: "size='sm' | 'lg'",
    note: "Old string values 'small' and 'large' replaced by 'sm' and 'lg'",
  },
  {
    component: 'Dialog',
    prop: 'show',
    since: 'v3',
    replacement: 'open',
    note: 'Renamed to `open` when Dialog was refactored to Radix UI',
  },
  {
    component: 'Dialog',
    prop: 'onClose',
    since: 'v3',
    replacement: 'onCancel',
    note: 'Renamed to `onCancel`',
  },
  {
    component: 'Dialog',
    prop: 'fnConfirm',
    since: 'v3',
    replacement: 'onConfirm',
    note: 'Renamed from `fnConfirm` to `onConfirm`',
  },
  {
    component: 'Dialog',
    prop: 'fnCancel',
    since: 'v3',
    replacement: 'onCancel',
    note: 'Renamed from `fnCancel` to `onCancel`',
  },
  {
    component: 'Chips',
    prop: "type='default'",
    since: 'v4',
    replacement: "type='neutral'",
    note: "The value 'default' was removed; use 'neutral' instead",
  },
  {
    component: 'Container',
    prop: '(entire component)',
    since: 'v4',
    removedIn: 'v4',
    replacement: 'native layout + spacing tokens',
    note: 'Container component was removed in v4; use flex/grid layouts with --spacing-* tokens',
  },
];

export const MIGRATION_GUIDE = `# Giro DS — Migration Guide v2 → v3 → v4

## v3 Breaking Changes

### Avatar
- \`size\` agora aceita \`'sm' | 'lg'\` (era \`'small' | 'large'\`)
  - Antes: \`<Avatar size="small" />\`
  - Depois: \`<Avatar size="sm" />\`

### Dialog
- Removidos props: \`show\`, \`onClose\`
- Renomeados: \`fnConfirm\` → \`onConfirm\`, \`fnCancel\` → \`onCancel\`
- Agora baseado em Radix UI
  - Antes: \`<Dialog show={open} onClose={setOpen} fnConfirm={save} />\`
  - Depois: \`<Dialog open={open} onConfirm={save} onCancel={() => setOpen(false)} />\`

### Toast
- API totalmente reescrita — agora requer \`ToastProvider\`/\`ToastContainer\`
- Usa API baseada em objeto: \`showToast({ title, iconType, ... })\`
  - Antes: \`<Toast message="Salvo!" />\`
  - Depois: instalar \`ToastProvider\` na raiz e chamar \`showToast({ title: 'Salvo!' })\`

### Button
- Adicionado tooltip automático em modo \`iconOnly\` com as props \`tooltipText\`, \`tooltipSide\`, \`tooltipAlign\`

### Popover
- Novo componente baseado em Radix UI
- Padrão trigger/content

## v4 Breaking Changes

### Container (removido)
- O componente \`Container\` foi removido; use layouts nativos com tokens de spacing

### Chips (type)
- A prop \`type\` aceita: \`'neutral' | 'brand' | 'color' | 'success' | 'alert'\`
  - O valor \`'default'\` foi removido, use \`'neutral'\`

## Pacotes

\`\`\`bash
# Instalar a última versão
pnpm add @giro-ds/react@latest
pnpm add @giro-ds/tokens@latest
pnpm add @giro-ds/utilities@latest
\`\`\`

## Referências
- Changelog completo: https://github.com/zanthustecnologia/Giro-Design-System/blob/main/packages/react/CHANGELOG.md
- Storybook: https://giro-design-system.vercel.app
`;
