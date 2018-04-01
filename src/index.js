import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './reducers';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, red } from 'material-ui/colors';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);
