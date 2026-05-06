---
title: "Apresentando o Giro Design System v3"
description: "Nova arquitetura de tokens, componentes Flutter e muito mais no maior release do Giro DS até hoje."
pubDate: 2026-05-05
author: "Time Giro DS"
tags: ["release", "tokens", "flutter"]
---

O Giro Design System v3 representa uma reescrita profunda da nossa arquitetura de tokens e a chegada oficial dos componentes Flutter ao ecossistema.

## O que mudou

### Tokens de design

A estrutura de tokens foi completamente reformulada seguindo o modelo de três camadas:

- **Primitivos** — valores brutos (cores, tamanhos, famílias tipográficas)
- **Semânticos** — intenção de uso (`color-brand-primary-default`)
- **Específicos de componente** — quando necessário

Essa separação permite que times de design e desenvolvimento falem a mesma língua, reduzindo ambiguidade na hora de implementar.

### Componentes Flutter

Com o `packages/flutter`, os widgets do Giro DS chegam ao mobile e desktop. O catálogo inicial inclui:

- `GiroButton`
- `GiroTextField`
- `GiroAvatar`
- `GiroCard`

Todos consumindo os mesmos tokens semânticos do pacote `@giro-ds/tokens`.

### Storybook 9

Migramos para o Storybook 9 com suporte nativo a CSF 4, melhor performance e o novo modo de layout compacto.

## Como migrar do v2

Consulte o [guia de migração](/blog) para detalhes sobre mudanças de breaking change nos nomes de tokens e props de componentes.

## Próximos passos

- Componentes de formulário completos (Select, DatePicker, Checkbox group)
- Tema dark mode via tokens semânticos
- Suporte a React Native
