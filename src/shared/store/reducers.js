import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'
import auth from 'modules/auth/reducer'
import notifications from 'modules/notifications'

const makeRootReducer = asyncReducers => combineReducers({
  form,
  modal,
  auth,
  notifications,
  loadingBar,
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
