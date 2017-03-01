/**
 * Util functions for making routing more pleasant
 */
import { log } from 'utils/logger'

// updates route functions to have access to the store
const mixStoreWithRoute = (store, route) => {
  const output = {
    ...route
  }

  if(route.childRoutes){
    output.childRoutes = route.childRoutes.map(r => mixStoreWithRoute(store, r))
  }

  if(route.indexRoute){
    output.indexRoute = mixStoreWithRoute(store, output.indexRoute)
  }

  if(route.onEnter){
    output.onEnter = (props, replaceState, cb) => {
      Promise.resolve(route.onEnter(props, replaceState, store))
        .then(() => cb(null))
        .catch(e => {
          log.error('onEnter mix error:', e)
        })
    }
  }

  return output
}

export {
  mixStoreWithRoute
}
