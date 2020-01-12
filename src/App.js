import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Term from './containers/Term';
import Info from './containers/Info';
import Auth from './containers/Auth';
import Login from './containers/Login';


import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/info" component={Info} />
            <Route path="/term" component={Term} />
            <Auth>
              <Route exact path="/" component={Home} />
            </Auth>
          </Switch>
        </BrowserRouter>
      </div >
    );
  }
}

export default App;