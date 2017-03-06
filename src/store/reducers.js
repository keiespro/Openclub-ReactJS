import { combineReducers } from 'redux'
import apolloClient from 'modules/apollo'
import { reducer as form } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as modal } from 'redux-modal'

const makeRootReducer = asyncReducers => combineReducers({
  apollo: apolloClient.reducer(),
  form,
  routing,
  modal,
  ...asyncReducers
})

const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

export {
  injectReducer
}
