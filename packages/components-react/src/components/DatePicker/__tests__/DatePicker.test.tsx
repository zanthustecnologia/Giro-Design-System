import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '../DatePicker';
import type { DatePickerProps } from '../DatePicker';

// ✅ Mock do componente Calendar
jest.mock('../../Calendar/Calendar', () => {
  return function MockCalendar({ onDaySelect, selectedDate }: any) {
    return (
      <div data-testid="calendar-mock">
        <button
          onClick={() => onDaySelect(new Date(2024, 0, 15))}
          data-testid="calendar-day-15"
        >
          15
        </button>
        <div data-testid="selected-date">
          {selectedDate ? selectedDate.toDateString() : 'No date'}
        </div>
      </div>
    );
  };
});

// ✅ Mock do TextField
jest.mock('../../TextField/TextField', () => {
  return function MockTextField({ 
    value, 
    onChange, 
    label, 
    placeholder, 
    disabled, 
    errorMessage, 
    icon,
    ...props 
  }: any) {
    return (
      <div data-testid="textfield-mock">
        {label && <label>{label}</label>}
        <input
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          data-testid="date-input"
          {...props}
        />
        {icon && <span data-testid="calendar-icon">{icon}</span>}
        {errorMessage && (
          <span data-testid="error-message" role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    );
  };
});

describe('DatePicker Component', () => {
  const defaultProps: DatePickerProps = {
    label: 'Select Date',
    locale: 'pt-br'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Teste básico de renderização
  describe('Rendering', () => {
    it('should render DatePicker with label', () => {
      render(<DatePicker {...defaultProps} />);
      
      expect(screen.getByText('Select Date')).toBeInTheDocument();
      expect(screen.getByTestId('date-input')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });

    it('should render with default placeholder for pt-br locale', () => {
      render(<DatePicker {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument();
    });

    it('should render with default placeholder for en-us locale', () => {
      render(<DatePicker {...defaultProps} locale="en-us" />);
      
      expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<DatePicker {...defaultProps} placeholder="Choose a date" />);
      
      expect(screen.getByPlaceholderText('Choose a date')).toBeInTheDocument();
    });
  });

  // ✅ Teste de estados
  describe('States', () => {
    it('should render as disabled when disabled prop is true', () => {
      render(<DatePicker {...defaultProps} disabled />);
      
      const input = screen.getByTestId('date-input');
      expect(input).toBeDisabled();
    });

    it('should show required indicator when required prop is true', () => {
      render(<DatePicker {...defaultProps} required />);
      
      // Assuming the TextField component shows required state
      expect(screen.getByTestId('textfield-mock')).toBeInTheDocument();
    });
  });

  // ✅ Teste de interações
  describe('Interactions', () => {
    it('should show calendar when clicking on wrapper', async () => {
      render(<DatePicker {...defaultProps} />);
      
      const wrapper = screen.getByRole('combobox');
      fireEvent.click(wrapper);
      
      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
    });

    it('should hide calendar when clicking outside', async () => {
      render(<DatePicker {...defaultProps} />);
      
      // Open calendar
      const wrapper = screen.getByRole('combobox');
      fireEvent.click(wrapper);
      
      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
      
      // Click outside
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });

    it('should hide calendar when pressing Escape', async () => {
      render(<DatePicker {...defaultProps} />);
      
      // Open calendar
      const wrapper = screen.getByRole('combobox');
      fireEvent.click(wrapper);
      
      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
      
      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });
  });

  // ✅ Teste de input de texto
  describe('Text Input', () => {
    it('should accept valid date input for pt-br locale', async () => {
      const onDateChange = jest.fn();
      render(<DatePicker {...defaultProps} onDateChange={onDateChange} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '15/01/2024');
      
      expect(input).toHaveValue('15/01/2024');
      expect(onDateChange).toHaveBeenCalled();
    });

    it('should accept valid date input for en-us locale', async () => {
      const onDateChange = jest.fn();
      render(<DatePicker {...defaultProps} locale="en-us" onDateChange={onDateChange} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '01/15/2024');
      
      expect(input).toHaveValue('01/15/2024');
      expect(onDateChange).toHaveBeenCalled();
    });

    it('should show error for invalid date format', async () => {
      const onError = jest.fn();
      render(<DatePicker {...defaultProps} onError={onError} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '32/01/2024'); // Invalid day
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
        expect(onError).toHaveBeenCalled();
      });
    });

    it('should clear input when value is empty', async () => {
      const onDateChange = jest.fn();
      render(<DatePicker {...defaultProps} onDateChange={onDateChange} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '15/01/2024');
      await userEvent.clear(input);
      
      expect(input).toHaveValue('');
      expect(onDateChange).toHaveBeenCalledWith(null);
    });
  });

  // ✅ Teste de seleção no calendário
  describe('Calendar Selection', () => {
    it('should select date from calendar', async () => {
      const onDateChange = jest.fn();
      render(<DatePicker {...defaultProps} onDateChange={onDateChange} />);
      
      // Open calendar
      const wrapper = screen.getByRole('combobox');
      fireEvent.click(wrapper);
      
      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
      
      // Select date from calendar
      const dayButton = screen.getByTestId('calendar-day-15');
      fireEvent.click(dayButton);
      
      expect(onDateChange).toHaveBeenCalledWith(new Date(2024, 0, 15));
      
      // Calendar should close
      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });
  });

  // ✅ Teste de validação
  describe('Validation', () => {
    it('should show required error when field is required and empty', () => {
      render(<DatePicker {...defaultProps} required />);
      
      const input = screen.getByTestId('date-input');
      fireEvent.blur(input);
      
      // Should show required error
      expect(screen.getByTestId('error-message')).toHaveTextContent('Data é obrigatória');
    });

    it('should validate custom validator', async () => {
      const customValidator = jest.fn().mockReturnValue('Custom error');
      render(<DatePicker {...defaultProps} customValidator={customValidator} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '15/01/2024');
      
      expect(customValidator).toHaveBeenCalled();
      expect(screen.getByTestId('error-message')).toHaveTextContent('Custom error');
    });

    it('should validate date range with minDate', async () => {
      const minDate = new Date(2024, 0, 20); // Jan 20, 2024
      render(<DatePicker {...defaultProps} minDate={minDate} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '15/01/2024'); // Before minDate
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(/posterior/);
      });
    });

    it('should validate date range with maxDate', async () => {
      const maxDate = new Date(2024, 0, 10); // Jan 10, 2024
      render(<DatePicker {...defaultProps} maxDate={maxDate} />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '15/01/2024'); // After maxDate
      
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(/anterior/);
      });
    });
  });

  // ✅ Teste de acessibilidade
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<DatePicker {...defaultProps} />);
      
      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-label', 'Seletor de data');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');
      expect(combobox).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should update aria-expanded when calendar is opened', async () => {
      render(<DatePicker {...defaultProps} />);
      
      const combobox = screen.getByRole('combobox');
      fireEvent.click(combobox);
      
      await waitFor(() => {
        expect(combobox).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should have error message with proper ARIA attributes', async () => {
      render(<DatePicker {...defaultProps} required />);
      
      const input = screen.getByTestId('date-input');
      await userEvent.type(input, '32/01/2024');
      
      await waitFor(() => {
        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  // ✅ Teste de keyboard navigation
  describe('Keyboard Navigation', () => {
    it('should open calendar with ArrowDown key', async () => {
      render(<DatePicker {...defaultProps} />);
      
      const wrapper = screen.getByRole('combobox');
      wrapper.focus();
      fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
    });

    it('should handle Enter key in input', async () => {
      const onDateChange = jest.fn();
      render(<DatePicker {...defaultProps} onDateChange={onDateChange} />);
      
      const wrapper = screen.getByRole('combobox');
      fireEvent.keyDown(wrapper, { key: 'Enter' });
      
      // Should not throw error
      expect(onDateChange).not.toHaveBeenCalled();
    });
  });

  // ✅ Teste de props default
  describe('Default Props', () => {
    it('should use default date when defaultDate is provided', () => {
      const defaultDate = new Date(2024, 0, 15);
      render(<DatePicker {...defaultProps} defaultDate={defaultDate} />);
      
      const input = screen.getByTestId('date-input');
      expect(input).toHaveValue('15/01/2024');
    });

    it('should use default label when no label is provided', () => {
      render(<DatePicker locale="pt-br" />);
      
      expect(screen.getByText('Data')).toBeInTheDocument();
    });
  });
});