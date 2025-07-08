import '@testing-library/jest-dom';
import Avatar from '../Avatar';
import { render,screen } from '@testing-library/react';
import { DataScatter20Filled } from '@fluentui/react-icons';
describe('Avatar', () => {
    test('renders avatar in the document', () => {
        render(<Avatar icon={<DataScatter20Filled />} />);
        const avatarElement = screen.getByRole('img');
        expect(avatarElement).toBeInTheDocument();
    });
})