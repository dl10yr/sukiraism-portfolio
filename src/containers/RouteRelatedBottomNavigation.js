import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  wrapper: {
    display: 'block',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: 'center',
  },
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    maxWidth: '100%',
  },
});


class RouteRelatedBottomNavigation extends React.Component {
  buttons_info = [
    { label: 'トップページ', icon: <HomeIcon />, link_to: '/' },
    { label: 'テーマ一覧', icon: <InfoIcon />, link_to: '/postslist' },
    { label: '投稿', icon: <InfoIcon />, link_to: '/create' },
  ];

  buttons = this.buttons_info.map((button_info, index) => {
    return (
      <BottomNavigationAction
        value={button_info.link_to}
        label={button_info.label}
        className={this.props.classes.button}
        icon={button_info.icon}
        component={Link}
        to={button_info.link_to}
      />
    );
  })

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <BottomNavigation
          value={this.props.location.pathname}
          showLabels
          className={classes.root}
          children={this.buttons}
        />
      </div>
    );
  }
}

RouteRelatedBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withStyles(styles, { withTheme: true })(RouteRelatedBottomNavigation)
);