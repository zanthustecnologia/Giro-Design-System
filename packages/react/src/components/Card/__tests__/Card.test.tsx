import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o card', () => {
      render(
        <Card>
          <div>Conteúdo do card</div>
        </Card>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('deve renderizar como elemento main', () => {
      const { container } = render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement?.tagName).toBe('MAIN');
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
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).toMatch(/card/);
    });

    it('deve aplicar className customizada quando fornecida', () => {
      const { container } = render(
        <Card className="minha-classe">
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('minha-classe');
    });

    it('deve manter a classe base junto com className customizada', () => {
      const { container } = render(
        <Card className="minha-classe">
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      const classes = mainElement?.className || '';
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
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).not.toMatch(/card--interactive/);
    });

    it('não deve aplicar a classe card--interactive quando interactiveCard é false', () => {
      const { container } = render(
        <Card interactiveCard={false}>
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).not.toMatch(/card--interactive/);
    });

    it('deve aplicar a classe card--interactive quando interactiveCard é true', () => {
      const { container } = render(
        <Card interactiveCard={true}>
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).toMatch(/card--interactive/);
    });

    it('deve manter a classe base ao usar interactiveCard', () => {
      const { container } = render(
        <Card interactiveCard={true}>
          <div>Conteúdo</div>
        </Card>
      );
      const mainElement = container.querySelector('main');
      const classes = mainElement?.className || '';
      expect(classes).toMatch(/card/);
      expect(classes).toMatch(/card--interactive/);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter a role main implícita', () => {
      render(
        <Card>
          <div>Conteúdo</div>
        </Card>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('deve ser único na página (landmark main)', () => {
      render(
        <Card>
          <div>Conteúdo principal</div>
        </Card>
      );
      const mainElements = screen.getAllByRole('main');
      expect(mainElements).toHaveLength(1);
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
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement?.textContent).toBe('');
    });
  });
});
