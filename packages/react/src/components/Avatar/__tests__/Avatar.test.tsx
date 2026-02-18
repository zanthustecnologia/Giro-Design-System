import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

import Avatar from '../Avatar';

describe('Avatar', () => {
  const MockIcon = () => <span data-testid="mock-icon">U</span>;

  describe('Renderização básica', () => {
    it('renderiza o componente sem erros', () => {
      const { container } = render(<Avatar icon={<MockIcon />} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renderiza o ícone no fallback quando src não é fornecido', () => {
      render(<Avatar icon={<MockIcon />} />);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza com src fornecido', () => {
      render(<Avatar icon={<MockIcon />} src="https://example.com/avatar.jpg" />);
      // O Radix Avatar mantém o fallback no DOM para exibir caso a imagem falhe
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza apenas o fallback quando não há src', () => {
      const { container } = render(<Avatar icon={<MockIcon />} />);
      const fallback = container.querySelector('[class*="AvatarFallback"]');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Tamanhos', () => {
    it('aplica classes corretas quando size é "sm"', () => {
      const { container } = render(<Avatar icon={<MockIcon />} size="sm" />);
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      expect(className).toMatch(/AvatarRoot--sm/);
    });

    it('aplica classes corretas quando size é "lg"', () => {
      const { container } = render(<Avatar icon={<MockIcon />} size="lg" />);
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      expect(className).toMatch(/AvatarRoot--lg/);
    });

    it('usa "sm" como tamanho padrão quando size não é fornecido', () => {
      const { container } = render(<Avatar icon={<MockIcon />} />);
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      expect(className).toMatch(/AvatarRoot--sm/);
    });
  });

  describe('Classes CSS', () => {
    it('aplica className personalizado', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} className="custom-class" />
      );
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      expect(avatarRoot).toHaveClass('custom-class');
    });

    it('mantém classes padrão ao adicionar className personalizado', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} className="custom-class" size="lg" />
      );
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      
      expect(avatarRoot).toHaveClass('custom-class');
      expect(className).toMatch(/AvatarRoot/);
      expect(className).toMatch(/AvatarRoot--lg/);
    });
  });

  describe('Props adicionais', () => {
    it('passa props adicionais via rest para o Root', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} data-testid="custom-avatar" />
      );
      const avatarRoot = container.querySelector('[data-testid="custom-avatar"]');
      expect(avatarRoot).toBeInTheDocument();
    });

    it('passa múltiplas props adicionais', () => {
      const { container } = render(
        <Avatar
          icon={<MockIcon />}
          data-testid="custom-avatar"
          aria-label="User profile"
        />
      );
      const avatarRoot = container.querySelector('[data-testid="custom-avatar"]');
      expect(avatarRoot).toHaveAttribute('aria-label', 'User profile');
    });
  });

  describe('Estrutura do componente', () => {
    it('renderiza com a estrutura DOM correta', () => {
      const { container } = render(<Avatar icon={<MockIcon />} />);
      const wrapper = container.firstChild;
      const avatarRoot = wrapper?.firstChild as HTMLElement;
      
      expect(wrapper?.nodeName).toBe('DIV');
      const className = avatarRoot?.className || '';
      expect(className).toMatch(/AvatarRoot/);
    });

    it('renderiza o fallback dentro do Root', () => {
      const { container } = render(<Avatar icon={<MockIcon />} />);
      const fallback = container.querySelector('[class*="AvatarFallback"]');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toContainElement(screen.getByTestId('mock-icon'));
    });

    it('renderiza a classe AvatarRoot corretamente', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} size="lg" />
      );
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      expect(avatarRoot).toBeInTheDocument();
      const className = avatarRoot?.className || '';
      expect(className).toMatch(/AvatarRoot/);
    });
  });

  describe('Tipos de ícone', () => {
    it('renderiza ícone como string', () => {
      render(<Avatar icon="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renderiza ícone como elemento React', () => {
      const CustomIcon = () => (
        <svg data-testid="custom-svg-icon">
          <circle cx="10" cy="10" r="5" />
        </svg>
      );
      render(<Avatar icon={<CustomIcon />} />);
      expect(screen.getByTestId('custom-svg-icon')).toBeInTheDocument();
    });

    it('renderiza múltiplos elementos no ícone', () => {
      render(
        <Avatar
          icon={
            <div data-testid="complex-icon">
              <span>A</span>
              <span>B</span>
            </div>
          }
        />
      );
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
    });
  });

  describe('Combinação de propriedades', () => {
    it('renderiza corretamente com todas as props fornecidas', () => {
      render(
        <Avatar
          icon={<MockIcon />}
          src="https://example.com/avatar.jpg"
          size="lg"
          className="custom-avatar"
          data-testid="full-props-avatar"
        />
      );

      const avatarRoot = screen.getByTestId('full-props-avatar');
      const className = avatarRoot?.className || '';
      
      expect(avatarRoot).toBeInTheDocument();
      expect(avatarRoot).toHaveClass('custom-avatar');
      expect(className).toMatch(/AvatarRoot--lg/);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza sm com src fornecido', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} src="https://example.com/avatar.jpg" size="sm" />
      );
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      
      expect(className).toMatch(/AvatarRoot--sm/);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renderiza lg sem imagem (apenas fallback)', () => {
      const { container } = render(<Avatar icon={<MockIcon />} size="lg" />);
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      const className = avatarRoot?.className || '';
      
      expect(className).toMatch(/AvatarRoot--lg/);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('aplica aria-label corretamente', () => {
      const { container } = render(
        <Avatar icon={<MockIcon />} aria-label="Foto do usuário" />
      );
      const avatarRoot = container.querySelector('[class*="AvatarRoot"]');
      expect(avatarRoot).toHaveAttribute('aria-label', 'Foto do usuário');
    });
  });
});
