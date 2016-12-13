import { combineReducers } from 'redux'
import locationReducer from './location'

export const makeRootReducer = (asyncReducers) => combineReducers({
    location: locationReducer,
    ...asyncReducers
});

export const injectReducer = (store, { key, reducer }) => {
    let asyncStore = store;
    asyncStore.asyncReducers[key] = reducer;
    asyncStore.replaceReducer(makeRootReducer(asyncStore.asyncReducers))
}

export default makeRootReducer
