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

