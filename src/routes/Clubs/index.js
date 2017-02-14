import { browserSync } from 'react-router';

import ClubsPage from './components/ClubsPage';

export default (store) => ({
  path: 'clubs',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./components/ClubsView').default), 'clubs'),
  indexRoute: {
    component: ClubsPage
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./components/create_club').default), 'clubs_create')
    }
  ]
});
