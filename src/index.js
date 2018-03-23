import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './reducers';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { teal, lightBlue } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
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
