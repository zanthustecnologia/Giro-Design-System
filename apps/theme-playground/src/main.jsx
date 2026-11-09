import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import '../../../packages/tokens/build/css/giro-tokens.css';
import '../../../packages/tokens/build/css/themes/dark.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);