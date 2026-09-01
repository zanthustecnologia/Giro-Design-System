# @giro-ds/react

Biblioteca de componentes React do Giro Design System. Uma coleção completa de componentes acessíveis, responsivos e prontos para produção.

## 📦 Instalação

```bash
npm install @giro-ds/react
# ou
yarn add @giro-ds/react
# ou
pnpm add @giro-ds/react
```

## 🚀 Uso

### Importação de Componentes

```tsx
import { Button, Dialog, Avatar, Badge } from '@giro-ds/react';
```

### ⚠️ Importação dos Estilos (Obrigatório)

**É necessário importar os estilos globalmente no seu projeto:**

```tsx
import '@giro-ds/react/dist/styles.css';
```

Recomendamos adicionar esta importação no arquivo principal da sua aplicação (ex: `App.tsx`, `main.tsx`, `index.tsx`, ou `_app.tsx`).

### Exemplo Completo

```tsx
// App.tsx
import '@giro-ds/react/dist/styles.css'; // Importação obrigatória dos estilos
import { Button, Dialog } from '@giro-ds/react';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Clique aqui
      </Button>
      
      <Dialog
        isOpen={true}
        title="Meu Dialog"
        onClose={() => console.log('Fechado')}
      >
        Conteúdo do dialog
      </Dialog>
    </div>
  );
}

export default App;
```

## 📚 Componentes Disponíveis

### Formulários e Inputs
- **Checkbox** - Caixa de seleção padrão
- **CheckboxRadix** - Caixa de seleção com Radix UI
- **Radio** - Botão de opção padrão
- **RadioRadix** - Botão de opção com Radix UI
- **TextField** - Campo de texto
- **Select** - Seletor padrão
- **SelectField** - Campo de seleção
- **SelectRadix** - Seletor com Radix UI
- **DatePicker** - Seletor de data
- **Calendar** - Calendário
- **Search** - Campo de busca
- **Quantity** - Seletor de quantidade
- **VerificationCode** - Campo de código de verificação

### Navegação e Layout
- **Button** - Botão
- **Menu** - Menu padrão
- **MenuRadix** - Menu com Radix UI
- **Dropdown** - Menu suspenso
- **Container** - Container de layout
- **ListItem** - Item de lista

### Feedback e Informação
- **Dialog** - Caixa de diálogo/modal
- **Drawer** - Painel lateral
- **Toast** - Notificação toast
- **Tooltip** - Dica de ferramenta
- **Callout** - Caixa de destaque/alerta
- **Badge** - Etiqueta/selo
- **Avatar** - Avatar de usuário

### Dados e Tabelas
- **Table** - Tabela de dados
- **Filter** - Filtro de dados
- **Chips** - Chips/tags

## 🔧 Requisitos

- React ^18.0.0
- React DOM ^18.0.0

## 📖 Documentação

Para documentação completa, exemplos interativos e guias de uso, consulte o Storybook do projeto.

## 🎨 Integração com Tokens

Este pacote utiliza os design tokens do `@giro-ds/tokens`. Os estilos dos componentes já estão configurados com os tokens do sistema.

## 🌐 Internacionalização

Alguns componentes possuem suporte a i18n (internacionalização), especialmente o componente Calendar, que utiliza `i18next` e `react-i18next`.

## 📄 Licença

Consulte o arquivo LICENSE na raiz do projeto.

## 🤝 Contribuindo

Consulte o arquivo CONTRIBUTING.md na raiz do projeto para diretrizes de contribuição.
