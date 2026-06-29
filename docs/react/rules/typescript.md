# Diretrizes de TypeScript, Tipagem e Reutilização

Garanta que todo código gerado seja estritamente tipado, limpo e siga os padrões modernos de TypeScript.

## 1. Sintaxe de Funções
- **Arrow Functions:** Todos os blocos de código TypeScript, incluindo definições de componentes React, funções utilitárias e hooks customizados, devem utilizar a sintaxe de *Arrow Functions* (`const minhaFuncao = () => {}`).

## 2. Organização de Tipos e Interfaces
- **Centralização por Contexto:** Tipos (`types`) ou interfaces (`interfaces`) globais ou de domínio devem ser criados dentro da pasta raiz `src/types/` e separados estritamente por contexto do projeto (ex: `src/types/checkout.ts`, `src/types/product.ts`).

## 3. Reutilização de Código: Hooks vs Utils
- **Lógica React (Custom Hooks):** Toda lógica reutilizável que dependa do ciclo de vida do React ou de estados (`useState`, `useEffect`, `useContext`, etc.) deve ser extraída para um Custom Hook.
  - **Padrão de Nomenclatura:** Os hooks devem obrigatoriamente começar com o prefixo "use" em formato camelCase (ex: `useFormatDate.ts`, `useCardPayment.ts`).
- **Lógica Pura (Utils):** Funções genéricas puras, cálculos matemáticos, formatadores textuais ou manipulações de arrays/objetos que não dependem do estado do React devem ser criados dentro de `src/utils/` em arquivos TS/JS puros.
- **Evite Duplicação:** Antes de escrever um utilitário ou hook, verifique se a funcionalidade já não existe nas pastas globais correspondentes.

## 4. Qualidade da Tipagem
- **Proibição do `any`:** O uso de `any` é estritamente proibido. Se um tipo for dinâmico ou desconhecido, utilize `unknown` e faça o Type Guard apropriado.
- **Tipagem de Retorno:** Funções complexas, seletores e Custom Hooks devem ter os seus tipos de retorno explicitamente declarados.