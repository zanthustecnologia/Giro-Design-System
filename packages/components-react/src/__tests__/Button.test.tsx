import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MemoizedButton from '../Button';
describe('Button', () => {
  test('renders button in the document', () => {
    render(<MemoizedButton>Click me</MemoizedButton>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});