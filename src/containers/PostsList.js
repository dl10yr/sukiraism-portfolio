import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import { palette } from '@material-ui/system';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UpdateIcon from '@material-ui/icons/Update';
import PeopleIcon from '@material-ui/icons/People';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "normalize.css";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ul: {
    listStyle: 'none',
    margin: 'auto',
    padding: '0px 10px',
    textDecoration: 'none'
  },
  li: {
    cursor: 'pointer',
    margin: '0',
    textDecoration: 'none',
    border: '0.3px solid #c0c0c0',
    listStyleType: 'none',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'left',
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
    wordWrap: 'break-word',
    textAlign: 'left'
  },
  container: {
    margin: '10px'
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
  selected: {}
});

const pagitheme = createMuiTheme();

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
    } else if (PostsListReducer.selected === "投票数が多い順") {
      this.props.actions.getPostsList("_allcount", PostsListReducer.offset, "投票数が多い順")
    }
  }

  handleChange(e, newvalue) {
    if (newvalue === "新着順") {
      this.props.actions.getPostsList("", 0, "新着順")
    } else if (newvalue === "スキが多い順") {
      this.props.actions.getPostsList("_suki", 0, "スキが多い順")

    } else if (newvalue === "投票数が多い順") {
      this.props.actions.getPostsList("_allcount", 0, "投票数が多い順")
    }
  }

  handlePaginationClick(offset) {
    const { PostsListReducer } = this.props;
    if (PostsListReducer.selected === "新着順") {
      this.props.actions.getPostsList("", offset, "新着順")
    } else if (PostsListReducer.selected === "スキが多い順") {
      this.props.actions.getPostsList("_suki", offset, "スキが多い順")
    } else if (PostsListReducer.selected === "投票数が多い順") {
      this.props.actions.getPostsList("_allcount", offset, "投票数が多い順")
    }
  }
  render() {
    const { CurrentUserReducer } = this.props;
    const { PostsListReducer } = this.props;
    const { classes } = this.props;

    return (
      <Scrollbars>
        <div className={classes.container}>
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
                icon={<PeopleIcon />} value="投票数が多い順" />
            </Tabs>
          </div>

          <ul className={classes.ul}>
            {PostsListReducer.items.map((post) => (
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
              offset={PostsListReducer.offset}
              total={PostsListReducer.page_length * 10}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </MuiThemeProvider>
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
