# 📚 Documentação — Giro Design System

Índice geral da documentação do monorepo. A estrutura de `docs/` espelha a estrutura de `packages/` e `apps/`: cada pacote com documentação própria tem uma pasta em `docs/packages/<nome>/`.

## 🗂️ Estrutura

```
docs/
├── README.md                    (este arquivo)
├── guides/                      # guias transversais, não ligados a um pacote específico
│   └── pnpm-commands.md
└── packages/
    ├── react/                   # documentação de @giro-ds/react
    │   ├── README.md
    │   ├── versioning-and-publishing.md
    │   ├── giovani-guidelines.md
    │   ├── changeset-template.md
    │   ├── eslint-commands.md
    │   ├── testing-commands.md
    │   ├── testing-local-packages.md
    │   ├── migration-guides/
    │   └── rules/                # diretrizes de código (referência para revisão manual e agentes de IA)
    └── flutter/                  # documentação de flutter_giro
        ├── README.md
        ├── getting-started.md
        ├── commands-reference.md
        ├── setup-summary.md
        ├── structure-visualization.md
        └── tokens-integration-roadmap.md
```

> `packages/tokens`, `packages/mcp`, `packages/utilities`, `packages/compose` e `packages/version` ainda não têm uma pasta própria aqui — cada um já tem seu `README.md`/`ARCHITECTURE.md` na raiz do pacote. Ao crescer a documentação de qualquer um deles, crie `docs/packages/<nome>/` seguindo o mesmo padrão de `react/` e `flutter/`.

## 🚀 Por onde começar

| Se você vai... | Comece por |
|---|---|
| Desenvolver componentes React | [packages/react/README.md](./packages/react/README.md) |
| Desenvolver componentes Flutter | [packages/flutter/README.md](./packages/flutter/README.md) |
| Rodar comandos gerais do monorepo (pnpm/turbo) | [guides/pnpm-commands.md](./guides/pnpm-commands.md) |
| Publicar uma nova versão de um pacote | [packages/react/versioning-and-publishing.md](./packages/react/versioning-and-publishing.md) |
| Abrir um MR/PR com versionamento correto | [packages/react/giovani-guidelines.md](./packages/react/giovani-guidelines.md) |

## 📝 Contribuindo com a documentação

1. Documentação específica de um pacote vai em `docs/packages/<nome>/`.
2. Documentação transversal (comandos que valem para o monorepo inteiro, não um pacote específico) vai em `docs/guides/`.
3. Ao criar/mover um pacote novo, crie sua pasta em `docs/packages/` e adicione um `README.md` de índice, seguindo o padrão de `packages/react/README.md`.
4. Sempre que uma pasta ou pacote for renomeado, atualize os caminhos citados na documentação — evite referências obsoletas (ex.: nomes antigos de pacotes/pastas).
