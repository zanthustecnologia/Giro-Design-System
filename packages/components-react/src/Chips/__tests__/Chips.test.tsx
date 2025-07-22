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
})