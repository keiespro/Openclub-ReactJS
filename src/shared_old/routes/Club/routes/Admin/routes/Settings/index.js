import Name from './components/Name';
import Privacy from './components/Privacy';
import Restrictions from './components/Restrictions';
import Financial from './components/Financial';
import Plans from './components/Plans';

export default (store) => ({
  path: 'settings',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Settings').default), 'club_admin_settings'),
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
