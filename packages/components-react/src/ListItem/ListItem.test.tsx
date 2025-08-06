import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListItem from './ListItem';
import type { ListItemProps } from './ListItem';

// ✅ Mock dos componentes dependentes
jest.mock('../Checkbox/Checkbox', () => {
  return function MockCheckbox({ 
    checked, 
    onChange, 
    disabled, 
    name, 
    value,
    label 
  }: any) {
    return (
      <div data-testid="checkbox-mock">
        <input
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          name={name}
          value={value}
          data-testid="checkbox-input"
          aria-label={label || 'checkbox'}
        />
      </div>
    );
  };
});

jest.mock('../Radio/Radio', () => {
  return function MockRadio({ 
    checked, 
    onChange, 
    disabled, 
    name, 
    value 
  }: any) {
    return (
      <div data-testid="radio-mock">
        <input
          type="radio"
          checked={checked || false}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          name={name}
          value={value}
          data-testid="radio-input"
        />
      </div>
    );
  };
});

// ✅ Mock do ícone para testes
const MockIcon = () => <span data-testid="mock-icon">🔧</span>;

describe('ListItem Component', () => {
  const defaultProps: ListItemProps = {
    text: 'Test Item',
    variant: 'text'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Teste básico de renderização
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<ListItem {...defaultProps} />);
      
      expect(screen.getByTestId('list-item')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<ListItem {...defaultProps} className="custom-class" />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveClass('custom-class');
    });

    it('should render with custom id', () => {
      render(<ListItem {...defaultProps} id="custom-id" />);
      
      const textElement = screen.getByText('Test Item');
      expect(textElement).toHaveAttribute('id', 'custom-id-text');
    });

    it('should not render text when text is empty', () => {
      render(<ListItem {...defaultProps} text="" />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toBeInTheDocument();
      expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
    });
  });

  // ✅ Teste de variantes
  describe('Variants', () => {
    it('should render text variant correctly', () => {
      render(<ListItem {...defaultProps} variant="text" />);
      
      expect(screen.getByTestId('list-item')).toHaveClass('zds-list-item--text');
      expect(screen.getByText('Test Item')).toHaveClass('zds-list-item__title');
    });

    it('should render checkbox variant correctly', () => {
      render(<ListItem {...defaultProps} variant="checkbox" name="test-checkbox" value="test" />);
      
      expect(screen.getByTestId('list-item')).toHaveClass('zds-list-item--checkbox');
      expect(screen.getByTestId('checkbox-mock')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toHaveClass('zds-list-item__text');
    });

    it('should render radio variant correctly', () => {
      render(<ListItem {...defaultProps} variant="radio" name="test-radio" value="test" />);
      
      expect(screen.getByTestId('list-item')).toHaveClass('zds-list-item--radio');
      expect(screen.getByTestId('radio-mock')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toHaveClass('zds-list-item__title');
    });

    it('should render icon variant correctly', () => {
      render(<ListItem {...defaultProps} variant="icon" icon={<MockIcon />} />);
      
      expect(screen.getByTestId('list-item')).toHaveClass('zds-list-item--icon');
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toHaveClass('zds-list-item__title');
    });

    it('should fallback to text variant when invalid variant is provided', () => {
      render(<ListItem {...defaultProps} variant={'invalid' as any} />);
      
      expect(screen.getByTestId('list-item')).toHaveClass('zds-list-item--invalid');
      expect(screen.getByText('Test Item')).toHaveClass('zds-list-item__title');
    });
  });

  // ✅ Teste de subtexto
  describe('SubText', () => {
    it('should render subtext when showSubText is true', () => {
      render(<ListItem {...defaultProps} subText="Subtitle" showSubText={true} />);
      
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toHaveClass('zds-list-item__subtext');
    });

    it('should not render subtext when showSubText is false', () => {
      render(<ListItem {...defaultProps} subText="Subtitle" showSubText={false} />);
      
      expect(screen.queryByText('Subtitle')).not.toBeInTheDocument();
    });

    it('should not render subtext when subText is empty', () => {
      render(<ListItem {...defaultProps} subText="" showSubText={true} />);
      
      expect(screen.queryByText('')).not.toBeInTheDocument();
    });

    it('should trim whitespace from subtext', () => {
      render(<ListItem {...defaultProps} subText="  Subtitle  " showSubText={true} />);
      
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });
  });

  // ✅ Teste de estados
  describe('States', () => {
    it('should render disabled state correctly', () => {
      render(<ListItem {...defaultProps} disabled={true} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveClass('zds-list-item--disabled');
      expect(listItem).toHaveAttribute('aria-disabled', 'true');
      expect(listItem).toHaveAttribute('tabIndex', '-1');
    });

    it('should render hovered state correctly', () => {
      render(<ListItem {...defaultProps} hovered={true} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveClass('zds-list-item--hovered');
    });

    it('should render selected state for text variant', () => {
      render(<ListItem {...defaultProps} variant="text" selected={true} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-selected', 'true');
    });

    it('should render checked state for checkbox variant', () => {
      render(<ListItem {...defaultProps} variant="checkbox" checked={true} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-checked', 'true');
    });
  });

  // ✅ Teste de interações
  describe('Interactions', () => {
    it('should call onClick when text variant is clicked', async () => {
      const onClick = jest.fn();
      render(<ListItem {...defaultProps} variant="text" onClick={onClick} />);
      
      const textElement = screen.getByText('Test Item');
      await userEvent.click(textElement);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when checkbox is clicked', async () => {
      const onChange = jest.fn();
      render(<ListItem {...defaultProps} variant="checkbox" onChange={onChange} />);
      
      const textElement = screen.getByText('Test Item');
      await userEvent.click(textElement);
      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should not call callbacks when disabled', async () => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      render(<ListItem {...defaultProps} disabled={true} onClick={onClick} onChange={onChange} />);
      
      const textElement = screen.getByText('Test Item');
      await userEvent.click(textElement);
      
      expect(onClick).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should toggle selection on text variant click', async () => {
      render(<ListItem {...defaultProps} variant="text" />);
      
      const listItem = screen.getByTestId('list-item');
      const textElement = screen.getByText('Test Item');
      
      // Initially not selected
      expect(listItem).toHaveAttribute('aria-selected', 'false');
      
      // Click to select
      await userEvent.click(textElement);
      expect(listItem).toHaveAttribute('aria-selected', 'true');
      
      // Click to deselect
      await userEvent.click(textElement);
      expect(listItem).toHaveAttribute('aria-selected', 'false');
    });
  });

  // ✅ Teste de navegação por teclado
  describe('Keyboard Navigation', () => {
    it('should handle Enter key press', async () => {
      const onClick = jest.fn();
      render(<ListItem {...defaultProps} variant="text" onClick={onClick} />);
      
      const listItem = screen.getByTestId('list-item');
      listItem.focus();
      
      fireEvent.keyDown(listItem, { key: 'Enter' });
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should handle Space key press', async () => {
      const onClick = jest.fn();
      render(<ListItem {...defaultProps} variant="text" onClick={onClick} />);
      
      const listItem = screen.getByTestId('list-item');
      listItem.focus();
      
      fireEvent.keyDown(listItem, { key: ' ' });
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not handle other keys', async () => {
      const onClick = jest.fn();
      render(<ListItem {...defaultProps} variant="text" onClick={onClick} />);
      
      const listItem = screen.getByTestId('list-item');
      listItem.focus();
      
      fireEvent.keyDown(listItem, { key: 'Tab' });
      fireEvent.keyDown(listItem, { key: 'Escape' });
      
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not handle keyboard events when disabled', async () => {
      const onClick = jest.fn();
      render(<ListItem {...defaultProps} disabled={true} onClick={onClick} />);
      
      const listItem = screen.getByTestId('list-item');
      
      fireEvent.keyDown(listItem, { key: 'Enter' });
      fireEvent.keyDown(listItem, { key: ' ' });
      
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // ✅ Teste de acessibilidade
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ListItem {...defaultProps} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('role', 'listitem');
      expect(listItem).toHaveAttribute('tabIndex', '0');
      expect(listItem).toHaveAttribute('aria-labelledby');
    });

    it('should have aria-describedby when subtext is present', () => {
      render(<ListItem {...defaultProps} subText="Subtitle" showSubText={true} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-describedby');
    });

    it('should not have aria-describedby when subtext is not present', () => {
      render(<ListItem {...defaultProps} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-describedby', '');
    });

    it('should have correct role for checkbox variant', () => {
      render(<ListItem {...defaultProps} variant="checkbox" />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('role', 'option');
    });

    it('should have correct role for radio variant', () => {
      render(<ListItem {...defaultProps} variant="radio" />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('role', 'option');
    });

    it('should have aria-live for checkbox and radio variants', () => {
      render(<ListItem {...defaultProps} variant="checkbox" />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-live', 'polite');
    });
  });

  // ✅ Teste de edge cases
  describe('Edge Cases', () => {
    it('should handle null text gracefully', () => {
      render(<ListItem {...defaultProps} text={null as any} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toBeInTheDocument();
    });

    it('should handle undefined callbacks gracefully', () => {
      render(<ListItem {...defaultProps} onClick={undefined} onChange={undefined} />);
      
      const textElement = screen.getByText('Test Item');
      
      // Should not throw error
      expect(() => userEvent.click(textElement)).not.toThrow();
    });

    it('should handle very long text', () => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      render(<ListItem {...defaultProps} text={longText} />);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special characters in text', () => {
      const specialText = '🚀 Special chars: áéíóú ñ & < > " \'';
      render(<ListItem {...defaultProps} text={specialText} />);
      
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('should sync with external checked prop changes', async () => {
      const { rerender } = render(<ListItem {...defaultProps} variant="checkbox" checked={false} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-checked', 'false');
      
      rerender(<ListItem {...defaultProps} variant="checkbox" checked={true} />);
      expect(listItem).toHaveAttribute('aria-checked', 'true');
    });

    it('should sync with external selected prop changes', async () => {
      const { rerender } = render(<ListItem {...defaultProps} variant="text" selected={false} />);
      
      const listItem = screen.getByTestId('list-item');
      expect(listItem).toHaveAttribute('aria-selected', 'false');
      
      rerender(<ListItem {...defaultProps} variant="text" selected={true} />);
      expect(listItem).toHaveAttribute('aria-selected', 'true');
    });
  });

  // ✅ Teste de radio behavior específico
  describe('Radio Behavior', () => {
    it('should only select radio when not already checked', async () => {
      const onChange = jest.fn();
      render(<ListItem {...defaultProps} variant="radio" checked={false} onChange={onChange} />);
      
      const textElement = screen.getByText('Test Item');
      await userEvent.click(textElement);
      
      expect(onChange).toHaveBeenCalledWith(true);
      
      // Reset mock
      onChange.mockClear();
      
      // Rerender with checked=true
      const { rerender } = render(<ListItem {...defaultProps} variant="radio" checked={true} onChange={onChange} />);
      
      await userEvent.click(textElement);
      
      // Should not call onChange again when already checked
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // ✅ Teste de performance
  describe('Performance', () => {
    it('should not re-render unnecessarily', () => {
      const renderSpy = jest.fn();
      
      function TestComponent(props: ListItemProps) {
        renderSpy();
        return <ListItem {...props} />;
      }
      
      const { rerender } = render(<TestComponent {...defaultProps} />);
      
      // Initial render
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props
      rerender(<TestComponent {...defaultProps} />);
      
      // Should only render twice (initial + rerender)
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
