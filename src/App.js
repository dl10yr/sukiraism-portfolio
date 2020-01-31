import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Term from './containers/Term';
import Info from './containers/Info';
import Auth from './containers/Auth';
import Login from './containers/Login';
import Top from './containers/Top';

import Create from './containers/Create';
import PostsList from './containers/PostsList';
import PostsDetail from './containers/PostDetail';
import UserDetail from './containers/UserDetail';
import Search from './containers/Search';
import Logout from './containers/Logout';
import DeleteAccount from './containers/DeleteAccount';
import Privacy from './containers/Privacy';


import Notification from './containers/Notification';

import ResponsiveDrawer from './containers/ResponsiveDrawer';
import RouteRelatedBottomNavigation from './containers/RouteRelatedBottomNavigation';



import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

import "normalize.css";
import "./App.css";


const styles = theme => ({

  h3: {
    color: theme.palette.text.primary,

  },
});

class App extends Component {
  componentDidMount() {
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  render() {
    return (
      <Router>

        <div className="App">
          <Notification />
          <ResponsiveDrawer className="ResponsiveDrawer">

            <Switch>
              <Route exact path="/" component={Top} />
              <Route path="/login" component={Login} />
              <Route path="/info" component={Info} />
              <Route path="/term" component={Term} />
              <Auth>
                <Switch>
                  <Route exact path="/home" component={Home} />
                  <Route path='/create' component={Create} />
                  <Route path='/postslist' component={PostsList} />
                  <Route exact path="/posts/:id" component={PostsDetail} />
                  <Route exact path="/users/:user_name" component={UserDetail} />
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/deleteaccount" component={DeleteAccount} />
                  <Route exact path="/privacy" component={Privacy} />

                </Switch>
              </Auth>
            </Switch>
          </ResponsiveDrawer>
          <RouteRelatedBottomNavigation />

        </div >
      </Router>

    );
  }
}

export default (
  withStyles(styles, { withTheme: true })(App)
);