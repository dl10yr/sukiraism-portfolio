import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';
import ViewListIcon from '@material-ui/icons/ViewList';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withRouter, Link } from 'react-router-dom';

import ResponsiveDrawerListItem from '../components/ResponsiveDrawerListItem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

import titlepng from '../images/title.png';
import usericon_default from '../images/usericon_default.png'

const drawerWidth = 240;
const headerNavigationHeight = 56;
const bottomNavigationHeight = 56;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.secondary.light,
  },
  toolBar: {
    justifyContent: 'space-between',
    minHeight: bottomNavigationHeight,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    color: theme.palette.text.primary
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: `calc(10px + ${headerNavigationHeight}px)`,
    paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('md')]: {
      paddingBottom: 10,
    },
  },

  headerLogo: {
    display: 'flex',
    height: 40,
    width: 180,
  },
  iconLogo: {
    display: 'flex',
    height: 40,
    width: 40,
    borderRadius: '50%',
  },

  searchbar: {
    // flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  a: {
    color: 'white',
  }
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  closeDrawerNav = () => {
    this.setState({ mobileOpen: false });
  }
  openDrawerNav = () => {
    this.setState({ mobileOpen: true });
  }

  renderUserlink(usericonlink) {
    const { CurrentUserReducer } = this.props;
    const { classes } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    const nicknameLink = "/users/" + CurrentUserReducer.items.nickname;

    if (isLoggedin) {

      return (
        <Link to={nicknameLink}>
          <img src={usericonlink} alt="nickname_link" className={classes.iconLogo} />
        </Link>
      )
    } else {
      return (
        <a className={classes.a} href={process.env.REACT_APP_BASE_URL} >
          <Icon>add_circle</Icon>
        </a>

      );
    }
  }
  renderTitlelink() {
    const { CurrentUserReducer } = this.props;
    const { classes } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    if (isLoggedin) {
      return (
        <Link to="/home">
          <img src={titlepng} width="150px" alt="title_logo" className={classes.headerLogo} />
        </Link>
      )
    } else {
      return (
        <Link to="/">
          <img src={titlepng} width="150px" alt="title_logo" className={classes.headerLogo} />
        </Link>

      );
    }
  }
  renderBarswithCondition() {
    const { CurrentUserReducer } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    if (isLoggedin) {
      return (
        <div>

          <List>
            <ResponsiveDrawerListItem
              to="/create"
              onClick={this.closeDrawerNav}
              icon={<SendIcon />}
              text="テーマ投稿"
            />
          </List>
          <List>
            <ResponsiveDrawerListItem
              to="/search"
              onClick={this.closeDrawerNav}
              icon={<SearchIcon />}
              text="テーマ検索"
            />
          </List>

          <Divider />
        </div>
      )
    } else {

    }
  }
  renderDeletewithCondition() {
    const { CurrentUserReducer } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    if (isLoggedin) {
      return (
        <List>
          <ResponsiveDrawerListItem
            to="/deleteaccount"
            onClick={this.closeDrawerNav}
            icon={<SettingsIcon />}
            text="アカウントの削除"
          />
        </List>
      )
    } else {

    }
  }
  renderPrivacywithCondition() {
    const { CurrentUserReducer } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    if (isLoggedin) {
      return (
        <List>
          <ResponsiveDrawerListItem
            to="/privacy"
            onClick={this.closeDrawerNav}
            icon={<SettingsIcon />}
            text="プライバシー"
          />
        </List>
      )
    } else {

    }
  }
  renderLogoutwithCondition() {
    const { CurrentUserReducer } = this.props;
    const isLoggedin = CurrentUserReducer.isLoggedin;
    if (isLoggedin) {
      return (
        <List>
          <ResponsiveDrawerListItem
            to="/logout"
            onClick={this.closeDrawerNav}
            icon={<SettingsIcon />}
            text="ログアウト"
          />
        </List>
      )
    } else {

    }
  }

  render() {
    const { classes, theme, } = this.props;
    const { CurrentUserReducer } = this.props;
    var usericonlink = usericon_default
    if (CurrentUserReducer.items.image !== null) {
      usericonlink = CurrentUserReducer.items.image
    }


    const drawer = (
      <div>
        <List>
          <ResponsiveDrawerListItem
            to="/postslist"
            onClick={this.closeDrawerNav}
            icon={<ViewListIcon />}
            text="テーマ一覧"
          />
        </List>
        {this.renderBarswithCondition()}

        <List>
          <ResponsiveDrawerListItem
            to="/info"
            onClick={this.closeDrawerNav}
            icon={<InfoIcon />}
            text="スキライズムとは"
          />
        </List>
        <List>
          <ResponsiveDrawerListItem
            to="/term"
            onClick={this.closeDrawerNav}
            icon={<AssignmentIcon />}
            text="利用規約・プライバシーポリシー"
          />
        </List>
        <Divider />
        {this.renderDeletewithCondition()}
        {this.renderLogoutwithCondition()}
        {this.renderPrivacywithCondition()}

      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar className={classes.toolBar} variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.openDrawerNav()}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>

            {this.renderTitlelink()}
            {this.renderUserlink(usericonlink)}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.closeDrawerNav}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(ResponsiveDrawer)
));