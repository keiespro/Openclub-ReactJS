import { combineReducers } from 'redux'
import apolloClient from 'modules/apollo'
import { reducer as form } from 'redux-form'
<<<<<<< HEAD:src/shared_old/store/reducers.js
import auth from '../modules/auth/reducer'
import location from '../modules/location/reducer'
=======
import { routerReducer as routing } from 'react-router-redux'
import { reducer as modal } from 'redux-modal'
import auth from 'modules/auth/reducer'
>>>>>>> e8a73dcc2e73dee0172334f3d4e67a339cce9261:src/store/reducers.js

const makeRootReducer = asyncReducers => combineReducers({
  apollo: apolloClient.reducer(),
<<<<<<< HEAD:src/shared_old/store/reducers.js
  auth,
=======
>>>>>>> e8a73dcc2e73dee0172334f3d4e67a339cce9261:src/store/reducers.js
  form,
  routing,
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
