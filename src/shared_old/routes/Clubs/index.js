import { browserSync } from 'react-router';

import ClubsPage from './components/ClubsPage';

export default (store) => ({
  path: 'clubs',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/ClubsContainer').default), 'clubs'),
  indexRoute: {
    component: ClubsPage
  },
  childRoutes: []
});
