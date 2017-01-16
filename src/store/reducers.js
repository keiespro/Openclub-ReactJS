
import { combineReducers } from 'redux'
import auth from '../modules/auth/reducer'
import location from '../modules/location/reducer'
import api from '../modules/api'
import { reducer as form } from 'redux-form'

// Build full combined reducer
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth,
    location,
    form,
    ...api.reducers,
    ...asyncReducers
  })
}

// dynamically add reducers to the store
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
