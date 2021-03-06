import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import _ from 'lodash';
import { Redirect, Route } from 'react-router-dom'
import "normalize.css";

import queryString from 'query-string';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  loading: {
    color: theme.palette.text.primary
  }
});

class Auth extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    let tokens = queryString.parse(_.get(this, "props.location.search"))
    if (!_.isEmpty(tokens.auth_token)) {
      localStorage.setItem('auth_token', tokens.auth_token)
      localStorage.setItem('client_id', tokens.client_id)
      localStorage.setItem('uid', tokens.uid)
      window.location.href = process.env.REACT_APP_BASE_URL + "/home"
    } else {
      this.setState({
        isLoading: true,
      })

      const auth_token = localStorage.auth_token
      const client_id = localStorage.client_id
      const uid = localStorage.uid
      axios.get(process.env.REACT_APP_API_URL + '/api/v1/user/currentuser', {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
        .then((response) => {
          this.setState({
            isLoading: false,
            isLoggedin: true,
          });
          this.props.actions.setCurrentUserSuccess(response.data.data)
        })
        .catch(() => {
          this.setState({
            isLoading: false,
            isLoggedin: false,
          });
          this.props.actions.setNotification('error', 'ログインしてください。');

        });
    }
  }

  render() {
    const isLoggedin = this.state.isLoggedin;
    const isLoading = this.state.isLoading;
    const { classes } = this.props;


    if (isLoading) {
      return (
        <div className={classes.loading}>loading</div>
      )
    } else {
      if (isLoggedin) {
        return (
          <Route children={this.props.children} />
        )
      } else {
        return (
          <Redirect to={'/'} />
        )
      }
    }
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Auth)
);

