# @giro-ds/mcp

## [1.2.1]

### Changed

- **MCP:** adiciona script `ensure-mcp-release.mjs`, executado antes de `changeset:version`, que cria automaticamente um changeset de patch para o MCP sempre que houver release do `@giro-ds/react` ou `@giro-ds/tokens`, mantendo os metadados sincronizados.

### Bug Fixes

- **MCP:** corrige a geração de metadados para suportar union/intersection types locais em `Button`, `Select`, `TextArea`, `TextField` e `ToggleButton`, sem marcar props específicas de variante como globalmente obrigatórias.

## [1.2.0]

### Features

- **MCP:** adiciona tool `review-giro-file` para análise e auto-fix de arquivos `.tsx/.jsx/.ts/.js/.css/.scss`
- **Docs:** adiciona `ARCHITECTURE.md` com documentação da stack e roadmap

### Changed

- **MCP:** refatora `src/index.ts` (657 → 147 linhas); lógica extraída para `src/tools/`, `src/lib/` e `src/data/react/`
- **Metadados:** atualiza props do `VirtualKeyboard` (`showEnterKey`, `textFieldScale`)

## [1.1.0]

### Features

- **Metadados:** adiciona componentes `Card`, `Menu`, `Modal`, `Popover`, `TableV2`, `TextArea` e `VirtualKeyboard`
- **Scripts:** adiciona script `inspect` ao `package.json`

### Changed

- **Metadados:** atualiza `Avatar`, `Badge`, `Calendar`, `Callout`, `Chips`, `Container`, `DatePicker`, `Dialog`, `Drawer`, `Filter`, `ListItem`, `Quantity`, `Search`, `TextField`, `Toast`, `Tooltip` e `Button` para refletir o estado pós v11.0.0
- **Build:** corrige `generate.ts` para suportar type aliases, herança de interfaces e múltiplas convenções de nomeação

### Removed

- **Metadados:** remove componente `Dropdown` descontinuado
