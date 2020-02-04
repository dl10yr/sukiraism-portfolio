import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FolderIcon from '@material-ui/icons/Folder';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import Pagination from "material-ui-flat-pagination";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import axios from 'axios';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import usericon_default from '../images/usericon_default.png'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textLeft: {
    textAlign: 'left',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    margin: 10,
  },

  titleImage: {
    width: '100%',
    maxWidth: 700,
  },
  paper: {
    padding: '10px'
  },

  button: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 16,
    padding: 10,
    width: '33.33%',
    margin: theme.spacing(1),
    fontweight: "fontWeightBold",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  container: {
    margin: '10px',
    width: '95%'
  },
  buttongroup: {
    width: '100%',
    marginTop: '10px'
  },
  iconimg: {
    width: '50px',
    verticalAlign: 'top',
    display: 'inline-block',
    borderRadius: '50%',
    margin: '10px'
  },
  headh5: {
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
    border: 'thin solid whitesmoke',
    listStyleType: 'none',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'left',
    padding: "10px"
  },
  licontent: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '100%',
    margin: '0',
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,

  },
  libody: {
    margin: '3px',
    wordWrap: 'break-word',
    float: 'left',
    display: 'table-cell',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  subtitle2: {
    display: 'table-cell',

    float: 'right',
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
  selected: {},
  pagiroot: {
    textAlign: 'center',
    marginTop: "10px",
    color: theme.palette.text.primary
  },
  pageNaviCurrent: {
    cursor: 'default',
    color: '#2dd57a;',
    '&:hover': {
      backgroundColor: '#2dd57a;',
      opacity: 1,
    }
  },
  pageNaviText: {
  },
  pageNaviStandard: {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  pageNaviArrow: {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
});



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
        console.log(response)
        const data = response.data.data;
        this.setState({
          name: data.user.name,
          nickname: data.user.nickname,
          image: data.user.image,
          release: data.user.release
        });
      })
      .catch(() => {
        this.props.history.push('/home')
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
    } else if (UserPostsListReducer.selected === "投稿済テーマ") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, UserPostsListReducer.offset, "投稿済テーマ")
    }

  }

  handleChange(e, newvalue) {
    if (newvalue === "スキ") {
      this.props.actions.getUserPostsList("answered_suki", this.props.match.params.user_name, 0, "スキ")
    } else if (newvalue === "キライ") {
      this.props.actions.getUserPostsList("answered_kirai", this.props.match.params.user_name, 0, "キライ")
    } else if (newvalue === "投稿済テーマ") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, 0, "投稿済テーマ")
    }
  }

  handlePaginationClick(offset) {
    const { UserPostsListReducer } = this.props;
    if (UserPostsListReducer.selected === "スキ") {
      this.props.actions.getUserPostsList("answered_suki", this.props.match.params.user_name, offset, "スキ")
    } else if (UserPostsListReducer.selected === "キライ") {
      this.props.actions.getUserPostsList("answered_kirai", this.props.match.params.user_name, offset, "キライ")
    } else if (UserPostsListReducer.selected === "投稿済テーマ") {
      this.props.actions.getUserPostsList("user", this.props.match.params.user_name, offset, "投稿済テーマ")
    }
  }

  render() {

    const { classes } = this.props;
    const { CurrentUserReducer } = this.props;
    const { UserPostsListReducer } = this.props;

    var usericonlink = usericon_default
    if (this.state.image !== null) {
      usericonlink = this.state.image
    }

    if (this.state.release === "released" || CurrentUserReducer.items.nickname === this.props.match.params.user_name) {
      return (
        <Scrollbars>
          <div className={classes.container} >
            <Paper className={classes.paper}>
              <img alt="user_icon" className={classes.iconimg} src={usericonlink} />
              <Typography variant="headline" component="h3" className={classes.headh3}>
                {this.state.name}さんの<br />{UserPostsListReducer.selected}
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
                  icon={<FolderIcon />} value="投稿済テーマ" />
              </Tabs>
            </div>


            <ul className={classes.ul}>
              {UserPostsListReducer.items.map((post) => (
                <Link to={"/posts/" + post.id} className={classes.link}>
                  <li className={classes.li} key={post.id}>
                    <div className={classes.licontent}>
                      <Typography variant="body" component="body" color="textPrimary" className={classes.libody} >
                        {post.content}
                      </Typography>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>

            <Pagination
              limit={20}
              offset={UserPostsListReducer.offset}
              total={UserPostsListReducer.page_length * 20}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
              className={classes.pagiroot}
              classes={{
                root: classes.pageNav,
                rootStandard: classes.pageNaviStandard,
                rootCurrent: classes.pageNaviCurrent,
                rootEnd: classes.pageNaviArrow,
                text: classes.pageNaviText
              }}
            />

          </div>
        </Scrollbars >
      );
    } else {
      return (
        <Scrollbars>
          <div className={classes.container} >
            <Paper className={classes.paper}>
              <img alt="user_icon" className={classes.iconimg} src={this.state.image} />
              <Typography component="h5" className={classes.headh5}>
                {this.state.name}さんの<br />スキキライは公開されていません。
              </Typography>
            </Paper>
          </div>
        </Scrollbars >
      );
    }






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