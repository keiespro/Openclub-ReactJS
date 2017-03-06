import { injectReducer } from 'store/reducers'
import { checkAuthentication } from 'modules/auth/actions'
import { loadcb, splitError } from 'utils/code_splitting'
import Home from './Home'
import FeedRoute from './Feed'
import ClubRoute from './Club'
import EventRoute from './Event'
import EventsRoute from './Events'
import ClubsRoute from './Clubs'
import NotificationsRoute from './Notifications'
import ProfileRoute from './Profile';
import ErrorRoute from './Error'

export default (store) => {
  const checkAuth = (nextState, replace, callback) => {
    store.dispatch(checkAuthentication());
    callback();
  };

  return {
    path: '/',
    getComponent: (nextState, cb) => {
      import('../layouts/CoreLayout/CoreLayout.jsx').then(loadcb(cb)).catch(splitError)
    },
    onEnter: checkAuth,
    indexRoute: Home(store),
    childRoutes: [
      FeedRoute(store),
      NotificationsRoute(store),
      ProfileRoute(store),
      EventsRoute(store),
      EventRoute(store),
      ClubsRoute(store),
      ClubRoute(store),
      ErrorRoute(store)
    ]
  }
}
