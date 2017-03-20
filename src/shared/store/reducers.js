import { combineReducers } from 'redux'
import apolloClient from 'modules/apollo'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'
import auth from 'modules/auth/reducer'

const makeRootReducer = asyncReducers => combineReducers({
  apollo: apolloClient.reducer(),
  form,
  modal,
  auth,
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
