# Relatório de Saúde do Design System — Giro DS (Q1–Q3 2026)

## 1. Diagnóstico Executivo — Estamos saudáveis frente ao mercado?

**Resposta: não plenamente — DS em maturação acelerada, com sinais mistos, mas em melhora real.**

| Dimensão | Evidência no Giro DS | Norma de mercado (DS maduros: MUI, Chakra, Ant Design, Polaris, Carbon) | Veredito |
|---|---|---|---|
| Frequência de major version | `react` foi de v1.0.0 a v12.4.0 em ~9 meses (11 majors) | 1 major a cada 12-24 meses; breaking changes batched | Crítico |
| Cadência de release geral | ~4 releases/mês (36 no ano) | 1-4 releases/mês é normal para DS ativo | Saudável |
| Cobertura de guia de migração | Só 1 guia de migração (`v2→v3`) para 11 majors do ano (~9% de cobertura) | Todo major deveria ter guia de migração documentado | Crítico |
| Estabilidade dos primitivos core | `Button` quebrou API nos 3 trimestres seguidos; `Select`/`TextField`/`DatePicker` seguem sendo retrabalhados até v12 | Primitivos básicos costumam estabilizar cedo | Crítico |
| Tendência recente (Q2→Q3) | Breaking caiu de 55%→29%, fix-only caiu de 27%→7%, features subiram | — | Melhora real e mensurável |
| Processo de deprecação | Só 1 caso documentado (VerificationCode → `.deprecated/`); maioria das remoções acontece sem aviso prévio | Deprecar por 1-2 minors antes de remover | Atenção |
| Governança/tooling | Changesets configurado, MCP server com metadados de componentes, changelog padronizado | — | Acima da média |
| Dados de adoção/impacto real | Não há telemetria, nº de consumidores ou pesquisa de satisfação no repo | DS maduros medem adoção, NPS de devs, tempo de migração | Não medível hoje |

**Conclusão:** o eixo mais crítico é estabilidade de API — breaking changes frequentes em componentes básicos, sem guia de migração na maioria dos casos. Isso gera atrito real (retrabalho, medo de atualizar, upgrades acumulando). Por outro lado, a tendência dos últimos 3 meses é de melhora clara e consistente nos três indicadores. A maior lacuna para uma afirmação mais confiante é a ausência de dados de adoção/impacto real (hoje o diagnóstico é baseado no que foi publicado, não no impacto causado).

## 2. Metodologia

Dados extraídos de:

- Tags Git de release (`@giro-ds/<pacote>@<versão>`) → data real do deploy.
- `CHANGELOG.md` de cada pacote (`react`, `tokens`, `mcp`, `utilities`) → categorização por `Breaking Changes`, `Features`, `Bug Fixes`.
- Período: 01/jan/2026 a 14/set/2026 (Q3 parcial).

## 3. Visão Geral do Ano

| Trimestre | Releases | Breaking | Feature | Fix-only |
|---|---|---|---|---|
| Q1 (jan-mar) | 11 | 3 | 3 | 8 |
| Q2 (abr-jun) | 11 | 6 | 7 | 3 |
| Q3 (jul-14/set) | 14 | 4 | 12 | 1 |
| **Total** | **36** | **13 (36%)** | **22 (61%)** | **12 (33%)** |

**Destaques:**

- Cadência média: ~4 releases/mês.
- Q2 concentrou mais da metade dos releases do trimestre com breaking change (6 de 11) — pico de instabilidade do ano.
- 8 componentes novos lançados em 2026: Switch, Popover, TextArea, TableV2, VirtualKeyboard, Card, FileUpload, ToggleButton.
- `@giro-ds/utilities` não teve nenhum release em 2026.

## 4. Componentes: Evolução vs. Retrabalho

| Componente | Features | Fixes | Breaking | Status |
|---|---|---|---|---|
| VirtualKeyboard | 7 | 6 | 2 | Evolução saudável (componente novo) |
| TableV2 | 4 | 3 | 2 | Evolução saudável (componente novo) |
| **TextField** | 2 | **10** | 3 | Retrabalho — pouca evolução líquida |
| **Select** | 1 | 6 | 2 | Retrabalho |
| **DatePicker** | **0** | 4 | 2 | Crítico — nenhuma feature no ano |
| Label | 0 | 5 | 0 | Instável mas sem quebra de API |
| Modal | 2 | 1 | 1 | Recuperado bem após reescrita (Radix) |

## 5. Riscos Identificados

1. Concentração de breaking changes no Q2 — falta de planejamento/batching.
2. `TextField`, `Select`, `DatePicker` consumindo esforço de manutenção sem gerar valor novo.
3. 36% dos releases do ano quebraram compatibilidade.
4. `@giro-ds/utilities` parado desde dez/2025.
5. Apenas ~9% dos majors têm guia de migração documentado.

### 5.1 Evolução Trimestral

**Macro (todos os pacotes):**

| Métrica | Q1 | Q2 | Q3 | Q1→Q2 | Q2→Q3 |
|---|---|---|---|---|---|
| Releases | 11 | 11 | 14 | 0% | +27% |
| Breaking changes | 3 (27%) | 6 (55%) | 4 (29%) | +28 p.p. | -26 p.p. |
| Com feature | 3 (27%) | 7 (64%) | 12 (86%) | +37 p.p. | +22 p.p. |
| Fix-only | 8 (73%) | 3 (27%) | 1 (7%) | -46 p.p. | -20 p.p. |

> Q1 foi trimestre de manutenção pura. Q2 foi o pico de instabilidade. Q3 é o melhor trimestre do ano: mais releases, mais features, menos breaking, quase nenhum release "fix puro".

**Fixes por componente, por trimestre:**

| Componente | Q1 | Q2 | Q3 | Tendência |
|---|---|---|---|---|
| TextField | 4 | 2 | 4 | Sobe e desce — recorrente, não resolvido |
| Select | 3 | 1 | 2 | Mesmo padrão |
| DatePicker | 1 | 3 | 0 | Pico no Q2, silêncio no Q3 |
| VirtualKeyboard | — | 1 | 5 | Fixes disparando após lançamento |
| TableV2 | — | 1 | 2 | Crescimento moderado, esperado |
| Button | 0 | 0 | 3 | Problema novo no Q3 |
| Calendar | 0 | 2 | 1 | Esfriando |
| Label | 2 | 1 | 2 | Estável, baixo nível constante |

**Breaking changes por componente, por trimestre:**

| Componente | Q1 | Q2 | Q3 |
|---|---|---|---|
| **Button** | 1 | 1 | 1 |
| Filter | 0 | 2 | 1 |
| Select | 1 | 0 | 1 |
| DatePicker | 0 | 1 | 1 |
| TextField | 0 | 2 | 1 |

**Sinais de tendência:**

- Melhora geral confirmada (breaking 55%→29%, fix-only 27%→7% do Q2 pro Q3).
- `Button` é o único componente com breaking change nos 3 trimestres seguidos — risco crônico.
- `VirtualKeyboard` piorando em fixes (1→5) apesar do destaque em features.
- `DatePicker` "sumiu" no Q3 (zero fix/feature/breaking) após ser o pior do Q2 — checar se foi estabilizado ou só ficou sem atenção.
- `TextField`/`Select` em "dente de serra" — os fixes do Q2 não resolveram a causa raiz.

## 6. OKRs propostos para Q4 2026

### Objetivo 1 — Reduzir a taxa de breaking changes

- KR1: Reduzir proporção de releases com breaking de 36% (média do ano) para ≤15% no Q4.
- KR2: Nenhum breaking change em `TextField`, `Select`, `DatePicker` e `Button` sem changeset de migração + aviso prévio de 1 sprint.
- KR3: Consolidar breaking changes pendentes em no máximo 1 major release planejado no trimestre.

### Objetivo 2 — Estabilizar os componentes de maior retrabalho

- KR1: `DatePicker` recebe ao menos 1 feature nova no trimestre (zero no ano até agora).
- KR2: Reduzir fixes em `TextField` e `Select` em 50% vs. a média trimestral de 2026.
- KR3: `VirtualKeyboard` sai do padrão de crescimento de fixes (1→5) — meta de reduzir para ≤2 fixes no Q4.
- KR4: Abrir e executar "hardening pass" de arquitetura para `Button`, `TextField`, `Select` e `DatePicker`.

### Objetivo 3 — Previsibilidade de release

- KR1: Definir e documentar critério objetivo de major/minor/patch para changesets.
- KR2: Adotar release train mensal para `react`, reservando majors para janelas planejadas.

### Objetivo 4 — Retomar pacotes esquecidos

- KR1: Pelo menos 1 release de `@giro-ds/utilities` no Q4.

### Objetivo 5 — Fechar a lacuna de dados de adoção

- KR1: Instrumentar telemetria básica (quais apps usam qual versão do DS).
- KR2: Criar canal/processo simples de feedback de migração (tempo gasto, dor sentida) por major release.

### Objetivo 6 — Institucionalizar essa métrica

- KR1: Relatório trimestral (breaking/feature/fix por componente e trimestre) gerado a cada início de trimestre.
- KR2: Guia de migração passa a ser obrigatório para todo major (hoje ~9% de cobertura → meta 100%).
