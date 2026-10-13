# Hardening do `Select` — Notas de análise

## 1. Revisão das propriedades públicas

| Prop | Observação |
|---|---|
| `multiple` | Documentada e tipada (`SelectPropsBase.multiple`), inclusive com `@example` mostrando `multiple={true}` como se habilitasse seleção múltipla. Na implementação real, **não é lida em nenhum lugar** de `Select.tsx`/`useSelectLogic.ts` — quem decide seleção múltipla é exclusivamente `variant === 'checkbox'`. Por não ser desestruturada no componente, `multiple` cai em `...rest` e é espalhada sobre `SelectRadix.Root`, que não reconhece essa prop (Radix `Select` é single-select nativo). Prop morta hoje; documentação induz a erro. |
| `enableApiSearch` (`@deprecated`) | Emite `console.warn` em dev avisando que a busca remota passará a ser identificada só pela presença de `onApiSearch`. Hoje `isApiSearch = enableApiSearch ?? Boolean(onApiSearch)` — ou seja, **`enableApiSearch` explícito ainda tem precedência** sobre `onApiSearch`. Há inclusive um segundo `console.warn` só para o caso `enableApiSearch={false}` + `onApiSearch` presente, avisando que "futuramente o comportamento irá mudar" — uma breaking change já anunciada em código mas sem janela/versão definida. |
| `'aria-label'` | Usa a chave nativa do HTML diretamente (`'aria-label': ariaLabel`), diferente de `Button`/`Radio`, que usam a prop customizada `ariaLabel` (camelCase). É uma terceira convenção coexistindo no DS (ver seção 2). Também só é aplicada ao `SelectRadix.Trigger` — não há `aria-label`/`aria-labelledby` equivalente para o `Content`/`Viewport` (lista de opções) quando não há `label` visível. |
| `error` / `errorMessage` | `error` (prop externa/controlada) é sincronizada para o estado interno `hasError` via `useEffect`, mas o mesmo `hasError` também é setado internamente pela validação de `required` ao fechar (`VALIDATE` no reducer). As duas fontes escrevem no mesmo campo de estado sem prioridade documentada — se o consumidor limpar `error` externamente mas o campo continuar vazio e `required`, o próximo fechamento do select pode reacender `hasError` internamente, mascarando a intenção do controle externo. |
| `value` / `onValueChange` | Tipados como `string \| string[]` para cobrir os três `variant`s (`text`/`icon`/`checkbox`) em uma única prop, sem união discriminada por `variant`. Nada impede `value={['a','b']}` com `variant="text"` (só o primeiro item é usado, silenciosamente) ou `value="a"` com `variant="checkbox"`. Na prática, os consumidores já precisam fazer cast manual (`onValueChange={(val) => setPdv(val as string)}` em `Filter.stories.tsx`) por causa dessa assinatura genérica. |
| `SelectItemProps extends ScalableProps` | Cada item do array `items` herda `scale`, mas nenhum componente de item (`SelectItem`/`CheckboxSelectItem`/`ExpandableSelectItem`) lê ou aplica essa prop — a escala é global, aplicada uma única vez via `--giro-scale` no container. Prop de item sem efeito, herdada só pela extensão do tipo base. |
| Tooltip config (`WithTooltip`/`WithoutTooltip`) | Mesmo tipo duplicado identificado no hardening do `Button` (seção 1) — idêntico ao de `ToggleButton`, `Radio`, `TextField`, `TextArea`. Reforça a necessidade de centralizar em `common.types.ts`. |

## 2. Inconsistências entre componentes

- **Terceira convenção de aria-label no DS**: além de `ariaLabel` customizado (`Button`, `Radio`) e do padrão prefixado por sub-elemento (`Quantity`: `decrementAriaLabel`/`incrementAriaLabel`/`inputAriaLabel`), o `Select` atual usa a chave nativa `'aria-label'` — mesmo padrão de `Badge` e `Calendar`. Vale notar que a versão anterior do componente (`packages/react/src/components/.deprecated/Select/Select.types.ts`) usava `ariaLabel` customizado — ou seja, a própria migração v2→v3 trocou de convenção, sem que isso tenha virado um padrão único para o restante do DS.
- **`ExpandableSelectItem` ignora a variante `checkbox`**: quando um item tem `children`, o componente sempre renderiza `ExpandableSelectItem` (texto + ícone + chevron), independentemente de `variant`. Resultado: num `Select variant="checkbox"` com itens aninhados, os itens pai/filho **não exibem nenhum `Checkbox` visual** (diferente dos itens planos, que usam `CheckboxSelectItem` com o componente `Checkbox` real) — mesma seleção múltipla, duas apresentações visuais diferentes dentro do mesmo select.
- **Modelo de acessibilidade misto dentro da própria lista**: itens planos em variantes `text`/`icon` usam `SelectRadix.Item` (primitiva do Radix, com roving tabindex/typeahead/ARIA de listbox gerenciados automaticamente). Já `CheckboxSelectItem` e `ExpandableSelectItem` são `div`s soltos com `role="option"`/`role="button"` fora da árvore de `Select.Item`, exigindo reimplementação manual de navegação por teclado — incompleta em um dos casos (ver seção 5). É o mesmo tipo de fragmentação observada no `Button` entre os três modos de renderização (`button`/`a`/`as`), aqui aplicado à composição de itens.
- **Padrão de mensagens de erro inline sem vínculo ARIA**: `helperText`/`errorMessage` são renderizados como `<span>` comum, sem `id` e sem `aria-describedby` apontando do `SelectRadix.Trigger` para eles — mesma classe de problema do `aria-describedby` quebrado do `Tooltip` identificado no hardening do `Button` (seção 2), mas aqui afetando a mensagem de erro de validação, não um tooltip.

## 3. Levantamento dos casos de uso atuais

Usos confirmados via grep em `apps/`:
- **`Select.stories.tsx`**: cobre as três variantes (`text`, `icon`, `checkbox`), `scale` 1/1.5/2, `search`, `enableInfiniteScroll` + `onScrollEnd`/`hasMore`/`isLoadingMore`, `enableApiSearch`/`onApiSearch`, e tooltip (`tooltipText`/`tooltipSide`/`tooltipAlign`).
- **`Filter.stories.tsx`**: uso mais representativo de produção — múltiplos `Select variant="text"` como filtros lado a lado (PDV, tipo de movimento, funcionário, finalizadora), sempre controlados (`value` + `onValueChange`) e sempre com `(val) => setX(val as string)` — confirma na prática a ambiguidade de tipo da seção 1.
- **`Table.stories.tsx` (deprecated)**: uso legado do `Select` dentro de tabela.
- Não há uso de `variant="checkbox"` nem de `multiple` em nenhuma story de produção atual — a seleção múltipla real está sub-exercitada fora do arquivo de stories do próprio `Select`.
- Nenhum uso encontrado em `apps/hub` (Astro) — consumo do `Select` é restrito ao ecossistema React/Storybook.

## 4. Testes de regressão — lacunas

`Select.test.tsx` cobre bem renderização básica, `scale`, variantes, infinite scroll (props) e exibição de valores, mas falta:
- Teste de **seleção real disparando `onValueChange`** (todos os testes de "Interações do Usuário" e "Props e Callbacks" só verificam renderização/presença do elemento, nunca simulam clique em um item do mock e verificam o callback sendo chamado com o valor certo).
- Precedência entre `error` (controlado) e a validação interna (`required` + vazio ao fechar) quando os dois convergem ou divergem (seção 1).
- Comportamento de `enableApiSearch` explícito (`true`/`false`) combinado com `onApiSearch`, incluindo o aviso de mudança futura.
- Item com `children` em `variant="checkbox"` (hoje renderiza sem `Checkbox` visual — achado da seção 2 não coberto por nenhum teste).
- Prop `multiple`: não há nenhum teste que comprove que ela não faz nada, nem que documente a ausência de efeito.
- `data-testid` dos itens (`select-item-{value}`, `checkbox-item-{value}`) não é verificado em nenhum teste.

## 5. Testes de interação e teclado — lacunas

Não existe nenhum teste de teclado no arquivo atual (nenhum `userEvent.keyboard`/`fireEvent.keyDown` sobre o componente real). Combinado com a leitura do código-fonte, os gaps relevantes são:
- `ExpandableSelectItem` não implementa `ArrowUp`/`ArrowDown` (só trata `Enter`/`Espaço` para expandir/selecionar) — navegação por teclado entre itens expansíveis e entre eles e itens irmãos não tem cobertura nem, aparentemente, implementação.
- `CheckboxSelectItem.handleKeyDown` implementa roving focus manual via `nextElementSibling`/`previousElementSibling` checando `tabIndex === '0'` — frágil a qualquer mudança de markup/whitespace entre itens, e sem nenhum teste que valide o foco realmente se movendo.
- Falta teste de `Escape` fechando o select com foco retornando ao trigger (padrão esperado de combobox/listbox).
- Falta teste de `Tab` saindo do select aberto (deveria fechar, segundo convenção do Radix, mas não é verificado).
- `handleSearchKeyDown` intercepta `ArrowDown`/`ArrowUp`/`Enter`/`Escape` e dá `blur()` no campo de busca para repassar a navegação à lista — comportamento específico e não trivial, sem nenhum teste dedicado.

## 6. Revisão de acessibilidade — achados

- 🔴 **Crítico — mensagem de erro/ajuda sem `aria-describedby`**: `errorMessage` e `helperText` são `<span>`s soltos, sem `id`, e o `SelectRadix.Trigger` não referencia nenhum deles via `aria-describedby`. Leitor de tela não anuncia a mensagem de erro/ajuda ao focar o trigger — mesma classe de problema do achado crítico de tooltip no hardening do `Button`.
- 🟠 **Alto — ausência de `aria-invalid`** no trigger quando `state.hasError && state.touched` é verdadeiro; o estado de erro é só visual (classe CSS), não exposto via ARIA.
- 🟠 **Alto — itens `checkbox`/expansíveis fora da semântica de listbox do Radix**: por não usarem `SelectRadix.Item`, dependem inteiramente de `role`/`aria-*` manuais (`role="option"`, `aria-selected`, `aria-disabled`) e de JS para navegação — qualquer rota (clique fora do checkbox/label, teclado) não coberta no código fica sem equivalente acessível, diferente da garantia que o Radix dá de fábrica para os itens `text`/`icon`.
- 🟡 Itens aninhados renderizados via `ExpandableSelectItem` usam `role="button"` para o nó pai (que expande/colapsa) — correto para a ação de expandir, mas quando o item-folha é selecionável (`onSelect`), o mesmo `role="button"` é usado em vez de `role="option"`, divergindo da semântica usada em `SelectItem`/`CheckboxSelectItem` para o mesmo tipo de ação (selecionar uma opção).
- 🟡 `aria-label` do trigger não cobre o `Content`/`Viewport`; quando não há `label` visível, o nome acessível do grupo de opções depende só do que o Radix infere por padrão.

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1. Adicionar `aria-invalid` no trigger quando houver erro, e ligar `errorMessage`/`helperText` ao trigger via `aria-describedby` (gerar `id` estável para a mensagem).
2. Implementar navegação `ArrowUp`/`ArrowDown` em `ExpandableSelectItem` e revisar o roving tabindex manual de `CheckboxSelectItem` para não depender de `nextElementSibling`/`previousElementSibling` cru.
3. Renderizar o `Checkbox` real também em `ExpandableSelectItem` quando `variant="checkbox"`, alinhando a apresentação visual com `CheckboxSelectItem`.
4. Corrigir os textos dos `console.warn` de depreciação ("Remoção psera feita futuramente", "futuramente o comportamento ira mudar").
5. Adicionar suíte de testes de teclado e de interação real (clique em item do mock disparando `onValueChange`/`onOpenChange` com o valor esperado), hoje ausente.
6. Extrair `WithTooltip`/`WithoutTooltip` para `common.types.ts` (mesmo ponto já levantado no hardening do `Button`, item 4).
7. Adicionar testes cobrindo a precedência entre `error` externo e a validação interna de `required`.

**Potencialmente incompatível (precisa decisão e comunicação):**
8. Definir o destino da prop `multiple`: removê-la (já que hoje não tem nenhum efeito) ou implementá-la de fato como alternativa explícita a `variant="checkbox"` — qualquer uma das duas muda o que está documentado hoje via JSDoc.
9. Padronizar a convenção de aria-label entre `ariaLabel` customizado (`Button`/`Radio`) e `'aria-label'` nativo (`Select` atual/`Badge`/`Calendar`) — mesma decisão pendente já registrada no hardening do `Button` (seção 7, item 6); incluir `Select` na mesma janela em vez de tratar isoladamente.
10. Confirmar se `enableApiSearch` explícito deve continuar tendo precedência sobre `onApiSearch` até a major, ou se a precedência deve se inverter desde já — hoje o aviso em runtime promete uma mudança futura sem versão definida.

## 8. Janela única de mudanças incompatíveis

Conforme `docs/react/giovani-guidelines.md` e o fluxo de release do repo (CHANGELOG com seção "Breaking Changes", sem misturar breaking changes com patches), os itens **8, 9 e 10** devem ser agrupados em uma única MR/major com:
- Tabela de props antigas → novas (incluindo o destino final de `multiple` e da convenção de aria-label).
- Atualização dos usages existentes que dependem do comportamento atual (`Filter.stories.tsx`, `Select.stories.tsx`) para o padrão decidido.
- Entrada no `CHANGELOG.md` do pacote `react`, no formato de `docs/react/changeset-template.md`.
- Coordenação com o item 6 do hardening do `Button` (seção 7), já que a decisão de convenção de aria-label (item 9 aqui) é a mesma decisão pendente lá — devem ser resolvidas e lançadas juntas, não em MRs separadas.

Os itens 1–7 (sem quebra) podem seguir separados, como patch/minor, sem esperar a janela major.
