const initialState = {
  isFetching: false,
  items: [],
  offset: 0,
  page_length: 1,
  selected: "新着順",
};

const PostListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTSLIST_REQUEST':
      return {
        ...state,
        isFetching: true,
        items: [],
        offset: "",
        page_length: "",
      };
    case 'GET_POSTSLIST_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: action.items,
        offset: action.offset,
        page_length: action.page_length,
        selected: action.selected,
      };
    case 'GET_POSTSLIST_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error,
        selected: action.selected,
        offset: action.offset,
      };
    default:
      return state;
  }
};

export default PostListReducer;