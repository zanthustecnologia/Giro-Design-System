import { addons } from 'storybook/manager-api';
import { ZanthusTheme } from './theme';
import './manager.css';

addons.setConfig({
  theme: ZanthusTheme,
});