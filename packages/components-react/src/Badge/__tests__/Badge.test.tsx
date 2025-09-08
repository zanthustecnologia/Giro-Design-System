// Badge.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../Badge';

describe('Badge Component', () => {
  describe('Renderização Básica', () => {
    test('deve renderizar badge de notificação com valor', () => {
      render(<Badge type="notification" value={5} />);
      
      const badge = screen.getByTestId('badge-notification');
      const value = screen.getByText('5');
      
      expect(badge).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(badge).toHaveClass('zds-badge');
      expect(badge).toHaveClass('zds-badge-has-value');
    });

    test('deve renderizar badge de status com valor', () => {
      render(<Badge type="status" value="NEW" />);
      
      const badge = screen.getByTestId('badge-status');
      const value = screen.getByText('NEW');
      
      expect(badge).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(badge).toHaveClass('zds-badge__status');
    });

    test('deve renderizar children quando fornecido', () => {
      render(
        <Badge type="notification" value={3}>
          <button data-testid="child-button">Click me</button>
        </Badge>
      );
      
      const child = screen.getByTestId('child-button');
      const content = screen.getByTestId('badge-content');
      
      expect(child).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe('Estados Vazios', () => {
    test('deve renderizar badge vazio quando value é null', () => {
      render(<Badge type="notification" value={null} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge-empty');
      expect(badge).not.toHaveClass('zds-badge-has-value');
    });

    test('deve renderizar badge vazio quando value é string vazia', () => {
      render(<Badge type="notification" value="" />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge-empty');
    });

    test('deve renderizar badge vazio quando value é undefined', () => {
      render(<Badge type="notification" value={undefined} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge-empty');
    });

    test('deve renderizar badge de status vazio', () => {
      render(<Badge type="status" value={null} />);
      
      const badge = screen.getByTestId('badge-status');
      expect(badge).toHaveClass('zds-badge__status--empty');
    });
  });

  describe('Valor Máximo', () => {
    test('deve exibir "99+" quando valor excede maxValue padrão', () => {
      render(<Badge type="notification" value={150} />);
      
      const badge = screen.getByTestId('badge-notification');
      const value = screen.getByText('99+');
      
      expect(value).toBeInTheDocument();
      expect(badge).toHaveClass('zds-badge-large');
    });

    test('deve exibir "50+" quando valor excede maxValue customizado', () => {
      render(<Badge type="notification" value={75} maxValue={50} />);
      
      const value = screen.getByText('50+');
      expect(value).toBeInTheDocument();
    });

    test('deve exibir valor exato quando não excede maxValue', () => {
      render(<Badge type="notification" value={25} maxValue={50} />);
      
      const value = screen.getByText('25');
      expect(value).toBeInTheDocument();
    });

    test('deve aplicar classe large quando valor excede maxValue', () => {
      render(<Badge type="notification" value={100} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge-large');
    });
  });

  describe('Tipos de Badge', () => {
    test('deve renderizar badge tipo notification com classes corretas', () => {
      render(<Badge type="notification" value={5} />);
      
      const container = screen.getByTestId('badge-notification').parentElement;
      const badge = screen.getByTestId('badge-notification');
      
      expect(container).toHaveClass('zds-badge-container');
      expect(badge).toHaveClass('zds-badge');
    });

    test('deve renderizar badge tipo status com classes corretas', () => {
      render(<Badge type="status" value={1} />);
      
      const container = screen.getByTestId('badge-status').parentElement;
      const badge = screen.getByTestId('badge-status');
      
      expect(container).toHaveClass('zds-badge-container__status');
      expect(badge).toHaveClass('zds-badge__status');
    });
  });

  describe('Interatividade', () => {
    test('deve chamar onClick quando clicado', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('não deve chamar onClick quando desabilitado', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} disabled />);
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.click(badge);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('deve responder a tecla Enter quando clicável', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.keyDown(badge, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('deve responder a tecla Space quando clicável', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.keyDown(badge, { key: ' ' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('não deve responder a outras teclas', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.keyDown(badge, { key: 'Escape' });
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('deve prevenir propagação de eventos', () => {
      const handleClick = jest.fn();
      const handleContainerClick = jest.fn();
      
      render(
        <div onClick={handleContainerClick}>
          <Badge type="notification" value={5} onClick={handleClick} />
        </div>
      );
      
      const badge = screen.getByTestId('badge-notification');
      fireEvent.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleContainerClick).not.toHaveBeenCalled();
    });
  });

  describe('Estados', () => {
    test('deve aplicar classe de desabilitado quando disabled é true', () => {
      render(<Badge type="notification" value={5} disabled className="test-class" />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge--disabled');
      expect(badge).toHaveClass('test-class');
    });

    test('deve aplicar classe de clicável quando onClick é fornecido', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} className="test-class" />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveClass('zds-badge--clickable');
      expect(badge).toHaveClass('test-class');
    });

    test('não deve aplicar classe de clicável quando disabled', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} disabled />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).not.toHaveClass('zds-badge--clickable');
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter role="button" quando clicável', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveAttribute('role', 'button');
    });

    test('deve ter tabIndex="0" quando clicável', () => {
      const handleClick = jest.fn();
      render(<Badge type="notification" value={5} onClick={handleClick} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveAttribute('tabIndex', '0');
    });

    test('não deve ter role ou tabIndex quando não clicável', () => {
      render(<Badge type="notification" value={5} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).not.toHaveAttribute('role');
      expect(badge).not.toHaveAttribute('tabIndex');
    });

    test('deve ter aria-label personalizado quando fornecido', () => {
      render(<Badge type="notification" value={5} aria-label="Cinco notificações pendentes" />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveAttribute('aria-label', 'Cinco notificações pendentes');
    });

    test('deve ter aria-label padrão para notificações', () => {
      render(<Badge type="notification" value={3} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveAttribute('aria-label', '3 notificações');
    });

    test('não deve ter aria-label para badge vazio', () => {
      render(<Badge type="notification" value={null} />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).not.toHaveAttribute('aria-label');
    });

    test('deve ter aria-disabled quando desabilitado', () => {
      render(<Badge type="notification" value={5} disabled />);
      
      const badge = screen.getByTestId('badge-notification');
      expect(badge).toHaveAttribute('aria-disabled', 'true');
    });

    test('valor deve ter aria-hidden quando aria-label personalizado é fornecido', () => {
      render(<Badge type="notification" value={5} aria-label="Custom label" />);
      
      const value = screen.getByText('5');
      expect(value).toHaveAttribute('aria-hidden', 'true');
    });

    test('valor não deve ter aria-hidden quando aria-label não é fornecido', () => {
      render(<Badge type="notification" value={5} />);
      
      const value = screen.getByText('5');
      expect(value).toHaveAttribute('aria-hidden', 'false');
    });
  });
});