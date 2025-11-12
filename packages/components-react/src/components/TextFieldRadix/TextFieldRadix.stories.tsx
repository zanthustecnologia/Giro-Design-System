import { Meta } from '@storybook/react';
import TextFieldRadix from './TextFieldRadix';

const meta: Meta<typeof TextFieldRadix> = {
  component: TextFieldRadix,
  title: 'Components/TextFieldRadix',
}
export default meta;
const Template = () => <TextFieldRadix standalone={false} name='teste'/>;

export const Default = Template.bind({});