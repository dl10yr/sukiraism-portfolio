import React from 'react'
import SearchForm from './SearchForm'

import { Scrollbars } from 'react-custom-scrollbars';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Pagination from "material-ui-flat-pagination";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
  },
  h3: {
    color: theme.palette.text.primary,

  },
  container: {
    margin: '10px'
  }
});

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.searchPost = this.searchPost.bind(this);

  }

  componentDidMount() {
    const { SearchResultsReducer } = this.props;

    this.props.actions.getSearchResults(SearchResultsReducer.searchWord, SearchResultsReducer.offset, SearchResultsReducer.doneFetch);
  }
  searchPost = values => {
    const { form } = this.props;
    this.props.actions.getSearchResults(form.SearchForm.values.notes, 0, true);
  }

  handlePaginationClick(offset) {
    const { form } = this.props;
    this.props.actions.getSearchResults(form.SearchForm.values.notes, offset, true);
  }

  renderResults(noResults, doneFetch) {
    const { SearchResultsReducer } = this.props;
    const { classes } = this.props;

    if (!noResults && doneFetch > 1) {
      return (

        <div>
          <ul className={classes.ul}>
            {SearchResultsReducer.items.map((post) => (
              <Link to={"/posts/" + post.id} className={classes.link}>
                <li className={classes.li} key={post.id}>
                  <div className={classes.licontent}>
                    <Typography variant="body1" color="textPrimary" className={classes.libody} >
                      {post.content}
                    </Typography>
                  </div>
                </li>
              </Link>
            ))}
          </ul>

          <Pagination
            limit={20}
            offset={SearchResultsReducer.offset}
            total={SearchResultsReducer.page_length * 20}
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

      )
    } else if (doneFetch === 1) {
      return (
        <Typography variant="h5" color="textPrimary" style={{ fontWeight: 'bold', marginTop: '10px' }}>
          検索ワードを<br />入力してください
        </Typography>
      )

    } else {
      return (
        <Typography variant="h5" color="textPrimary" style={{ fontWeight: 'bold', marginTop: '10px' }}>
          検索結果は<br />ありません
        </Typography>
      )
    }
  }

  render() {
    const { SearchResultsReducer } = this.props;

    const { classes } = this.props;

    return (
      <Scrollbars>
        <div className={classes.container}>
          <Typography variant="h5" color="textPrimary" style={{ fontWeight: 'bold' }}>
            テーマ検索
        </Typography>
          <SearchForm onSubmit={this.searchPost} />

          {this.renderResults(SearchResultsReducer.noResults, SearchResultsReducer.doneFetch)}

        </div>
      </Scrollbars>
    )



  }
}

const mapState = (state, ownProps) => ({
  CurrentUserReducer: state.CurrentUserReducer,
  form: state.form,
  SearchResultsReducer: state.SearchResultsReducer,
});
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(SearchPage)
);