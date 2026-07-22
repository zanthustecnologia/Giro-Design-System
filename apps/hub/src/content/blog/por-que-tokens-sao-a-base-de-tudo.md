---
title: "Por que tokens de design são a base de tudo"
description: "Como uma boa arquitetura de tokens elimina inconsistências, acelera o desenvolvimento e mantém design e código sincronizados."
pubDate: 2026-05-05
author: "Felipe Joaquim"
tags: ["tokens", "fundamentos", "boas-práticas"]
---

Se você já perdeu tempo caçando um valor de cor hardcoded espalhado por dezenas de arquivos, ou descobriu que o botão do mobile tinha um azul ligeiramente diferente do da web, você já sentiu na pele o problema que tokens de design resolvem.

## O que é um token de design

Um token é um par nome/valor que representa uma decisão de design. Em vez de escrever `#3B45F2` no seu CSS, você escreve `var(--color-brand-primary-default)`. O valor real fica em um único lugar — e quando o time de design decide mudar a cor primária, você muda em um arquivo, e tudo se atualiza automaticamente.

Simples assim. Mas os benefícios vão muito além da troca de cor.

## As três camadas

Uma boa arquitetura de tokens funciona em três camadas:

### 1. Primitivos

São os valores brutos, sem semântica. Apenas definem o que existe na paleta:

```css
--color-blue-500: #3B45F2;
--color-blue-600: #2E38D4;
--spacing-4: 4px;
--spacing-8: 8px;
```

Você **nunca** usa primitivos diretamente no código de componentes.

### 2. Semânticos

Aqui mora a intenção. Primitivos recebem nomes que comunicam para quê servem:

```css
--color-brand-primary-default: var(--color-blue-500);
--color-brand-primary-dark:    var(--color-blue-600);
--spacing-xs: var(--spacing-4);
--spacing-sm: var(--spacing-8);
```

Esses são os tokens que seus componentes consomem.

### 3. Específicos de componente

Quando um componente tem necessidades muito particulares, tokens próprios evitam gambiarras:

```css
--button-padding-horizontal: var(--spacing-sm);
--button-border-radius: var(--border-radius-pill);
```

## O impacto no dia a dia

Com tokens bem estruturados, algumas coisas deixam de ser problema:

- **Dark mode**: troque os valores dos tokens semânticos, todos os componentes seguem
- **Múltiplos produtos**: cada produto tem seus próprios primitivos, mas compartilha os componentes
- **Handoff design-dev**: Figma e código falam a mesma linguagem — o token é o contrato
- **Revisões de design**: "muda o espaçamento interno dos cards" vira uma linha, não uma busca global

## O erro mais comum

Pular a camada semântica. Times que vão direto dos primitivos para os componentes acabam com código como:

```css
/* ❌ Frágil */
background: var(--color-blue-500);

/* ✅ Resiliente */
background: var(--color-brand-primary-default);
```

Na segunda forma, se a marca mudar de azul para verde, o componente não precisa ser tocado.

## Conclusão

Tokens não são burocracia — são a infraestrutura que permite escalar um design system sem que ele vire um campo minado de inconsistências. Quanto mais cedo uma equipe adota essa arquitetura, mais barato fica manter tudo coerente ao longo do tempo.

No Giro DS, todos os componentes React e Flutter consomem exclusivamente tokens semânticos do pacote `@giro-ds/tokens`. Nenhum valor hardcoded. É o que garante que um botão no mobile e um botão na web sejam, de fato, o mesmo botão.
