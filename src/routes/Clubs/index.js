import { asyncRequire } from 'utils/codesplit';
import { browserSync } from 'react-router';

import ClubsPage from './components/ClubsPage';

export default (store) => ({
  path: 'clubs',
  getComponent: asyncRequire(() => require('./containers/ClubsContainer').default),
  indexRoute: {
    component: ClubsPage
  },
  childRoutes: []
});
