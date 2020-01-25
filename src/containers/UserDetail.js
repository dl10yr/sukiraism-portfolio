import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FolderIcon from '@material-ui/icons/Folder';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import Pagination from "material-ui-flat-pagination";
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import axios from 'axios';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    margin: theme.spacing(1),
    fontweight: "fontWeightBold",
  },
  row: {
    margin: 10,
  },

  titleImage: {
    width: '100%',
    maxWidth: 700,
  },
  paper: {
    height: 300
  },

  button: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 16,
    padding: 10,
    width: 250,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttongroup: {
    width: '100%',
    marginTop: '10px'
  },
  button: {
    width: '33.33%',
  },
  iconimg: {
    width: '50px',
    verticalAlign: 'top',
    display: 'inline-block',
    borderRadius: '50%',
    margin: '10px'
  },
  headh3: {
    verticalAlign: 'top',
    display: 'inline-block',
    margin: '10px'
  },

  ul: {
    listStyle: 'none',
    margin: 'auto',
    marginTop: '10px',
    padding: '0px 10px',
    textDecoration: 'none'
  },
  li: {
    cursor: 'pointer',
    margin: '0',
    textDecoration: 'none',
    border: '1px solid #c0c0c0',
    textAlign: 'left',

    backgroundColor: theme.palette.background.paper,
    listStyleType: 'none',
  },
  licontent: {
    display: 'inline-block',
    verticalAlign: 'top',
    maxWidth: '75%',
    margin: '0',
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,

  },
  lih3: {
    margin: '7px',
    wordWrap: 'break-word'
  },
  formControlLabel: {
    color: theme.palette.text.primary,
  },
  radio: {
    color: theme.palette.text.primary,
  },
  tabs: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.text.primary
  },
  tab: {
    color: theme.palette.text.primary,
    '&$selected': {
      color: '#F92672',
    },
    '&:hover': {
      color: '#F92672',
      opacity: 1,
    }
  },
  tab1: {
    color: theme.palette.text.primary,
    '&$selected': {
      color: '#66D9EF',
    },
    '&:hover': {
      color: '#66D9EF',
      opacity: 1,
    }
  },
  tab2: {
    color: theme.palette.text.primary,
    '&$selected': {
      color: '#2dd57a;',
    },
    '&:hover': {
      color: '#2dd57a;',
      opacity: 1,
    }
  },
  selected: {}
});
const pagitheme = createMuiTheme();


class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nickname: "",
      image: "",
    };
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    axios.get(process.env.REACT_APP_API_URL + `/api/v1/users/${this.props.match.params.user_name}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then((response) => {
        const data = response.data.data;
        this.setState({
          name: data.user.name,
          nickname: data.user.nickname,
          image: data.user.image
        });
      })
      .catch(() => {
        this.props.history.push('/')
      });
    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);

  }


  componentDidMount() {
    const { UserPostsListReducer } = this.props;
    if (UserPostsListReducer.selected === "スキ") {
      this.props.actions.getUserPostsList("answered_suki", this.props.match.params.user_name, UserPostsListReducer.offset, "スキ")
    } else if (UserPostsListReducer.selected === "キライ") {
      this.props.actions.getUserPostsList("answered_kirai", this.props.match.params.user_name, UserPostsListReducer.offset, "キライ")
    } else if (UserPostsListReducer.selected === "投稿済") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, UserPostsListReducer.offset, "投稿済")
    }
  }

  handleChange(e, newvalue) {
    if (newvalue === "スキ") {
      this.props.actions.getUserPostsList("answered_suki", this.props.match.params.user_name, 0, "スキ")
    } else if (newvalue === "キライ") {
      this.props.actions.getUserPostsList("answered_kirai", this.props.match.params.user_name, 0, "キライ")
    } else if (newvalue === "投稿済") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, 0, "投稿済")
    }
  }

  handlePaginationClick(offset) {
    const { UserPostsListReducer } = this.props;
    if (UserPostsListReducer.selected === "スキ") {
      this.props.actions.getUserPostsList("answered_suki", this.props.match.params.user_name, offset, "スキ")
    } else if (UserPostsListReducer.selected === "キライ") {
      this.props.actions.getUserPostsList("answered_kirai", this.props.match.params.user_name, offset, "キライ")
    } else if (UserPostsListReducer.selected === "投稿済") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, offset, "投稿済")
    }
  }

  render() {

    // redux関連
    const { actions } = this.props;

    // Material-ui関連
    const { classes } = this.props;
    const { CurrentUserReducer } = this.props;
    const { UserPostsListReducer } = this.props;

    return (


      <Scrollbars>
        <div className={classes.root} >
          <Paper>
            <img className={classes.iconimg} src={this.state.image} />
            <Typography variant="headline" component="h3" className={classes.headh3}>
              {this.state.name}<br />のスキライズム
          </Typography>
          </Paper>

          <div>
            <Tabs
              classes={{
                root: classes.tabs,
                indicator: classes.indicator,
              }}
              value={UserPostsListReducer.selected} variant="fullWidth" onChange={this.handleChange} aria-label="simple tabs example">
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                icon={<ThumbUpIcon />} value="スキ" />
              <Tab
                classes={{
                  root: classes.tab1,
                  selected: classes.selected,
                }} selected
                icon={<ThumbDownIcon />} value="キライ" />
              <Tab
                classes={{
                  root: classes.tab2,
                  selected: classes.selected,
                }} selected
                icon={<FolderIcon />} value="投稿済" />
            </Tabs>
          </div>

          <ul className={classes.ul}>
            {UserPostsListReducer.items.map((post) => (
              <Link to={"/posts/" + post.id} className={classes.link}>
                <li className={classes.li} key={post.id}>
                  <div className={classes.licontent}>
                    <h3 className={classes.lih3}>{post.content}</h3>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          <MuiThemeProvider theme={pagitheme}>
            <CssBaseline />
            <Pagination
              limit={10}
              offset={UserPostsListReducer.offset}
              total={UserPostsListReducer.page_length * 10}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </MuiThemeProvider>
        </div>
      </Scrollbars >

    );




  }
}

// Material-ui関連
UserDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// Redux関連
const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
  UserPostsListReducer: state.UserPostsListReducer
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// Material-uiのテーマ設定＋Redux設定
export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(UserDetail)
);