import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  contianer: {
    margin: '10px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ul: {
    listStyle: 'none',
    margin: '0',
    textDecoration: 'none'
  },
  li: {
    cursor: 'pointer',
    backgroundColor: '#fff',
    margin: '0'
  },
  licontent: {
    display: 'inline-block',
    verticalAlign: 'top',
    maxWidth: '75%',
    margin: '0'
  },
  button: {
    margin: '0px 5px'
  }
});

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  Logout() {
    localStorage.clear();
    window.location.href = process.env.REACT_APP_BASE_URL;
  }

  notLogout() {
    window.history.back()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h5" component="h5" color="textPrimary" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
          ログアウトしますか？
        </Typography>
        <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.Logout}>
          する
        </Button>
        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.notLogout}>
          しない
        </Button>
      </div>
    )

  }
}

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Logout)
);