import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  container: {
    margin: '20px'
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

class Privacy extends React.Component {

  constructor(props) {
    super(props);
    this.updatePrivacy = this.updatePrivacy.bind(this);

  }

  updatePrivacy() {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.put(process.env.REACT_APP_API_URL + `/api/v1/users/update_privacy`,
      {},
      {
        headers: {
          'access-token': auth_token,
          'client': client_id,
          'uid': uid
        }
      })
      .then((response) => {
        this.props.actions.setCurrentUser()
      })
  }

  renderUpdateStatusButton() {
    const { CurrentUserReducer } = this.props;
    const { classes } = this.props;

    if (CurrentUserReducer.items.status === "released") {
      return (
        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.updatePrivacy}>
          非公開にする
        </Button>
      )

    } else {
      return (
        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.updatePrivacy}>
          公開にする
        </Button>
      )

    }
  }

  render() {
    const { classes } = this.props;
    const { CurrentUserReducer } = this.props;

    var display_status = "公開"

    if (CurrentUserReducer.items.status === "released") {
      display_status = "公開"
    } else if (CurrentUserReducer.items.status === "nonreleased") {
      display_status = "非公開"
    }

    return (
      <div className={classes.container}>
        <Typography variant="h5" component="h5" color="textPrimary" style={{ fontWeight: 'bold', marginBottom: '30px' }}>
          {CurrentUserReducer.items.name}さんの<br />スキ・キライは<br />{display_status}されています
        </Typography>
        {this.renderUpdateStatusButton()}
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
  withStyles(styles, { withTheme: true })(Privacy)
);