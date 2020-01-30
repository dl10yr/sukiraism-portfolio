import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './materialui/theme'
import { BrowserRouter as Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

const middlewares = []
middlewares.push(thunk)


if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const history = createBrowserHistory();
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)



ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider >
  , document.getElementById('root'));