import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
});

class Login extends React.Component {
  loginTwitter() {
    window.location.href = process.env.REACT_APP_API127_URL + '/api/v1/auth/twitter?auth_origin_url=' + process.env.REACT_APP_BASE_URL;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.login}>
        <p>未ログイン</p>
        <Button variant="contained" color="secondary" onClick={this.loginTwitter}>
          Twitterで登録・ログイン
        </Button>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Login);