import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../Radio';

const itemsMock = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', disabled: true },
];

describe('<Radio />', () => {
  it('renderiza todos os radios e labels', () => {
    render(<Radio items={itemsMock} ariaLabel="frutas" />);

    expect(screen.getByLabelText('Apple')).toBeInTheDocument();
    expect(screen.getByLabelText('Banana')).toBeInTheDocument();
    expect(screen.getByLabelText('Orange')).toBeInTheDocument();

    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('inicia com o defaultValue selecionado', () => {
    render(
      <Radio
        items={itemsMock}
        defaultValue="banana"
        ariaLabel="frutas"
      />
    );

    const bananaRadio = screen.getByLabelText('Banana');

    expect(bananaRadio).toHaveAttribute('data-state', 'checked');
  });

  it('chama onValueChange ao clicar em um radio', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Radio
        items={itemsMock}
        onValueChange={onValueChange}
        ariaLabel="frutas"
      />
    );

    await user.click(screen.getByLabelText('Apple'));

    expect(onValueChange).toHaveBeenCalledWith('apple');
  });

  it('não permite interação em radio desabilitado', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Radio
        items={itemsMock}
        onValueChange={onValueChange}
        ariaLabel="frutas"
      />
    );

    const disabledRadio = screen.getByLabelText('Orange');

    expect(disabledRadio).toHaveAttribute('data-disabled', 'true');

    await user.click(disabledRadio);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('aplica orientação horizontal', () => {
    render(
      <Radio
        items={itemsMock}
        orientation="horizontal"
        ariaLabel="frutas"
      />
    );

    expect(screen.getByRole('radiogroup'))
      .toHaveAttribute('data-orientation', 'horizontal');
  });

  it('usa orientação vertical por padrão', () => {
    render(<Radio items={itemsMock} ariaLabel="frutas" />);

    expect(screen.getByRole('radiogroup'))
      .toHaveAttribute('data-orientation', 'vertical');
  });
});
