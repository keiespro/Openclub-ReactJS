
import { combineReducers } from 'redux'
import auth from '../modules/auth/reducer'
import location from '../modules/location/reducer'
import api from '../modules/api'

// Build full combined reducer
export const makeRootReducer = (asyncReducers) => combineReducers({
	auth,
    location,
    api: api.reducers,
    ...asyncReducers
});

// dynamically add reducers to the store
export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
