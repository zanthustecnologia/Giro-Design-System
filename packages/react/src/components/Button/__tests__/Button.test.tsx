import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o botão com texto', () => {
      render(<Button>Clique aqui</Button>);
      expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
    });

    it('deve renderizar como elemento button por padrão', () => {
      render(<Button>Botão padrão</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('deve renderizar com ID customizado', () => {
      render(<Button id="custom-id">Botão</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'custom-id');
    });

    it('deve gerar um ID automático quando não fornecido', () => {
      render(<Button>Botão</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id');
      expect(button.getAttribute('id')).toBeTruthy();
    });

    it('deve aplicar className customizada', () => {
      render(<Button className="custom-class">Botão</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variantes', () => {
    it('deve renderizar variante filled por padrão', () => {
      const { container } = render(<Button>Botão</Button>);
      const button = container.querySelector('[class*="button-filled"]');
      expect(button).toBeInTheDocument();
    });

    it('deve renderizar variante outlined', () => {
      const { container } = render(<Button variant="outlined">Botão</Button>);
      const button = container.querySelector('[class*="button-outlined"]');
      expect(button).toBeInTheDocument();
    });

    it('deve renderizar variante text', () => {
      const { container } = render(<Button variant="text">Botão</Button>);
      const button = container.querySelector('[class*="button-text"]');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Tamanhos', () => {
    it('deve renderizar tamanho lg por padrão', () => {
      const { container } = render(<Button>Botão</Button>);
      const button = container.querySelector('[class*="button-lg"]');
      expect(button).toBeInTheDocument();
    });

    it('deve renderizar tamanho sm', () => {
      const { container } = render(<Button size="sm">Botão</Button>);
      const button = container.querySelector('[class*="button-sm"]');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Tipos de botão', () => {
    it('deve ter type="button" por padrão', () => {
      render(<Button>Botão</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('deve aceitar type="submit"', () => {
      render(<Button type="submit">Enviar</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('deve aceitar type="reset"', () => {
      render(<Button type="reset">Resetar</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Estado disabled', () => {
    it('deve renderizar botão desabilitado', () => {
      render(<Button disabled>Botão</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('deve ter tabIndex -1 quando desabilitado', () => {
      render(<Button disabled>Botão</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '-1');
    });

    it('deve ter tabIndex 0 quando habilitado', () => {
      render(<Button>Botão</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('não deve chamar onClick quando desabilitado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Botão</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Eventos de click', () => {
    it('deve chamar onClick quando clicado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Botão</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('deve passar o evento para o handler onClick', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Botão</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('Ícones', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;

    it('deve renderizar ícone à esquerda por padrão', () => {
      render(<Button icon={<TestIcon />}>Botão</Button>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('deve renderizar ícone à esquerda quando iconPosition="left"', () => {
      const { container } = render(
        <Button icon={<TestIcon />} iconPosition="left">Botão</Button>
      );
      const iconSpan = container.querySelector('[class*="buttonIconLeft"]');
      expect(iconSpan).toBeInTheDocument();
      expect(iconSpan).toContainElement(screen.getByTestId('test-icon'));
    });

    it('deve renderizar ícone à direita quando iconPosition="right"', () => {
      const { container } = render(
        <Button icon={<TestIcon />} iconPosition="right">Botão</Button>
      );
      const iconSpan = container.querySelector('[class*="buttonIconRight"]');
      expect(iconSpan).toBeInTheDocument();
      expect(iconSpan).toContainElement(screen.getByTestId('test-icon'));
    });

    it('deve renderizar ícones em ambos os lados quando iconPosition="both"', () => {
      const { container } = render(
        <Button icon={<TestIcon />} iconPosition="both">Botão</Button>
      );
      const iconLeft = container.querySelector('[class*="buttonIconLeft"]');
      const iconRight = container.querySelector('[class*="buttonIconRight"]');
      
      expect(iconLeft).toBeInTheDocument();
      expect(iconRight).toBeInTheDocument();
    });

    it('deve ter aria-hidden nos ícones', () => {
      const { container } = render(
        <Button icon={<TestIcon />}>Botão</Button>
      );
      const iconSpan = container.querySelector('[class*="buttonIconLeft"]');
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Botão icon-only', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;

    it('deve renderizar botão icon-only', () => {
      const { container } = render(
        <Button iconOnly icon={<TestIcon />} ariaLabel="Ação" />
      );
      const iconOnlySpan = container.querySelector('[class*="buttonIconOnly"]');
      expect(iconOnlySpan).toBeInTheDocument();
    });

    it('deve ter ariaLabel quando iconOnly', () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(<Button iconOnly icon={<TestIcon />} ariaLabel="Deletar" />);
      expect(screen.getByLabelText('Deletar')).toBeInTheDocument();
    });

    it('deve emitir aviso quando iconOnly sem ariaLabel ou tooltipText fornecido', () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Button iconOnly icon={<TestIcon />} />);
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[Button]'));
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toBeNull();
      warnSpy.mockRestore();
    });

    it('deve usar tooltipText como aria-label quando iconOnly sem ariaLabel', () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(<Button iconOnly icon={<TestIcon />} tooltipText="Adicionar item" />);
      expect(screen.getByLabelText('Adicionar item')).toBeInTheDocument();
    });

    it('deve emitir console.error quando iconOnly sem icon fornecido', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      // @ts-expect-error — testando uso inválido intencionalmente
      render(<Button iconOnly ariaLabel="Ação" />);
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('[Button]'));
      errorSpy.mockRestore();
    });
  });

  describe('Estado de loading', () => {
    it('deve renderizar spinner quando loading', () => {
      const { container } = render(<Button loading>Botão</Button>);
      const loadingSpan = container.querySelector('[class*="buttonLoading"]');
      expect(loadingSpan).toBeInTheDocument();
    });

    it('deve ocultar conteúdo quando loading', () => {
      render(<Button loading>Clique aqui</Button>);
      expect(screen.queryByText('Clique aqui')).not.toBeInTheDocument();
    });

    it('deve ter spinner dentro de span de loading', () => {
      const { container } = render(<Button loading>Botão</Button>);
      const loadingSpan = container.querySelector('[class*="buttonLoading"]');
      expect(loadingSpan).toBeInTheDocument();
      const spinner = loadingSpan?.querySelector('svg');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Full width', () => {
    it('deve renderizar com full width', () => {
      const { container } = render(<Button fullWidth>Botão</Button>);
      const button = container.querySelector('[class*="buttonFullWidth"]');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Renderização como link (href)', () => {
    it('deve renderizar como <a> quando href é fornecido', () => {
      render(<Button href="/home">Link</Button>);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/home');
    });

    it('deve abrir em nova aba quando external=true', () => {
      render(<Button href="/external" external>Link externo</Button>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('deve usar target customizado', () => {
      render(<Button href="/home" target="_parent">Link</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('target', '_parent');
    });

    it('deve usar rel customizado', () => {
      render(<Button href="/home" rel="noreferrer">Link</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'noreferrer');
    });

    it('deve ter href="#" quando desabilitado', () => {
      render(<Button href="/home" disabled>Link</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#');
    });

    it('deve prevenir navegação quando link disabled é clicado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button href="/home" disabled onClick={handleClick}>Link</Button>);
      
      const link = screen.getByRole('link');
      await user.click(link);
      
      // O onClick não deve ser chamado quando disabled
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Renderização como link (to)', () => {
    it('deve renderizar como <a> quando to é fornecido', () => {
      render(<Button to="/about">Link</Button>);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/about');
    });

    it('deve ter href="#" quando to e disabled', () => {
      render(<Button to="/about" disabled>Link</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#');
    });
  });

  describe('Componente customizado (as)', () => {
    it('deve renderizar com elemento customizado', () => {
      const CustomComponent = ({ children, ...props }: any) => (
        <div data-custom="true" {...props}>{children}</div>
      );
      
      const { container } = render(
        <Button as={CustomComponent}>Custom</Button>
      );
      
      const customElement = container.querySelector('[data-custom="true"]');
      expect(customElement).toBeInTheDocument();
      expect(customElement?.textContent).toBe('Custom');
    });
  });

  describe('Props adicionais', () => {
    it('deve passar props adicionais para o elemento', () => {
      render(<Button data-testid="my-button" data-custom="value">Botão</Button>);
      const button = screen.getByTestId('my-button');
      expect(button).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Ref forwarding', () => {
    it('deve forwardar ref corretamente', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Botão</Button>);
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('AriaLabel', () => {
    it('deve usar ariaLabel customizada', () => {
      render(<Button ariaLabel="Custom label">Botão</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('não deve definir aria-label quando children é string (texto visível já é o nome acessível)', () => {
      render(<Button>Texto do botão</Button>);
      expect(screen.getByRole('button').getAttribute('aria-label')).toBeNull();
    });

    it('não deve ter aria-label quando children não é string e sem ariaLabel', () => {
      render(<Button><span>Conteúdo complexo</span></Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('Conteúdo do children', () => {
    it('deve renderizar children complexos', () => {
      render(
        <Button>
          <span>Texto</span>
          <strong>Negrito</strong>
        </Button>
      );
      expect(screen.getByText('Texto')).toBeInTheDocument();
      expect(screen.getByText('Negrito')).toBeInTheDocument();
    });

    it('deve detectar quando não há conteúdo', () => {
      const { container } = render(
        <Button icon={<svg data-testid="icon" />} />
      );
      const button = container.querySelector('[class*="buttonNoContent"]');
      expect(button).toBeInTheDocument();
    });
  });
});
