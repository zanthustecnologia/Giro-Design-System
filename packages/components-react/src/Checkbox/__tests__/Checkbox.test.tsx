import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  const user = userEvent.setup();

  // ✅ Testes básicos de renderização
  describe('Renderização', () => {
    test('deve renderizar corretamente', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('deve renderizar com label padrão', () => {
      render(<Checkbox />);
      expect(screen.getByLabelText('Checkbox')).toBeInTheDocument();
    });

    test('deve renderizar com label customizado', () => {
      render(<Checkbox label="Aceitar termos" />);
      expect(screen.getByLabelText('Aceitar termos')).toBeInTheDocument();
    });
  });

  // ✅ Testes de estado checked
  describe('Estado Checked', () => {
    test('deve estar desmarcado por padrão', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    test('deve estar marcado quando checked=true', () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    test('deve alternar estado quando clicado', async () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  // ✅ Testes de estado indeterminate
  describe('Estado Indeterminate', () => {
    test('deve ter aria-checked="mixed" quando indeterminate', () => {
      render(<Checkbox indeterminate={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });

    test('deve sair do estado indeterminate quando clicado', async () => {
      render(<Checkbox indeterminate={true} />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      await user.click(checkbox);
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    test('deve exibir ícone CheckHalf quando indeterminate', () => {
      render(<Checkbox indeterminate={true} />);
      const icon = document.querySelector('.zds-checkbox__icon svg');
      expect(icon).toBeInTheDocument();
    });
  });

  // ✅ Testes de estado disabled
  describe('Estado Disabled', () => {
    test('deve estar desabilitado quando disabled=true', () => {
      render(<Checkbox disabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    test('não deve chamar onChange quando disabled e clicado', async () => {
      const mockOnChange = jest.fn();
      render(<Checkbox disabled={true} onChange={mockOnChange} />);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    test('deve ter tabIndex -1 quando disabled', () => {
      render(<Checkbox disabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('tabIndex', '-1');
    });
  });

  // ✅ Testes de eventos
  describe('Eventos', () => {
    test('deve chamar onChange quando clicado', async () => {
      const mockOnChange = jest.fn();
      render(<Checkbox onChange={mockOnChange} />);
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
            type: 'checkbox'
          })
        })
      );
    });

    test('deve funcionar com navegação por teclado', async () => {
      const mockOnChange = jest.fn();
      render(<Checkbox onChange={mockOnChange} />);
      const checkbox = screen.getByRole('checkbox');
      
      checkbox.focus();
      await user.keyboard(' ');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ Testes de props
  describe('Props', () => {
    test('deve aplicar ID customizado', () => {
      render(<Checkbox id="custom-id" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-id');
    });

    test('deve aplicar name attribute', () => {
      render(<Checkbox name="agreement" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'agreement');
    });

    test('deve aplicar value attribute', () => {
      render(<Checkbox value="yes" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'yes');
    });

    test('deve aplicar className customizada', () => {
      render(<Checkbox className="custom-class" />);
      const container = document.querySelector('.zds-checkbox');
      expect(container).toHaveClass('custom-class');
    });

    test('deve aplicar aria-describedby', () => {
      render(<Checkbox ariaDescribedby="help-text" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'help-text');
    });
  });

  // ✅ Testes de acessibilidade
  describe('Acessibilidade', () => {
    test('deve ter aria-label correto para label string', () => {
      render(<Checkbox label="Aceitar termos" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Aceitar termos');
    });

    test('deve ter aria-label padrão para label não-string', () => {
      render(<Checkbox label={<span>JSX Label</span>} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Checkbox');
    });

    test('deve ter associação correta label-input', () => {
      render(<Checkbox label="Test Label" />);
      const checkbox = screen.getByLabelText('Test Label');
      expect(checkbox).toBeInTheDocument();
    });

    test('ícones devem ter aria-hidden', () => {
      const { rerender } = render(<Checkbox checked={true} />);
      let icon = document.querySelector('.zds-checkbox__icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');

      rerender(<Checkbox indeterminate={true} />);
      icon = document.querySelector('.zds-checkbox__icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ✅ Testes de ícones
  describe('Ícones', () => {
    test('deve exibir CheckSmall quando checked', () => {
      render(<Checkbox checked={true} />);
      const checkIcon = document.querySelector('.zds-checkbox__icon');
      expect(checkIcon).toBeInTheDocument();
    });

    test('deve exibir CheckHalf quando indeterminate', () => {
      render(<Checkbox indeterminate={true} />);
      const halfIcon = document.querySelector('.zds-checkbox__icon');
      expect(halfIcon).toBeInTheDocument();
    });

    test('não deve exibir ícone quando desmarcado', () => {
      render(<Checkbox checked={false} />);
      const icon = document.querySelector('.zds-checkbox__icon');
      expect(icon).not.toBeInTheDocument();
    });
  });

  // ✅ Testes de edge cases
  describe('Edge Cases', () => {
    test('deve lidar com label undefined', () => {
      render(<Checkbox label={undefined} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('deve lidar com label null', () => {
      render(<Checkbox label={null} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    test('deve lidar com onChange undefined', async () => {
      render(<Checkbox onChange={undefined} />);
      const checkbox = screen.getByRole('checkbox');
      
      // Não deve gerar erro ao clicar
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    test('deve lidar com props conflitantes (checked + indeterminate)', () => {
      render(<Checkbox checked={true} indeterminate={true} />);
      const checkbox = screen.getByRole('checkbox');
      
      // Indeterminate deve ter prioridade
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  // ✅ Testes de estado interno
  describe('Estado Interno', () => {
    test('deve sincronizar estado interno com prop checked', () => {
      const { rerender } = render(<Checkbox checked={false} />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).not.toBeChecked();
      
      rerender(<Checkbox checked={true} />);
      expect(checkbox).toBeChecked();
    });

    test('deve sincronizar estado interno com prop indeterminate', () => {
      const { rerender } = render(<Checkbox indeterminate={false} />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
      
      rerender(<Checkbox indeterminate={true} />);
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  // ✅ Testes de CSS classes
  describe('CSS Classes', () => {
    test('deve aplicar classe disabled quando disabled', () => {
      render(<Checkbox disabled={true} />);
      const container = document.querySelector('.zds-checkbox');
      expect(container).toHaveClass('zds-checkbox__disabled');
    });

    test('deve aplicar classe checked quando marcado', () => {
      render(<Checkbox checked={true} />);
      const container = document.querySelector('.zds-checkbox');
      expect(container).toHaveClass('zds-checkbox__checked');
    });

    test('deve aplicar classe indeterminate quando indeterminado', () => {
      render(<Checkbox indeterminate={true} />);
      const container = document.querySelector('.zds-checkbox');
      expect(container).toHaveClass('zds-checkbox__indeterminate');
    });
  });
});