import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import NotificationBar from '../components/NotificationBar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';


// スタイル
const styles = theme => ({
  root: {
    margin: 10,
  },
});

class Notification extends React.Component {

  render() {

    // redux関連
    const { NotificationReducer, actions } = this.props;

    // Material-ui関連
    const { classes } = this.props;


    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={NotificationReducer.isOpen}
        autoHideDuration={3000}
        onClose={actions.closeNotification}
        className={classes.root}
      >
        <NotificationBar
          onClose={actions.closeNotification}
          variant={NotificationReducer.variant}
          message={NotificationReducer.message}
        />
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapState = (state, ownProps) => ({
  NotificationReducer: state.NotificationReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Notification)
);