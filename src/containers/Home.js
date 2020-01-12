import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  home: {
    backgroundColor: "red",
    width: "50%"
  },
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.home}>
        <p>ログイン済み</p>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);