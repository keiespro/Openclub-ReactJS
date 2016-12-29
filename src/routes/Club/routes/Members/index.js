import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'members',
  getComponent: asyncRequire(() => require('./containers/Members').default)
})