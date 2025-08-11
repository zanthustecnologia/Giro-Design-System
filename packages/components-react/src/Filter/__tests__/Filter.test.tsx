// Filter.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '../Filter';

// Mock do componente Button se necessário

describe('Filter Component', () => {
  // Helper para renderizar o componente
  const renderFilter = (props = {}) => {
    const defaultProps = {
      buttonText: 'Filter Test',
      children: <div data-testid="filter-content">Test Content</div>,
      ...props,
    };
    return render(<Filter {...defaultProps} />);
  };

  describe('Renderização Básica', () => {
    test('deve renderizar o botão com texto padrão', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Filter Test');
    });

    test('deve renderizar com texto customizado', () => {
      renderFilter({ buttonText: 'Custom Filter' });
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Custom Filter');
    });

    test('deve renderizar com ícone quando fornecido', () => {
      const TestIcon = () => <span data-testid="test-icon">🔍</span>;
      renderFilter({ icon: <TestIcon /> });
      
      const icon = screen.getByTestId('test-icon');
      expect(icon).toBeInTheDocument();
    });

    test('deve aplicar className no container', () => {
      renderFilter({ className: 'custom-class' });
      
      const container = screen.getByRole('button').closest('.filter-container');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Estado Aberto/Fechado', () => {
    test('deve iniciar fechado por padrão', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      const content = screen.queryByTestId('filter-content');
      
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeInTheDocument();
    });

    test('deve abrir quando o botão é clicado', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const content = screen.getByTestId('filter-content');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeInTheDocument();
    });

    test('deve fechar quando clicado novamente', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      
      // Abrir
      fireEvent.click(button);
      expect(screen.getByTestId('filter-content')).toBeInTheDocument();
      
      // Fechar
      fireEvent.click(button);
      expect(screen.queryByTestId('filter-content')).not.toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Variantes do Botão', () => {
    test('deve aplicar variante outlined por padrão', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('filter-button--outlined');
    });

    test('deve aplicar variante filled', () => {
      renderFilter({ variant: 'filled' });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('filter-button--filled');
    });

    test('deve aplicar variante text', () => {
      renderFilter({ variant: 'text' });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('filter-button--text');
    });
  });

  describe('Posição do Dropdown', () => {
    test('deve aplicar posição left por padrão', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const dropdown = document.querySelector('.filter-dropdown');
      expect(dropdown).toHaveClass('filter-dropdown--left');
    });

    test('deve aplicar posição right', () => {
      renderFilter({ position: 'right' });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const dropdown = document.querySelector('.filter-dropdown');
      expect(dropdown).toHaveClass('filter-dropdown--right');
    });
  });

  describe('Estado Desabilitado', () => {
    test('deve desabilitar o botão', () => {
      renderFilter({ disabled: true });
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('não deve abrir quando desabilitado', () => {
      renderFilter({ disabled: true });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const content = screen.queryByTestId('filter-content');
      expect(content).not.toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Callbacks', () => {
    test('deve chamar onOpen quando abre', () => {
      const onOpen = jest.fn();
      renderFilter({ onOpen });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    test('deve chamar onClose quando fecha', () => {
      const onClose = jest.fn();
      renderFilter({ onClose });
      
      const button = screen.getByRole('button');
      
      // Abrir primeiro
      fireEvent.click(button);
      expect(onClose).not.toHaveBeenCalled();
      
      // Fechar
      fireEvent.click(button);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('deve chamar onToggle com estado correto', () => {
      const onToggle = jest.fn();
      renderFilter({ onToggle });
      
      const button = screen.getByRole('button');
      
      // Abrir
      fireEvent.click(button);
      expect(onToggle).toHaveBeenCalledWith(true);
      
      // Fechar
      fireEvent.click(button);
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    test('não deve chamar callbacks quando desabilitado', () => {
      const onOpen = jest.fn();
      const onToggle = jest.fn();
      renderFilter({ disabled: true, onOpen, onToggle });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(onOpen).not.toHaveBeenCalled();
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('Fechar com Clique Fora', () => {
    test('deve fechar quando clica fora', async () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Verificar que está aberto
      expect(screen.getByTestId('filter-content')).toBeInTheDocument();
      
      // Clicar fora
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByTestId('filter-content')).not.toBeInTheDocument();
      });
    });

    test('não deve fechar quando clica dentro', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const content = screen.getByTestId('filter-content');
      
      // Clicar dentro do conteúdo
      fireEvent.mouseDown(content);
      
      // Deve continuar aberto
      expect(screen.getByTestId('filter-content')).toBeInTheDocument();
    });

    test('deve chamar onClose ao fechar por clique fora', async () => {
      const onClose = jest.fn();
      renderFilter({ onClose });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Fechar com Tecla Escape', () => {
    test('deve fechar quando pressiona Escape', async () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Verificar que está aberto
      expect(screen.getByTestId('filter-content')).toBeInTheDocument();
      
      // Pressionar Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByTestId('filter-content')).not.toBeInTheDocument();
      });
    });

    test('não deve reagir ao Escape quando fechado', () => {
      const onClose = jest.fn();
      renderFilter({ onClose });
      
      // Pressionar Escape sem abrir
      fireEvent.keyDown(document, { key: 'Escape' });
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('deve chamar onClose ao fechar por Escape', async () => {
      const onClose = jest.fn();
      renderFilter({ onClose });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Classes CSS', () => {
    test('deve aplicar classe open quando aberto', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('filter-button--open');
      
      fireEvent.click(button);
      expect(button).toHaveClass('filter-button--open');
    });

    test('deve alternar classe da seta', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      const arrow = button.querySelector('.filter-arrow');
      
      expect(arrow).toHaveClass('filter-arrow--down');
      
      fireEvent.click(button);
      expect(arrow).toHaveClass('filter-arrow--up');
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter atributos ARIA corretos', () => {
      renderFilter();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Conteúdo do Filtro', () => {
    test('deve renderizar children quando aberto', () => {
      const customContent = (
        <div data-testid="custom-content">
          <p>Custom Filter Content</p>
        </div>
      );
      
      renderFilter({ children: customContent });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const content = screen.getByTestId('custom-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('Custom Filter Content');
    });

    test('deve funcionar sem children', () => {
      renderFilter({ children: null });
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const dropdown = document.querySelector('.filter-dropdown');
      expect(dropdown).toBeInTheDocument();
    });
  });

  describe('Casos Extremos', () => {
    test('deve lidar com múltiplos cliques', () => {
      const onToggle = jest.fn();
      renderFilter({ onToggle });
      
      const button = screen.getByRole('button');
      
      // Múltiplos cliques
      fireEvent.click(button); // abrir
      fireEvent.click(button); // fechar
      fireEvent.click(button); // abrir
      
      expect(onToggle).toHaveBeenCalledTimes(3);
      expect(onToggle).toHaveBeenNthCalledWith(1, true);
      expect(onToggle).toHaveBeenNthCalledWith(2, false);
      expect(onToggle).toHaveBeenNthCalledWith(3, true);
    });

    test('deve funcionar com buttonText como ReactNode', () => {
      const customText = <span data-testid="custom-button-text">Custom Text</span>;
      renderFilter({ buttonText: customText });
      
      const customNode = screen.getByTestId('custom-button-text');
      expect(customNode).toBeInTheDocument();
    });
  });

  describe('Cleanup', () => {
    test('deve remover event listeners ao desmontar', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = renderFilter();
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });
  });
});

// Testes de integração simples
describe('Filter Integration Tests', () => {
  test('deve funcionar com conteúdo interativo', () => {
    const handleOptionClick = jest.fn();
    
    render(
      <Filter buttonText="Options">
        <div>
          <button onClick={handleOptionClick} data-testid="option-btn">
            Option 1
          </button>
        </div>
      </Filter>
    );
    
    // Abrir filtro
    const filterButton = screen.getByRole('button', { name: /options/i });
    fireEvent.click(filterButton);
    
    // Clicar na opção
    const optionButton = screen.getByTestId('option-btn');
    fireEvent.click(optionButton);
    
    expect(handleOptionClick).toHaveBeenCalledTimes(1);
  });
});