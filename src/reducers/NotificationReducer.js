const initialState = {
  isOpen: false,
  variant: 'success',
  message: '',
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        isOpen: true,
        variant: action.variant,
        message: action.message,
      };
    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default NotificationReducer;