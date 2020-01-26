import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

import Pagination from "material-ui-flat-pagination";

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UpdateIcon from '@material-ui/icons/Update';
import PeopleIcon from '@material-ui/icons/People';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "normalize.css";
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ul: {
    listStyle: 'none',
    margin: '10px auto',
    padding: '0px 10px',
    textDecoration: 'none',
    height: '100%',
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
  container: {
    margin: '10px',
    width: '95%'
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




class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }


  componentDidMount() {
    const { PostsListReducer } = this.props;
    if (PostsListReducer.selected === "新着順") {
      this.props.actions.getPostsList("", PostsListReducer.offset, "新着順")
    } else if (PostsListReducer.selected === "スキが多い順") {
      this.props.actions.getPostsList("_suki", PostsListReducer.offset, "スキが多い順")
    } else if (PostsListReducer.selected === "投票が多い順") {
      this.props.actions.getPostsList("_allcount", PostsListReducer.offset, "投票が多い順")
    }
  }

  handleChange(e, newvalue) {
    if (newvalue === "新着順") {
      this.props.actions.getPostsList("", 0, "新着順")
    } else if (newvalue === "スキが多い順") {
      this.props.actions.getPostsList("_suki", 0, "スキが多い順")

    } else if (newvalue === "投票が多い順") {
      this.props.actions.getPostsList("_allcount", 0, "投票が多い順")
    }
  }

  handlePaginationClick(offset) {
    const { PostsListReducer } = this.props;
    if (PostsListReducer.selected === "新着順") {
      this.props.actions.getPostsList("", offset, "新着順")
    } else if (PostsListReducer.selected === "スキが多い順") {
      this.props.actions.getPostsList("_suki", offset, "スキが多い順")
    } else if (PostsListReducer.selected === "投票が多い順") {
      this.props.actions.getPostsList("_allcount", offset, "投票が多い順")
    }
  }

  renderInfo() {
    const { PostsListReducer } = this.props;
    const { classes } = this.props;

    if (PostsListReducer.selected === "新着順") {
      return (
        <ul className={classes.ul}>
          {PostsListReducer.items.map((post) => (
            <Link to={"/posts/" + post.id} className={classes.link}>
              <li className={classes.li} key={post.id}>
                <div className={classes.licontent}>
                  <Typography variant="body" component="body" color="textPrimary" className={classes.libody} >
                    {post.content}
                  </Typography>
                  <Typography variant="subtitle2" component="subtitle2" color="textPrimary" className={classes.subtitle2} >
                    <Moment fromNow>{post.created_at}</Moment>
                  </Typography>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )
    } else if (PostsListReducer.selected === "スキが多い順") {
      return (
        <ul className={classes.ul}>
          {PostsListReducer.items.map((post) => (
            <Link to={"/posts/" + post.id} className={classes.link}>
              <li className={classes.li} key={post.id}>
                <div className={classes.licontent}>
                  <Typography variant="body" component="body" color="textPrimary" className={classes.libody} >
                    {post.content}
                  </Typography>
                  <Typography variant="subtitle2" component="subtitle2" color="textPrimary" className={classes.subtitle2} >
                    {post.suki_percent}%
                  </Typography>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )
    } else if (PostsListReducer.selected === "投票が多い順") {
      return (
        <ul className={classes.ul}>
          {PostsListReducer.items.map((post) => (
            <Link to={"/posts/" + post.id} className={classes.link}>
              <li className={classes.li} key={post.id}>
                <div className={classes.licontent}>
                  <Typography variant="body" component="body" color="textPrimary" className={classes.libody} >
                    {post.content}
                  </Typography>
                  <Typography variant="subtitle2" component="subtitle2" color="textPrimary" className={classes.subtitle2} >
                    {post.all_count}票
                  </Typography>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )
    }
  }

  render() {
    const { CurrentUserReducer } = this.props;
    const { PostsListReducer } = this.props;
    const { classes } = this.props;
    const { pagiclasses } = this.props;


    return (
      <Scrollbars>
        <div className={classes.container}>
          <Paper>
            <Typography variant="h5" component="h5" color="textPrimary" style={{ fontWeight: 'bold', padding: '5px' }}>
              テーマ一覧: {PostsListReducer.selected}
            </Typography>
          </Paper>

          <div>
            <Tabs
              classes={{
                root: classes.tabs,
                indicator: classes.indicator,
              }}
              value={PostsListReducer.selected} variant="fullWidth" onChange={this.handleChange} aria-label="simple tabs example">
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                icon={<UpdateIcon />} value="新着順" />
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                icon={<ThumbUpIcon />} value="スキが多い順" />
              <Tab
                classes={{
                  root: classes.tab,
                  selected: classes.selected,
                }} selected
                icon={<PeopleIcon />} value="投票が多い順" />
            </Tabs>
          </div>

          {this.renderInfo()}

          <Pagination
            limit={20}
            offset={PostsListReducer.offset}
            total={PostsListReducer.page_length * 20}
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
      </Scrollbars>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
  PostsListReducer: state.PostsListReducer
});
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(PostsList)
);
