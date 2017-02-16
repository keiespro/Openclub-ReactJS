import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from '../modules/location/actions'

let store

export default (history, initialState = {}) => {
  // singleton store
  if (store) { return store }

  // setup middlewares
  const middleware = applyMiddleware(thunk, routerMiddleware(history));

  // setup enhancers
  const enhancers = []
  if (__DEV__ && __CLIENT__) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // create the store
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
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
