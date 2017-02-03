import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'profile',
  getComponent: asyncRequire(() => require('./containers/Profile').default)
})
