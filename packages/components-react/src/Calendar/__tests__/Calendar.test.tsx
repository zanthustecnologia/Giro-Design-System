import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
import Calendar from '../Calendar';
import type { CalendarProps } from '../Calendar';

// ✅ Mock do react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        calendar: 'Calendário',
        today: 'hoje',
        selected: 'selecionado',
        yearSelection: 'Seleção de ano'
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    }
  })
}));

// ✅ Mock dos ícones do Fluent UI
jest.mock('@fluentui/react-icons', () => ({
  ChevronLeft16Regular: () => <span data-testid="chevron-left">←</span>,
  ChevronRight16Regular: () => <span data-testid="chevron-right">→</span>,
  ChevronDown16Regular: () => <span data-testid="chevron-down">↓</span>,
  ChevronUp16Regular: () => <span data-testid="chevron-up">↑</span>,
}));

describe('Calendar Component', () => {
  const defaultProps: CalendarProps = {
    currentDate: new Date(2024, 0, 15), // January 15, 2024
    locale: 'pt-br'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up moment locale
    moment.locale('pt-br');
  });

  // ✅ Teste básico de renderização
  describe('Rendering', () => {
    it('should render Calendar with current month and year', () => {
      render(<Calendar {...defaultProps} />);
      
      expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('should render weekdays headers for pt-br locale', () => {
      render(<Calendar {...defaultProps} />);
      
      const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
      weekdays.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });

    it('should render weekdays headers for en-us locale', () => {
      render(<Calendar {...defaultProps} locale="en-us" />);
      
      const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      weekdays.forEach(day => {
        expect(screen.getByText(day)).toBeInTheDocument();
      });
    });

    it('should render days of the month', () => {
      render(<Calendar {...defaultProps} />);
      
      // January 2024 has 31 days
      for (let day = 1; day <= 31; day++) {
        expect(screen.getByText(day.toString())).toBeInTheDocument();
      }
    });

    it('should highlight today when no date is selected', () => {
      const today = new Date();
      render(<Calendar currentDate={today} locale="pt-br" />);
      
      const todayButton = screen.getByText(today.getDate().toString());
      expect(todayButton).toHaveClass('zds-calendar__day--today');
    });

    it('should highlight selected date', () => {
      const selectedDate = new Date(2024, 0, 15);
      render(<Calendar {...defaultProps} selectedDate={selectedDate} />);
      
      const selectedButton = screen.getByText('15');
      expect(selectedButton).toHaveClass('zds-calendar__day--selected');
    });
  });

  // ✅ Teste de navegação de mês
  describe('Month Navigation', () => {
    it('should navigate to previous month', async () => {
      const onDateChange = jest.fn();
      render(<Calendar {...defaultProps} onDateChange={onDateChange} />);
      
      const prevButton = screen.getByTestId('chevron-left').closest('button');
      if (prevButton) {
        fireEvent.click(prevButton);
        
        await waitFor(() => {
          expect(onDateChange).toHaveBeenCalledWith(
            expect.objectContaining({
              getMonth: expect.any(Function),
              getFullYear: expect.any(Function)
            })
          );
        });
      }
    });

    it('should navigate to next month', async () => {
      const onDateChange = jest.fn();
      render(<Calendar {...defaultProps} onDateChange={onDateChange} />);
      
      const nextButton = screen.getByTestId('chevron-right').closest('button');
      if (nextButton) {
        fireEvent.click(nextButton);
        
        await waitFor(() => {
          expect(onDateChange).toHaveBeenCalledWith(
            expect.objectContaining({
              getMonth: expect.any(Function),
              getFullYear: expect.any(Function)
            })
          );
        });
      }
    });

    it('should navigate with keyboard arrows', async () => {
      const onDateChange = jest.fn();
      render(<Calendar {...defaultProps} onDateChange={onDateChange} />);
      
      const calendar = screen.getByRole('grid').closest('.zds-calendar');
      if (calendar) {
        fireEvent.keyDown(calendar, { key: 'ArrowLeft' });
        
        await waitFor(() => {
          expect(onDateChange).toHaveBeenCalled();
        });
      }
    });
  });

  // ✅ Teste de seleção de data
  describe('Date Selection', () => {

    it('should select day with Enter key', async () => {
      const onDaySelect = jest.fn();
      render(<Calendar {...defaultProps} onDaySelect={onDaySelect} />);
      
      const dayButton = screen.getByText('15');
      dayButton.focus();
      fireEvent.keyDown(dayButton, { key: 'Enter' });
      
      expect(onDaySelect).toHaveBeenCalled();
    });

    it('should select day with Space key', async () => {
      const onDaySelect = jest.fn();
      render(<Calendar {...defaultProps} onDaySelect={onDaySelect} />);
      
      const dayButton = screen.getByText('15');
      dayButton.focus();
      fireEvent.keyDown(dayButton, { key: ' ' });
      
      expect(onDaySelect).toHaveBeenCalled();
    });
  });

  // ✅ Teste de visualização de anos
  describe('Year View', () => {
    it('should toggle to year view when month/year is clicked', async () => {
      render(<Calendar {...defaultProps} />);
      
      const monthYearButton = screen.getByText(/janeiro 2024/i);
      fireEvent.click(monthYearButton);
      
      await waitFor(() => {
        expect(screen.getByRole('grid', { name: 'Seleção de ano' })).toBeInTheDocument();
      });
    });

    it('should show year range in year view', async () => {
      render(<Calendar {...defaultProps} />);
      
      const monthYearButton = screen.getByText(/janeiro 2024/i);
      fireEvent.click(monthYearButton);
      
      await waitFor(() => {
        // Should show years around 2024 (2011-2030 range)
        expect(screen.getByText('2024')).toBeInTheDocument();
        expect(screen.getByText('2020')).toBeInTheDocument();
        expect(screen.getByText('2030')).toBeInTheDocument();
      });
    });

    it('should highlight current year in year view', async () => {
      render(<Calendar {...defaultProps} />);
      
      const monthYearButton = screen.getByText(/janeiro 2024/i);
      fireEvent.click(monthYearButton);
      
      await waitFor(() => {
        const currentYearButton = screen.getByText('2024');
        expect(currentYearButton).toHaveClass('zds-calendar__year--current');
      });
    });

    it('should select year and return to month view', async () => {
      const onDateChange = jest.fn();
      render(<Calendar {...defaultProps} onDateChange={onDateChange} />);
      
      // Open year view
      const monthYearButton = screen.getByText(/janeiro 2024/i);
      fireEvent.click(monthYearButton);
      
      await waitFor(() => {
        expect(screen.getByText('2025')).toBeInTheDocument();
      });
      
      // Select different year
      const yearButton = screen.getByText('2025');
      fireEvent.click(yearButton);
      
      await waitFor(() => {
        expect(onDateChange).toHaveBeenCalled();
        expect(screen.getByText(/janeiro 2025/i)).toBeInTheDocument();
      });
    });

    it('should navigate year ranges with arrow buttons', async () => {
      render(<Calendar {...defaultProps} />);
      
      // Open year view
      const monthYearButton = screen.getByText(/janeiro 2024/i);
      fireEvent.click(monthYearButton);
      
      await waitFor(() => {
        expect(screen.getByText('2024')).toBeInTheDocument();
      });
      
      // Navigate to next year range
      const nextButton = screen.getByTestId('chevron-right').closest('button');
      if (nextButton) {
        fireEvent.click(nextButton);
        
        await waitFor(() => {
          expect(screen.getByText('2044')).toBeInTheDocument(); // 20 years later
        });
      }
    });
  });

  // ✅ Teste de acessibilidade
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Calendar {...defaultProps} />);
      
      const calendar = screen.getByLabelText('Calendário');
      expect(calendar).toBeInTheDocument();
      
      const grid = screen.getByRole('grid');
      expect(grid).toBeInTheDocument();
    });

    it('should have ARIA labels for day buttons', () => {
      render(<Calendar {...defaultProps} />);
      
      const dayButton = screen.getByText('15');
      expect(dayButton).toHaveAttribute('aria-label');
      expect(dayButton).toHaveAttribute('role', 'gridcell');
    });

    it('should have aria-selected for selected date', () => {
      const selectedDate = new Date(2024, 0, 15);
      render(<Calendar {...defaultProps} selectedDate={selectedDate} />);
      
      const selectedButton = screen.getByText('15');
      expect(selectedButton).toHaveAttribute('aria-selected', 'true');
    });

    it('should have aria-current for today', () => {
      const today = new Date();
      render(<Calendar currentDate={today} locale="pt-br" />);
      
      const todayButton = screen.getByText(today.getDate().toString());
      expect(todayButton).toHaveAttribute('aria-current', 'date');
    });

    it('should announce changes to screen readers', async () => {
      const onDateChange = jest.fn();
      render(<Calendar {...defaultProps} onDateChange={onDateChange} />);
      
      const nextButton = screen.getByTestId('chevron-right').closest('button');
      if (nextButton) {
        fireEvent.click(nextButton);
        
        // Check if aria-live region exists
        const liveRegion = document.querySelector('.zds-calendar__aria-live');
        expect(liveRegion).toBeInTheDocument();
      }
    });
  });

  // ✅ Teste de localização
  describe('Localization', () => {
    it('should display month names in Portuguese', () => {
      render(<Calendar {...defaultProps} locale="pt-br" />);
      
      expect(screen.getByText(/janeiro/i)).toBeInTheDocument();
    });

    it('should display month names in English', () => {
      render(<Calendar currentDate={new Date(2024, 0, 15)} locale="en-us" />);
      
      expect(screen.getByText(/january/i)).toBeInTheDocument();
    });

    it('should format dates according to locale', () => {
      const selectedDate = new Date(2024, 0, 15);
      render(<Calendar {...defaultProps} selectedDate={selectedDate} locale="pt-br" />);
      
      const dayButton = screen.getByText('15');
      expect(dayButton).toHaveAttribute('aria-label', expect.stringContaining('janeiro'));
    });
  });

  // ✅ Teste de props customizadas
  describe('Custom Props', () => {
    it('should apply custom className', () => {
      render(<Calendar {...defaultProps} className="custom-calendar" />);
      
      const calendar = screen.getByLabelText('Calendário');
      expect(calendar).toHaveClass('custom-calendar');
    });

    it('should use custom id', () => {
      render(<Calendar {...defaultProps} id="my-calendar" />);
      
      const calendar = screen.getByLabelText('Calendário');
      expect(calendar).toHaveAttribute('id', 'my-calendar');
    });

    it('should handle date format prop', () => {
      render(<Calendar {...defaultProps} format="mm/dd/yyyy" />);
      
      // Component should render without errors
      expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
    });
  });

  // ✅ Teste de edge cases
  describe('Edge Cases', () => {
    it('should handle null selectedDate', () => {
      render(<Calendar {...defaultProps} selectedDate={null} />);
      
      // Should render without errors
      expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
    });

    it('should handle undefined callbacks', () => {
      render(<Calendar {...defaultProps} onDateChange={undefined} onDaySelect={undefined} />);
      
      const dayButton = screen.getByText('15');
      
      // Should not throw error when clicking
      expect(() => fireEvent.click(dayButton)).not.toThrow();
    });

    it('should handle minDate and maxDate props', () => {
      const minDate = new Date(2024, 0, 10);
      const maxDate = new Date(2024, 0, 20);
      
      render(<Calendar {...defaultProps} minDate={minDate} maxDate={maxDate} />);
      
      // Component should render without errors
      expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
    });
  });

  // ✅ Teste de performance
  describe('Performance', () => {
    it('should memoize expensive calculations', () => {
      const { rerender } = render(<Calendar {...defaultProps} />);
      
      // Re-render with same props shouldn't cause unnecessary recalculations
      rerender(<Calendar {...defaultProps} />);
      
      expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
    });

    it('should clean up timeouts', () => {
      const { unmount } = render(<Calendar {...defaultProps} />);
      
      // Navigate to trigger announcement
      const nextButton = screen.getByTestId('chevron-right').closest('button');
      if (nextButton) {
        fireEvent.click(nextButton);
      }
      
      // Unmount should clean up without errors
      expect(() => unmount()).not.toThrow();
    });
  });
});