import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o card', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo do card</div>
        </Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('deve renderizar como elemento div', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toBeInTheDocument();
      expect(cardElement.tagName).toBe('DIV');
    });

    it('deve renderizar children corretamente', () => {
      render(
        <Card>
          <h1>Título</h1>
          <p>Parágrafo de teste</p>
        </Card>
      );
      expect(screen.getByRole('heading', { name: /título/i })).toBeInTheDocument();
      expect(screen.getByText(/parágrafo de teste/i)).toBeInTheDocument();
    });

    it('deve renderizar múltiplos elementos children', () => {
      render(
        <Card>
          <div data-testid="child-1">Filho 1</div>
          <div data-testid="child-2">Filho 2</div>
          <div data-testid="child-3">Filho 3</div>
        </Card>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Estilos e classes', () => {
    it('deve aplicar a classe card do módulo CSS', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.className).toMatch(/card/);
    });

    it('deve aplicar className customizada quando fornecida', () => {
      const { container } = render(
        <Card className="minha-classe">
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('minha-classe');
    });

    it('deve manter a classe base junto com className customizada', () => {
      const { container } = render(
        <Card className="minha-classe">
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      const classes = cardElement.className || '';
      expect(classes).toMatch(/card/);
      expect(classes).toMatch(/minha-classe/);
    });
  });

  describe('Prop interactiveCard', () => {
    it('não deve aplicar a classe card--interactive por padrão', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.className).not.toMatch(/card--interactive/);
    });

    it('não deve aplicar a classe card--interactive quando hoverable é false', () => {
      const { container } = render(
        <Card hoverable={false}>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.className).not.toMatch(/card--interactive/);
    });

    it('deve aplicar a classe card--interactive quando hoverable é true', () => {
      const { container } = render(
        <Card hoverable={true}>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.className).toMatch(/card--hoverable/);
    });

    it('deve manter a classe base ao usar hoverable', () => {
      const { container } = render(
        <Card hoverable={true}>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      const classes = cardElement.className || '';
      expect(classes).toMatch(/card/);
      expect(classes).toMatch(/card--hoverable/);
    });
  });

  describe('Prop borderRadius', () => {
    it('não deve aplicar style de borderRadius quando a prop não é informada', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.borderRadius).toBe('');
    });

    it('deve aplicar o token de borderRadius customizado', () => {
      const { container } = render(
        <Card borderRadius={24}>
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.borderRadius).toBe('var(--border-radius-24)');
    });

    it('deve aplicar o token none quando informado', () => {
      const { container } = render(
        <Card borderRadius="none">
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.borderRadius).toBe('var(--border-radius-none)');
    });

    it('deve aplicar o token pill quando informado', () => {
      const { container } = render(
        <Card borderRadius="pill">
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.borderRadius).toBe('var(--border-radius-pill)');
    });

    it('deve aplicar o token circular quando informado', () => {
      const { container } = render(
        <Card borderRadius="circular">
          <div>Conteúdo</div>
        </Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.borderRadius).toBe('var(--border-radius-circular)');
    });
  });

  describe('Casos de uso reais', () => {
    it('deve renderizar informações de usuário', () => {
      render(
        <Card>
          <h3>Informações do usuário</h3>
          <p>Nome: João da Silva</p>
          <p>E-mail: joao@exemplo.com</p>
        </Card>
      );
      expect(screen.getByRole('heading', { name: /informações do usuário/i })).toBeInTheDocument();
      expect(screen.getByText(/joão da silva/i)).toBeInTheDocument();
      expect(screen.getByText(/joao@exemplo.com/i)).toBeInTheDocument();
    });

    it('deve renderizar componentes React como children', () => {
      const CustomComponent = () => <div data-testid="custom">Componente customizado</div>;
      render(
        <Card>
          <CustomComponent />
        </Card>
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });

    it('deve renderizar string como children', () => {
      render(<Card>Texto simples</Card>);
      expect(screen.getByText(/texto simples/i)).toBeInTheDocument();
    });

    it('deve renderizar null sem erros', () => {
      const { container } = render(<Card>{null}</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toBeInTheDocument();
      expect(cardElement.textContent).toBe('');
    });
  });
});
