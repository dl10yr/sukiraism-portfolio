import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Term from './containers/Term';
import Info from './containers/Info';
import Auth from './containers/Auth';
import Login from './containers/Login';
import Create from './containers/Create';
import PostsList from './containers/PostsList';
import PostsDetail from './containers/PostDetail';
import UserDetail from './containers/UserDetail';
import Search from './containers/Search';
import Logout from './containers/Logout';
import DeleteAccount from './containers/DeleteAccount';

import Notification from './containers/Notification';

import ResponsiveDrawer from './containers/ResponsiveDrawer';
import RouteRelatedBottomNavigation from './containers/RouteRelatedBottomNavigation';



import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "normalize.css";
import "./App.css";


const styles = theme => ({

  h3: {
    color: theme.palette.text.primary,

  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notification />
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
                <Route exact path="/posts/:id" component={PostsDetail} />
                <Route exact path="/users/:user_name" component={UserDetail} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/deleteaccount" component={DeleteAccount} />

              </Switch>
            </Auth>
          </Switch>
        </ResponsiveDrawer>
        <RouteRelatedBottomNavigation />
      </div >
    );
  }
}

export default (
  withStyles(styles, { withTheme: true })(App)
);