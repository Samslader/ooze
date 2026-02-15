import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
