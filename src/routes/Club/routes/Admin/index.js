import { asyncRequire } from 'utils/codesplit'

import Members from './routes/Members';

export default (store) => ({
  path: 'admin',
  getComponent: asyncRequire(() => require('./containers/Admin').default),
  childRoutes: [
    Members(store),
  ]
})
