import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';

import ViewListIcon from '@material-ui/icons/ViewList';

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
    '&$selected': {
      paddingTop: 6,
      color: '#2dd57a;',
    },
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.light,
  },
  selected: {},
  button: {
    maxWidth: '100%',
  },
});


class RouteRelatedBottomNavigation extends React.Component {
  buttons_info = [
    { label: '検索', icon: <SearchIcon />, link_to: '/search' },
    { label: 'テーマ一覧', icon: <ViewListIcon />, link_to: '/postslist' },
    { label: '投稿', icon: <SendIcon />, link_to: '/create' },
  ];

  buttons = this.buttons_info.map((button_info, index) => {
    return (
      <BottomNavigationAction
        value={button_info.link_to}
        label={button_info.label}
        classes={{
          root: this.props.classes.root,
          selected: this.props.classes.selected,
        }}
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
          // showLabels
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
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