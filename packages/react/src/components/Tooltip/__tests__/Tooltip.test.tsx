import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    expect(await screen.findByText('Conteúdo do tooltip')).toBeInTheDocument();

    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText('Conteúdo do tooltip')).toBeNull());
  });

  it('abre com foco e fecha no blur', async () => {
    render(
      <Tooltip text="Conteúdo do tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    trigger.focus();
    expect(await screen.findByText('Conteúdo do tooltip')).toBeInTheDocument();

    trigger.blur();
    await waitFor(() => expect(screen.queryByText('Conteúdo do tooltip')).toBeNull());
  });
});