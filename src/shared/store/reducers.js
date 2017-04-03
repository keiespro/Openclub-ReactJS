import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'
import auth from 'modules/auth/reducer'
import notifications from 'modules/notifications'
import apolloClient from 'modules/apollo'

const makeRootReducer = asyncReducers => combineReducers({
  form,
  modal,
  auth,
  notifications,
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
