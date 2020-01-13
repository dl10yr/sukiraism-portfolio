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