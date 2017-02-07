import { asyncRequire } from 'utils/codesplit'

import Name from './components/Name';
import Privacy from './components/Privacy';
import Restrictions from './components/Restrictions';
import Financial from './components/Financial';
import Plans from './components/Plans';

export default (store) => ({
  path: 'settings',
  getComponent: asyncRequire(() => require('./containers/Settings').default),
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace(`/${nextState.params.club_id}/admin/settings/name`);
    }
  },
  childRoutes: [
    {
      path: 'name',
      component: Name
    },
    {
      path: 'privacy',
      component: Privacy
    },
    {
      path: 'restrictions',
      component: Restrictions
    },
    {
      path: 'financial',
      component: Financial
    },
    {
      path: 'plans',
      component: Plans
    }
  ]
})
