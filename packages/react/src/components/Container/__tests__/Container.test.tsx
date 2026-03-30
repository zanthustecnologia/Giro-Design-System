import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Container from '../Container';

describe('Container', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o container', () => {
      render(
        <Container>
          <div>Conteúdo do container</div>
        </Container>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('deve renderizar como elemento main', () => {
      const { container } = render(
        <Container>
          <div>Conteúdo</div>
        </Container>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement?.tagName).toBe('MAIN');
    });

    it('deve renderizar children corretamente', () => {
      render(
        <Container>
          <h1>Título</h1>
          <p>Parágrafo de teste</p>
        </Container>
      );
      expect(screen.getByRole('heading', { name: /título/i })).toBeInTheDocument();
      expect(screen.getByText(/parágrafo de teste/i)).toBeInTheDocument();
    });

    it('deve renderizar múltiplos elementos children', () => {
      render(
        <Container>
          <div data-testid="child-1">Filho 1</div>
          <div data-testid="child-2">Filho 2</div>
          <div data-testid="child-3">Filho 3</div>
        </Container>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Estilos e classes', () => {
    it('deve aplicar a classe container do módulo CSS', () => {
      const { container } = render(
        <Container>
          <div>Conteúdo</div>
        </Container>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement?.className).toMatch(/container/);
    });

    it('deve aplicar a classe utility mx-auto', () => {
      const { container } = render(
        <Container>
          <div>Conteúdo</div>
        </Container>
      );
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('mx-auto');
    });

    it('deve aplicar ambas as classes corretamente', () => {
      const { container } = render(
        <Container>
          <div>Conteúdo</div>
        </Container>
      );
      const mainElement = container.querySelector('main');
      const classes = mainElement?.className || '';
      expect(classes).toMatch(/container/);
      expect(classes).toMatch(/mx-auto/);
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter a role main implícita', () => {
      render(
        <Container>
          <div>Conteúdo</div>
        </Container>
      );
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });

    it('deve ser único na página (landmark main)', () => {
      render(
        <Container>
          <div>Conteúdo principal</div>
        </Container>
      );
      const mainElements = screen.getAllByRole('main');
      expect(mainElements).toHaveLength(1);
    });
  });

  describe('Casos de uso reais', () => {
    it('deve renderizar um layout completo de página', () => {
      render(
        <Container>
          <header>
            <h1>Cabeçalho da Página</h1>
          </header>
          <section>
            <h2>Seção de Conteúdo</h2>
            <p>Texto do conteúdo</p>
          </section>
          <footer>
            <p>Rodapé</p>
          </footer>
        </Container>
      );
      
      expect(screen.getByRole('heading', { name: /cabeçalho da página/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /seção de conteúdo/i })).toBeInTheDocument();
      expect(screen.getByText(/texto do conteúdo/i)).toBeInTheDocument();
      expect(screen.getByText(/rodapé/i)).toBeInTheDocument();
    });

    it('deve renderizar componentes React como children', () => {
      const CustomComponent = () => <div data-testid="custom">Componente customizado</div>;
      
      render(
        <Container>
          <CustomComponent />
        </Container>
      );
      
      expect(screen.getByTestId('custom')).toBeInTheDocument();
      expect(screen.getByText(/componente customizado/i)).toBeInTheDocument();
    });

    it('deve renderizar string como children', () => {
      render(<Container>Texto simples</Container>);
      expect(screen.getByText(/texto simples/i)).toBeInTheDocument();
    });

    it('deve renderizar null/undefined sem erros', () => {
      const { container } = render(<Container>{null}</Container>);
      const mainElement = container.querySelector('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement?.textContent).toBe('');
    });
  });
});
