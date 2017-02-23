import { combineReducers } from 'redux'
import apolloClient from 'modules/apollo'
import { reducer as form } from 'redux-form'
import auth from '../modules/auth/reducer'
import location from '../modules/location/reducer'
import { reducer as modal } from 'redux-modal'

// Build full combined reducer
export const makeRootReducer = (asyncReducers) => combineReducers({
  apollo: apolloClient.reducer(),
  auth,
  location,
  form,
  modal,
  ...asyncReducers
})

// dynamically add reducers to the store
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
