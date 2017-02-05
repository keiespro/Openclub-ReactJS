import { asyncRequire } from 'utils/codesplit'

import Members from './routes/Members';
import Profile from './routes/Profile';
import Settings from './routes/Settings';

export default (store) => ({
  path: 'admin',
  getComponent: asyncRequire(() => require('./containers/Admin').default),
  childRoutes: [
    Members(store),
    Settings(store),
    Profile(store)
  ]
})
