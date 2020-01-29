import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './materialui/theme'
import { BrowserRouter as Router } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';


// const history = createBrowserHistory();
if (process.env.NODE_ENV != `production`) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
} else {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} >
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider >
  , document.getElementById('root'));