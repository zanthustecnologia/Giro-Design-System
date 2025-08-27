🤝 Contribuindo com o Zanthus Design System
Obrigado por se interessar em contribuir com o Zanthus Design System! Este documento descreve como colaborar com segurança e consistência, mantendo a qualidade do projeto para todos os times e plataformas.


✅ Pré-requisitos
Antes de começar, você vai precisar de:

Node.js 18+ instalado
NPM ou Yarn (preferimos NPM)
Conta no GitHub
Conhecimentos básicos em Git, terminal e React (caso vá contribuir com componentes)



🚀 Começando


Fork este repositório e clone localmente:

git clone https://github.com/seu-usuario/zanthus-design-system.git
cd zanthus-design-system




Instale as dependências:

npm install




Crie uma nova branch:

git checkout -b feat/nome-da-sua-feature




Faça sua contribuição:

Tokens → packages/tokens/src/

Componentes React → packages/components-react/src/

Hooks/utilitários → packages/utils/src/

Documentação → README.md, Storybook ou arquivos Markdown



Rode os testes, linter e build antes de commitar:

npm run lint
npx turbo run build
npm run test




Crie um pull request explicando claramente o que foi feito, por que, e como testar.




✍️ Padrão de Commits (Conventional Commits)
Todos os commits devem seguir o padrão:

<tipo>(escopo): descrição



Exemplos válidos:

feat(button): adiciona botão com ícone
fix(grid): corrige espaçamento em telas pequenas
docs(readme): adiciona seção sobre Turborepo


Tipos permitidos:



Tipo
Descrição




feat
Nova funcionalidade


fix
Correção de bug


docs
Apenas mudanças de documentação


style
Formatação, identação, etc.


refactor
Refatoração sem alteração funcional


test
Adição ou alteração de testes


chore
Tarefas auxiliares (builds, configs)




Use npm run commit com commitizen se desejar ajuda na formatação.



📐 Padrões Visuais


Use tokens sempre que possível. Nunca codifique cores, espaçamentos ou fontes diretamente.

Siga os breakpoints oficiais (1920, 1440, 1024, 768, 360)
Componentes visuais devem vir com exemplo no Storybook
Grid, espaçamento e tipografia devem estar alinhados ao sistema de design



🔍 Revisão de PRs
Todos os pull requests são revisados manualmente. O que buscamos:

Código limpo, claro e modular
Tokens e temas usados corretamente
Storybook atualizado se for componente visual
Commits semânticos e descrição clara



📦 Criando novos pacotes
Para criar um novo pacote (ex: grid, icons, charts):

cd packages/
mkdir nome-do-pacote


Inclua um package.json, scripts (build, dev, etc.) e registre como workspace no package.json raiz.


🧹 Checklist antes do PR


 Lint passou sem erros

 Build está funcionando (npx turbo run build)

 Storybook atualizado (se aplicável)

 Commit segue padrão

 Descrevi o que foi feito no PR


Obrigado por contribuir! 💜