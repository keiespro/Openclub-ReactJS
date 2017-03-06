import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from '../modules/location/actions'

const __CLIENT__ = typeof window === 'object';

let store

export default (history, initialState = {}) => {
  // singleton store
  if (store) { return store }

  let middleware = [thunk];
  let enhancers = [];

  if (__DEV__ && __CLIENT__) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = __CLIENT__ ? browserHistory.listen(updateLocation(store)) : null

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}