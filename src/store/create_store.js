import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
  const middlewares = [thunk, routerMiddleware(browserHistory)]
  const enhancers = []
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
  )

  return store
}
