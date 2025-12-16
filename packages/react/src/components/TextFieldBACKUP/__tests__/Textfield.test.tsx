import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TextField from '../TextField';
import { Mail16Regular, Search16Regular } from '@fluentui/react-icons';

// Mock do componente Tooltip
jest.mock('../../Tooltip/Tooltip', () => {
  return function MockTooltip({ children, text }: { children: React.ReactNode; text: string }) {
    return (
      <div data-testid="tooltip" title={text}>
        {children}
      </div>
    );
  };
});

describe('TextField', () => {
  const user = userEvent.setup();

  describe('Renderização', () => {
    test('deve renderizar o campo de texto corretamente', () => {
      render(<TextField label="Nome" placeholder="Digite seu nome" />);
      
      expect(screen.getByLabelText('Nome')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
    });

    test('deve renderizar com valor inicial', () => {
      render(<TextField label="Email" value="test@example.com" />);
      
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });

    test('deve renderizar sem label quando não fornecido', () => {
      render(<TextField placeholder="Sem label" />);
      
      expect(screen.getByPlaceholderText('Sem label')).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Interação e onChange', () => {
    test('deve chamar onChange quando o valor mudar', async () => {
      const mockOnChange = jest.fn();
      render(<TextField label="Nome" onChange={mockOnChange} />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'João');
      
      expect(mockOnChange).toHaveBeenCalledTimes(4); 
      expect(mockOnChange).toHaveBeenLastCalledWith('João');
    });

    test('deve atualizar o valor interno quando digitado', async () => {
      render(<TextField label="Nome" />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'Maria');
      
      expect(input).toHaveValue('Maria');
    });

    test('deve limpar o campo quando clicar no ícone de limpeza', async () => {
      const mockOnChange = jest.fn();
      render(
        <TextField 
          label="Nome" 
          value="João" 
          onChange={mockOnChange}
          trailingIcon={true}
        />
      );
      
      const input = screen.getByLabelText('Nome');
      await user.click(input); 
      
      const clearIcon = screen.getByLabelText('Limpar campo');
      await user.click(clearIcon);
      
      expect(mockOnChange).toHaveBeenCalledWith('');
    });
  });

  describe('Estado Desabilitado', () => {
    test('deve ser desabilitado quando a prop disabled for true', () => {
      render(<TextField label="Nome" disabled />);
      
      const input = screen.getByLabelText('Nome');
      expect(input).toBeDisabled();
    });

    test('não deve chamar onChange quando desabilitado', async () => {
      const mockOnChange = jest.fn();
      render(<TextField label="Nome" disabled onChange={mockOnChange} />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'Teste');
      
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    test('não deve permitir limpeza quando desabilitado', async () => {
      const mockOnChange = jest.fn();
      render(
        <TextField 
          label="Nome" 
          value="João" 
          disabled 
          onChange={mockOnChange}
          trailingIcon={true}
        />
      );
      
      const input = screen.getByLabelText('Nome');
      expect(input).toHaveValue('João');
      
      await user.click(input);
      

      expect(screen.queryByLabelText('Limpar campo')).not.toBeInTheDocument();
    });
  });

  describe('Limite de Caracteres', () => {
    test('deve respeitar o limite máximo de caracteres', async () => {
      const mockOnChange = jest.fn();
      render(<TextField label="Nome" maxLength={5} onChange={mockOnChange} />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'João Silva'); // 10 caracteres
      
      // Deve parar em 5 caracteres
      expect(input).toHaveValue('João ');
      expect(mockOnChange).toHaveBeenCalledTimes(5);
    });

    test('não deve aceitar mais caracteres após atingir o limite', async () => {
      render(<TextField label="Nome" maxLength={3} value="ABC" />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'DEF');
      
      expect(input).toHaveValue('ABC'); // Não deve mudar
    });
  });

  // ✅ Testes de validação e campo obrigatório
  describe('Validação', () => {
    test('deve mostrar erro quando campo obrigatório estiver vazio', async () => {
      render(<TextField label="Nome" required />);
      
      const input = screen.getByLabelText('Nome');
      await user.click(input);
      await user.tab(); // Sair do campo (blur)
      
      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
    });

    test('deve validar email quando type="email"', async () => {
      render(<TextField label="Email" type="email" required />);
      
      const input = screen.getByLabelText('Email');
      await user.type(input, 'email-invalido');
      await user.tab(); // Blur
      
      expect(screen.getByText('Email inválido.')).toBeInTheDocument();
    });

    test('deve mostrar mensagem de erro personalizada', async () => {
      render(
        <TextField 
          label="Email" 
          type="email" 
          required 
          errorMessage="Por favor, insira um email válido"
        />
      );
      
      const input = screen.getByLabelText('Email');
      await user.type(input, 'teste');
      await user.tab();
      
      expect(screen.getByText('Por favor, insira um email válido')).toBeInTheDocument();
    });
    test('deve limpar erro quando começar a digitar', async () => {
      render(<TextField label="Nome" required />);
      
      const input = screen.getByLabelText('Nome');
      await user.click(input);
      await user.tab(); // Criar erro

      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
      
      await user.type(input, 'J');
      expect(screen.queryByText('Campo obrigatório.')).not.toBeInTheDocument();
    });
  });

  // 🎯 Testes de foco e navegação
  describe('Foco e Navegação', () => {
    test('deve focar no campo quando clicado no label', async () => {
      render(<TextField label="Nome" />);
      
      const label = screen.getByText('Nome');
      await user.click(label);
      
      const input = screen.getByLabelText('Nome');
      expect(input).toHaveFocus();
    });

    test('deve mostrar ícone de limpeza quando focado e tem valor', async () => {
      render(<TextField label="Nome" value="João" trailingIcon={true} />);
      
      const input = screen.getByLabelText('Nome');
      await user.click(input);
      
      expect(screen.getByLabelText('Limpar campo')).toBeInTheDocument();
    });

    test('deve esconder ícone de limpeza quando sair do foco', async () => {
      render(<TextField label="Nome" value="João" trailingIcon={true} />);
      
      const input = screen.getByLabelText('Nome');
      await user.click(input);
      await user.tab(); // Sair do foco
      
      expect(screen.queryByLabelText('Limpar campo')).not.toBeInTheDocument();
    });
  });

  describe('Sincronização de Valor', () => {
    test('deve atualizar valor interno quando prop value mudar', () => {
      const { rerender } = render(<TextField label="Nome" value="João" />);
      
      expect(screen.getByDisplayValue('João')).toBeInTheDocument();
      
      rerender(<TextField label="Nome" value="Maria" />);
      expect(screen.getByDisplayValue('Maria')).toBeInTheDocument();
    });

    test('deve manter valor interno quando não há prop value', async () => {
      render(<TextField label="Nome" />);
      
      const input = screen.getByLabelText('Nome');
      await user.type(input, 'João');
      
      expect(input).toHaveValue('João');
    });
  });

  // 🎨 Testes de ícones e tooltip
  describe('Ícones e Tooltip', () => {
    test('deve renderizar ícone personalizado', () => {
      render(<TextField label="Email" icon={<Mail16Regular />} />);
      
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      // Verifica se o ícone está no DOM
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    test('deve renderizar tooltip quando habilitado', () => {
      render(
        <TextField 
          label="Email" 
          tooltip={true}
          tooltipText="Digite seu email aqui"
        />
      );
      
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    test('deve mostrar asterisco para campos obrigatórios', () => {
      render(<TextField label="Nome" required />);
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // 📝 Testes de helper text
  describe('Helper Text', () => {
    test('deve mostrar helper text quando fornecido', () => {
      render(<TextField label="Nome" helperText="Digite seu nome completo" helper={true}/>);
      
      expect(screen.getByText('Digite seu nome completo')).toBeInTheDocument();
    });

    test('deve mostrar erro no lugar do helper text', async () => {
      render(
        <TextField 
          label="Nome" 
          required 
          helperText="Digite seu nome completo"
          helper={true}
        />
      );
      
      const input = screen.getByLabelText('Nome');
      await user.click(input);
      await user.tab();
      
      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
      expect(screen.queryByText('Digite seu nome completo')).not.toBeInTheDocument();
    });
  });

});