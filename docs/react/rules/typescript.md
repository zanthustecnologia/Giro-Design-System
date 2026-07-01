# Diretrizes de TypeScript, Tipagem e Reutilização

Garanta que todo código gerado seja estritamente tipado, limpo e siga os padrões modernos de TypeScript.

## 1. Sintaxe de Funções
- **Prefira Arrow Functions:** Todos os blocos de código TypeScript, incluindo funções utilitárias e hooks customizados, devem utilizar a sintaxe de _Arrow Functions_ (`const minhaFuncao = () => {}`).
- **Exceção — `React.forwardRef`:** Componentes que utilizam `React.forwardRef` devem usar a sintaxe de função anônima inline como segundo argumento:
  ```tsx
  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    // implementação
  });
  ```
- **`React.FC` é aceito** para componentes simples sem `forwardRef`, desde que usado de forma consistente com o restante da codebase.

## 2. Organização de Tipos e Interfaces
- **Tipos por Componente:** Cada componente da biblioteca (`packages/react/src/components/`) deve ter suas props e tipos específicos definidos em um arquivo `<Componente>.types.ts` colocalizado.
- **Tipos Comuns:** Tipos reutilizáveis entre múltiplos componentes (ex: `Size`, `Variant`, `BaseProps`) devem ser centralizados em `packages/react/src/types/common.types.ts`.
- **Separação por Domínio:** Se surgirem tipos de domínios distintos (ex: tipos de tema, tipos de formulário, tipos de navegação), crie arquivos separados dentro de `packages/react/src/types/`.

## 3. Reutilização de Código: Hooks vs Utils
- **Lógica React (Custom Hooks):** Toda lógica reutilizável que dependa do ciclo de vida do React ou de estados (`useState`, `useEffect`, `useContext`, etc.) deve ser extraída para um Custom Hook em `packages/react/src/hooks/`.
  - **Padrão de Nomenclatura:** Os hooks devem obrigatoriamente começar com o prefixo "use" em formato camelCase (ex: `useToast.ts`, `useInputKeyboardValue.tsx`).
- **Lógica Pura (Utils):** Funções genéricas puras — cálculos, formatadores, manipulações de arrays/objetos — que não dependem do estado do React devem ser colocadas em `packages/react/src/shared/` ou, se forem reutilizáveis entre pacotes, considerar extrair para `packages/utilities/`.
- **Evite Duplicação:** Antes de escrever um utilitário ou hook, verifique se a funcionalidade já não existe nas pastas correspondentes.

## 4. Qualidade da Tipagem
- **Proibição do `any`:** O uso de `any` é estritamente proibido. Se um tipo for dinâmico ou desconhecido, utilize `unknown` e faça o Type Guard apropriado.
- **Tipagem de Retorno:** Funções complexas, seletores e Custom Hooks devem ter os seus tipos de retorno explicitamente declarados. Isso melhora a DX (Developer Experience) para quem consome a biblioteca.
- **Exportação de Tipos:** Todos os tipos públicos que fazem parte da API do componente devem ser exportados no barrel (`index.ts`) do componente e, se forem de uso geral, no barrel principal (`packages/react/src/index.ts`).