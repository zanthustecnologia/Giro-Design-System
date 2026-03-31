<div align="center">
  <img src="apps/storybook-react/public/images/giro-logo.svg" alt="Giro Design System" width="480" />
</div>

<br />

Projetado para dar consistência, escala e governança à experiência dos produtos, o sistema organiza fundamentos visuais, tokens, componentes e padrões de implementação em uma arquitetura preparada para múltiplos contextos, tecnologias e marcas.

Mais do que uma biblioteca de interface, o Giro funciona como uma camada de infraestrutura de produto: reduz inconsistência, acelera o desenvolvimento, melhora a previsibilidade da experiência e cria uma base sustentável para evolução contínua.

---

## Visão geral

O repositório centraliza os ativos fundamentais do design system em uma arquitetura de monorepo. A proposta é permitir que diferentes produtos consumam a mesma base com alto grau de coerência, mantendo flexibilidade para temas, white label e expansão multi-stack.

Hoje, o foco principal está em React, com a arquitetura já preparada para evolução em outras frentes, como Flutter e Android nativo.

### Objetivos do sistema

- estabelecer uma linguagem de produto consistente;
- transformar decisões recorrentes em ativos reutilizáveis;
- acelerar entrega com maior previsibilidade técnica;
- reduzir retrabalho entre design e engenharia;
- criar uma base escalável para temas, múltiplas marcas e novas plataformas.

---

## Princípios

### Simplicidade
Projetado para ser simples e intuitivo, composto por elementos universais, facilmente reconhecíveis e modernos.

### Consistência
Cada elemento foi pensado para funcionar com harmonia em conjunto, garantindo uma experiência consistente e coesa.

### Qualidade
Respeito ao tempo dos usuário por meio de um trabalho cuidadoso e atenção a cada detalhe.

### Empatia
No centro de cada decisão estão os desejos e as necessidades dos usuários. Nosso design system é focado em pessoas reais.

### Evolução
Evolui a fim de solucionar problemas e gerar soluções, com o propósito de tornar um produto, sistema, serviço, experiência ou negócio melhor.

---

## Posicionamento

O Giro não deve ser entendido apenas como um repositório de componentes — ele é uma fundação de produto, uma camada que organiza interface, decisão e implementação. É um sistema criado para girar com o ecossistema, acompanhar sua evolução e manter coerência mesmo quando o contexto muda.

---

## Arquitetura

O Giro está estruturado como um monorepo com pacotes independentes, versionáveis e reutilizáveis.

### Stack principal

- **Monorepo:** Turborepo
- **Tokens:** Style Dictionary
- **Componentes Web:** React + TypeScript
- **Estilo:** CSS gerado a partir de tokens + abordagem modular
- **Documentação e playground:** Storybook
- **Primitivos de interface:** abordagem headless/compositional

---

## Estrutura do repositório

```bash
giro-design-system/
├── apps/
│   ├── storybook-react/           # Documentação e visualização dos componentes React
│   └── widgetbook-flutter/        # Documentação interativa dos componentes Flutter
│
├── packages/
│   ├── tokens/                    # Fonte e geração dos design tokens
│   ├── react/                     # Biblioteca de componentes React
│   ├── flutter/                   # Biblioteca de componentes Flutter
│   ├── utilities/                 # Utilitários e helpers CSS/SCSS
│   └── mcp/                       # Servidor MCP do design system
│
├── docs/                          # Documentação adicional
├── scripts/                       # Scripts auxiliares
├── turbo.json                     # Orquestração do monorepo
├── package.json                   # Workspaces e scripts globais
└── README.md
```

---

## Camadas do sistema

### 1. Fundação
A base do sistema concentra os tokens e as regras fundamentais: cor, tipografia, espaçamento, bordas e temas. Essa camada transforma decisões visuais em contratos reutilizáveis, consumidos por diferentes bibliotecas e plataformas, e organiza as relações entre esses valores — grid, comportamento responsivo, hierarquia e semântica visual.

### 2. Componentes
Os componentes encapsulam estrutura, comportamento, estados e padrões de interação para uso consistente em produto.

### 3. Padrões
Acima dos componentes, o sistema deve evoluir para padrões mais compostos de uso, cobrindo fluxos recorrentes, layouts e experiências complexas.

---

## Theming e escalabilidade

O Giro foi concebido para suportar cenários em que a base do sistema precisa atender mais de uma aplicação, contexto ou marca.

Isso significa que a arquitetura considera:

- separação entre tokens fundamentais e tokens semânticos;
- possibilidade de temas como claro e escuro;
- capacidade de adaptação para white label;
- consumo desacoplado da identidade específica de um único produto.

Essa abordagem reduz acoplamento e amplia a vida útil do sistema.

---

## Documentação

A documentação oficial do Giro está disponível no Storybook, onde é possível explorar os componentes, seus estados, variantes e diretrizes de uso.

O Storybook é a referência principal para consumo e contribuição ao sistema. Antes de implementar qualquer componente, consulte a documentação correspondente.

> A URL do Storybook será definida conforme o ambiente de publicação.

---

## Como consumir

A lógica de consumo parte do princípio de que os produtos não devem depender de decisões visuais arbitrárias ou valores hardcoded.

O caminho recomendado é:

1. consumir os tokens gerados como fonte de verdade visual;
2. utilizar os componentes do sistema sempre que houver cobertura adequada;
3. estender o sistema com critérios claros quando um caso novo surgir;
4. evitar duplicação local de estilos, estados e comportamentos já resolvidos pelo DS.

---

## Fluxo de evolução

A evolução do design system deve seguir uma lógica de governança, e não apenas de crescimento volumétrico.

Uma nova inclusão no sistema tende a fazer sentido quando:

- resolve recorrência real em mais de um produto ou fluxo;
- possui valor estrutural, e não apenas circunstancial;
- apresenta clareza de API, comportamento e manutenção;
- tem custo de evolução aceitável;
- contribui para reduzir divergência e aumentar consistência.

---

## Estado atual

Neste estágio, o repositório concentra principalmente:

- estrutura base do monorepo;
- camada de tokens;
- biblioteca de componentes React;
- documentação via Storybook;
- preparação arquitetural para expansão de temas, grid, onboarding e utilitários.

O suporte a Flutter está previsto como próxima frente de expansão e faz parte do roadmap estrutural do sistema.

Alguns pacotes ainda estão em evolução e fazem parte do roadmap estrutural do sistema.

---

## Roadmap de expansão

Direções previstas para maturação do Giro:

- ampliação da biblioteca de componentes e padrões;
- maturidade maior da camada de grid;
- onboarding reutilizável para produtos;
- documentação mais robusta de consumo e contribuição;
- suporte mais amplo a múltiplas plataformas;
- evolução da estratégia de temas e white label.

---

## Benefícios esperados

Para produto:

- maior consistência entre experiências;
- redução de atrito nas decisões recorrentes;
- aceleração de discovery e delivery com uma base comum.

Para engenharia:

- componentes e contratos mais previsíveis;
- menor duplicação de código;
- base mais sustentável para manutenção e escala.

Para a organização:

- alinhamento transversal entre design e desenvolvimento;
- redução de fragmentação entre iniciativas;
- fortalecimento da identidade e da qualidade percebida dos produtos.

---

## Contribuição

A contribuição para o design system deve preservar coerência conceitual, qualidade técnica e governança.

Antes de propor mudanças, avalie:

- qual problema estrutural está sendo resolvido;
- se já existe solução equivalente no sistema;
- qual o impacto da decisão sobre API, manutenção e escalabilidade;
- se a proposta deve virar componente, padrão ou apenas implementação local.

Contribuições futuras devem ser acompanhadas por documentação, exemplos de uso e critérios claros de adoção.

Para instruções detalhadas, consulte o arquivo [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Licença

O Giro é privado e protegido por direitos autorais. Todos os direitos reservados.
