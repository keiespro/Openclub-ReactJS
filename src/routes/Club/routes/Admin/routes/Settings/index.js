import { asyncRequire } from 'utils/codesplit'

import Name from './components/Name';
import Privacy from './components/Privacy';

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
    }
  ]
})
