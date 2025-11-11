import {Meta} from '@storybook/react';
import CheckboxRadix from './CheckboxRadix';


const meta: Meta<typeof CheckboxRadix> = {
  component: CheckboxRadix,
  title: 'Components/CheckboxRadix'
}
export default meta;

const Template = () => <CheckboxRadix />;

export const Default = Template.bind({});
