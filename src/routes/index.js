import { injectReducer } from 'store/reducers'
import { asyncRequire } from 'utils/codesplit'
import { checkAuthentication } from 'modules/auth/actions'

import Home from './Home'
import Feed from './Feed'
import Club from './Club'
import Events from './Events'
import Notifications from './Notifications'
import ErrorRoute from './Error'

/*
import CounterRoute from './Counter'
import NotificationsRoute from './Notifications'
import LoginRoute from './Login'
import ClubsLanding from './ClubsLanding'
*/

export const createRoutes = (store) => ({
  path: '/',
  getComponent: asyncRequire(() => require('../containers/CoreContainer').default),
  onEnter: (nextState, replace, cb) => {
    // enforce auth hash completion before loading root route
    store.dispatch(checkAuthentication()).then(() => cb())
  },
  indexRoute: Home(store),
  childRoutes: [
    Feed(store),
    Notifications(store),
    Events(store),
    Club(store),
    //CounterRoute(store, auth),
    //Home(store, auth),
    //
    //LoginRoute(store, auth),
    // Landing pages
    //ClubsLanding(store),
    // Clubs Route is a catch-all dynamic child route.
    //ClubsRoute(store, auth),
    // Error Route must remain at the bottom.
    ErrorRoute(store)
  ]
});

export default createRoutes
