import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'admin/:page_id',
  getComponent: asyncRequire(() => require('./containers/Admin').default)
})