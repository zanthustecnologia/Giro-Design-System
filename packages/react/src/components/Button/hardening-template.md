# Hardening do Button — Notas de análise

> Template de documentação de hardening. Copie este arquivo para `packages/react/src/components/__Componente__/HARDENING.md` e preencha cada seção. Remova os comentários `>` ao finalizar.

## 1. Revisão das propriedades públicas

> Liste as props públicas relevantes e aponte comportamentos ambíguos, não documentados ou que divergem do tipo declarado (ex.: prop que não exclui atributo nativo equivalente, validação só em runtime/dev, união discriminada mal coberta etc.).

| Prop | Observação |
|---|---|
| `` | |

## 2. Inconsistências entre componentes

> Compare convenções (nomes de props, padrões de acessibilidade, composição com Radix/outros wrappers) do componente analisado contra outros componentes do DS. Cite arquivos/stories/mdx onde a divergência aparece em uso real.

-

## 3. Levantamento dos casos de uso atuais

> Faça um grep em `apps/` e `packages/` para mapear onde e como o componente é consumido hoje (triggers de outros componentes, variantes/props mais usadas, integrações fora do React Router, etc.).

-

## 4. Testes de regressão — lacunas

> Avalie a suíte de testes atual (`__tests__/*.test.tsx`) e liste cenários não cobertos que podem quebrar silenciosamente (precedência de props conflitantes, combinações de props, estados especiais).

-

## 5. Testes de interação e teclado — lacunas

> Liste interações de teclado/mouse esperadas (foco, `Tab`, `Enter`/`Espaço`, navegação por setas, etc.) que ainda não têm teste.

-

## 6. Revisão de acessibilidade — achados

> Use os marcadores de severidade para priorizar: 🔴 crítico, 🟠 alto, 🟡 médio/baixo. Referencie padrões WAI-ARIA quando aplicável.

-

## 7. Alterações que ainda precisam ocorrer (proposta)

**Sem quebra de compatibilidade (patch/minor):**
1.

**Potencialmente incompatível (precisa decisão e comunicação):**
1.

## 8. Janela única de mudanças incompatíveis

> Agrupe todas as alterações incompatíveis levantadas na seção 7 em uma única janela (MR/major), conforme `docs/react/giovani-guidelines.md` e o fluxo de release do repo. Inclua:

- Tabela de props/comportamentos antigos → novos.
- Lista dos usages existentes que precisam ser atualizados no mesmo MR.
- Entrada no `CHANGELOG.md` do pacote `react`, no formato de `docs/react/changeset-template.md`.

Itens sem quebra de compatibilidade (seção 7) podem seguir separados, como patch/minor, sem esperar a janela major.
