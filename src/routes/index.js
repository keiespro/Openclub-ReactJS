import { injectReducer } from 'store/reducers'
import { checkAuthentication } from 'modules/auth/actions'

import Home from './Home'
import FeedRoute from './Feed'
import ClubRoute from './Club'
import EventRoute from './Event'
import EventsRoute from './Events'
import ClubsRoute from './Clubs'
import NotificationsRoute from './Notifications'
import ErrorRoute from './Error'

let ran // IGNORE THE UGLINESS

export const createRoutes = (store) => ({
  path: '/',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('layouts/CoreLayout/CoreLayout').default), 'core'),
  onEnter: (nextState, replace, cb) => {
    // this should only be run once, and so seems like a bug in react-router
    // TODO: figure out a proper fix
    if (!ran) {
      // enforce auth hash completion before loading root route
      ran = store.dispatch(checkAuthentication())
    }
    ran.then(() => cb())
  },
  indexRoute: Home(store),
  childRoutes: [
    FeedRoute(store),
    NotificationsRoute(store),
    EventsRoute(store),
    EventRoute(store),
    ClubsRoute(store),
    ClubRoute(store),
    ErrorRoute(store)
  ]
});

export default createRoutes
