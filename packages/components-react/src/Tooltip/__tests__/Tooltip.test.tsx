import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip Component', () => {
  // =========================================================================
  // 🎯 FUNCIONALIDADES PRINCIPAIS
  // =========================================================================

  describe('Core Functionality', () => {
    describe('Mouse Interactions', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('should show tooltip on mouse enter', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        fireEvent.mouseEnter(trigger);
        
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Test tooltip')).toBeVisible();
      });

      it('should hide tooltip on mouse leave after delay', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // Show tooltip
        fireEvent.mouseEnter(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Hide tooltip
        fireEvent.mouseLeave(trigger);
        
        // Should still be visible before timeout
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // After 800ms delay
        act(() => {
          jest.advanceTimersByTime(800);
        });
        
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should cancel hide timeout when mouse re-enters', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // Show tooltip
        fireEvent.mouseEnter(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Start hiding
        fireEvent.mouseLeave(trigger);
        
        // Re-enter before delay completes
        act(() => {
          jest.advanceTimersByTime(400); // Half delay
        });
        
        fireEvent.mouseEnter(trigger);
        
        // Complete original delay
        act(() => {
          jest.advanceTimersByTime(400);
        });
        
        // Should still be visible
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    describe('Focus Interactions', () => {
      it('should show tooltip on focus', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        fireEvent.focus(wrapper);
        
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      it('should hide tooltip on blur after delay', () => {
        jest.useFakeTimers();
        
        render(
          <div>
            <Tooltip text="Test tooltip">
              <button>Trigger</button>
            </Tooltip>
            <button>Other button</button>
          </div>
        );
        
        const wrapper = screen.getByRole('button', { name: 'Trigger' }).parentElement as HTMLElement;
        const otherButton = screen.getByRole('button', { name: 'Other button' });
        
        // Focus tooltip
        fireEvent.focus(wrapper);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Blur tooltip
        fireEvent.blur(wrapper);
        fireEvent.focus(otherButton);
        
        act(() => {
          jest.advanceTimersByTime(800);
        });
        
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        
        jest.useRealTimers();
      });
    });

    describe('Keyboard Navigation', () => {
      it('should toggle tooltip on Enter key', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        wrapper.focus();
        
        // Show with Enter
        fireEvent.keyDown(wrapper, { key: 'Enter' });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Hide with Enter
        fireEvent.keyDown(wrapper, { key: 'Enter' });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should toggle tooltip on Space key', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        wrapper.focus();
        
        // Show with Space
        fireEvent.keyDown(wrapper, { key: ' ' });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Hide with Space
        fireEvent.keyDown(wrapper, { key: ' ' });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should hide tooltip on Escape key', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        wrapper.focus();
        
        // Show tooltip first
        fireEvent.keyDown(wrapper, { key: 'Enter' });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Hide with Escape
        fireEvent.keyDown(wrapper, { key: 'Escape' });
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should not respond to other keys', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        wrapper.focus();
        
        // Try random keys
        fireEvent.keyDown(wrapper, { key: 'a' });
        fireEvent.keyDown(wrapper, { key: 'Tab' });
        fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
        
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should prevent default on Enter and Space', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        wrapper.focus();
        
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
        
        const preventDefaultSpy = jest.spyOn(enterEvent, 'preventDefault');
        const preventDefaultSpySapce = jest.spyOn(spaceEvent, 'preventDefault');
        
        fireEvent(wrapper, enterEvent);
        fireEvent(wrapper, spaceEvent);
        
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(preventDefaultSpySapce).toHaveBeenCalled();
      });
    });

    describe('Positioning', () => {
      const positions = [
        'top-right',
        'top-left', 
        'bottom-right',
        'bottom-left',
        'left',
        'right'
      ] as const;

      positions.forEach(position => {
        it(`should apply correct CSS class for ${position} position`, () => {
          render(
            <Tooltip text="Test tooltip" position={position}>
              <button>Trigger</button>
            </Tooltip>
          );
          
          const trigger = screen.getByRole('button');
          fireEvent.mouseEnter(trigger);
          
          const tooltip = screen.getByRole('tooltip');
          expect(tooltip).toHaveClass(`zds-tooltip__${position}`);
        });
      });

      it('should default to top-right position when no position provided', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        fireEvent.mouseEnter(trigger);
        
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('zds-tooltip__top-right');
      });
    });
  });

  // =========================================================================
  // ♿ ACESSIBILIDADE
  // =========================================================================

  describe('Accessibility', () => {
    describe('ARIA Attributes', () => {
      it('should have correct role="tooltip"', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        fireEvent.mouseEnter(trigger);
        
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('role', 'tooltip');
      });

      it('should have unique id attribute', () => {
        render(
          <div>
            <Tooltip text="Tooltip 1">
              <button>Button 1</button>
            </Tooltip>
            <Tooltip text="Tooltip 2">
              <button>Button 2</button>
            </Tooltip>
          </div>
        );
        
        const [button1, button2] = screen.getAllByRole('button');
        
        fireEvent.mouseEnter(button1);
        fireEvent.mouseEnter(button2);
        
        const tooltips = screen.getAllByRole('tooltip');
        const id1 = tooltips[0].getAttribute('id');
        const id2 = tooltips[1].getAttribute('id');
        
        expect(id1).toBeTruthy();
        expect(id2).toBeTruthy();
        expect(id1).not.toBe(id2);
      });

      it('should use custom id when provided', () => {
        render(
          <Tooltip id="custom-tooltip-id" text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        fireEvent.mouseEnter(trigger);
        
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('id', 'custom-tooltip-id');
      });

      it('should have correct aria-hidden state', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // When visible
        fireEvent.mouseEnter(trigger);
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveAttribute('aria-hidden', 'false');
        
        // When hidden (this test shows current behavior)
        fireEvent.mouseLeave(trigger);
        // Note: aria-hidden is always 'false' when tooltip is rendered
        expect(tooltip).toHaveAttribute('aria-hidden', 'false');
      });

      // ❌ FAILING TEST - Identifica problema real
      it('should link tooltip to trigger with aria-describedby (FAILING)', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        const wrapper = trigger.parentElement;
        
        fireEvent.mouseEnter(trigger);
        
        const tooltip = screen.getByRole('tooltip');
        const tooltipId = tooltip.getAttribute('id');
        
        // ❌ Este teste irá falhar - problema real no componente
        expect(wrapper).toHaveAttribute('aria-describedby', tooltipId);
      });
    });

    describe('Keyboard Navigation', () => {
      it('should be focusable with tabIndex', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement;
        expect(wrapper).toHaveAttribute('tabIndex', '0');
      });

      it('should be accessible via tab navigation', async () => {
        render(
          <div>
            <button>Before</button>
            <Tooltip text="Test tooltip">
              <span>Tooltip trigger</span>
            </Tooltip>
            <button>After</button>
          </div>
        );
        
        const user = userEvent.setup();
        
        // Tab to tooltip
        await user.tab();
        await user.tab();
        
        const wrapper = screen.getByText('Tooltip trigger').parentElement;
        expect(wrapper).toHaveFocus();
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      it('should maintain focus after Escape key', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const wrapper = screen.getByRole('button').parentElement as HTMLElement;
        
        // Focus and show tooltip
        wrapper.focus();
        fireEvent.keyDown(wrapper, { key: 'Enter' });
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        // Hide with Escape
        fireEvent.keyDown(wrapper, { key: 'Escape' });
        
        // Focus should remain on wrapper
        expect(wrapper).toHaveFocus();
      });
    });
  });

  // =========================================================================
  // 🔄 ESTADOS DO COMPONENTE
  // =========================================================================

  describe('Component States', () => {
    describe('Visibility State', () => {
      it('should start with tooltip hidden', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });

      it('should show tooltip when visible state is true', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        fireEvent.mouseEnter(trigger);
        
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      it('should handle rapid state changes', () => {
        jest.useFakeTimers();
        
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // Rapid show/hide/show
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        fireEvent.mouseEnter(trigger);
        
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        
        jest.useRealTimers();
      });
    });

    describe('Timer State', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });

      it('should clear timeout on component unmount', () => {
        const { unmount } = render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // Start hide timer
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        
        // Unmount before timer completes
        unmount();
        
        // Should not throw error
        expect(() => {
          act(() => {
            jest.advanceTimersByTime(800);
          });
        }).not.toThrow();
      });

      it('should clear existing timeout when new timeout starts', () => {
        render(
          <Tooltip text="Test tooltip">
            <button>Trigger</button>
          </Tooltip>
        );
        
        const trigger = screen.getByRole('button');
        
        // Start first timer
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        
        // Start second timer before first completes
        act(() => {
          jest.advanceTimersByTime(400);
        });
        
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        
        // Only the second timer should be active
        act(() => {
          jest.advanceTimersByTime(800);
        });
        
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  // =========================================================================
  // 🧪 EDGE CASES & CONTENT
  // =========================================================================

  describe('Content Rendering', () => {
    it('should render text content', () => {
      render(
        <Tooltip text="Simple text tooltip">
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      expect(screen.getByText('Simple text tooltip')).toBeInTheDocument();
    });

    it('should render JSX content', () => {
      const jsxContent = (
        <div>
          <strong data-testid="bold-text">Bold text</strong>
          <em data-testid="italic-text">Italic text</em>
        </div>
      );
      
      render(
        <Tooltip text={jsxContent}>
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      expect(screen.getByTestId('bold-text')).toBeInTheDocument();
      expect(screen.getByTestId('italic-text')).toBeInTheDocument();
    });

    it('should handle empty text', () => {
      render(
        <Tooltip text="">
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('');
    });

    it('should handle null text gracefully', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();
      
      render(
        <Tooltip text={null as any}>
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      
      expect(() => {
        fireEvent.mouseEnter(trigger);
      }).not.toThrow();
      
      console.error = originalError;
    });

    it('should handle very long text content', () => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
      
      render(
        <Tooltip text={longText}>
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip.textContent).toBe(longText);
    });
  });

  describe('CSS Classes', () => {
    it('should apply base CSS classes', () => {
      render(
        <Tooltip text="Test tooltip">
          <button>Trigger</button>
        </Tooltip>
      );
      
      const wrapper = screen.getByRole('button').parentElement;
      expect(wrapper).toHaveClass('zds-tooltip__wrapper');
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('zds-tooltip__content');
    });

    it('should apply position-specific classes via clsx', () => {
      render(
        <Tooltip text="Test tooltip" position="bottom-left">
          <button>Trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('zds-tooltip__content', 'zds-tooltip__bottom-left');
    });
  });
});