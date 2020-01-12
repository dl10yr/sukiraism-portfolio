const initialState = {
  isLoggedin: false,
  isLoading: false,
  items: []
};

const CurrentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENTUSER_REQUEST':
      return {
        ...state,
        isLoggedin: false,
        isLoading: true,
        items: [],
      };
    case 'SET_CURRENTUSER_SUCCESS':
      if (!action.items) {
        return {
          ...state,
          isLoggedin: false,
          isLoading: false,
          items: action.items,
        };
      } else {
        return {
          ...state,
          isLoggedin: true,
          isLoading: false,
          items: action.items,
        };
      }

    case 'SET_CURRENTUSER_FAILURE':
      return {
        ...state,
        isLoggedin: false,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default CurrentUserReducer;