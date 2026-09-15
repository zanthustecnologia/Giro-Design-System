# Diretrizes de Componentização (React — Monorepo @giro-ds)

Estas diretrizes se aplicam ao desenvolvimento de componentes da biblioteca `@giro-ds/react` e, em menor grau, ao app Storybook que a consome.

## 1. Desenvolvendo Componentes da Biblioteca (`packages/react/`)

- **Não Duplique:** Antes de criar um novo componente, verifique se a funcionalidade já não existe ou pode ser composta a partir de componentes existentes no pacote.
- **Pasta por Componente:** Cada componente reside em seu próprio diretório dentro de `packages/react/src/components/`. O diretório deve conter ao menos: `<Componente>.tsx`, `<Componente>.types.ts`, `<Componente>.module.scss` e um `index.ts` com barrel export.
- **Preferência por Radix UI:** Para componentes de interação complexa (dropdown, select, modal, checkbox, radio, dialog, toast), utilize primitivos do [Radix UI](https://www.radix-ui.com/) como base — eles já são dependência do pacote e garantem acessibilidade.
- **Componentes Funcionais:** Todos os componentes devem ser funcionais, utilizando React Hooks de forma performática.
- **Isolamento de Lógica:** Mantenha os componentes focados na renderização de interface. Regras complexas de negócio ou manipulação de dados pesados devem ser extraídas para Custom Hooks em `packages/react/src/hooks/`.

### Estrutura de um componente da biblioteca:
```
packages/react/src/components/MeuComponente/
├── MeuComponente.tsx          # Implementação do componente
├── MeuComponente.types.ts     # Props, tipos específicos
├── MeuComponente.module.scss  # Estilos escopados (CSS Modules)
├── MeuComponente.test.tsx     # Testes unitários (Vitest)
└── index.ts                   # Barrel export (export * from './MeuComponente')
```

## 2. Consumindo Componentes no Storybook (`apps/storybook-react/`)

- **Use `@giro-ds/react`:** O Storybook é um consumidor da biblioteca. Sempre use os componentes exportados de `@giro-ds/react` para montar as stories.
- **Organização de Stories:** Stories devem ser colocadas em `apps/storybook-react/src/stories/`, agrupadas por componente.
- **Componentes Internos do Storybook:** Componentes auxiliares usados apenas dentro do Storybook (wrappers, decorators, layouts de demonstração) devem residir em `apps/storybook-react/src/internal-components/`.

## 3. Diretrizes de Estilo (comuns a ambos os contextos)

- **Proibição de CSS Inline:** É proibido o uso de estilos CSS inline (`style={{ margin: 10 }}`). Toda a estilização deve ser feita via CSS Modules (`.module.scss`) ou classes utilitárias do `@giro-ds/utilities`. A única exceção aceitável é para valores estritamente dinâmicos calculados em tempo de execução (ex: coordenadas de posicionamento ou transições controladas por estado).
- **Escopo Local:** Use sempre CSS Modules. Classes são referenciadas via objeto `styles` (`className={styles.minhaClasse}`). Isso garante escopo local e evita colisão de nomes.

## 4. Depreciação de Componentes

- Componentes que serão removidos ou substituídos devem ser movidos para `packages/react/src/components/.deprecated/`.
- Mantenha exports retrocompatíveis no barrel principal enquanto o componente estiver em período de depreciação.