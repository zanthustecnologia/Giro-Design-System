# @giro-ds/mcp

## [1.2.0]

### Added

#### MCP

Adiciona a tool `review-giro-file`: analisa arquivos `.tsx/.jsx/.ts/.js/.css/.scss`, detecta props inválidas, props obrigatórias ausentes e valores CSS hardcoded, aplica auto-fixes para props depreciadas e retorna o código corrigido.

Adiciona `ARCHITECTURE.md` com documentação da stack, estrutura de pastas, fluxo de dados e roadmap de evolução.

Atualiza metadados com as novas props do `VirtualKeyboard` (`showEnterKey`, `textFieldScale`).

### Changed

#### MCP

Refatoração arquitetural do `src/index.ts` (657 → 147 linhas). Lógica das tools extraída para `src/tools/`; busca semântica e serialização para `src/lib/`; dados React isolados em `src/data/react/`.

## 1.1.0

### Added

#### MCP

Adiciona metadados dos componentes `Card`, `Menu`, `Modal`, `Popover`, `TableV2`, `TextArea` e `VirtualKeyboard`, que passam a estar disponiveis para consulta via MCP Inspector.

Adiciona script `inspect` ao `package.json` para facilitar depuracao via MCP Inspector.

### Changed

#### MCP

Atualiza metadados de props e descricoes dos componentes `Avatar`, `Badge`, `Calendar`, `Callout`, `Chips`, `Container`, `DatePicker`, `Dialog`, `Drawer`, `Filter`, `ListItem`, `Quantity`, `Search`, `TextField`, `Toast`, `Tooltip` e `Button` para refletir o estado atual do `@giro-ds/react` apos o refactor v11.0.0.

O script `generate.ts` foi corrigido para suportar type aliases, heranca de props de interfaces da mesma fonte, multiplas convencoes de nomeacao de arquivos de tipos e normalizacao de line endings Windows nos exemplos JSDoc.

### Removed

#### MCP

Remove os metadados do componente `Dropdown`, descontinuado no pacote React.
