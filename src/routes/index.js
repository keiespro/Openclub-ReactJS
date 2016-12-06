// We only need to import the modules necessary for initial render
import { injectReducer } from '../store/reducers';
import Home from './Home'
import ClubsRoute from './Clubs';
import CounterRoute from './Counter'
import NotificationsRoute from './Notifications'
import ErrorRoute from './Error'
import LoginRoute from './Login';
import ClubsLanding from './ClubsLanding';

export const createRoutes = (store, auth) => ({
  path: '/',
  getComponent(nextState, cb) {
      console.log('RUNNING', nextState, store);
      require.ensure([], (require) => {
          const CoreContainer = require('../containers/CoreContainer').default;
          const reducer = require('../modules/auth/reducer').default;
          injectReducer(store, { key: 'auth', reducer });
          cb(null, CoreContainer);
      });
  },
  indexRoute: Home(store, auth),
  childRoutes: [
    CounterRoute(store, auth),
    Home(store, auth),
    NotificationsRoute(store, auth),
    LoginRoute(store, auth),
    // Landing pages
    ClubsLanding(store),
    // Clubs Route is a catch-all dynamic child route.
    ClubsRoute(store, auth),
    // Error Route must remain at the bottom.
    ErrorRoute(store, auth)
  ]
});

export default createRoutes
