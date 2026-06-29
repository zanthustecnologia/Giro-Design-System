# Diretrizes de Componentização (React)

Você deve seguir o padrão de arquitetura de componentes estabelecido para este projeto de Self-Checkout.

## 1. Ecossistema de UI (@giro-ds)
- **Prioridade Máxima:** O projeto utiliza o pacote `@giro-ds`. Sempre use os componentes React nativos do `@giro-ds` para montar as interfaces.
- **Criação de Componentes:** Você só deve propor a criação de um componente novo na aplicação se ele NÃO existir ou não puder ser estendido a partir do pacote `@giro-ds`.

## 2. Arquitetura e Organização de Pastas
- **Componentes Globais (`src/components/`):** Componentes reutilizáveis em múltiplos contextos devem residir na pasta de componentes globais do projeto.
- **Componentes de Contexto Fechado (Co-location):** Componentes que serão utilizados apenas em uma página ou em um componente específico devem ser criados obrigatoriamente dentro de uma pasta `/components` interna à página ou ao componente correspondente (ex: `src/pages/HomePage/components/`).

## 3. Diretrizes de Implementação e Estilo
- **Proibição de CSS Inline:** É terminantemente proibido o uso de estilos CSS inline (`style={{ margin: 10 }}`). Toda a estilização deve ser feita via classes utilitárias ou arquivos SCSS dedicados. A única exceção aceitável é para valores estritamente dinâmicos calculados em tempo de execução (ex: transições controladas por estado ou posicionamento dinâmico baseado em coordenadas de pixel).
- **Componentes Funcionais:** Todos os componentes devem ser funcionais, utilizando React Hooks de forma performática.
- **Isolamento de Lógica:** Mantenha os componentes focados na renderização de interface. Regras complexas de negócio ou manipulação de dados pesados devem ser extraídas para Custom Hooks dedicados.