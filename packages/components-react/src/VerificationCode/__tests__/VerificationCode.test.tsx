import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import VerificationCode from '../VerificationCode';
import type { VerificationCodeProps } from '../VerificationCode';

// Helper para renderizar o componente com props padrão
const renderVerificationCode = (props: Partial<VerificationCodeProps> = {}) => {
  const defaultProps: VerificationCodeProps = {
    length: 6,
    inputType: 'numeric',
    hasError: false,
    disabled: false,
    ...props,
  };

  return render(<VerificationCode {...defaultProps} />);
};

// Mock para callbacks
const mockOnComplete = jest.fn();

describe('VerificationCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ TESTES BÁSICOS DE RENDERIZAÇÃO
  describe('Renderização', () => {
    it('deve renderizar o componente corretamente', () => {
      renderVerificationCode();
      
      // Verificar se os 6 inputs são renderizados
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('deve renderizar o número correto de inputs baseado na prop length', () => {
      renderVerificationCode({ length: 4 });
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
    });

    it('deve aplicar a classe CSS personalizada', () => {
      const { container } = renderVerificationCode({ className: 'custom-class' });
      
      const component = container.querySelector('.zds-verification-code__container');
      expect(component).toHaveClass('custom-class');
    });

    it('deve renderizar inputs com maxLength correto', () => {
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('maxLength', '1');
      });
    });
  });

  // ✅ TESTES DE TIPOS DE ENTRADA
  describe('Tipos de Entrada', () => {
    it('deve aceitar apenas números quando inputType é numeric', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ inputType: 'numeric' });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      
      // Deve aceitar número
      await user.type(firstInput, '5');
      expect(firstInput).toHaveValue('5');
      
      // Deve rejeitar letra
      await user.clear(firstInput);
      await user.type(firstInput, 'a');
      expect(firstInput).toHaveValue('');
    });

    it('deve aceitar apenas letras quando inputType é alpha', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ inputType: 'alpha' });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      
      // Deve aceitar letra
      await user.type(firstInput, 'A');
      expect(firstInput).toHaveValue('A');
      
      // Deve rejeitar número
      await user.clear(firstInput);
      await user.type(firstInput, '5');
      expect(firstInput).toHaveValue('');
    });

    it('deve aceitar letras e números quando inputType é alphanumeric', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ inputType: 'alphanumeric' });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Deve aceitar número
      await user.type(inputs[0], '5');
      expect(inputs[0]).toHaveValue('5');
      
      // Deve aceitar letra
      await user.type(inputs[1], 'A');
      expect(inputs[1]).toHaveValue('A');
    });
  });

  // ✅ TESTES DE NAVEGAÇÃO E FOCO
  describe('Navegação e Foco', () => {
    it('deve avançar para o próximo input após digitar', async () => {
      const user = userEvent.setup();
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Digitar no primeiro input
      await user.type(inputs[0], '1');
      
      // Segundo input deve estar focado
      expect(inputs[1]).toHaveFocus();
    });

    it('deve voltar para o input anterior ao pressionar Backspace', async () => {
      const user = userEvent.setup();
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Preencher primeiro input e focar no segundo
      await user.type(inputs[0], '1');
      expect(inputs[1]).toHaveFocus();
      
      // Pressionar Backspace no segundo input vazio
      await user.keyboard('[Backspace]');
      
      // Primeiro input deve estar focado e vazio
      expect(inputs[0]).toHaveFocus();
      expect(inputs[0]).toHaveValue('');
    });

    it('deve limpar input atual ao pressionar Backspace com valor', async () => {
      const user = userEvent.setup();
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Preencher primeiro input
      await user.type(inputs[0], '1');
      await user.click(inputs[0]); // Focar novamente
      
      // Pressionar Backspace
      await user.keyboard('[Backspace]');
      
      // Input deve estar vazio
      expect(inputs[0]).toHaveValue('');
    });

    it('deve navegar com setas direcionais', async () => {
      const user = userEvent.setup();
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      
      // Focar primeiro input
      inputs[0].focus();
      
      // Seta direita deve ir para próximo
      await user.keyboard('[ArrowRight]');
      expect(inputs[1]).toHaveFocus();
      
      // Seta esquerda deve voltar
      await user.keyboard('[ArrowLeft]');
      expect(inputs[0]).toHaveFocus();
    });
  });

  // ✅ TESTES DE CALLBACK onComplete
  describe('Callback onComplete', () => {
    it('deve chamar onComplete quando todos os campos estão preenchidos', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ 
        length: 3, 
        onComplete: mockOnComplete 
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Preencher todos os inputs
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      await user.type(inputs[2], '3');
      
      // Callback deve ser chamado com valor correto
      expect(mockOnComplete).toHaveBeenCalledWith('123');
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onComplete quando campos estão incompletos', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ 
        length: 3, 
        onComplete: mockOnComplete 
      });
      
      const inputs = screen.getAllByRole('textbox');
      
      // Preencher apenas 2 dos 3 inputs
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');
      
      // Callback não deve ser chamado
      expect(mockOnComplete).not.toHaveBeenCalled();
    });
  });

  // ✅ TESTES DE ESTADO DE ERRO
  describe('Estado de Erro', () => {
    it('deve aplicar classe de erro quando hasError é true', () => {
      renderVerificationCode({ hasError: true });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('zds-verification-code__has-error');
      });
    });

    it('deve exibir mensagem de erro quando fornecida', () => {
      const errorMessage = 'Código inválido';
      renderVerificationCode({ 
        hasError: true, 
        errorMessage 
      });
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
    });

    it('não deve exibir mensagem de erro quando hasError é false', () => {
      renderVerificationCode({ 
        hasError: false, 
        errorMessage: 'Erro oculto' 
      });
      
      const errorElement = screen.queryByRole('alert');
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  // ✅ TESTES DE ESTADO DESABILITADO
  describe('Estado Desabilitado', () => {
    it('deve desabilitar todos os inputs quando disabled é true', () => {
      renderVerificationCode({ disabled: true });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('não deve aceitar entrada quando desabilitado', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ disabled: true });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      
      // Tentar digitar
      await user.type(firstInput, '1');
      
      // Input deve permanecer vazio
      expect(firstInput).toHaveValue('');
    });
  });

  // ✅ TESTES DE COLAR (PASTE)
  describe('Funcionalidade de Colar', () => {
    it('deve colar múltiplos valores de uma vez', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ length: 6 });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      firstInput.focus();
      
      // Simular evento de colar
      await user.paste('123456');
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
      expect(inputs[3]).toHaveValue('4');
      expect(inputs[4]).toHaveValue('5');
      expect(inputs[5]).toHaveValue('6');
    });

    it('deve truncar texto colado se for maior que length', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ length: 3 });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      firstInput.focus();
      
      // Colar texto maior que length
      await user.paste('123456789');
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
    });

    it('deve filtrar caracteres inválidos ao colar', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ 
        length: 4, 
        inputType: 'numeric' 
      });
      
      const firstInput = screen.getAllByRole('textbox')[0];
      firstInput.focus();
      
      // Colar texto misto (apenas números devem ser aceitos)
      await user.paste('1a2b3c4d');
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
      expect(inputs[3]).toHaveValue('4');
    });
  });

  // ✅ TESTES DE ACESSIBILIDADE
  describe('Acessibilidade', () => {
    it('deve ter labels ARIA apropriados', () => {
      renderVerificationCode({ length: 3 });
      
      const inputs = screen.getAllByRole('textbox');
      
      expect(inputs[0]).toHaveAttribute('aria-label', 'Dígito 1 de 3');
      expect(inputs[1]).toHaveAttribute('aria-label', 'Dígito 2 de 3');
      expect(inputs[2]).toHaveAttribute('aria-label', 'Dígito 3 de 3');
    });

    it('deve ter aria-invalid correto em estado de erro', () => {
      renderVerificationCode({ hasError: true });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('deve conectar aria-describedby com mensagem de erro', () => {
      renderVerificationCode({
        hasError: true,
        errorMessage: 'Erro de teste'
      });
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-describedby', 'verification-code-error');
      });
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveAttribute('id', 'verification-code-error');
    });

    it('deve ter autoComplete apropriado', () => {
      renderVerificationCode();
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('autoComplete', 'one-time-code');
      });
    });
  });

  // ✅ TESTES DE EDGE CASES
  describe('Edge Cases', () => {
    it('deve lidar com length 1 corretamente', async () => {
      const user = userEvent.setup();
      renderVerificationCode({ 
        length: 1, 
        onComplete: mockOnComplete 
      });
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, '5');
      
      expect(input).toHaveValue('5');
      expect(mockOnComplete).toHaveBeenCalledWith('5');
    });

    it('deve lidar com mudança de inputType dinamicamente', () => {
      const { rerender } = renderVerificationCode({ inputType: 'numeric' });
      
      // Re-renderizar com tipo diferente
      rerender(
        <VerificationCode 
          length={6}
          inputType="alpha"
          hasError={false}
          disabled={false}
        />
      );
      
      // Todos os inputs devem estar vazios após mudança
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });

    it('deve resetar valores quando length muda', () => {
      const { rerender } = renderVerificationCode({ length: 3 });
      
      // Re-renderizar com length diferente
      rerender(
        <VerificationCode 
          length={6}
          inputType="numeric"
          hasError={false}
          disabled={false}
        />
      );
      
      // Deve ter 6 inputs agora, todos vazios
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
      inputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });
  });
});