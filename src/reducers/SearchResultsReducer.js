
const initialState = {
  isFetching: false,
  items: [],
  offset: "",
  page_length: "",
  noResults: false,
  searchWord: "",
  doneFetch: false,
};

const SearchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCHRESULTS_REQUEST':
      return {
        ...state,
        isFetching: true,

      };
    case 'GET_SEARCHRESULTS_SUCCESS':
      if (action.items.length === 0) {
        return {
          ...state,
          isFetching: false,
          items: action.items,
          offset: action.offset,
          page_length: action.page_length,
          noResults: true,
          searchWord: action.searchWord,
          doneFetch: action.doneFetch,
          searchWord: action.searchWord,
        };
      } else {
        return {
          ...state,
          isFetching: false,
          items: action.items,
          offset: action.offset,
          page_length: action.page_length,
          noResults: false,
          doneFetch: action.doneFetch,
          searchWord: action.searchWord,

        };
      }

    case 'GET_SEARCHRESULTS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
        searchWord: action.searchWord,
        doneFetch: action.doneFetch,

      };
    default:
      return state;
  }
};

export default SearchResultsReducer;