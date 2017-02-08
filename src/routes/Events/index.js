import { asyncRequire } from 'utils/codesplit';
import { browserSync } from 'react-router';

export default (store) => ({
  path: 'events',
  getComponent: asyncRequire(() => require('./containers/EventsContainer').default),
  indexRoute: {
    getComponent: asyncRequire(() => require('./containers/EventsPageContainer').default)
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: asyncRequire(() => require('./containers/CreateEventContainer').default)
    }
  ]
})
