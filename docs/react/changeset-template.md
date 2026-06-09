Ao gerar uma nova entrada de changelog para este projeto, siga o padrão Keep a Changelog 1.1.0, mas priorize legibilidade editorial. Não use emojis nem travessão. 

Gere apenas a entrada da nova versão, sem reestruturar versões anteriores do arquivo.

Use a seguinte estrutura:

md
## [x.y.z]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security



Inclua apenas as categorias que tiverem conteúdo. Não crie seções vazias.

Dentro de cada categoria, agrupe as mudanças por componente usando subtítulos de quarto nível:


md
### Added

#### Filter

Texto da mudança.

#### TableV2

Texto da mudança.



Evite criar um bullet separado para cada prop quando as mudanças pertencem ao mesmo componente. Prefira parágrafos curtos e coesos, explicando o que mudou e qual é o impacto prático para quem consome a biblioteca.

Use linguagem objetiva, técnica e orientada ao usuário da API. Evite frases repetitivas como “adiciona a prop...” em sequência. Quando várias props forem adicionadas no mesmo componente, explique o conjunto da mudança em um único bloco.

Para mudanças de API, registre na categoria correta:

use Added para novas props, novos componentes, novos exports ou novos comportamentos compatíveis;
use Changed para alteração de comportamento, renomeação de API, mudança de valor aceito ou ajuste em contrato existente;
use Deprecated quando algo ainda existe, mas não deve mais ser usado;
use Removed quando props, exports, componentes ou comportamentos forem removidos;
use Fixed para correções de bug, acessibilidade, layout, estilo, comportamento ou tipagem;
use Security apenas para correções relacionadas a segurança.

Quando houver breaking change, deixe a migração clara. Para renomeações simples, prefira tabela:


md
| Antes | Depois |
| --- | --- |
| `type="checkbox"` | `type="multiple"` |
| `type="text"` | `type="single"` |



Use bloco de código apenas quando uma tabela não for suficiente para explicar a migração. Evite misturar muitos bullets, texto e código dentro da mesma mudança.

Não invente alterações, componentes, props, datas ou impactos. Use apenas as informações fornecidas nos commits, changesets, pull requests ou descrição da release.

Se a data da versão estiver disponível, use o formato:


md
## [x.y.z] - YYYY-MM-DD



Se a data não estiver disponível, mantenha apenas:


md
## [x.y.z]



Exemplo de estilo esperado:


md
## [9.0.0]

### Added

#### Filter

Adiciona o modo `combined` por meio da nova prop `mode`, que aceita os valores `simple` e `combined`. No modo `combined`, o filtro abre um `Drawer`, recebe conteúdo por `children` e mantém os botões "Aplicar" e "Limpar" fixos no rodapé.

#### TableV2

Adiciona suporte a busca server-side, paginação manual, seleção condicional de linhas e integração com o filtro combinado.

A busca server-side pode ser controlada por `header.searchValue` e `header.onSearchChange`. A paginação manual passa a ser controlada por `footer.manualPagination`, desativando filtro e fatiamento client-side. A prop `enableRowSelection` agora também aceita uma função `(row: T, index: number) => boolean`, permitindo desabilitar checkboxes em linhas específicas.

### Changed

#### Filter

Renomeia os valores de `FilterType` para tornar a API mais alinhada ao comportamento do componente.

| Antes | Depois |
| --- | --- |
| `type="checkbox"` | `type="multiple"` |
| `type="text"` | `type="single"` |

### Removed

#### TableV2

Remove a prop `enableFilters`. Os filtros individuais por coluna foram descontinuados em favor do filtro global configurado via `header`.

### Fixed

#### Label

Corrige a altura do ícone de tooltip ao alterar o `.triggerWrapper` de `display: inline-block` para `display: inline-flex`, evitando altura incorreta causada pelo `line-height` padrão do navegador.

Também adiciona `margin-bottom: 4px` para alinhar o ícone de tooltip ao Figma.



A partir das mudanças informadas, gere uma entrada nova de changelog seguindo exatamente esse padrão.