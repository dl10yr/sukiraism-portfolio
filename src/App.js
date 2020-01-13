import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Term from './containers/Term';
import Info from './containers/Info';
import Auth from './containers/Auth';
import Login from './containers/Login';
import Create from './containers/Create';
import PostsList from './containers/PostsList';
import ResponsiveDrawer from './containers/ResponsiveDrawer';
import RouteRelatedBottomNavigation from './containers/RouteRelatedBottomNavigation';



import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ResponsiveDrawer className="ResponsiveDrawer">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/info" component={Info} />
            <Route path="/term" component={Term} />
            <Auth>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/create' component={Create} />
                <Route path='/postslist' component={PostsList} />
              </Switch>
            </Auth>
          </Switch>
        </ResponsiveDrawer>
        <RouteRelatedBottomNavigation />
      </div >
    );
  }
}

export default App;