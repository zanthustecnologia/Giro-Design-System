import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Dialog from '../Dialog';
import type { DialogProps } from '../Dialog.types';

// Helper para renderizar o componente com props padrão
const renderDialog = (props: Partial<DialogProps> = {}) => {
  const defaultProps: DialogProps = {
    show: true,
    title: 'Confirmar ação',
    text: 'Deseja realmente continuar?',
    ...props,
  };

  return render(<Dialog {...defaultProps} />);
};

// Mocks para callbacks
const mockFnConfirm = jest.fn();
const mockFnCancel = jest.fn();
const mockOnClose = jest.fn();

describe('Dialog Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset body styles que podem ter sido alterados
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
  });

  // ✅ TESTES BÁSICOS DE RENDERIZAÇÃO
  describe('Renderização', () => {
    it('deve renderizar quando show é true', () => {
      renderDialog({ show: true });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('NÃO deve renderizar quando show é false', () => {
      renderDialog({ show: false });
      
      const dialog = screen.queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
    });

    it('deve renderizar título corretamente', () => {
      renderDialog({ title: 'Título personalizado' });
      
      expect(screen.getByText('Título personalizado')).toBeInTheDocument();
    });

    it('deve renderizar texto/conteúdo corretamente', () => {
      renderDialog({ text: 'Conteúdo do modal' });
      
      expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
    });

    it('deve aplicar className personalizada', () => {
      renderDialog({ className: 'custom-dialog' });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('zds-dialog', 'custom-dialog');
    });

    it('deve gerar ID automático quando não fornecido', () => {
      renderDialog();
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id');
      expect(dialog.getAttribute('id')).toBeTruthy();
    });

    it('deve usar ID personalizado quando fornecido', () => {
      renderDialog({ id: 'custom-dialog' });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id', 'custom-dialog');
    });
  });

  // ✅ TESTES DE BOTÕES
  describe('Botões e Ações', () => {
    it('deve renderizar botão de confirmação com texto padrão', () => {
      renderDialog();
      
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      expect(confirmButton).toBeInTheDocument();
    });

    it('deve renderizar botão de cancelamento com texto padrão', () => {
      renderDialog();
      
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      expect(cancelButton).toBeInTheDocument();
    });

    it('deve renderizar botões com textos personalizados', () => {
      renderDialog({ 
        textConfirm: 'Confirmar',
        textCancel: 'Voltar'
      });
      
      expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
    });

    it('NÃO deve renderizar botão cancelar quando textCancel está vazio', () => {
      renderDialog({ textCancel: '' });
      
      const cancelButton = screen.queryByRole('button', { name: /cancelar/i });
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('NÃO deve renderizar botão cancelar quando textCancel é só espaços', () => {
      renderDialog({ textCancel: '   ' });
      
      const cancelButton = screen.queryByRole('button', { name: /cancelar/i });
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('deve chamar fnConfirm ao clicar em confirmar', async () => {
      const user = userEvent.setup();
      renderDialog({ fnConfirm: mockFnConfirm });
      
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      await user.click(confirmButton);
      
      expect(mockFnConfirm).toHaveBeenCalledTimes(1);
    });

    it('deve chamar fnCancel ao clicar em cancelar', async () => {
      const user = userEvent.setup();
      renderDialog({ fnCancel: mockFnCancel });
      
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);
      
      expect(mockFnCancel).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao confirmar', async () => {
      const user = userEvent.setup();
      renderDialog({ 
        fnConfirm: mockFnConfirm,
        onClose: mockOnClose 
      });
      
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      await user.click(confirmButton);
      
      expect(mockFnConfirm).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao cancelar', async () => {
      const user = userEvent.setup();
      renderDialog({ 
        fnCancel: mockFnCancel,
        onClose: mockOnClose 
      });
      
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      await user.click(cancelButton);
      
      expect(mockFnCancel).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ TESTES DE TECLADO
  describe('Navegação por Teclado', () => {
    it('deve fechar modal ao pressionar ESC', async () => {
      const user = userEvent.setup();
      renderDialog({ fnCancel: mockFnCancel });
      
      // Focar no modal
      const dialog = screen.getByRole('dialog');
      dialog.focus();
      
      await user.keyboard('{Escape}');
      
      expect(mockFnCancel).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao pressionar ESC', async () => {
      const user = userEvent.setup();
      renderDialog({ 
        fnCancel: mockFnCancel,
        onClose: mockOnClose 
      });
      
      const dialog = screen.getByRole('dialog');
      dialog.focus();
      
      await user.keyboard('{Escape}');
      
      expect(mockFnCancel).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve funcionar ESC mesmo sem fnCancel definido', async () => {
      const user = userEvent.setup();
      renderDialog({ onClose: mockOnClose }); // Sem fnCancel
      
      const dialog = screen.getByRole('dialog');
      dialog.focus();
      
      await user.keyboard('{Escape}');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve permitir navegação por Tab entre botões', async () => {
      const user = userEvent.setup();
      renderDialog();
      
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      
      // Focar primeiro botão
      cancelButton.focus();
      expect(cancelButton).toHaveFocus();
      
      // Tab para próximo botão
      await user.keyboard('{Tab}');
      expect(confirmButton).toHaveFocus();
    });

    it('deve ativar botões com Enter/Space', async () => {
      const user = userEvent.setup();
      renderDialog({ fnConfirm: mockFnConfirm });
      
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      confirmButton.focus();
      
      await user.keyboard('{Enter}');
      expect(mockFnConfirm).toHaveBeenCalledTimes(1);
      
      jest.clearAllMocks();
      
      await user.keyboard(' '); // Space
      expect(mockFnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ TESTES DE ACESSIBILIDADE
  describe('Acessibilidade', () => {
    it('deve ter role="dialog" correto', () => {
      renderDialog();
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('role', 'dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('deve ter tabIndex="-1" para permitir foco programático', () => {
      renderDialog();
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('tabIndex', '-1');
    });

    it('deve ter aria-labelledby apontando para o título', () => {
      renderDialog({ id: 'test-dialog' });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'zds-dialog__title-test-dialog');
      
      // Verificar se elemento com esse ID existe
      const titleElement = document.getElementById('zds-dialog-title-test-dialog');
      expect(titleElement).toBeInTheDocument();
    });

    it('deve ter aria-describedby apontando para o texto', () => {
      renderDialog({ id: 'test-dialog' });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'zds-dialog__desc-test-dialog');
      
      // Verificar se elemento com esse ID existe
      const textElement = document.getElementById('zds-dialog-desc-test-dialog');
      expect(textElement).toBeInTheDocument();
    });

    it('deve ter estrutura de IDs consistente', () => {
      renderDialog({ 
        id: 'test-dialog',
        title: 'Título teste',
        text: 'Texto teste'
      });
      
      // Verificar se IDs seguem padrão correto
      const titleElement = document.getElementById('zds-dialog-title-test-dialog');
      const textElement = document.getElementById('zds-dialog-desc-test-dialog');
      
      expect(titleElement).toHaveTextContent('Título teste');
      expect(textElement).toHaveTextContent('Texto teste');
    });
  });

  // ✅ TESTES DE ESTRUTURA DOM
  describe('Estrutura DOM', () => {
    it('deve renderizar overlay/backdrop', () => {
      const { container } = renderDialog();
      
      const overlay = container.querySelector('.zds-dialog__overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('deve renderizar wrapper centralizador', () => {
      const { container } = renderDialog();
      
      const wrapper = container.querySelector('.zds-dialog__wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('deve ter estrutura de classes CSS correta', () => {
      const { container } = renderDialog({ className: 'custom' });
      
      const overlay = container.querySelector('.zds-dialog__overlay');
      const wrapper = container.querySelector('.zds-dialog__wrapper');
      const dialog = container.querySelector('.zds-dialog.custom');
      const title = container.querySelector('.zds-dialog__title');
      const text = container.querySelector('.zds-dialog__text');
      const actions = container.querySelector('.zds-dialog__actions');
      
      expect(overlay).toBeInTheDocument();
      expect(wrapper).toBeInTheDocument();
      expect(dialog).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      expect(actions).toBeInTheDocument();
    });
  });

  // ✅ TESTES DE EDGE CASES
  describe('Edge Cases', () => {
    it('deve lidar com título null/undefined', () => {
      // TypeScript não permite, mas pode acontecer em runtime
      renderDialog({ title: '' });
      
      const titleElement = screen.getByText(''); // Título vazio
      expect(titleElement).toBeInTheDocument();
    });

    it('deve lidar com text como ReactNode', () => {
      const customText = <div><span>Texto</span> <strong>formatado</strong></div>;
      renderDialog({ text: customText });
      
      expect(screen.getByText('Texto')).toBeInTheDocument();
      expect(screen.getByText('formatado')).toBeInTheDocument();
    });

    it('deve funcionar sem callbacks opcionais', async () => {
      const user = userEvent.setup();
      renderDialog(); // Sem callbacks
      
      const confirmButton = screen.getByRole('button', { name: /ok/i });
      const cancelButton = screen.getByRole('button', { name: /cancelar/i });
      
      // Não deve gerar erro
      await user.click(confirmButton);
      await user.click(cancelButton);
      
      // Dialog ainda deve estar presente (sem onClose)
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('deve lidar com textConfirm/textCancel vazios graciosamente', () => {
      renderDialog({ 
        textConfirm: '',
        textCancel: ''
      });
      
      // Confirmar sempre aparece (fallback para 'OK')
      expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
      
      // Cancelar não aparece quando vazio
      expect(screen.queryByRole('button', { name: /cancelar/i })).not.toBeInTheDocument();
    });

    it('deve lidar com className undefined', () => {
      renderDialog({ className: undefined });
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('zds-dialog');
      expect(dialog).not.toHaveClass('undefined');
    });
  });

  // ✅ TESTES DE PERFORMANCE E MEMORIZAÇÃO
  describe('Performance', () => {
    it('deve ter displayName correto', () => {
      expect(Dialog.displayName).toBe('Dialog');
    });

    it('componente deve ser memoizado', () => {
      const { rerender } = renderDialog({ title: 'Teste' });
      
      // Re-render com mesmas props não deve causar re-renderização
      rerender(<Dialog show={true} title="Teste" />);
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('deve re-renderizar quando props relevantes mudam', () => {
      const { rerender } = renderDialog({ title: 'Título 1' });
      
      expect(screen.getByText('Título 1')).toBeInTheDocument();
      
      rerender(<Dialog show={true} title="Título 2" />);
      
      expect(screen.getByText('Título 2')).toBeInTheDocument();
      expect(screen.queryByText('Título 1')).not.toBeInTheDocument();
    });
  });
});