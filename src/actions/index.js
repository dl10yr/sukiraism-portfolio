import axios from 'axios'

export const setCurrentUser = () => {
  return (dispatch) => {
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid

    return axios.get(process.env.REACT_APP_API_URL + '/api/v1/user/currentuser', {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => dispatch(setCurrentUserSuccess(response.data.data)))
      .catch(error => dispatch(setCurrentUserFailure(error)))
  };
}

export const setCurrentUserRequest = () => ({
  type: 'SET_CURRENTUSER_REQUEST',
})


export const setCurrentUserSuccess = (json) => ({
  type: 'SET_CURRENTUSER_SUCCESS',
  items: json,
})

export const setCurrentUserFailure = (error) => ({
  type: 'SET_CURRENTUSER_FAILURE',
  items: error,
})

export const getPostsList = (fetchlink, offset, selected) => {
  return (dispatch) => {
    dispatch(getPostsListRequest())
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    const page_url = offset / 10 + 1

    return axios.get(process.env.REACT_APP_API_URL + `/api/v1/posts${fetchlink}?page=${page_url}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => dispatch(getPostsListSuccess(response.data.data.posts, offset, response.data.data.page_length, selected)))
      .catch(error => dispatch(getPostsListFailure(error, offset, selected)))
  };
};

export const getPostsListRequest = () => ({
  type: 'GET_POSTSLIST_REQUEST',
})

export const getPostsListSuccess = (json, offset, page_length, selected) => ({
  type: 'GET_POSTSLIST_SUCCESS',
  items: json,
  offset: offset,
  page_length: page_length,
  selected: selected,
})

export const getPostsListFailure = (error, offset, selected) => ({
  type: 'GET_POSTSLIST_FAILURE',
  items: error,
  offset: offset,
  selected: selected,
})

export const getUserPostsList = (fetchlink, user_nickname, offset, selected) => {
  return (dispatch) => {
    dispatch(getUserPostsListRequest())
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    const page_url = offset / 10 + 1

    return axios.get(process.env.REACT_APP_API_URL + `/api/v1/users/${fetchlink}_posts/${user_nickname}?page=${page_url}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => dispatch(getUserPostsListSuccess(response.data.data.posts, offset, response.data.data.page_length, selected)))
      .catch(error => dispatch(getUserPostsListFailure(error, offset, selected)))
  };
};

export const getUserPostsListRequest = () => ({
  type: 'GET_USERPOSTSLIST_REQUEST',
})

export const getUserPostsListSuccess = (json, offset, page_length, selected) => ({
  type: 'GET_USERPOSTSLIST_SUCCESS',
  items: json,
  offset: offset,
  page_length: page_length,
  selected: selected,
})

export const getUserPostsListFailure = (error, offset, selected) => ({
  type: 'GET_USERPOSTSLIST_FAILURE',
  items: error,
  offset: offset,
  selected: selected,
})


export const getSearchResults = (keyword, offset, doneFetch) => {
  return (dispatch) => {
    dispatch(getSearchResultsRequest())
    const auth_token = localStorage.auth_token
    const client_id = localStorage.client_id
    const uid = localStorage.uid
    const page_url = offset / 10 + 1

    return axios.get(process.env.REACT_APP_API_URL + `/api/v1/search?q=${keyword}&page=${page_url}`, {
      headers: {
        'access-token': auth_token,
        'client': client_id,
        'uid': uid
      }
    })
      .then(response => dispatch(getSearchResultsSuccess(response.data.data.posts, keyword, offset, response.data.data.page_length, doneFetch)))
      .catch(error => dispatch(getSearchResultsFailure(error, keyword, doneFetch)))
  };
};

export const getSearchResultsRequest = () => ({
  type: 'GET_SEARCHRESULTS_REQUEST',
})


export const getSearchResultsSuccess = (json, keyword, offset, page_length, doneFetch) => ({
  type: 'GET_SEARCHRESULTS_SUCCESS',
  items: json,
  offset: offset,
  page_length: page_length,
  searchWord: keyword,
  doneFetch: doneFetch,
})

export const getSearchResultsFailure = (error, keyword, doneFetch) => ({
  type: 'GET_SEARCHRESULTS_FAILURE',
  items: error,
  searchWord: keyword,
  doneFetch: doneFetch,

})

export const setNotification = (variant, message) => ({
  type: 'SET_NOTIFICATION',
  variant: variant,
  message: message,
});
export const closeNotification = (variant, message) => ({
  type: 'CLOSE_NOTIFICATION',
});