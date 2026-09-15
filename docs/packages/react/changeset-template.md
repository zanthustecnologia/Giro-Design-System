Ao gerar uma nova entrada de changelog para este projeto, priorize concisão e consistência. Não use emojis nem travessão.

Gere apenas a entrada da nova versão, sem reestruturar versões anteriores do arquivo.

## Estrutura de seções

Use as seções abaixo, incluindo apenas as que tiverem conteúdo:

```md
## [x.y.z]

### Breaking Changes

### Features

### Changed

### Deprecated

### Removed

### Bug Fixes
```

Mapeamento de tipos para o Storybook:
- `Breaking Changes` e `Removed` contam como **breaking**
- `Features` e `Changed` contam como **feature**
- `Bug Fixes` e `Deprecated` contam como **fix**

## Formato das entradas

Dentro de cada seção, use bullet points com o nome do componente em negrito:

```md
### Features

- **ComponenteA:** descrição concisa do que foi adicionado.
- **ComponenteB:** descrição concisa.

### Bug Fixes

- **ComponenteA:** descrição concisa da correção.
```

Escreva uma linha por componente. Quando várias mudanças pertencem ao mesmo componente, agrupe em um único bullet usando ponto-e-vírgula.

## Data

Se disponível: `## [x.y.z] - YYYY-MM-DD`. Se não: `## [x.y.z]`.

## Regras gerais

- Não invente alterações, componentes, props ou impactos.
- Use apenas informações fornecidas nos commits, changesets ou descrição da release.
- Não crie seções vazias.

## Exemplo

```md
## [9.0.0]

### Breaking Changes

- **Filter:** renomeia `type="checkbox"` → `type="multiple"` e `type="text"` → `type="single"`.

### Features

- **Filter:** adiciona modo `combined` via prop `mode`; no modo combined o filtro abre um `Drawer` com botões "Aplicar" e "Limpar" fixos no rodapé.
- **Drawer:** adiciona prop `footer` para conteúdo fixo abaixo da área rolável.
- **Search:** adiciona prop `searchMode` (`'instant'` | `'on-enter'`) e callback `onSearch`.
- **TableV2:** adiciona `header.searchValue`, `header.onSearchChange`, `footer.manualPagination` e suporte a `CombinedFilterItem`; `enableRowSelection` agora aceita função `(row, index) => boolean`.

### Removed

- **TableV2:** remove prop `enableFilters`.

### Bug Fixes

- **Label:** corrige altura do ícone de tooltip trocando `inline-block` por `inline-flex` no `.triggerWrapper`.
```

A partir das mudanças informadas, gere uma entrada nova de changelog seguindo exatamente esse padrão.