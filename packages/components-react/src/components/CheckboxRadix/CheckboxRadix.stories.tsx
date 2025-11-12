import {Meta} from '@storybook/react';
import CheckboxRadix from './CheckboxRadix';


const meta: Meta<typeof CheckboxRadix> = {
  component: CheckboxRadix,
  title: 'Components/CheckboxRadix'
}
export default meta;

const Template = () => <CheckboxRadix onCheckedChange={(e) => console.log(e)} label='teste teste' />;

export const Default = Template.bind({});
