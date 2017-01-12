import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'create/:page_id',
  getComponent: asyncRequire(() => require('./containers/CreateContainer').default)
})
