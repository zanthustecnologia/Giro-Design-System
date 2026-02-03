---
'@giro-ds/react': major
---

# Breaking Changes & New Features v3.0.0

## 💥 Breaking Changes

### DropdownMenu
- **REMOVED** props: `enableIcon` and `enableSubText`
- **WHY**: Simplified API - icons and subtexts are now automatically rendered when provided in items
- **HOW TO MIGRATE**: Remove these props from your code. Icons/subtexts will render automatically if present in item data

### Button
- **CHANGED** `iconPosition` enum: removed `'none'`, added `'both'`
- **WHY**: `'none'` was redundant (just omit the prop). `'both'` enables icons on both sides
- **HOW TO MIGRATE**: Replace `iconPosition="none"` by omitting the prop entirely

### Select
- **CHANGED** prop: `onChange` → `onValueChange`
- **CHANGED** signature: `(e: ChangeEvent) => void` → `(value: string) => void`
- **WHY**: Alignment with Radix UI patterns, simpler API (no need to extract e.target.value)
- **HOW TO MIGRATE**: Rename prop and adjust handler to receive value directly instead of event

## ✨ New Features

### Switch
- Props `defaultChecked` and `disabled` are now **optional** (previously required)
- Improves DX by allowing sensible defaults

### Table
- Added indeterminate state to "Select All" checkbox
- New optional prop `disableSelectAll` in `rowSelection`
- Generic type support: `<Table<T>>` for full type-safety
- Enhanced TypeScript documentation with JSDoc

## 📖 Migration Guide
See detailed migration guide at: `docs/react/migration-guide-v2-to-v3.md`
