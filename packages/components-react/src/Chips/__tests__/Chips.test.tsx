import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Chips from '../Chips';

describe('Rendering component', () =>{
    it('should render the Chips component', () => {
        render(<Chips title='teste'/>);
        expect(screen.getByText('teste')).toBeInTheDocument();
    });
    it('should render the Chips on left icon', () => {
        render(<Chips title='teste' leftIcon={<span>Left Icon</span>} />);
        expect(screen.getByText('Left Icon')).toBeInTheDocument();
    });
    it('should render the Chips on right icon', () => {
        render(<Chips title='teste' rightIcon={<span>Right Icon</span>} />);
        expect(screen.getByText('Right Icon')).toBeInTheDocument();
    });
    it('should render the chips on disabled state', () => {
            render(<Chips title='teste' disabled={true} />);
        expect(screen.getByText('teste')).toHaveAttribute('aria-disabled', 'true');
    });
})