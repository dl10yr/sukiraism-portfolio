import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import CurrentUserReducer from './CurrentUserReducer'
import PostsListReducer from './PostsListReducer'

// import SearchResultsReducer from './SearchResultsReducer'


const rootReducer = combineReducers({
  CurrentUserReducer,
  form: formReducer,
  router: routerReducer,
  PostsListReducer
  // SearchResultsReducer
})

export default rootReducer