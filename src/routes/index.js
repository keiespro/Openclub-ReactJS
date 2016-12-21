// We only need to import the modules necessary for initial render
import { injectReducer } from '../store/reducers'
import { asyncRequire } from '../utils/codesplit'
import { checkAuthentication } from '../modules/auth/actions'
import Home from './Home'
import ClubsRoute from './Clubs';
import CounterRoute from './Counter'
import NotificationsRoute from './Notifications'
import ErrorRoute from './Error'
import LoginRoute from './Login';
import ClubsLanding from './ClubsLanding';

export const createRoutes = (store) => ({
  path: '/',
  getComponent: asyncRequire(() => require('../containers/CoreContainer').default),
  onEnter: (nextState, state, cb) => {
    // enforce auth hash completion before loading root route
    store.dispatch(checkAuthentication()).then(cb)
  },
  indexRoute: Home(store),
  childRoutes: [
    //CounterRoute(store, auth),
    //Home(store, auth),
    //NotificationsRoute(store, auth),
    //LoginRoute(store, auth),
    // Landing pages
    //ClubsLanding(store),
    // Clubs Route is a catch-all dynamic child route.
    //ClubsRoute(store, auth),
    // Error Route must remain at the bottom.
    //ErrorRoute(store, auth)
  ]
});

export default createRoutes
