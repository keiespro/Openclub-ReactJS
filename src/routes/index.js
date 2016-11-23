// We only need to import the modules necessary for initial render
import { injectReducer } from '../store/reducers';
import Home from './Home'
import CounterRoute from './Counter'
import NotificationsRoute from './Notifications'
import ErrorRoute from './Error'
import LoginRoute from './Login';

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
    // Please leave the error route at the bottom...
    // These are executed in order
    // I'll let you guess what happens when * (CATCH_ALL) is at the top. :)
    ErrorRoute(store, auth)
  ]
});

export default createRoutes
