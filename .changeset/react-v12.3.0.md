---
"@giro-ds/react": minor
---

### Features

- **Select:** adiciona scroll infinito com carregamento paginado e props para busca via API.
- **Modal:** adiciona prop `closingButton` (padrão: `true`) para controlar a visibilidade do botão de fechar.
- **Components:** adiciona aliases com prefixo `G_` para todos os componentes exportados (ex.: `G_Button`, `G_Select`).
- **VirtualKeyboard:** substitui botão `_` por botão de espaço com ícone `Spacebar20Regular` no layout `numpadWithEnter`.

### Changed

- **ToggleButton:** substitui prop `children` por `label: string` no modo `simple`; remove prop `orientation` do `ToggleGroup`; remove tipo exportado `ToggleButtonOrientation`.
- **Modal:** header renderizado condicionalmente (apenas quando há `title`, `headerContent` ou `closingButton` presente); animação de entrada adicionada para modo fullscreen.
- **TextField:** remove prop `persistIcon` (workaround não mais necessário após correção do comportamento padrão).

### Bug Fixes

- **Button:** tooltip (`tooltipText`) agora exibido em todos os estados, não apenas quando `iconOnly` está ativo.
- **Checkbox:** geração de ID único por instância.
- **Dialog:** `bodyContent` agora envolvido em `<div>` para layout correto.
- **Toast:** correção de memory leak no timer de dismiss.
- **TextField:** corrige comportamento do ícone customizado após perda de foco; remove hover indevido no ícone customizado; corrige sobreposição do botão X sobre o ícone customizado.
- **Modal:** `Dialog.Title` renderizado incondicionalmente, corrigindo aviso de acessibilidade do Radix UI.
- **VirtualKeyboard:** corrige substituição indevida de `{shift}` por `{bksp}` em layouts com backspace existente; corrige cálculo de comprimento de tecla para suporte a Unicode/emoji.
- **Button, FileUpload, Search, Select, TextArea, TextField:** adiciona compatibilidade com React 19 via shim `forwardRef`; `peerDependency` `react: >=18.0.0` mantida.
