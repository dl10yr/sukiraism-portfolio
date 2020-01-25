import React from 'react'
import SearchForm from './SearchForm'


import { withStyles } from '@material-ui/core/styles';

// Material-UIアイコン取得
import Search from '@material-ui/icons/Search';

// Redux関連
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { Link } from 'react-router-dom';

const pagitheme = createMuiTheme();
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
    border: '1px solid #c0c0c0'
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
    color: '#000000',
    textAlign: 'left',
  },
  lih3: {
    margin: '7px',
    wordWrap: 'break-word',
    textAlign: 'left'
  },
  h3: {
    color: theme.palette.text.primary,

  },
});

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.searchPost = this.searchPost.bind(this);

  }

  componentDidMount() {
    const { form } = this.props;
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
              <Link className={classes.link} to={"/posts/" + post.id}>
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
              offset={SearchResultsReducer.offset}
              total={SearchResultsReducer.page_length * 10}
              onClick={(e, offset) => this.handlePaginationClick(offset)}
            />
          </MuiThemeProvider>
        </div>

      )
    } else if (doneFetch === 1) {
      return (
        <h3>検索ワードを入力してください</h3>
      )

    } else {
      return (
        <h3>検索結果はありません。</h3>
      )
    }
  }

  render() {
    const { SearchResultsReducer } = this.props;

    const { classes } = this.props;

    return (
      <div>
        <h3 className={classes.h3}>テーマを検索する</h3>
        <SearchForm onSubmit={this.searchPost} />

        {this.renderResults(SearchResultsReducer.noResults, SearchResultsReducer.doneFetch)}

      </div>
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