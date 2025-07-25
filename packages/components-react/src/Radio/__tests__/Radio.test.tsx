import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Radio from '../Radio';

describe('Radio Component', () => {
  // ✅ Test 1: Renderização básica
  it('should render with label', () => {
    render(
      <Radio 
        value="test" 
        label="Test Radio" 
        name="test-group"
      />
    );
    
    expect(screen.getByLabelText('Test Radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  // ✅ Test 2: Renderização sem label
  it('should render without label', () => {
    render(
      <Radio 
        value="test" 
        name="test-group"
      />
    );
    
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.queryByText('Test Radio')).not.toBeInTheDocument();
  });

  // ✅ Test 3: Estado checked
  it('should be checked when checked prop is true', () => {
    render(
      <Radio 
        value="test" 
        label="Test Radio" 
        checked={true}
        name="test-group"
      />
    );
    
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  // ✅ Test 4: Estado unchecked
  it('should not be checked when checked prop is false', () => {
    render(
      <Radio 
        value="test" 
        label="Test Radio" 
        checked={false}
        name="test-group"
      />
    );
    
    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.checked).toBe(false);
  });

  // ✅ Test 5: Estado disabled
  it('should be disabled when disabled prop is true', () => {
    render(
      <Radio 
        value="test" 
        label="Test Radio" 
        disabled={true}
        name="test-group"
      />
    );
    
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  // ✅ Test 6: Callback onChange
  it('should call onChange when clicked', () => {
    const handleChange = jest.fn();
    
    render(
      <Radio 
        value="test-value" 
        label="Test Radio" 
        onChange={handleChange}
        name="test-group"
      />
    );
    
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('test-value');
  });

  // ✅ Test 7: Não chama onChange quando disabled
  it('should not call onChange when disabled', () => {
    const handleChange = jest.fn();
    
    render(
      <Radio 
        value="test" 
        label="Test Radio" 
        disabled={true}
        onChange={handleChange}
        name="test-group"
      />
    );
    
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  // ✅ Test 8: Propriedades HTML corretas
  it('should have correct HTML attributes', () => {
    render(
      <Radio 
        value="test-value" 
        name="test-group"
        id="test-id"
        className="custom-class"
      />
    );
    
    const radio = screen.getByRole('radio');
    
    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('name', 'test-group');
    expect(radio).toHaveAttribute('value', 'test-value');
    expect(radio).toHaveAttribute('id', 'test-id');
  });

  // ✅ Test 9: Classes CSS
  it('should apply correct CSS classes', () => {
    const { container } = render(
      <Radio 
        value="test" 
        className="custom-class"
        disabled={true}
      />
    );
    
    const radioWrapper = container.firstChild;
    
    expect(radioWrapper).toHaveClass('zds-radiobutton');
    expect(radioWrapper).toHaveClass('zds-radiobutton__disabled');
    expect(radioWrapper).toHaveClass('custom-class');
  });

  // ✅ Test 10: ID automático quando não fornecido
  it('should generate automatic ID when not provided', () => {
    render(
      <Radio 
        value="auto-id-test" 
        label="Test Radio"
      />
    );
    
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('id', 'radio-auto-id-test');
  });

  // ✅ Test 11: Grupo de radios (comportamento exclusivo)
  it('should work correctly in a radio group', () => {
    const handleChange = jest.fn();
    
    render(
      <div>
        <Radio 
          value="option1" 
          label="Option 1" 
          name="test-group"
          checked={true}
          onChange={handleChange}
        />
        <Radio 
          value="option2" 
          label="Option 2" 
          name="test-group"
          checked={false}
          onChange={handleChange}
        />
        <Radio 
          value="option3" 
          label="Option 3" 
          name="test-group"
          checked={false}
          onChange={handleChange}
        />
      </div>
    );
    
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    
    // Verificar que apenas o primeiro está marcado
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
    expect(radios[2].checked).toBe(false);
    
    // Todos devem ter o mesmo name
    radios.forEach(radio => {
      expect(radio.name).toBe('test-group');
    });
  });
});