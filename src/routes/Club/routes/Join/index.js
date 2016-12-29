import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'join',
  getComponent: asyncRequire(() => require('./containers/Join').default)
})