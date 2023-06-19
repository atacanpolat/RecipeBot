import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './components/helpers/themes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </Provider>   
  </React.StrictMode>
);
