import { asyncRequire } from 'utils/codesplit';
import { browserSync } from 'react-router';

export default (store) => ({
  path: 'clubs',
  getComponent: asyncRequire(() => require('./containers/ClubsContainer').default),
  indexRoute: {
    getComponent: asyncRequire(() => require('./containers/ClubsPageContainer').default)
  },
  childRoutes: []
});
