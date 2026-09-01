import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('mostra e esconde ao hover', async () => {
    render(
      <Tooltip text="Conteúdo do tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await userEvent.hover(trigger);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });
});